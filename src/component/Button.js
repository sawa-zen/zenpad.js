import EventName from '../event/EventName';

/**
 * ボタンクラスです。
 */
export default class Button extends PIXI.Container {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(eventName) {
    super();

    // 幅
    this._width = 55;

    // イベント名
    this._eventName = eventName;

    this._onClick = this._onClick.bind(this);

    // シェイプ
    this._shape = new PIXI.Graphics();
    this._shape.beginFill(0x8c3568);
    this._shape.drawCircle(0, 0, this._width / 2);
    this._shape.endFill();
    this._shape.interactive = true;
    this._shape.buttonMode = true;
    // this._shape.graphics.beginFill('#8c3568');
    // this._shape.graphics.drawCircle(0, 0, this._width / 2);
    // this._shape.graphics.endFill();
    this.addChild(this._shape);
    this._shape.on(EventName.CLICK, this._onClick);
  }

  /**
   * ボタン押下時のハンドラーです。
   */
  _onClick(event) {
    // クリックイベントを発火
    this.emit(EventName.CLCIK);
  }
}
