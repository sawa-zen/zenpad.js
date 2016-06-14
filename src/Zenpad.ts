import Button from './botton/Button';

/**
 * Zenpadのメインクラスです。
 */
class Zenpad extends createjs.EventDispatcher {

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
    super();

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
    this._rightButtons.regX = 190;

    this._stage.addChild(this._rightButtons);

    // Aボタン
    let aButton = new Button();
    aButton.x = 140;
    aButton.y = 80;
    aButton.addEventListener("click", () => this._onClickA());
    this._rightButtons.addChild(aButton);

    // Bボタン
    let bButton = new Button();
    bButton.x = 80;
    bButton.y = 130;
    bButton.addEventListener("click", () => this._onClickB());
    this._rightButtons.addChild(bButton);

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

  /**
   * Aボタン押下時のハンドラーです。
   */
  private _onClickA() {
    this.dispatchEvent("aClick");
  }

  /**
   * Bボタン押下時のハンドラーです。
   */
  private _onClickB() {
    this.dispatchEvent("bClick");
  }
}

(<any>window).Zenpad = Zenpad;
