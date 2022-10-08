import ExGameServer from "./ExGameServer.js";
import ExGameClient from './ExGameClient.js';

export default class ExTransmissionMsg<T> {
	message;
	sender: string;
	type: number;
	toId: string;
	constructor(type: number,
		toId: string,
		sender: string,
		message: T | ((server: ExGameServer) => T) | ((client: ExGameClient) => T)) {
		this.message = message;
		this.sender = sender;
		this.type = type;
		this.toId = toId;
	}
}