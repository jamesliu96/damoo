Damoo [![Join Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jamesliu96/Damoo)
======

An HTML5 Danmaku Engine.

一个<s>不起眼</s>小小的 HTML5 弹幕引擎。

[![Demo GIF](https://cloud.githubusercontent.com/assets/2211002/10910122/70da302e-81f2-11e5-8f11-2e21e33bfe11.gif)](http://damoo.jamesliu.info/)

[![Demo](https://cloud.githubusercontent.com/assets/2211002/9020607/5be8bea8-3849-11e5-8e60-050179779374.png)](http://damoo.jamesliu.info/)

Youtube extension Youtube 插件
------

[Click to see](https://gist.github.com/96576d2420877e7729fb) Damoo extension script for YouTube live chat.

[进入](https://gist.github.com/96576d2420877e7729fb) YouTube 在线聊天 Damoo 插件页面。

Getting started 走起
------

Use [Bower](http://bower.io/) .

使用 [Bower](http://bower.io/)。

```
$ bower install damoo
```

Damoo will be installed to `bower_components/` directory.

安装至`bower_components/`目录下。

Or [download](https://github.com/jamesliu96/Damoo/releases) the latest release.

或[下载](https://github.com/jamesliu96/Damoo/releases)最新发行版本。

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
var damoo = new Damoo('dm-screen', 'dm-canvas', 20);
```

Or by binding an element.

可绑定元素。

```javascript
var damoo = new Damoo(document.getElementById('dm-screen'), 'dm-canvas', 20);
```

Or use your own font instead of "sans-serif".

可自定义全局字体。

```javascript
var damoo = new Damoo('dm-screen', 'dm-canvas', 20, "Arial");
```

And run it.

运行。

```javascript
damoo.play();
```

Danmaku can be emitted by calling `emit` method.

用`emit`方法发射弹幕。

```javascript
// Simple
damoo.emit("Damoo is awesome!");

// With attributes
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

If needed, you may pause the animation.

暂停动画。

```javascript
damoo.pause();
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

\_(:з」∠)\_

Send [Pull Requests](https://github.com/jamesliu96/Damoo/pulls) to contribute!

想填坑的话，请发送 [Pull Requests](https://github.com/jamesliu96/Damoo/pulls)。

License 许可协议
------

```
The MIT License (MIT)

Copyright (c) 2015-2017 James Liu

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
```
