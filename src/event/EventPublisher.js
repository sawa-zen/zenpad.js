import * as PIXI from 'pixi.js';
import EventName from './EventName';

/**
 * 公開イベント発火クラスです。
 */
export default class EventPublisher extends PIXI.utils.EventEmitter {

  /** インスタンス */
  static get instance() {
    return EventPublisher._instance || new EventPublisher();
  }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    EventPublisher._instance = this;
  }

  /**
   * イベントを発火します。
   */
  publish(name, data = {}) {
    this.emit(EventName.PUBLISH_EVENT, {
      name: name,
      data: data
    });
  }

  /**
   * 破棄します。
   */
  dispose() {
    EventPublisher._instance = null;
  }
}
