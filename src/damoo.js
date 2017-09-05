/*!
 * Damoo - HTML5 Danmaku Engine v2.3.0
 * https://github.com/jamesliu96/Damoo
 *
 * Copyright (c) 2015-2017 James Liu
 * Released under the MIT license
 */
;(window => {
  class Damoo {
    constructor(m, n, r, t) {
      this.canvas = new Canvas(m, n, r, t);
      this.thread = new Thread(r);
    }
    show() {
      this.canvas.parent.appendChild(this.canvas.layer);
      return this;
    }
    hide() {
      this.canvas.parent.removeChild(this.canvas.layer);
      return this;
    }
    emit(d) {
      if ('string' === typeof d) {
        d = { text: d };
      }
      var cvs = _preload(d, this.canvas.font);
      this.thread.push({
        canvas: cvs,
        fixed: d.fixed,
        index: this.thread.index,
        speed: Math.pow(cvs.width, 1 / 3) * 0.6,
        offset: {
          x: this.canvas.width,
          y: this.canvas.font.size * this.thread.index
        }
      });
      return this;
    }
    clear() {
      this.thread.empty();
      return this;
    }
    play() {
      if (this.state === void 0) {
        this.clear().show();
      }
      if (!this.state) {
        _render.call(this);
        this.state = 1;
      }
      return this;
    }
    pause() {
      if (this.state === void 0) {
        return this;
      }
      _CAF(this._afid);
      this.state = 0;
      return this;
    }
    resume() {
      return this.play();
    }
  }

  function _preload(d, f) {
    var cvs = Damoo.dom.createElement('canvas'),
        ctx = cvs.getContext('2d');
    ctx.font = f;
    cvs.width = ctx.measureText(d.text).width;
    cvs.height = f.size * 1.5;
    ctx.font = f;
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
    if (d.shadow) {
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowColor = '#fff';
      ctx.shadowColor = d.shadow.color;
    }
    ctx.fillStyle = '#fff';
    ctx.fillStyle = d.color;
    ctx.fillText(d.text, 0, 0);
    return cvs;
  }

  var _RAF = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(cb) { return setTimeout(cb, 17); };

  var _CAF = window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.msCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function(id) { clearTimeout(id); };

  function _render() {
    this.canvas.clear();
    for (var i = 0; i < this.thread.pool.length; i++) {
      var d = this.thread.get(i),
        x = d.offset.x,
        y = d.offset.y;
      this.canvas.draw(d, x, y);
      d.offset.x -= d.speed;
      if (x <= -d.canvas.width) {
        this.thread.remove(i);
      }
    }
    this._afid = _RAF(_render.bind(this));
  }

  class Canvas {
    constructor(m, n, r, t) {
      this.dpr = window.devicePixelRatio || 1;
      this.parent = m.nodeType == 1 ? m : Damoo.dom.getElementById(m);
      this.id = n;
      this.rows = r;
      this.width = this.parent.offsetWidth * this.dpr;
      this.height = this.parent.offsetHeight * this.dpr;
      if (this.height / this.rows < 12) {
        this.rows = this.height / 12;
      }
      this.font = new Font(this.height / this.rows, t);
      this.layer = Damoo.dom.createElement('canvas');
      this.context = this.layer.getContext('2d');
      this.layer.id = this.id;
      this.layer.width = this.width;
      this.layer.height = this.height;
      this.layer.style.width = this.width / this.dpr + 'px';
      this.layer.style.height = this.height / this.dpr + 'px';
      this.layer.style.display = 'block';
      this.layer.style.backgroundColor = 'transparent';
      if (this.parent.style.position) {
        this.layer.style.position = 'fixed';
        this.layer.style.left = this.parent.offsetLeft;
        this.layer.style.top = this.parent.offsetTop;
      } else {
        this.parent.style.position = 'relative';
        this.layer.style.position = 'absolute';
        this.layer.style.left = 0;
        this.layer.style.top = 0;
      }
      this.layer.style.zIndex = 999;
    }
    clear() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
    draw(t, x, y) {
      if (t.fixed) {
        x = (this.width - t.canvas.width) / 2;
      }
      this.context.drawImage(t.canvas, x, y);
    }
  }

  class Font {
    constructor(s, f) {
      this.size = s;
      this.family = f || 'sans-serif';
    }
    toString() {
      return this.size + 'px ' + this.family;
    }
  }

  class Thread {
    constructor(r) {
      this.index = 0;
      this.rows = r;
      this.pool = [];
    }
    push(d) {
      this.index++;
      if (this.index >= this.rows) {
        this.index = 0;
      }
      this.pool.push(d);
    }
    get(d) {
      return this.pool[d];
    }
    remove(d) {
      var i = this.get(d).index;
      if (this.index > i) {
        this.index = i;
      }
      this.pool.splice(d, 1);
    }
    empty() {
      this.index = 0;
      this.pool = [];
    }
  }

  Damoo.version = 'v2.3.0';

  Damoo.dom = window.document;

  window.Damoo = Damoo;
})(window);