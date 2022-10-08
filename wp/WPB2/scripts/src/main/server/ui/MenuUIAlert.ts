import PomClient from "../PomClient.js";
import ExActionAlert from "../../../modules/exmc/server/ui/ExActionAlert.js";
import { to } from "../../../modules/exmc/server/ExErrorStack.js";
import ExGameConfig from "../../../modules/exmc/server/ExGameConfig.js";

export class MenuUIAlertView {
	msg?: string;
	type !: string;
	state?: (client: PomClient, ui: MenuUIAlert, view: MenuUIAlertView) => boolean;
	function?: (client: PomClient, ui: MenuUIAlert, view: this) => boolean;
}


export default class MenuUIAlert {
	static getLabelViews(msg: string[]): MenuUIAlertView[] {
		let arr = [];
		for (let i = 0; i < msg.length; i++) {
			arr[i] = {
				"type": "text",
				"msg": msg[i]
			}
		};
		return arr;
	}

	choose: string[] = [];
	private _uiJson: any;
	private _client: PomClient;

	constructor(client: PomClient, uiJson: object) {
		this._uiJson = uiJson;
		this._client = client;
	}

	showPage(chs: string[]) {
		this.choose = chs;
		to(this.upDatePage());
	}
	async upDatePage() {
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
			} else {
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
			} else {
				text = page[i].text;
			}
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
		let views = subpage.page;
		if (typeof (views) == "function") {
			views = views(this._client, this);
			let err: any;
			if (views instanceof Promise<MenuUIAlertView>) {
				[views, err] = await to(views);
			}
		}

		for (const v of views) {
			switch (v.type) {
				case "toggle":
					alert.button(v.type + "_" + (v.state(this._client, this) ? "on" : "off"), () => {
						let res = v.function(this._client, this);
						if (res) { to(this.upDatePage()); }
					}, v.msg);
					break;
				default:
					alert.button(v.type, () => {
						let res = v.function(this._client, this);
						if (res) { to(this.upDatePage()); }
					}, v.msg);
					break;
			}
		}
		alert.show(this._client.player);

	}

}