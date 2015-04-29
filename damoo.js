/*!
 * Damoo - HTML5 Danmaku Engine v2.0.0alpha
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

    Damoo.version = "v2.0.0alpha";

    Damoo.dom = window.document;

    var _preload = function(d, f) {
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

    var _random = function(r) {
        return Math.random() * r;
    };

    var _round = function(d) {
        return d + 0.5 | 0;
    };

    var _floor = function(d) {
        return d | 0;
    };

    var RAF = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(cb) { setTimeout(cb, 17); };

    Damoo.prototype.show = function() {
        for (var i = 0; i < this.canvas.layers.length; i++) {
            this.canvas.parent.appendChild(this.canvas.layers[i]);
        }
    };

    Damoo.prototype.hide = function() {
        for (var i = 0; i < this.canvas.layers.length; i++) {
            this.canvas.parent.removeChild(this.canvas.layers[i]);
        }
    };

    Damoo.prototype.emit = function(d) {
        var cvs = _preload(d, this.canvas.font);
        this.thread.push({
            fixed: d.fixed,
            canvas: cvs,
            speed: Math.pow(cvs.width, 1 / 3) * 0.6,
            offset: {
                x: this.canvas.width,
                y: this.canvas.font.size * _floor(Math.random() * this.canvas.rows)
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
        this.layers = [
            Damoo.dom.createElement('canvas'),
            Damoo.dom.createElement('canvas')
        ];
        this.contexts = [
            this.layers[0].getContext('2d'),
            this.layers[1].getContext('2d')
        ];
        this.layers[0].className = this.layers[1].className = this.name;
        this.layers[0].id = Math.random().toString(16).substr(2).substr(0, 6);
        this.layers[1].id = Math.random().toString(16).substr(2).substr(0, 6);
        this.layers[0].width = this.layers[1].width = this.width;
        this.layers[0].height = this.layers[1].height = this.height;
        this.layers[0].style.display = this.layers[1].style.display = 'block';
        this.layers[0].style.backgroundColor = this.layers[1].style.backgroundColor = 'transparent';
        this.layers[0].style.position = this.layers[1].style.position = 'absolute';
        this.layers[0].style.left = this.layers[1].style.left = 0;
        this.layers[0].style.top = this.layers[1].style.top = 0;
        this.layers[0].style.zIndex = 99998;
        this.layers[1].style.zIndex = 99999;
    };

    Canvas.prototype.clear = function() {
        this.contexts[0].clearRect(0, 0, this.width, this.height);
        this.contexts[1].clearRect(0, 0, this.width, this.height);
    };

    Canvas.prototype.draw = function(t, x, y) {
        if (t.fixed) {
            this.contexts[1].drawImage(t.canvas, (this.width - t.canvas.width) / 2, _round(y));
        } else {
            this.contexts[0].drawImage(t.canvas, _round(x), _round(y));
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