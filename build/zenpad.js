(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Button_1 = require('./botton/Button');
var Zenpad = (function () {
    function Zenpad(canvasId) {
        var _this = this;
        this._canvasId = canvasId;
        this._canvas = document.getElementById(this._canvasId);
        this._canvas.setAttribute('width', String(this._canvas.clientWidth));
        this._canvas.setAttribute('height', String(this._canvas.clientHeight));
        this._stage = new createjs.Stage(this._canvasId);
        createjs.Touch.enable(this._stage);
        var button = new Button_1["default"]();
        this._stage.addChild(button);
        createjs.Ticker.addEventListener("tick", function () { return _this._tick(); });
    }
    Zenpad.prototype._tick = function () {
        console.info("aaa");
        this._stage.update();
    };
    return Zenpad;
}());
window.Zenpad = Zenpad;

},{"./botton/Button":2}],2:[function(require,module,exports){
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
        this._shape = new createjs.Shape();
        this._shape.graphics.beginFill("#FF0000");
        this._shape.graphics.drawRect(0, 0, 50, 50);
        this._shape.graphics.endFill();
        this.addChild(this._shape);
    }
    return Button;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Button;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUEsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFLckM7SUFjRSxnQkFBWSxRQUFlO1FBZDdCLGlCQTBDQztRQXpCRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUdqRCxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxtQkFBTSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHN0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBS08sc0JBQUssR0FBYjtRQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0gsYUFBQztBQUFELENBMUNBLEFBMENDLElBQUE7QUFFSyxNQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7O0FDOUM5QjtJQUFvQywwQkFBa0I7SUFTcEQ7UUFDRSxpQkFBTyxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFSCxhQUFDO0FBQUQsQ0FuQkEsQUFtQkMsQ0FuQm1DLFFBQVEsQ0FBQyxTQUFTLEdBbUJyRDtBQW5CRDsyQkFtQkMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vYm90dG9uL0J1dHRvbic7XG5cbi8qKlxuICogWmVucGFk44Gu44Oh44Kk44Oz44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmNsYXNzIFplbnBhZCB7XG5cbiAgLyoqIGNhbnZhc+OBrmlkICovXG4gIHByaXZhdGUgX2NhbnZhc0lkOnN0cmluZztcbiAgLyoqIGNhbnZhcyAqL1xuICBwcml2YXRlIF9jYW52YXM6SFRNTEVsZW1lbnQ7XG4gIC8qKiBzdGFnZSAqL1xuICBwcml2YXRlIF9zdGFnZTpjcmVhdGVqcy5TdGFnZTtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZHBtSWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNhbnZhc0lkOnN0cmluZykge1xuXG4gICAgLy8g44K544OG44O844K444KS5L2c5oiQXG4gICAgdGhpcy5fY2FudmFzSWQgPSBjYW52YXNJZDtcbiAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9jYW52YXNJZCk7XG4gICAgdGhpcy5fY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBTdHJpbmcodGhpcy5fY2FudmFzLmNsaWVudFdpZHRoKSk7XG4gICAgdGhpcy5fY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgU3RyaW5nKHRoaXMuX2NhbnZhcy5jbGllbnRIZWlnaHQpKTtcblxuICAgIHRoaXMuX3N0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKHRoaXMuX2NhbnZhc0lkKTtcbiAgICAvLyB0aGlzLl9zdGFnZS5jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMuY2xpZW50V2lkdGg7XG4gICAgLy8gdGhpcy5fc3RhZ2UuY2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHRoaXMuX3N0YWdlKTtcblxuICAgIC8vIOODnOOCv+ODs1xuICAgIGxldCBidXR0b24gPSBuZXcgQnV0dG9uKCk7XG4gICAgdGhpcy5fc3RhZ2UuYWRkQ2hpbGQoYnV0dG9uKTtcblxuICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCAoKSA9PiB0aGlzLl90aWNrKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOavjuODleODrOODvOODoOavjuOBruOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgKi9cbiAgcHJpdmF0ZSBfdGljaygpIHtcbiAgICBjb25zb2xlLmluZm8oXCJhYWFcIik7XG4gICAgdGhpcy5fc3RhZ2UudXBkYXRlKCk7XG4gIH1cbn1cblxuKDxhbnk+d2luZG93KS5aZW5wYWQgPSBaZW5wYWQ7XG4iLCIvKipcbiAqIOODnOOCv+ODs+OCr+ODqeOCueOBp+OBmeOAglxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuXG4gIC8qKiDjgrfjgqfjgqTjg5cgKi9cbiAgcHJpdmF0ZSBfc2hhcGU6Y3JlYXRlanMuU2hhcGU7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiNGRjAwMDBcIik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgNTAsIDUwKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9zaGFwZSk7XG4gIH1cblxufVxuIl19
