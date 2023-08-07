import ExSystem from '../utils/ExSystem.js';
class ExTickQueue {
    static push(f) {
        this.queue.push(f);
        return this;
    }
    static init(server) {
        this.delay = ExSystem.tickTask(() => {
            if (this.queue.length > 0) {
                this.queue.shift()?.();
            }
        }).delay(60);
        this.delay.start();
    }
}
ExTickQueue.queue = [];
export default ExTickQueue;
