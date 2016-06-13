(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Button_1 = require('./botton/Button');
var Zenpad = (function () {
    function Zenpad(canvasId) {
        var _this = this;
        this._canvasId = canvasId;
        this._canvas = document.getElementById(this._canvasId);
        this._stage = new createjs.Stage(this._canvasId);
        createjs.Touch.enable(this._stage);
        this._leftButtons = new createjs.Container();
        this._stage.addChild(this._leftButtons);
        this._rightButtons = new createjs.Container();
        this._rightButtons.regX = 200;
        this._stage.addChild(this._rightButtons);
        var button = new Button_1["default"]();
        button.x = 120;
        button.y = 30;
        this._rightButtons.addChild(button);
        createjs.Ticker.addEventListener("tick", function () { return _this._tick(); });
        window.addEventListener("resize", function () { return _this._resize(); });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUEsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFLckM7SUFtQkUsZ0JBQVksUUFBZTtRQW5CN0IsaUJBd0VDO1FBbERHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUduQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUd4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxtQkFBTSxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDZixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR3BDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUM7UUFHN0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBR3hELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBS08sc0JBQUssR0FBYjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUtPLHdCQUFPLEdBQWY7UUFFRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUd2RSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNsRCxDQUFDO0lBQ0gsYUFBQztBQUFELENBeEVBLEFBd0VDLElBQUE7QUFFSyxNQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7O0FDNUU5QjtJQUFvQywwQkFBa0I7SUFTcEQ7UUFDRSxpQkFBTyxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFSCxhQUFDO0FBQUQsQ0FuQkEsQUFtQkMsQ0FuQm1DLFFBQVEsQ0FBQyxTQUFTLEdBbUJyRDtBQW5CRDsyQkFtQkMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vYm90dG9uL0J1dHRvbic7XG5cbi8qKlxuICogWmVucGFk44Gu44Oh44Kk44Oz44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmNsYXNzIFplbnBhZCB7XG5cbiAgLyoqIGNhbnZhc+OBrmlkICovXG4gIHByaXZhdGUgX2NhbnZhc0lkOnN0cmluZztcbiAgLyoqIGNhbnZhcyAqL1xuICBwcml2YXRlIF9jYW52YXM6SFRNTEVsZW1lbnQ7XG4gIC8qKiBzdGFnZSAqL1xuICBwcml2YXRlIF9zdGFnZTpjcmVhdGVqcy5TdGFnZTtcblxuICAvKiog5bem5YG044Kw44Or44O844OXICovXG4gIHByaXZhdGUgX2xlZnRCdXR0b25zOmNyZWF0ZWpzLkNvbnRhaW5lcjtcbiAgLyoqIOWPs+WBtOOCsOODq+ODvOODlyAqL1xuICBwcml2YXRlIF9yaWdodEJ1dHRvbnM6Y3JlYXRlanMuQ29udGFpbmVyO1xuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkcG1JZFxuICAgKi9cbiAgY29uc3RydWN0b3IoY2FudmFzSWQ6c3RyaW5nKSB7XG5cbiAgICAvLyDjgrnjg4bjg7zjgrjjgpLkvZzmiJBcbiAgICB0aGlzLl9jYW52YXNJZCA9IGNhbnZhc0lkO1xuICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX2NhbnZhc0lkKTtcblxuICAgIC8vIOOCueODhuODvOOCuFxuICAgIHRoaXMuX3N0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKHRoaXMuX2NhbnZhc0lkKTtcbiAgICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUodGhpcy5fc3RhZ2UpO1xuXG4gICAgLy8g5bem5YG044Kw44Or44O844OXXG4gICAgdGhpcy5fbGVmdEJ1dHRvbnMgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKCk7XG4gICAgdGhpcy5fc3RhZ2UuYWRkQ2hpbGQodGhpcy5fbGVmdEJ1dHRvbnMpO1xuXG4gICAgLy8g5Y+z5YG0XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5yZWdYID0gMjAwO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX3JpZ2h0QnV0dG9ucyk7XG5cbiAgICAvLyDjg5zjgr/jg7NcbiAgICBsZXQgYnV0dG9uID0gbmV3IEJ1dHRvbigpO1xuICAgIGJ1dHRvbi54ID0gMTIwO1xuICAgIGJ1dHRvbi55ID0gMzA7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLmFkZENoaWxkKGJ1dHRvbik7XG5cbiAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgKCkgPT4gdGhpcy5fdGljaygpKTtcblxuICAgIC8vIOODquOCteOCpOOCulxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuX3Jlc2l6ZSgpKTtcblxuICAgIC8vIOWIneWbnuODquOCteOCpOOCuuWHpueQhlxuICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOavjuODleODrOODvOODoOavjuOBruOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgKi9cbiAgcHJpdmF0ZSBfdGljaygpIHtcbiAgICB0aGlzLl9zdGFnZS51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6rjgrXjgqTjgrpcbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZSgpIHtcbiAgICAvLyBjYW52YXPjgrXjgqTjgrrjgpLlkIjjgo/jgZvjgotcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50V2lkdGgpKTtcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBTdHJpbmcodGhpcy5fY2FudmFzLmNsaWVudEhlaWdodCkpO1xuXG4gICAgLy8g5Y+z5YG044Kw44Or44O844OX44KS5Y+z6ZqF44GrXG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLnggPSB0aGlzLl9jYW52YXMuY2xpZW50V2lkdGg7XG4gIH1cbn1cblxuKDxhbnk+d2luZG93KS5aZW5wYWQgPSBaZW5wYWQ7XG4iLCIvKipcbiAqIOODnOOCv+ODs+OCr+ODqeOCueOBp+OBmeOAglxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuXG4gIC8qKiDjgrfjgqfjgqTjg5cgKi9cbiAgcHJpdmF0ZSBfc2hhcGU6Y3JlYXRlanMuU2hhcGU7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9zaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiNGRjAwMDBcIik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgNTAsIDUwKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9zaGFwZSk7XG4gIH1cblxufVxuIl19
