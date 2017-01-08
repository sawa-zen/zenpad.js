import Victor from 'victor';
import EventName from '../event/EventName';
import PublicEvent from '../event/PublicEvent';

/**
 * アナログパッドクラスです。
 */
export default class Pad extends PIXI.Container {

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

    this.width = 300;
    this.height = 300;
    this.interactive = true;

    this._onClick = this._onClick.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEndOutside = this._onTouchEndOutside.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    // タップエリア
    this._tapArea = new PIXI.Graphics();
    this._tapArea.beginFill(0xff0000);
    this._tapArea.drawRect(-250, -250, 500, 500);
    this._tapArea.endFill();
    this._tapArea.alpha = 0;
    this._tapArea.interactive = true;
    this.addChild(this._tapArea);

    // 背景
    this._bg = new PIXI.Graphics();
    this._bg.beginFill(0xabafb8);
    this._bg.drawCircle(0, 0, this._radius);
    this._bg.endFill();
    this.addChild(this._bg);

    // スティック
    this._stick = new PIXI.Graphics();
    this._stick.beginFill(0x333333);
    this._stick.drawCircle(0, 0, this._stickRadius);
    this._stick.endFill();
    this._stick.interactive = true;
    this._stick.buttonMode = true;
    this.addChild(this._stick);

    this._stick.on(EventName.MOUSE_DOWN,  this._onClick);
    this._stick.on(EventName.TOUCH_START, this._onClick);
    this.on(EventName.MOUSE_UP,  this._onMouseUp);
    this.on(EventName.TOUCH_END, this._onMouseUp);
    this.on(EventName.MOUSE_MOVE, this._onTouchMove);
    this.on(EventName.TOUCH_MOVE, this._onTouchMove);
    this.on(EventName.MOUSE_UP_OUTSIDE,  this._onTouchEndOutside);
    this.on(EventName.TOUCH_END_OUTSIDE, this._onTouchEndOutside);
  }

  /**
   * 破棄します。
   */
  dispose() {
    if(this._stick) {
      this._stick.removeAllListeners();
      this.removeChild(this._stick);
      this._stick.destroy();
      this._stick = null;
    }
    this.removeAllListeners();
  }

  /**
   * スティックをもとに戻す
   */
  _resetStick() {

    // ドラッグ中でなければ処理しない
    if(!this._touchId) {
      return;
    }

    // ドラッグフラグを折る
    this._touchId = null;

    // スティックをもとの位置に戻す
    this._stick.x = 0;
    this._stick.y = 0;

    this._currentdirection = null;

    // スティックリリースイベント発火
    this.emit(EventName.RELEASE_STICK);
  }

  /**
   * クリック時のハンドラーです。
   */
  _onClick(event) {
    // イベントのIDを保持
    this._touchId = event.data.identifier;
  }

  /**
   * タッチムーブ時のハンドラーです。
   */
  _onTouchMove(event) {
    // イベントIDが違っていれば処理しない
    if(this._touchId != event.data.identifier) {
      return;
    }

    let posision = event.data.getLocalPosition(this);
    let x = posision.x,
        y = posision.y;
    let vec = new Victor(x, y);
    let angle = vec.angle() * 180 / Math.PI;

    // 枠外に出ていれば枠内に収める
    if(vec.length() > this._radius - this._stickRadius) {
      let v = vec.normalize().multiplyScalar(this._radius - this._stickRadius);
      this._stick.x = v.x;
      this._stick.y = v.y;
    } else {
      this._stick.x = x;
      this._stick.y = y;
    }

    // スティックムーブイベントを発火
    this.emit(EventName.MOVE_STICK, { x: x, y: y, angle: angle, length: vec.length() });
  }

  /**
   * マウスアップ時のハンドラーです。
   */
  _onMouseUp(event) {
    event.stopPropagation();

    // イベントIDが違っていれば処理しない
    if(this._touchId != event.data.identifier) {
      return;
    }

    this._resetStick();
  }

  /**
   * タッチが枠を外れた際のハンドラーです。
   */
  _onTouchEndOutside(event) {
    event.stopPropagation();

    // イベントIDが違っていれば処理しない
    if(this._touchId != event.data.identifier) {
      return;
    }

    this._resetStick();
  }
}
