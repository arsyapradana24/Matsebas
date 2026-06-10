// Main Entry Point

const App = {
  version: '1.0.0',
  
  init() {
    console.log(`%c🎓 Fungsi Invers v${this.version}`, 'color: #6C63FF; font-size: 16px; font-weight: bold;');
    console.log('%c📚 Website edukasi matematika interaktif', 'color: #9B9AAF; font-size: 12px;');
    
    // FORCE CLOSE MODAL ON INIT
    this.forceCloseModal();
    
    // Check browser compatibility
    this.checkCompatibility();
    
    // Initialize all modules
    this.initModules();
    
    // Setup global event listeners
    this.setupGlobalListeners();
    
    // Show welcome message for first-time users (DISABLED)
    // this.checkFirstVisit();
  },
  
  forceCloseModal() {
    // Force close any modal that might be open
    const modal = document.getElementById('modal-pembahasan');
    if (modal) {
      modal.hidden = true;
      modal.style.display = 'none';
    }
  },
  
  checkCompatibility() {
    const features = {
      localStorage: typeof Storage !== 'undefined',
      canvas: !!document.createElement('canvas').getContext,
      fetch: typeof fetch !== 'undefined',
      es6: typeof Symbol !== 'undefined'
    };
    
    const unsupported = Object.entries(features)
      .filter(([, supported]) => !supported)
      .map(([feature]) => feature);
    
    if (unsupported.length > 0) {
      console.warn('⚠️ Beberapa fitur tidak didukung browser:', unsupported);
      
      // Show warning to user
      const warning = document.createElement('div');
      warning.className = 'toast';
      warning.style.cssText = 'position: fixed; top: 80px; left: 50%; transform: translateX(-50%); z-index: 1000;';
      warning.innerHTML = `
        <div class="highlight highlight--warning">
          <span class="highlight__icon">⚠️</span>
          <p><strong>Browser Anda mungkin tidak mendukung semua fitur.</strong><br>
          Untuk pengalaman terbaik, gunakan browser modern seperti Chrome, Firefox, atau Edge.</p>
        </div>
      `;
      document.body.appendChild(warning);
      
      setTimeout(() => warning.remove(), 5000);
    }
  },
  
  initModules() {
    // Modules are already initialized in their respective files
    // This is just a placeholder for any additional initialization
    console.log('✓ Modules initialized');
  },
  
  setupGlobalListeners() {
    // Handle navigation state on page load
    window.addEventListener('load', () => {
      // Check for hash in URL
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          setTimeout(() => {
            Utils.scrollToElement(target, 80);
          }, 100);
        }
      }
    });
    
    // Update hash on scroll (debounced)
    let updateHashTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(updateHashTimeout);
      updateHashTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('[data-section]');
        sections.forEach(section => {
          if (Utils.isInViewport(section, 0.5)) {
            const id = section.id;
            if (window.location.hash !== `#${id}`) {
              history.replaceState(null, null, `#${id}`);
            }
          }
        });
      }, 100);
    });
    
    // Handle online/offline status
    window.addEventListener('online', () => {
      Utils.showToast('✓ Koneksi tersambung');
    });
    
    window.addEventListener('offline', () => {
      Utils.showToast('⚠️ Tidak ada koneksi internet (mode offline)');
    });
    
    // Prevent accidental navigation away
    let hasInteracted = false;
    document.addEventListener('click', () => hasInteracted = true, { once: true });
    
    window.addEventListener('beforeunload', (e) => {
      if (hasInteracted && Soal.currentSoal) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K: Toggle sidebar (on mobile)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          Navigation.toggleSidebar();
        }
      }
      
      // Ctrl/Cmd + /: Focus to first input on page
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        const firstInput = document.querySelector('input, select, button');
        if (firstInput) {
          firstInput.focus();
        }
      }
    });
    
    console.log('✓ Global listeners registered');
  },
  
  checkFirstVisit() {
    const data = Storage.get();
    
    // Only show welcome if it hasn't been shown before
    if (!data.welcomeShown) {
      // Mark as shown
      data.welcomeShown = true;
      data.version = this.version;
      Storage.set(data);
      
      // DISABLED: Welcome modal disabled for now
      // setTimeout(() => {
      //   this.showWelcomeMessage();
      // }, 500);
    } else if (data.version !== this.version) {
      // Just update version, don't show welcome again
      data.version = this.version;
      Storage.set(data);
    }
  },
  
  showWelcomeMessage() {
    const modal = document.getElementById('modal-pembahasan');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    
    if (!modal || !modalContent || !modalTitle) return;
    
    modalTitle.textContent = 'Selamat Datang! 👋';
    modalContent.innerHTML = `
      <div style="text-align: center;">
        <p style="font-size: var(--text-md); margin-bottom: var(--space-lg);">
          Selamat datang di <strong>Website Interaktif Fungsi Invers</strong>
        </p>
        <div style="text-align: left;">
          <h4 style="margin-bottom: var(--space-md);">Fitur yang tersedia:</h4>
          <ul class="list-styled">
            <li>📚 <strong>10 Section Materi</strong> dari dasar hingga mahir</li>
            <li>📊 <strong>Visualisasi Grafik</strong> interaktif dengan Canvas API</li>
            <li>✍️ <strong>30 Soal Latihan</strong> dengan pembahasan lengkap</li>
            <li>💾 <strong>Progress Tersimpan</strong> otomatis di browser Anda</li>
            <li>🌙 <strong>Dark/Light Mode</strong> sesuai preferensi</li>
            <li>📱 <strong>Responsive</strong> untuk semua perangkat</li>
          </ul>
          
          <div class="highlight highlight--info" style="margin-top: var(--space-lg);">
            <span class="highlight__icon">💡</span>
            <p><strong>Tips:</strong> Website ini berfungsi 100% offline setelah dimuat pertama kali. Semua data tersimpan di browser Anda.</p>
          </div>
        </div>
        <button class="btn btn--primary btn--lg" id="btn-mulai-belajar" style="margin-top: var(--space-xl);">
          Mulai Belajar →
        </button>
      </div>
    `;
    
    modal.hidden = false;
    
    // Setup close handlers untuk welcome modal
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const btnMulai = document.getElementById('btn-mulai-belajar');
    
    const closeWelcome = () => {
      modal.hidden = true;
      Utils.scrollToElement(document.getElementById('definisi'), 80);
    };
    
    // Temporary event listeners for welcome
    const handleClose = () => closeWelcome();
    const handleBackdrop = () => closeWelcome();
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !modal.hidden) {
        closeWelcome();
      }
    };
    
    if (modalClose) modalClose.addEventListener('click', handleClose);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', handleClose);
    if (modalBackdrop) modalBackdrop.addEventListener('click', handleBackdrop);
    if (btnMulai) btnMulai.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleEscape);
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Make App globally accessible for debugging
window.FungsiInversApp = {
  App,
  Utils,
  Storage,
  Navigation,
  Materi,
  Grafik,
  Soal,
  version: App.version
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
