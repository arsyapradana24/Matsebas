// Utility Functions

const Utils = {
  // Debounce function
  debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // Throttle function
  throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn.apply(this, args);
      }
    };
  },

  // Clamp value between min and max
  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  },

  // Format number with Indonesian locale
  formatAngka(n) {
    return n.toLocaleString('id-ID');
  },

  // Shuffle array (Fisher-Yates)
  shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },

  // Safe math expression evaluator (basic)
  evalMathExpr(str) {
    try {
      // Remove whitespace
      str = str.trim();
      
      // Replace common math symbols
      str = str.replace(/×/g, '*');
      str = str.replace(/÷/g, '/');
      str = str.replace(/−/g, '-');
      
      // Only allow numbers, operators, parentheses, and basic functions
      if (!/^[0-9+\-*/().\s]+$/.test(str)) {
        return NaN;
      }
      
      // Use Function constructor (safer than eval)
      const result = new Function('return ' + str)();
      return result;
    } catch (e) {
      return NaN;
    }
  },

  // Normalize string for comparison (remove spaces, lowercase)
  normalizeString(str) {
    return str.replace(/\s+/g, '').toLowerCase();
  },

  // Show toast notification
  showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.hidden = false;
      
      setTimeout(() => {
        toast.hidden = true;
      }, duration);
    }
  },

  // Copy text to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      Utils.showToast('Disalin! ✓');
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        Utils.showToast('Disalin! ✓');
        return true;
      } catch (e) {
        Utils.showToast('Gagal menyalin');
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  },

  // Get CSS variable value
  getCSSVar(name) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name).trim();
  },

  // Parse color from CSS variable
  parseColor(cssVar) {
    const value = Utils.getCSSVar(cssVar);
    
    // Handle rgba format
    if (value.startsWith('rgba')) {
      return value;
    }
    
    // Handle hex format
    if (value.startsWith('#')) {
      return value;
    }
    
    // Handle rgb format
    if (value.startsWith('rgb')) {
      return value;
    }
    
    return value;
  },

  // Random integer between min and max (inclusive)
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Generate unique ID
  generateId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  },

  // Format time (seconds to MM:SS)
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  // Check if element is in viewport
  isInViewport(element, threshold = 0.5) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    
    // Calculate how much of the element is in view
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleRatio = visibleHeight / rect.height;
    
    return vertInView && horInView && visibleRatio >= threshold;
  },

  // Scroll to element smoothly
  scrollToElement(element, offset = 0) {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
