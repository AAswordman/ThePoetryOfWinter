import { MessageFormData } from "@minecraft/server-ui";
import { Player } from '@minecraft/server';
import ExErrorQueue from "../ExErrorQueue.js";

export default class ExMessageAlert {
	_alert = new MessageFormData();
	buttonEvent = [()=>{},()=>{}];
	constructor() {

	}
	body(bodyText:string) {
		this._alert.body(bodyText);
		return this;
	}
	button1(text:string, fun:()=>void) {
		this._alert.button1(text);
		this.buttonEvent[1] = (fun);
		return this;
	}
	button2(text:string, fun:()=>void) {
		this._alert.button2(text);
		this.buttonEvent[0] = (fun);
		return this;
	}
	show(player:Player) {
		this._alert.show(player).then(e => {
			if(e.canceled || e.selection === undefined) return;
			this.buttonEvent[e.selection]();
		}).catch(e => ExErrorQueue.throwError(e));;
		return this;
	}
	title(titleText: string) {
		this._alert.title(titleText);
		return this;
	}
}