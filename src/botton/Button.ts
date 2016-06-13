/**
 * ボタンクラスです。
 */
export default class Button extends createjs.Container {

  /** シェイプ */
  private _shape:createjs.Shape;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    this._shape = new createjs.Shape();
    this._shape.graphics.beginFill("#FF0000");
    this._shape.graphics.drawRect(0, 0, 50, 50);
    this._shape.graphics.endFill();
    this.addChild(this._shape);
  }

}
