import PublicEventName from '../event/PublicEventName';
import Victor from 'victor';

/**
 * アナログパッドクラスです。
 */
export default class Pad extends createjs.Container {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 半径
    this._radius = 60;
    // スティクの半径
    this._stickRadius = 30;

    this._onTouchMove = this._onTouchMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    // 背景
    let bg = new createjs.Shape();
    bg.graphics.beginFill('#abafb8');
    bg.graphics.drawCircle(0, 0, this._radius);
    bg.graphics.endFill();
    this.addChild(bg);

    // スティック
    this._stick = new createjs.Shape();
    this._stick.graphics.beginFill('#333333');
    this._stick.graphics.drawCircle(0, 0, this._stickRadius);
    this._stick.graphics.endFill();
    this.addChild(this._stick);

    // タッチイベント
    this.addEventListener('pressmove', this._onTouchMove);
    this.addEventListener('pressup', this._onMouseUp);
  }

  /**
   * タッチムーブ時のハンドラーです。
   */
  _onTouchMove(event) {
    let x = event.localX,
        y = event.localY;
    let vec = new Victor(x, y);

    // 枠外に出ていれば枠内に収める
    if(vec.length() > this._radius - this._stickRadius) {
      let v = vec.normalize().multiplyScalar(this._radius - this._stickRadius);
      this._stick.x = v.x;
      this._stick.y = v.y;
    } else {
      this._stick.x = event.localX;
      this._stick.y = event.localY;
    }

    // 十字のどちらを向いているか判定
    let angle = vec.angle() * 180 / Math.PI;
    let direction = "";
    if(angle >= -45 && angle <= 45) {
      // 右
      direction = PublicEventName.PUSH_RIGHT;
    } else if(angle > 45 && angle < 135) {
      // 下
      direction = PublicEventName.PUSH_BOTTOM;
    } else if(angle < -45 && angle > -135) {
      // 上
      direction = PublicEventName.PUSH_TOP;
    } else {
      // 左
      direction = PublicEventName.PUSH_LEFT;
    }

    // 方向が変わったらイベントを発火させる
    if(this._currentDirection != direction) {
      this._currentDirection = direction;
    }
  }

  /**
   * マウスアップ時のハンドラーです。
   */
  _onMouseUp() {
    this._stick.x = 0;
    this._stick.y = 0;
    this._currentDirection = null;
  }
}
