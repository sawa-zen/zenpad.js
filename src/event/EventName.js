/**
 * イベント名一覧
 */
export default class EventName {
  static get CLICK()       { return 'click'; };
  static get STICK_MOVE()  { return 'stick_move'; };
  static get MOUSE_DOWN()  { return 'mousedown'; };
  static get MOUSE_UP()    { return 'mouseup'; };
  static get MOUSE_MOVE()  { return 'mousemove'; };
  static get MOUSE_UP_OUTSIDE() { return 'mouseupoutside'; };
  static get TOUCH_START() { return 'touchstart'; };
  static get TOUCH_END()   { return 'touchend'; };
  static get TOUCH_MOVE()  { return 'touchmove'; };
  static get TOUCH_END_OUTSIDE() { return 'touchendoutside'; };
}
