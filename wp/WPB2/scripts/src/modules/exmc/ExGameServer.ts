import ExGameClient from "./ExGameClient.js";
import ExDimension from "./ExDimension.js";
import { world, MinecraftDimensionTypes, PlayerJoinEvent, Player, TickEvent, PlayerLeaveEvent } from "mojang-minecraft";
import ExGameConfig from "./ExGameConfig.js";
import initConsole from "./utils/Console.js";
import ExTransmissionMsg from "./ExTransmissionMsg.js";
import ExServerEvents from "./ExServerEvents.js";
import UUID from "./utils/UUID.js";
import ExErrorStack from './ExErrorStack.js';

export default class ExGameServer {
	clients;
	_events;

	constructor() {
		this.clients = new Map<string, ExGameClient>()
		ExGameConfig.console = initConsole(ExGameConfig);
		
		this._events = new ExServerEvents(this);
		ExErrorStack.init(this);
		
		this._events.events.playerJoin.subscribe(this.onClientJoin.bind(this));
		this._events.events.playerLeave.subscribe(this.onClientLeave.bind(this));
	}

	getDimension(dimensionId: string) {
		return new ExDimension(world.getDimension(dimensionId));
	}

	getEvents() {
		return this._events;
	}

	//====== interactive with clients =======

	sendMessage(clientId: string, useType: number, msg: any) {
		if (this.clients.has(clientId)) {
			(<ExGameClient>this.clients.get(clientId)).receiveMessage(new ExTransmissionMsg(useType, clientId, ExGameConfig.serverId, msg));
		}
	}
	async _receiveMessage<T>(msg: ExTransmissionMsg<T>) {
		if (msg.toId == ExGameConfig.serverId) {
			if (msg.type == ExGameConfig.transmissionType.runOnServer) {
				return (<(arg: ExGameServer) => T>msg.message)(this);
			} else if (msg.type == ExGameConfig.transmissionType.sendToServer) {
				this.receiveMessage(msg);
			} else {
				ExGameConfig.console.error("服务端：未知传输类型" + msg.type);
			}
		} else {
			let client;
			if (typeof (msg.toId) == "object") {
				let clientId = this.findClientByPlayer(msg.toId);
				if (clientId === undefined) {
					ExGameConfig.console.error(msg.toId, "is not exists");
					return;
				}
				client = this.clients.get(clientId);
			} else {
				client = this.clients.get(msg.toId);
				if (client == null) {
					let clientId = this.findClientByName(msg.toId);
					if (clientId == null) {
						ExGameConfig.console.error("服务端： 未找到目标" + msg.toId);
						return;
					}
					client = this.clients.get(clientId);
				}
			}
			if (client === undefined) {
				ExGameConfig.console.error(msg.toId, "is not exists");
				return;
			}
			client._receiveMessage(msg);
		}
	}

	receiveMessage(msg: ExTransmissionMsg<any>) {
	}

	getClients() {
		return this.clients.values();
	}
	getPlayers() {
		let players = [];
		for (let k of this.clients) {
			players.push(k[1].player);
		}
		return players;
	}

	findClientByName(playerName: string) {
		for (let k of this.clients) {
			if (k[1].playerName == playerName) {
				return k[0];
			}
		}
		return undefined;
	}

	findClientByPlayer(player: Player) {
		for (let k of this.clients) {
			if (k[1].player == player) {
				return k[0];
			}
		}
		return undefined;
	}

	onClientJoin(event: PlayerJoinEvent) {
		let player = event.player;
		let id = UUID.randomUUID();
		this.clients.set(id, this.newClient(id, player));

	}

	onClientLeave(event: PlayerLeaveEvent) {
		let clientId = this.findClientByName(event.playerName);
		if (clientId === undefined) {
			ExGameConfig.console.error(clientId, "is not exists");
			return;
		}
		let client = this.clients.get(clientId);
		if (client === undefined) {
			ExGameConfig.console.error(clientId, "is not exists");
			return;
		}
		client.onLeave();
		this.clients.delete(client.clientId);
	}

	newClient(id: string, player: Player):ExGameClient {
		return new ExGameClient(this, id, player);
	}

	setTimeout(fun: () => void, timeout: number) {
		let time = 0;
		const method = (e: TickEvent) => {
			time += e.deltaTime * 1000;
			if (time > timeout) {
				this.getEvents().events.tick.unsubscribe(method);
				fun();
			}
		};
		this.getEvents().events.tick.subscribe(method);
	}
}