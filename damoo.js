/*!
 * Damoo - HTML5 Danmaku Engine v1.2.0
 * https://github.com/jamesliu96/Damoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(window) {
    var Damoo = function(m, n, r) {
        if(!(this instanceof Damoo)) {
            return new Damoo(m, n, r);
        }

        this.parent = Damoo.dom.getElementById(m);
        this.canvas = Damoo.dom.createElement('canvas');

        this.canvas.id = n;

        this.canvas.width = this.parent.offsetWidth;
        this.canvas.height = this.parent.offsetHeight;

        this.canvas.style.display = 'block';
        this.canvas.style.backgroundColor = 'transparent';
        this.canvas.style.position = 'relative';
        this.canvas.style.left = 0;
        this.canvas.style.top = 0;
        this.canvas.style.zIndex = 99999;

        this.ctx = this.canvas.getContext('2d');

        this.rows = r;

        this.font = new Font(this.canvas.height / this.rows, "Arial");

        this.thread = new Thread();
    };

    Damoo.dom = window.document;

    Damoo.prototype.show = function() {
        this.parent.appendChild(this.canvas);
    };

    Damoo.prototype.hide = function() {
        this.parent.removeChild(this.canvas);
    };

    Damoo.prototype.emit = function(dt) {
        var canvas = Damoo.dom.createElement('canvas'),
            ctx = canvas.getContext('2d');
        canvas.width = this.font.size * dt.text.length;
        canvas.height = this.font.size * 1.2;
        ctx.font = this.font.toString();
        ctx.fillStyle = "#fff";
        ctx.fillStyle = dt.color;
        ctx.textAlign = "start";
        ctx.textBaseline = "top";
        ctx.fillText(dt.text, 0, 0);
        this.thread.push({
            canvas: canvas,
            speed: Math.sqrt(dt.text.length) / 1.5,
            offset: {
                x: this.canvas.width,
                y: null
            }
        });
    };

    Damoo.prototype.clear = function() {
        this.thread.empty();
    };

    Damoo.prototype.start = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.thread.length; i++) {
            var x = this.thread.get(i).offset.x, y;
            if (this.thread.get(i).offset.y == null) {
                y = this.thread.get(i).offset.y = this.font.size * Math.floor(Math.random() * this.rows);
            } else {
                y = this.thread.get(i).offset.y;
            }
            this.ctx.drawImage(this.thread.get(i).canvas, x, y);
            this.thread.get(i).offset.x -= this.thread.get(i).speed;
            if (x <= -this.thread.get(i).canvas.width) {
                this.thread.remove(i);
            }
        }
        setTimeout(function(self) {
            return function() {
                self.start();
            };
        }(this), 1);
    };

    var Font = function(s, f) {
        this.size = s;
        this.family = f;
    };

    Font.prototype.toString = function() {
        return this.size + "px " + this.family;
    };

    var Thread = function() {
        this.memory = [];
    };

    Thread.prototype.push = function(dt) {
        this.memory.push(dt);
    };

    Thread.prototype.get = function(idx) {
        return this.memory[idx];
    };

    Thread.prototype.remove = function(idx) {
        this.memory.splice(idx, 1);
    };

    Thread.prototype.empty = function() {
        this.memory = [];
    };

    Object.defineProperty(Thread.prototype, 'length', {
        get: function() {
            return this.memory.length;
        }
    });

    window.Damoo = Damoo;
})(window);