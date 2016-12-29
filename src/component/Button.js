import EventName from '../event/EventName';

/**
 * ボタンクラスです。
 */
export default class Button extends PIXI.Container {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 幅
    this._width = 55;

    this._onClick = this._onClick.bind(this);

    // シェイプ
    this._shape = new PIXI.Graphics();
    this._shape.beginFill(0x8c3568);
    this._shape.drawCircle(0, 0, this._width / 2);
    this._shape.endFill();
    this._shape.interactive = true;
    this._shape.buttonMode = true;
    this.addChild(this._shape);
    this._shape.on(EventName.CLICK, this._onClick);
    this._shape.on(EventName.TOUCH_END, this._onClick);
  }

  /**
   * ボタン押下時のハンドラーです。
   */
  _onClick(event) {
    // クリックイベントを発火
    this.emit(EventName.CLICK);
  }
}
