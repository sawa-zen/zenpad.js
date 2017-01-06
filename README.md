# Zenpad.js — GamePad for canvas

![](https://github.com/sawa-zen/zenpad.js/wiki/images/zenpad_readme.png)

[![wercker status](https://app.wercker.com/status/6764b7988a279822959e792434e70223/s/master "wercker status")](https://app.wercker.com/project/byKey/6764b7988a279822959e792434e70223)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

### Setup

#### NPM Install

```bash
$ npm install zenpad.js
```

#### Script Install

```html
<script src="zenpad.js"></script>
```

### Basic Usage Example

```html
<div id="myZenpad"></div>
<script>
window.addEventListener('load', init);
function init() {
  var zenpad = new Zenpad('myZenpad');

  zenpad.on('clickA', function() {
    console.info('clickA');
  });

  zenpad.on('moveStick', function(event) {
    console.info('moveStick', event.x);
  });
}
</script>
```

### Method

- **on(eventName:String, handler:Function)**
Use to add events.

- **off(eventName:String, handler:Function)**
Use to remove events.

### Event

- **clickA**
Emit "clickA" event when push "A" button.

- **clickB**
Emit "clickB" event when push "B" button.

- **moveStick**
Emit "moveStick" event when move stick.

  **Property**
  - **x** : It is "x" position of stick.
  - **y** : It is "y" position of stick.
  - **angle** : It is the angle where the stick was knocked down.

- **releaseStick**
Emit "releaseStick" event when stick is released.
