(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button_1 = require('./botton/Button');
var Zenpad = (function (_super) {
    __extends(Zenpad, _super);
    function Zenpad(canvasId) {
        var _this = this;
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
        var aButton = new Button_1["default"]();
        aButton.x = 140;
        aButton.y = 80;
        aButton.addEventListener("click", function () { return _this._onClickA(); });
        this._rightButtons.addChild(aButton);
        var bButton = new Button_1["default"]();
        bButton.x = 80;
        bButton.y = 130;
        bButton.addEventListener("click", function () { return _this._onClickB(); });
        this._rightButtons.addChild(bButton);
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
    Zenpad.prototype._onClickA = function () {
        this.dispatchEvent("aClick");
    };
    Zenpad.prototype._onClickB = function () {
        this.dispatchEvent("bClick");
    };
    return Zenpad;
}(createjs.EventDispatcher));
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
        this._width = 50;
        this._shape = new createjs.Shape();
        this._shape.graphics.beginFill("#FF0000");
        this._shape.graphics.drawRect(0, 0, this._width, this._width);
        this._shape.graphics.endFill();
        this.addChild(this._shape);
        this.regX = this.regY = this._width / 2;
    }
    return Button;
}(createjs.Container));
exports.__esModule = true;
exports["default"] = Button;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSx1QkFBbUIsaUJBQWlCLENBQUMsQ0FBQTtBQUtyQztJQUFxQiwwQkFBd0I7SUFtQjNDLGdCQUFZLFFBQWU7UUFuQjdCLGlCQWdHQztRQTVFRyxpQkFBTyxDQUFDO1FBR1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUd2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR25DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBR3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUd6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLG1CQUFNLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNoQixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNm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LCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9ib3R0b24vQnV0dG9uJztcblxuLyoqXG4gKiBaZW5wYWTjga7jg6HjgqTjg7Pjgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuY2xhc3MgWmVucGFkIGV4dGVuZHMgY3JlYXRlanMuRXZlbnREaXNwYXRjaGVyIHtcblxuICAvKiogY2FudmFz44GuaWQgKi9cbiAgcHJpdmF0ZSBfY2FudmFzSWQ6c3RyaW5nO1xuICAvKiogY2FudmFzICovXG4gIHByaXZhdGUgX2NhbnZhczpIVE1MRWxlbWVudDtcbiAgLyoqIHN0YWdlICovXG4gIHByaXZhdGUgX3N0YWdlOmNyZWF0ZWpzLlN0YWdlO1xuXG4gIC8qKiDlt6blgbTjgrDjg6vjg7zjg5cgKi9cbiAgcHJpdmF0ZSBfbGVmdEJ1dHRvbnM6Y3JlYXRlanMuQ29udGFpbmVyO1xuICAvKiog5Y+z5YG044Kw44Or44O844OXICovXG4gIHByaXZhdGUgX3JpZ2h0QnV0dG9uczpjcmVhdGVqcy5Db250YWluZXI7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRwbUlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXNJZDpzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8g44K544OG44O844K444KS5L2c5oiQXG4gICAgdGhpcy5fY2FudmFzSWQgPSBjYW52YXNJZDtcbiAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9jYW52YXNJZCk7XG5cbiAgICAvLyDjgrnjg4bjg7zjgrhcbiAgICB0aGlzLl9zdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSh0aGlzLl9jYW52YXNJZCk7XG4gICAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHRoaXMuX3N0YWdlKTtcblxuICAgIC8vIOW3puWBtOOCsOODq+ODvOODl1xuICAgIHRoaXMuX2xlZnRCdXR0b25zID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX2xlZnRCdXR0b25zKTtcblxuICAgIC8vIOWPs+WBtFxuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucyA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMucmVnWCA9IDE5MDtcblxuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX3JpZ2h0QnV0dG9ucyk7XG5cbiAgICAvLyBB44Oc44K/44OzXG4gICAgbGV0IGFCdXR0b24gPSBuZXcgQnV0dG9uKCk7XG4gICAgYUJ1dHRvbi54ID0gMTQwO1xuICAgIGFCdXR0b24ueSA9IDgwO1xuICAgIGFCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuX29uQ2xpY2tBKCkpO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5hZGRDaGlsZChhQnV0dG9uKTtcblxuICAgIC8vIELjg5zjgr/jg7NcbiAgICBsZXQgYkJ1dHRvbiA9IG5ldyBCdXR0b24oKTtcbiAgICBiQnV0dG9uLnggPSA4MDtcbiAgICBiQnV0dG9uLnkgPSAxMzA7XG4gICAgYkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5fb25DbGlja0IoKSk7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLmFkZENoaWxkKGJCdXR0b24pO1xuXG4gICAgLy8g44Ki44OL44Oh44O844K344On44OzXG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsICgpID0+IHRoaXMuX3RpY2soKSk7XG5cbiAgICAvLyDjg6rjgrXjgqTjgrpcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLl9yZXNpemUoKSk7XG5cbiAgICAvLyDliJ3lm57jg6rjgrXjgqTjgrrlh6bnkIZcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmr47jg5Xjg6zjg7zjg6Dmr47jga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICovXG4gIHByaXZhdGUgX3RpY2soKSB7XG4gICAgdGhpcy5fc3RhZ2UudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oq44K144Kk44K6XG4gICAqL1xuICBwcml2YXRlIF9yZXNpemUoKSB7XG4gICAgLy8gY2FudmFz44K144Kk44K644KS5ZCI44KP44Gb44KLXG4gICAgdGhpcy5fY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBTdHJpbmcodGhpcy5fY2FudmFzLmNsaWVudFdpZHRoKSk7XG4gICAgdGhpcy5fY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgU3RyaW5nKHRoaXMuX2NhbnZhcy5jbGllbnRIZWlnaHQpKTtcblxuICAgIC8vIOWPs+WBtOOCsOODq+ODvOODl+OCkuWPs+maheOBq1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy54ID0gdGhpcy5fY2FudmFzLmNsaWVudFdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIEHjg5zjgr/jg7PmirzkuIvmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIHByaXZhdGUgX29uQ2xpY2tBKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcImFDbGlja1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBC44Oc44K/44Oz5oq85LiL5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vbkNsaWNrQigpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJiQ2xpY2tcIik7XG4gIH1cbn1cblxuKDxhbnk+d2luZG93KS5aZW5wYWQgPSBaZW5wYWQ7XG4iLCIvKipcbiAqIOODnOOCv+ODs+OCr+ODqeOCueOBp+OBmeOAglxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuXG4gIC8qKiDluYUgKi9cbiAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gNTA7XG4gIC8qKiDjgrfjgqfjgqTjg5cgKi9cbiAgcHJpdmF0ZSBfc2hhcGU6Y3JlYXRlanMuU2hhcGU7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyDjgrfjgqfjgqTjg5dcbiAgICB0aGlzLl9zaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiNGRjAwMDBcIik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgdGhpcy5fd2lkdGgsIHRoaXMuX3dpZHRoKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9zaGFwZSk7XG5cbiAgICB0aGlzLnJlZ1ggPSB0aGlzLnJlZ1kgPSB0aGlzLl93aWR0aCAvIDI7XG4gIH1cblxufVxuIl19
