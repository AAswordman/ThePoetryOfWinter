import PomClient from "../PomClient.js";
import ExActionAlert from "../../../modules/exmc/server/ui/ExActionAlert.js";
import { to, tofunc } from "../../../modules/exmc/server/ExErrorQueue.js";
import ExGameConfig from "../../../modules/exmc/server/ExGameConfig.js";
import ExGameClient from '../../../modules/exmc/server/ExGameClient.js';
import ExInterworkingPool from '../../../modules/exmc/interface/ExInterworkingPool.js';
export class MenuUIAlertView<T extends ExGameClient> {
    msg?: string;
    msgs?: string[];
    type!: "textWithBigBg"|"img_notice_wp"|"textWithBg" | "toggle" | "text_title" | "padding" | "button" | "text" | "buttonList2" | "buttonList3" | "img_adjustToScreen" | "canvas";
    state?: (client: T, ui: MenuUIAlert<T>, view: this) => boolean;
    function?: (client: T, ui: MenuUIAlert<T>, view: this) => boolean;
    buttons?: ((client: T, ui: MenuUIAlert<T>, view: this) => boolean)[];
}


export default class MenuUIAlert<T extends ExGameClient> {
    static getLabelViews<T extends ExGameClient>(msg: string[]): MenuUIAlertView<T>[] {
        let arr: MenuUIAlertView<T>[] = [];
        for (let i = 0; i < msg.length; i++) {
            arr.push({
                "type": "text",
                "msg": msg[i]
            });
        };
        return arr;
    }

    choose: string[] = [];
    private _uiJson: MenuUIJson<T>;
    private _client: T;
    private pageNum = 0;
    private readonly maxPageNum = 4;

    constructor(client: T, uiJson: MenuUIJson<T>) {
        this._uiJson = uiJson;
        this._client = client;
    }

    getJSON() {
        return this._uiJson;
    }

    showPage(page: string, subpage: string) {
        this.choose = [page, subpage];
        let p = this._uiJson[page].page;
        if (p instanceof Function) {
            p = p(this._client, this);
        }
        let index = Object.keys(p).indexOf(subpage);
        if (index === -1) throw new Error("Can't find page " + subpage);
        this.pageNum = Math.floor(index / this.maxPageNum);

        to(this.upDatePage());
    }
    async upDatePage() {
        this._client.setTimeout(tofunc(async () => {
            let page = this._uiJson[this.choose[0]].page;
            if (typeof (page) === "function") {
                page = page(this._client, this);
            }
            let subpage = page[this.choose[1]];
            let alert = new ExActionAlert();
            alert.body(this.choose.join(" -> "));
            alert.title("__pomAlertMenu");
            for (let i in this._uiJson) {
                if (i == this.choose[0]) {
                    alert.button("top1_d", () => { }, this._uiJson[i].img);
                } else {
                    const id = i;
                    alert.button("top1", () => {
                        //this._client.player.runCommand("title @s title Loading...");
                        this.choose[0] = id;
                        this.choose[1] = this._uiJson[this.choose[0]]["default"];
                        this.pageNum = 0;
                        to(this.upDatePage());
                    }, this._uiJson[i].img);
                }

            }

            let keys = Object.keys(page);
            let nKeys: string[];
            if (keys.length > this.maxPageNum) {
                if (this.pageNum > 0)
                    alert.button("top2", () => {
                        this.pageNum -= 1;
                        to(this.upDatePage());
                    }, "-- ↑ --")

                nKeys = keys.slice(this.pageNum * this.maxPageNum, Math.min(keys.length, (this.pageNum + 1) * this.maxPageNum));

                let nPage: MenuUIPage<T> = {};
                for (let k of nKeys) {
                    nPage[k] = page[k];
                }
                page = nPage;
            }


            for (let i in page) {
                let text = page[i].text;

                if (i == this.choose[1]) {
                    alert.button("top2_d", () => { }, text);
                } else {
                    const id = i;
                    alert.button("top2", () => {
                        //this._client.player.runCommand("title @s title Loading...");
                        this.choose[1] = id;
                        to(this.upDatePage());
                    }, text);
                }
            }
            if (keys.length > this.maxPageNum && this.maxPageNum * this.pageNum + 1 < keys.length) {
                alert.button("top2", () => {
                    this.pageNum += 1;
                    to(this.upDatePage());
                }, "-- ↓ --");
            }

            let views = subpage.page;
            if (typeof (views) == "function") {
                let nViews = views(this._client, this);
                if (nViews instanceof Promise) {
                    nViews = await nViews;
                }
                views = nViews;
            }

            for (const v of views) {
                switch (v.type) {
                    case "toggle":
                        if (v.state)
                            alert.button(v.type + "_" + (v.state(this._client, this, v) ? "on" : "off"), () => {
                                if (v.function) {
                                    let res = v.function(this._client, this, v);
                                    if (res) { to(this.upDatePage()); }
                                }
                            }, v.msg);
                        break;
                    case "buttonList3":
                        if (v.msgs?.length === 3 && v.buttons?.length === 3) {
                            alert.button(v.type + "_1", () => {
                                if (v.buttons) {
                                    let res = v.buttons[0](this._client, this, v);
                                    if (res) { to(this.upDatePage()); }
                                }
                            }, v.msgs[0]);
                            alert.button(v.type + "_2", () => {
                                if (v.buttons) {
                                    let res = v.buttons[1](this._client, this, v);
                                    if (res) { to(this.upDatePage()); }
                                }
                            }, v.msgs[1]);
                            alert.button(v.type + "_3", () => {
                                if (v.buttons) {
                                    let res = v.buttons[2](this._client, this, v);
                                    if (res) { to(this.upDatePage()); }
                                }
                            }, v.msgs[2]);
                            alert.button(v.type + "_4", () => {
                            }, " ");
                        }
                        break;
                    default:
                        alert.button(v.type, () => {
                            if (v.function) {
                                let res = v.function(this._client, this, v);
                                if (res) { to(this.upDatePage()); }
                            }
                        }, v.msg);
                        break;
                }
            }
            alert.show(this._client.player);
        }), 0);
    }
}

export interface MenuUIJson<T extends ExGameClient> {
    [x: string]: {
        img: string;
        text: string;
        default: string;
        page: MenuUIPage<T> | ((client: T, ui: MenuUIAlert<T>) => MenuUIPage<T>);
    }
}

export interface MenuUIPage<T extends ExGameClient> {
    [x: string]: {
        text: string;
        page: MenuUIAlertView<T>[] | ((client: T, ui: MenuUIAlert<T>) => MenuUIAlertView<T>[]) | ((client: T, ui: MenuUIAlert<T>) => Promise<MenuUIAlertView<T>[]>);
    }
}