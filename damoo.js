/*!
 * Damoo - HTML5 Danmaku Engine v1.0.2
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

    Damoo.canvas.width = window.innerWidth;
    Damoo.canvas.height = window.innerHeight;

    Damoo.show = function(id) {
        _DOMcreate(id, Damoo.canvas);
    };
    Damoo.hide = function(id) {
        _DOMdestroy(id, Damoo.canvas);
    };

    Damoo.rows = 20;

    Damoo.font = {
        size: Damoo.canvas.height / Damoo.rows,
        family: "Heiti"
    };

    Damoo.ctx = Damoo.canvas.getContext('2d');
    Damoo.ctx.font = Damoo.font.size + "px " + Damoo.font.family;
    Damoo.ctx.fillStyle = "#fff";
    Damoo.ctx.textAlign = "end";
    Damoo.ctx.textBaseline = "bottom";

    var _clear = function() {
        Damoo.ctx.clearRect(0, 0, Damoo.canvas.width, Damoo.canvas.height);
    };

    Damoo.thread = [];

    Damoo.emit = function(dt) {
        Damoo.thread.push({
            text: dt.text,
            color: dt.color,
            speed: Math.sqrt(dt.text.length) / 1.5,
            offset: 0
        });
    };

    var _finish = function(dr) {
        Damoo.thread.splice(dr, 1);
    };

    var _write = function(tx, cl, x, y) {
        Damoo.ctx.restore();
        Damoo.ctx.save();
        Damoo.ctx.fillStyle = cl;
        Damoo.ctx.fillText(tx, x, y);
    };

    Damoo.start = function() {
        _clear();
        for (var i = 0; i < Damoo.thread.length; i++) {
            var x = Damoo.canvas.width - Damoo.thread[i].offset,
                y = Damoo.thread[i].y = Damoo.thread[i].y || (Damoo.font.size * Math.ceil(Math.random() * Damoo.rows));
            _write(Damoo.thread[i].text, Damoo.thread[i].color, x, y);
            Damoo.thread[i].offset += Damoo.thread[i].speed;
            if (x <= 0) {
                _finish(i);
            }
        }
        setTimeout(Damoo.start, 1);
    };

    window.Damoo = Damoo;
})(window);