/**
 * 外部で使用するイベント名一覧
 */
export default class PublicEventName {
  static get CLICK()          { return 'click'; };
  static get TOUCH_START()    { return 'touchstart'; };
  static get TOUCH_END()      { return 'touchend'; };
  static get MOVE_STICK()     { return 'moveStick'; };
  static get RELEASE_STICK()  { return 'releaseStick'; };
}
