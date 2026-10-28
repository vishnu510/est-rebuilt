/* 
   EST Brand Services - Interactive Logic
   Handles: Dark Mode, Tab switcher, Modal display, Portfolio filter, Lightbox viewer, Form validation, Confetti triggering
*/

// Helper: Escape HTML strings to prevent XSS and rendering errors
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  if (typeof str !== 'string') return String(str);
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Dark/Light Theme Switching
  // ==========================================
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme from localStorage or system setting
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    updateThemeToggleIcons('dark');
  } else {
    htmlElement.classList.remove('dark');
    updateThemeToggleIcons('light');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeToggleIcons('light');
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeToggleIcons('dark');
      }
    });
  });

  function updateThemeToggleIcons(activeTheme) {
    themeToggleBtns.forEach(btn => {
      const sunIcon = btn.querySelector('.bi-sun-fill');
      const moonIcon = btn.querySelector('.bi-moon-fill');
      
      if (activeTheme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
      } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
      }
    });
  }

  // ==========================================
  // 2. Sticky Header & Active Navigation Links
  // ==========================================
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header.hero');

  // Active link highlighting based on current page URL
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  function highlightActiveLink() {
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href) return;
      
      const linkPage = href.substring(href.lastIndexOf('/') + 1);
      
      if (currentPage === '' || currentPage === 'index.html') {
        if (linkPage === 'index.html' || href === '#' || href === '') {
          link.classList.add('active');
        }
      } else {
        if (linkPage === currentPage && currentPage !== '') {
          link.classList.add('active');
          // Also highlight parent if it is a services/gallery dropdown item
          const parentDropdown = link.closest('.nav-dropdown');
          if (parentDropdown) {
            const dropdownLink = parentDropdown.querySelector('.nav-link');
            if (dropdownLink) dropdownLink.classList.add('active');
          }
        }
      }
    });
  }

  highlightActiveLink();

  window.addEventListener('scroll', () => {
    // Add scrolled class to header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy active nav link (only run on index.html / homepage)
    if (currentPage === '' || currentPage === 'index.html') {
      let currentSectionId = '';
      const scrollPosition = window.scrollY + 150; // offset for sticky nav

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('#') || href === '')) {
          link.classList.remove('active');
          if (href === `#${currentSectionId}` || (href === '#' && currentSectionId === 'hero')) {
            link.classList.add('active');
          }
        }
      });
    }
  });

  // Enhanced Mobile Menu Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksList = document.querySelector('.nav-links');

  function closeMobileMenu() {
    if (navLinksList && navLinksList.classList.contains('active')) {
      navLinksList.classList.remove('active');
      document.body.classList.remove('menu-open');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('bi-x-lg', 'bi-list');
      }
    }
  }

  function openMobileMenu() {
    if (navLinksList) {
      navLinksList.classList.add('active');
      document.body.classList.add('menu-open');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('bi-list', 'bi-x-lg');
      }
    }
  }

  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinksList.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinksList.classList.contains('active') && !navLinksList.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksList.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Close menu when clicking links (unless clicking a dropdown trigger)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024 && link.closest('.nav-dropdown') && !link.closest('.dropdown-menu')) {
          return;
        }
        closeMobileMenu();
      });
    });

    // Auto-close on viewport resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navLinksList.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // Mobile Dropdown Tap/Click Handler with chevron animation
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const toggleLink = dropdown.querySelector('.nav-link');
    if (toggleLink) {
      toggleLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // ==========================================
  // 3. Hero Slideshow Background Slider
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlideIndex = 0;
  const slideIntervalTime = 6000;

  if (heroSlides.length > 0) {
    function startHeroSlider() {
      setInterval(() => {
        heroSlides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
        heroSlides[currentSlideIndex].classList.add('active');
      }, slideIntervalTime);
    }
    startHeroSlider();
  }

  // ==========================================
  // 4. About Us Multi-tab Control
  // ==========================================
  const tabBtns = document.querySelectorAll('.about-tab-btn');
  const tabPanes = document.querySelectorAll('.about-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // ==========================================
  // 5. Service Detail Modal System & Content Database
  // ==========================================
  const serviceDetails = {
    'experiential-marketing': {
      title: 'Experiential Marketing Agency',
      icon: 'bi-stars',
      desc: 'Create deeply engaging, multi-sensory brand experiences and tech-driven activations that connect businesses directly with high-value audiences.',
      bullets: [
        'Interactive Brand Environments & Installations',
        'AR/VR & IoT Tech-Enabled Experiences',
        'B2B Experiential Pop-Ups & CXO Lounges',
        'Multi-Sensory Product Immersion Labs',
        'Pan-India Experiential Activations',
        'Engagement Analytics & Footfall Tracking'
      ],
      deliverable: 'A memorable, high-impact experiential campaign that turns audience curiosity into lasting emotional connection and brand advocacy.'
    },
    'marketing-consulting': {
      title: 'Marketing Consulting & Strategy',
      icon: 'bi-compass',
      desc: 'Strategic consulting to help B2B enterprises define ideal customer profiles, sharpen positioning, architect go-to-market motions, and scale revenue.',
      bullets: [
        'Market Research & Competitive Benchmarking',
        'Ideal Customer Profile (ICP) & Account Tiering',
        'Brand Positioning & Core Messaging Framework',
        'Go-To-Market (GTM) Campaign Strategy',
        'Multi-Channel Demand Architecture',
        'Marketing ROI & Attribution Audits'
      ],
      deliverable: 'A clear, actionable marketing blueprint that aligns corporate objectives with measurable pipeline and market growth.'
    },
    'event-management': {
      title: 'Corporate Event Management',
      icon: 'bi-calendar4-event',
      desc: 'We design and execute end-to-end corporate event solutions that engage audiences and align with your strategic business goals.',
      bullets: [
        'Conferences & Seminars',
        'Product Launches & Showcases',
        'Award Ceremonies & Galas',
        'VIP Dinners & Board Meetings',
        'Stage Design & Audiovisual Production',
        'RSVP Tracking & Delegate Management'
      ],
      deliverable: 'A seamless, stress-free corporate event that strengthens relationships with clients, partners, and team members.'
    },
    'demand-generation': {
      title: 'B2B Demand Generation Solutions',
      icon: 'bi-funnel',
      desc: 'Drive growth and revenue with targeted, data-backed demand generation campaigns that build predictable sales pipelines for B2B enterprises.',
      bullets: [
        'Account-Based Marketing (ABM) Frameworks',
        'Multi-Channel Outbound & SDR Appointment Setting',
        'High-Intent LinkedIn Lead Generation',
        'Content Syndication & Lead Nurturing',
        'Sales Pipeline Acceleration & CRM Sync',
        'Attribution Analytics & ROI Dashboards'
      ],
      deliverable: 'A predictable, consistent pipeline of high-intent sales opportunities aligned with your revenue goals.'
    },
    'corporate-travel': {
      title: 'Corporate Travel Management',
      icon: 'bi-airplane-engines',
      desc: 'Streamlined flight, hotel, and transport booking packages curated to simplify business travels, incentive trips, and conference logistics.',
      bullets: [
        'Flight Bookings & Upgrades',
        'Hotel Partner Room Blocks',
        'MICE Group Logistics Management',
        'Ground Airport Transfers',
        'Visa & Travel Insurance Assistance',
        '24/7 Traveller Helpdesk Support'
      ],
      deliverable: 'Comfortable, cost-effective, and fully coordinated corporate travels keeping your team focused on business results.'
    },
    'retail-branding': {
      title: 'Retail & Office Branding',
      icon: 'bi-shop',
      desc: 'Transform office lobbies, meeting rooms, retail storefronts, and interior spaces into highly immersive, branded environments.',
      bullets: [
        'Environmental & Wall Graphics',
        'Glass Frosting & Privacy Films',
        'Lightboxes & Dimensional Signage',
        'Storefront Signage & Vinyl Wrapping',
        'Exhibition Booth Graphic Backdrops',
        'Professional Fabrication & Installation'
      ],
      deliverable: 'Visual design solutions that establish an immediate premium presence and reinforce company brand values.'
    },
    'btl-activation': {
      title: 'BTL Activations & Roadshows',
      icon: 'bi-megaphone',
      desc: 'Connect with local communities and consumers through targeted below-the-line (BTL) marketing setups, mall intercepts, and roadshows.',
      bullets: [
        'Mall & Corporate Park Intercepts',
        'Interactive Kiosks & Product Sampling',
        'Mobile Float Roadshows',
        'College & Youth Activations',
        'Experiential Photo Booth Setups',
        'On-ground Promoters & Management'
      ],
      deliverable: 'Engaging physical interactions that build massive consumer awareness, feedback loops, and local brand affinity.'
    },
    'exhibition': {
      title: 'Exhibition Stands & Booths',
      icon: 'bi-grid-1x2',
      desc: 'Create immersive booth concepts, double-decker stands, and custom modular pavilions that draw traffic at leading national trade shows.',
      bullets: [
        'Custom 3D Exhibition Stall Design',
        'Structural Fabrication & On-site Assembly',
        'Interactive Touchscreens & Displays',
        'Booth Hostesses & Catering Logistics',
        'Furniture Rental & Lighting Schemes',
        'Post-Event Dismantling & Warehousing'
      ],
      deliverable: 'An outstanding exhibition setup that commands attention in trade show halls and maximizes visitor contact rate.'
    },
    'digital-marketing': {
      title: 'Digital Marketing & Content Strategy',
      icon: 'bi-phone-vibrate',
      desc: 'Accelerate digital performance using optimized search campaigns, social media growth assets, and interactive online setups.',
      bullets: [
        'Search Engine Optimization (SEO)',
        'Pay-Per-Click Advertising (Google & LinkedIn Ads)',
        'Social Media Content Management',
        'Video Editing & Promotional Clips',
        'Website UI/UX Consulting',
        'Digital Newsletter & Email Workflows'
      ],
      deliverable: 'Enhanced digital visibility, traffic, and client conversions through modern web performance metrics.'
    }
  };

  const modalOverlay = document.querySelector('.modal-overlay');
  const modalContainer = document.querySelector('.modal-container');
  const serviceCards = document.querySelectorAll('.service-card-trigger');

  if (modalOverlay) {
    serviceCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const href = card.getAttribute('href');
        if (href === '#' || !href) {
          e.preventDefault();
          const serviceKey = card.getAttribute('data-service');
          const data = serviceDetails[serviceKey];

        if (data) {
          // Populate modal with content
          modalContainer.innerHTML = `
            <span class="modal-close-btn"><i class="bi bi-x-lg"></i></span>
            <div class="modal-icon"><i class="bi ${data.icon}"></i></div>
            <h3 class="modal-title">${data.title}</h3>
            
            <div class="modal-content-section">
              <p class="tab-content-text">${data.desc}</p>
            </div>
            
            <div class="modal-content-section">
              <h4 class="modal-subtitle">What We Handle</h4>
              <ul class="modal-list">
                ${data.bullets.map(bullet => `
                  <li class="modal-list-item">
                    <i class="bi bi-check-circle-fill"></i>
                    <span>${bullet}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            
            <div class="modal-content-section" style="margin-bottom: 0;">
              <h4 class="modal-subtitle">Key Deliverable</h4>
              <p class="tab-content-text" style="font-weight: 500; font-style: italic;">
                "${data.deliverable}"
              </p>
            </div>
          `;

          // Show modal
          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden'; // lock scrolling

          // Add click listener to close btn
          const closeBtn = modalOverlay.querySelector('.modal-close-btn');
          closeBtn.addEventListener('click', closeModal);
        }
      }
    });
  });

    // Close on overlay mask click
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto'; // restore scrolling
    }
  }

  // ==========================================
  // 6. Portfolio / Gallery Dynamic Sync & Filter
  // ==========================================
  function initDynamicPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    const STORAGE_KEY = 'EST_ADMIN_DB_V2';
    let db = null;
    if (window.ESTCloudSync && typeof window.ESTCloudSync.getDB === 'function') {
      db = window.ESTCloudSync.getDB();
    }
    if (!db) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) db = JSON.parse(raw);
      } catch (e) {
        console.warn('Error reading db for gallery:', e);
      }
    }

    const isVideoPage = window.location.pathname.includes('gallery-videos.html');
    const isImagePage = window.location.pathname.includes('gallery-images.html');

    if (isImagePage && db) {
      let allImages = [];
      if (Array.isArray(db.eventImages)) {
        allImages.push(...db.eventImages);
      }

      if (allImages.length > 0) {
        const spanPatterns = ['span-md', 'span-sm', 'span-sm', 'span-tall', 'span-lg', 'span-wide'];
        portfolioGrid.innerHTML = allImages.map((img, idx) => {
          const spanClass = spanPatterns[idx % spanPatterns.length];
          const catSlug = (img.category || 'events').toLowerCase().replace(/\s+/g, '-');
          return `
            <div class="portfolio-item ${spanClass}" data-category="${escapeHtml(catSlug)}" data-type="image" data-src="${escapeHtml(img.imgUrl)}" data-aos="fade-up">
              <img src="${escapeHtml(img.imgUrl)}" alt="${escapeHtml(img.title)}" class="portfolio-img">
              <span class="portfolio-badge"><i class="bi bi-camera-fill"></i> ${escapeHtml(img.category || 'Photo')}</span>
              <div class="portfolio-overlay">
                <span class="portfolio-cat">${escapeHtml(img.eventName || img.category || 'EST Event')}</span>
                <h3 class="portfolio-title">${escapeHtml(img.title)}</h3>
                <div class="portfolio-view-icon"><i class="bi bi-zoom-in"></i></div>
              </div>
            </div>
          `;
        }).join('');
      } else {
        portfolioGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px; color: var(--color-text-muted);">
            <i class="bi bi-images" style="font-size: 2.8rem; color: #475569; margin-bottom: 14px; display: block;"></i>
            <h3 style="color: #fff; font-size: 1.25rem; font-weight: 600; margin-bottom: 6px;">No Gallery Photos Available</h3>
            <p style="color: #94a3b8; font-size: 0.95rem;">New event captures will appear here once uploaded via the admin panel.</p>
          </div>
        `;
      }
    } else if (isVideoPage && db) {
      let allVideos = [];
      if (Array.isArray(db.eventVideos)) {
        allVideos.push(...db.eventVideos);
      }

      if (allVideos.length > 0) {
        const spanPatterns = ['span-lg', 'span-tall', 'span-wide'];
        portfolioGrid.innerHTML = allVideos.map((vid, idx) => {
          const spanClass = spanPatterns[idx % spanPatterns.length];
          const catSlug = (vid.category || 'events').toLowerCase().replace(/\s+/g, '-');
          return `
            <div class="portfolio-item ${spanClass}" data-category="${escapeHtml(catSlug)}" data-type="video" data-src="${escapeHtml(vid.videoUrl)}" data-aos="fade-up">
              <img src="${escapeHtml(vid.thumbUrl)}" alt="${escapeHtml(vid.title)}" class="portfolio-img">
              <span class="portfolio-badge"><i class="bi bi-play-circle-fill"></i> ${escapeHtml(vid.duration || 'Video')}</span>
              <div class="portfolio-overlay">
                <span class="portfolio-cat">${escapeHtml(vid.client || 'Showreel')}</span>
                <h3 class="portfolio-title">${escapeHtml(vid.title)}</h3>
                <div class="portfolio-view-icon"><i class="bi bi-play-fill"></i></div>
              </div>
            </div>
          `;
        }).join('');
      } else {
        portfolioGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px; color: var(--color-text-muted);">
            <i class="bi bi-camera-video" style="font-size: 2.8rem; color: #475569; margin-bottom: 14px; display: block;"></i>
            <h3 style="color: #fff; font-size: 1.25rem; font-weight: 600; margin-bottom: 6px;">No Video Showreels Available</h3>
            <p style="color: #94a3b8; font-size: 0.95rem;">High-energy event showreels will appear here once uploaded via the admin panel.</p>
          </div>
        `;
      }
    }

    bindPortfolioFilterAndLightbox();
  }

  // Bind real-time synchronization listeners for public portfolio/galleries
  if (!window._portfolioSyncBound) {
    window._portfolioSyncBound = true;
    window.addEventListener('EST_DB_UPDATED', () => initDynamicPortfolio());
    window.addEventListener('EST_DB_SYNC', () => initDynamicPortfolio());
    if (window.ESTCloudSync && typeof window.ESTCloudSync.onSync === 'function') {
      window.ESTCloudSync.onSync(() => initDynamicPortfolio());
    }
  }

  function formatVideoEmbedHtml(url, style = 'width: 100%; height: 60vh; border: none; border-radius: 8px;') {
    if (!url) return '';
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch) {
      return `<iframe src="https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="${style}"></iframe>`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/i);
    if (vimeoMatch) {
      return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="${style}"></iframe>`;
    }
    return `<video controls autoplay style="${style}" src="${escapeHtml(url)}"></video>`;
  }

  function bindPortfolioFilterAndLightbox() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';

          setTimeout(() => {
            if (filterValue === 'all' || itemCategory === filterValue || (filterValue === 'events' && (itemCategory === 'conferences' || itemCategory === 'roadshows' || itemCategory === 'brand-activations' || itemCategory === 'offsites' || itemCategory === 'showreel'))) {
              item.style.display = 'block';
              void item.offsetWidth;
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            } else {
              item.style.display = 'none';
            }
          }, 300);
        });
      };
    });

    // ==========================================
    // 7. Integrated Lightbox Image/Video Viewer
    // ==========================================
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = document.querySelector('.lightbox-media');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentGalleryIndex = 0;
    const galleryItems = Array.from(portfolioItems);

    if (lightbox) {
      portfolioItems.forEach((item, index) => {
        item.onclick = () => {
          currentGalleryIndex = index;
          openLightbox(item);
        };
      });

      function openLightbox(item) {
        const src = item.getAttribute('data-src');
        const titleEl = item.querySelector('.portfolio-title');
        const title = titleEl ? titleEl.textContent : '';
        const type = item.getAttribute('data-type') || 'image';

        document.body.style.overflow = 'hidden';
        lightboxMedia.innerHTML = '';

        if (type === 'video') {
          lightboxMedia.innerHTML = formatVideoEmbedHtml(src, 'width: 80vw; max-width: 960px; height: 60vh; max-height: 540px; border-radius: 8px; outline: none; border: none;');
        } else {
          lightboxMedia.innerHTML = `
            <img class="lightbox-media" src="${src}" alt="${title}" style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: 8px;">
          `;
        }

        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
      }

      function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxMedia.innerHTML = '';
        document.body.style.overflow = 'auto';
      }

      function navigateGallery(direction) {
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
        let found = false;
        let checkIndex = currentGalleryIndex;

        while (!found) {
          checkIndex = (checkIndex + direction + galleryItems.length) % galleryItems.length;
          const item = galleryItems[checkIndex];
          const category = item.getAttribute('data-category');

          if (activeFilter === 'all' || category === activeFilter || (activeFilter === 'events' && (category === 'conferences' || category === 'roadshows' || category === 'brand-activations' || category === 'offsites' || category === 'showreel'))) {
            currentGalleryIndex = checkIndex;
            openLightbox(item);
            found = true;
          }

          if (checkIndex === currentGalleryIndex && !found) break;
        }
      }

      if (lightboxClose) lightboxClose.onclick = closeLightbox;
      if (lightboxPrev) lightboxPrev.onclick = () => navigateGallery(-1);
      if (lightboxNext) lightboxNext.onclick = () => navigateGallery(1);

      window.onkeydown = (e) => {
        if (lightbox.classList.contains('active')) {
          if (e.key === 'Escape') closeLightbox();
          if (e.key === 'ArrowLeft') navigateGallery(-1);
          if (e.key === 'ArrowRight') navigateGallery(1);
        }
      };

      lightbox.onclick = (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content') || e.target.classList.contains('flex-center')) {
          if (e.target.tagName !== 'IMG' && e.target.tagName !== 'VIDEO' && !e.target.closest('.lightbox-nav')) {
            closeLightbox();
          }
        }
      };
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  initDynamicPortfolio();

  window.addEventListener('storage', (e) => {
    if (!e.key || e.key === 'EST_ADMIN_DB_V2') {
      initDynamicPortfolio();
    }
  });

  // ==========================================
  // 8. Contact Form Live Validation & Submit
  // ==========================================
  const contactForm = document.getElementById('estContactForm');
  const successModal = document.querySelector('.success-modal');
  const successCloseBtn = document.querySelector('.success-close-btn');

  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-input');

    // Floating label indicator support for prefilled inputs
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });

      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('invalid')) {
          validateField(input);
        }
      });
    });

    function validateField(input) {
      const parent = input.parentElement;
      const val = input.value.trim();
      const type = input.getAttribute('type');
      const required = input.hasAttribute('required');

      let isValid = true;

      // Reset state
      parent.classList.remove('invalid');

      if (required && val === '') {
        isValid = false;
      } else if (val !== '') {
        if (type === 'email') {
          // Simple email regex regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailRegex.test(val);
        } else if (type === 'tel') {
          // Simple phone validation (at least 10 numbers)
          const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
          isValid = phoneRegex.test(val);
        }
      }

      if (!isValid) {
        parent.classList.add('invalid');
      }

      return isValid;
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;
      inputs.forEach(input => {
        const isFieldValid = validateField(input);
        if (!isFieldValid) {
          formIsValid = false;
        }
      });

      if (formIsValid) {
        // Trigger Canvas Confetti Explosion
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
        }

        // Show Custom Glassmorphism Success modal
        if (successModal) {
          successModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        // Reset form
        contactForm.reset();
      }
    });
  }

  if (successModal && successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ==========================================
  // 9. Floating Back to Top Button
  // ==========================================
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 10. Animated Counter for Stats Ribbon
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  function runStatsCounter() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      let count = 0;
      const speed = 40;
      const increment = Math.max(1, Math.ceil(target / speed));

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = count;
        }
      }, 25);
    });
  }

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          runStatsCounter();
        }
      });
    }, { threshold: 0.3 });

    const statsRibbon = document.querySelector('.stats-ribbon');
    if (statsRibbon) {
      statsObserver.observe(statsRibbon);
    }
  }

  // ==========================================
  // 11. Interactive Event Scope Planner
  // ==========================================
  const plannerChips = document.querySelectorAll('.planner-chip');
  const plannerTitle = document.getElementById('plannerSelectedType');
  const plannerScale = document.getElementById('plannerSelectedScale');
  const plannerSpecsList = document.getElementById('plannerSpecsList');
  const applyPlannerBtn = document.getElementById('applyPlannerBtn');

  const plannerData = {
    'conference': {
      title: 'Corporate Conference & Seminar',
      specs: [
        'Curved P2.6 High-Definition LED Stage Backdrop with Watchout Matrix',
        'Line-Array Acoustic Audio Engineering with Redundant Wireless Lavs',
        'Intelligent Warm Lighting Profile & Multi-Cam Full HD Live Telecast',
        'Branded Registration Kiosks, Lanyard Printing & RFID Delegate Tracking',
        'Executive Green Rooms & Speaker Presentation Management Console'
      ]
    },
    'launch': {
      title: 'High-Octane Product Reveal Launch',
      specs: [
        'Dynamic Kinetic LED Reveals, Holographic Projections or Motorized Drops',
        'Custom 3D Product Pedestals with Synchronized Beam Lighting Cues',
        'Immersive Surround Sound & Countdown Special Effects (CO2 / Cold Spark)',
        'VIP Media Lounge & Dedicated Red-Carpet Step-and-Repeat Photo Walls',
        'Live Multi-Platform Streaming to Global Remote Audiences'
      ]
    },
    'roadshow': {
      title: 'Pan-India BTL Activation & Roadshow',
      specs: [
        'Customized Hydraulic Mobile Display Vans or Modular Mall Kiosks',
        'Gamified Touchscreen Interactivity & Instant Sample Dispensing Stations',
        'Trained Multi-Lingual Brand Promoters & Hostess Supervision Fleet',
        'Real-Time Footfall Intercept Analytics & Lead Capture Cloud Dashboard',
        'Turnkey City-to-City Transport Logistics & Regulatory Municipal Permissions'
      ]
    },
    'exhibition': {
      title: 'Custom Exhibition Booth & Trade Pavilion',
      specs: [
        'Bespoke 3D Stand Architecture with Raised Glass / Wooden Flooring',
        'Backlit Fabric Lightboxes, Acrylic 3D Branding & Overhead Hanging Truss',
        'Private VIP Meeting Lounges with Integrated AV Demo Screens',
        'Dedicated Pantry, Storage Lockers & Reception Desk Concierge',
        'Full Pre-Show Fabrication, Structural Safety Signoff & On-Site Handover'
      ]
    },
    'branding': {
      title: 'Retail & Corporate Office Branding',
      specs: [
        'Premium Cast Vinyl Wall Murals, Frosting & Directional Wayfinding',
        'Illuminated LED Acrylic Letters & High-Impact Reception Signage',
        'Acoustic Felt Wall Paneling with Brand Identity Prints',
        'Turnkey Night Installation Fleet (Zero Workday Disruption)',
        'Durable Commercial-Grade Finishing with 3-Year Quality Guarantee'
      ]
    },
    'mice': {
      title: 'MICE Delegation & Annual Gala Retreat',
      specs: [
        'Charter Flights, Luxury Coach Transfers & 5-Star Hotel Room Allocations',
        'Themed Gala Evening Stage, Celebrity Artists & Emcee Choreography',
        'Bespoke Delegate Welcome Kits & Customized Airport Reception Desk',
        'On-Ground Dedicated Tour Managers & 24/7 Concierge Helpdesk',
        'Curated Team-Building Experiential Workshops & Excursions'
      ]
    }
  };

  let currentPlannerType = 'conference';
  let currentPlannerScale = '100-500 Guests';

  if (plannerChips.length > 0 && plannerSpecsList) {
    plannerChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.getAttribute('data-group');
        const val = chip.getAttribute('data-val');

        document.querySelectorAll(`.planner-chip[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        if (group === 'type') {
          currentPlannerType = val;
        } else if (group === 'scale') {
          currentPlannerScale = chip.textContent.trim();
        }

        updatePlannerDisplay();
      });
    });

    function updatePlannerDisplay() {
      const data = plannerData[currentPlannerType] || plannerData['conference'];
      if (plannerTitle) plannerTitle.textContent = data.title;
      if (plannerScale) plannerScale.textContent = currentPlannerScale;

      if (plannerSpecsList) {
        plannerSpecsList.innerHTML = data.specs.map(spec => `
          <li class="planner-spec-item">
            <i class="bi bi-check-circle-fill"></i>
            <span>${spec}</span>
          </li>
        `).join('');
      }
    }

    if (applyPlannerBtn) {
      applyPlannerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');
        const contactSection = document.getElementById('contact');

        const selectedInfo = plannerData[currentPlannerType] || plannerData['conference'];

        if (subjectInput) {
          subjectInput.value = `Proposal Request: ${selectedInfo.title} (${currentPlannerScale})`;
        }
        if (messageInput) {
          messageInput.value = `Hi EST Team, we are planning a ${selectedInfo.title} for approximately ${currentPlannerScale}. Please share a turnkey execution proposal and 3D setup concept.`;
        }

        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // ==========================================
  // 12. Dynamic Case Studies & Client Work CMS Engine
  // ==========================================
  const DEFAULT_CASE_STUDIES = [
    {
      id: 'cs1',
      client: 'Adobe Systems',
      industry: 'Technology & Design',
      title: 'Workspace Transformation & Experiential Innovation Zones',
      category: 'Corporate Branding',
      coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000',
      challenge: 'Re-energize 45,000+ sq. ft. of headquarters space with brand culture art without disrupting daily office operations.',
      strategy: 'Developed a 3D architectural plan with custom frosted glass manifestations, acoustic felt murals, and interactive team breakout spaces.',
      execution: '100% turnkey night installations across 3 floors within 14 business days.',
      resultsHtml: '<p>Delivered an award-winning workspace environment that increased workplace satisfaction scores by 42% while causing zero interruption to daily enterprise workflows.</p>',
      metric1Value: '45K+',
      metric1Label: 'Sq. Ft. Branded',
      metric2Value: 'Zero',
      metric2Label: 'Workday Downtime',
      status: 'Published',
      date: '2026-02-10'
    },
    {
      id: 'cs2',
      client: 'AMD',
      industry: 'Semiconductor & Enterprise Tech',
      title: 'High-Performance Developer Summit & Global Live Broadcast',
      category: 'Conferences & AV',
      coverImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000',
      challenge: 'Deliver a flawless technical seminar for 850+ in-person CXOs and developers while streaming globally with zero audio/video lag.',
      strategy: 'Curved P2.6 LED stage backdrop, hot-standby audio/video matrix, Watchout media servers, and RFID delegate tracking.',
      execution: 'Turnkey stage production, green room management, and multi-cam broadcast in Bangalore.',
      resultsHtml: '<p>Orchestrated an end-to-end technical summit with 99.9% stream reliability and over 12,000 virtual attendees worldwide.</p>',
      metric1Value: '850+',
      metric1Label: 'CXO & Dev Attendees',
      metric2Value: '99.9%',
      metric2Label: 'Stream Uptime',
      status: 'Published',
      date: '2026-01-28'
    },
    {
      id: 'cs3',
      client: 'ACPL Systems',
      industry: 'Enterprise Cybersecurity',
      title: 'Account-Based Marketing & Executive CXO Dinner Series',
      category: 'Demand Generation',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
      challenge: 'Penetrate Tier-1 Enterprise CIOs and CISOs in Delhi NCR and Mumbai for cybersecurity advisory.',
      strategy: 'Integrated LinkedIn ABM messaging, personalized SDR cadences, and exclusive 5-star private executive roundtables.',
      execution: '3 closed-door roundtables hosted with 14 CISOs per city and direct account executive introductions.',
      resultsHtml: '<p>Successfully connected ACPL cybersecurity experts with 42 verified decision-makers resulting in 3.8x pipeline ROI within 90 days.</p>',
      metric1Value: '42',
      metric1Label: 'Qualified CXO Meetings',
      metric2Value: '3.8x',
      metric2Label: 'Pipeline ROI',
      status: 'Published',
      date: '2026-01-15'
    },
    {
      id: 'cs4',
      client: 'BenQ',
      industry: 'Display Technology',
      title: 'Immersive 3D Exhibition Pavilion & Live Color Labs',
      category: 'Exhibition Marketing',
      coverImage: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1000',
      challenge: 'Stand out on a crowded trade show floor at Pragati Maidan and demonstrate professional color accuracy displays.',
      strategy: 'Built a raised double-height wooden and glass pavilion featuring interactive darkroom display testing pods and executive hospitality.',
      execution: 'Turnkey 3D CAD modeling, CNC fabrication, lighting calibration, and badge scan lead capture.',
      resultsHtml: '<p>Captured record footfall with 2,800+ trade visitors experiencing hands-on display demos, generating 340+ dealer inquiries.</p>',
      metric1Value: '2,800+',
      metric1Label: 'Trade Show Visitors',
      metric2Value: '340+',
      metric2Label: 'Dealer Inquiries',
      status: 'Published',
      date: '2025-12-14'
    },
    {
      id: 'cs5',
      client: 'National FMCG Brand',
      industry: 'CPG & Personal Care',
      title: '12-City Mall & Residential Society Direct Sampling Tour',
      category: 'BTL Activation',
      coverImage: 'https://images.unsplash.com/photo-1560523136-40743f800c87?q=80&w=1000',
      challenge: 'Accelerate consumer trial and regional brand recall for a new organic personal care line across North and West India.',
      strategy: 'Multi-city hydraulic mobile vans, mall kiosks, and weekend gated society carnivals with gamified interactive surveys.',
      execution: 'Synchronized rollout across Delhi NCR, Jaipur, Chandigarh, Lucknow, Mumbai, and Pune over 30 days.',
      resultsHtml: '<p>Achieved unprecedented sampling velocity with 120,000+ consumer interactions and a 94% verified trial rate.</p>',
      metric1Value: '120K+',
      metric1Label: 'Samples Disbursed',
      metric2Value: '94%',
      metric2Label: 'Consumer Trial Rate',
      status: 'Published',
      date: '2025-11-20'
    },
    {
      id: 'cs6',
      client: 'Brigade Group',
      industry: 'Real Estate & Infrastructure',
      title: 'Luxury Leadership Retreat & Strategic Investor Conclave',
      category: 'Corporate Travel',
      coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000',
      challenge: 'Host a private high-stakes investor conclave in Goa with VIP charter logistics, bespoke branding, and zero room for error.',
      strategy: 'End-to-end luxury itinerary planning, beachfront stage set, private chartered flight coordination, and security protocols.',
      execution: 'Curated 3-day experience for 120 high-net-worth investors with gala networking dinners and keynote presentations.',
      resultsHtml: '<p>Delivered a flawless luxury experience resulting in 98% attendee satisfaction and high investor confidence.</p>',
      metric1Value: '120',
      metric1Label: 'HNW Investors Hosted',
      metric2Value: '98%',
      metric2Label: 'Satisfaction Rating',
      status: 'Published',
      date: '2025-10-18'
    }
  ];

  function getStoredCaseStudies() {
    try {
      let db = null;
      if (window.ESTCloudSync && typeof window.ESTCloudSync.getDB === 'function') {
        db = window.ESTCloudSync.getDB();
      }
      if (!db) {
        const saved = localStorage.getItem('EST_ADMIN_DB_V2');
        if (saved) db = JSON.parse(saved);
      }

      let rawStudies = null;
      if (db && Array.isArray(db.caseStudies)) {
        if (db._initialized || db._lastSync || db.caseStudies.length > 0) {
          rawStudies = db.caseStudies;
        }
      }

      if (!rawStudies) {
        rawStudies = DEFAULT_CASE_STUDIES;
      }

      return rawStudies.map(cs => ({
        id: cs.id || 'cs_' + Math.random().toString(36).substr(2, 9),
        client: cs.client || 'Enterprise Client',
        industry: cs.industry || 'Technology & B2B',
        title: cs.title || 'Client Deployment',
        category: cs.category || 'Corporate Work',
        coverImage: cs.coverImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000',
        challenge: cs.challenge || '',
        strategy: cs.strategy || '',
        execution: cs.execution || '',
        resultsHtml: cs.resultsHtml || '<p>Delivered measurable business ROI with high-intent audience conversion.</p>',
        metric1Value: cs.metric1Value || '',
        metric1Label: cs.metric1Label || '',
        metric2Value: cs.metric2Value || '',
        metric2Label: cs.metric2Label || '',
        status: cs.status || 'Published',
        date: cs.date || '2026'
      }));
    } catch (e) {
      console.warn('Could not read case studies:', e);
    }
    return DEFAULT_CASE_STUDIES;
  }

  // Open Case Study Reader Modal - 100% Dynamic Binding
  window.estOpenCaseStudy = function(studyId) {
    if (!studyId) return;
    const studies = getStoredCaseStudies();
    const study = studies.find(s => s.id === studyId);
    if (!study) return;

    try {
      if (window.location.hash !== `#${study.id}`) {
        history.replaceState(null, null, `#${study.id}`);
      }
    } catch (_) {}

    const catEl = document.getElementById('csModalCategoryTag');
    if (catEl) catEl.textContent = study.category || 'Case Study';

    const dateEl = document.getElementById('csModalDate');
    if (dateEl) dateEl.textContent = study.date || '2026';

    const coverEl = document.getElementById('csModalCoverImg');
    if (coverEl) {
      coverEl.src = study.coverImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000';
      coverEl.alt = study.title;
    }

    const clientEl = document.getElementById('csModalClient');
    if (clientEl) clientEl.textContent = `${study.client} | ${study.industry || 'Technology'}`;

    const titleEl = document.getElementById('csModalTitle');
    if (titleEl) titleEl.textContent = study.title;

    const metricsRow = document.getElementById('csModalMetricsRow');
    const m1Box = document.getElementById('csModalM1Box');
    const m1Val = document.getElementById('csModalM1Val');
    const m1Lab = document.getElementById('csModalM1Lab');
    const m2Box = document.getElementById('csModalM2Box');
    const m2Val = document.getElementById('csModalM2Val');
    const m2Lab = document.getElementById('csModalM2Lab');

    if (m1Box) {
      if (study.metric1Value) {
        m1Box.style.display = 'block';
        if (m1Val) m1Val.textContent = study.metric1Value;
        if (m1Lab) m1Lab.textContent = study.metric1Label || 'Achievement';
      } else {
        m1Box.style.display = 'none';
      }
    }

    if (m2Box) {
      if (study.metric2Value) {
        m2Box.style.display = 'block';
        if (m2Val) m2Val.textContent = study.metric2Value;
        if (m2Lab) m2Lab.textContent = study.metric2Label || 'Impact';
      } else {
        m2Box.style.display = 'none';
      }
    }

    if (metricsRow) {
      if (!study.metric1Value && !study.metric2Value) {
        metricsRow.style.display = 'none';
      } else {
        metricsRow.style.display = 'flex';
      }
    }

    const challengeEl = document.getElementById('csModalChallenge');
    if (challengeEl) challengeEl.textContent = study.challenge || '';

    const strategyEl = document.getElementById('csModalStrategy');
    if (strategyEl) strategyEl.textContent = study.strategy || '';

    const execEl = document.getElementById('csModalExecution');
    if (execEl) execEl.textContent = study.execution || '';

    const resultsEl = document.getElementById('csModalResults');
    if (resultsEl) {
      const res = study.resultsHtml || '<p>Delivered measurable business ROI and flawless execution.</p>';
      resultsEl.innerHTML = res.startsWith('<') ? res : `<p>${escapeHtml(res)}</p>`;
    }

    const modalOverlay = document.getElementById('caseStudyModalOverlay');
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function initDynamicCaseStudies() {
    const csGrid = document.getElementById('caseStudiesGrid');
    const filterListEl = document.getElementById('csFilterList');
    const searchInput = document.getElementById('csSearchInput');
    if (!csGrid && !filterListEl) return;

    let currentFilter = 'all';
    let searchQuery = '';

    // Support URL parameters: ?category=... or ?search=...
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCat = urlParams.get('category') || urlParams.get('filter');
      if (urlCat) currentFilter = urlCat;
      const urlQ = urlParams.get('search') || urlParams.get('q');
      if (urlQ) {
        searchQuery = urlQ.trim().toLowerCase();
        if (searchInput) searchInput.value = urlQ.trim();
      }
    } catch (_) {}

    if (searchInput) {
      searchInput.oninput = (e) => {
        searchQuery = (e.target.value || '').trim().toLowerCase();
        renderCaseStudiesHub();
      };
    }

    const modalOverlay = document.getElementById('caseStudyModalOverlay');
    const modalCloseBtn = document.getElementById('csModalCloseBtn');
    const copyLinkBtn = document.getElementById('btnCopyCaseStudyLink');

    function closeCaseStudyModal() {
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      try {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      } catch (_) {}
    }

    if (modalCloseBtn) modalCloseBtn.onclick = closeCaseStudyModal;
    if (modalOverlay) {
      modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) closeCaseStudyModal();
      };
    }

    if (copyLinkBtn) {
      copyLinkBtn.onclick = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(window.location.href).then(() => {
            const orig = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = '<i class="bi bi-check2" style="color: #10b981;"></i>';
            setTimeout(() => copyLinkBtn.innerHTML = orig, 2000);
          }).catch(() => {});
        }
      };
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeCaseStudyModal();
      }
    });

    function renderCaseStudiesHub() {
      const allStudies = getStoredCaseStudies().filter(c => !c.status || c.status.toLowerCase() === 'published');
      if (!allStudies.length && csGrid) {
        if (filterListEl) {
          filterListEl.innerHTML = `<li><button class="blog-filter-btn active" data-cs-filter="all"><span>All Work (0)</span></button></li>`;
        }
        csGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 70px 20px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
            <i class="bi bi-journal-x" style="font-size: 2.8rem; color: #fe3b20; display: block; margin-bottom: 14px;"></i>
            <h3 style="color: #fff; font-size: 1.25rem; font-weight: 600; margin-bottom: 6px;">No Case Studies Published Yet</h3>
            <p style="color: #94a3b8; font-size: 0.95rem; max-width: 480px; margin: 0 auto;">Client case studies will be displayed here once published from the admin panel.</p>
          </div>
        `;
        return;
      }

      // Build categories list dynamically from whatever case studies exist in DB
      if (filterListEl) {
        const categoriesSet = new Set();
        allStudies.forEach(s => {
          if (s.category && s.category.trim()) categoriesSet.add(s.category.trim());
        });

        // If currentFilter is not 'all' and no longer exists in DB, fallback to 'all'
        if (currentFilter !== 'all' && !categoriesSet.has(currentFilter)) {
          const matchCaseInsensitive = Array.from(categoriesSet).find(cat => cat.toLowerCase() === currentFilter.toLowerCase());
          if (matchCaseInsensitive) {
            currentFilter = matchCaseInsensitive;
          } else {
            currentFilter = 'all';
          }
        }

        const categories = ['all', ...Array.from(categoriesSet)];
        filterListEl.innerHTML = categories.map(cat => {
          const isAll = cat === 'all';
          const label = isAll ? 'All Work' : cat;
          const count = isAll ? allStudies.length : allStudies.filter(s => (s.category || '').toLowerCase() === cat.toLowerCase()).length;
          const isActive = isAll ? (currentFilter === 'all') : (currentFilter.toLowerCase() === cat.toLowerCase());
          return `
            <li>
              <button class="blog-filter-btn ${isActive ? 'active' : ''}" data-cs-filter="${escapeHtml(cat)}">
                <span>${escapeHtml(label)} (${count})</span>
              </button>
            </li>
          `;
        }).join('');

        filterListEl.querySelectorAll('.blog-filter-btn').forEach(btn => {
          btn.onclick = () => {
            filterListEl.querySelectorAll('.blog-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-cs-filter') || 'all';
            renderCaseStudiesHub();
          };
        });
      }

      // Filter by category & live search query
      let filtered = allStudies;
      if (currentFilter !== 'all') {
        const cf = currentFilter.toLowerCase();
        filtered = filtered.filter(s => (s.category || '').toLowerCase() === cf);
      }
      if (searchQuery) {
        filtered = filtered.filter(s =>
          (s.title || '').toLowerCase().includes(searchQuery) ||
          (s.client || '').toLowerCase().includes(searchQuery) ||
          (s.industry || '').toLowerCase().includes(searchQuery) ||
          (s.category || '').toLowerCase().includes(searchQuery) ||
          (s.challenge || '').toLowerCase().includes(searchQuery) ||
          (s.strategy || '').toLowerCase().includes(searchQuery) ||
          (s.execution || '').toLowerCase().includes(searchQuery)
        );
      }

      if (csGrid) {
        if (filtered.length === 0) {
          csGrid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-card);">
              <i class="bi bi-briefcase" style="font-size: 2.5rem; color: var(--color-primary); display: block; margin-bottom: 0.5rem;"></i>
              No case studies found matching your criteria. Check back soon or try another search!
            </div>
          `;
        } else {
          csGrid.innerHTML = filtered.map((c, idx) => `
            <div class="glass-panel case-study-card" onclick="window.estOpenCaseStudy('${escapeHtml(c.id)}')" data-aos="fade-up" data-aos-delay="${(idx % 5 + 1) * 50}" style="cursor: pointer;">
              <div class="case-study-thumb">
                <img src="${escapeHtml(c.coverImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000')}" alt="${escapeHtml(c.title)}" class="case-study-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000';">
                <span class="case-study-badge">${escapeHtml(c.category)}</span>
              </div>
              <div class="case-study-body">
                <div class="case-study-client">${escapeHtml(c.client)} | ${escapeHtml(c.industry || 'Technology')}</div>
                <h3 class="case-study-title">${escapeHtml(c.title)}</h3>
                ${c.challenge ? `<div class="cs-meta-block"><span class="cs-meta-label">Challenge:</span> ${escapeHtml(c.challenge)}</div>` : ''}
                ${c.strategy ? `<div class="cs-meta-block"><span class="cs-meta-label">Strategy:</span> ${escapeHtml(c.strategy)}</div>` : ''}
                ${c.execution ? `<div class="cs-meta-block"><span class="cs-meta-label">Execution:</span> ${escapeHtml(c.execution)}</div>` : ''}
                ${(c.metric1Value || c.metric2Value) ? `
                  <div class="cs-metrics-row">
                    ${c.metric1Value ? `
                      <div class="cs-metric-box">
                        <div class="cs-metric-value">${escapeHtml(c.metric1Value)}</div>
                        <div class="cs-metric-label">${escapeHtml(c.metric1Label || 'Achievement')}</div>
                      </div>
                    ` : ''}
                    ${c.metric2Value ? `
                      <div class="cs-metric-box">
                        <div class="cs-metric-value">${escapeHtml(c.metric2Value)}</div>
                        <div class="cs-metric-label">${escapeHtml(c.metric2Label || 'Impact')}</div>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
                <div style="margin-top: 1.25rem; display: flex; justify-content: flex-end;">
                  <button class="btn btn-outline" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;" onclick="event.stopPropagation(); window.estOpenCaseStudy('${escapeHtml(c.id)}')">
                    <span>Full Case Study</span> <i class="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('');

          // Re-trigger AOS animations for dynamically injected case study cards
          if (typeof AOS !== 'undefined') {
            try { AOS.refresh(); } catch (_) {}
          }

          // Safety guarantee: Ensure all cards are visible even if animation library lags
          setTimeout(() => {
            if (csGrid) {
              csGrid.querySelectorAll('.case-study-card').forEach(card => {
                card.classList.add('aos-animate');
                card.style.opacity = '1';
                card.style.transform = 'none';
              });
            }
          }, 250);
        }
      }
    }

    window.estRefreshCaseStudies = renderCaseStudiesHub;
    renderCaseStudiesHub();

    // Check deep link hash (#cs1 or ?id=cs1)
    const checkCsHash = () => {
      const hash = window.location.hash.replace('#', '');
      const urlParams = new URLSearchParams(window.location.search);
      const targetId = hash || urlParams.get('id');
      if (targetId && (targetId.startsWith('cs') || targetId.startsWith('cs_'))) {
        setTimeout(() => {
          window.estOpenCaseStudy(targetId);
        }, 200);
      }
    };

    checkCsHash();
    window.addEventListener('hashchange', checkCsHash);
  }

  // ==========================================
  // 13. Dynamic Knowledge Hubs & Strategy Clusters CMS Engine
  // ==========================================
  const DEFAULT_INSIGHT_CLUSTERS = [
    {
      id: 'ic1',
      title: 'Experiential Marketing',
      icon: 'bi-stars',
      category: 'Experiential',
      desc: 'Strategies for connecting brand values with sensory customer immersion.',
      articles: [
        { title: 'What Is Experiential Marketing?', url: 'services/experiential-marketing.html' },
        { title: 'Experiential vs Traditional Marketing', url: 'services/experiential-marketing.html#faq' },
        { title: 'How to Measure Experiential ROI', url: 'services/experiential-marketing.html#capabilities' },
        { title: 'Experiential Marketing Trends in India', url: 'services/experiential-marketing.html' }
      ],
      status: 'Active'
    },
    {
      id: 'ic2',
      title: 'B2B Demand Generation',
      icon: 'bi-funnel',
      category: 'Growth',
      desc: 'Frameworks for building predictable enterprise sales pipelines.',
      articles: [
        { title: 'What Is B2B Demand Generation?', url: 'services/demand-generation.html' },
        { title: 'Demand Gen vs Raw Lead Gen', url: 'services/demand-generation.html#faq' },
        { title: 'B2B Ideal Customer Profile (ICP) Framework', url: 'services/demand-generation.html#strategy' },
        { title: 'LinkedIn ABM Outreach Strategies', url: 'services/demand-generation.html' }
      ],
      status: 'Active'
    },
    {
      id: 'ic3',
      title: 'Corporate Events',
      icon: 'bi-calendar4-event',
      category: 'Events',
      desc: 'Best practices for planning zero-glitch conferences and product launches.',
      articles: [
        { title: 'Corporate Conference Planning Checklist', url: 'services/event-management.html' },
        { title: 'Product Launch Event Strategy', url: 'services/event-management.html#events-managed' },
        { title: 'Technical AV Redundancy Standards', url: 'services/event-management.html#faq' },
        { title: 'Measuring Corporate Event ROI', url: 'services/event-management.html' }
      ],
      status: 'Active'
    },
    {
      id: 'ic4',
      title: 'BTL & Brand Activations',
      icon: 'bi-megaphone',
      category: 'Experiential',
      desc: 'On-ground roadshows, direct sampling, and mall intercept playbooks.',
      articles: [
        { title: 'What Is Below-The-Line (BTL) Marketing?', url: 'services/btl-activation.html' },
        { title: 'ATL vs BTL vs TTL Marketing Guide', url: 'services/btl-activation.html#activation-types' },
        { title: 'How to Plan a Multi-City Brand Roadshow', url: 'services/btl-activation.html#activation-types' },
        { title: 'Promoter Management & Live Tracking', url: 'services/btl-activation.html#faq' }
      ],
      status: 'Active'
    },
    {
      id: 'ic5',
      title: 'Exhibition & Trade Shows',
      icon: 'bi-grid-1x2',
      category: 'Exhibitions',
      desc: 'Turning trade show booths into high-velocity lead generation assets.',
      articles: [
        { title: 'How to Generate Leads at Trade Shows', url: 'services/exhibition.html#three-phase' },
        { title: '3D Exhibition Stall Design Principles', url: 'services/exhibition.html' },
        { title: 'Trade Show Venue Approvals in India', url: 'services/exhibition.html#faq' },
        { title: 'Post-Exhibition Lead Nurturing Workflows', url: 'services/exhibition.html#three-phase' }
      ],
      status: 'Active'
    }
  ];

  function getStoredInsightClusters() {
    try {
      const saved = localStorage.getItem('EST_ADMIN_DB_V2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.insightClusters) && parsed.insightClusters.length > 0) {
          return parsed.insightClusters.map(ic => ({
            id: ic.id || 'ic_' + Math.random().toString(36).substr(2, 9),
            title: ic.title || 'Knowledge Hub',
            icon: ic.icon || 'bi-stars',
            category: ic.category || 'Strategy',
            desc: ic.desc || 'Strategy frameworks and playbooks.',
            articles: Array.isArray(ic.articles) && ic.articles.length > 0 ? ic.articles : [
              { title: 'Strategic Overview Guide', url: 'services/marketing-consulting.html' }
            ],
            status: ic.status || 'Active'
          }));
        }
      }
    } catch (e) {
      console.warn('Could not read insight clusters from localStorage:', e);
    }
    return DEFAULT_INSIGHT_CLUSTERS;
  }

  function initDynamicInsights() {
    const clusterGrid = document.getElementById('insightClustersGrid');
    if (!clusterGrid) return;

    function renderClustersHub() {
      const allClusters = getStoredInsightClusters().filter(ic => !ic.status || ic.status.toLowerCase() === 'active');

      clusterGrid.innerHTML = allClusters.map((ic, idx) => `
        <div class="glass-panel insight-cluster-card" data-aos="fade-up" data-aos-delay="${(idx % 5 + 1) * 50}">
          <div class="cluster-header">
            <div class="cluster-icon flex-center"><i class="bi ${escapeHtml(ic.icon || 'bi-stars')}"></i></div>
            <h3 class="cluster-title">${escapeHtml(ic.title)}</h3>
          </div>
          <p class="tab-content-text" style="font-size: 0.9rem; margin-bottom: 1.25rem;">${escapeHtml(ic.desc || '')}</p>
          <ul class="cluster-articles-list">
            ${(ic.articles || []).map(art => `
              <li>
                <a href="${escapeHtml(art.url)}">
                  <span>${escapeHtml(art.title)}</span>
                  <i class="bi bi-arrow-right"></i>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('');
    }

    window.estRefreshInsights = renderClustersHub;
    renderClustersHub();
  }

  // ==========================================
  // 14. Page Route CMS Initializers
  // ==========================================
  const isCaseStudyPage = window.location.pathname.toLowerCase().includes('case-studies') ||
                          document.getElementById('caseStudiesGrid') ||
                          document.getElementById('csFilterList');

  if (isCaseStudyPage) {
    initDynamicCaseStudies();
  }

  const isInsightsPage = window.location.pathname.toLowerCase().includes('insights') ||
                         document.getElementById('insightClustersGrid');

  if (isInsightsPage) {
    initDynamicInsights();
  }

  // Real-time synchronization across browser tabs and same-window events
  function refreshAllDynamicEngines() {
    if (typeof window.estRefreshCaseStudies === 'function') window.estRefreshCaseStudies();
    if (typeof window.estRefreshInsights === 'function') window.estRefreshInsights();
    if (typeof initDynamicPortfolio === 'function') initDynamicPortfolio();
    if (typeof initDynamicBentoShowcase === 'function') initDynamicBentoShowcase();
    if (typeof initDynamicClients === 'function') initDynamicClients();
    if (typeof initDynamicServices === 'function') initDynamicServices();
  }

  window.addEventListener('storage', (e) => {
    if (!e.key || e.key === 'EST_ADMIN_DB_V2' || e.key === 'EST_ADMIN_DB_SYNC_TS') {
      refreshAllDynamicEngines();
    }
  });

  window.addEventListener('EST_DB_UPDATED', () => {
    refreshAllDynamicEngines();
  });

  window.addEventListener('EST_DB_SYNC', () => {
    refreshAllDynamicEngines();
  });

  if (window.ESTCloudSync && typeof window.ESTCloudSync.onSync === 'function') {
    window.ESTCloudSync.onSync(() => {
      refreshAllDynamicEngines();
    });
  }

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const syncChannel = new BroadcastChannel('est_admin_sync');
      syncChannel.onmessage = (event) => {
        if (event.data && event.data.type === 'DB_UPDATE') {
          refreshAllDynamicEngines();
        }
      };
    } catch (_) {}
  }

  // ==========================================
  // 15. Experiential Features & Dynamic Showcase Interactions
  // ==========================================
  
  // (A) Hero Animated Typewriter Word Cycler
  const heroDynamicWordEl = document.getElementById('hero-dynamic-word');
  if (heroDynamicWordEl) {
    const words = ['LOUD', 'IMPACT', 'GOOSEBUMPS', 'SCALE', 'UNFORGETTABLE', 'STORYTELLING', 'INNOVATION'];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 120;

    function typeHeroWord() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        heroDynamicWordEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 60;
      } else {
        heroDynamicWordEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 130;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2200; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 350; // Pause before typing next word
      }

      setTimeout(typeHeroWord, typeSpeed);
    }

    typeHeroWord();
  }

  // (B) Dynamic Bento Showcase & Real-Time Admin Sync
  function initDynamicBentoShowcase() {
    const bentoGrid = document.querySelector('.bento-showcase-grid');
    if (!bentoGrid) return;

    const STORAGE_KEY = 'EST_ADMIN_DB_V2';
    let db = null;
    if (window.ESTCloudSync && typeof window.ESTCloudSync.getDB === 'function') {
      db = window.ESTCloudSync.getDB();
    }
    if (!db) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) db = JSON.parse(raw);
      } catch (e) {
        console.warn('Error reading db for showcase:', e);
      }
    }

    const studies = (db && Array.isArray(db.caseStudies))
      ? db.caseStudies.filter(c => !c.status || c.status.toLowerCase() === 'published')
      : [];

    if (!studies || studies.length === 0) {
      bentoGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: #94a3b8; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
          <i class="bi bi-briefcase" style="font-size: 2.5rem; color: #fe3b20; display: block; margin-bottom: 12px;"></i>
          <h4 style="color: #fff; font-size: 1.2rem; margin-bottom: 6px;">No Featured Experiences Added Yet</h4>
          <p style="font-size: 0.9rem; max-width: 480px; margin: 0 auto;">Add featured case studies and experiences in the Admin Panel to display them here.</p>
        </div>
      `;
      return;
    }

    const spanPatterns = [
      'bento-card-large',
      'bento-card-medium',
      'bento-card-medium',
      'bento-card-large',
      'bento-card-equal',
      'bento-card-equal',
      'bento-card-third',
      'bento-card-large'
    ];

    bentoGrid.innerHTML = studies.map((item, idx) => {
      const spanClass = spanPatterns[idx % spanPatterns.length];
      const cat = (item.category || 'Experiential').toLowerCase();
      
      let filterClasses = ['all'];
      if (cat.includes('lux') || cat.includes('gala') || cat.includes('jewelry') || cat.includes('soiree')) filterClasses.push('luxury');
      if (cat.includes('conf') || cat.includes('summit') || cat.includes('conclave') || cat.includes('tour') || cat.includes('av')) filterClasses.push('conferences');
      if (cat.includes('exhib') || cat.includes('pavilion') || cat.includes('fair') || cat.includes('booth') || cat.includes('stall')) filterClasses.push('exhibitions');
      if (cat.includes('activa') || cat.includes('launch') || cat.includes('btl') || cat.includes('retail')) filterClasses.push('activations');
      filterClasses.push('experiential');
      const categoryAttr = filterClasses.join(' ');

      const metricLabel = item.metric1Label || 'Impact';
      const metricVal = item.metric1Value || '100%';
      let metricIcon = 'bi-graph-up-arrow';
      const mLow = (metricLabel + ' ' + metricVal).toLowerCase();
      if (mLow.includes('impression') || mLow.includes('reach') || mLow.includes('pipeline') || mLow.includes('$')) metricIcon = 'bi-graph-up-arrow';
      else if (mLow.includes('delegate') || mLow.includes('c-suite') || mLow.includes('attend') || mLow.includes('people') || mLow.includes('meet')) metricIcon = 'bi-people-fill';
      else if (mLow.includes('star') || mLow.includes('vip') || mLow.includes('luxury')) metricIcon = 'bi-star-fill';
      else if (mLow.includes('media') || mLow.includes('stream') || mLow.includes('conversion') || mLow.includes('film')) metricIcon = 'bi-camera-reels-fill';
      else if (mLow.includes('booking') || mLow.includes('sale') || mLow.includes('order')) metricIcon = 'bi-lightning-charge-fill';
      else if (mLow.includes('architect') || mLow.includes('design') || mLow.includes('marvel')) metricIcon = 'bi-palette';
      else if (mLow.includes('gem') || mLow.includes('hnw')) metricIcon = 'bi-gem';

      const desc = item.description || item.strategy || item.challenge || '';
      const coverImg = item.coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200';

      return `
        <div class="bento-card ${spanClass}" data-cs-id="${escapeHtml(item.id)}" data-category="${escapeHtml(categoryAttr)}" data-aos="fade-up" data-aos-delay="${(idx % 4 + 1) * 100}">
          <div class="bento-bg-media">
            <img src="${escapeHtml(coverImg)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200';">
          </div>
          <div class="bento-gradient-overlay"></div>
          <div class="bento-top-meta">
            <span class="bento-category-tag">${escapeHtml(item.category || 'Experiential')}</span>
            <span class="bento-client-badge">${escapeHtml(item.client || 'EST Brand')}</span>
          </div>
          <div class="bento-card-content">
            <h3 class="bento-project-title">${escapeHtml(item.title)}</h3>
            <p class="bento-project-desc">${escapeHtml(desc)}</p>
            <div class="bento-action-row">
              <span class="bento-metric-tag"><i class="bi ${metricIcon}"></i> ${escapeHtml(metricVal)} ${escapeHtml(metricLabel)}</span>
              <div class="bento-arrow-btn"><i class="bi bi-arrow-up-right"></i></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    bindBentoFiltersAndModal();
  }

  function bindBentoFiltersAndModal() {
    const showcaseFilterBtns = document.querySelectorAll('.showcase-pill-btn');
    const bentoCards = document.querySelectorAll('.bento-card');

    showcaseFilterBtns.forEach(btn => {
      btn.onclick = () => {
        showcaseFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter') || 'all';

        bentoCards.forEach(card => {
          const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
          if (filterVal === 'all' || cardCategory.includes(filterVal.toLowerCase())) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.display = 'none';
          }
        });
      };
    });

    // Bento Card Click -> Project Preview Modal
    bentoCards.forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest('a') && !e.target.closest('.bento-arrow-btn')) return;

        const title = card.querySelector('.bento-project-title')?.textContent || 'Showcase Project';
        const desc = card.querySelector('.bento-project-desc')?.textContent || '';
        const category = card.querySelector('.bento-category-tag')?.textContent || 'Experiential';
        const client = card.querySelector('.bento-client-badge')?.textContent || 'Enterprise Client';
        const metric = card.querySelector('.bento-metric-tag')?.textContent || '';
        const imgSrc = card.querySelector('.bento-bg-media img')?.getAttribute('src') || '';

        let modalOverlay = document.getElementById('estProjectModal');
        if (!modalOverlay) {
          modalOverlay = document.createElement('div');
          modalOverlay.id = 'estProjectModal';
          modalOverlay.className = 'article-modal-overlay';
          modalOverlay.style.zIndex = '9999';
          modalOverlay.innerHTML = `
            <div class="article-modal-box" style="max-width: 820px; background: #0b0f19; border: 1px solid rgba(0,240,255,0.3); color: #ffffff;">
              <div class="article-modal-top-bar" style="border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.6);">
                <span class="category-pill" id="vModalCategory" style="background: var(--neon-cyan); color: #000; font-weight: 700;"></span>
                <button class="article-modal-close-btn" style="color: #ffffff;"><i class="bi bi-x-lg"></i></button>
              </div>
              <div style="max-height: 75vh; overflow-y: auto; padding: 24px;">
                <img id="vModalImg" src="" style="width: 100%; height: 340px; object-fit: cover; border-radius: 14px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                  <span id="vModalClient" style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;"></span>
                  <span id="vModalMetric" style="color: var(--neon-cyan); font-weight: 700; font-size: 0.95rem;"></span>
                </div>
                <h2 id="vModalTitle" style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; line-height: 1.2; margin-bottom: 16px; color: #ffffff;"></h2>
                <p id="vModalDesc" style="font-size: 1.1rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 24px;"></p>
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                  <a href="our-works.html" class="btn btn-est-primary" style="padding: 12px 28px;">Explore Our Works <i class="bi bi-arrow-right"></i></a>
                  <a href="contact.html" class="btn btn-est-glass" style="padding: 12px 24px;">Plan Similar Experience</a>
                </div>
              </div>
            </div>
          `;
          document.body.appendChild(modalOverlay);

          const closeBtn = modalOverlay.querySelector('.article-modal-close-btn');
          closeBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
          });

          modalOverlay.addEventListener('click', (evt) => {
            if (evt.target === modalOverlay) {
              modalOverlay.classList.remove('active');
              document.body.style.overflow = '';
            }
          });
        }

        document.getElementById('vModalCategory').textContent = category;
        document.getElementById('vModalClient').textContent = client;
        document.getElementById('vModalMetric').textContent = metric;
        document.getElementById('vModalTitle').textContent = title;
        document.getElementById('vModalDesc').textContent = desc;
        document.getElementById('vModalImg').src = imgSrc;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
    });
  }

  // ==========================================
  // Dynamic Enterprise Client Logos Sync
  // ==========================================
  const DEFAULT_CLIENTS_DATA = [
    { name: "ACPL Systems", logoUrl: "storage/clients/all-logos/01JZT7BZXA4VA77AJE5S3FGNK9.jpg", category: "Technology", status: "Active" },
    { name: "Adobe", logoUrl: "storage/clients/all-logos/01JZT7DKZPCEVYQ49KXZ72W0DN.jpg", category: "Technology", status: "Active" },
    { name: "AMD", logoUrl: "storage/clients/all-logos/01JZT7E9X8WE3FAG84PMENQYW7.jpg", category: "Technology", status: "Active" },
    { name: "AVEDA", logoUrl: "storage/clients/all-logos/01JZT7FXEK89XNP9QHDRM9HDQA.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "BenQ", logoUrl: "storage/clients/all-logos/01JZT7GHG1FG4GHCAY441MGQRE.jpg", category: "Hardware & Print", status: "Active" },
    { name: "Brigade Group", logoUrl: "storage/clients/all-logos/01JZT7H8NRXQ34NZ7Y9NSCAM8T.jpg", category: "Real Estate & Infrastructure", status: "Active" },
    { name: "Builder.ai", logoUrl: "storage/clients/all-logos/01JZT7J7WDT0YFT6W8FJ9E0Z6V.jpg", category: "Technology", status: "Active" },
    { name: "CAST Software", logoUrl: "storage/clients/all-logos/01JZT7K0CH1NW2F3CKBNRPW48D.jpg", category: "Enterprise IT", status: "Active" },
    { name: "Croma", logoUrl: "storage/clients/all-logos/01JZT7KN0BE99VDQ32KKP195T0.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Elekore", logoUrl: "storage/clients/all-logos/01JZT7MBTFNKPYNB20TZKSPF1X.jpg", category: "Energy & Infrastructure", status: "Active" },
    { name: "Embee Software", logoUrl: "storage/clients/all-logos/01JZT7NEVMSY3JK82A65X5BMZF.jpg", category: "Enterprise IT", status: "Active" },
    { name: "Eros Group", logoUrl: "storage/clients/all-logos/01JZT7P6KV6JCS3E7RBGDCRGPW.jpg", category: "Real Estate & Infrastructure", status: "Active" },
    { name: "Softline", logoUrl: "storage/clients/all-logos/01JZT7RWJABEVAZDF71CR2NDRG.jpg", category: "Enterprise IT", status: "Active" },
    { name: "GAP", logoUrl: "storage/clients/all-logos/01JZT7SK5P2PMBT0KFRHYKK637.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Harvest Gold", logoUrl: "storage/clients/all-logos/01JZT7T80Y7H2JKCT170BH1AH9.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Moët Hennessy", logoUrl: "storage/clients/all-logos/01JZT7VQWBT95S84FXR88CTGFE.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Kingfisher", logoUrl: "storage/clients/all-logos/01JZT7WF76VXZHB4GG7P45V92M.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Lighthouse Canton", logoUrl: "storage/clients/all-logos/01JZT7YSVGN5FDXAH4GJ79FK3Z.jpg", category: "BFSI", status: "Active" },
    { name: "Mother Dairy", logoUrl: "storage/clients/all-logos/01JZT7ZNEHHZWXDKF4EKQ5RZ9C.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Neovantage Innovation Parks", logoUrl: "storage/clients/all-logos/01JZT80FCSTB105P5C67VAGXJW.jpg", category: "Real Estate & Infrastructure", status: "Active" },
    { name: "Noventiq", logoUrl: "storage/clients/all-logos/01JZT81GDVN0MCC8EA7CZEKTQ4.jpg", category: "Enterprise IT", status: "Active" },
    { name: "Puravankara", logoUrl: "storage/clients/all-logos/01JZT827C4AVD8Y2AYD2BAXHFC.jpg", category: "Real Estate & Infrastructure", status: "Active" },
    { name: "Quess Corp", logoUrl: "storage/clients/all-logos/01JZT82YYDAQZB9Y6CDHQVC0DB.jpg", category: "Enterprise IT", status: "Active" },
    { name: "Savex Technologies", logoUrl: "storage/clients/all-logos/01JZT83NV8Z8P2S3FEN4N3J56H.jpg", category: "Technology", status: "Active" },
    { name: "Sephora", logoUrl: "storage/clients/all-logos/01JZT85CC1MZWCB0CNKGE7QKHT.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Shalimar Paints", logoUrl: "storage/clients/all-logos/01JZT865DQ6G2WK9FJH8E16RM7.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Siemens", logoUrl: "storage/clients/all-logos/01JZT86X7SDV30D6NGF4G42S4G.jpg", category: "Technology", status: "Active" },
    { name: "Taylor & Francis Group", logoUrl: "storage/clients/all-logos/01JZT87JQVNA4D8MYQCKG8RT2V.jpg", category: "Enterprise IT", status: "Active" },
    { name: "Tech Data", logoUrl: "storage/clients/all-logos/01JZT88F4AED61YS8PCWGDY9J6.jpg", category: "Technology", status: "Active" },
    { name: "Umbrella Infocare", logoUrl: "storage/clients/all-logos/01JZT89479VPRSW9BFHX9DJETC.jpg", category: "Enterprise IT", status: "Active" },
    { name: "Varchas Spirits", logoUrl: "storage/clients/all-logos/01JZT89SQHE0RJT87RK952PTD7.jpg", category: "Consumer & Retail", status: "Active" },
    { name: "Western Digital", logoUrl: "storage/clients/all-logos/01JZT8ADQ14TWK41XRBWP0KXTR.jpg", category: "Technology", status: "Active" }
  ];

  function initDynamicClients() {
    const grids = document.querySelectorAll('.dynamic-clients-grid, #dynamic-clients-grid, #clients-page-grid, #about-clients-grid');
    if (!grids.length) return;

    let db = null;
    if (window.ESTCloudSync && typeof window.ESTCloudSync.getDB === 'function') {
      db = window.ESTCloudSync.getDB();
    }
    if (!db) {
      try {
        const raw = localStorage.getItem('EST_ADMIN_DB_V2');
        if (raw) db = JSON.parse(raw);
      } catch (e) {
        console.warn('Error reading db for clients:', e);
      }
    }

    const clients = (db && Array.isArray(db.clients) && db.clients.length > 0)
      ? db.clients
      : DEFAULT_CLIENTS_DATA;

    const activeClients = clients.filter(c => !c.status || c.status.toLowerCase() === 'active');

    grids.forEach(grid => {
      const isClientsPage = grid.id === 'clients-page-grid' || window.location.pathname.includes('clients.html');
      const isHomePage = grid.id === 'dynamic-clients-grid' || (!isClientsPage && grid.id !== 'about-clients-grid' && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === ''));

      // On home page, strictly show top 10 company logos; clients page shows full roster
      const clientsToRender = isHomePage ? activeClients.slice(0, 10) : activeClients;

      const cardHeight = isClientsPage ? '150px' : '110px';
      const maxImgHeight = isClientsPage ? '75px' : '60px';
      const padding = isClientsPage ? '2rem' : '1.5rem';

      if (clientsToRender.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: #94a3b8; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
            <p style="margin: 0; font-size: 0.95rem;">No active clients registered in admin panel.</p>
          </div>
        `;
        return;
      }

      if (isHomePage) {
        // Dual-row marquee for home page: Row 1 moves Left-to-Right, Row 2 moves Right-to-Left
        const row1 = clientsToRender.slice(0, 5);
        const row2 = clientsToRender.slice(5, 10);

        const buildTrackHtml = (items, baseDelayOffset = 0) => {
          // Quadruple items to guarantee seamless 50% infinite translation on all screen widths
          const quad = [...items, ...items, ...items, ...items];
          return quad.map((c, i) => {
            const delay = ((i % 5) * 0.8 + baseDelayOffset).toFixed(1);
            const logo = c.logoUrl || '';
            const name = c.name || 'Partner Brand';
            return `
              <div class="glass-panel flex-center client-logo-card blink-pulse" style="animation-delay: ${delay}s;" title="${escapeHtml(name)}">
                ${logo ? `
                  <img src="${escapeHtml(logo)}" 
                       alt="${escapeHtml(name)} Logo" 
                       title="${escapeHtml(name)}"
                       onerror="this.style.display='none'; this.nextElementSibling ? this.nextElementSibling.style.display='block' : null;">
                  <span style="display: none; font-weight: 600; font-size: 0.9rem; color: #fff;">${escapeHtml(name)}</span>
                ` : `
                  <span style="font-weight: 600; font-size: 0.95rem; color: #fff;">${escapeHtml(name)}</span>
                `}
              </div>
            `;
          }).join('');
        };

        grid.className = 'clients-marquee-container';
        grid.innerHTML = `
          <div class="marquee-row marquee-ltr" aria-label="Brand Partners Row 1 (Left to Right)">
            <div class="marquee-track">
              ${buildTrackHtml(row1, 0)}
            </div>
          </div>
          <div class="marquee-row marquee-rtl" aria-label="Brand Partners Row 2 (Right to Left)">
            <div class="marquee-track">
              ${buildTrackHtml(row2, 0.4)}
            </div>
          </div>
        `;
        return;
      }

      grid.innerHTML = clientsToRender.map((c, idx) => {
        const delay = (idx % 6) * 50;
        const logo = c.logoUrl || '';
        const name = c.name || 'Partner Brand';
        return `
          <div class="glass-panel flex-center client-logo-card" style="padding: ${padding}; height: ${cardHeight}; border-radius: 12px; background: rgba(255, 255, 255, 0.03);" data-aos="fade-up" data-aos-delay="${delay}">
            ${logo ? `
              <img src="${escapeHtml(logo)}" 
                   alt="${escapeHtml(name)} Logo" 
                   title="${escapeHtml(name)}"
                   style="max-height: ${maxImgHeight}; max-width: 85%; width: auto; object-fit: contain; filter: grayscale(100%); transition: all 0.3s ease;" 
                   onmouseover="this.style.filter='grayscale(0%)'; this.style.transform='scale(1.08)';" 
                   onmouseout="this.style.filter='grayscale(100%)'; this.style.transform='scale(1)';"
                   onerror="this.style.display='none'; this.nextElementSibling ? this.nextElementSibling.style.display='block' : null;">
              <span style="display: none; font-weight: 600; font-size: 0.9rem; color: #fff;">${escapeHtml(name)}</span>
            ` : `
              <span style="font-weight: 600; font-size: 0.95rem; color: #fff;">${escapeHtml(name)}</span>
            `}
          </div>
        `;
      }).join('');
    });
  }

  // Hook sync listeners
  if (!window._clientsSyncBound) {
    window._clientsSyncBound = true;
    if (window.ESTCloudSync && typeof window.ESTCloudSync.onSync === 'function') {
      window.ESTCloudSync.onSync(() => initDynamicClients());
    }
  }

  // ==========================================
  // Dynamic Services Ecosystem Sync (From Admin)
  // ==========================================
  const DEFAULT_SERVICES_DATA = [
    {
      id: 's1',
      title: 'Event Management',
      subtitle: 'From corporate conferences to product launches, we create impactful and memorable events.',
      category: 'Events',
      icon: 'bi-calendar4-event',
      slug: 'services/event-management.html',
      status: 'Active',
      desc: 'With a combined 80 years of experience, our team brings unmatched expertise in strategic planning, coordination, and execution of conferences, product launches, exhibitions, and trade shows across India. Turnkey venue selection, staging, AV, and guest management.'
    },
    {
      id: 's2',
      title: 'Demand Generation',
      subtitle: 'Reach new audiences and convert interest into actionable leads through data-driven strategies.',
      category: 'Growth',
      icon: 'bi-funnel',
      slug: 'services/demand-generation.html',
      status: 'Active',
      desc: 'We work with B2B services and demand generation product companies to design ideal target segments. Dedicated SDRs and outbound GTM experts fuel your sales pipeline with high-quality business leads and decision-maker meetings.'
    },
    {
      id: 's3',
      title: 'Corporate Travel & Hospitality',
      subtitle: 'Seamlessly manage business travel needs with efficient hotel and flight booking solutions.',
      category: 'Corporate',
      icon: 'bi-airplane-engines',
      slug: 'services/corporate-travel.html',
      status: 'Active',
      desc: 'We bring a full-value proposition backed by strength, experience, technology, and innovation to meet all your corporate travel needs. 5-star room blocks, group flight bookings, luxury charters, and turnkey MICE itineraries.'
    },
    {
      id: 's4',
      title: 'Retail & Office Branding Solutions',
      subtitle: 'Transform physical spaces with tailored branding that reflects your business identity and values.',
      category: 'Branding',
      icon: 'bi-shop',
      slug: 'services/retail-branding.html',
      status: 'Active',
      desc: 'Create distinct and memorable brand identities in physical retail environments or corporate offices. Bespoke design and flawless execution that enhances spaces, elevates brand perception, and increases foot traffic and engagement.'
    },
    {
      id: 's5',
      title: 'BTL Activation',
      subtitle: 'Boost consumer engagement and brand awareness with dynamic on-ground marketing initiatives.',
      category: 'Experiential',
      icon: 'bi-megaphone',
      slug: 'services/btl-activation.html',
      status: 'Active',
      desc: 'Deep expertise in product sampling, in-store promotions, experiential marketing, mall and tech-park activations, roadshows, and nationwide brand intercepts delivering highly measurable and cost-effective engagement.'
    },
    {
      id: 's6',
      title: 'Exhibition & Trade Shows',
      subtitle: 'Plan and design your exhibition booths to create immersive brand experiences that stand out.',
      category: 'Exhibitions',
      icon: 'bi-grid-1x2',
      slug: 'services/exhibition.html',
      status: 'Active',
      desc: 'Comprehensive expertise in every aspect of exhibition management: 3D stall design, custom architectural fabrication, on-ground logistics, and attendee engagement for physical, virtual, and hybrid trade expos.'
    },
    {
      id: 's7',
      title: 'Digital Marketing',
      subtitle: 'Enhance your digital presence with targeted campaigns across SEO, social media, and more.',
      category: 'Digital',
      icon: 'bi-phone-vibrate',
      slug: 'services/digital-marketing.html',
      status: 'Active',
      desc: 'Elevate your digital presence with cutting-edge, performance-driven strategies. SEO dominance, targeted LinkedIn B2B thought leadership, performance ad campaigns, and innovative multi-channel brand storytelling.'
    },
    {
      id: 's8',
      title: 'Experiential Marketing',
      subtitle: 'We engineer experiences that become the talk of the town.',
      category: 'Experiential',
      icon: 'bi-stars',
      slug: 'services/experiential-marketing.html',
      status: 'Active',
      desc: 'Multi-sensory brand installations, kinetic LED reveals, holographic showcases, interactive domes, and luxury VIP experiences that pull audiences directly into your brand story.'
    },
    {
      id: 's9',
      title: 'Marketing Consulting',
      subtitle: 'Strategic marketing advisory built for high-stakes enterprise business goals.',
      category: 'Strategy',
      icon: 'bi-compass',
      slug: 'services/marketing-consulting.html',
      status: 'Active',
      desc: 'Bridging high-level corporate marketing strategy with boots-on-the-ground operational execution. Founded by corporate marketing veterans to align ICP demand, brand equity, and closed-loop revenue attribution.'
    }
  ];

  function initDynamicServices() {
    const grid = document.getElementById('dynamic-services-grid');
    if (!grid) return;

    let db = null;
    if (window.ESTCloudSync && typeof window.ESTCloudSync.getDB === 'function') {
      db = window.ESTCloudSync.getDB();
    }
    if (!db) {
      try {
        const raw = localStorage.getItem('EST_ADMIN_DB_V2');
        if (raw) db = JSON.parse(raw);
      } catch (e) {
        console.warn('Error reading db for services:', e);
      }
    }

    const services = (db && Array.isArray(db.services) && db.services.length > 0)
      ? db.services
      : DEFAULT_SERVICES_DATA;

    const activeServices = services.filter(s => !s.status || s.status.toLowerCase() === 'active');

    if (activeServices.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: #94a3b8; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
          <p style="margin: 0; font-size: 0.95rem;">No active services configured in admin panel.</p>
        </div>
      `;
      return;
    }

    const SERVICE_DIAGRAM_PRESETS = {
      's1': {
        tag: '@est.events/live-runsheet',
        status: 'LIVE OPS',
        row: '4K Stage LED & Audio Sync',
        check: '60fps',
        floating: '★ Zero-Glitch'
      },
      's2': {
        tag: '@est.gtm/abm-lead-funnel',
        status: 'PIPELINE',
        row: 'Fortune 500 CXO ICP',
        check: '340 SQLs',
        floating: '📈 48% Open'
      },
      's3': {
        tag: '@est.travel/group-charters',
        status: 'MICE HUB',
        row: '5-Star Hotel Room Blocks',
        check: 'Reserved',
        floating: '✈️ 100% On-Time'
      },
      's4': {
        tag: '@est.retail/spatial-facade',
        status: 'DEPLOYED',
        row: 'Acoustic Fabrication',
        check: 'Installed',
        floating: '🏬 100% Brand'
      },
      's5': {
        tag: '@est.btl/pan-india-tour',
        status: 'ACTIVE',
        row: 'Direct Mall Sampling',
        check: '12 Cities',
        floating: '🔥 250k+ Reach'
      },
      's6': {
        tag: '@est.exhibition/3d-booth-cad',
        status: 'FABRICATION',
        row: '180m² Pavilion Blueprint',
        check: 'Approved',
        floating: '🏆 Award 3D'
      },
      's7': {
        tag: '@est.digital/b2b-omnichannel',
        status: 'OPTIMIZED',
        row: 'LinkedIn CXO Thought Lead',
        check: '+142% CTR',
        floating: '⚡ 4.8x ROAS'
      },
      's8': {
        tag: '@est.experiential/hologram-dome',
        status: 'SENSORY',
        row: 'Kinetic Motion Sensor Dome',
        check: '100% Immersion',
        floating: '✨ Goosebumps'
      },
      's9': {
        tag: '@est.consulting/gtm-roadmap',
        status: 'STRATEGY',
        row: 'Enterprise ICP Strategy',
        check: 'Attributed',
        floating: '🎯 CXO Advisory'
      }
    };

    grid.innerHTML = activeServices.map((s, idx) => {
      const delay = (idx % 3 + 1) * 100;
      const isAlt = idx % 2 === 1;
      const accentColor = isAlt ? 'var(--color-primary)' : 'var(--neon-cyan)';
      const accentBg = isAlt ? 'rgba(254,59,32,0.1)' : 'rgba(0,240,255,0.1)';
      const icon = s.icon || 'bi-stars';
      const rawSlug = s.slug || 'services/event-management.html';
      const link = rawSlug.startsWith('http') ? rawSlug : (rawSlug.startsWith('/') ? rawSlug.substring(1) : rawSlug);
      const title = s.title || 'Marketing Service';
      const subtitle = s.subtitle ? `<div class="service-subtitle-tag" style="font-size: 0.82rem; color: ${accentColor}; font-weight: 600; margin-bottom: 8px;">${escapeHtml(s.subtitle)}</div>` : '';
      const desc = s.desc || '';

      const preset = SERVICE_DIAGRAM_PRESETS[s.id] || {
        tag: `@est.${(title || 'service').toLowerCase().replace(/[^a-z0-9]/g, '')}/hub`,
        status: 'ACTIVE',
        row: 'Precision Turnkey Execution',
        check: '100% SLA',
        floating: '★ Verified'
      };

      return `
        <div class="glass-panel service-card" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="service-mini-diagram">
            <div class="mini-diag-floating">${preset.floating}</div>
            <div class="mini-diag-top">
              <div class="mini-diag-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="mini-diag-badge"><span class="pulse-dot green" style="width: 5px; height: 5px; display: inline-block;"></span> ${preset.status}</span>
            </div>
            <div class="mini-diag-search">
              <span>${preset.tag}</span>
              <span class="mini-diag-search-icon"><i class="bi bi-search"></i></span>
            </div>
            <div class="mini-diag-row">
              <span>${preset.row}</span>
              <span class="mini-diag-check"><i class="bi bi-check2"></i> ${preset.check}</span>
            </div>
          </div>
          <div class="service-icon flex-center" style="background: ${accentBg}; color: ${accentColor};">
            <i class="bi ${escapeHtml(icon)}"></i>
          </div>
          <h3 class="service-title">${escapeHtml(title)}</h3>
          ${subtitle}
          <p class="service-desc">${escapeHtml(desc)}</p>
          <div class="service-actions">
            <a href="${escapeHtml(link)}" class="service-link" style="color: ${accentColor};">
              Explore Service <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // Dynamic Interactive Service Visualizer Hub
  // ==========================================
  const DIAGRAM_SHOWCASE_DATA = {
    events: {
      title: 'EST Service Runtime • Corporate Events Command Center',
      status: 'LIVE STAGE OPS',
      command: 'est.events/live-runsheet',
      url: 'services/event-management.html',
      chipTopRight: 'Zero-Glitch AV SLA',
      chipLeft: '80+ Yrs Agency Pedigree',
      chipBottomRight: '4.98 NPS (150+ Enterprises)',
      chipTopLeft: '120ms Staging Latency',
      rows: [
        {
          icon: 'bi-broadcast',
          title: '4K Stage LED & Line-Array Audio Sync',
          meta: 'Stage A & B Audio Matrix • 60 FPS Locked',
          badge: '<span class="diag-live-wave"><span></span><span></span><span></span><span></span></span> ✔ Synced 60fps'
        },
        {
          icon: 'bi-qr-code-scan',
          title: 'Delegate RFID & QR Badging Gateway',
          meta: '1,500+ CXO Attendees Verified On-Ground',
          badge: '✔ 99.4% Flow Rate'
        },
        {
          icon: 'bi-lightning-charge',
          title: 'Keynote Hologram & Reveal Cues',
          meta: 'Automated DMX Lighting & Special FX Standby',
          badge: '● Active on Deck'
        }
      ]
    },
    demand: {
      title: 'EST Service Runtime • B2B Demand Generation Engine',
      status: 'ENTERPRISE FUNNEL',
      command: 'est.gtm/icp-lead-pipeline',
      url: 'services/demand-generation.html',
      chipTopRight: 'Verified B2B Intent',
      chipLeft: '₹48 Cr Pipeline Value',
      chipBottomRight: 'High-Conversion ABM',
      chipTopLeft: '98.6% ICP Match Rate',
      rows: [
        {
          icon: 'bi-funnel-fill',
          title: 'Fortune 500 ICP Segmentation & Enrichment',
          meta: 'Tech & BFSI Enterprise Decision Makers',
          badge: '✔ 12,400 Verified'
        },
        {
          icon: 'bi-envelope-check-fill',
          title: 'Multi-Touch Outbound Cadence & SDR Outreach',
          meta: 'LinkedIn InMail, Executive Email & Phone',
          badge: '✔ 48% Open Rate'
        },
        {
          icon: 'bi-graph-up-arrow',
          title: 'Sales Qualified Leads (SQLs) Dispatched',
          meta: 'Direct CXO Meetings Booked on Client Calendars',
          badge: '✔ +340 CXO Meetings'
        }
      ]
    },
    travel: {
      title: 'EST Service Runtime • Corporate Travel & MICE Dispatch',
      status: 'HOSPITALITY RADAR',
      command: 'est.travel/group-logistics',
      url: 'services/corporate-travel.html',
      chipTopRight: 'Turnkey Visa & Insurance',
      chipLeft: '24/7 On-Ground Concierge',
      chipBottomRight: '100% On-Time MICE Tours',
      chipTopLeft: 'Zero Booking Discrepancy',
      rows: [
        {
          icon: 'bi-buildings-fill',
          title: '5-Star Hotel Partner Room Blocks',
          meta: 'Goa, Rajasthan & Dubai Premier Properties',
          badge: '✔ 100% Guaranteed'
        },
        {
          icon: 'bi-airplane-fill',
          title: 'Chartered Flights & Group Air Ticketing',
          meta: 'Executive Leadership & Dealer Delegations',
          badge: '✔ On Schedule'
        },
        {
          icon: 'bi-car-front-fill',
          title: 'VIP Chauffeur & Sanitized Luxury Coaches',
          meta: 'Airport Reception Counter & Luggage Marshalling',
          badge: '✔ Active Concierge'
        }
      ]
    },
    experiential: {
      title: 'EST Service Runtime • Immersive Spatial Activation',
      status: 'GOOSEBUMPS ENGINE',
      command: 'est.experiential/spatial-immersion',
      url: 'services/experiential-marketing.html',
      chipTopRight: 'Unforgettable Recall',
      chipLeft: 'Sensory Immersion Matrix',
      chipBottomRight: 'Talk of the Town Guaranteed',
      chipTopLeft: 'Kinetic Motion Sensor Ready',
      rows: [
        {
          icon: 'bi-stars',
          title: 'Kinetic LED Screen Architecture & Domes',
          meta: 'Multi-Sensory Projection Mapping & Soundscapes',
          badge: '✔ Calibrated'
        },
        {
          icon: 'bi-hand-index-thumb-fill',
          title: 'Interactive Motion Tracking & AR Installations',
          meta: 'Audience Touchpoints & Gamified Brand Intercepts',
          badge: '✔ 1,200 Engagements/hr'
        },
        {
          icon: 'bi-camera-reels-fill',
          title: 'Viral Social UGC & Media Unboxing Zone',
          meta: 'Real-time Instagram Reels & LinkedIn Buzz Stream',
          badge: '● Live Streamed'
        }
      ]
    },
    exhibition: {
      title: 'EST Service Runtime • 3D Trade Show Pavilion Studio',
      status: 'FABRICATION CAD',
      command: 'est.exhibition/3d-pavilion-cad',
      url: 'services/exhibition.html',
      chipTopRight: 'Pan-India Fabrication',
      chipLeft: '300+ Expos Delivered',
      chipBottomRight: 'Best Stall Design Awards',
      chipTopLeft: 'German Hangar Certified',
      rows: [
        {
          icon: 'bi-box',
          title: 'Photorealistic 3D CAD Walkthrough & Renderings',
          meta: '180m² Island Pavilion Blueprint & Spatial Flow',
          badge: '✔ Client Approved'
        },
        {
          icon: 'bi-hammer',
          title: 'Precision CNC Carpentry & Acrylic Fabrication',
          meta: 'Structural Load Tested & Fire Safety Permitted',
          badge: '✔ Built on Time'
        },
        {
          icon: 'bi-tablet-fill',
          title: 'Digital Kiosks & Live Badge Lead Scanners',
          meta: 'Seamless Booth Footfall & Sales Lead Capture',
          badge: '✔ Connected'
        }
      ]
    },
    btl: {
      title: 'EST Service Runtime • Pan-India BTL Activation',
      status: 'ON-GROUND CONTROL',
      command: 'est.btl/pan-india-activation',
      url: 'services/btl-activation.html',
      chipTopRight: 'Real-time GPS Tracking',
      chipLeft: '28 States Covered',
      chipBottomRight: 'Top Tier Brand Recall',
      chipTopLeft: 'Direct Consumer Sampling',
      rows: [
        {
          icon: 'bi-megaphone-fill',
          title: 'Mall, Tech-Park & High-Street Intercepts',
          meta: '12 Metro Cities Operating Simultaneously',
          badge: '✔ 12 Cities Live'
        },
        {
          icon: 'bi-cup-hot-fill',
          title: 'Product Sampling & Direct Consumer Trial',
          meta: 'Trained Brand Promoters & Feedback Capture',
          badge: '✔ 250,000+ Reached'
        },
        {
          icon: 'bi-geo-alt-fill',
          title: 'Live Promoter Telemetry & Cloud Dashboard',
          meta: 'GPS-Verified Store Audits & Daily Conversion Logs',
          badge: '● Syncing Live'
        }
      ]
    }
  };

  function initDynamicServiceVisualizer() {
    const nav = document.getElementById('diagServiceTabs');
    const stage = document.getElementById('diagInteractiveStage');
    const card = document.getElementById('diagWindowCard');
    if (!nav || !stage || !card) return;

    const tabBtns = Array.from(nav.querySelectorAll('.diag-tab-btn'));
    const windowTitle = document.getElementById('diagWindowTitle');
    const statusLabel = document.getElementById('diagStatusLabel');
    const commandText = document.getElementById('diagCommandText');
    const searchBtn = document.getElementById('diagSearchBtn');
    const rowsWrap = document.getElementById('diagRowsWrap');

    const chipTopRightText = document.getElementById('diagChipTopRightText');
    const chipLeftText = document.getElementById('diagChipLeftText');
    const chipBottomRightText = document.getElementById('diagChipBottomRightText');
    const chipTopLeftText = document.getElementById('diagChipTopLeftText');

    const chipTR = document.getElementById('diagChipTopRight');
    const chipL = document.getElementById('diagChipLeft');
    const chipBR = document.getElementById('diagChipBottomRight');

    let activeServiceKey = 'events';
    let autoPlayInterval = null;
    let progressTimer = null;
    let progressVal = 0;
    const CYCLE_DURATION_MS = 6000;
    let isUserHovering = false;

    function renderServiceDiagram(key) {
      const data = DIAGRAM_SHOWCASE_DATA[key];
      if (!data) return;

      activeServiceKey = key;

      // Update Active Tab
      tabBtns.forEach(btn => {
        const isActive = btn.getAttribute('data-service') === key;
        btn.classList.toggle('active', isActive);
        const bar = btn.querySelector('.diag-tab-progress');
        if (bar) bar.style.width = '0%';
      });

      // Subtle transition
      card.style.opacity = '0.7';
      card.style.transform = 'scale(0.98)';

      setTimeout(() => {
        if (windowTitle) windowTitle.textContent = data.title;
        if (statusLabel) statusLabel.textContent = data.status;
        if (commandText) commandText.textContent = data.command;
        if (searchBtn) searchBtn.href = data.url;

        if (chipTopRightText) chipTopRightText.textContent = data.chipTopRight;
        if (chipLeftText) chipLeftText.textContent = data.chipLeft;
        if (chipBottomRightText) chipBottomRightText.textContent = data.chipBottomRight;
        if (chipTopLeftText) chipTopLeftText.textContent = data.chipTopLeft;

        if (rowsWrap) {
          rowsWrap.innerHTML = data.rows.map(row => `
            <div class="diag-row-item">
              <div class="diag-row-left">
                <div class="diag-row-icon"><i class="bi ${row.icon}"></i></div>
                <div>
                  <div class="diag-row-text">${escapeHtml(row.title)}</div>
                  <div class="diag-row-meta">${escapeHtml(row.meta)}</div>
                </div>
              </div>
              <div class="diag-row-badge">${row.badge}</div>
            </div>
          `).join('');
        }

        card.style.opacity = '1';
        card.style.transform = '';
      }, 150);
    }

    // Tab Clicks
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-service');
        if (key && key !== activeServiceKey) {
          resetAutoCycle();
          renderServiceDiagram(key);
        }
      });
    });

    // Auto Cycle Logic with Smooth Progress Bar
    function startAutoCycle() {
      stopAutoCycle();
      progressVal = 0;

      progressTimer = setInterval(() => {
        if (isUserHovering) return;
        progressVal += (100 / (CYCLE_DURATION_MS / 100));
        const activeBtn = nav.querySelector('.diag-tab-btn.active');
        if (activeBtn) {
          const bar = activeBtn.querySelector('.diag-tab-progress');
          if (bar) bar.style.width = Math.min(progressVal, 100) + '%';
        }

        if (progressVal >= 100) {
          progressVal = 0;
          const currentIdx = tabBtns.findIndex(b => b.getAttribute('data-service') === activeServiceKey);
          const nextIdx = (currentIdx + 1) % tabBtns.length;
          const nextKey = tabBtns[nextIdx].getAttribute('data-service');
          renderServiceDiagram(nextKey);
        }
      }, 100);
    }

    function stopAutoCycle() {
      if (progressTimer) clearInterval(progressTimer);
      progressTimer = null;
    }

    function resetAutoCycle() {
      stopAutoCycle();
      progressVal = 0;
      const activeBtn = nav.querySelector('.diag-tab-btn.active');
      if (activeBtn) {
        const bar = activeBtn.querySelector('.diag-tab-progress');
        if (bar) bar.style.width = '0%';
      }
      startAutoCycle();
    }

    stage.addEventListener('mouseenter', () => { isUserHovering = true; });
    stage.addEventListener('mouseleave', () => { isUserHovering = false; });
    nav.addEventListener('mouseenter', () => { isUserHovering = true; });
    nav.addEventListener('mouseleave', () => { isUserHovering = false; });

    // 3D Parallax Tilt Effect on Desktop
    stage.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 6;
      const rotY = (x / (rect.width / 2)) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

      if (chipTR) chipTR.style.transform = `translate3d(${(rotY * 1.6).toFixed(1)}px, ${(rotX * 1.6).toFixed(1)}px, 25px)`;
      if (chipL) chipL.style.transform = `translate3d(${(-rotY * 1.6).toFixed(1)}px, ${(-rotX * 1.6).toFixed(1)}px, 20px)`;
      if (chipBR) chipBR.style.transform = `translate3d(${(rotY * 1.2).toFixed(1)}px, ${(rotX * 1.2).toFixed(1)}px, 20px)`;
    });

    stage.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      if (chipTR) chipTR.style.transform = '';
      if (chipL) chipL.style.transform = '';
      if (chipBR) chipBR.style.transform = '';
    });

    // Initialize initial view
    renderServiceDiagram('events');
    startAutoCycle();
  }

  // Hook services sync listeners
  if (!window._servicesSyncBound) {
    window._servicesSyncBound = true;
    if (window.ESTCloudSync && typeof window.ESTCloudSync.onSync === 'function') {
      window.ESTCloudSync.onSync(() => initDynamicServices());
    }
  }

  // Initial load
  initDynamicBentoShowcase();
  initDynamicClients();
  initDynamicServices();
  initDynamicServiceVisualizer();

  // Note: Cross-tab and cloud sync are centrally orchestrated above by refreshAllDynamicEngines()

  // (D) Bring Brand Alive Lead Form Submission
  const bringAliveForm = document.getElementById('bringAliveForm');
  if (bringAliveForm) {
    bringAliveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = bringAliveForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const btn = bringAliveForm.querySelector('button');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2-circle"></i> Connecting You...';
        btn.style.background = '#22c55e';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          alert('Thank you for connecting with EST Brand Services! Our experiential architects will reach out within 2 business hours.');
          bringAliveForm.reset();
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.style.color = '';
        }, 1200);
      }
    });
  }

});



