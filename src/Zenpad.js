import * as PIXI from 'pixi.js';
import Button from './component/Button';
import Pad from './component/Pad';
import EventName from './event/EventName';
import PublicEvent from './event/PublicEvent';

/**
 * Zenpadのメインクラスです。
 */
module.exports = class Zenpad extends PIXI.utils.EventEmitter {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(wrapperId, width, height) {
    super();

    this._tick = this._tick.bind(this);
    this._onClickA = this._onClickA.bind(this);
    this._onClickB = this._onClickB.bind(this);
    this._onMoveStick = this._onMoveStick.bind(this);
    this._onReleaseStick = this._onReleaseStick.bind(this);

    // ラッパーを取得
    this._wrapper = document.getElementById(wrapperId);

    // レンダラー
    this._renderer = PIXI.autoDetectRenderer(
      this._wrapper.offsetWidth,
      this._wrapper.offsetHeight,
      { transparent: true, antialias: true }
    );
    this._renderer.plugins.interaction.moveWhenInside = true;

    // canvasをラッパーに追加
    this._wrapper.appendChild(this._renderer.view);

    // ステージ
    this._stage = new PIXI.Container();

    // 左側グループ
    this._leftButtons = new PIXI.Container();
    this._stage.addChild(this._leftButtons);

    // 右側グループ
    this._rightButtons = new PIXI.Container();
    this._stage.addChild(this._rightButtons);

    // アナログパッド
    this._pad = new Pad();
    this._pad.x = 80;
    this._pad.y = 90;
    this._leftButtons.addChild(this._pad);
    this._pad.on(EventName.MOVE_STICK, this._onMoveStick);
    this._pad.on(EventName.RELEASE_STICK, this._onReleaseStick);

    // Aボタン
    this._aButton = new Button('A');
    this._aButton.x = 150;
    this._aButton.y = 80;
    this._rightButtons.addChild(this._aButton);
    this._aButton.on(EventName.CLICK, this._onClickA);

    // Bボタン
    this._bButton = new Button('B');
    this._bButton.x = 80;
    this._bButton.y = 110;
    this._rightButtons.addChild(this._bButton);
    this._bButton.on(EventName.CLICK, this._onClickB);

    // リサイズ
    this._resize = this._resize.bind(this);
    window.addEventListener('resize', this._resize);

    // 初回リサイズ処理
    this._resize();

    // フレーム毎の更新
    this._tick();
  }

  /**
   * 破棄します。
   */
  dispose() {
    cancelAnimationFrame(this._requestId);
    window.removeEventListener('resize', this._resize);

    if(this._aButton) {
      this._aButton.off(EventName.CLICK, this._onClickA);
      this._rightButtons.removeChild(this._aButton);
      this._aButton.dispose();
      this._aButton = null;
    }
    if(this._bButton) {
      this._bButton.off(EventName.CLICK, this._onClickB);
      this._rightButtons.removeChild(this._bButton);
      this._bButton.dispose();
      this._bButton = null;
    }
    if(this._pad) {
      this._pad.off(EventName.MOVE_STICK, this._onMoveStick);
      this._pad.off(EventName.RELEASE_STICK, this._onReleaseStick);
      this._leftButtons.removeChild(this._pad);
      this._pad.dispose();
      this._pad = null;
    }
    if(this._stage) {
      this._stage.removeChild(this._leftButtons);
      this._leftButtons.destroy();
      this._leftButtons = null;
      this._stage.removeChild(this._rightButtons);
      this._rightButtons.destroy();
      this._rightButtons = null;
      this._stage.destroy();
      this._stage = null;
    }

    this._renderer.view.remove();
    this._renderer.destroy();
    this._renderer = null;

    this._wrapper = null;
  }

  /**
   * 毎フレーム毎のアニメーション
   */
  _tick() {
    this._renderer.render(this._stage);
    this._requestId = requestAnimationFrame(this._tick);
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
    this._rightButtons.x = this._wrapper.offsetWidth - 190;
  }

  /**
   * Aボタンクリック時のハンドラーです。
   */
  _onClickA() {
    // Aボタンクリックイベントを発火
    this.emit(PublicEvent.CLICK_A);
  }

  /**
   * Bボタンクリック時のハンドラーです。
   */
  _onClickB() {
    // Bボタンクリックイベントを発火
    this.emit(PublicEvent.CLICK_B);
  }

  /**
   * スティックが動いた際のハンドラーです。
   */
  _onMoveStick(data) {
    // スティックの変更イベントを発火
    this.emit(PublicEvent.MOVE_STICK, data);
  }

  /**
   * スティックが離された際のハンドラーです。
   */
  _onReleaseStick() {
    // スティックリリースイベントを発火
    this.emit(PublicEvent.RELEASE_STICK);
  }
}
