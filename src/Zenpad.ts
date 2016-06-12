/**
 * Zenpadのメインクラスです。
 */
class Zenpad extends createjs.EventDispatcher {

  /** canvasのid */
  private _canvasId:string;

  /**
   * コンストラクター
   * @constructor
   * @param {string} dpmId
   */
  constructor(canvasId:string) {
    super();

    this._canvasId = canvasId;

  }

}

(<any>window).Zenpad = Zenpad;
