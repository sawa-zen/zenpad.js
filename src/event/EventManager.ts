import EventCatchEvent from './EventCatchEvent';
import EventName from './EventName';

/**
 * イベント管理クラス
 */
export default class EventManager extends createjs.EventDispatcher {

  /** インスタンス */
  private static _instance:EventManager;

  /**
   * インスタンスを取得します。
   * @return {EventManager}
   */
  public static getInstance():EventManager {
    return EventManager._instance || new EventManager();
  }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();
    EventManager._instance = this;
  }

  /**
   * 発火させます。
   * @param {string} eventName
   */
  public dispatch(eventName:string):void {
    // イベントキャッチイベント発火
    this.dispatchEvent(new EventCatchEvent(EventName.CATCH_EVENT, eventName));
  }

}
