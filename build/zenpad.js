(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button_1 = require('./botton/Button');
var Pad_1 = require('./pad/Pad');
var EventManager_1 = require('./event/EventManager');
var EventName_1 = require('./event/EventName');
var PublicEventName_1 = require('./event/PublicEventName');
var Zenpad = (function (_super) {
    __extends(Zenpad, _super);
    function Zenpad(canvasId) {
        _super.call(this);
        this._canvasId = canvasId;
        this._canvas = document.getElementById(this._canvasId);
        this._stage = new createjs.Stage(this._canvasId);
        createjs.Touch.enable(this._stage);
        this._eventManager = EventManager_1["default"].getInstance();
        this._onCatchEvent = this._onCatchEvent.bind(this);
        this._eventManager.addEventListener(EventName_1["default"].CHATCH_EVENT, this._onCatchEvent);
        this._leftButtons = new createjs.Container();
        this._stage.addChild(this._leftButtons);
        this._rightButtons = new createjs.Container();
        this._rightButtons.regX = 190;
        this._stage.addChild(this._rightButtons);
        var pad = new Pad_1["default"]();
        pad.x = 80;
        pad.y = 90;
        this._leftButtons.addChild(pad);
        var aButton = new Button_1["default"](PublicEventName_1["default"].CLICK_A);
        aButton.x = 150;
        aButton.y = 80;
        this._rightButtons.addChild(aButton);
        var bButton = new Button_1["default"](PublicEventName_1["default"].CLICK_B);
        bButton.x = 80;
        bButton.y = 110;
        this._rightButtons.addChild(bButton);
        this._tick = this._tick.bind(this);
        createjs.Ticker.addEventListener("tick", this._tick);
        this._resize = this._resize.bind(this);
        window.addEventListener("resize", this._resize);
        this._resize();
    }
    Zenpad.prototype._tick = function () {
        this._stage.update();
    };
    Zenpad.prototype._resize = function () {
        this._canvas.setAttribute('width', String(this._canvas.clientWidth));
        this._canvas.setAttribute('height', String(this._canvas.clientHeight));
        this._rightButtons.x = this._canvas.clientWidth;
    };
    Zenpad.prototype._onCatchEvent = function (event) {
        console.info(event.getEventName());
    };
    return Zenpad;
}(createjs.EventDispatcher));
window.Zenpad = Zenpad;

},{"./botton/Button":2,"./event/EventManager":4,"./event/EventName":5,"./event/PublicEventName":6,"./pad/Pad":7}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventName_1 = require('../event/EventName');
var EventManager_1 = require('../event/EventManager');
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(eventName) {
        _super.call(this);
        this._width = 55;
        this._eventName = eventName;
        this._eventManager = EventManager_1["default"].getInstance();
        this._shape = new createjs.Shape();
        this._shape.graphics.beginFill('#8c3568');
        this._shape.graphics.drawCircle(0, 0, this._width / 2);
        this._shape.graphics.endFill();
        this.addChild(this._shape);
        this._onClick = this._onClick.bind(this);
        this._shape.addEventListener(EventName_1["default"].CLICK, this._onClick);
    }
    Button.prototype._onClick = function (event) {
        this._eventManager.dispatch(this._eventName);
    };
    return Button;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Button;

},{"../event/EventManager":4,"../event/EventName":5}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventCatchEvent = (function (_super) {
    __extends(EventCatchEvent, _super);
    function EventCatchEvent(type, eventName, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = true; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._eventName = eventName;
    }
    EventCatchEvent.prototype.getEventName = function () {
        return this._eventName;
    };
    return EventCatchEvent;
}(createjs.Event));
exports.__esModule = true;
exports["default"] = EventCatchEvent;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventCatchEvent_1 = require('./EventCatchEvent');
var EventName_1 = require('./EventName');
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        _super.call(this);
        EventManager._instance = this;
    }
    EventManager.getInstance = function () {
        return EventManager._instance || new EventManager();
    };
    EventManager.prototype.dispatch = function (eventName) {
        this.dispatchEvent(new EventCatchEvent_1["default"](EventName_1["default"].CHATCH_EVENT, eventName));
    };
    return EventManager;
}(createjs.EventDispatcher));
exports.__esModule = true;
exports["default"] = EventManager;

},{"./EventCatchEvent":3,"./EventName":5}],5:[function(require,module,exports){
"use strict";
var EventName = (function () {
    function EventName() {
    }
    EventName.CLICK = 'click';
    EventName.CHATCH_EVENT = 'change_event';
    return EventName;
}());
exports.__esModule = true;
exports["default"] = EventName;

},{}],6:[function(require,module,exports){
"use strict";
var PublicEventName = (function () {
    function PublicEventName() {
    }
    PublicEventName.CLICK_A = 'clickA';
    PublicEventName.CLICK_B = 'clickB';
    PublicEventName.PUSH_TOP = 'pushTop';
    PublicEventName.PUSH_LEFT = 'pushLeft';
    PublicEventName.PUSH_RIGHT = 'pushRight';
    PublicEventName.PUSH_BOTTOM = 'pushBottom';
    PublicEventName.RELEASE_PAD = 'releasePad';
    return PublicEventName;
}());
exports.__esModule = true;
exports["default"] = PublicEventName;

},{}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventManager_1 = require('../event/EventManager');
var PublicEventName_1 = require('../event/PublicEventName');
var Pad = (function (_super) {
    __extends(Pad, _super);
    function Pad() {
        var _this = this;
        _super.call(this);
        this._radius = 60;
        this._stickRadius = 30;
        this._eventManager = EventManager_1["default"].getInstance();
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#abafb8');
        bg.graphics.drawCircle(0, 0, this._radius);
        bg.graphics.endFill();
        this.addChild(bg);
        this._stick = new createjs.Shape();
        this._stick.graphics.beginFill('#333333');
        this._stick.graphics.drawCircle(0, 0, this._stickRadius);
        this._stick.graphics.endFill();
        this.addChild(this._stick);
        this.addEventListener('pressmove', function (event) { return _this._onTouchMove(event); });
        this.addEventListener('pressup', function () { return _this._onMouseUp(); });
    }
    Pad.prototype._onTouchMove = function (event) {
        var x = event.localX, y = event.localY;
        var vec = new Victor(x, y);
        if (vec.length() > this._radius - this._stickRadius) {
            var v = vec.normalize().multiplyScalar(this._radius - this._stickRadius);
            this._stick.x = v.x;
            this._stick.y = v.y;
        }
        else {
            this._stick.x = event.localX;
            this._stick.y = event.localY;
        }
        var angle = vec.angle() * 180 / Math.PI;
        var direction;
        if (angle >= -45 && angle <= 45) {
            direction = PublicEventName_1["default"].PUSH_RIGHT;
        }
        else if (angle > 45 && angle < 135) {
            direction = PublicEventName_1["default"].PUSH_BOTTOM;
        }
        else if (angle < -45 && angle > -135) {
            direction = PublicEventName_1["default"].PUSH_TOP;
        }
        else {
            direction = PublicEventName_1["default"].PUSH_LEFT;
        }
        if (this._currentDirection != direction) {
            this._currentDirection = direction;
            this._eventManager.dispatch(direction);
        }
    };
    Pad.prototype._onMouseUp = function () {
        this._stick.x = 0;
        this._stick.y = 0;
        this._currentDirection = null;
        this._eventManager.dispatch(PublicEventName_1["default"].RELEASE_PAD);
    };
    return Pad;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Pad;

},{"../event/EventManager":4,"../event/PublicEventName":6}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiLCJzcmMvZXZlbnQvRXZlbnRDYXRjaEV2ZW50LnRzIiwic3JjL2V2ZW50L0V2ZW50TWFuYWdlci50cyIsInNyYy9ldmVudC9FdmVudE5hbWUudHMiLCJzcmMvZXZlbnQvUHVibGljRXZlbnROYW1lLnRzIiwic3JjL3BhZC9QYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSx1QkFBbUIsaUJBQWlCLENBQUMsQ0FBQTtBQUNyQyxvQkFBZ0IsV0FBVyxDQUFDLENBQUE7QUFDNUIsNkJBQXlCLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsMEJBQXNCLG1CQUFtQixDQUFDLENBQUE7QUFFMUMsZ0NBQTRCLHlCQUF5QixDQUFDLENBQUE7QUFLdEQ7SUFBcUIsMEJBQXdCO0lBcUIzQyxnQkFBWSxRQUFlO1FBQ3pCLGlCQUFPLENBQUM7UUFHUixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyx5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxz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QztRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyw0QkFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFSCxVQUFDO0FBQUQsQ0E1RkEsQUE0RkMsQ0E1RmdDLFFBQVEsQ0FBQyxTQUFTLEdBNEZsRDtBQTVGRDt3QkE0RkMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vYm90dG9uL0J1dHRvbic7XG5pbXBvcnQgUGFkIGZyb20gJy4vcGFkL1BhZCc7XG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gJy4vZXZlbnQvRXZlbnRNYW5hZ2VyJztcbmltcG9ydCBFdmVudE5hbWUgZnJvbSAnLi9ldmVudC9FdmVudE5hbWUnO1xuaW1wb3J0IEV2ZW50Q2F0Y2hFdmVudCBmcm9tICcuL2V2ZW50L0V2ZW50Q2F0Y2hFdmVudCc7XG5pbXBvcnQgUHVibGljRXZlbnROYW1lIGZyb20gJy4vZXZlbnQvUHVibGljRXZlbnROYW1lJztcblxuLyoqXG4gKiBaZW5wYWTjga7jg6HjgqTjg7Pjgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuY2xhc3MgWmVucGFkIGV4dGVuZHMgY3JlYXRlanMuRXZlbnREaXNwYXRjaGVyIHtcblxuICAvKiogY2FudmFz44GuaWQgKi9cbiAgcHJpdmF0ZSBfY2FudmFzSWQ6c3RyaW5nO1xuICAvKiogY2FudmFzICovXG4gIHByaXZhdGUgX2NhbnZhczpIVE1MRWxlbWVudDtcbiAgLyoqIHN0YWdlICovXG4gIHByaXZhdGUgX3N0YWdlOmNyZWF0ZWpzLlN0YWdlO1xuICAvKiog44Kk44OZ44Oz44OI44Oe44ON44O844K444Oj44O8ICovXG4gIHByaXZhdGUgX2V2ZW50TWFuYWdlcjpFdmVudE1hbmFnZXI7XG5cbiAgLyoqIOW3puWBtOOCsOODq+ODvOODlyAqL1xuICBwcml2YXRlIF9sZWZ0QnV0dG9uczpjcmVhdGVqcy5Db250YWluZXI7XG4gIC8qKiDlj7PlgbTjgrDjg6vjg7zjg5cgKi9cbiAgcHJpdmF0ZSBfcmlnaHRCdXR0b25zOmNyZWF0ZWpzLkNvbnRhaW5lcjtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZHBtSWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNhbnZhc0lkOnN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDjgrnjg4bjg7zjgrjjgpLkvZzmiJBcbiAgICB0aGlzLl9jYW52YXNJZCA9IGNhbnZhc0lkO1xuICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX2NhbnZhc0lkKTtcblxuICAgIC8vIOOCueODhuODvOOCuFxuICAgIHRoaXMuX3N0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKHRoaXMuX2NhbnZhc0lkKTtcbiAgICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUodGhpcy5fc3RhZ2UpO1xuXG4gICAgLy8g44Kk44OZ44Oz44OI44Oe44ON44O844K444Oj44O8XG4gICAgdGhpcy5fZXZlbnRNYW5hZ2VyID0gRXZlbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgdGhpcy5fb25DYXRjaEV2ZW50ID0gdGhpcy5fb25DYXRjaEV2ZW50LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnROYW1lLkNIQVRDSF9FVkVOVCwgdGhpcy5fb25DYXRjaEV2ZW50KTtcblxuICAgIC8vIOW3puWBtOOCsOODq+ODvOODl1xuICAgIHRoaXMuX2xlZnRCdXR0b25zID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX2xlZnRCdXR0b25zKTtcblxuICAgIC8vIOWPs+WBtOOCsOODq+ODvOODl1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucyA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMucmVnWCA9IDE5MDtcbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLl9yaWdodEJ1dHRvbnMpO1xuXG4gICAgLy8g44Ki44OK44Ot44Kw44OR44OD44OJXG4gICAgbGV0IHBhZCA9IG5ldyBQYWQoKTtcbiAgICBwYWQueCA9IDgwO1xuICAgIHBhZC55ID0gOTA7XG4gICAgdGhpcy5fbGVmdEJ1dHRvbnMuYWRkQ2hpbGQocGFkKTtcblxuICAgIC8vIEHjg5zjgr/jg7NcbiAgICBsZXQgYUJ1dHRvbiA9IG5ldyBCdXR0b24oUHVibGljRXZlbnROYW1lLkNMSUNLX0EpO1xuICAgIGFCdXR0b24ueCA9IDE1MDtcbiAgICBhQnV0dG9uLnkgPSA4MDtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMuYWRkQ2hpbGQoYUJ1dHRvbik7XG5cbiAgICAvLyBC44Oc44K/44OzXG4gICAgbGV0IGJCdXR0b24gPSBuZXcgQnV0dG9uKFB1YmxpY0V2ZW50TmFtZS5DTElDS19CKTtcbiAgICBiQnV0dG9uLnggPSA4MDtcbiAgICBiQnV0dG9uLnkgPSAxMTA7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLmFkZENoaWxkKGJCdXR0b24pO1xuXG4gICAgLy8g44Ki44OL44Oh44O844K344On44OzXG4gICAgdGhpcy5fdGljayA9IHRoaXMuX3RpY2suYmluZCh0aGlzKTtcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5fdGljayk7XG5cbiAgICAvLyDjg6rjgrXjgqTjgrpcbiAgICB0aGlzLl9yZXNpemUgPSB0aGlzLl9yZXNpemUuYmluZCh0aGlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9yZXNpemUpO1xuXG4gICAgLy8g5Yid5Zue44Oq44K144Kk44K65Yem55CGXG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICAvKipcbiAgICog5q+O44OV44Os44O844Og5q+O44Gu44Ki44OL44Oh44O844K344On44OzXG4gICAqL1xuICBwcml2YXRlIF90aWNrKCk6dm9pZCB7XG4gICAgdGhpcy5fc3RhZ2UudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oq44K144Kk44K6XG4gICAqL1xuICBwcml2YXRlIF9yZXNpemUoKTp2b2lkIHtcbiAgICAvLyBjYW52YXPjgrXjgqTjgrrjgpLlkIjjgo/jgZvjgotcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50V2lkdGgpKTtcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBTdHJpbmcodGhpcy5fY2FudmFzLmNsaWVudEhlaWdodCkpO1xuXG4gICAgLy8g5Y+z5YG044Kw44Or44O844OX44KS5Y+z6ZqF44GrXG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLnggPSB0aGlzLl9jYW52YXMuY2xpZW50V2lkdGg7XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI44Kt44Oj44OD44OB5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vbkNhdGNoRXZlbnQoZXZlbnQ6RXZlbnRDYXRjaEV2ZW50KTp2b2lkIHtcbiAgICBjb25zb2xlLmluZm8oZXZlbnQuZ2V0RXZlbnROYW1lKCkpO1xuICB9XG5cbn1cblxuKDxhbnk+d2luZG93KS5aZW5wYWQgPSBaZW5wYWQ7XG4iLCJpbXBvcnQgRXZlbnROYW1lIGZyb20gJy4uL2V2ZW50L0V2ZW50TmFtZSc7XG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gJy4uL2V2ZW50L0V2ZW50TWFuYWdlcic7XG5cbi8qKlxuICog44Oc44K/44Oz44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG5cbiAgLyoqIOOCr+ODquODg+OCr+aZguOBruOCpOODmeODs+ODiOWQjSAqL1xuICBwcml2YXRlIF9ldmVudE5hbWU6c3RyaW5nO1xuXG4gIC8qKiDluYUgKi9cbiAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gNTU7XG4gIC8qKiDjgrfjgqfjgqTjg5cgKi9cbiAgcHJpdmF0ZSBfc2hhcGU6Y3JlYXRlanMuU2hhcGU7XG5cbiAgLyoqIOOCpOODmeODs+ODiOODnuODjeODvOOCuOODo+ODvCAqL1xuICBwcml2YXRlIF9ldmVudE1hbmFnZXI6RXZlbnRNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6c3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOOCpOODmeODs+ODiOWQjVxuICAgIHRoaXMuX2V2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAvLyDjgqTjg5njg7Pjg4jjg57jg43jg7zjgrjjg6Pjg7xcbiAgICB0aGlzLl9ldmVudE1hbmFnZXIgPSBFdmVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIOOCt+OCp+OCpOODl1xuICAgIHRoaXMuX3NoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKCcjOGMzNTY4Jyk7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLl93aWR0aCAvIDIpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuX3NoYXBlKTtcbiAgICB0aGlzLl9vbkNsaWNrID0gdGhpcy5fb25DbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX3NoYXBlLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnROYW1lLkNMSUNLLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg5zjgr/jg7PmirzkuIvmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIHByaXZhdGUgX29uQ2xpY2soZXZlbnQ6Y3JlYXRlanMuTW91c2VFdmVudCk6dm9pZCB7XG4gICAgdGhpcy5fZXZlbnRNYW5hZ2VyLmRpc3BhdGNoKHRoaXMuX2V2ZW50TmFtZSk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiDjgqTjg5njg7Pjg4jjgpLjgq3jg6Pjg4Pjg4HjgZfjgZ/pmpvjga7jgqTjg5njg7Pjg4jjgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDYXRjaEV2ZW50IGV4dGVuZHMgY3JlYXRlanMuRXZlbnQge1xuXG4gIC8vIOeZuueBq+OBleOBm+OCi+OCpOODmeODs+ODiOWQjVxuICBwcml2YXRlIF9ldmVudE5hbWU6c3RyaW5nO1xuICBwdWJsaWMgZ2V0RXZlbnROYW1lKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnROYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBldmVudE5hbWU6c3RyaW5nLCBidWJibGVzOmJvb2xlYW4gPSB0cnVlLCBjYW5jZWxhYmxlOmJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpO1xuXG4gICAgdGhpcy5fZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICB9XG5cbn1cbiIsImltcG9ydCBFdmVudENhdGNoRXZlbnQgZnJvbSAnLi9FdmVudENhdGNoRXZlbnQnO1xuaW1wb3J0IEV2ZW50TmFtZSBmcm9tICcuL0V2ZW50TmFtZSc7XG5cbi8qKlxuICog44Kk44OZ44Oz44OI566h55CG44Kv44Op44K5XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50TWFuYWdlciBleHRlbmRzIGNyZWF0ZWpzLkV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgLyoqIOOCpOODs+OCueOCv+ODs+OCuSAqL1xuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6RXZlbnRNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgICogQHJldHVybiB7RXZlbnRNYW5hZ2VyfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkV2ZW50TWFuYWdlciB7XG4gICAgcmV0dXJuIEV2ZW50TWFuYWdlci5faW5zdGFuY2UgfHwgbmV3IEV2ZW50TWFuYWdlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgRXZlbnRNYW5hZ2VyLl9pbnN0YW5jZSA9IHRoaXM7XG4gIH1cblxuICAvKipcbiAgICog55m654Gr44GV44Gb44G+44GZ44CCXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICovXG4gIHB1YmxpYyBkaXNwYXRjaChldmVudE5hbWU6c3RyaW5nKTp2b2lkIHtcbiAgICAvLyDjgqTjg5njg7Pjg4jjgq3jg6Pjg4Pjg4HjgqTjg5njg7Pjg4jnmbrngatcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50Q2F0Y2hFdmVudChFdmVudE5hbWUuQ0hBVENIX0VWRU5ULCBldmVudE5hbWUpKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIOOCpOODmeODs+ODiOWQjeS4gOimp1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudE5hbWUge1xuXG4gIHB1YmxpYyBzdGF0aWMgQ0xJQ0s6c3RyaW5nICAgICAgICA9ICdjbGljayc7XG4gIHB1YmxpYyBzdGF0aWMgQ0hBVENIX0VWRU5UOnN0cmluZyA9ICdjaGFuZ2VfZXZlbnQnO1xuXG59XG4iLCIvKipcbiAqIOWklumDqOOBp+S9v+eUqOOBmeOCi+OCpOODmeODs+ODiOWQjeS4gOimp1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaWNFdmVudE5hbWUge1xuXG4gIHB1YmxpYyBzdGF0aWMgQ0xJQ0tfQTpzdHJpbmcgICAgICA9ICdjbGlja0EnO1xuICBwdWJsaWMgc3RhdGljIENMSUNLX0I6c3RyaW5nICAgICAgPSAnY2xpY2tCJztcbiAgcHVibGljIHN0YXRpYyBQVVNIX1RPUDpzdHJpbmcgICAgID0gJ3B1c2hUb3AnO1xuICBwdWJsaWMgc3RhdGljIFBVU0hfTEVGVDpzdHJpbmcgICAgPSAncHVzaExlZnQnO1xuICBwdWJsaWMgc3RhdGljIFBVU0hfUklHSFQ6c3RyaW5nICAgPSAncHVzaFJpZ2h0JztcbiAgcHVibGljIHN0YXRpYyBQVVNIX0JPVFRPTTpzdHJpbmcgID0gJ3B1c2hCb3R0b20nO1xuICBwdWJsaWMgc3RhdGljIFJFTEVBU0VfUEFEOnN0cmluZyAgPSAncmVsZWFzZVBhZCc7XG5cbn1cbiIsImltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSAnLi4vZXZlbnQvRXZlbnRNYW5hZ2VyJztcbmltcG9ydCBQdWJsaWNFdmVudE5hbWUgZnJvbSAnLi4vZXZlbnQvUHVibGljRXZlbnROYW1lJztcblxuLyoqXG4gKiDjgqLjg4rjg63jgrDjg5Hjg4Pjg4njgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFkIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcblxuICAvKiog5Y2K5b6EICovXG4gIHByaXZhdGUgX3JhZGl1czpudW1iZXIgPSA2MDtcbiAgLyoqIOOCueODhuOCo+OCr+OBruWNiuW+hCAqL1xuICBwcml2YXRlIF9zdGlja1JhZGl1czpudW1iZXIgPSAzMDtcblxuICAvKiog44K544OG44Kj44OD44KvICovXG4gIHByaXZhdGUgX3N0aWNrOmNyZWF0ZWpzLlNoYXBlO1xuICAvKiog54++5Zyo5YCS44GX44Gm44GE44KL5pa55ZCRICovXG4gIHByaXZhdGUgX2N1cnJlbnREaXJlY3Rpb246c3RyaW5nO1xuXG4gIC8qKiDjgqTjg5njg7Pjg4jjg57jg43jg7zjgrjjg6Pjg7wgKi9cbiAgcHJpdmF0ZSBfZXZlbnRNYW5hZ2VyOkV2ZW50TWFuYWdlcjtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOOCpOODmeODs+ODiOeZuueBq1xuICAgIHRoaXMuX2V2ZW50TWFuYWdlciA9IEV2ZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8g6IOM5pmvXG4gICAgbGV0IGJnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKCcjYWJhZmI4Jyk7XG4gICAgYmcuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLl9yYWRpdXMpO1xuICAgIGJnLmdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLmFkZENoaWxkKGJnKTtcblxuICAgIC8vIOOCueODhuOCo+ODg+OCr1xuICAgIHRoaXMuX3N0aWNrID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5fc3RpY2suZ3JhcGhpY3MuYmVnaW5GaWxsKCcjMzMzMzMzJyk7XG4gICAgdGhpcy5fc3RpY2suZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLl9zdGlja1JhZGl1cyk7XG4gICAgdGhpcy5fc3RpY2suZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fc3RpY2spO1xuXG4gICAgLy8g44K/44OD44OB44Kk44OZ44Oz44OIXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdwcmVzc21vdmUnLCAoZXZlbnQ6Y3JlYXRlanMuTW91c2VFdmVudCkgPT4gdGhpcy5fb25Ub3VjaE1vdmUoZXZlbnQpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3ByZXNzdXAnLCAoKSA9PiB0aGlzLl9vbk1vdXNlVXAoKSk7XG4gIH1cblxuICAvKipcbiAgICog44K/44OD44OB44Og44O844OW5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vblRvdWNoTW92ZShldmVudDpjcmVhdGVqcy5Nb3VzZUV2ZW50KSB7XG4gICAgbGV0IHggPSBldmVudC5sb2NhbFgsXG4gICAgICAgIHkgPSBldmVudC5sb2NhbFk7XG4gICAgbGV0IHZlYyA9IG5ldyBWaWN0b3IoeCwgeSk7XG5cbiAgICAvLyDmnqDlpJbjgavlh7rjgabjgYTjgozjgbDmnqDlhoXjgavlj47jgoHjgotcbiAgICBpZih2ZWMubGVuZ3RoKCkgPiB0aGlzLl9yYWRpdXMgLSB0aGlzLl9zdGlja1JhZGl1cykge1xuICAgICAgbGV0IHYgPSB2ZWMubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodGhpcy5fcmFkaXVzIC0gdGhpcy5fc3RpY2tSYWRpdXMpO1xuICAgICAgdGhpcy5fc3RpY2sueCA9IHYueDtcbiAgICAgIHRoaXMuX3N0aWNrLnkgPSB2Lnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0aWNrLnggPSBldmVudC5sb2NhbFg7XG4gICAgICB0aGlzLl9zdGljay55ID0gZXZlbnQubG9jYWxZO1xuICAgIH1cblxuICAgIC8vIOWNgeWtl+OBruOBqeOBoeOCieOCkuWQkeOBhOOBpuOBhOOCi+OBi+WIpOWumlxuICAgIGxldCBhbmdsZSA9IHZlYy5hbmdsZSgpICogMTgwIC8gTWF0aC5QSTtcbiAgICBsZXQgZGlyZWN0aW9uOnN0cmluZztcbiAgICBpZihhbmdsZSA+PSAtNDUgJiYgYW5nbGUgPD0gNDUpIHtcbiAgICAgIGRpcmVjdGlvbiA9IFB1YmxpY0V2ZW50TmFtZS5QVVNIX1JJR0hUO1xuICAgIH0gZWxzZSBpZihhbmdsZSA+IDQ1ICYmIGFuZ2xlIDwgMTM1KSB7XG4gICAgICBkaXJlY3Rpb24gPSBQdWJsaWNFdmVudE5hbWUuUFVTSF9CT1RUT007XG4gICAgfSBlbHNlIGlmKGFuZ2xlIDwgLTQ1ICYmIGFuZ2xlID4gLTEzNSkge1xuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfVE9QO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb24gPSBQdWJsaWNFdmVudE5hbWUuUFVTSF9MRUZUO1xuICAgIH1cblxuICAgIC8vIOaWueWQkeOBjOWkieOCj+OBo+OBn+OCieOCpOODmeODs+ODiOOCkueZuueBq+OBleOBm+OCi1xuICAgIGlmKHRoaXMuX2N1cnJlbnREaXJlY3Rpb24gIT0gZGlyZWN0aW9uKSB7XG4gICAgICB0aGlzLl9jdXJyZW50RGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5fZXZlbnRNYW5hZ2VyLmRpc3BhdGNoKGRpcmVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODnuOCpuOCueOCouODg+ODl+aZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgcHJpdmF0ZSBfb25Nb3VzZVVwKCkge1xuICAgIHRoaXMuX3N0aWNrLnggPSAwO1xuICAgIHRoaXMuX3N0aWNrLnkgPSAwO1xuICAgIHRoaXMuX2N1cnJlbnREaXJlY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuX2V2ZW50TWFuYWdlci5kaXNwYXRjaChQdWJsaWNFdmVudE5hbWUuUkVMRUFTRV9QQUQpO1xuICB9XG5cbn1cbiJdfQ==
