/**
 * ボタンクラスです。
 */
export default class Button extends createjs.Container {

  /** 幅 */
  private _width:number = 50;
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
    this._shape.graphics.beginFill("#FF0000");
    this._shape.graphics.drawRect(0, 0, this._width, this._width);
    this._shape.graphics.endFill();
    this.addChild(this._shape);

    this.regX = this.regY = this._width / 2;
  }

}
