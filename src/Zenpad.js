import Button from './component/Button';
import Pad from './component/Pad';
import EventName from './event/EventName';
import PublicEventName from './event/PublicEventName';

/**
 * Zenpadのメインクラスです。
 */
class Zenpad extends createjs.EventDispatcher {

  /**
   * コンストラクター
   * @constructor
   * @param {string} dpmId
   */
  constructor(canvasId) {
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

    // 右側グループ
    this._rightButtons = new createjs.Container();
    this._rightButtons.regX = 190;
    this._stage.addChild(this._rightButtons);

    // アナログパッド
    let pad = new Pad();
    pad.x = 80;
    pad.y = 90;
    this._leftButtons.addChild(pad);

    // Aボタン
    let aButton = new Button(PublicEventName.CLICK_A);
    aButton.x = 150;
    aButton.y = 80;
    this._rightButtons.addChild(aButton);

    // Bボタン
    let bButton = new Button(PublicEventName.CLICK_B);
    bButton.x = 80;
    bButton.y = 110;
    this._rightButtons.addChild(bButton);

    // フレーム毎の更新
    this._tick = this._tick.bind(this);
    createjs.Ticker.addEventListener("tick", this._tick);

    // リサイズ
    this._resize = this._resize.bind(this);
    window.addEventListener("resize", this._resize);

    // 初回リサイズ処理
    this._resize();
  }

  /**
   * 毎フレーム毎のアニメーション
   */
  _tick() {
    this._stage.update();
  }

  /**
   * リサイズ
   */
  _resize() {
    // canvasサイズを合わせる
    this._canvas.setAttribute('width', String(this._canvas.clientWidth));
    this._canvas.setAttribute('height', String(this._canvas.clientHeight));

    // 右側グループを右隅に
    this._rightButtons.x = this._canvas.clientWidth;
  }
}

window.Zenpad = Zenpad;
