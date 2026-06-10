// Soal & Latihan Engine

const Soal = {
  data: null,
  currentSoal: null,
  currentIndex: 0,
  filteredSoal: [],
  mode: 'urut',
  ujianMode: false,
  ujianTimer: null,
  ujianTimeLeft: 1200, // 20 minutes in seconds
  
  async init() {
    await this.loadSoal();
    this.setupControls();
    this.setupModal();
    this.updateScoreDisplay();
  },
  
  async loadSoal() {
    try {
      const response = await fetch('./data/soal.json');
      this.data = await response.json();
      this.filteredSoal = [...this.data.soal];
    } catch (error) {
      console.error('Error loading soal:', error);
      this.data = { soal: [] };
      this.filteredSoal = [];
    }
  },
  
  setupControls() {
    // Mode selection
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    modeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.mode = e.target.value;
      });
    });
    
    // Filter controls
    const filterTopik = document.getElementById('filter-topik');
    const filterLevel = document.getElementById('filter-level');
    
    if (filterTopik) {
      filterTopik.addEventListener('change', () => this.applyFilters());
    }
    
    if (filterLevel) {
      filterLevel.addEventListener('change', () => this.applyFilters());
    }
    
    // Start button
    const btnMulai = document.getElementById('btn-mulai-latihan');
    if (btnMulai) {
      btnMulai.addEventListener('click', () => {
        // Scroll to soal container first
        const soalContainer = document.getElementById('soal-container');
        if (soalContainer) {
          Utils.scrollToElement(soalContainer, 100);
        }
        
        // Start latihan after scroll
        setTimeout(() => {
          this.startLatihan();
        }, 300);
      });
    }
    
    // Reset buttons
    const btnUlangi = document.getElementById('btn-ulangi-latihan');
    const btnReset = document.getElementById('btn-reset-progress');
    
    if (btnUlangi) {
      btnUlangi.addEventListener('click', () => this.resetLatihan());
    }
    
    if (btnReset) {
      btnReset.addEventListener('click', () => this.resetAllProgress());
    }
  },
  
  applyFilters() {
    const topik = document.getElementById('filter-topik')?.value || 'semua';
    const level = document.getElementById('filter-level')?.value || 'semua';
    
    this.filteredSoal = this.data.soal.filter(soal => {
      const topikMatch = topik === 'semua' || soal.topik === topik;
      const levelMatch = level === 'semua' || soal.tingkat === level;
      return topikMatch && levelMatch;
    });
    
    Utils.showToast(`${this.filteredSoal.length} soal tersedia`);
  },
  
  startLatihan() {
    if (this.filteredSoal.length === 0) {
      Utils.showToast('Tidak ada soal tersedia');
      return;
    }
    
    this.currentIndex = 0;
    
    // Apply mode
    if (this.mode === 'acak') {
      this.filteredSoal = Utils.shuffleArray(this.filteredSoal);
    } else if (this.mode === 'ujian') {
      this.startUjian();
      return;
    }
    
    this.renderSoal(this.filteredSoal[this.currentIndex], this.currentIndex);
  },
  
  startUjian() {
    this.ujianMode = true;
    this.ujianTimeLeft = 1200;
    this.filteredSoal = Utils.shuffleArray(this.data.soal).slice(0, 15);
    this.currentIndex = 0;
    
    // Show timer
    const timerEl = document.getElementById('ujian-timer');
    if (timerEl) {
      timerEl.hidden = false;
    }
    
    this.startUjianTimer();
    this.renderSoal(this.filteredSoal[this.currentIndex], this.currentIndex);
  },
  
  startUjianTimer() {
    const timerValueEl = document.getElementById('timer-value');
    const timerEl = document.getElementById('ujian-timer');
    
    this.ujianTimer = setInterval(() => {
      this.ujianTimeLeft--;
      
      if (timerValueEl) {
        timerValueEl.textContent = Utils.formatTime(this.ujianTimeLeft);
      }
      
      // Change color based on time left
      if (this.ujianTimeLeft <= 60) {
        timerEl?.classList.add('danger');
      } else if (this.ujianTimeLeft <= 300) {
        timerEl?.classList.add('warning');
      }
      
      if (this.ujianTimeLeft <= 0) {
        this.endUjian();
      }
    }, 1000);
  },
  
  stopUjianTimer() {
    if (this.ujianTimer) {
      clearInterval(this.ujianTimer);
      this.ujianTimer = null;
    }
    
    const timerEl = document.getElementById('ujian-timer');
    if (timerEl) {
      timerEl.hidden = true;
      timerEl.classList.remove('warning', 'danger');
    }
  },
  
  endUjian() {
    this.stopUjianTimer();
    this.ujianMode = false;
    
    const score = Storage.getScore();
    Utils.showToast('Waktu habis! Ujian selesai.');
    
    // Show results
    alert(`Ujian Selesai!\n\nBenar: ${score.totalBenar}\nSalah: ${score.totalSalah}\nPoin: ${score.totalPoin}`);
    
    // Clear soal container
    const container = document.getElementById('soal-container');
    if (container) {
      container.innerHTML = '<div class="card"><h3>Ujian Selesai</h3><p>Terima kasih telah mengikuti ujian.</p></div>';
    }
  },
  
  renderSoal(soal, index) {
    if (!soal) return;
    
    this.currentSoal = soal;
    const container = document.getElementById('soal-container');
    if (!container) return;
    
    const status = Storage.getSoalStatus(soal.id);
    const isAnswered = status.status !== 'belum';
    
    container.innerHTML = `
      <div class="soal-card" id="soal-${soal.id}" data-soal-id="${soal.id}">
        <div class="soal-card__header">
          <span class="badge badge--topik">${this.getTopikLabel(soal.topik)}</span>
          <span class="badge badge--level badge--${soal.tingkat}">${soal.tingkat}</span>
          <span class="soal-card__nomor">Soal ${index + 1} / ${this.filteredSoal.length}</span>
          <span class="soal-card__poin">${soal.poin} poin</span>
        </div>
        
        <p class="soal-card__pertanyaan">${soal.pertanyaan}</p>
        
        <div class="soal-card__pilihan" role="radiogroup" aria-label="Pilihan jawaban">
          ${soal.pilihan.map((p, i) => `
            <button class="pilihan-btn" data-index="${i}" ${isAnswered ? 'disabled' : ''}>
              ${p}
            </button>
          `).join('')}
        </div>
        
        <div class="soal-card__actions">
          <button class="btn btn--primary" id="btn-jawab" disabled>Jawab</button>
          <button class="btn btn--ghost" id="btn-pembahasan" hidden>Lihat Pembahasan</button>
          ${index < this.filteredSoal.length - 1 ? 
            '<button class="btn btn--ghost" id="btn-lanjut" hidden>Lanjut →</button>' : 
            '<button class="btn btn--primary" id="btn-selesai" hidden>Selesai</button>'}
        </div>
        
        <div class="soal-card__feedback" id="feedback-${soal.id}" hidden></div>
      </div>
    `;
    
    // If already answered, show result
    if (isAnswered) {
      this.showPreviousAnswer(soal, status);
    }
    
    this.attachSoalListeners(soal);
    
    // Scroll to soal
    Utils.scrollToElement(container, 80);
  },
  
  attachSoalListeners(soal) {
    const buttons = document.querySelectorAll('.pilihan-btn');
    const btnJawab = document.getElementById('btn-jawab');
    const btnPembahasan = document.getElementById('btn-pembahasan');
    const btnLanjut = document.getElementById('btn-lanjut');
    const btnSelesai = document.getElementById('btn-selesai');
    
    let selectedIndex = null;
    
    // Pilihan buttons
    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedIndex = idx;
        
        if (btnJawab) {
          btnJawab.disabled = false;
        }
      });
    });
    
    // Jawab button
    if (btnJawab) {
      btnJawab.addEventListener('click', () => {
        if (selectedIndex === null) return;
        this.checkJawaban(soal, selectedIndex, buttons, btnJawab, btnPembahasan, btnLanjut, btnSelesai);
      });
    }
    
    // Pembahasan button
    if (btnPembahasan) {
      btnPembahasan.addEventListener('click', () => {
        this.showPembahasan(soal);
      });
    }
    
    // Lanjut button
    if (btnLanjut) {
      btnLanjut.addEventListener('click', () => {
        this.nextSoal();
      });
    }
    
    // Selesai button
    if (btnSelesai) {
      btnSelesai.addEventListener('click', () => {
        this.finishLatihan();
      });
    }
  },
  
  checkJawaban(soal, selectedIndex, buttons, btnJawab, btnPembahasan, btnLanjut, btnSelesai) {
    const isBenar = selectedIndex === soal.jawaban;
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Show correct/wrong
    buttons.forEach((btn, idx) => {
      if (idx === soal.jawaban) {
        btn.classList.add('correct');
      }
      if (idx === selectedIndex && !isBenar) {
        btn.classList.add('wrong');
      }
    });
    
    // Show feedback
    const feedbackEl = document.getElementById(`feedback-${soal.id}`);
    if (feedbackEl) {
      feedbackEl.hidden = false;
      feedbackEl.className = `soal-card__feedback ${isBenar ? 'success' : 'error'}`;
      feedbackEl.innerHTML = isBenar ? 
        '<p><strong>✓ Benar!</strong> Jawaban Anda tepat.</p>' :
        '<p><strong>✗ Salah.</strong> Lihat pembahasan untuk penjelasan.</p>';
    }
    
    // Update storage
    Storage.markSoal(soal.id, isBenar, isBenar ? soal.poin : 0);
    this.updateScoreDisplay();
    
    // Update buttons
    if (btnJawab) btnJawab.hidden = true;
    if (btnPembahasan) btnPembahasan.hidden = false;
    if (btnLanjut) btnLanjut.hidden = false;
    if (btnSelesai) btnSelesai.hidden = false;
    
    // Animation
    if (isBenar) {
      feedbackEl?.classList.add('animate-bounce');
    } else {
      feedbackEl?.classList.add('animate-shake');
    }
  },
  
  showPreviousAnswer(soal, status) {
    const buttons = document.querySelectorAll('.pilihan-btn');
    const btnPembahasan = document.getElementById('btn-pembahasan');
    const btnLanjut = document.getElementById('btn-lanjut');
    const btnSelesai = document.getElementById('btn-selesai');
    
    buttons.forEach((btn, idx) => {
      if (idx === soal.jawaban) {
        btn.classList.add('correct');
      }
    });
    
    const feedbackEl = document.getElementById(`feedback-${soal.id}`);
    if (feedbackEl && status.status !== 'belum') {
      feedbackEl.hidden = false;
      feedbackEl.className = `soal-card__feedback ${status.status === 'benar' ? 'success' : 'error'}`;
      feedbackEl.innerHTML = status.status === 'benar' ? 
        '<p><strong>✓ Sudah dijawab benar</strong></p>' :
        '<p><strong>Sudah dijawab</strong></p>';
    }
    
    if (btnPembahasan) btnPembahasan.hidden = false;
    if (btnLanjut) btnLanjut.hidden = false;
    if (btnSelesai) btnSelesai.hidden = false;
  },
  
  nextSoal() {
    this.currentIndex++;
    if (this.currentIndex < this.filteredSoal.length) {
      this.renderSoal(this.filteredSoal[this.currentIndex], this.currentIndex);
    } else {
      this.finishLatihan();
    }
  },
  
  finishLatihan() {
    if (this.ujianMode) {
      this.endUjian();
      return;
    }
    
    const score = Storage.getScore();
    const container = document.getElementById('soal-container');
    
    if (container) {
      container.innerHTML = `
        <div class="card card--accent">
          <h3>🎉 Latihan Selesai!</h3>
          <div class="score-card">
            <div class="score-card__ring">
              <svg class="score-ring" width="100" height="100">
                <circle class="score-ring__bg" cx="50" cy="50" r="40" fill="none" stroke-width="8"/>
                <circle class="score-ring__fill" cx="50" cy="50" r="40" fill="none" stroke-width="8" 
                  style="stroke-dasharray: 251; stroke-dashoffset: ${251 - (score.totalPoin / (this.filteredSoal.length * 15)) * 251}"/>
              </svg>
              <div class="score-ring__center">
                <span class="score-ring__value">${score.totalPoin}</span>
                <span class="score-ring__label">poin</span>
              </div>
            </div>
            <div class="score-card__stats">
              <div class="stat-item stat-item--success">
                <span class="stat-label">Benar</span>
                <span class="stat-value">${score.totalBenar}</span>
              </div>
              <div class="stat-item stat-item--danger">
                <span class="stat-label">Salah</span>
                <span class="stat-value">${score.totalSalah}</span>
              </div>
            </div>
          </div>
          <button class="btn btn--primary" onclick="location.reload()">Mulai Lagi</button>
        </div>
      `;
    }
    
    Utils.showToast('Selamat! Anda telah menyelesaikan latihan.');
  },
  
  updateScoreDisplay() {
    const score = Storage.getScore();
    
    // Update count displays
    const benarEl = document.getElementById('count-benar');
    const salahEl = document.getElementById('count-salah');
    const belumEl = document.getElementById('count-belum');
    const scoreValueEl = document.getElementById('score-value');
    
    if (benarEl) benarEl.textContent = score.totalBenar;
    if (salahEl) salahEl.textContent = score.totalSalah;
    if (belumEl) belumEl.textContent = score.totalBelum;
    if (scoreValueEl) scoreValueEl.textContent = score.totalPoin;
    
    // Update score ring
    const scoreRingFill = document.getElementById('score-ring-fill');
    if (scoreRingFill) {
      const maxPoin = 30 * 15; // 30 soal × average 15 poin
      const percentage = (score.totalPoin / maxPoin) * 100;
      const circumference = 251;
      const offset = circumference - (percentage / 100) * circumference;
      scoreRingFill.style.strokeDashoffset = offset;
    }
  },
  
  showPembahasan(soal) {
    const modal = document.getElementById('modal-pembahasan');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) return;
    
    let html = '<div class="pembahasan">';
    html += '<h4>Langkah Penyelesaian:</h4>';
    html += '<ol class="solution__steps">';
    
    soal.pembahasan.langkah.forEach(langkah => {
      html += `<li>${langkah}</li>`;
    });
    
    html += '</ol>';
    html += `<div class="highlight highlight--success" style="margin-top: var(--space-lg)">`;
    html += `<span class="highlight__icon">✓</span>`;
    html += `<p><strong>Jawaban:</strong> ${soal.pembahasan.jawaban_lengkap}</p>`;
    html += '</div>';
    
    if (soal.pembahasan.verifikasi) {
      html += '<div class="verification">';
      html += '<p class="verification__label">Verifikasi:</p>';
      html += `<p>${soal.pembahasan.verifikasi}</p>`;
      html += '</div>';
    }
    
    html += '</div>';
    
    modalContent.innerHTML = html;
    modal.hidden = false;
  },
  
  setupModal() {
    const modal = document.getElementById('modal-pembahasan');
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    const closeModal = () => {
      if (modal) modal.hidden = true;
    };
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hidden) {
        closeModal();
      }
    });
  },
  
  resetLatihan() {
    if (confirm('Yakin ingin mengulang latihan? Progress latihan akan direset.')) {
      Storage.resetLatihan();
      this.updateScoreDisplay();
      location.reload();
    }
  },
  
  resetAllProgress() {
    if (confirm('Yakin ingin mereset SEMUA progress? Ini akan menghapus progress materi dan latihan.')) {
      Storage.reset();
      location.reload();
    }
  },
  
  getTopikLabel(topik) {
    const labels = {
      linear: 'Linear',
      pecahan: 'Pecahan',
      akar: 'Akar/Kuadrat',
      komposisi: 'Komposisi',
      khusus: 'Fungsi Khusus'
    };
    return labels[topik] || topik;
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Soal.init());
} else {
  Soal.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Soal;
}
