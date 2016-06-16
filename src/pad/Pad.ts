import EventManager from '../event/EventManager';
import PublicEventName from '../event/PublicEventName';

/**
 * アナログパッドクラスです。
 */
export default class Pad extends createjs.Container {

  /** 半径 */
  private _radius:number = 60;
  /** スティクの半径 */
  private _stickRadius:number = 30;

  /** スティック */
  private _stick:createjs.Shape;
  /** 現在倒している方向 */
  private _currentDirection:string;

  /** イベントマネージャー */
  private _eventManager:EventManager;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // イベント発火
    this._eventManager = EventManager.getInstance();

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
    this.addEventListener('pressmove', (event:createjs.MouseEvent) => this._onTouchMove(event));
    this.addEventListener('pressup', () => this._onMouseUp());
  }

  /**
   * タッチムーブ時のハンドラーです。
   */
  private _onTouchMove(event:createjs.MouseEvent) {
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
    let direction:string;
    if(angle >= -45 && angle <= 45) {
      direction = PublicEventName.PUSH_RIGHT;
    } else if(angle > 45 && angle < 135) {
      direction = PublicEventName.PUSH_BOTTOM;
    } else if(angle < -45 && angle > -135) {
      direction = PublicEventName.PUSH_TOP;
    } else {
      direction = PublicEventName.PUSH_LEFT;
    }

    // 方向が変わったらイベントを発火させる
    if(this._currentDirection != direction) {
      this._currentDirection = direction;
      this._eventManager.dispatch(direction);
    }
  }

  /**
   * マウスアップ時のハンドラーです。
   */
  private _onMouseUp() {
    this._stick.x = 0;
    this._stick.y = 0;
    this._currentDirection = null;
    this._eventManager.dispatch(PublicEventName.RELEASE_PAD);
  }

}
