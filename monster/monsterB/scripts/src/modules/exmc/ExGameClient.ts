import ExGameServer from "./ExGameServer.js";
import ExGameConfig from "./ExGameConfig.js";
import ExTransmissionMsg from "./ExTransmissionMsg.js";
import ExClientEvents from "./ExClientEvents.js";
import { TickEvent } from 'mojang-minecraft';
import {
	ChatEvent,
	Player
} from "mojang-minecraft";

export default class ExGameClient{
	private _events: ExClientEvents;
	
	debuggerChatTest = (e:ChatEvent) => {
		if (e.message.startsWith("*/"))
			ExGameConfig.console.info(eval(e.message.substring(2, e.message.length)));
	}
	player: Player;
	private _server: ExGameServer;
	clientId: string;
	playerName: string;

	constructor(server: ExGameServer, id: string, player: Player) {
		this._server = server;
		this.clientId = id;
		this.player = player;
		this.playerName = player.name;

		this._events = new ExClientEvents(this);
		if (ExGameConfig.debug) {
			this.asDebugger();
		} else {
			this.notDebugger();
		}
	}
	onLeave() {
		this._events.unsubscribeAll();
	}

	getEvents() {
		return this._events;
	}

	_receiveMessage(msg: ExTransmissionMsg) {
		if (msg.type == ExGameConfig.transmissionType.runOnClient) {
			msg.message(this);
		} else if (msg.type == ExGameConfig.transmissionType.sendToClient) {
			this.receiveMessage(msg);
		} else {
			ExGameConfig.console.error("客户端：未知传输类型" + msg.type);
		}
	}

	receiveMessage(msg: ExTransmissionMsg) {

	}
	/**
	 * 
	 * @param {string} id 
	 * @param {number} useType 
	 * @param {*} msg 
	 */
	postMessage(id: string, useType: number, msg: any) {
		this._server._receiveMessage(new ExTransmissionMsg(useType, id, this.clientId, msg));
	}

	/**
	 * 
	 * @param {(arg: ExGameServer) => void} msg 
	 */
	runOnServer(msg: (arg: ExGameServer) => void) {
		this._server._receiveMessage(new ExTransmissionMsg(ExGameConfig.transmissionType.runOnServer,
			ExGameConfig.serverId, this.clientId, msg));
	}

	asDebugger() {
		this.player.addTag("debugger");
		this._events.exEvents.chat.subscribe(this.debuggerChatTest);
	}
	notDebugger() {
		this.player.removeTag("debugger");
		this._events.exEvents.chat.unsubscribe(this.debuggerChatTest);
	}
	
	setTimeout(fun: () => void, timeout: number) {
		let time = 0;
		const method = (e:TickEvent) => {
			time += e.deltaTime;
			if (time > timeout) {
				fun();
				this.getEvents().exEvents.tick.unsubscribe(method);
			}
		};
		this.getEvents().exEvents.tick.subscribe(method);
	}
}