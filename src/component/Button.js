import EventName from '../event/EventName';
import EventPublisher from '../event/EventPublisher';
import PublicEventName from '../event/PublicEventName';

/**
 * ボタンクラスです。
 */
export default class Button extends PIXI.Container {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(type = 'A', color = 0x8c3568) {
    super();

    // テキスト
    this._type = type;
    // カラー
    this._color = color;
    // 幅
    this._width = 55;
    // 押し込まれているかどうか
    this._isPushed = false;

    this._onTouchEnd = this._onTouchEnd.bind(this);
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
    this._shape.on(EventName.MOUSE_UP,  this._onTouchEnd);
    this._shape.on(EventName.TOUCH_END, this._onTouchEnd);
    this._shape.on(EventName.MOUSE_DOWN,  this._onTouchStart);
    this._shape.on(EventName.TOUCH_START, this._onTouchStart);
    this._shape.on(EventName.MOUSE_UP_OUTSIDE,  this._onTouchEndOutside);
    this._shape.on(EventName.TOUCH_END_OUTSIDE, this._onTouchEndOutside);
  }

  /**
   * 破棄します。
   */
  dispose() {
    if(this._shape) {
      this._shape.removeAllListeners();
      this.removeChild(this._shape);
      this._shape.destroy();
      this._shape = null;
    }
    this.destroy();
  }

  /**
   * タッチ終了時のハンドラーです。
   */
  _onTouchEnd(event) {
    this._resetByTouchEnd();
  }

  /**
   * タッチ開始時のハンドラーです。
   */
  _onTouchStart(event) {
    // 既に押し込まれていれば処理しない
    if(this._isPushed) {
      return;
    }

    // ボタンを凹ます
    this._isPushed = true;
    this._shape.y = 5;

    // 公開タッチスタートイベントを発火
    let touchstartEventName = PublicEventName.TOUCH_START + this._type;
    EventPublisher.instance.publish(touchstartEventName);
  }

  /**
   * タッチが枠を外れた際のハンドラーです。
   */
  _onTouchEndOutside(event) {
    this._resetByTouchEnd();
  }

  /**
   * タッチエンドによるリセットをします。
   */
  _resetByTouchEnd() {
    // ボタンを戻す
    this._shape.y = 0;
    this._isPushed = false;
    // 公開クリックイベントを発火
    let clickEventName = PublicEventName.CLICK + this._type;
    EventPublisher.instance.publish(clickEventName);
    // 公開タッチエンドイベントを発火
    let touchEndEventName = PublicEventName.TOUCH_END + this._type;
    EventPublisher.instance.publish(touchEndEventName);
  }
}
