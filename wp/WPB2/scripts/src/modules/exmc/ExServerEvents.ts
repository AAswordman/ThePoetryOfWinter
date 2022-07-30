import { world, Events } from "mojang-minecraft";
import ExEventManager from "./interface/ExEventManager.js";
import ExGameServer from "./ExGameServer.js";
import ExGameConfig from './ExGameConfig.js';
import ExErrorStack from './ExErrorStack.js';

export default class ExServerEvents implements ExEventManager {
	public events: Events;
	private _server: ExGameServer;
	public exEvents = {};

	constructor(server: ExGameServer) {
		this._server = server;
		this.events = world.events;
	}

	register(name: string, fun: (arg: any) => void) {
		let func: (arg: any) => void = fun;
		if (name in this.events) {
			return (<any>this.events)[name].subscribe(func);
		} else if (name in this.exEvents) {
			return (<any>this.exEvents)[name].subscribe(func);
		}

		console.warn("No event registered for name " + name);
	}


	cancel(name: string, fun: (arg: any) => void) {
		if (name in this.events) {
			return (<any>this.events)[name].unsubscribe(fun);
		} else if (name in this.exEvents) {
			return (<any>this.exEvents)[name].unsubscribe(fun);
		}
	}
}