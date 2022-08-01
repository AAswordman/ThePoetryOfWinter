import { world, Events, TickEvent } from 'mojang-minecraft';
import ExEventManager from "./interface/ExEventManager.js";
import ExGameServer from "./ExGameServer.js";
import ExGameConfig from './ExGameConfig.js';
import ExErrorStack from './ExErrorStack.js';

export default class ExServerEvents implements ExEventManager {
	public events: Events;
	private _server: ExGameServer;
	public exEvents = {
		"onLongTick": {
			subscribe: (callback: (arg: TickEvent) => void) => {
				this._subscribe("tick", callback);
			},
			unsubscribe: (callback: (arg: TickEvent) => void) => {
				this._unsubscribe("tick", callback)
			},
			pattern: () => {
				this.events.tick.subscribe((e) => {
					this.tickNum++;
					this.tickTime+=e.deltaTime
					if(this.tickNum >= 5){

					}
				});
			}
		}

	};
	static monitorMap = new Map<string, ((arg: any) => void)[]>;
	tickNum: number = 0;
	tickTime: number = 0;
	_subscribe(name: string, callback: (arg: any) => void) {
		let e = ExServerEvents.monitorMap.get(name) ?? [];
		e.push(callback);

	}

	_unsubscribe(name: string, callback: (arg: any) => void) {
		let arr = ExServerEvents.monitorMap.get(name) ?? [];

		arr.splice(arr.findIndex((v, i) => {
			if (v === callback) return true;
		}), 1);
	}

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