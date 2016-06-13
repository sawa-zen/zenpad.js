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

  /** 左側グループ */
  private _leftButtons:createjs.Container;
  /** 右側グループ */
  private _rightButtons:createjs.Container;

  /**
   * コンストラクター
   * @constructor
   * @param {string} dpmId
   */
  constructor(canvasId:string) {

    // ステージを作成
    this._canvasId = canvasId;
    this._canvas = document.getElementById(this._canvasId);

    // ステージ
    this._stage = new createjs.Stage(this._canvasId);
    createjs.Touch.enable(this._stage);

    // 左側グループ
    this._leftButtons = new createjs.Container();
    this._stage.addChild(this._leftButtons);

    // 右側
    this._rightButtons = new createjs.Container();
    this._rightButtons.regX = 200;
    this._stage.addChild(this._rightButtons);

    // ボタン
    let button = new Button();
    button.x = 120;
    button.y = 30;
    this._rightButtons.addChild(button);

    // アニメーション
    createjs.Ticker.addEventListener("tick", () => this._tick());

    // リサイズ
    window.addEventListener("resize", () => this._resize());

    // 初回リサイズ処理
    this._resize();
  }

  /**
   * 毎フレーム毎のアニメーション
   */
  private _tick() {
    this._stage.update();
  }

  /**
   * リサイズ
   */
  private _resize() {
    // canvasサイズを合わせる
    this._canvas.setAttribute('width', String(this._canvas.clientWidth));
    this._canvas.setAttribute('height', String(this._canvas.clientHeight));

    // 右側グループを右隅に
    this._rightButtons.x = this._canvas.clientWidth;
  }
}

(<any>window).Zenpad = Zenpad;
