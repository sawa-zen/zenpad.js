import * as PIXI from 'pixi.js';
import Button from './component/Button';
// import Pad from './component/Pad';
import EventName from './event/EventName';
import PublicEventName from './event/PublicEventName';

/**
 * Zenpadのメインクラスです。
 */
class Zenpad extends PIXI.utils.EventEmitter {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(wrapperId, width, height) {
    super();

    this._tick = this._tick.bind(this);
    this._onClickA = this._onClickA.bind(this);
    this._onClickB = this._onClickB.bind(this);

    // ラッパーを取得
    this._wrapper = document.getElementById(wrapperId);

    // レンダラー
    this._renderer = PIXI.autoDetectRenderer(
      this._wrapper.offsetWidth,
      this._wrapper.offsetHeight,
      { transparent: true }
    );

    // canvasをラッパーに追加
    this._wrapper.append(this._renderer.view);

    // ステージ
    this._stage = new PIXI.Container();

    // 左側グループ
    this._leftButtons = new PIXI.Container();
    this._stage.addChild(this._leftButtons);

    // 右側グループ
    this._rightButtons = new PIXI.Container();
    this._stage.addChild(this._rightButtons);

    // // アナログパッド
    // let pad = new Pad();
    // pad.x = 80;
    // pad.y = 90;
    //this._leftButtons.addChild(pad);
    // this._stage.addChild(pad);

    // Aボタン
    let aButton = new Button();
    aButton.x = 150;
    aButton.y = 80;
    this._rightButtons.addChild(aButton);
    aButton.on(EventName.CLICK, this._onClickA);

    // Bボタン
    let bButton = new Button(PublicEventName.CLICK_B);
    bButton.x = 80;
    bButton.y = 110;
    this._rightButtons.addChild(bButton);
    bButton.on(EventName.CLICK, this._onClickB);

    // リサイズ
    this._resize = this._resize.bind(this);
    window.addEventListener("resize", this._resize);

    // 初回リサイズ処理
    this._resize();

    // フレーム毎の更新
    this._tick();
  }

  /**
   * 毎フレーム毎のアニメーション
   */
  _tick() {
    this._renderer.render(this._stage);
    requestAnimationFrame(this._tick);
  }

  /**
   * リサイズ
   */
  _resize() {
    var w = this._wrapper.offsetWidth,
        h = this._wrapper.offsetHeight;
    // リサイズ
    this._renderer.resize(w, h);
    // 右側グループを右隅に
    this._rightButtons.x = this._wrapper.offsetWidth - this._rightButtons.width * 2;
  }

  /**
   * Aボタンクリック時のハンドラーです。
   */
  _onClickA() {
    // Aボタンクリックイベントを発火
    this.emit(PublicEventName.CLICK_A);
  }

  /**
   * Bボタンクリック時のハンドラーです。
   */
  _onClickB() {
    // Bボタンクリックイベントを発火
    this.emit(PublicEventName.CLICK_B);
  }
}

window.Zenpad = Zenpad;
