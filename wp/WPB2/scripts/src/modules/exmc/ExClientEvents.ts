import ExGameClient from "./ExGameClient.js";
import {
	BeforeItemUseOnEvent,
	ChatEvent,
	ItemUseEvent,
	ItemUseOnEvent,
	TickEvent
} from "mojang-minecraft";
import ExEventManager from "./interface/ExEventManager.js";
import ExGameServer from './ExGameServer.js';
import { Player, EntityHurtEvent, ItemStack, EntityHitEvent, Entity } from 'mojang-minecraft';
import ExPlayer from './entity/ExPlayer.js';
import { ItemOnHandChangeEvent } from "./events.js";
import ExGameConfig from "./ExGameConfig.js";
import TickDelayTask from "./utils/TickDelayTask.js";
export default class ExClientEvents implements ExEventManager {

	/*
	 {
		"event" : (Map){
			Player : [ callback ]
		}
	 }
	 */
	static monitorMap: any = {

	}

	_registerToServerByEntity = (server: ExGameServer, registerName: string, k: string) => {
		server.getEvents().register(registerName, (e: any) => {
			let player = e[(<any>this.exEvents)[k].filter.name];
			let fArr = ExClientEvents.monitorMap[k].get(player);
			if (fArr != null) {
				fArr.forEach((f: (arg0: any) => void) => {
					f(e);
				});
			}
		});
	}

	_registerToServerByServerEvent = (server: ExGameServer, registerName: string, k: string) => {
		server.getEvents().register(registerName, (e: any) => {
			for (let i of ExClientEvents.monitorMap[k]) {
				(<((arg0: any) => void)[]>i[1]).forEach((f) => {
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
				this._subscribe("tick", callback);
			},
			unsubscribe: (callback: (arg: TickEvent) => void) => {
				this._unsubscribe("tick", callback);
			},
			pattern: this._registerToServerByServerEvent
		},
		entityHit: {
			subscribe: (callback: (arg: EntityHitEvent) => void) => {
				this._subscribe("entityHit", callback);
			},
			unsubscribe: (callback: (arg: EntityHitEvent) => void) => {
				this._unsubscribe("entityHit", callback);
			},
			pattern: this._registerToServerByEntity,
			filter: {
				"name": "entity"
			}
		},
		itemUseOn: {
			subscribe: (callback: (arg: ItemUseOnEvent) => void) => {
				this._subscribe("itemUseOn", callback);
			},
			unsubscribe: (callback: (arg: ItemUseOnEvent) => void) => {
				this._unsubscribe("itemUseOn", callback);
			},
			pattern: this._registerToServerByEntity,
			filter: {
				"name": "source"
			}
		},
		
		beforeItemUseOn: {
			subscribe: (callback: (arg: BeforeItemUseOnEvent) => void) => {
				this._subscribe("beforeItemUseOn", callback);
			},
			unsubscribe: (callback: (arg: BeforeItemUseOnEvent) => void) => {
				this._unsubscribe("beforeItemUseOn", callback);
			},
			pattern: this._registerToServerByEntity,
			filter: {
				"name": "source"
			}
		},
		onceItemUseOn: {
			subscribe: (callback: (arg: BeforeItemUseOnEvent) => void) => {
				this._subscribe("onceItemUseOn", callback);
			},
			unsubscribe: (callback: (arg: BeforeItemUseOnEvent) => void) => {
				this._unsubscribe("onceItemUseOn", callback);
			},
			pattern: (server: ExGameServer, registerName: string, k: string) => {
				this.onceItemUseOnMap = new Map<Entity, [TickDelayTask,boolean]>();
				server.getEvents().register(registerName, (e: ItemUseOnEvent) => {
					if(!(e.source instanceof Player)) return;
					let part = (<Map<Player,((i:ItemUseOnEvent)=>void)[]>>ExClientEvents.monitorMap[k]);
					if(!this.onceItemUseOnMap.has(e.source)){
						const player = e.source;
						this.onceItemUseOnMap.set(e.source, [new TickDelayTask(server.getEvents(),()=>{
							let res = this.onceItemUseOnMap.get(player);
							if(res === undefined) return;
							res[1] = true;
						}).delay(3),true]);
					}

					let res = this.onceItemUseOnMap.get(e.source);
					if(res === undefined) return;
					if(res[1]){
						res[1] = false;
						part.get(e.source)?.forEach((v) => v(e));
					}
					res[0].stop();
					res[0].startOnce();
					
				});
			},
			filter: {
				"name": "source"
			},
			name: "beforeItemUseOn"
		},
		playerHitEntity: {
			subscribe: (callback: (arg: EntityHurtEvent) => void) => {
				this._subscribe("playerHitEntity", callback);
			},
			unsubscribe: (callback: (arg: EntityHurtEvent) => void) => {
				this._unsubscribe("playerHitEntity", callback);
			},
			pattern: this._registerToServerByEntity,
			filter: {
				"name": "damagingEntity"
			},
			name: "entityHurt"
		},
		playerHurt: {
			subscribe: (callback: (arg: EntityHurtEvent) => void) => {
				this._subscribe("playerHurt", callback);
			},
			unsubscribe: (callback: (arg: EntityHurtEvent) => void) => {
				this._unsubscribe("playerHurt", callback);
			},
			pattern: this._registerToServerByEntity,
			filter: {
				"name": "hurtEntity"
			},
			name: "entityHurt"
		},
		itemOnHandChange: {
			subscribe: (callback: (arg: ItemOnHandChangeEvent) => void) => {
				this._subscribe("itemOnHandChange", callback);
			},
			unsubscribe: (callback: (arg: ItemOnHandChangeEvent) => void) => {
				this._unsubscribe("itemOnHandChange", callback);
			},
			pattern: (server: ExGameServer, registerName: string, k: string) => {
				this.onHandItemMap = new Map<Player, [ ItemStack | undefined,number]>();
				server.getEvents().register(registerName, (e: TickEvent) => {
					for(let i of (<Map<Player,((e: ItemOnHandChangeEvent)=>void)[]>>ExClientEvents.monitorMap[k])){
						let lastItemCache=this.onHandItemMap.get(i[0]);
						let lastItem = lastItemCache?.[0];
						let nowItem=ExPlayer.getInstance(i[0]).getBag().getItemOnHand();

						if(lastItem?.id!==nowItem?.id || i[0].selectedSlot !== lastItemCache?.[1]){
							i[1].forEach((f) => {
								f(new ItemOnHandChangeEvent(lastItem, ExPlayer.getInstance(i[0]).getBag().getItemOnHand(),i[0]));
							});
							
							this.onHandItemMap.set(i[0],[nowItem,i[0].selectedSlot]);
						}
					}
					
				});
			},
			name: "onLongTick"
		},
		onLongTick: {
			subscribe: (callback: (arg: TickEvent) => void) => {
				this._subscribe("onLongTick", callback);
			},
			unsubscribe: (callback: (arg: TickEvent) => void) => {
				this._unsubscribe("onLongTick", callback);
			},
			pattern: this._registerToServerByServerEvent
		}
	}
	onHandItemMap!: Map<Player, [ItemStack | undefined,number]>;
	onceItemUseOnMap!: Map<Entity, [TickDelayTask, boolean]>;

	_subscribe(name: string, callback: (arg: any) => void) {
		let e = ExClientEvents.monitorMap[name];
		if (!e.has(this._client.player)) {
			e.set(this._client.player, []);
		}

		e.get(this._client.player).push(callback);

	}

	_unsubscribe(name: string, callback: (arg: any) => void) {
		let e = ExClientEvents.monitorMap[name];
		let arr: ((arg2: any) => void)[] = e.get(this._client.player);
		arr.splice(arr.findIndex((v,i)=>{
			if(v === callback) return true;
		}), 1);
	}

	private static init = false;
	constructor(client: ExGameClient) {
		this._client = client;
		if (!ExClientEvents.init) {
			ExClientEvents.init = true;
			for (let k in this.exEvents) {
				ExClientEvents.monitorMap[k] = new Map();
			}
			this._client.runOnServer((server) => {
				for (let k in ExClientEvents.monitorMap) {
					let p = (<any>this.exEvents)[k];
					let registerName = k;
					if ("name" in p) {
						registerName = p.name;
					}
					p.pattern(server, registerName, k);
				}
			});
		}

	}
	register(name: string, fun: (arg: any) => void) {
		let func: (arg: any) => void = fun;
		if (name in this.exEvents) {
			return (<any>this.exEvents)[name].subscribe(func);
		}

		console.warn("No event registered for name " + name);
	}


	cancel(name: string, fun: (arg: any) => void) {
		if (name in this.exEvents) {
			return (<any>this.exEvents)[name].unsubscribe(fun);
		}
	}

	unsubscribeAll() {
		for (let m in ExClientEvents.monitorMap) {
			ExClientEvents.monitorMap[m].delete(this._client.player);
		}
	}
}