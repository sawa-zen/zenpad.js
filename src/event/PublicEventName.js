/**
 * 外部で使用するイベント名一覧
 */
export default class PublicEventName {
  static get CLICK_A()      { return 'clickA'; };
  static get CLICK_B()      { return 'clickB'; };
  static get PUSH_TOP()     { return 'pushTop'; };
  static get PUSH_LEFT()    { return 'pushLeft'; };
  static get PUSH_RIGHT()   { return 'pushRight'; };
  static get PUSH_BOTTOM()  { return 'pushBottom'; };
  static get PULL_DOWN()    { return 'pull_down'; };
  static get RELEASE_PAD()  { return 'releasePad'; };
}
