// Navigation & Scroll Spy

const Navigation = {
  sections: [],
  currentSection: null,
  progressBar: null,
  progressText: null,
  progressRing: null,
  progressRingLabel: null,
  sidebar: null,
  observer: null,
  
  init() {
    this.sections = Array.from(document.querySelectorAll('[data-section]'));
    this.progressBar = document.getElementById('progress-global-bar');
    this.progressText = document.getElementById('progress-global-text');
    this.progressRing = document.getElementById('progress-ring-fill');
    this.progressRingLabel = document.getElementById('progress-ring-label');
    this.sidebar = document.getElementById('sidebar');
    
    this.setupIntersectionObserver();
    this.setupSidebarLinks();
    this.updateProgress();
    
    // Initial active section
    this.updateActiveSection('hero');
  },
  
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.dataset.section;
          this.updateActiveSection(sectionId);
          
          // Mark section as read after being in view for 2 seconds
          setTimeout(() => {
            if (Utils.isInViewport(entry.target, 0.8)) {
              this.markSectionAsRead(sectionId);
            }
          }, 2000);
        }
      });
    }, options);
    
    this.sections.forEach(section => {
      this.observer.observe(section);
    });
  },
  
  setupSidebarLinks() {
    const links = document.querySelectorAll('.sidebar__link');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          Utils.scrollToElement(targetSection, 80);
        }
        
        // Close sidebar on mobile
        if (window.innerWidth < 768) {
          this.closeSidebar();
        }
      });
    });
  },
  
  updateActiveSection(sectionId) {
    if (this.currentSection === sectionId) return;
    
    this.currentSection = sectionId;
    
    // Update sidebar active state
    const links = document.querySelectorAll('.sidebar__link');
    links.forEach(link => {
      const linkSection = link.dataset.section;
      if (linkSection === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },
  
  markSectionAsRead(sectionId) {
    if (Storage.isSectionRead(sectionId)) return;
    
    Storage.markSectionRead(sectionId);
    
    // Show checkmark in sidebar
    const link = document.querySelector(`[data-section="${sectionId}"]`);
    if (link) {
      const checkmark = link.querySelector('.sidebar__check');
      if (checkmark) {
        checkmark.hidden = false;
        checkmark.style.animation = 'scaleIn 0.3s ease-out';
      }
    }
    
    this.updateProgress();
  },
  
  updateProgress() {
    const percentage = Storage.getProgressPercentage();
    
    // Update global progress bar
    if (this.progressBar) {
      this.progressBar.style.width = `${percentage}%`;
    }
    
    if (this.progressText) {
      this.progressText.textContent = `${percentage}%`;
    }
    
    // Update progress ring
    if (this.progressRing) {
      const circumference = 163; // 2 * PI * radius (26)
      const offset = circumference - (percentage / 100) * circumference;
      this.progressRing.style.strokeDashoffset = offset;
    }
    
    if (this.progressRingLabel) {
      this.progressRingLabel.textContent = `${percentage}%`;
    }
    
    // Show all checkmarks for read sections
    const data = Storage.get();
    Object.keys(data.sectionsRead).forEach(sectionId => {
      if (data.sectionsRead[sectionId]) {
        const link = document.querySelector(`[data-section="${sectionId}"]`);
        if (link) {
          const checkmark = link.querySelector('.sidebar__check');
          if (checkmark) {
            checkmark.hidden = false;
          }
        }
      }
    });
  },
  
  openSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.add('open');
    }
  },
  
  closeSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.remove('open');
    }
  },
  
  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.toggle('open');
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
  Navigation.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
