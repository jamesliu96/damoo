/*!
 * Damoo - HTML5 Danmaku Engine v2.1.6
 * https://github.com/jamesliu96/Damoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(window) {
    var Damoo = function(m, n, r, t) {
        if (!(this instanceof Damoo)) {
            return new Damoo(m, n, r, t);
        }
        this.canvas = new Canvas(m, n, r, t);
        this.thread = new Thread(r);
    };

    Damoo.version = "v2.1.6";

    Damoo.dom = window.document;

    var _crop = function(c, x) {
        var g = x.getImageData(0, 0, c.width, c.height);
        for (var i = c.height - 1, j, w = 0, d = g.data; i >= 0; i--) {
            for (j = c.width - 1; j >= 0; j--) {
                if (d[(i * c.width + j) * 4 + 3] != 0) {
                    if (j > w) {
                        w = j + 1;
                    }
                }
            }
        }
        c.width = w;
        x.putImageData(g, 0, 0);
    };

    var _preload = function(d, f) {
        var cvs = Damoo.dom.createElement('canvas'),
            ctx = cvs.getContext('2d');
        cvs.width = f.size * d.text.length * 1.2;
        cvs.height = f.size * 1.2;
        ctx.font = f.value;
        ctx.textAlign = "start";
        ctx.textBaseline = "top";
        if (d.shadow) {
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowColor = "#fff";
            ctx.shadowColor = d.shadow.color;
        }
        ctx.fillStyle = "#fff";
        ctx.fillStyle = d.color;
        ctx.fillText(d.text, 0, 0);
        if (d.fixed) {
            _crop(cvs, ctx);
        }
        return cvs;
    };

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

    Damoo.prototype.show = function() {
        this.canvas.parent.appendChild(this.canvas.layer);
        return this;
    };

    Damoo.prototype.hide = function() {
        this.canvas.parent.removeChild(this.canvas.layer);
        return this;
    };

    Damoo.prototype.emit = function(d) {
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
    };

    Damoo.prototype.clear = function() {
        this.thread.empty();
        return this;
    };

    var _afid;

    var _render = function() {
        this.canvas.clear();
        for (var i = 0; i < this.thread.length; i++) {
            var d = this.thread.get(i),
                x = d.offset.x,
                y = d.offset.y;
            this.canvas.draw(d, x, y);
            d.offset.x -= d.speed;
            if (x <= -d.canvas.width) {
                this.thread.remove(i);
            }
        }
        _afid = _RAF(function(self) {
            return function() {
                _render.call(self);
            };
        }(this));
    };

    Damoo.prototype.start = function() {
        if (this.state === void 0) {
            this.clear().show();
        }
        if (!this.state) {
            _render.call(this);
            this.state = 1;
        }
        return this;
    };

    Damoo.prototype.suspend = function() {
        if (this.state === void 0) {
            return this;
        }
        _CAF(_afid);
        this.state = 0;
        return this;
    };

    Damoo.prototype.resume = function() {
        return this.start();
    };

    var Canvas = function(m, n, r, t) {
        this.parent = Damoo.dom.getElementById(m);
        this.parent.style.position = "relative";
        this.id = n;
        this.rows = r;
        this.width = this.parent.offsetWidth;
        this.height = this.parent.offsetHeight;
        if (this.height / this.rows < 12) {
            this.rows = this.height / 12;
        }
        this.font = new Font(this.height / this.rows, t || "sans-serif");
        this.layer = Damoo.dom.createElement('canvas');
        this.context = this.layer.getContext('2d');
        this.layer.id = this.id;
        this.layer.width = this.width;
        this.layer.height = this.height;
        this.layer.style.display = "block";
        this.layer.style.backgroundColor = "transparent";
        this.layer.style.position = "absolute";
        this.layer.style.left = 0;
        this.layer.style.top = 0;
        this.layer.style.zIndex = 99999;
    };

    Canvas.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height);
    };

    Canvas.prototype.draw = function(t, x, y) {
        if (t.fixed) {
            this.context.drawImage(t.canvas, (this.width - t.canvas.width) / 2 + 0.5 | 0, y + 0.5 | 0);
        } else {
            this.context.drawImage(t.canvas, x + 0.5 | 0, y + 0.5 | 0);
        }
    };

    var Font = function(s, f) {
        this.size = s;
        this.family = f;
    };

    Object.defineProperty(Font.prototype, 'value', {
        get: function() {
            return this.size + "px " + this.family;
        }
    });

    var Thread = function(r) {
        this.index = 0;
        this.rows = r;
        this.pool = [];
    };

    Thread.prototype.push = function(d) {
        this.index++;
        if (this.index >= this.rows) {
            this.index = 0;
        }
        this.pool.push(d);
    };

    Thread.prototype.get = function(d) {
        return this.pool[d];
    };

    Thread.prototype.remove = function(d) {
        var i = this.get(d).index;
        if (this.index > i) {
            this.index = i;
        }
        this.pool.splice(d, 1);
    };

    Thread.prototype.empty = function() {
        this.index = 0;
        this.pool = [];
    };

    Object.defineProperty(Thread.prototype, 'length', {
        get: function() {
            return this.pool.length;
        }
    });

    window.Damoo = Damoo;
})(window);