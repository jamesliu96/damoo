Damoo [![Join Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jamesliu96/Damoo)
======

An HTML5 Danmaku Engine.

Getting started
------

[Download](https://github.com/jamesliu96/Damoo/releases) the latest release.

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
var damoo = Damoo('dm-screen', 'dm-canvas', 20);
```

Or use your own font instead of "sans-serif".

```javascript
var damoo = Damoo('dm-screen', 'dm-canvas', 20, "Arial");
```

And run it.

```javascript
damoo.show().start();
```

Danmaku can be emitted by calling `emit` method.

```javascript
damoo.emit({ text: "Damoo is awesome!", color: "#f49" });
```

Enable shadow below the text.

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

You may hide Damoo when necessary.

```javascript
damoo.hide();
```

If needed, you may suspend the animation.

```javascript
damoo.suspend();
```

And resume it when ready to go.

```javascript
damoo.resume();
```

Enjoy! And explore more of the code! :)

Contributing
------

Damoo is yet not a finished product so please just fork, and do whatever you want with it! [Pull Requests](https://github.com/jamesliu96/Damoo/pulls) are especially welcomed!

License
------

[![MIT License](https://img.shields.io/github/license/jamesliu96/Damoo.svg)](https://github.com/jamesliu96/Damoo/blob/master/LICENSE)
