/*!
 * Damoo - HTML5 Danmaku Engine v1.0.0
 * https://github.com/jamesliu96/damoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(window) {
    var Damoo = {};

    Damoo.dom = window.document;

    var $ = function(id) {
        return Damoo.dom.getElementById(id);
    };

    var _DOMcreate = function(id, elm) {
        $(id).appendChild(elm);
    };
    var _DOMdestroy = function(id, elm) {
        $(id).body.removeChild(elm);
    };

    Damoo.canvas = Damoo.dom.createElement('canvas');

    Damoo.canvas.id = 'dm-canvas';
    Damoo.canvas.style.display = 'block';
    Damoo.canvas.style.cursor = 'none';
    Damoo.canvas.style.backgroundColor = "#000";

    Damoo.show = function(id) {
        _DOMcreate(id, Damoo.canvas);
    };
    Damoo.hide = function(id) {
        _DOMdestroy(id, Damoo.canvas);
    };
    Damoo.fullscreen = function() {
        if (Damoo.canvas.requestFullscreen) {
            Damoo.canvas.requestFullscreen();
        } else if (Damoo.canvas.mozRequestFullscreen) {
            Damoo.canvas.mozRequestFullscreen();
        } else if (Damoo.canvas.webkitRequestFullscreen) {
            Damoo.canvas.webkitRequestFullscreen();
        } else {
            console.error("Fullscreen API is not supported.");
        }
    };

    Object.defineProperty(Damoo, 'width', {
        get: function() {
            return Damoo.canvas.width;
        },
        set: function(w) {
            Damoo.canvas.width = w;
        }
    });
    Object.defineProperty(Damoo, 'height', {
        get: function() {
            return Damoo.canvas.height;
        },
        set: function(w) {
            Damoo.canvas.height = w;
        }
    });

    Damoo.width = window.innerWidth;
    Damoo.height = window.innerHeight;

    Damoo.font = {
        size: Damoo.height / 20,
        family: "Heiti"
    };

    Damoo.ctx = Damoo.canvas.getContext('2d');
    Damoo.ctx.font = Damoo.font.size + "px " + Damoo.font.family;
    Damoo.ctx.fillStyle = "#fff";
    Damoo.ctx.textAlign = "end";
    Damoo.ctx.textBaseline = "top";

    Damoo.clear = function() {
        Damoo.ctx.clearRect(0, 0, Damoo.width, Damoo.height);
    };

    Damoo.thread = [];

    Damoo.emit = function(dt) {
        Damoo.thread.push({
            text: dt.text,
            color: dt.color,
            time: new Date().getTime(),
            offset: 0
        });
    };

    var _term = function(dr) {
        Damoo.thread.splice(dr, 1);
    }

    Damoo.start = function() {
        Damoo.clear();
        for (var i = 0; i < Damoo.thread.length; i++) {
            var x = Damoo.width - Damoo.thread[i].offset,
                y = Damoo.thread[i].y = Damoo.thread[i].y || ((Damoo.font.size * i) % Damoo.height);
            Damoo.ctx.fillStyle = Damoo.thread[i].color;
            Damoo.ctx.fillText(Damoo.thread[i].text, x, y);
            Damoo.thread[i].offset++;
            if (x <= 0) {
                _term(i);
            }
        }
        setTimeout(Damoo.start, 1);
    };

    window.Damoo = Damoo;
})(window);