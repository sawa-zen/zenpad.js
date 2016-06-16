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
        var aButton = new Button_1["default"]();
        aButton.x = 150;
        aButton.y = 80;
        this._rightButtons.addChild(aButton);
        var bButton = new Button_1["default"]();
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

},{"./botton/Button":2,"./event/EventManager":4,"./event/EventName":5,"./pad/Pad":7}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.call(this);
        this._width = 55;
        this._shape = new createjs.Shape();
        this._shape.graphics.beginFill("#8c3568");
        this._shape.graphics.drawCircle(0, 0, this._width / 2);
        this._shape.graphics.endFill();
        this.addChild(this._shape);
    }
    return Button;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Button;

},{}],3:[function(require,module,exports){
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
        this._eventManager.dispatch(PublicEventName_1["default"].RELEASE_PAD);
    };
    return Pad;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Pad;

},{"../event/EventManager":4,"../event/PublicEventName":6}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiLCJzcmMvZXZlbnQvRXZlbnRDYXRjaEV2ZW50LnRzIiwic3JjL2V2ZW50L0V2ZW50TWFuYWdlci50cyIsInNyYy9ldmVudC9FdmVudE5hbWUudHMiLCJzcmMvZXZlbnQvUHVibGljRXZlbnROYW1lLnRzIiwic3JjL3BhZC9QYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSx1QkFBbUIsaUJBQWlCLENBQUMsQ0FBQTtBQUNyQyxvQkFBZ0IsV0FBVyxDQUFDLENBQUE7QUFDNUIsNkJBQXlCLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsMEJBQXNCLG1CQUFtQixDQUFDLENBQUE7QUFNMUM7SUFBcUIsMEJBQXdCO0lBcUIzQyxnQkFBWSxRQUFlO1FBQ3pCLGlCQUFPLENBQUM7UUFHUixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyx5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMs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QVMsR0FBRyw0QkFBZSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxDQUFDO1FBR0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQztJQUtPLHdCQUFVLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyw0QkFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFSCxVQUFDO0FBQUQsQ0EzRkEsQUEyRkMsQ0EzRmdDLFFBQVEsQ0FBQyxTQUFTLEdBMkZsRDtBQTNGRDt3QkEyRkMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vYm90dG9uL0J1dHRvbic7XG5pbXBvcnQgUGFkIGZyb20gJy4vcGFkL1BhZCc7XG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gJy4vZXZlbnQvRXZlbnRNYW5hZ2VyJztcbmltcG9ydCBFdmVudE5hbWUgZnJvbSAnLi9ldmVudC9FdmVudE5hbWUnO1xuaW1wb3J0IEV2ZW50Q2F0Y2hFdmVudCBmcm9tICcuL2V2ZW50L0V2ZW50Q2F0Y2hFdmVudCc7XG5cbi8qKlxuICogWmVucGFk44Gu44Oh44Kk44Oz44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmNsYXNzIFplbnBhZCBleHRlbmRzIGNyZWF0ZWpzLkV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgLyoqIGNhbnZhc+OBrmlkICovXG4gIHByaXZhdGUgX2NhbnZhc0lkOnN0cmluZztcbiAgLyoqIGNhbnZhcyAqL1xuICBwcml2YXRlIF9jYW52YXM6SFRNTEVsZW1lbnQ7XG4gIC8qKiBzdGFnZSAqL1xuICBwcml2YXRlIF9zdGFnZTpjcmVhdGVqcy5TdGFnZTtcbiAgLyoqIOOCpOODmeODs+ODiOODnuODjeODvOOCuOODo+ODvCAqL1xuICBwcml2YXRlIF9ldmVudE1hbmFnZXI6RXZlbnRNYW5hZ2VyO1xuXG4gIC8qKiDlt6blgbTjgrDjg6vjg7zjg5cgKi9cbiAgcHJpdmF0ZSBfbGVmdEJ1dHRvbnM6Y3JlYXRlanMuQ29udGFpbmVyO1xuICAvKiog5Y+z5YG044Kw44Or44O844OXICovXG4gIHByaXZhdGUgX3JpZ2h0QnV0dG9uczpjcmVhdGVqcy5Db250YWluZXI7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRwbUlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXNJZDpzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8g44K544OG44O844K444KS5L2c5oiQXG4gICAgdGhpcy5fY2FudmFzSWQgPSBjYW52YXNJZDtcbiAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9jYW52YXNJZCk7XG5cbiAgICAvLyDjgrnjg4bjg7zjgrhcbiAgICB0aGlzLl9zdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSh0aGlzLl9jYW52YXNJZCk7XG4gICAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHRoaXMuX3N0YWdlKTtcblxuICAgIC8vIOOCpOODmeODs+ODiOODnuODjeODvOOCuOODo+ODvFxuICAgIHRoaXMuX2V2ZW50TWFuYWdlciA9IEV2ZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgIHRoaXMuX29uQ2F0Y2hFdmVudCA9IHRoaXMuX29uQ2F0Y2hFdmVudC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2V2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKEV2ZW50TmFtZS5DSEFUQ0hfRVZFTlQsIHRoaXMuX29uQ2F0Y2hFdmVudCk7XG5cbiAgICAvLyDlt6blgbTjgrDjg6vjg7zjg5dcbiAgICB0aGlzLl9sZWZ0QnV0dG9ucyA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLl9sZWZ0QnV0dG9ucyk7XG5cbiAgICAvLyDlj7PlgbTjgrDjg6vjg7zjg5dcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKCk7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLnJlZ1ggPSAxOTA7XG4gICAgdGhpcy5fc3RhZ2UuYWRkQ2hpbGQodGhpcy5fcmlnaHRCdXR0b25zKTtcblxuICAgIC8vIOOCouODiuODreOCsOODkeODg+ODiVxuICAgIGxldCBwYWQgPSBuZXcgUGFkKCk7XG4gICAgcGFkLnggPSA4MDtcbiAgICBwYWQueSA9IDkwO1xuICAgIHRoaXMuX2xlZnRCdXR0b25zLmFkZENoaWxkKHBhZCk7XG5cbiAgICAvLyBB44Oc44K/44OzXG4gICAgbGV0IGFCdXR0b24gPSBuZXcgQnV0dG9uKCk7XG4gICAgYUJ1dHRvbi54ID0gMTUwO1xuICAgIGFCdXR0b24ueSA9IDgwO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5hZGRDaGlsZChhQnV0dG9uKTtcblxuICAgIC8vIELjg5zjgr/jg7NcbiAgICBsZXQgYkJ1dHRvbiA9IG5ldyBCdXR0b24oKTtcbiAgICBiQnV0dG9uLnggPSA4MDtcbiAgICBiQnV0dG9uLnkgPSAxMTA7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLmFkZENoaWxkKGJCdXR0b24pO1xuXG4gICAgLy8g44Ki44OL44Oh44O844K344On44OzXG4gICAgdGhpcy5fdGljayA9IHRoaXMuX3RpY2suYmluZCh0aGlzKTtcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5fdGljayk7XG5cbiAgICAvLyDjg6rjgrXjgqTjgrpcbiAgICB0aGlzLl9yZXNpemUgPSB0aGlzLl9yZXNpemUuYmluZCh0aGlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9yZXNpemUpO1xuXG4gICAgLy8g5Yid5Zue44Oq44K144Kk44K65Yem55CGXG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICAvKipcbiAgICog5q+O44OV44Os44O844Og5q+O44Gu44Ki44OL44Oh44O844K344On44OzXG4gICAqL1xuICBwcml2YXRlIF90aWNrKCk6dm9pZCB7XG4gICAgdGhpcy5fc3RhZ2UudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oq44K144Kk44K6XG4gICAqL1xuICBwcml2YXRlIF9yZXNpemUoKTp2b2lkIHtcbiAgICAvLyBjYW52YXPjgrXjgqTjgrrjgpLlkIjjgo/jgZvjgotcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50V2lkdGgpKTtcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBTdHJpbmcodGhpcy5fY2FudmFzLmNsaWVudEhlaWdodCkpO1xuXG4gICAgLy8g5Y+z5YG044Kw44Or44O844OX44KS5Y+z6ZqF44GrXG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLnggPSB0aGlzLl9jYW52YXMuY2xpZW50V2lkdGg7XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI44Kt44Oj44OD44OB5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vbkNhdGNoRXZlbnQoZXZlbnQ6RXZlbnRDYXRjaEV2ZW50KTp2b2lkIHtcbiAgICBjb25zb2xlLmluZm8oZXZlbnQuZ2V0RXZlbnROYW1lKCkpO1xuICB9XG5cbn1cblxuKDxhbnk+d2luZG93KS5aZW5wYWQgPSBaZW5wYWQ7XG4iLCIvKipcbiAqIOODnOOCv+ODs+OCr+ODqeOCueOBp+OBmeOAglxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuXG4gIC8qKiDluYUgKi9cbiAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gNTU7XG4gIC8qKiDjgrfjgqfjgqTjg5cgKi9cbiAgcHJpdmF0ZSBfc2hhcGU6Y3JlYXRlanMuU2hhcGU7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDjgrfjgqfjgqTjg5dcbiAgICB0aGlzLl9zaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM4YzM1NjhcIik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLl93aWR0aCAvIDIpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuX3NoYXBlKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIOOCpOODmeODs+ODiOOCkuOCreODo+ODg+ODgeOBl+OBn+mam+OBruOCpOODmeODs+ODiOOCr+ODqeOCueOBp+OBmeOAglxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENhdGNoRXZlbnQgZXh0ZW5kcyBjcmVhdGVqcy5FdmVudCB7XG5cbiAgLy8g55m654Gr44GV44Gb44KL44Kk44OZ44Oz44OI5ZCNXG4gIHByaXZhdGUgX2V2ZW50TmFtZTpzdHJpbmc7XG4gIHB1YmxpYyBnZXRFdmVudE5hbWUoKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE5hbWU7XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGV2ZW50TmFtZTpzdHJpbmcsIGJ1YmJsZXM6Ym9vbGVhbiA9IHRydWUsIGNhbmNlbGFibGU6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSk7XG5cbiAgICB0aGlzLl9ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gIH1cblxufVxuIiwiaW1wb3J0IEV2ZW50Q2F0Y2hFdmVudCBmcm9tICcuL0V2ZW50Q2F0Y2hFdmVudCc7XG5pbXBvcnQgRXZlbnROYW1lIGZyb20gJy4vRXZlbnROYW1lJztcblxuLyoqXG4gKiDjgqTjg5njg7Pjg4jnrqHnkIbjgq/jg6njgrlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRNYW5hZ2VyIGV4dGVuZHMgY3JlYXRlanMuRXZlbnREaXNwYXRjaGVyIHtcblxuICAvKiog44Kk44Oz44K544K/44Oz44K5ICovXG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpFdmVudE1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIOOCpOODs+OCueOCv+ODs+OCueOCkuWPluW+l+OBl+OBvuOBmeOAglxuICAgKiBAcmV0dXJuIHtFdmVudE1hbmFnZXJ9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6RXZlbnRNYW5hZ2VyIHtcbiAgICByZXR1cm4gRXZlbnRNYW5hZ2VyLl9pbnN0YW5jZSB8fCBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBFdmVudE1hbmFnZXIuX2luc3RhbmNlID0gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiDnmbrngavjgZXjgZvjgb7jgZnjgIJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgKi9cbiAgcHVibGljIGRpc3BhdGNoKGV2ZW50TmFtZTpzdHJpbmcpOnZvaWQge1xuICAgIC8vIOOCpOODmeODs+ODiOOCreODo+ODg+ODgeOCpOODmeODs+ODiOeZuueBq1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnRDYXRjaEV2ZW50KEV2ZW50TmFtZS5DSEFUQ0hfRVZFTlQsIGV2ZW50TmFtZSkpO1xuICB9XG5cbn1cbiIsIi8qKlxuICog44Kk44OZ44Oz44OI5ZCN5LiA6KanXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50TmFtZSB7XG5cbiAgcHVibGljIHN0YXRpYyBDSEFUQ0hfRVZFTlQ6c3RyaW5nID0gJ2NoYW5nZV9ldmVudCc7XG5cbn1cbiIsIi8qKlxuICog5aSW6YOo44Gn5L2/55So44GZ44KL44Kk44OZ44Oz44OI5ZCN5LiA6KanXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1YmxpY0V2ZW50TmFtZSB7XG5cbiAgcHVibGljIHN0YXRpYyBDTElDS19BOnN0cmluZyAgICAgID0gJ2NsaWNrQSc7XG4gIHB1YmxpYyBzdGF0aWMgUFVTSF9UT1A6c3RyaW5nICAgICA9ICdwdXNoVG9wJztcbiAgcHVibGljIHN0YXRpYyBQVVNIX0xFRlQ6c3RyaW5nICAgID0gJ3B1c2hMZWZ0JztcbiAgcHVibGljIHN0YXRpYyBQVVNIX1JJR0hUOnN0cmluZyAgID0gJ3B1c2hSaWdodCc7XG4gIHB1YmxpYyBzdGF0aWMgUFVTSF9CT1RUT006c3RyaW5nICA9ICdwdXNoQm90dG9tJztcbiAgcHVibGljIHN0YXRpYyBSRUxFQVNFX1BBRDpzdHJpbmcgID0gJ3JlbGVhc2VQYWQnO1xuXG59XG4iLCJpbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gJy4uL2V2ZW50L0V2ZW50TWFuYWdlcic7XG5pbXBvcnQgUHVibGljRXZlbnROYW1lIGZyb20gJy4uL2V2ZW50L1B1YmxpY0V2ZW50TmFtZSc7XG5cbi8qKlxuICog44Ki44OK44Ot44Kw44OR44OD44OJ44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZCBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG5cbiAgLyoqIOWNiuW+hCAqL1xuICBwcml2YXRlIF9yYWRpdXM6bnVtYmVyID0gNjA7XG4gIC8qKiDjgrnjg4bjgqPjgq/jga7ljYrlvoQgKi9cbiAgcHJpdmF0ZSBfc3RpY2tSYWRpdXM6bnVtYmVyID0gMzA7XG5cbiAgLyoqIOOCueODhuOCo+ODg+OCryAqL1xuICBwcml2YXRlIF9zdGljazpjcmVhdGVqcy5TaGFwZTtcbiAgLyoqIOePvuWcqOWAkuOBl+OBpuOBhOOCi+aWueWQkSAqL1xuICBwcml2YXRlIF9jdXJyZW50RGlyZWN0aW9uOnN0cmluZztcblxuICAvKiog44Kk44OZ44Oz44OI44Oe44ON44O844K444Oj44O8ICovXG4gIHByaXZhdGUgX2V2ZW50TWFuYWdlcjpFdmVudE1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDjgqTjg5njg7Pjg4jnmbrngatcbiAgICB0aGlzLl9ldmVudE1hbmFnZXIgPSBFdmVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIOiDjOaZr1xuICAgIGxldCBiZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIGJnLmdyYXBoaWNzLmJlZ2luRmlsbCgnI2FiYWZiOCcpO1xuICAgIGJnLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzKTtcbiAgICBiZy5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZChiZyk7XG5cbiAgICAvLyDjgrnjg4bjgqPjg4Pjgq9cbiAgICB0aGlzLl9zdGljayA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuX3N0aWNrLmdyYXBoaWNzLmJlZ2luRmlsbCgnIzMzMzMzMycpO1xuICAgIHRoaXMuX3N0aWNrLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5fc3RpY2tSYWRpdXMpO1xuICAgIHRoaXMuX3N0aWNrLmdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuX3N0aWNrKTtcblxuICAgIC8vIOOCv+ODg+ODgeOCpOODmeODs+ODiFxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncHJlc3Ntb3ZlJywgKGV2ZW50OmNyZWF0ZWpzLk1vdXNlRXZlbnQpID0+IHRoaXMuX29uVG91Y2hNb3ZlKGV2ZW50KSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdwcmVzc3VwJywgKCkgPT4gdGhpcy5fb25Nb3VzZVVwKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCv+ODg+ODgeODoOODvOODluaZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgcHJpdmF0ZSBfb25Ub3VjaE1vdmUoZXZlbnQ6Y3JlYXRlanMuTW91c2VFdmVudCkge1xuICAgIGxldCB4ID0gZXZlbnQubG9jYWxYLFxuICAgICAgICB5ID0gZXZlbnQubG9jYWxZO1xuICAgIGxldCB2ZWMgPSBuZXcgVmljdG9yKHgsIHkpO1xuXG4gICAgLy8g5p6g5aSW44Gr5Ye644Gm44GE44KM44Gw5p6g5YaF44Gr5Y+O44KB44KLXG4gICAgaWYodmVjLmxlbmd0aCgpID4gdGhpcy5fcmFkaXVzIC0gdGhpcy5fc3RpY2tSYWRpdXMpIHtcbiAgICAgIGxldCB2ID0gdmVjLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKHRoaXMuX3JhZGl1cyAtIHRoaXMuX3N0aWNrUmFkaXVzKTtcbiAgICAgIHRoaXMuX3N0aWNrLnggPSB2Lng7XG4gICAgICB0aGlzLl9zdGljay55ID0gdi55O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdGljay54ID0gZXZlbnQubG9jYWxYO1xuICAgICAgdGhpcy5fc3RpY2sueSA9IGV2ZW50LmxvY2FsWTtcbiAgICB9XG5cbiAgICAvLyDljYHlrZfjga7jganjgaHjgonjgpLlkJHjgYTjgabjgYTjgovjgYvliKTlrppcbiAgICBsZXQgYW5nbGUgPSB2ZWMuYW5nbGUoKSAqIDE4MCAvIE1hdGguUEk7XG4gICAgbGV0IGRpcmVjdGlvbjpzdHJpbmc7XG4gICAgaWYoYW5nbGUgPj0gLTQ1ICYmIGFuZ2xlIDw9IDQ1KSB7XG4gICAgICBkaXJlY3Rpb24gPSBQdWJsaWNFdmVudE5hbWUuUFVTSF9SSUdIVDtcbiAgICB9IGVsc2UgaWYoYW5nbGUgPiA0NSAmJiBhbmdsZSA8IDEzNSkge1xuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfQk9UVE9NO1xuICAgIH0gZWxzZSBpZihhbmdsZSA8IC00NSAmJiBhbmdsZSA+IC0xMzUpIHtcbiAgICAgIGRpcmVjdGlvbiA9IFB1YmxpY0V2ZW50TmFtZS5QVVNIX1RPUDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfTEVGVDtcbiAgICB9XG5cbiAgICAvLyDmlrnlkJHjgYzlpInjgo/jgaPjgZ/jgonjgqTjg5njg7Pjg4jjgpLnmbrngavjgZXjgZvjgotcbiAgICBpZih0aGlzLl9jdXJyZW50RGlyZWN0aW9uICE9IGRpcmVjdGlvbikge1xuICAgICAgdGhpcy5fY3VycmVudERpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuX2V2ZW50TWFuYWdlci5kaXNwYXRjaChkaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg57jgqbjgrnjgqLjg4Pjg5fmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIHByaXZhdGUgX29uTW91c2VVcCgpIHtcbiAgICB0aGlzLl9zdGljay54ID0gMDtcbiAgICB0aGlzLl9zdGljay55ID0gMDtcbiAgICB0aGlzLl9ldmVudE1hbmFnZXIuZGlzcGF0Y2goUHVibGljRXZlbnROYW1lLlJFTEVBU0VfUEFEKTtcbiAgfVxuXG59XG4iXX0=
