
export default class ExTransmissionMsg {
	message: any;
	sender: string;
	type: number;
	toId: string;
	constructor(type: number,
		toId: string,
		sender: string,
		message: any) {
		this.message = message;
		this.sender = sender;
		this.type = type;
		this.toId = toId;
	}
}