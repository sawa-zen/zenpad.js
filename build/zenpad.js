(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button_1 = require('./component/Button');
var Pad_1 = require('./component/Pad');
var PublicEventName_1 = require('./event/PublicEventName');
var Zenpad = (function (_super) {
    __extends(Zenpad, _super);
    function Zenpad(canvasId) {
        _super.call(this);
        this._canvasId = canvasId;
        this._canvas = document.getElementById(this._canvasId);
        this._stage = new createjs.Stage(this._canvasId);
        createjs.Touch.enable(this._stage);
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
    return Zenpad;
}(createjs.EventDispatcher));
window.Zenpad = Zenpad;

},{"./component/Button":2,"./component/Pad":3,"./event/PublicEventName":7}],2:[function(require,module,exports){
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

},{"../event/EventManager":5,"../event/EventName":6}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PublicEventName_1 = require('../event/PublicEventName');
var Pad = (function (_super) {
    __extends(Pad, _super);
    function Pad() {
        var _this = this;
        _super.call(this);
        this._radius = 60;
        this._stickRadius = 30;
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
        }
    };
    Pad.prototype._onMouseUp = function () {
        this._stick.x = 0;
        this._stick.y = 0;
        this._currentDirection = null;
    };
    return Pad;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Pad;

},{"../event/PublicEventName":7}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
        this.dispatchEvent(new EventCatchEvent_1["default"](EventName_1["default"].CATCH_EVENT, eventName));
    };
    return EventManager;
}(createjs.EventDispatcher));
exports.__esModule = true;
exports["default"] = EventManager;

},{"./EventCatchEvent":4,"./EventName":6}],6:[function(require,module,exports){
"use strict";
var EventName = (function () {
    function EventName() {
    }
    EventName.CLICK = 'click';
    EventName.CATCH_EVENT = 'change_event';
    return EventName;
}());
exports.__esModule = true;
exports["default"] = EventName;

},{}],7:[function(require,module,exports){
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
    PublicEventName.PULL_DOWN = 'pull_down';
    PublicEventName.RELEASE_PAD = 'releasePad';
    return PublicEventName;
}());
exports.__esModule = true;
exports["default"] = PublicEventName;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2NvbXBvbmVudC9CdXR0b24udHMiLCJzcmMvY29tcG9uZW50L1BhZC50cyIsInNyYy9ldmVudC9FdmVudENhdGNoRXZlbnQudHMiLCJzcmMvZXZlbnQvRXZlbnRNYW5hZ2VyLnRzIiwic3JjL2V2ZW50L0V2ZW50TmFtZS50cyIsInNyYy9ldmVudC9QdWJsaWNFdmVudE5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSx1QkFBbUIsb0JBQW9CLENBQUMsQ0FBQTtBQUN4QyxvQkFBZ0IsaUJBQWlCLENBQUMsQ0FBQTtBQUdsQyxnQ0FBNEIseUJBQXlCLENBQUMsQ0FBQTtBQUt0RDtJQUFxQiwwQkFBd0I7SUFtQjNDLGdCQUFZLFFBQWU7UUFDekIsaUJBQU8sQ0FBQztRQUdSLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUduQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUd4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEdB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LFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFSCxtQkFBQztBQUFELENBL0JBLEFBK0JDLENBL0J5QyxRQUFRLENBQUMsZUFBZSxHQStCakU7QUEvQkQ7aUNBK0JDLENBQUE7Ozs7QUNsQ0Q7SUFBQTtJQUdBLENBQUM7SUFGZSxlQUFLLEdBQWlCLE9BQU8sQ0FBQztJQUM5QixxQkFBVyxHQUFVLGNBQWMsQ0FBQztJQUNwRCxnQkFBQztBQUFELENBSEEsQUFHQyxJQUFBO0FBSEQ7OEJBR0MsQ0FBQTs7OztBQ0hEO0lBQUE7SUFXQSxDQUFDO0lBVGUsdUJBQU8sR0FBZSxRQUFRLENBQUM7SUFDL0IsdUJBQU8sR0FBZSxRQUFRLENBQUM7SUFDL0Isd0JBQVEsR0FBYyxTQUFTLENBQUM7SUFDaEMseUJBQVMsR0FBYSxVQUFVLENBQUM7SUFDakMsMEJBQVUsR0FBWSxXQUFXLENBQUM7SUFDbEMsMkJBQVcsR0FBVyxZQUFZLENBQUM7SUFDbkMseUJBQVMsR0FBYSxXQUFXLENBQUM7SUFDbEMsMkJBQVcsR0FBVyxZQUFZLENBQUM7SUFFbkQsc0JBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhEO29DQVdDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEJ1dHRvbiBmcm9tICcuL2NvbXBvbmVudC9CdXR0b24nO1xuaW1wb3J0IFBhZCBmcm9tICcuL2NvbXBvbmVudC9QYWQnO1xuaW1wb3J0IEV2ZW50TmFtZSBmcm9tICcuL2V2ZW50L0V2ZW50TmFtZSc7XG5pbXBvcnQgRXZlbnRDYXRjaEV2ZW50IGZyb20gJy4vZXZlbnQvRXZlbnRDYXRjaEV2ZW50JztcbmltcG9ydCBQdWJsaWNFdmVudE5hbWUgZnJvbSAnLi9ldmVudC9QdWJsaWNFdmVudE5hbWUnO1xuXG4vKipcbiAqIFplbnBhZOOBruODoeOCpOODs+OCr+ODqeOCueOBp+OBmeOAglxuICovXG5jbGFzcyBaZW5wYWQgZXh0ZW5kcyBjcmVhdGVqcy5FdmVudERpc3BhdGNoZXIge1xuXG4gIC8qKiBjYW52YXPjga5pZCAqL1xuICBwcml2YXRlIF9jYW52YXNJZDpzdHJpbmc7XG4gIC8qKiBjYW52YXMgKi9cbiAgcHJpdmF0ZSBfY2FudmFzOkhUTUxFbGVtZW50O1xuICAvKiogc3RhZ2UgKi9cbiAgcHJpdmF0ZSBfc3RhZ2U6Y3JlYXRlanMuU3RhZ2U7XG5cbiAgLyoqIOW3puWBtOOCsOODq+ODvOODlyAqL1xuICBwcml2YXRlIF9sZWZ0QnV0dG9uczpjcmVhdGVqcy5Db250YWluZXI7XG4gIC8qKiDlj7PlgbTjgrDjg6vjg7zjg5cgKi9cbiAgcHJpdmF0ZSBfcmlnaHRCdXR0b25zOmNyZWF0ZWpzLkNvbnRhaW5lcjtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZHBtSWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNhbnZhc0lkOnN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDjgrnjg4bjg7zjgrjjgpLkvZzmiJBcbiAgICB0aGlzLl9jYW52YXNJZCA9IGNhbnZhc0lkO1xuICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX2NhbnZhc0lkKTtcblxuICAgIC8vIOOCueODhuODvOOCuFxuICAgIHRoaXMuX3N0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKHRoaXMuX2NhbnZhc0lkKTtcbiAgICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUodGhpcy5fc3RhZ2UpO1xuXG4gICAgLy8g5bem5YG044Kw44Or44O844OXXG4gICAgdGhpcy5fbGVmdEJ1dHRvbnMgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKCk7XG4gICAgdGhpcy5fc3RhZ2UuYWRkQ2hpbGQodGhpcy5fbGVmdEJ1dHRvbnMpO1xuXG4gICAgLy8g5Y+z5YG044Kw44Or44O844OXXG4gICAgdGhpcy5fcmlnaHRCdXR0b25zID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5yZWdYID0gMTkwO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX3JpZ2h0QnV0dG9ucyk7XG5cbiAgICAvLyDjgqLjg4rjg63jgrDjg5Hjg4Pjg4lcbiAgICBsZXQgcGFkID0gbmV3IFBhZCgpO1xuICAgIHBhZC54ID0gODA7XG4gICAgcGFkLnkgPSA5MDtcbiAgICB0aGlzLl9sZWZ0QnV0dG9ucy5hZGRDaGlsZChwYWQpO1xuXG4gICAgLy8gQeODnOOCv+ODs1xuICAgIGxldCBhQnV0dG9uID0gbmV3IEJ1dHRvbihQdWJsaWNFdmVudE5hbWUuQ0xJQ0tfQSk7XG4gICAgYUJ1dHRvbi54ID0gMTUwO1xuICAgIGFCdXR0b24ueSA9IDgwO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5hZGRDaGlsZChhQnV0dG9uKTtcblxuICAgIC8vIELjg5zjgr/jg7NcbiAgICBsZXQgYkJ1dHRvbiA9IG5ldyBCdXR0b24oUHVibGljRXZlbnROYW1lLkNMSUNLX0IpO1xuICAgIGJCdXR0b24ueCA9IDgwO1xuICAgIGJCdXR0b24ueSA9IDExMDtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMuYWRkQ2hpbGQoYkJ1dHRvbik7XG5cbiAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICB0aGlzLl90aWNrID0gdGhpcy5fdGljay5iaW5kKHRoaXMpO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLl90aWNrKTtcblxuICAgIC8vIOODquOCteOCpOOCulxuICAgIHRoaXMuX3Jlc2l6ZSA9IHRoaXMuX3Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3Jlc2l6ZSk7XG5cbiAgICAvLyDliJ3lm57jg6rjgrXjgqTjgrrlh6bnkIZcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmr47jg5Xjg6zjg7zjg6Dmr47jga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICovXG4gIHByaXZhdGUgX3RpY2soKTp2b2lkIHtcbiAgICB0aGlzLl9zdGFnZS51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6rjgrXjgqTjgrpcbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZSgpOnZvaWQge1xuICAgIC8vIGNhbnZhc+OCteOCpOOCuuOCkuWQiOOCj+OBm+OCi1xuICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgU3RyaW5nKHRoaXMuX2NhbnZhcy5jbGllbnRXaWR0aCkpO1xuICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50SGVpZ2h0KSk7XG5cbiAgICAvLyDlj7PlgbTjgrDjg6vjg7zjg5fjgpLlj7PpmoXjgatcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMueCA9IHRoaXMuX2NhbnZhcy5jbGllbnRXaWR0aDtcbiAgfVxufVxuXG4oPGFueT53aW5kb3cpLlplbnBhZCA9IFplbnBhZDtcbiIsImltcG9ydCBFdmVudE5hbWUgZnJvbSAnLi4vZXZlbnQvRXZlbnROYW1lJztcbmltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSAnLi4vZXZlbnQvRXZlbnRNYW5hZ2VyJztcblxuLyoqXG4gKiDjg5zjgr/jg7Pjgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcblxuICAvKiog44Kv44Oq44OD44Kv5pmC44Gu44Kk44OZ44Oz44OI5ZCNICovXG4gIHByaXZhdGUgX2V2ZW50TmFtZTpzdHJpbmc7XG5cbiAgLyoqIOW5hSAqL1xuICBwcml2YXRlIF93aWR0aDpudW1iZXIgPSA1NTtcbiAgLyoqIOOCt+OCp+OCpOODlyAqL1xuICBwcml2YXRlIF9zaGFwZTpjcmVhdGVqcy5TaGFwZTtcblxuICAvKiog44Kk44OZ44Oz44OI44Oe44ON44O844K444Oj44O8ICovXG4gIHByaXZhdGUgX2V2ZW50TWFuYWdlcjpFdmVudE1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTpzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8g44Kk44OZ44Oz44OI5ZCNXG4gICAgdGhpcy5fZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgIC8vIOOCpOODmeODs+ODiOODnuODjeODvOOCuOODo+ODvFxuICAgIHRoaXMuX2V2ZW50TWFuYWdlciA9IEV2ZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8g44K344Kn44Kk44OXXG4gICAgdGhpcy5fc2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoJyM4YzM1NjgnKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuX3dpZHRoIC8gMik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fc2hhcGUpO1xuICAgIHRoaXMuX29uQ2xpY2sgPSB0aGlzLl9vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fc2hhcGUuYWRkRXZlbnRMaXN0ZW5lcihFdmVudE5hbWUuQ0xJQ0ssIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIOODnOOCv+ODs+aKvOS4i+aZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgcHJpdmF0ZSBfb25DbGljayhldmVudDpjcmVhdGVqcy5Nb3VzZUV2ZW50KTp2b2lkIHtcbiAgICB0aGlzLl9ldmVudE1hbmFnZXIuZGlzcGF0Y2godGhpcy5fZXZlbnROYW1lKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgUHVibGljRXZlbnROYW1lIGZyb20gJy4uL2V2ZW50L1B1YmxpY0V2ZW50TmFtZSc7XG5cbi8qKlxuICog44Ki44OK44Ot44Kw44OR44OD44OJ44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZCBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG5cbiAgLyoqIOWNiuW+hCAqL1xuICBwcml2YXRlIF9yYWRpdXM6bnVtYmVyID0gNjA7XG4gIC8qKiDjgrnjg4bjgqPjgq/jga7ljYrlvoQgKi9cbiAgcHJpdmF0ZSBfc3RpY2tSYWRpdXM6bnVtYmVyID0gMzA7XG5cbiAgLyoqIOOCueODhuOCo+ODg+OCryAqL1xuICBwcml2YXRlIF9zdGljazpjcmVhdGVqcy5TaGFwZTtcbiAgLyoqIOePvuWcqOWAkuOBl+OBpuOBhOOCi+aWueWQkSAqL1xuICBwcml2YXRlIF9jdXJyZW50RGlyZWN0aW9uOnN0cmluZztcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOiDjOaZr1xuICAgIGxldCBiZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIGJnLmdyYXBoaWNzLmJlZ2luRmlsbCgnI2FiYWZiOCcpO1xuICAgIGJnLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5fcmFkaXVzKTtcbiAgICBiZy5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZChiZyk7XG5cbiAgICAvLyDjgrnjg4bjgqPjg4Pjgq9cbiAgICB0aGlzLl9zdGljayA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuX3N0aWNrLmdyYXBoaWNzLmJlZ2luRmlsbCgnIzMzMzMzMycpO1xuICAgIHRoaXMuX3N0aWNrLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5fc3RpY2tSYWRpdXMpO1xuICAgIHRoaXMuX3N0aWNrLmdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuX3N0aWNrKTtcblxuICAgIC8vIOOCv+ODg+ODgeOCpOODmeODs+ODiFxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncHJlc3Ntb3ZlJywgKGV2ZW50OmNyZWF0ZWpzLk1vdXNlRXZlbnQpID0+IHRoaXMuX29uVG91Y2hNb3ZlKGV2ZW50KSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdwcmVzc3VwJywgKCkgPT4gdGhpcy5fb25Nb3VzZVVwKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCv+ODg+ODgeODoOODvOODluaZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgcHJpdmF0ZSBfb25Ub3VjaE1vdmUoZXZlbnQ6Y3JlYXRlanMuTW91c2VFdmVudCkge1xuICAgIGxldCB4ID0gZXZlbnQubG9jYWxYLFxuICAgICAgICB5ID0gZXZlbnQubG9jYWxZO1xuICAgIGxldCB2ZWMgPSBuZXcgVmljdG9yKHgsIHkpO1xuXG4gICAgLy8g5p6g5aSW44Gr5Ye644Gm44GE44KM44Gw5p6g5YaF44Gr5Y+O44KB44KLXG4gICAgaWYodmVjLmxlbmd0aCgpID4gdGhpcy5fcmFkaXVzIC0gdGhpcy5fc3RpY2tSYWRpdXMpIHtcbiAgICAgIGxldCB2ID0gdmVjLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKHRoaXMuX3JhZGl1cyAtIHRoaXMuX3N0aWNrUmFkaXVzKTtcbiAgICAgIHRoaXMuX3N0aWNrLnggPSB2Lng7XG4gICAgICB0aGlzLl9zdGljay55ID0gdi55O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdGljay54ID0gZXZlbnQubG9jYWxYO1xuICAgICAgdGhpcy5fc3RpY2sueSA9IGV2ZW50LmxvY2FsWTtcbiAgICB9XG5cbiAgICAvLyDljYHlrZfjga7jganjgaHjgonjgpLlkJHjgYTjgabjgYTjgovjgYvliKTlrppcbiAgICBsZXQgYW5nbGUgPSB2ZWMuYW5nbGUoKSAqIDE4MCAvIE1hdGguUEk7XG4gICAgbGV0IGRpcmVjdGlvbjpzdHJpbmc7XG4gICAgaWYoYW5nbGUgPj0gLTQ1ICYmIGFuZ2xlIDw9IDQ1KSB7XG4gICAgICBkaXJlY3Rpb24gPSBQdWJsaWNFdmVudE5hbWUuUFVTSF9SSUdIVDtcbiAgICB9IGVsc2UgaWYoYW5nbGUgPiA0NSAmJiBhbmdsZSA8IDEzNSkge1xuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfQk9UVE9NO1xuICAgIH0gZWxzZSBpZihhbmdsZSA8IC00NSAmJiBhbmdsZSA+IC0xMzUpIHtcbiAgICAgIGRpcmVjdGlvbiA9IFB1YmxpY0V2ZW50TmFtZS5QVVNIX1RPUDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9uID0gUHVibGljRXZlbnROYW1lLlBVU0hfTEVGVDtcbiAgICB9XG5cbiAgICAvLyDmlrnlkJHjgYzlpInjgo/jgaPjgZ/jgonjgqTjg5njg7Pjg4jjgpLnmbrngavjgZXjgZvjgotcbiAgICBpZih0aGlzLl9jdXJyZW50RGlyZWN0aW9uICE9IGRpcmVjdGlvbikge1xuICAgICAgdGhpcy5fY3VycmVudERpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Oe44Km44K544Ki44OD44OX5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vbk1vdXNlVXAoKSB7XG4gICAgdGhpcy5fc3RpY2sueCA9IDA7XG4gICAgdGhpcy5fc3RpY2sueSA9IDA7XG4gICAgdGhpcy5fY3VycmVudERpcmVjdGlvbiA9IG51bGw7XG4gIH1cbn1cbiIsIi8qKlxuICog44Kk44OZ44Oz44OI44KS44Kt44Oj44OD44OB44GX44Gf6Zqb44Gu44Kk44OZ44Oz44OI44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q2F0Y2hFdmVudCBleHRlbmRzIGNyZWF0ZWpzLkV2ZW50IHtcblxuICAvLyDnmbrngavjgZXjgZvjgovjgqTjg5njg7Pjg4jlkI1cbiAgcHJpdmF0ZSBfZXZlbnROYW1lOnN0cmluZztcbiAgcHVibGljIGdldEV2ZW50TmFtZSgpOnN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50TmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgZXZlbnROYW1lOnN0cmluZywgYnViYmxlczpib29sZWFuID0gdHJ1ZSwgY2FuY2VsYWJsZTpib29sZWFuID0gZmFsc2UpIHtcbiAgICBzdXBlcih0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlKTtcblxuICAgIHRoaXMuX2V2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgRXZlbnRDYXRjaEV2ZW50IGZyb20gJy4vRXZlbnRDYXRjaEV2ZW50JztcbmltcG9ydCBFdmVudE5hbWUgZnJvbSAnLi9FdmVudE5hbWUnO1xuXG4vKipcbiAqIOOCpOODmeODs+ODiOeuoeeQhuOCr+ODqeOCuVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudE1hbmFnZXIgZXh0ZW5kcyBjcmVhdGVqcy5FdmVudERpc3BhdGNoZXIge1xuXG4gIC8qKiDjgqTjg7Pjgrnjgr/jg7PjgrkgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkV2ZW50TWFuYWdlcjtcblxuICAvKipcbiAgICog44Kk44Oz44K544K/44Oz44K544KS5Y+W5b6X44GX44G+44GZ44CCXG4gICAqIEByZXR1cm4ge0V2ZW50TWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFdmVudE1hbmFnZXIge1xuICAgIHJldHVybiBFdmVudE1hbmFnZXIuX2luc3RhbmNlIHx8IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIEV2ZW50TWFuYWdlci5faW5zdGFuY2UgPSB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIOeZuueBq+OBleOBm+OBvuOBmeOAglxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAqL1xuICBwdWJsaWMgZGlzcGF0Y2goZXZlbnROYW1lOnN0cmluZyk6dm9pZCB7XG4gICAgLy8g44Kk44OZ44Oz44OI44Kt44Oj44OD44OB44Kk44OZ44Oz44OI55m654GrXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudENhdGNoRXZlbnQoRXZlbnROYW1lLkNBVENIX0VWRU5ULCBldmVudE5hbWUpKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIOOCpOODmeODs+ODiOWQjeS4gOimp1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudE5hbWUge1xuICBwdWJsaWMgc3RhdGljIENMSUNLOnN0cmluZyAgICAgICAgPSAnY2xpY2snO1xuICBwdWJsaWMgc3RhdGljIENBVENIX0VWRU5UOnN0cmluZyA9ICdjaGFuZ2VfZXZlbnQnO1xufVxuIiwiLyoqXG4gKiDlpJbpg6jjgafkvb/nlKjjgZnjgovjgqTjg5njg7Pjg4jlkI3kuIDopqdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGljRXZlbnROYW1lIHtcblxuICBwdWJsaWMgc3RhdGljIENMSUNLX0E6c3RyaW5nICAgICAgPSAnY2xpY2tBJztcbiAgcHVibGljIHN0YXRpYyBDTElDS19COnN0cmluZyAgICAgID0gJ2NsaWNrQic7XG4gIHB1YmxpYyBzdGF0aWMgUFVTSF9UT1A6c3RyaW5nICAgICA9ICdwdXNoVG9wJztcbiAgcHVibGljIHN0YXRpYyBQVVNIX0xFRlQ6c3RyaW5nICAgID0gJ3B1c2hMZWZ0JztcbiAgcHVibGljIHN0YXRpYyBQVVNIX1JJR0hUOnN0cmluZyAgID0gJ3B1c2hSaWdodCc7XG4gIHB1YmxpYyBzdGF0aWMgUFVTSF9CT1RUT006c3RyaW5nICA9ICdwdXNoQm90dG9tJztcbiAgcHVibGljIHN0YXRpYyBQVUxMX0RPV046c3RyaW5nICAgID0gJ3B1bGxfZG93bic7XG4gIHB1YmxpYyBzdGF0aWMgUkVMRUFTRV9QQUQ6c3RyaW5nICA9ICdyZWxlYXNlUGFkJztcblxufVxuIl19
