import EventName from '../event/EventName';
import EventManager from '../event/EventManager';

/**
 * ボタンクラスです。
 */
export default class Button extends createjs.Container {

  /** クリック時のイベント名 */
  private _eventName:string;

  /** 幅 */
  private _width:number = 55;
  /** シェイプ */
  private _shape:createjs.Shape;

  /** イベントマネージャー */
  private _eventManager:EventManager;

  /**
   * コンストラクター
   * @constructor
   */
  constructor(eventName:string) {
    super();

    // イベント名
    this._eventName = eventName;
    // イベントマネージャー
    this._eventManager = EventManager.getInstance();

    // シェイプ
    this._shape = new createjs.Shape();
    this._shape.graphics.beginFill('#8c3568');
    this._shape.graphics.drawCircle(0, 0, this._width / 2);
    this._shape.graphics.endFill();
    this.addChild(this._shape);
    this._onClick = this._onClick.bind(this);
    this._shape.addEventListener(EventName.CLICK, this._onClick);
  }

  /**
   * ボタン押下時のハンドラーです。
   */
  private _onClick(event:createjs.MouseEvent):void {
    this._eventManager.dispatch(this._eventName);
  }

}
