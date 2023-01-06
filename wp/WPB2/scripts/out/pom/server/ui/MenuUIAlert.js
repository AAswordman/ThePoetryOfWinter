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
import { to } from "../../../modules/exmc/server/ExErrorQueue.js";
export class MenuUIAlertView {
}
export default class MenuUIAlert {
    constructor(client, uiJson) {
        this.choose = [];
        this._uiJson = uiJson;
        this._client = client;
    }
    static getLabelViews(msg) {
        let arr = [];
        for (let i = 0; i < msg.length; i++) {
            arr[i] = {
                "type": "text",
                "msg": msg[i]
            };
        }
        ;
        return arr;
    }
    showPage(chs) {
        this.choose = chs;
        to(this.upDatePage());
    }
    upDatePage() {
        return __awaiter(this, void 0, void 0, function* () {
            let page = this._uiJson[this.choose[0]].page;
            if (typeof (page) == "function") {
                page = page(this._client, this);
            }
            let subpage = page[this.choose[1]];
            if (typeof (subpage) == "function") {
                subpage = subpage(this._client, this);
            }
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
                        to(this.upDatePage());
                    }, this._uiJson[i].img);
                }
            }
            for (let i in page) {
                let text;
                if (typeof (page[i]) == "function") {
                    text = page[i](this._client, this).text;
                }
                else {
                    text = page[i].text;
                }
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
            let views = subpage.page;
            if (typeof (views) == "function") {
                views = views(this._client, this);
                let err;
                if (views instanceof (Promise)) {
                    [views, err] = yield to(views);
                }
            }
            for (const v of views) {
                switch (v.type) {
                    case "toggle":
                        alert.button(v.type + "_" + (v.state(this._client, this) ? "on" : "off"), () => {
                            let res = v.function(this._client, this);
                            if (res) {
                                to(this.upDatePage());
                            }
                        }, v.msg);
                        break;
                    default:
                        alert.button(v.type, () => {
                            let res = v.function(this._client, this);
                            if (res) {
                                to(this.upDatePage());
                            }
                        }, v.msg);
                        break;
                }
            }
            alert.show(this._client.player);
        });
    }
}
//# sourceMappingURL=MenuUIAlert.js.map