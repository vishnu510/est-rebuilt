/**
 * EST Brand Services - Real-Time Cloud Synchronization Engine
 * Powered by Firebase Realtime Database + LocalStorage Offline Cache + BroadcastChannel
 * Enables instantaneous cross-device, cross-browser synchronization from anywhere.
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'EST_ADMIN_DB_V2';
  const CONFIG_STORAGE_KEY = 'EST_FIREBASE_CONFIG';
  const CHANNEL_NAME = 'est_admin_sync';

  // Placeholder / Default template for Firebase configuration.
  // Users input their real Firebase Realtime Database project URL in the Admin panel.
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  const listeners = new Set();
  let firebaseApp = null;
  let firebaseDb = null;
  let broadcastChannel = null;
  let isCloudActive = false;
  let cloudStatusMessage = 'Initializing...';
  let lastSyncTimestamp = 0;

  // Initialize BroadcastChannel for instant local tab-to-tab sync
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
      broadcastChannel.onmessage = (event) => {
        if (event.data && event.data.type === 'DB_UPDATE' && event.data.data) {
          handleIncomingData(event.data.data, 'broadcast');
        }
      };
    } catch (e) {
      console.warn('[EST CloudSync] BroadcastChannel init error:', e);
    }
  }

  // Storage event listener for fallback tab sync
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        handleIncomingData(parsed, 'localstorage');
      } catch (_) {}
    }
  });

  function getActiveConfig() {
    try {
      const custom = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (custom) {
        const parsed = JSON.parse(custom);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (_) {}
    return DEFAULT_FIREBASE_CONFIG;
  }

  function isValidDatabaseUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    return (trimmed.startsWith('https://') && (trimmed.includes('firebaseio.com') || trimmed.includes('firebasedatabase.app')));
  }

  // Firebase Realtime Database purges empty arrays/objects.
  // We use markers so empty arrays stay empty arrays across cloud roundtrips!
  function prepareForCloud(data) {
    if (!data || typeof data !== 'object') return data;
    const clone = JSON.parse(JSON.stringify(data));
    clone._initialized = true;
    clone._lastSync = Date.now();

    const secureArray = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return ['__EST_EMPTY__'];
      return arr;
    };

    clone.eventImages = secureArray(clone.eventImages);
    clone.eventVideos = secureArray(clone.eventVideos);
    clone.caseStudies = secureArray(clone.caseStudies);
    clone.events = secureArray(clone.events);
    if (clone.clients !== undefined) clone.clients = secureArray(clone.clients);
    if (clone.services !== undefined) clone.services = secureArray(clone.services);
    if (clone.clientFeedbacks !== undefined) clone.clientFeedbacks = secureArray(clone.clientFeedbacks);
    if (clone.employeeFeedbacks !== undefined) clone.employeeFeedbacks = secureArray(clone.employeeFeedbacks);
    if (clone.eventRegistrations !== undefined) clone.eventRegistrations = secureArray(clone.eventRegistrations);

    return clone;
  }

  function restoreFromCloud(data) {
    if (!data || typeof data !== 'object') return data;
    const clone = JSON.parse(JSON.stringify(data));
    clone._initialized = true;

    const unpackArray = (val) => {
      if (!val) return [];
      if (!Array.isArray(val)) {
        if (typeof val === 'object') {
          // Convert Firebase keyed object to array if needed
          return Object.values(val).filter(item => item !== '__EST_EMPTY__');
        }
        return [];
      }
      if (val.length === 1 && val[0] === '__EST_EMPTY__') return [];
      return val.filter(item => item !== '__EST_EMPTY__');
    };

    clone.eventImages = unpackArray(clone.eventImages);
    clone.eventVideos = unpackArray(clone.eventVideos);
    clone.caseStudies = unpackArray(clone.caseStudies);
    clone.events = unpackArray(clone.events);
    if (clone.clients !== undefined) clone.clients = unpackArray(clone.clients);
    if (clone.services !== undefined) clone.services = unpackArray(clone.services);
    if (clone.clientFeedbacks !== undefined) clone.clientFeedbacks = unpackArray(clone.clientFeedbacks);
    if (clone.employeeFeedbacks !== undefined) clone.employeeFeedbacks = unpackArray(clone.employeeFeedbacks);
    if (clone.eventRegistrations !== undefined) clone.eventRegistrations = unpackArray(clone.eventRegistrations);

    return clone;
  }

  function initFirebase() {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      console.info('[EST CloudSync] Firebase SDK not loaded, operating in local offline-cache mode.');
      isCloudActive = false;
      cloudStatusMessage = 'Offline Local Mode';
      return;
    }

    try {
      const config = getActiveConfig();
      if (!config || !isValidDatabaseUrl(config.databaseURL)) {
        isCloudActive = false;
        cloudStatusMessage = 'Awaiting Firebase Configuration';
        return;
      }

      // Initialize or reuse app
      const appName = 'EST_LIVE_SYNC';
      const existingApp = (firebase.apps || []).find(a => a.name === appName || a.name === '[DEFAULT]');
      if (!existingApp) {
        firebaseApp = firebase.initializeApp(config, appName);
      } else {
        firebaseApp = existingApp;
      }

      firebaseDb = firebase.database(firebaseApp);
      const dbRef = firebaseDb.ref('est_database');

      // Listen for real-time cloud updates continuously
      dbRef.on('value', (snapshot) => {
        const val = snapshot.val();
        if (val && typeof val === 'object') {
          isCloudActive = true;
          cloudStatusMessage = 'Cloud Synchronized (Live)';
          const restored = restoreFromCloud(val);
          handleIncomingData(restored, 'firebase');
        } else if (val === null) {
          // Firebase database exists but is currently empty
          isCloudActive = true;
          cloudStatusMessage = 'Cloud Connected (Empty Database)';
          console.info('[EST CloudSync] Firebase connected, root database is empty.');
        }
      }, (error) => {
        isCloudActive = false;
        cloudStatusMessage = 'Firebase Error: ' + error.message;
        console.warn('[EST CloudSync] Firebase live sync warning:', error.message);
      });

      isCloudActive = true;
      cloudStatusMessage = 'Connected to Firebase Realtime Database';
      console.log('[EST CloudSync] Connected to Firebase Realtime Database:', config.databaseURL);
    } catch (err) {
      isCloudActive = false;
      cloudStatusMessage = 'Init Error: ' + err.message;
      console.warn('[EST CloudSync] Firebase initialization error:', err.message);
    }
  }

  function handleIncomingData(data, source) {
    if (!data || typeof data !== 'object') return;
    lastSyncTimestamp = Date.now();

    // Cache locally
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem('EST_ADMIN_DB_SYNC_TS', lastSyncTimestamp.toString());
    } catch (_) {}

    // Dispatch global events
    try {
      window.dispatchEvent(new CustomEvent('EST_DB_UPDATED', { detail: { data, source } }));
      window.dispatchEvent(new CustomEvent('EST_DB_SYNC', { detail: { data, source } }));
    } catch (_) {}

    // Call registered listeners
    listeners.forEach((callback) => {
      try {
        callback(data, source);
      } catch (cbErr) {
        console.error('[EST CloudSync] Listener error:', cbErr);
      }
    });
  }

  const CloudSync = {
    /**
     * Initializes cloud sync listeners
     */
    init: function (callback) {
      if (typeof callback === 'function') {
        listeners.add(callback);
      }
      initFirebase();
      return this;
    },

    /**
     * Register a callback to fire on every real-time change
     */
    onSync: function (callback) {
      if (typeof callback === 'function') {
        listeners.add(callback);
      }
      return () => listeners.delete(callback);
    },

    /**
     * Reads current database from local cache or null
     */
    getDB: function () {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        console.warn('[EST CloudSync] Error reading DB:', e);
      }
      return null;
    },

    /**
     * Saves data to LocalStorage, BroadcastChannel, and Firebase Realtime Database
     */
    saveDB: function (data) {
      if (!data || typeof data !== 'object') return false;
      lastSyncTimestamp = Date.now();
      data._initialized = true;

      // 1. LocalStorage Cache
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem('EST_ADMIN_DB_SYNC_TS', lastSyncTimestamp.toString());
      } catch (err) {
        console.error('[EST CloudSync] LocalStorage write error:', err);
      }

      // 2. BroadcastChannel for instant local tab-to-tab sync
      if (broadcastChannel) {
        try {
          broadcastChannel.postMessage({ type: 'DB_UPDATE', data, timestamp: lastSyncTimestamp });
        } catch (_) {}
      }

      // 3. Dispatch local event
      try {
        window.dispatchEvent(new CustomEvent('EST_DB_UPDATED', { detail: { data, source: 'local_save' } }));
        window.dispatchEvent(new CustomEvent('EST_DB_SYNC', { detail: { data, source: 'local_save' } }));
      } catch (_) {}

      // 4. Push to Firebase Realtime Database for cross-device synchronization
      if (firebaseDb) {
        try {
          const cloudPayload = prepareForCloud(data);
          firebaseDb.ref('est_database').set(cloudPayload).then(() => {
            isCloudActive = true;
            cloudStatusMessage = 'Cloud Synchronized (Live)';
            console.log('[EST CloudSync] Live sync pushed to Firebase.');
          }).catch((fbErr) => {
            cloudStatusMessage = 'Push Error: ' + fbErr.message;
            console.warn('[EST CloudSync] Firebase push error:', fbErr.message);
          });
        } catch (e) {
          console.warn('[EST CloudSync] Firebase write exception:', e);
        }
      }

      return true;
    },

    /**
     * Set user custom Firebase configuration
     */
    setFirebaseConfig: function (configObj) {
      if (!configObj) return false;
      try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configObj));
        initFirebase();
        return true;
      } catch (e) {
        console.error('[EST CloudSync] Error saving Firebase config:', e);
        return false;
      }
    },

    /**
     * Get current Firebase configuration
     */
    getFirebaseConfig: function () {
      return getActiveConfig();
    },

    /**
     * Test connection to a Firebase databaseURL
     */
    testFirebaseConnection: async function (config) {
      if (!config || !isValidDatabaseUrl(config.databaseURL)) {
        return { success: false, message: 'Invalid Database URL. Must start with https:// and end with firebaseio.com or firebasedatabase.app' };
      }

      try {
        const cleanUrl = config.databaseURL.replace(/\/+$/, '') + '/.json?shallow=true';
        const res = await fetch(cleanUrl, { method: 'GET', mode: 'cors' });
        if (res.ok) {
          return { success: true, message: 'Firebase Database reached and verified successfully!' };
        } else if (res.status === 401 || res.status === 403) {
          return { success: false, message: 'Firebase permission denied. In Firebase Console > Realtime Database > Rules, set ".read": true, ".write": true' };
        } else if (res.status === 404) {
          return { success: false, message: 'Database URL not found (404). Please check the project name and URL in your Firebase Console.' };
        } else {
          return { success: false, message: 'HTTP ' + res.status + ': ' + res.statusText };
        }
      } catch (err) {
        return { success: false, message: 'Network connection failed: ' + err.message };
      }
    },

    /**
     * Connection status
     */
    getStatus: function () {
      return {
        cloudConnected: isCloudActive,
        statusMessage: cloudStatusMessage,
        lastSync: lastSyncTimestamp,
        hasFirebaseSDK: typeof firebase !== 'undefined' && !!firebase.initializeApp,
        config: getActiveConfig()
      };
    }
  };

  // Expose globally
  window.ESTCloudSync = CloudSync;

  // Auto-init on script load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CloudSync.init());
  } else {
    CloudSync.init();
  }

})(window);
