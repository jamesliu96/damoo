/*!
 * Damoo - HTML5 Danmaku Engine v2.0.0
 * https://github.com/jamesliu96/Damoo
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
onmessage = function(e) {
    postMessage({
        speed: Math.pow(e.data.w, 1 / 3) * 0.6
    });
};