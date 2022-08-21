import ExGameServer from "./ExGameServer.js";
import ExGameConfig from "./ExGameConfig.js";
import ExTransmissionMsg from "./ExTransmissionMsg.js";
import ExClientEvents from "./ExClientEvents.js";
import { ChatEvent, Dimension, Player, TickEvent, world } from 'mojang-minecraft';
import ExPlayer from "./entity/ExPlayer.js";
import SetTimeOutSupport from "./interface/SetTimeOutSupport.js";
import ExDimension from "./ExDimension.js";
import ExErrorStack from "./ExErrorStack.js";

export default class ExGameClient implements SetTimeOutSupport {
	private _events: ExClientEvents;

	debuggerChatTest = (e: ChatEvent) => {
		if (e.message.startsWith("*/"))
			ExGameConfig.console.info(eval(e.message.substring(2, e.message.length)));
	}
	player: Player;
	exPlayer: ExPlayer;
	private _server: ExGameServer;
	clientId: string;
	playerName: string;

	debug_removeAllTag() {
		for (let i of this.exPlayer.getTags()) {
			this.exPlayer.removeTag(i);
		}
	}

	constructor(server: ExGameServer, id: string, player: Player) {
		this._server = server;
		this.clientId = id;
		this.player = player;
		this.exPlayer = ExPlayer.getInstance(player);
		this.playerName = player.name;

		this._events = new ExClientEvents(this);
		if (ExGameConfig.debug) {
			this.asDebugger();
		} else {
			this.notDebugger();
		}
		this.onJoin();
	}

	getDimension(type?: string) {
		if (type !== undefined) {
			return world.getDimension(type);
		} else {
			return this.exPlayer.getDimension();
		}
	}
	getPlayers() {
		return world.getPlayers();
	}



	onJoin() {
		let func = () => {
			try {
				this.player.runCommand(`testfor @s`);
				try {
					this.onLoaded();
				} catch (e) {
					ExErrorStack.throwError(e);
				}
			} catch (e) {
				this.setTimeout(func, 2000);
			}
		};
		func();
	}
	onLoaded() {
	}

	onLeave() {
		this._events.unsubscribeAll();
	}

	getEvents() {
		return this._events;
	}

	async _receiveMessage<T>(msg: ExTransmissionMsg<T>) {
		if (msg.type == ExGameConfig.transmissionType.runOnClient) {
			if (typeof msg.message === "function") {
				return (<(server: ExGameClient) => T>msg.message)(this);
			} else {
				ExGameConfig.console.error("Invalid message received: " + msg.message);
			}
		} else if (msg.type == ExGameConfig.transmissionType.sendToClient) {
			this.receiveMessage(msg);
		} else {
			ExGameConfig.console.error("客户端：未知传输类型" + msg.type);
		}
	}

	receiveMessage(msg: ExTransmissionMsg<any>) {

	}

	postMessage(id: string, useType: number, msg: any) {
		this._server._receiveMessage(new ExTransmissionMsg(useType, id, this.clientId, msg));
	}


	runOnServer<T>(msg: (arg: ExGameServer) => T) {
		return this._server._receiveMessage<T>(new ExTransmissionMsg<T>(ExGameConfig.transmissionType.runOnServer,
			ExGameConfig.serverId, this.clientId, msg));
	}

	asDebugger() {
		this.player.addTag("debugger");
		this._events.exEvents.chat.subscribe(this.debuggerChatTest);
	}
	notDebugger() {
		this.player.removeTag("debugger");
	}

	setTimeout(fun: () => void, timeout: number) {
		let time = 0;
		let method = (e: TickEvent) => {
			time += e.deltaTime * 1000;
			if (time > timeout) {
				this.getEvents().exEvents.tick.unsubscribe(method);
				fun();
			}
		};
		this.getEvents().exEvents.tick.subscribe(method);
	}

}