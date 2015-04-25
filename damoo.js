/*!
 * Damoo - HTML5 Danmaku Engine v1.3.0
 * https://github.com/jamesliu96/Damoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(window) {
    var Damoo = function(m, n, r) {
        if (!(this instanceof Damoo)) {
            return new Damoo(m, n, r);
        }
        this.canvas = new Canvas(m, n, r);
        this.thread = new Thread();
    };

    Damoo.version = "v1.3.0";

    Damoo.dom = window.document;

    Damoo.utils = {};

    Damoo.utils.preload = function(d, f) {
        var cvs = Damoo.dom.createElement('canvas'),
            ctx = cvs.getContext('2d');
        cvs.width = f.size * d.text.length * 1.2;
        cvs.height = f.size * 1.2;
        ctx.font = f.value;
        ctx.fillStyle = "#fff";
        ctx.fillStyle = d.color;
        ctx.textAlign = "start";
        ctx.textBaseline = "top";
        ctx.fillText(d.text, 0, 0);
        return cvs;
    };

    Damoo.utils.random = function(r) {
        return Math.random() * r;
    };

    Damoo.utils.round = function(d) {
        return d + 0.5 | 0;
    };

    Damoo.utils.floor = function(d) {
        return d | 0;
    };

    var RAF = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(cb) { setTimeout(cb, 17); };

    Damoo.prototype.show = function() {
        this.canvas.parent.appendChild(this.canvas.layer);
    };

    Damoo.prototype.hide = function() {
        this.canvas.parent.removeChild(this.canvas.layer);
    };

    Damoo.prototype.emit = function(d) {
        var cvs = Damoo.utils.preload(d, this.canvas.font);
        this.thread.push({
            canvas: cvs,
            speed: Math.log(cvs.width),
            offset: {
                x: this.canvas.width,
                y: this.canvas.font.size * Damoo.utils.floor(Damoo.utils.random(this.canvas.rows))
            }
        });
    };

    Damoo.prototype.clear = function() {
        this.thread.empty();
    };

    Damoo.prototype.start = function() {
        this.canvas.clear();
        for (var i = 0; i < this.thread.length; i++) {
            var x = this.thread.get(i).offset.x,
                y = this.thread.get(i).offset.y;
            this.canvas.draw(this.thread.get(i), x, y);
            this.thread.get(i).offset.x -= this.thread.get(i).speed;
            if (x <= -this.thread.get(i).canvas.width) {
                this.thread.remove(i);
            }
        }
        RAF(function(self) {
            return function() {
                self.start();
            };
        }(this));
    };

    var Canvas = function(m, n, r) {
        this.parent = Damoo.dom.getElementById(m);
        this.parent.style.position = "relative";
        this.name = n;
        this.rows = r;
        if (this.height / this.rows < 12) {
            this.rows = this.height / 12;
        }
        this.width = this.parent.offsetWidth;
        this.height = this.parent.offsetHeight;
        this.font = new Font(this.height / this.rows, "sans-serif");
        this.layer = Damoo.dom.createElement('canvas');
        this.context = this.layer.getContext('2d');
        this.layer.className = this.name;
        this.layer.id = Math.random().toString(16).substr(2).substr(0, 6);
        this.layer.width = this.width;
        this.layer.height = this.height;
        this.layer.style.display = 'block';
        this.layer.style.backgroundColor = 'transparent';
        this.layer.style.position = 'absolute';
        this.layer.style.left = 0;
        this.layer.style.top = 0;
        this.layer.style.zIndex = 99999;
    };

    Canvas.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height);
    };

    Canvas.prototype.draw = function(t, x, y) {
        this.context.drawImage(t.canvas, Damoo.utils.round(x), Damoo.utils.round(y));
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

    var Thread = function() {
        this.pool = [];
    };

    Thread.prototype.push = function(d) {
        this.pool.push(d);
    };

    Thread.prototype.get = function(d) {
        return this.pool[d];
    };

    Thread.prototype.remove = function(d) {
        this.pool.splice(d, 1);
    };

    Thread.prototype.empty = function() {
        this.pool = [];
    };

    Object.defineProperty(Thread.prototype, 'length', {
        get: function() {
            return this.pool.length;
        }
    });

    window.Damoo = Damoo;
})(window);