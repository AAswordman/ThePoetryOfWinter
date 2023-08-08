var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ExActionAlert from "../../../modules/exmc/server/ui/ExActionAlert.js";
import { to, tofunc } from "../../../modules/exmc/server/ExErrorQueue.js";
export class MenuUIAlertView {
}
export default class MenuUIAlert {
    constructor(client, uiJson) {
        this.choose = [];
        this.pageNum = 0;
        this.maxPageNum = 4;
        this._uiJson = uiJson;
        this._client = client;
    }
    static getLabelViews(msg) {
        let arr = [];
        for (let i = 0; i < msg.length; i++) {
            arr.push({
                "type": "text",
                "msg": msg[i]
            });
        }
        ;
        return arr;
    }
    getJSON() {
        return this._uiJson;
    }
    showPage(page, subpage) {
        this.choose = [page, subpage];
        let p = this._uiJson[page].page;
        if (p instanceof Function) {
            p = p(this._client, this);
        }
        let index = Object.keys(p).indexOf(subpage);
        if (index === -1)
            throw new Error("Can't find page " + subpage);
        this.pageNum = Math.floor(index / this.maxPageNum);
        to(this.upDatePage());
    }
    upDatePage() {
        return __awaiter(this, void 0, void 0, function* () {
            this._client.setTimeout(tofunc(() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
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
                    }
                    else {
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
                let nKeys;
                if (keys.length > this.maxPageNum) {
                    if (this.pageNum > 0)
                        alert.button("top2", () => {
                            this.pageNum -= 1;
                            to(this.upDatePage());
                        }, "-- ↑ --");
                    nKeys = keys.slice(this.pageNum * this.maxPageNum, Math.min(keys.length, (this.pageNum + 1) * this.maxPageNum));
                    let nPage = {};
                    for (let k of nKeys) {
                        nPage[k] = page[k];
                    }
                    page = nPage;
                }
                for (let i in page) {
                    let text = page[i].text;
                    if (i == this.choose[1]) {
                        alert.button("top2_d", () => { }, text);
                    }
                    else {
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
                        nViews = yield nViews;
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
                                        if (res) {
                                            to(this.upDatePage());
                                        }
                                    }
                                }, v.msg);
                            break;
                        case "buttonList3":
                            if (((_a = v.msgs) === null || _a === void 0 ? void 0 : _a.length) === 3 && ((_b = v.buttons) === null || _b === void 0 ? void 0 : _b.length) === 3) {
                                alert.button(v.type + "_1", () => {
                                    if (v.buttons) {
                                        let res = v.buttons[0](this._client, this, v);
                                        if (res) {
                                            to(this.upDatePage());
                                        }
                                    }
                                }, v.msgs[0]);
                                alert.button(v.type + "_2", () => {
                                    if (v.buttons) {
                                        let res = v.buttons[1](this._client, this, v);
                                        if (res) {
                                            to(this.upDatePage());
                                        }
                                    }
                                }, v.msgs[1]);
                                alert.button(v.type + "_3", () => {
                                    if (v.buttons) {
                                        let res = v.buttons[2](this._client, this, v);
                                        if (res) {
                                            to(this.upDatePage());
                                        }
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
                                    if (res) {
                                        to(this.upDatePage());
                                    }
                                }
                            }, v.msg);
                            break;
                    }
                }
                alert.show(this._client.player);
            })), 0);
        });
    }
}
//# sourceMappingURL=MenuUIAlert.js.map