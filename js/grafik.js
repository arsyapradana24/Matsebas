// Grafik Visualization with Canvas API

const Grafik = {
  canvas: null,
  ctx: null,
  config: {
    width: 560,
    height: 460,
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
    showF: true,
    showFinv: true,
    showMirror: true,
    showPoints: false,
    currentPreset: 0
  },
  
  presets: [
    {
      label: 'f(x) = 2x + 1',
      fn: x => 2 * x + 1,
      inv: x => (x - 1) / 2,
      domain: { min: -10, max: 10 },
      samplePoints: [0, 1, 2]
    },
    {
      label: 'f(x) = x³',
      fn: x => Math.pow(x, 3),
      inv: x => Math.cbrt(x),
      domain: { min: -2.5, max: 2.5 },
      samplePoints: [-1, 0, 1]
    },
    {
      label: 'f(x) = √x (x ≥ 0)',
      fn: x => x >= 0 ? Math.sqrt(x) : NaN,
      inv: x => x >= 0 ? x * x : NaN,
      domain: { min: 0, max: 10 },
      samplePoints: [0, 1, 4, 9]
    },
    {
      label: 'f(x) = eˣ',
      fn: x => Math.exp(x),
      inv: x => x > 0 ? Math.log(x) : NaN,
      domain: { min: -3, max: 3 },
      samplePoints: [0, 1, 2]
    },
    {
      label: 'f(x) = (2x+1)/(x−3)',
      fn: x => x !== 3 ? (2 * x + 1) / (x - 3) : NaN,
      inv: x => x !== 2 ? (3 * x + 1) / (x - 2) : NaN,
      domain: { min: -10, max: 10 },
      samplePoints: [0, 1, 4, 5],
      asymptotes: { vertical: [3, 2], horizontal: [2, 2] }
    }
  ],
  
  init() {
    this.canvas = document.getElementById('grafik-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    
    // Set canvas size
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
    
    this.setupControls();
    this.render();
  },
  
  setupControls() {
    // Preset selector
    const presetSelect = document.getElementById('preset-select');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        this.config.currentPreset = parseInt(e.target.value);
        this.render();
      });
    }
    
    // Checkboxes
    const showF = document.getElementById('show-f');
    const showFinv = document.getElementById('show-finv');
    const showMirror = document.getElementById('show-mirror');
    const showPoints = document.getElementById('show-points');
    
    if (showF) {
      showF.addEventListener('change', (e) => {
        this.config.showF = e.target.checked;
        this.render();
      });
    }
    
    if (showFinv) {
      showFinv.addEventListener('change', (e) => {
        this.config.showFinv = e.target.checked;
        this.render();
      });
    }
    
    if (showMirror) {
      showMirror.addEventListener('change', (e) => {
        this.config.showMirror = e.target.checked;
        this.render();
      });
    }
    
    if (showPoints) {
      showPoints.addEventListener('change', (e) => {
        this.config.showPoints = e.target.checked;
        this.render();
      });
    }
    
    // Zoom buttons
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomReset = document.getElementById('btn-zoom-reset');
    
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => this.zoom(0.8));
    }
    
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => this.zoom(1.25));
    }
    
    if (btnZoomReset) {
      btnZoomReset.addEventListener('click', () => this.resetZoom());
    }
  },
  
  zoom(factor) {
    const centerX = (this.config.xMin + this.config.xMax) / 2;
    const centerY = (this.config.yMin + this.config.yMax) / 2;
    const rangeX = (this.config.xMax - this.config.xMin) * factor / 2;
    const rangeY = (this.config.yMax - this.config.yMin) * factor / 2;
    
    this.config.xMin = centerX - rangeX;
    this.config.xMax = centerX + rangeX;
    this.config.yMin = centerY - rangeY;
    this.config.yMax = centerY + rangeY;
    
    this.render();
  },
  
  resetZoom() {
    this.config.xMin = -10;
    this.config.xMax = 10;
    this.config.yMin = -10;
    this.config.yMax = 10;
    this.render();
  },
  
  render() {
    if (!this.ctx) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);
    
    // Draw components
    this.drawGrid();
    this.drawAxis();
    
    if (this.config.showMirror) {
      this.drawMirrorLine();
    }
    
    const preset = this.presets[this.config.currentPreset];
    
    if (this.config.showF) {
      this.drawFunction(preset.fn, Utils.parseColor('--color-graph-f'), 'f(x)');
    }
    
    if (this.config.showFinv) {
      this.drawFunction(preset.inv, Utils.parseColor('--color-graph-finv'), 'f⁻¹(x)');
    }
    
    if (this.config.showPoints) {
      this.drawSamplePoints(preset);
    }
  },
  
  toPixel(x, y) {
    const px = (x - this.config.xMin) / (this.config.xMax - this.config.xMin) * this.config.width;
    const py = this.config.height - (y - this.config.yMin) / (this.config.yMax - this.config.yMin) * this.config.height;
    return [px, py];
  },
  
  drawGrid() {
    const ctx = this.ctx;
    const gridColor = Utils.parseColor('--color-graph-grid');
    
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = Math.ceil(this.config.xMin); x <= this.config.xMax; x++) {
      const [px] = this.toPixel(x, 0);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, this.config.height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = Math.ceil(this.config.yMin); y <= this.config.yMax; y++) {
      const [, py] = this.toPixel(0, y);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(this.config.width, py);
      ctx.stroke();
    }
  },
  
  drawAxis() {
    const ctx = this.ctx;
    const axisColor = Utils.parseColor('--color-graph-axis');
    
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 2;
    
    // X-axis
    if (this.config.yMin <= 0 && this.config.yMax >= 0) {
      const [, py] = this.toPixel(0, 0);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(this.config.width, py);
      ctx.stroke();
    }
    
    // Y-axis
    if (this.config.xMin <= 0 && this.config.xMax >= 0) {
      const [px] = this.toPixel(0, 0);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, this.config.height);
      ctx.stroke();
    }
  },
  
  drawMirrorLine() {
    const ctx = this.ctx;
    const mirrorColor = Utils.parseColor('--color-graph-mirror');
    
    ctx.strokeStyle = mirrorColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    const [x1, y1] = this.toPixel(this.config.xMin, this.config.xMin);
    const [x2, y2] = this.toPixel(this.config.xMax, this.config.xMax);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    ctx.setLineDash([]);
  },
  
  drawFunction(fn, color, label) {
    const ctx = this.ctx;
    const step = (this.config.xMax - this.config.xMin) / this.config.width;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let started = false;
    
    for (let x = this.config.xMin; x <= this.config.xMax; x += step) {
      const y = fn(x);
      
      if (isNaN(y) || !isFinite(y)) {
        started = false;
        continue;
      }
      
      if (y < this.config.yMin - 10 || y > this.config.yMax + 10) {
        started = false;
        continue;
      }
      
      const [px, py] = this.toPixel(x, y);
      
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    
    ctx.stroke();
  },
  
  drawSamplePoints(preset) {
    const ctx = this.ctx;
    const fColor = Utils.parseColor('--color-graph-f');
    const finvColor = Utils.parseColor('--color-graph-finv');
    
    preset.samplePoints.forEach(x => {
      const y = preset.fn(x);
      
      if (isNaN(y) || !isFinite(y)) return;
      
      // Draw point on f(x)
      const [px1, py1] = this.toPixel(x, y);
      ctx.fillStyle = fColor;
      ctx.beginPath();
      ctx.arc(px1, py1, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw point on f⁻¹(x) (which is (y, x))
      const [px2, py2] = this.toPixel(y, x);
      ctx.fillStyle = finvColor;
      ctx.beginPath();
      ctx.arc(px2, py2, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw connecting line to mirror
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Grafik.init());
} else {
  Grafik.init();
}

// Re-render on window resize (debounced)
window.addEventListener('resize', Utils.debounce(() => {
  if (Grafik.canvas) {
    Grafik.render();
  }
}, 200));

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Grafik;
}
