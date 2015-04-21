/*!
 * Damoo - HTML5 Danmaku Engine v1.0.3
 * https://github.com/jamesliu96/damoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(window) {
    var Damoo = {};

    Damoo.dom = window.document;

    Damoo.canvas = Damoo.dom.createElement('canvas');

    Damoo.canvas.id = 'dm-canvas';

    Damoo.canvas.style.display = 'block';

    Damoo.canvas.width = window.innerWidth;
    Damoo.canvas.height = window.innerHeight;

    Damoo.show = function(id) {
        Damoo.dom.getElementById(id).appendChild(Damoo.canvas);
    };
    Damoo.hide = function() {
        Damoo.canvas.parentNode.removeChild(Damoo.canvas);
    };

    Damoo.rows = 20;

    Damoo.font = {
        size: Damoo.canvas.height / Damoo.rows,
        family: "Arial"
    };

    Damoo.ctx = Damoo.canvas.getContext('2d');
    Damoo.ctx.font = Damoo.font.size + "px " + Damoo.font.family;
    Damoo.ctx.fillStyle = "#fff";
    Damoo.ctx.textAlign = "start";
    Damoo.ctx.textBaseline = "bottom";

    var _cls = function() {
        Damoo.ctx.clearRect(0, 0, Damoo.canvas.width, Damoo.canvas.height);
    };

    Damoo.thread = [];

    var _del = function(dr) {
        Damoo.thread.splice(dr, 1);
    };

    var _wri = function(tx, cl, x, y) {
        Damoo.ctx.restore();
        Damoo.ctx.save();
        Damoo.ctx.fillStyle = cl;
        Damoo.ctx.fillText(tx, x, y);
    };

    Damoo.emit = function(dt) {
        Damoo.thread.push({
            text: dt.text,
            color: dt.color,
            speed: Math.sqrt(dt.text.length) / 1.5,
            offset: 0
        });
    };

    Damoo.clear = function() {
        Damoo.thread = [];
    };

    Damoo.start = function() {
        _cls();
        for (var i = 0; i < Damoo.thread.length; i++) {
            var x = Damoo.canvas.width - Damoo.thread[i].offset,
                y = Damoo.thread[i].y = Damoo.thread[i].y || (Damoo.font.size * Math.ceil(Math.random() * Damoo.rows));
            _wri(Damoo.thread[i].text, Damoo.thread[i].color, x, y);
            Damoo.thread[i].offset += Damoo.thread[i].speed;
            if (x <= - Damoo.thread[i].text.length * Damoo.font.size) {
                _del(i);
            }
        }
        setTimeout(Damoo.start, 1);
    };

    window.Damoo = Damoo;
})(window);