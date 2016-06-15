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
        this._eventManager.addEventListener(EventName_1["default"].CLICK_A, this._onCatchEvent);
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
    };
    return Zenpad;
}(createjs.EventDispatcher));
window.Zenpad = Zenpad;

},{"./botton/Button":2,"./event/EventManager":3,"./event/EventName":4,"./pad/Pad":5}],2:[function(require,module,exports){
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
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        _super.call(this);
        EventManager._instance = this;
    }
    EventManager.getInstance = function () {
        return EventManager._instance || new EventManager();
    };
    return EventManager;
}(createjs.EventDispatcher));
exports.__esModule = true;
exports["default"] = EventManager;

},{}],4:[function(require,module,exports){
"use strict";
var EventName = (function () {
    function EventName() {
    }
    EventName.CLICK_A = 'clickA';
    return EventName;
}());
exports.__esModule = true;
exports["default"] = EventName;

},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pad = (function (_super) {
    __extends(Pad, _super);
    function Pad() {
        var _this = this;
        _super.call(this);
        this._radius = 60;
        this._stickRadius = 30;
        this._isTouching = false;
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
        if (angle >= -45 && angle <= 45) {
            console.info('右');
        }
        else if (angle > 45 && angle < 135) {
            console.info('下');
        }
        else if (angle < -45 && angle > -135) {
            console.info('上');
        }
        else {
            console.info('左');
        }
    };
    Pad.prototype._onMouseUp = function () {
        console.info("asdfads");
        this._stick.x = 0;
        this._stick.y = 0;
    };
    return Pad;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Pad;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiLCJzcmMvZXZlbnQvRXZlbnRNYW5hZ2VyLnRzIiwic3JjL2V2ZW50L0V2ZW50TmFtZS50cyIsInNyYy9wYWQvUGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFDckMsb0JBQWdCLFdBQVcsQ0FBQyxDQUFBO0FBQzVCLDZCQUF5QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELDBCQUFzQixtQkFBbUIsQ0FBQyxDQUFBO0FBSzFDO0lBQXFCLDBCQUF3QjtJQXFCM0MsZ0JBQVksUUFBZTtRQUN6QixpQkFBTyxDQUFDO1FBR1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUd2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR25DLElBQUksQ0FBQyxhQUFhLEdBQUcseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLHNCQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUczRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztR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Q0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDL0IsQ0FBQztRQUdELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN4QyxFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEtBQUssR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUtPLHdCQUFVLEdBQWxCO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFSCxVQUFDO0FBQUQsQ0E5RUEsQUE4RUMsQ0E5RWdDLFFBQVEsQ0FBQyxTQUFTLEdBOEVsRDtBQTlFRDt3QkE4RUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vYm90dG9uL0J1dHRvbic7XG5pbXBvcnQgUGFkIGZyb20gJy4vcGFkL1BhZCc7XG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gJy4vZXZlbnQvRXZlbnRNYW5hZ2VyJztcbmltcG9ydCBFdmVudE5hbWUgZnJvbSAnLi9ldmVudC9FdmVudE5hbWUnO1xuXG4vKipcbiAqIFplbnBhZOOBruODoeOCpOODs+OCr+ODqeOCueOBp+OBmeOAglxuICovXG5jbGFzcyBaZW5wYWQgZXh0ZW5kcyBjcmVhdGVqcy5FdmVudERpc3BhdGNoZXIge1xuXG4gIC8qKiBjYW52YXPjga5pZCAqL1xuICBwcml2YXRlIF9jYW52YXNJZDpzdHJpbmc7XG4gIC8qKiBjYW52YXMgKi9cbiAgcHJpdmF0ZSBfY2FudmFzOkhUTUxFbGVtZW50O1xuICAvKiogc3RhZ2UgKi9cbiAgcHJpdmF0ZSBfc3RhZ2U6Y3JlYXRlanMuU3RhZ2U7XG4gIC8qKiDjgqTjg5njg7Pjg4jjg57jg43jg7zjgrjjg6Pjg7wgKi9cbiAgcHJpdmF0ZSBfZXZlbnRNYW5hZ2VyOkV2ZW50TWFuYWdlcjtcblxuICAvKiog5bem5YG044Kw44Or44O844OXICovXG4gIHByaXZhdGUgX2xlZnRCdXR0b25zOmNyZWF0ZWpzLkNvbnRhaW5lcjtcbiAgLyoqIOWPs+WBtOOCsOODq+ODvOODlyAqL1xuICBwcml2YXRlIF9yaWdodEJ1dHRvbnM6Y3JlYXRlanMuQ29udGFpbmVyO1xuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkcG1JZFxuICAgKi9cbiAgY29uc3RydWN0b3IoY2FudmFzSWQ6c3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOOCueODhuODvOOCuOOCkuS9nOaIkFxuICAgIHRoaXMuX2NhbnZhc0lkID0gY2FudmFzSWQ7XG4gICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fY2FudmFzSWQpO1xuXG4gICAgLy8g44K544OG44O844K4XG4gICAgdGhpcy5fc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UodGhpcy5fY2FudmFzSWQpO1xuICAgIGNyZWF0ZWpzLlRvdWNoLmVuYWJsZSh0aGlzLl9zdGFnZSk7XG5cbiAgICAvLyDjgqTjg5njg7Pjg4jjg57jg43jg7zjgrjjg6Pjg7xcbiAgICB0aGlzLl9ldmVudE1hbmFnZXIgPSBFdmVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLl9ldmVudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihFdmVudE5hbWUuQ0xJQ0tfQSwgdGhpcy5fb25DYXRjaEV2ZW50KTtcblxuICAgIC8vIOW3puWBtOOCsOODq+ODvOODl1xuICAgIHRoaXMuX2xlZnRCdXR0b25zID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX2xlZnRCdXR0b25zKTtcblxuICAgIC8vIOWPs+WBtOOCsOODq+ODvOODl1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucyA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMucmVnWCA9IDE5MDtcbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLl9yaWdodEJ1dHRvbnMpO1xuXG4gICAgLy8g44Ki44OK44Ot44Kw44OR44OD44OJXG4gICAgbGV0IHBhZCA9IG5ldyBQYWQoKTtcbiAgICBwYWQueCA9IDgwO1xuICAgIHBhZC55ID0gOTA7XG4gICAgdGhpcy5fbGVmdEJ1dHRvbnMuYWRkQ2hpbGQocGFkKTtcblxuICAgIC8vIEHjg5zjgr/jg7NcbiAgICBsZXQgYUJ1dHRvbiA9IG5ldyBCdXR0b24oKTtcbiAgICBhQnV0dG9uLnggPSAxNTA7XG4gICAgYUJ1dHRvbi55ID0gODA7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLmFkZENoaWxkKGFCdXR0b24pO1xuXG4gICAgLy8gQuODnOOCv+ODs1xuICAgIGxldCBiQnV0dG9uID0gbmV3IEJ1dHRvbigpO1xuICAgIGJCdXR0b24ueCA9IDgwO1xuICAgIGJCdXR0b24ueSA9IDExMDtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMuYWRkQ2hpbGQoYkJ1dHRvbik7XG5cbiAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICB0aGlzLl90aWNrID0gdGhpcy5fdGljay5iaW5kKHRoaXMpO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLl90aWNrKTtcblxuICAgIC8vIOODquOCteOCpOOCulxuICAgIHRoaXMuX3Jlc2l6ZSA9IHRoaXMuX3Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3Jlc2l6ZSk7XG5cbiAgICAvLyDliJ3lm57jg6rjgrXjgqTjgrrlh6bnkIZcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmr47jg5Xjg6zjg7zjg6Dmr47jga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICovXG4gIHByaXZhdGUgX3RpY2soKTp2b2lkIHtcbiAgICB0aGlzLl9zdGFnZS51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6rjgrXjgqTjgrpcbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZSgpOnZvaWQge1xuICAgIC8vIGNhbnZhc+OCteOCpOOCuuOCkuWQiOOCj+OBm+OCi1xuICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgU3RyaW5nKHRoaXMuX2NhbnZhcy5jbGllbnRXaWR0aCkpO1xuICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50SGVpZ2h0KSk7XG5cbiAgICAvLyDlj7PlgbTjgrDjg6vjg7zjg5fjgpLlj7PpmoXjgatcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMueCA9IHRoaXMuX2NhbnZhcy5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgqTjg5njg7Pjg4jjgq3jg6Pjg4Pjg4HmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIHByaXZhdGUgX29uQ2F0Y2hFdmVudChldmVudDphbnkpOnZvaWQge1xuICB9XG5cbn1cblxuKDxhbnk+d2luZG93KS5aZW5wYWQgPSBaZW5wYWQ7XG4iLCIvKipcbiAqIOODnOOCv+ODs+OCr+ODqeOCueOBp+OBmeOAglxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuXG4gIC8qKiDluYUgKi9cbiAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gNTU7XG4gIC8qKiDjgrfjgqfjgqTjg5cgKi9cbiAgcHJpdmF0ZSBfc2hhcGU6Y3JlYXRlanMuU2hhcGU7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDjgrfjgqfjgqTjg5dcbiAgICB0aGlzLl9zaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM4YzM1NjhcIik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLl93aWR0aCAvIDIpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuX3NoYXBlKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIOOCpOODmeODs+ODiOeuoeeQhuOCr+ODqeOCuVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudE1hbmFnZXIgZXh0ZW5kcyBjcmVhdGVqcy5FdmVudERpc3BhdGNoZXIge1xuXG4gIC8qKiDjgqTjg7Pjgrnjgr/jg7PjgrkgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkV2ZW50TWFuYWdlcjtcblxuICAvKipcbiAgICog44Kk44Oz44K544K/44Oz44K544KS5Y+W5b6X44GX44G+44GZ44CCXG4gICAqIEByZXR1cm4ge0V2ZW50TWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFdmVudE1hbmFnZXIge1xuICAgIHJldHVybiBFdmVudE1hbmFnZXIuX2luc3RhbmNlIHx8IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIEV2ZW50TWFuYWdlci5faW5zdGFuY2UgPSB0aGlzO1xuICB9XG5cbn1cbiIsIi8qKlxuICog44Kk44OZ44Oz44OI5ZCN5LiA6KanXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50TmFtZSB7XG5cbiAgcHVibGljIHN0YXRpYyBDTElDS19BOnN0cmluZyA9ICdjbGlja0EnO1xuXG59XG4iLCIvKipcbiAqIOOCouODiuODreOCsOODkeODg+ODieOCr+ODqeOCueOBp+OBmeOAglxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWQgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuXG4gIC8qKiDljYrlvoQgKi9cbiAgcHJpdmF0ZSBfcmFkaXVzOm51bWJlciA9IDYwO1xuICAvKiog44K544OG44Kj44Kv44Gu5Y2K5b6EICovXG4gIHByaXZhdGUgX3N0aWNrUmFkaXVzOm51bWJlciA9IDMwO1xuXG4gIC8qKiDjgrnjg4bjgqPjg4Pjgq8gKi9cbiAgcHJpdmF0ZSBfc3RpY2s6Y3JlYXRlanMuU2hhcGU7XG4gIC8qKiDmk43kvZzkuK0gKi9cbiAgcHJpdmF0ZSBfaXNUb3VjaGluZzpib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDog4zmma9cbiAgICBsZXQgYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICBiZy5ncmFwaGljcy5iZWdpbkZpbGwoJyNhYmFmYjgnKTtcbiAgICBiZy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuX3JhZGl1cyk7XG4gICAgYmcuZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuYWRkQ2hpbGQoYmcpO1xuXG4gICAgLy8g44K544OG44Kj44OD44KvXG4gICAgdGhpcy5fc3RpY2sgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLl9zdGljay5ncmFwaGljcy5iZWdpbkZpbGwoJyMzMzMzMzMnKTtcbiAgICB0aGlzLl9zdGljay5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuX3N0aWNrUmFkaXVzKTtcbiAgICB0aGlzLl9zdGljay5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9zdGljayk7XG5cbiAgICAvLyDjgr/jg4Pjg4HjgqTjg5njg7Pjg4hcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3ByZXNzbW92ZScsIChldmVudDpjcmVhdGVqcy5Nb3VzZUV2ZW50KSA9PiB0aGlzLl9vblRvdWNoTW92ZShldmVudCkpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncHJlc3N1cCcsICgpID0+IHRoaXMuX29uTW91c2VVcCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgr/jg4Pjg4Hjg6Djg7zjg5bmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIHByaXZhdGUgX29uVG91Y2hNb3ZlKGV2ZW50OmNyZWF0ZWpzLk1vdXNlRXZlbnQpIHtcbiAgICBsZXQgeCA9IGV2ZW50LmxvY2FsWCxcbiAgICAgICAgeSA9IGV2ZW50LmxvY2FsWTtcbiAgICBsZXQgdmVjID0gbmV3IFZpY3Rvcih4LCB5KTtcblxuICAgIC8vIOaeoOWkluOBq+WHuuOBpuOBhOOCjOOBsOaeoOWGheOBq+WPjuOCgeOCi1xuICAgIGlmKHZlYy5sZW5ndGgoKSA+IHRoaXMuX3JhZGl1cyAtIHRoaXMuX3N0aWNrUmFkaXVzKSB7XG4gICAgICBsZXQgdiA9IHZlYy5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcih0aGlzLl9yYWRpdXMgLSB0aGlzLl9zdGlja1JhZGl1cyk7XG4gICAgICB0aGlzLl9zdGljay54ID0gdi54O1xuICAgICAgdGhpcy5fc3RpY2sueSA9IHYueTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3RpY2sueCA9IGV2ZW50LmxvY2FsWDtcbiAgICAgIHRoaXMuX3N0aWNrLnkgPSBldmVudC5sb2NhbFk7XG4gICAgfVxuXG4gICAgLy8g5Y2B5a2X44Gu44Gp44Gh44KJ44KS5ZCR44GE44Gm44GE44KL44GL5Yik5a6aXG4gICAgbGV0IGFuZ2xlID0gdmVjLmFuZ2xlKCkgKiAxODAgLyBNYXRoLlBJO1xuICAgIGlmKGFuZ2xlID49IC00NSAmJiBhbmdsZSA8PSA0NSkge1xuICAgICAgY29uc29sZS5pbmZvKCflj7MnKTtcbiAgICB9IGVsc2UgaWYoYW5nbGUgPiA0NSAmJiBhbmdsZSA8IDEzNSkge1xuICAgICAgY29uc29sZS5pbmZvKCfkuIsnKTtcbiAgICB9IGVsc2UgaWYoYW5nbGUgPCAtNDUgJiYgYW5nbGUgPiAtMTM1KSB7XG4gICAgICBjb25zb2xlLmluZm8oJ+S4iicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmluZm8oJ+W3picpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg57jgqbjgrnjgqLjg4Pjg5fmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIHByaXZhdGUgX29uTW91c2VVcCgpIHtcbiAgICBjb25zb2xlLmluZm8oXCJhc2RmYWRzXCIpO1xuICAgIHRoaXMuX3N0aWNrLnggPSAwO1xuICAgIHRoaXMuX3N0aWNrLnkgPSAwO1xuICB9XG5cbn1cbiJdfQ==
