/**
 * イベントをキャッチした際のイベントクラスです。
 */
export default class EventCatchEvent extends createjs.Event {

  // 発火させるイベント名
  private _eventName:string;
  public getEventName():string {
    return this._eventName;
  }

  /**
   * コンストラクター
   * @constructor
   */
  constructor(type:string, eventName:string, bubbles:boolean = true, cancelable:boolean = false) {
    super(type, bubbles, cancelable);

    this._eventName = eventName;
  }

}
