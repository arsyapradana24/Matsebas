// LocalStorage Management

const Storage = {
  KEY: 'fungsiInvers_progress',
  
  // Default progress structure
  getDefaultProgress() {
    return {
      version: '1.0',
      lastUpdated: null, // Will be set on first save
      welcomeShown: false, // Track if welcome modal has been shown
      sectionsRead: {
        hero: true,
        definisi: false,
        syarat: false,
        cara: false,
        contoh: false,
        grafik: false,
        sifat: false,
        komposisi: false,
        'fungsi-khusus': false,
        latihan: false,
        rangkuman: false
      },
      latihan: {},
      totalPoin: 0,
      totalBenar: 0,
      totalSalah: 0,
      ujianHistory: [],
      theme: 'dark'
    };
  },
  
  // Get progress data
  get() {
    try {
      const data = localStorage.getItem(this.KEY);
      if (!data) {
        // First time, return default
        return this.getDefaultProgress();
      }
      
      const parsed = JSON.parse(data);
      
      // Merge with default to ensure all keys exist
      const merged = {
        ...this.getDefaultProgress(),
        ...parsed
      };
      
      return merged;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return this.getDefaultProgress();
    }
  },
  
  // Save progress data
  set(data) {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      return false;
    }
  },
  
  // Reset all progress
  reset() {
    try {
      localStorage.removeItem(this.KEY);
      return true;
    } catch (e) {
      console.error('Error resetting localStorage:', e);
      return false;
    }
  },
  
  // Mark section as read
  markSectionRead(sectionId) {
    const data = this.get();
    data.sectionsRead[sectionId] = true;
    this.set(data);
  },
  
  // Check if section is read
  isSectionRead(sectionId) {
    const data = this.get();
    return data.sectionsRead[sectionId] || false;
  },
  
  // Get progress percentage
  getProgressPercentage() {
    const data = this.get();
    const sections = Object.values(data.sectionsRead);
    const readCount = sections.filter(Boolean).length;
    return Math.round((readCount / sections.length) * 100);
  },
  
  // Mark soal result
  markSoal(soalId, isBenar, poin = 0) {
    const data = this.get();
    
    // Update or create soal entry
    const existing = data.latihan[soalId];
    
    if (!existing) {
      // First attempt
      data.latihan[soalId] = {
        status: isBenar ? 'benar' : 'salah',
        poin: isBenar ? poin : 0,
        attempts: 1,
        timestamp: new Date().toISOString()
      };
      
      if (isBenar) {
        data.totalBenar++;
        data.totalPoin += poin;
      } else {
        data.totalSalah++;
      }
    } else if (existing.status === 'belum' || existing.status === 'salah') {
      // Update existing wrong/unanswered soal
      existing.status = isBenar ? 'benar' : 'salah';
      existing.attempts++;
      existing.timestamp = new Date().toISOString();
      
      if (isBenar) {
        existing.poin = poin;
        data.totalBenar++;
        data.totalPoin += poin;
        
        // Remove from salah count if previously wrong
        if (existing.attempts > 1) {
          data.totalSalah--;
        }
      } else {
        if (existing.attempts === 1) {
          data.totalSalah++;
        }
      }
    }
    
    this.set(data);
  },
  
  // Get soal status
  getSoalStatus(soalId) {
    const data = this.get();
    return data.latihan[soalId] || { status: 'belum', poin: 0, attempts: 0 };
  },
  
  // Get score summary
  getScore() {
    const data = this.get();
    return {
      totalPoin: data.totalPoin,
      totalBenar: data.totalBenar,
      totalSalah: data.totalSalah,
      totalBelum: 30 - data.totalBenar - data.totalSalah // Assuming 30 total soal
    };
  },
  
  // Reset latihan progress only
  resetLatihan() {
    const data = this.get();
    data.latihan = {};
    data.totalPoin = 0;
    data.totalBenar = 0;
    data.totalSalah = 0;
    this.set(data);
  },
  
  // Save ujian result
  saveUjianResult(result) {
    const data = this.get();
    data.ujianHistory.push({
      ...result,
      timestamp: new Date().toISOString()
    });
    this.set(data);
  },
  
  // Get ujian history
  getUjianHistory() {
    const data = this.get();
    return data.ujianHistory || [];
  },
  
  // Save theme preference
  setTheme(theme) {
    const data = this.get();
    data.theme = theme;
    this.set(data);
  },
  
  // Get theme preference
  getTheme() {
    const data = this.get();
    return data.theme || 'dark';
  },
  
  // Export progress as JSON
  exportProgress() {
    const data = this.get();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fungsi-invers-progress-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
  
  // Import progress from JSON
  importProgress(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      this.set(data);
      return true;
    } catch (e) {
      console.error('Error importing progress:', e);
      return false;
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}
