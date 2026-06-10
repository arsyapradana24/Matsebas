// Materi Interaction Handlers

const Materi = {
  init() {
    this.setupTabs();
    this.setupCopyButtons();
    this.setupThemeToggle();
    this.setupMenuToggle();
    this.loadTheme();
  },
  
  setupTabs() {
    const tabButtons = document.querySelectorAll('.tab[role="tab"]');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        const tabsContainer = button.closest('.tabs').parentElement;
        
        // Update buttons
        tabButtons.forEach(btn => {
          btn.setAttribute('aria-selected', 'false');
        });
        button.setAttribute('aria-selected', 'true');
        
        // Update panels
        const panels = tabsContainer.querySelectorAll('.tab-panel');
        panels.forEach(panel => {
          panel.classList.remove('active');
          panel.hidden = true;
        });
        
        const targetPanel = document.getElementById(`tab-${targetTab}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.hidden = false;
        }
      });
    });
  },
  
  setupCopyButtons() {
    // Copy formula blocks
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const text = button.dataset.copy || 
                     button.closest('.formula-block').textContent.trim();
        Utils.copyToClipboard(text);
      });
    });
    
    // Make formula spans copyable on click
    const formulas = document.querySelectorAll('.formula');
    
    formulas.forEach(formula => {
      formula.style.cursor = 'pointer';
      formula.title = 'Klik untuk menyalin';
      
      formula.addEventListener('click', (e) => {
        e.stopPropagation();
        Utils.copyToClipboard(formula.textContent.trim());
      });
    });
  },
  
  setupThemeToggle() {
    const themeToggle = document.getElementById('btn-theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  },
  
  loadTheme() {
    const theme = Storage.getTheme();
    this.applyTheme(theme);
  },
  
  applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  },
  
  toggleTheme() {
    const currentTheme = Storage.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    Storage.setTheme(newTheme);
    this.applyTheme(newTheme);
    
    Utils.showToast(newTheme === 'dark' ? '🌙 Mode Gelap' : '☀️ Mode Terang');
  },
  
  setupMenuToggle() {
    const menuToggle = document.getElementById('btn-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        Navigation.toggleSidebar();
        
        const isOpen = sidebar.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen.toString());
      });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 768 && sidebar && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          Navigation.closeSidebar();
        }
      }
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Materi.init());
} else {
  Materi.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Materi;
}
