(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('./component/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Pad = require('./component/Pad');

var _Pad2 = _interopRequireDefault(_Pad);

var _EventName = require('./event/EventName');

var _EventName2 = _interopRequireDefault(_EventName);

var _PublicEventName = require('./event/PublicEventName');

var _PublicEventName2 = _interopRequireDefault(_PublicEventName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Zenpadのメインクラスです。
 */
var Zenpad = function (_createjs$EventDispat) {
  _inherits(Zenpad, _createjs$EventDispat);

  /**
   * コンストラクター
   * @constructor
   * @param {string} dpmId
   */
  function Zenpad(canvasId) {
    _classCallCheck(this, Zenpad);

    // ステージを作成
    var _this = _possibleConstructorReturn(this, (Zenpad.__proto__ || Object.getPrototypeOf(Zenpad)).call(this));

    _this._canvasId = canvasId;
    _this._canvas = document.getElementById(_this._canvasId);

    // ステージ
    _this._stage = new createjs.Stage(_this._canvasId);
    createjs.Touch.enable(_this._stage);

    // 左側グループ
    _this._leftButtons = new createjs.Container();
    _this._stage.addChild(_this._leftButtons);

    // 右側グループ
    _this._rightButtons = new createjs.Container();
    _this._rightButtons.regX = 190;
    _this._stage.addChild(_this._rightButtons);

    // アナログパッド
    var pad = new _Pad2.default();
    pad.x = 80;
    pad.y = 90;
    _this._leftButtons.addChild(pad);

    // Aボタン
    var aButton = new _Button2.default(_PublicEventName2.default.CLICK_A);
    aButton.x = 150;
    aButton.y = 80;
    _this._rightButtons.addChild(aButton);

    // Bボタン
    var bButton = new _Button2.default(_PublicEventName2.default.CLICK_B);
    bButton.x = 80;
    bButton.y = 110;
    _this._rightButtons.addChild(bButton);

    // フレーム毎の更新
    _this._tick = _this._tick.bind(_this);
    createjs.Ticker.addEventListener("tick", _this._tick);

    // リサイズ
    _this._resize = _this._resize.bind(_this);
    window.addEventListener("resize", _this._resize);

    // 初回リサイズ処理
    _this._resize();
    return _this;
  }

  /**
   * 毎フレーム毎のアニメーション
   */


  _createClass(Zenpad, [{
    key: '_tick',
    value: function _tick() {
      this._stage.update();
    }

    /**
     * リサイズ
     */

  }, {
    key: '_resize',
    value: function _resize() {
      // canvasサイズを合わせる
      this._canvas.setAttribute('width', String(this._canvas.clientWidth));
      this._canvas.setAttribute('height', String(this._canvas.clientHeight));

      // 右側グループを右隅に
      this._rightButtons.x = this._canvas.clientWidth;
    }
  }]);

  return Zenpad;
}(createjs.EventDispatcher);

window.Zenpad = Zenpad;

},{"./component/Button":2,"./component/Pad":3,"./event/EventName":4,"./event/PublicEventName":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventName = require('../event/EventName');

var _EventName2 = _interopRequireDefault(_EventName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ボタンクラスです。
 */
var Button = function (_createjs$Container) {
  _inherits(Button, _createjs$Container);

  /**
   * コンストラクター
   * @constructor
   */
  function Button(eventName) {
    _classCallCheck(this, Button);

    // 幅
    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

    _this._width = 55;

    // イベント名
    _this._eventName = eventName;

    _this._onClick = _this._onClick.bind(_this);

    // シェイプ
    _this._shape = new createjs.Shape();
    _this._shape.graphics.beginFill('#8c3568');
    _this._shape.graphics.drawCircle(0, 0, _this._width / 2);
    _this._shape.graphics.endFill();
    _this.addChild(_this._shape);
    _this._shape.addEventListener(_EventName2.default.CLICK, _this._onClick);
    return _this;
  }

  /**
   * ボタン押下時のハンドラーです。
   */


  _createClass(Button, [{
    key: '_onClick',
    value: function _onClick(event) {}
  }]);

  return Button;
}(createjs.Container);

exports.default = Button;

},{"../event/EventName":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PublicEventName = require('../event/PublicEventName');

var _PublicEventName2 = _interopRequireDefault(_PublicEventName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * アナログパッドクラスです。
 */
var Pad = function (_createjs$Container) {
  _inherits(Pad, _createjs$Container);

  /**
   * コンストラクター
   * @constructor
   */
  function Pad() {
    _classCallCheck(this, Pad);

    // 半径
    var _this = _possibleConstructorReturn(this, (Pad.__proto__ || Object.getPrototypeOf(Pad)).call(this));

    _this._radius = 60;
    // スティクの半径
    _this._stickRadius = 30;

    _this._onTouchMove = _this._onTouchMove.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);

    // 背景
    var bg = new createjs.Shape();
    bg.graphics.beginFill('#abafb8');
    bg.graphics.drawCircle(0, 0, _this._radius);
    bg.graphics.endFill();
    _this.addChild(bg);

    // スティック
    _this._stick = new createjs.Shape();
    _this._stick.graphics.beginFill('#333333');
    _this._stick.graphics.drawCircle(0, 0, _this._stickRadius);
    _this._stick.graphics.endFill();
    _this.addChild(_this._stick);

    // タッチイベント
    _this.addEventListener('pressmove', _this._onTouchMove);
    _this.addEventListener('pressup', _this._onMouseUp);
    return _this;
  }

  /**
   * タッチムーブ時のハンドラーです。
   */


  _createClass(Pad, [{
    key: '_onTouchMove',
    value: function _onTouchMove(event) {
      var x = event.localX,
          y = event.localY;
      var vec = new Victor(x, y);

      // 枠外に出ていれば枠内に収める
      if (vec.length() > this._radius - this._stickRadius) {
        var v = vec.normalize().multiplyScalar(this._radius - this._stickRadius);
        this._stick.x = v.x;
        this._stick.y = v.y;
      } else {
        this._stick.x = event.localX;
        this._stick.y = event.localY;
      }

      // 十字のどちらを向いているか判定
      var angle = vec.angle() * 180 / Math.PI;
      var direction = "";
      if (angle >= -45 && angle <= 45) {
        // 右
        direction = _PublicEventName2.default.PUSH_RIGHT;
      } else if (angle > 45 && angle < 135) {
        // 下
        direction = _PublicEventName2.default.PUSH_BOTTOM;
      } else if (angle < -45 && angle > -135) {
        // 上
        direction = _PublicEventName2.default.PUSH_TOP;
      } else {
        // 左
        direction = _PublicEventName2.default.PUSH_LEFT;
      }

      // 方向が変わったらイベントを発火させる
      if (this._currentDirection != direction) {
        this._currentDirection = direction;
      }
    }

    /**
     * マウスアップ時のハンドラーです。
     */

  }, {
    key: '_onMouseUp',
    value: function _onMouseUp() {
      this._stick.x = 0;
      this._stick.y = 0;
      this._currentDirection = null;
    }
  }]);

  return Pad;
}(createjs.Container);

exports.default = Pad;

},{"../event/PublicEventName":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * イベント名一覧
 */
var EventName = function () {
  function EventName() {
    _classCallCheck(this, EventName);
  }

  _createClass(EventName, null, [{
    key: 'CLICK',
    get: function get() {
      return 'click';
    }
  }]);

  return EventName;
}();

exports.default = EventName;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 外部で使用するイベント名一覧
 */
var PublicEventName = function () {
  function PublicEventName() {
    _classCallCheck(this, PublicEventName);
  }

  _createClass(PublicEventName, null, [{
    key: 'CLICK_A',
    get: function get() {
      return 'clickA';
    }
  }, {
    key: 'CLICK_B',
    get: function get() {
      return 'clickB';
    }
  }, {
    key: 'PUSH_TOP',
    get: function get() {
      return 'pushTop';
    }
  }, {
    key: 'PUSH_LEFT',
    get: function get() {
      return 'pushLeft';
    }
  }, {
    key: 'PUSH_RIGHT',
    get: function get() {
      return 'pushRight';
    }
  }, {
    key: 'PUSH_BOTTOM',
    get: function get() {
      return 'pushBottom';
    }
  }, {
    key: 'PULL_DOWN',
    get: function get() {
      return 'pull_down';
    }
  }, {
    key: 'RELEASE_PAD',
    get: function get() {
      return 'releasePad';
    }
  }]);

  return PublicEventName;
}();

exports.default = PublicEventName;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLmpzIiwic3JjL2NvbXBvbmVudC9CdXR0b24uanMiLCJzcmMvY29tcG9uZW50L1BhZC5qcyIsInNyYy9ldmVudC9FdmVudE5hbWUuanMiLCJzcmMvZXZlbnQvUHVibGljRXZlbnROYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sTTs7O0FBRUo7Ozs7O0FBS0Esa0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUdwQjtBQUhvQjs7QUFJcEIsVUFBSyxTQUFMLEdBQWlCLFFBQWpCO0FBQ0EsVUFBSyxPQUFMLEdBQWUsU0FBUyxjQUFULENBQXdCLE1BQUssU0FBN0IsQ0FBZjs7QUFFQTtBQUNBLFVBQUssTUFBTCxHQUFjLElBQUksU0FBUyxLQUFiLENBQW1CLE1BQUssU0FBeEIsQ0FBZDtBQUNBLGFBQVMsS0FBVCxDQUFlLE1BQWYsQ0FBc0IsTUFBSyxNQUEzQjs7QUFFQTtBQUNBLFVBQUssWUFBTCxHQUFvQixJQUFJLFNBQVMsU0FBYixFQUFwQjtBQUNBLFVBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsTUFBSyxZQUExQjs7QUFFQTtBQUNBLFVBQUssYUFBTCxHQUFxQixJQUFJLFNBQVMsU0FBYixFQUFyQjtBQUNBLFVBQUssYUFBTCxDQUFtQixJQUFuQixHQUEwQixHQUExQjtBQUNBLFVBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsTUFBSyxhQUExQjs7QUFFQTtBQUNBLFFBQUksTUFBTSxtQkFBVjtBQUNBLFFBQUksQ0FBSixHQUFRLEVBQVI7QUFDQSxRQUFJLENBQUosR0FBUSxFQUFSO0FBQ0EsVUFBSyxZQUFMLENBQWtCLFFBQWxCLENBQTJCLEdBQTNCOztBQUVBO0FBQ0EsUUFBSSxVQUFVLHFCQUFXLDBCQUFnQixPQUEzQixDQUFkO0FBQ0EsWUFBUSxD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dXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9jb21wb25lbnQvQnV0dG9uJztcbmltcG9ydCBQYWQgZnJvbSAnLi9jb21wb25lbnQvUGFkJztcbmltcG9ydCBFdmVudE5hbWUgZnJvbSAnLi9ldmVudC9FdmVudE5hbWUnO1xuaW1wb3J0IFB1YmxpY0V2ZW50TmFtZSBmcm9tICcuL2V2ZW50L1B1YmxpY0V2ZW50TmFtZSc7XG5cbi8qKlxuICogWmVucGFk44Gu44Oh44Kk44Oz44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmNsYXNzIFplbnBhZCBleHRlbmRzIGNyZWF0ZWpzLkV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRwbUlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXNJZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDjgrnjg4bjg7zjgrjjgpLkvZzmiJBcbiAgICB0aGlzLl9jYW52YXNJZCA9IGNhbnZhc0lkO1xuICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX2NhbnZhc0lkKTtcblxuICAgIC8vIOOCueODhuODvOOCuFxuICAgIHRoaXMuX3N0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKHRoaXMuX2NhbnZhc0lkKTtcbiAgICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUodGhpcy5fc3RhZ2UpO1xuXG4gICAgLy8g5bem5YG044Kw44Or44O844OXXG4gICAgdGhpcy5fbGVmdEJ1dHRvbnMgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKCk7XG4gICAgdGhpcy5fc3RhZ2UuYWRkQ2hpbGQodGhpcy5fbGVmdEJ1dHRvbnMpO1xuXG4gICAgLy8g5Y+z5YG044Kw44Or44O844OXXG4gICAgdGhpcy5fcmlnaHRCdXR0b25zID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5yZWdYID0gMTkwO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX3JpZ2h0QnV0dG9ucyk7XG5cbiAgICAvLyDjgqLjg4rjg63jgrDjg5Hjg4Pjg4lcbiAgICBsZXQgcGFkID0gbmV3IFBhZCgpO1xuICAgIHBhZC54ID0gODA7XG4gICAgcGFkLnkgPSA5MDtcbiAgICB0aGlzLl9sZWZ0QnV0dG9ucy5hZGRDaGlsZChwYWQpO1xuXG4gICAgLy8gQeODnOOCv+ODs1xuICAgIGxldCBhQnV0dG9uID0gbmV3IEJ1dHRvbihQdWJsaWNFdmVudE5hbWUuQ0xJQ0tfQSk7XG4gICAgYUJ1dHRvbi54ID0gMTUwO1xuICAgIGFCdXR0b24ueSA9IDgwO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5hZGRDaGlsZChhQnV0dG9uKTtcblxuICAgIC8vIELjg5zjgr/jg7NcbiAgICBsZXQgYkJ1dHRvbiA9IG5ldyBCdXR0b24oUHVibGljRXZlbnROYW1lLkNMSUNLX0IpO1xuICAgIGJCdXR0b24ueCA9IDgwO1xuICAgIGJCdXR0b24ueSA9IDExMDtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMuYWRkQ2hpbGQoYkJ1dHRvbik7XG5cbiAgICAvLyDjg5Xjg6zjg7zjg6Dmr47jga7mm7TmlrBcbiAgICB0aGlzLl90aWNrID0gdGhpcy5fdGljay5iaW5kKHRoaXMpO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLl90aWNrKTtcblxuICAgIC8vIOODquOCteOCpOOCulxuICAgIHRoaXMuX3Jlc2l6ZSA9IHRoaXMuX3Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3Jlc2l6ZSk7XG5cbiAgICAvLyDliJ3lm57jg6rjgrXjgqTjgrrlh6bnkIZcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmr47jg5Xjg6zjg7zjg6Dmr47jga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICovXG4gIF90aWNrKCkge1xuICAgIHRoaXMuX3N0YWdlLnVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODquOCteOCpOOCulxuICAgKi9cbiAgX3Jlc2l6ZSgpIHtcbiAgICAvLyBjYW52YXPjgrXjgqTjgrrjgpLlkIjjgo/jgZvjgotcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50V2lkdGgpKTtcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBTdHJpbmcodGhpcy5fY2FudmFzLmNsaWVudEhlaWdodCkpO1xuXG4gICAgLy8g5Y+z5YG044Kw44Or44O844OX44KS5Y+z6ZqF44GrXG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLnggPSB0aGlzLl9jYW52YXMuY2xpZW50V2lkdGg7XG4gIH1cbn1cblxud2luZG93LlplbnBhZCA9IFplbnBhZDtcbiIsImltcG9ydCBFdmVudE5hbWUgZnJvbSAnLi4vZXZlbnQvRXZlbnROYW1lJztcblxuLyoqXG4gKiDjg5zjgr/jg7Pjgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoZXZlbnROYW1lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOW5hVxuICAgIHRoaXMuX3dpZHRoID0gNTU7XG5cbiAgICAvLyDjgqTjg5njg7Pjg4jlkI1cbiAgICB0aGlzLl9ldmVudE5hbWUgPSBldmVudE5hbWU7XG5cbiAgICB0aGlzLl9vbkNsaWNrID0gdGhpcy5fb25DbGljay5iaW5kKHRoaXMpO1xuXG4gICAgLy8g44K344Kn44Kk44OXXG4gICAgdGhpcy5fc2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoJyM4YzM1NjgnKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuX3dpZHRoIC8gMik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fc2hhcGUpO1xuICAgIHRoaXMuX3NoYXBlLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnROYW1lLkNMSUNLLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg5zjgr/jg7PmirzkuIvmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIF9vbkNsaWNrKGV2ZW50KSB7XG4gIH1cbn1cbiIsImltcG9ydCBQdWJsaWNFdmVudE5hbWUgZnJvbSAnLi4vZXZlbnQvUHVibGljRXZlbnROYW1lJztcblxuLyoqXG4gKiDjgqLjg4rjg63jgrDjg5Hjg4Pjg4njgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFkIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOWNiuW+hFxuICAgIHRoaXMuX3JhZGl1cyA9IDYwO1xuICAgIC8vIOOCueODhuOCo+OCr+OBruWNiuW+hFxuICAgIHRoaXMuX3N0aWNrUmFkaXVzID0gMzA7XG5cbiAgICB0aGlzLl9vblRvdWNoTW92ZSA9IHRoaXMuX29uVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Nb3VzZVVwID0gdGhpcy5fb25Nb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICAvLyDog4zmma9cbiAgICBsZXQgYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICBiZy5ncmFwaGljcy5iZWdpbkZpbGwoJyNhYmFmYjgnKTtcbiAgICBiZy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyk7XG4gICAgYmcuZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuYWRkQ2hpbGQoYmcpO1xuXG4gICAgLy8g44K544OG44Kj44OD44KvXG4gICAgdGhpcy5fc3RpY2sgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLl9zdGljay5ncmFwaGljcy5iZWdpbkZpbGwoJyMzMzMzMzMnKTtcbiAgICB0aGlzLl9zdGljay5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuX3N0aWNrUmFkaXVzKTtcbiAgICB0aGlzLl9zdGljay5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9zdGljayk7XG5cbiAgICAvLyDjgr/jg4Pjg4HjgqTjg5njg7Pjg4hcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3ByZXNzbW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3ByZXNzdXAnLCB0aGlzLl9vbk1vdXNlVXApO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCv+ODg+ODgeODoOODvOODluaZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgX29uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgbGV0IHggPSBldmVudC5sb2NhbFgsXG4gICAgICAgIHkgPSBldmVudC5sb2NhbFk7XG4gICAgbGV0IHZlYyA9IG5ldyBWaWN0b3IoeCwgeSk7XG5cbiAgICAvLyDmnqDlpJbjgavlh7rjgabjgYTjgozjgbDmnqDlhoXjgavlj47jgoHjgotcbiAgICBpZih2ZWMubGVuZ3RoKCkgPiB0aGlzLl9yYWRpdXMgLSB0aGlzLl9zdGlja1JhZGl1cykge1xuICAgICAgbGV0IHYgPSB2ZWMubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodGhpcy5fcmFkaXVzIC0gdGhpcy5fc3RpY2tSYWRpdXMpO1xuICAgICAgdGhpcy5fc3RpY2sueCA9IHYueDtcbiAgICAgIHRoaXMuX3N0aWNrLnkgPSB2Lnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0aWNrLnggPSBldmVudC5sb2NhbFg7XG4gICAgICB0aGlzLl9zdGljay55ID0gZXZlbnQubG9jYWxZO1xuICAgIH1cblxuICAgIC8vIOWNgeWtl+OBruOBqeOBoeOCieOCkuWQkeOBhOOBpuOBhOOCi+OBi+WIpOWumlxuICAgIGxldCBhbmdsZSA9IHZlYy5hbmdsZSgpICogMTgwIC8gTWF0aC5QSTtcbiAgICBsZXQgZGlyZWN0aW9uID0gXCJcIjtcbiAgICBpZihhbmdsZSA+PSAtNDUgJiYgYW5nbGUgPD0gNDUpIHtcbiAgICAgIC8vIOWPs1xuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfUklHSFQ7XG4gICAgfSBlbHNlIGlmKGFuZ2xlID4gNDUgJiYgYW5nbGUgPCAxMzUpIHtcbiAgICAgIC8vIOS4i1xuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfQk9UVE9NO1xuICAgIH0gZWxzZSBpZihhbmdsZSA8IC00NSAmJiBhbmdsZSA+IC0xMzUpIHtcbiAgICAgIC8vIOS4ilxuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfVE9QO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlt6ZcbiAgICAgIGRpcmVjdGlvbiA9IFB1YmxpY0V2ZW50TmFtZS5QVVNIX0xFRlQ7XG4gICAgfVxuXG4gICAgLy8g5pa55ZCR44GM5aSJ44KP44Gj44Gf44KJ44Kk44OZ44Oz44OI44KS55m654Gr44GV44Gb44KLXG4gICAgaWYodGhpcy5fY3VycmVudERpcmVjdGlvbiAhPSBkaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMuX2N1cnJlbnREaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODnuOCpuOCueOCouODg+ODl+aZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgX29uTW91c2VVcCgpIHtcbiAgICB0aGlzLl9zdGljay54ID0gMDtcbiAgICB0aGlzLl9zdGljay55ID0gMDtcbiAgICB0aGlzLl9jdXJyZW50RGlyZWN0aW9uID0gbnVsbDtcbiAgfVxufVxuIiwiLyoqXG4gKiDjgqTjg5njg7Pjg4jlkI3kuIDopqdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnROYW1lIHtcbiAgc3RhdGljIGdldCBDTElDSygpIHsgcmV0dXJuICdjbGljayc7IH07XG59XG4iLCIvKipcbiAqIOWklumDqOOBp+S9v+eUqOOBmeOCi+OCpOODmeODs+ODiOWQjeS4gOimp1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaWNFdmVudE5hbWUge1xuICBzdGF0aWMgZ2V0IENMSUNLX0EoKSAgICAgIHsgcmV0dXJuICdjbGlja0EnOyB9O1xuICBzdGF0aWMgZ2V0IENMSUNLX0IoKSAgICAgIHsgcmV0dXJuICdjbGlja0InOyB9O1xuICBzdGF0aWMgZ2V0IFBVU0hfVE9QKCkgICAgIHsgcmV0dXJuICdwdXNoVG9wJzsgfTtcbiAgc3RhdGljIGdldCBQVVNIX0xFRlQoKSAgICB7IHJldHVybiAncHVzaExlZnQnOyB9O1xuICBzdGF0aWMgZ2V0IFBVU0hfUklHSFQoKSAgIHsgcmV0dXJuICdwdXNoUmlnaHQnOyB9O1xuICBzdGF0aWMgZ2V0IFBVU0hfQk9UVE9NKCkgIHsgcmV0dXJuICdwdXNoQm90dG9tJzsgfTtcbiAgc3RhdGljIGdldCBQVUxMX0RPV04oKSAgICB7IHJldHVybiAncHVsbF9kb3duJzsgfTtcbiAgc3RhdGljIGdldCBSRUxFQVNFX1BBRCgpICB7IHJldHVybiAncmVsZWFzZVBhZCc7IH07XG59XG4iXX0=
