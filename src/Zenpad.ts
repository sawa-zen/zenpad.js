import Button from './botton/Button';
import Pad from './pad/Pad';
import EventManager from './event/EventManager';
import EventName from './event/EventName';
import EventCatchEvent from './event/EventCatchEvent';
import PublicEventName from './event/PublicEventName';

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
  /** イベントマネージャー */
  private _eventManager:EventManager;

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

    // イベントマネージャー
    this._eventManager = EventManager.getInstance();
    this._onCatchEvent = this._onCatchEvent.bind(this);
    this._eventManager.addEventListener(EventName.CHATCH_EVENT, this._onCatchEvent);

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

    // アニメーション
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
  private _tick():void {
    this._stage.update();
  }

  /**
   * リサイズ
   */
  private _resize():void {
    // canvasサイズを合わせる
    this._canvas.setAttribute('width', String(this._canvas.clientWidth));
    this._canvas.setAttribute('height', String(this._canvas.clientHeight));

    // 右側グループを右隅に
    this._rightButtons.x = this._canvas.clientWidth;
  }

  /**
   * イベントキャッチ時のハンドラーです。
   */
  private _onCatchEvent(event:EventCatchEvent):void {
    console.info(event.getEventName());
  }

}

(<any>window).Zenpad = Zenpad;
