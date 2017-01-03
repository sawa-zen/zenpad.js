import EventName from '../event/EventName';

/**
 * ボタンクラスです。
 */
export default class Button extends PIXI.Container {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(type, color) {
    super();

    // テキスト
    this._type = type || 'A';
    // カラー
    this._color = color || 0x8c3568;
    // 幅
    this._width = 55;
    // 押し込まれているかどうか
    this._isPushed = false;

    this._onClick = this._onClick.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchEndOutside = this._onTouchEndOutside.bind(this);

    // シェイプ
    this._shape = new PIXI.Graphics();
    this._shape.beginFill(this._color);
    this._shape.drawCircle(0, 0, this._width / 2);
    this._shape.endFill();
    this._shape.interactive = true;
    this._shape.buttonMode = true;
    this.addChild(this._shape);

    // テキスト
    let text = new PIXI.Text(this._type, {
      fontFamily: 'Arial',
      fontSize: '30px',
      fill: 0xffffff
    });
    text.x = -10;
    text.y = -16;
    text.alpha = 0.2;
    this._shape.addChild(text);

    // イベント
    this._shape.on(EventName.CLICK,     this._onClick);
    this._shape.on(EventName.TOUCH_END, this._onClick);
    this._shape.on(EventName.MOUSE_DOWN,  this._onTouchStart);
    this._shape.on(EventName.TOUCH_START, this._onTouchStart);
    this._shape.on(EventName.MOUSE_UP_OUTSIDE,  this._onTouchEndOutside);
    this._shape.on(EventName.TOUCH_END_OUTSIDE, this._onTouchEndOutside);
  }

  /**
   * ボタン押下時のハンドラーです。
   */
  _onClick(event) {
    // クリックイベントを発火
    this.emit(EventName.CLICK);

    // ボタンを戻す
    this._shape.y = 0;
    this._isPushed = false;
  }

  /**
   * タッチスタート
   */
  _onTouchStart() {
    // 既に押し込まれていれば処理しない
    if(this._isPushed) {
      return;
    }

    // ボタンを凹ます
    this._isPushed = true;
    this._shape.y = 5;
  }

  /**
   * タッチが枠を外れた際のハンドラーです。
   */
  _onTouchEndOutside() {
    // ボタンを戻す
    this._shape.y = 0;
    this._isPushed = false;
  }
}
