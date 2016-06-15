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
  /** 操作中 */
  private _isTouching:boolean = false;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

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
    if(angle >= -45 && angle <= 45) {
      console.info('右');
    } else if(angle > 45 && angle < 135) {
      console.info('下');
    } else if(angle < -45 && angle > -135) {
      console.info('上');
    } else {
      console.info('左');
    }
  }

  /**
   * マウスアップ時のハンドラーです。
   */
  private _onMouseUp() {
    console.info("asdfads");
    this._stick.x = 0;
    this._stick.y = 0;
  }

}
