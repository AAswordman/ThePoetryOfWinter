import ExGameServer from './ExGameServer.js';
import TickDelayTask from '../utils/TickDelayTask.js';
export default class ExTickQueue {
    private static queue: (() => void)[] = [];
    private static delay: TickDelayTask;

    public static push(f: () => void) {
        this.queue.push(f);
        return this;
    }
    public static init(server: ExGameServer) {
        this.delay = new TickDelayTask(server.getEvents(), () => {
            if (this.queue.length > 0) {
                this.queue.shift()?.();
            }
        }).delay(60);
        this.delay.start();
    }
}