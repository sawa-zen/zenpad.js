/**
 * ボタンクラスです。
 */
export default class Button extends createjs.Container {

  /** 幅 */
  private _width:number = 55;
  /** シェイプ */
  private _shape:createjs.Shape;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // シェイプ
    this._shape = new createjs.Shape();
    this._shape.graphics.beginFill("#8c3568");
    this._shape.graphics.drawCircle(0, 0, this._width / 2);
    this._shape.graphics.endFill();
    this.addChild(this._shape);
  }

}
