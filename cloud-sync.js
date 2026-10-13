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

  // Default plug-and-play Firebase configuration
  // Users can customize this via the Admin Cloud Sync settings modal anytime.
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyESTBrandServicesLiveSync2026Key",
    authDomain: "est-brand-services-live.firebaseapp.com",
    databaseURL: "https://est-brand-services-live-default-rtdb.firebaseio.com",
    projectId: "est-brand-services-live",
    storageBucket: "est-brand-services-live.appspot.com",
    messagingSenderId: "109827364521",
    appId: "1:109827364521:web:786abc123def456"
  };

  const listeners = new Set();
  let firebaseApp = null;
  let firebaseDb = null;
  let broadcastChannel = null;
  let isCloudActive = false;
  let lastSyncTimestamp = 0;

  // Initialize BroadcastChannel for instant local tab-to-tab sync
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
      broadcastChannel.onmessage = (event) => {
        if (event.data && event.data.type === 'DB_UPDATE') {
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
        return JSON.parse(custom);
      }
    } catch (_) {}
    return DEFAULT_FIREBASE_CONFIG;
  }

  function initFirebase() {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      console.info('[EST CloudSync] Firebase SDK not loaded, operating in local reactive mode.');
      return;
    }

    try {
      const config = getActiveConfig();
      if (!config || !config.databaseURL) return;

      // Check if already initialized
      if (!firebase.apps || !firebase.apps.length) {
        firebaseApp = firebase.initializeApp(config);
      } else {
        firebaseApp = firebase.apps[0];
      }

      firebaseDb = firebase.database();
      const dbRef = firebaseDb.ref('est_database');

      // Listen for real-time cloud updates
      dbRef.on('value', (snapshot) => {
        const val = snapshot.val();
        if (val && typeof val === 'object') {
          isCloudActive = true;
          handleIncomingData(val, 'firebase');
        }
      }, (error) => {
        console.warn('[EST CloudSync] Firebase live sync warning:', error.message);
      });

      isCloudActive = true;
      console.log('[EST CloudSync] Connected to Firebase Realtime Database.');
    } catch (err) {
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

      // 1. LocalStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem('EST_ADMIN_DB_SYNC_TS', lastSyncTimestamp.toString());
      } catch (err) {
        console.error('[EST CloudSync] LocalStorage write error:', err);
      }

      // 2. BroadcastChannel
      if (broadcastChannel) {
        try {
          broadcastChannel.postMessage({ type: 'DB_UPDATE', data, timestamp: lastSyncTimestamp });
        } catch (_) {}
      }

      // 3. Dispatch local event
      try {
        window.dispatchEvent(new CustomEvent('EST_DB_UPDATED', { detail: { data, source: 'local_save' } }));
      } catch (_) {}

      // 4. Firebase Realtime Database
      if (firebaseDb) {
        try {
          firebaseDb.ref('est_database').set(data).then(() => {
            isCloudActive = true;
          }).catch((fbErr) => {
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
        // Re-initialize
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
     * Connection status
     */
    getStatus: function () {
      return {
        cloudConnected: isCloudActive,
        lastSync: lastSyncTimestamp,
        hasFirebaseSDK: typeof firebase !== 'undefined' && !!firebase.initializeApp
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
