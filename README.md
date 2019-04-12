Damoo
======

Lightweight Canvas HTML5 Danmaku Engine.

[![Damoo](https://github.com/jamesliu96/damoo/raw/gh-pages/screenshot.png)](https://damoo.jamesliu.info/)

Youtube extension
------

[Click to see](https://gist.github.com/96576d2420877e7729fb) Damoo extension script for YouTube live chat.

Getting started
------

Use [Bower](http://bower.io/) .

```
$ bower install damoo
```

Damoo will be installed to `bower_components/` directory.

Or [download](https://github.com/jamesliu96/damoo/releases) the latest release.

Damoo requires a complete DOM with a suitable container to be fit in.

```html
<div id="dm-main">
    <div id="dm-screen"></div>
</div>
```

Then, import `damoo.js` or `damoo.min.js`.

```html
<script type="text/javascript" src="damoo.min.js"></script>
```

Initiate Damoo.

```javascript
var damoo = new Damoo('dm-screen', 'dm-canvas', 20);
```

Or by binding an element.

```javascript
var damoo = new Damoo(document.getElementById('dm-screen'), 'dm-canvas', 20);
```

Or use your own font instead of "sans-serif".

```javascript
var damoo = new Damoo('dm-screen', 'dm-canvas', 20, "Arial");
```

And run it.

```javascript
damoo.play();
```

Danmaku can be emitted by calling `emit` method.

```javascript
// Simple
damoo.emit("Damoo is awesome!");

// With attributes
damoo.emit({ text: "Damoo is awesome!", color: "#f49" });
```

Enable text shadow.

```javascript
damoo.emit({ text: "I got a shadow!", color: "#000", shadow: true });
```

Color the shadow.

```javascript
damoo.emit({ text: "Hooray!", color: "#f00", shadow: { color: "#f49" } });
```

Danmaku can also be fixed at the center of the screen.

```javascript
damoo.emit({ text: "I'M FIXED!", color: "#6f9", fixed: true });
```

Clear the screen.

```javascript
damoo.clear();
```

You may hide Damoo.

```javascript
damoo.hide();
```

And bring it back.

```javascript
damoo.show();
```

If needed, you may pause the animation.

```javascript
damoo.pause();
```

And resume it when ready to go.

```javascript
damoo.resume();
```

Hope you enjoy the code!

Contributing
------

Send [Pull Requests](https://github.com/jamesliu96/damoo/pulls) to contribute!

License
------

[![MIT License](https://img.shields.io/github/license/jamesliu96/damoo.svg)](https://github.com/jamesliu96/damoo/blob/master/LICENSE)
