import EventName from '../event/EventName';

/**
 * ボタンクラスです。
 */
export default class Button extends createjs.Container {

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
    this._shape = new createjs.Shape();
    this._shape.graphics.beginFill('#8c3568');
    this._shape.graphics.drawCircle(0, 0, this._width / 2);
    this._shape.graphics.endFill();
    this.addChild(this._shape);
    this._shape.addEventListener(EventName.CLICK, this._onClick);
  }

  /**
   * ボタン押下時のハンドラーです。
   */
  _onClick(event) {
  }
}
