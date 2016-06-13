import Button from './botton/Button';

/**
 * Zenpadのメインクラスです。
 */
class Zenpad {

  /** canvasのid */
  private _canvasId:string;
  /** canvas */
  private _canvas:HTMLElement;
  /** stage */
  private _stage:createjs.Stage;

  /**
   * コンストラクター
   * @constructor
   * @param {string} dpmId
   */
  constructor(canvasId:string) {

    // ステージを作成
    this._canvasId = canvasId;
    this._canvas = document.getElementById(this._canvasId);
    this._canvas.setAttribute('width', String(this._canvas.clientWidth));
    this._canvas.setAttribute('height', String(this._canvas.clientHeight));

    this._stage = new createjs.Stage(this._canvasId);
    // this._stage.canvas.width = this._canvas.clientWidth;
    // this._stage.canvas.height = this._canvas.clientHeight;
    createjs.Touch.enable(this._stage);

    // ボタン
    let button = new Button();
    this._stage.addChild(button);

    // アニメーション
    createjs.Ticker.addEventListener("tick", () => this._tick());
  }

  /**
   * 毎フレーム毎のアニメーション
   */
  private _tick() {
    console.info("aaa");
    this._stage.update();
  }
}

(<any>window).Zenpad = Zenpad;
