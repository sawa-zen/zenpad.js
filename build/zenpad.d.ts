declare class Zenpad
{
    /**
     * コンストラクター
     * @param canvasId
     */
    constructor(canvasId:string);

    /**
     * イベント
     */
    addEventListener(type: string, listener: (eventObj: Object) => boolean): Function;
    removeEventListener(type: string, listener: (eventObj: Object) => boolean): void;
}

declare module "zenpad" {
	export = Zenpad;
}
