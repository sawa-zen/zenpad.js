declare class Zenpad
{
    /**
     * コンストラクター
     * @param canvasId
     */
    constructor(id:string);

    /**
     * イベント
     */
    on(type: string, listener: (eventObj: Object) => boolean): void;
    off(type: string, listener: (eventObj: Object) => boolean): void;
}

declare module "zenpad" {
	export = Zenpad;
}
