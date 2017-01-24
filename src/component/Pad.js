import Victor from 'victor';
import EventName from '../event/EventName';
import PublicEventName from '../event/PublicEventName';
import EventPublisher from '../event/EventPublisher';

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
    // ドラッグ中かどうか
    this._isDragging = false;
    // スタートポジション
    this._startPosX = 0;
    this._startPosY = 0;

    this.width = 300;
    this.height = 300;
    this.interactive = true;

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEndOutside = this._onTouchEndOutside.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

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
    this._bg.interactive = true;
    this._bg.buttonMode = true;
    this.addChild(this._bg);

    // スティック
    this._stick = new PIXI.Graphics();
    this._stick.beginFill(0x333333);
    this._stick.drawCircle(0, 0, this._stickRadius);
    this._stick.endFill();
    this._stick.interactive = true;
    this._stick.buttonMode = true;
    this.addChild(this._stick);

    this.on(EventName.MOUSE_DOWN,  this._onTouchStart);
    this.on(EventName.TOUCH_START, this._onTouchStart);
    this.on(EventName.MOUSE_UP,  this._onTouchEnd);
    this.on(EventName.TOUCH_END, this._onTouchEnd);
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

    // ドラッグフラグを折る
    this._touchId = null;
    this._isDragging = false;

    // スティックをもとの位置に戻す
    this._stick.x = 0;
    this._stick.y = 0;

    // 公開リリースイベントを発火
    EventPublisher.instance.publish(PublicEventName.RELEASE_STICK);
  }

  /**
   * タッチスタート時のハンドラーです。
   */
  _onTouchStart(event) {
    // イベントのIDを保持
    this._touchId = event.data.identifier;
    this._isDragging = true;

    let touchPos = event.data.getLocalPosition(this);
    this._startPosX = touchPos.x;
    this._startPosY = touchPos.y;
  }

  /**
   * タッチムーブ時のハンドラーです。
   */
  _onTouchMove(event) {
    // 有効なイベントでなければ処理しない
    if(!this._checkEvent(event)) {
      return;
    }

    if(!this._isDragging) {
      return;
    }

    let posision = event.data.getLocalPosition(this);
    let x = posision.x - this._startPosX,
        y = posision.y - this._startPosY;
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

    // 公開ムーブイベントを発火
    EventPublisher.instance.publish(PublicEventName.MOVE_STICK, {
      x: x,
      y: y,
      angle: angle,
      length: vec.length()
    });
  }

  /**
   * タッチエンド時のハンドラーです。
   */
  _onTouchEnd(event) {
    event.stopPropagation();

    // 有効なイベントでなければ処理しない
    if(!this._checkEvent(event)) {
      return;
    }

    if(!this._isDragging) {
      return;
    }

    this._resetStick();
  }

  /**
   * タッチが枠を外れた際のハンドラーです。
   */
  _onTouchEndOutside(event) {
    event.stopPropagation();

    // 有効なイベントでなければ処理しない
    if(!this._checkEvent(event)) {
      return;
    }

    if(!this._isDragging) {
      return;
    }

    this._resetStick();
  }

  /**
   * タッチイベントを続行できるか確認します。
   */
  _checkEvent(event) {
    if(event.type.match(/mouse/)) {
      return true;
    }

    // イベントIDが違っていれば処理しない
    if(this._touchId == event.data.identifier) {
      return true;
    }

    return false;
  }
}
