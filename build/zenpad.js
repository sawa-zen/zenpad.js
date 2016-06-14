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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvWmVucGFkLnRzIiwic3JjL2JvdHRvbi9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSx1QkFBbUIsaUJBQWlCLENBQUMsQ0FBQTtBQUtyQztJQUFxQiwwQkFBd0I7SUFtQjNDLGdCQUFZLFFBQWU7UUFuQjdCLGlCQWdHQztRQTVFRyxpQkFBTyxDQUFDO1FBR1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUd2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR25DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBR3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUd6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLG1CQUFNLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNoQixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBR3JDLElBQUksT0FBTyxHQUFHLElBQUksbUJBQU0sRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDaEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFHckMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztRQUc3RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFHeEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFLTyxzQkFBSyxHQUFiO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBS08sd0JBQU8sR0FBZjtRQUVFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBR3ZFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQ2xELENBQUM7SUFLTywwQkFBUyxHQUFqQjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUtPLDBCQUFTLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0gsYUFBQztBQUFELENBaEdBLEFBZ0dDLENBaEdvQixRQUFRLENBQUMsZUFBZSxHQWdHNUM7QUFFSyxNQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7O0FDcEc5QjtJQUFvQywwQkFBa0I7SUFXcEQ7UUFDRSxpQkFBTyxDQUFDO1FBVEYsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQVl6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFSCxhQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0Qm1DLFFBQVEsQ0FBQyxTQUFTLEdBc0JyRDtBQXRCRDsyQkFzQkMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vYm90dG9uL0J1dHRvbic7XG5cbi8qKlxuICogWmVucGFk44Gu44Oh44Kk44Oz44Kv44Op44K544Gn44GZ44CCXG4gKi9cbmNsYXNzIFplbnBhZCBleHRlbmRzIGNyZWF0ZWpzLkV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgLyoqIGNhbnZhc+OBrmlkICovXG4gIHByaXZhdGUgX2NhbnZhc0lkOnN0cmluZztcbiAgLyoqIGNhbnZhcyAqL1xuICBwcml2YXRlIF9jYW52YXM6SFRNTEVsZW1lbnQ7XG4gIC8qKiBzdGFnZSAqL1xuICBwcml2YXRlIF9zdGFnZTpjcmVhdGVqcy5TdGFnZTtcblxuICAvKiog5bem5YG044Kw44Or44O844OXICovXG4gIHByaXZhdGUgX2xlZnRCdXR0b25zOmNyZWF0ZWpzLkNvbnRhaW5lcjtcbiAgLyoqIOWPs+WBtOOCsOODq+ODvOODlyAqL1xuICBwcml2YXRlIF9yaWdodEJ1dHRvbnM6Y3JlYXRlanMuQ29udGFpbmVyO1xuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkcG1JZFxuICAgKi9cbiAgY29uc3RydWN0b3IoY2FudmFzSWQ6c3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIOOCueODhuODvOOCuOOCkuS9nOaIkFxuICAgIHRoaXMuX2NhbnZhc0lkID0gY2FudmFzSWQ7XG4gICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fY2FudmFzSWQpO1xuXG4gICAgLy8g44K544OG44O844K4XG4gICAgdGhpcy5fc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UodGhpcy5fY2FudmFzSWQpO1xuICAgIGNyZWF0ZWpzLlRvdWNoLmVuYWJsZSh0aGlzLl9zdGFnZSk7XG5cbiAgICAvLyDlt6blgbTjgrDjg6vjg7zjg5dcbiAgICB0aGlzLl9sZWZ0QnV0dG9ucyA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLl9sZWZ0QnV0dG9ucyk7XG5cbiAgICAvLyDlj7PlgbRcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKCk7XG4gICAgdGhpcy5fcmlnaHRCdXR0b25zLnJlZ1ggPSAxOTA7XG5cbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLl9yaWdodEJ1dHRvbnMpO1xuXG4gICAgLy8gQeODnOOCv+ODs1xuICAgIGxldCBhQnV0dG9uID0gbmV3IEJ1dHRvbigpO1xuICAgIGFCdXR0b24ueCA9IDE1MDtcbiAgICBhQnV0dG9uLnkgPSA4MDtcbiAgICBhQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLl9vbkNsaWNrQSgpKTtcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMuYWRkQ2hpbGQoYUJ1dHRvbik7XG5cbiAgICAvLyBC44Oc44K/44OzXG4gICAgbGV0IGJCdXR0b24gPSBuZXcgQnV0dG9uKCk7XG4gICAgYkJ1dHRvbi54ID0gODA7XG4gICAgYkJ1dHRvbi55ID0gMTEwO1xuICAgIGJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuX29uQ2xpY2tCKCkpO1xuICAgIHRoaXMuX3JpZ2h0QnV0dG9ucy5hZGRDaGlsZChiQnV0dG9uKTtcblxuICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCAoKSA9PiB0aGlzLl90aWNrKCkpO1xuXG4gICAgLy8g44Oq44K144Kk44K6XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5fcmVzaXplKCkpO1xuXG4gICAgLy8g5Yid5Zue44Oq44K144Kk44K65Yem55CGXG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICAvKipcbiAgICog5q+O44OV44Os44O844Og5q+O44Gu44Ki44OL44Oh44O844K344On44OzXG4gICAqL1xuICBwcml2YXRlIF90aWNrKCkge1xuICAgIHRoaXMuX3N0YWdlLnVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODquOCteOCpOOCulxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzaXplKCkge1xuICAgIC8vIGNhbnZhc+OCteOCpOOCuuOCkuWQiOOCj+OBm+OCi1xuICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgU3RyaW5nKHRoaXMuX2NhbnZhcy5jbGllbnRXaWR0aCkpO1xuICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIFN0cmluZyh0aGlzLl9jYW52YXMuY2xpZW50SGVpZ2h0KSk7XG5cbiAgICAvLyDlj7PlgbTjgrDjg6vjg7zjg5fjgpLlj7PpmoXjgatcbiAgICB0aGlzLl9yaWdodEJ1dHRvbnMueCA9IHRoaXMuX2NhbnZhcy5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBB44Oc44K/44Oz5oq85LiL5pmC44Gu44OP44Oz44OJ44Op44O844Gn44GZ44CCXG4gICAqL1xuICBwcml2YXRlIF9vbkNsaWNrQSgpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJhQ2xpY2tcIik7XG4gIH1cblxuICAvKipcbiAgICogQuODnOOCv+ODs+aKvOS4i+aZguOBruODj+ODs+ODieODqeODvOOBp+OBmeOAglxuICAgKi9cbiAgcHJpdmF0ZSBfb25DbGlja0IoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwiYkNsaWNrXCIpO1xuICB9XG59XG5cbig8YW55PndpbmRvdykuWmVucGFkID0gWmVucGFkO1xuIiwiLyoqXG4gKiDjg5zjgr/jg7Pjgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcblxuICAvKiog5bmFICovXG4gIHByaXZhdGUgX3dpZHRoOm51bWJlciA9IDU1O1xuICAvKiog44K344Kn44Kk44OXICovXG4gIHByaXZhdGUgX3NoYXBlOmNyZWF0ZWpzLlNoYXBlO1xuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7xcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8g44K344Kn44Kk44OXXG4gICAgdGhpcy5fc2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoXCIjOGMzNTY4XCIpO1xuICAgIHRoaXMuX3NoYXBlLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5fd2lkdGggLyAyKTtcbiAgICB0aGlzLl9zaGFwZS5ncmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9zaGFwZSk7XG4gIH1cblxufVxuIl19
