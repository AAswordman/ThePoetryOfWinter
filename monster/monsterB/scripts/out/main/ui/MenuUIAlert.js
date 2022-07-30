import ExActionAlert from "../../modules/exmc/ui/ExActionAlert.js";
import ExGameConfig from "../../modules/exmc/ExGameConfig.js";
export default class MenuUIAlert {
    constructor(client, uiJson) {
        this.choose = [];
        this._uiJson = uiJson;
        this._client = client;
    }
    showPage(chs) {
        this.choose = chs;
        this.upDatePage();
    }
    upDatePage() {
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
                    ExGameConfig.console.info(this.choose);
                    this.upDatePage();
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
                    ExGameConfig.console.info(this.choose);
                    this.upDatePage();
                }, text);
            }
        }
        let views = subpage.page;
        if (typeof (views) == "function") {
            views = views(this._client, this);
        }
        for (let v of views) {
            if (typeof (v) == "function") {
                v = v(this._client, this);
            }
            alert.button(v.type, () => {
                v.function(this._client, this);
            }, v.msg);
        }
        alert.show(this._client.player);
    }
}
//# sourceMappingURL=MenuUIAlert.js.map