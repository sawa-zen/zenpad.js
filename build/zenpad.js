(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button_1 = require('./botton/Button');
var Pad_1 = require('./pad/Pad');
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
        var pad = new Pad_1["default"]();
        pad.x = 80;
        pad.y = 90;
        this._leftButtons.addChild(pad);
        var aButton = new Button_1["default"]();
        aButton.x = 150;
        aButton.y = 80;
        aButton.addEventListener("click", function () { return _this._onClickA(); });
        this._rightButtons.addChild(aButton);
        var bButton = new Button_1["default"]();
        bButton.x = 80;
        bButton.y = 110;
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

},{"./botton/Button":2,"./pad/Pad":3}],2:[function(require,module,exports){
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
var Pad = (function (_super) {
    __extends(Pad, _super);
    function Pad() {
        var _this = this;
        _super.call(this);
        this._isTouching = false;
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#abafb8');
        bg.graphics.drawCircle(0, 0, 60);
        bg.graphics.endFill();
        this.addChild(bg);
        this._stick = new createjs.Shape();
        this._stick.graphics.beginFill('#333333');
        this._stick.graphics.drawCircle(0, 0, 30);
        this._stick.graphics.endFill();
        this.addChild(this._stick);
        this.addEventListener('pressmove', function (event) { return _this._onTouchMove(event); });
        this.addEventListener('pressup', function () { return _this._onMouseUp(); });
    }
    Pad.prototype._onTouchMove = function (event) {
        console.info(event.localX, event.localY);
        this._stick.x = event.localX;
        this._stick.y = event.localY;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiLCJzcmMvcGFkL1BhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLHVCQUFtQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3JDLG9CQUFnQixXQUFXLENBQUMsQ0FBQTtBQUs1QjtJQUFxQiwwQkFBd0I7SUFtQjNDLGdCQUFZLFFBQWU7UUFuQjdCLGlCQXFHQztRQWpGRyxpQkFBTyxDQUFDO1FBR1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUd2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR25DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBR3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUd6QyxJQUFJLEdBQUcsR0FBRyxJQUFJLGdCQUFHLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUs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LEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFLTywwQkFBWSxHQUFwQixVQUFxQixLQUF5QjtRQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBS08sd0JBQVUsR0FBbEI7UUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVILFVBQUM7QUFBRCxDQW5EQSxBQW1EQyxDQW5EZ0MsUUFBUSxDQUFDLFNBQVMsR0FtRGxEO0FBbkREO3dCQW1EQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9ib3R0b24vQnV0dG9uJztcbmltcG9ydCBQYWQgZnJvbSAnLi9wYWQvUGFkJztcblxuLyoqXG4gKiBaZW5wYWTjga7jg6HjgqTjg7Pjgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuY2xhc3MgWmVucGFkIGV4dGVuZHMgY3JlYXRlanMuRXZlbnREaXNwYXRjaGVyIHtcblxuICAvKiogY2FudmFz44GuaWQgKi9cbiAgcHJpdmF0ZSBfY2FudmFzSWQ6c3RyaW5nO1xuICAvKiogY2FudmFzICovXG4gIHByaXZhdGUgX2NhbnZhczpIVE1MRWxlbWVudDtcbiAgLyoqIHN0YWdlICovXG4gIHByaXZhdGUgX3N0YWdlOmNyZWF0ZWpzLlN0YWdlO1xuXG4gIC8qKiDlt6blgbTjgrDjg6vjg7zjg5cgKi9cbiAgcHJpdmF0ZSBfbGVmdEJ1dHRvbnM6Y3JlYXRlanMuQ29udGFpbmVyO1xuICAvKiog5Y+z5YG044Kw44Or44O844OXICovXG4gIHByaXZhdGUgX3JpZ2h0QnV0dG9uczpjcmVhdGVqcy5Db250YWluZXI7XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv+ODvFxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRwbUlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXNJZDpzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8g44K544OG44O844K444KS5L2c5oiQXG4gICAgdGhpcy5fY2FudmFzSWQgPSBjYW52YXNJZDtcbiAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9jYW52YXNJZCk7XG5cbiAgICAvLyDjgrnjg4bjg7zjgrhcbiAgICB0aGlzLl9zdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSh0aGlzLl9jYW52YXNJZCk7XG4gICAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHRoaXMuX3N0YWdlKTtcblxuICAgIC8vIOW3puWBtOOCsOODq+ODvOODl1xuICAgIHRoaXMuX2xlZnRCdXR0b25zID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMuX2xlZnRCdXR0b25zKTtcblxuICAgIC8vIOWPs+WBtOOCsOODq+ODvOODl1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucyA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMucmVnWCA9IDE5MDtcbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLl9yaWdodEJ1dHRvbnMpO1xuXG4gICAgLy8g44Ki44OK44Ot44Kw44OR44OD44OJXG4gICAgbGV0IHBhZCA9IG5ldyBQYWQoKTtcbiAgICBwYWQueCA9IDgwO1xuICAgIHBhZC55ID0gOTA7XG4gICAgdGhpcy5fbGVmdEJ1dHRvbnMuYWRkQ2hpbGQocGFkKTtcblxuICAgIC8vIEHjg5zjgr/jg7NcbiAgICBsZXQgYUJ1dHRvbiA9IG5ldyBCdXR0b24oKTtcbiAgICBhQnV0dG9uLnggPSAxNTA7XG4gICAgYUJ1dHRvbi55ID0gODA7XG4gICAgYUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5fb25DbGlja0EoKSk7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLmFkZENoaWxkKGFCdXR0b24pO1xuXG4gICAgLy8gQuODnOOCv+ODs1xuICAgIGxldCBiQnV0dG9uID0gbmV3IEJ1dHRvbigpO1xuICAgIGJCdXR0b24ueCA9IDgwO1xuICAgIGJCdXR0b24ueSA9IDExMDtcbiAgICBiQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLl9vbkNsaWNrQigpKTtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMuYWRkQ2hpbGQoYkJ1dHRvbik7XG5cbiAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgKCkgPT4gdGhpcy5fdGljaygpKTtcblxuICAgIC8vIOODquOCteOCpOOCulxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuX3Jlc2l6ZSgpKTtcblxuICAgIC8vIOWIneWbnuODquOCteOCpOOCuuWHpueQhlxuICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOavjuODleODrOODvOODoOavjuOBruOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgKi9cbiAgcHJpdmF0ZSBfdGljaygpIHtcbiAgICB0aGlzLl9zdGFnZS51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6rjgrXjgqTjgrpcbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZSgpIHtcbiAgICAvLyBjYW52YXPjgrXjgqTjgrrjgpLlkIjjgo/jgZvjgotcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50V2lkdGgpKTtcbiAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBTdHJpbmcodGhpcy5fY2FudmFzLmNsaWVudEhlaWdodCkpO1xuXG4gICAgLy8g5Y+z5YG044Kw44Or44O844OX44KS5Y+z6ZqF44GrXG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLnggPSB0aGlzLl9jYW52YXMuY2xpZW50V2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogQeODnOOCv+ODs+aKvOS4i+aZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgcHJpdmF0ZSBfb25DbGlja0EoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwiYUNsaWNrXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIELjg5zjgr/jg7PmirzkuIvmmYLjga7jg4/jg7Pjg4njg6njg7zjgafjgZnjgIJcbiAgICovXG4gIHByaXZhdGUgX29uQ2xpY2tCKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcImJDbGlja1wiKTtcbiAgfVxufVxuXG4oPGFueT53aW5kb3cpLlplbnBhZCA9IFplbnBhZDtcbiIsIi8qKlxuICog44Oc44K/44Oz44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG5cbiAgLyoqIOW5hSAqL1xuICBwcml2YXRlIF93aWR0aDpudW1iZXIgPSA1NTtcbiAgLyoqIOOCt+OCp+OCpOODlyAqL1xuICBwcml2YXRlIF9zaGFwZTpjcmVhdGVqcy5TaGFwZTtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOOCt+OCp+OCpOODl1xuICAgIHRoaXMuX3NoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzhjMzU2OFwiKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuX3dpZHRoIC8gMik7XG4gICAgdGhpcy5fc2hhcGUuZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fc2hhcGUpO1xuICB9XG5cbn1cbiIsIi8qKlxuICog44Ki44OK44Ot44Kw44OR44OD44OJ44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZCBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG5cbiAgLyoqIOOCueODhuOCo+ODg+OCryAqL1xuICBwcml2YXRlIF9zdGljazpjcmVhdGVqcy5TaGFwZTtcbiAgLyoqIOaTjeS9nOS4rSAqL1xuICBwcml2YXRlIF9pc1RvdWNoaW5nOmJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/44O8XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOiDjOaZr1xuICAgIGxldCBiZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIGJnLmdyYXBoaWNzLmJlZ2luRmlsbCgnI2FiYWZiOCcpO1xuICAgIGJnLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgNjApO1xuICAgIGJnLmdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLmFkZENoaWxkKGJnKTtcblxuICAgIC8vIOOCueODhuOCo+ODg+OCr1xuICAgIHRoaXMuX3N0aWNrID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5fc3RpY2suZ3JhcGhpY3MuYmVnaW5GaWxsKCcjMzMzMzMzJyk7XG4gICAgdGhpcy5fc3RpY2suZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCAzMCk7XG4gICAgdGhpcy5fc3RpY2suZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fc3RpY2spO1xuXG4gICAgLy8g44K/44OD44OB44Kk44OZ44Oz44OIXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdwcmVzc21vdmUnLCAoZXZlbnQ6Y3JlYXRlanMuTW91c2VFdmVudCkgPT4gdGhpcy5fb25Ub3VjaE1vdmUoZXZlbnQpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3ByZXNzdXAnLCAoKSA9PiB0aGlzLl9vbk1vdXNlVXAoKSk7XG4gIH1cblxuICAvKipcbiAgICog44K/44OD44OB44Og44O844OW5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vblRvdWNoTW92ZShldmVudDpjcmVhdGVqcy5Nb3VzZUV2ZW50KSB7XG4gICAgY29uc29sZS5pbmZvKGV2ZW50LmxvY2FsWCwgZXZlbnQubG9jYWxZKTtcbiAgICB0aGlzLl9zdGljay54ID0gZXZlbnQubG9jYWxYO1xuICAgIHRoaXMuX3N0aWNrLnkgPSBldmVudC5sb2NhbFk7XG4gIH1cblxuICAvKipcbiAgICog44Oe44Km44K544Ki44OD44OX5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vbk1vdXNlVXAoKSB7XG4gICAgY29uc29sZS5pbmZvKFwiYXNkZmFkc1wiKTtcbiAgICB0aGlzLl9zdGljay54ID0gMDtcbiAgICB0aGlzLl9zdGljay55ID0gMDtcbiAgfVxuXG59XG4iXX0=
