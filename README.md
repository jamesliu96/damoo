Damoo [![Join Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jamesliu96/Damoo)
======

An HTML5 Danmaku Engine.

一个不起眼的 HTML5 弹幕引擎。

Getting started 走起
------

[Download](https://github.com/jamesliu96/Damoo/releases) the latest release.

[下载](https://github.com/jamesliu96/Damoo/releases)最新发行版本。

Damoo requires a complete DOM with a suitable container to be fit in.

需要在页面中准备一个合适的容器。

```html
<div id="dm-main">
    <div id="dm-screen"></div>
</div>
```

Then, import `damoo.js` or `damoo.min.js`.

然后引入`damoo.js`或`damoo.min.js`。

```html
<script type="text/javascript" src="damoo.min.js"></script>
```

Initiate Damoo.

初始化。

```javascript
var damoo = Damoo('dm-screen', 'dm-canvas', 20);
```

Or use your own font instead of "sans-serif".

可自定义全局字体。

```javascript
var damoo = Damoo('dm-screen', 'dm-canvas', 20, "Arial");
```

And run it.

运行。

```javascript
damoo.start();
```

Danmaku can be emitted by calling `emit` method.

用`emit`方法发射弹幕。

```javascript
damoo.emit({ text: "Damoo is awesome!", color: "#f49" });
```

Enable text shadow.

开启字体阴影。

```javascript
damoo.emit({ text: "I got a shadow!", color: "#000", shadow: true });
```

Color the shadow.

自定义阴影颜色。

```javascript
damoo.emit({ text: "Hooray!", color: "#f00", shadow: { color: "#f49" } });
```

Danmaku can also be fixed at the center of the screen.

发射固定弹幕。

```javascript
damoo.emit({ text: "I'M FIXED!", color: "#6f9", fixed: true });
```

Clear the screen.

清空屏幕。

```javascript
damoo.clear();
```

You may hide Damoo.

隐藏弹幕图层。

```javascript
damoo.hide();
```

And bring it back.

显示弹幕图层。

```javascript
damoo.show();
```

If needed, you may suspend the animation.

暂停动画。

```javascript
damoo.suspend();
```

And resume it when ready to go.

恢复动画。

```javascript
damoo.resume();
```

Contributing 填坑
------

Hope you enjoy the code!

你们城里人都很会玩，我就不多说了。

_(:з」∠)_

Send [Pull Requests](https://github.com/jamesliu96/Damoo/pulls) to contribute!

想填坑的话，请发送 [Pull Requests](https://github.com/jamesliu96/Damoo/pulls)。

License 许可协议
------

[![MIT License](https://img.shields.io/github/license/jamesliu96/Damoo.svg)](https://github.com/jamesliu96/Damoo/blob/master/LICENSE)
