Damoo
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

Initiate the engine by writing this.

```javascript
var damoo = Damoo('dm-screen', 'dm-canvas', 20);
```

And run it.

```javascript
Damoo.show();
Damoo.start();
```

Danmaku can be emitted by calling `emit` method.

```javascript
damoo.emit({ text: "Damoo is awesome!", color: "#f49" });
```

Clear the screen.

```javascript
damoo.clear();
```

Enjoy! And explore more of the code! :)

Contributing
------

Damoo is yet not a finished product so please just fork, and do whatever you want with it! [Pull Requests](https://github.com/jamesliu96/Damoo/pulls) are especially welcomed!

License
------

The MIT License (MIT)

Copyright (c) 2015 James Liu <j@jamesliu.info>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
