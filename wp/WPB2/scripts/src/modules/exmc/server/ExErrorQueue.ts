import ExGameServer from './ExGameServer.js';
export default class ExErrorQueue{
    private static errorStack:unknown[] = [];

	public static throwError(error:unknown){
		this.errorStack.push(error);
	}
    public static init(server:ExGameServer){
        server.getEvents().events.tick.subscribe(tick => {
			if(this.errorStack.length > 0){
				throw this.errorStack.shift();
			}
		});
    }
}

export function to<T>(p:Promise<T>){
    return p.then(res => [res,undefined]).catch(err => {ExErrorQueue.throwError(err); return [undefined,err];});
}