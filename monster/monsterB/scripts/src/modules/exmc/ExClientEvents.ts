import ExGameClient from "./ExGameClient.js";
import {
	ChatEvent,
	ItemUseEvent,
	TickEvent
} from "mojang-minecraft";
import ExEventManager from "./interface/ExEventManager.js";
import ExGameServer from './ExGameServer';

export default class ExClientEvents implements ExEventManager {

	static monitorMap:any = {

	}

	_registerToServerByEntity = (server:ExGameServer,k:string) => {
		server.getEvents().register(k, (e:any) => {
			let player = e[(<any>this.exEvents)[k].filter.name];
			let fArr = ExClientEvents.monitorMap[k].get(player);
			if (fArr != null) {
				fArr.forEach((f: (arg0: any) => void) => {
					f(e);
				});
			}
		});
	}
	
	_registerToServerByServerEvent = (server:ExGameServer,k:string) => {
		server.getEvents().register(k, (e:any) => {
			for (let i of ExClientEvents.monitorMap[k]) {
				i.forEach((f: (arg0: any) => void) => {
					f(e);
				});
			}
		});

	}

	_client: ExGameClient;

	exEvents = {
		itemUse: {
			subscribe: (callback: (arg: ItemUseEvent) => void) => {
				this._subscribe("itemUse", callback);
			},
			unsubscribe: (callback: (arg: ItemUseEvent) => void) => {
				this._unsubscribe("itemUse", callback)
			},
			pattern: this._registerToServerByEntity,
			filter: {
				"name": "source"
			}
		},
		chat: {
			subscribe: (callback: (arg: ChatEvent) => void) => {
				this._subscribe("chat", callback);
			},
			unsubscribe: (callback: (arg: ChatEvent) => void) => {
				this._unsubscribe("chat", callback);
			},
			pattern: this._registerToServerByEntity,
			filter: {
				"name": "sender"
			}
		},
		tick: {
			subscribe: (callback: (arg: TickEvent) => void) => {
				this._subscribe("chat", callback);
			},
			unsubscribe: (callback: (arg: TickEvent) => void) => {
				this._unsubscribe("chat", callback);
			},
			pattern: this._registerToServerByServerEvent
		}
	}


	_subscribe(name: string, callback: (arg: any) => void) {
		let e = ExClientEvents.monitorMap[name];
		if (!e.has(this._client.player)) {
			e.set(this._client.player, []);
		}

		e.get(this._client.player).push(callback);

	}

	_unsubscribe(name: string, callback: (arg: any) => void) {
		let e = ExClientEvents.monitorMap[name];
		delete e.get(this._client.player)[e.get(this._client.player).findIndex(callback)];
	}

	constructor(client: ExGameClient) {
		this._client = client;
		for (let k in this.exEvents) {
			ExClientEvents.monitorMap[k] = new Map();
		}
		this._client.runOnServer((server) => {
			for (let k in ExClientEvents.monitorMap) {
				(<any>this.exEvents)[k].pattern(server,k);
			}
		});
	}
	register(name: string, fun: (arg: any) => void) {
		if ((<any>this.exEvents) != null) {
			return (<any>this.exEvents).subscribe(fun);
		}
	}
	cancel(name: string, fun: (arg: any) => void) {
		if ((<any>this.exEvents)[name] != null) {
			return (<any>this.exEvents)[name].unsubscribe(fun);
		}
	}
	
	unsubscribeAll() {
		for (let m in ExClientEvents.monitorMap) {
			ExClientEvents.monitorMap[m].delete(this._client.player);
		}
	}
}