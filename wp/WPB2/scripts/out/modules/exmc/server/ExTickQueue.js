import ExSystem from '../utils/ExSystem.js';
export default class ExTickQueue {
    static push(f) {
        this.queue.push(f);
        return this;
    }
    static init(server) {
        this.delay = ExSystem.tickTask(() => {
            var _a;
            if (this.queue.length > 0) {
                (_a = this.queue.shift()) === null || _a === void 0 ? void 0 : _a();
            }
        }).delay(60);
        this.delay.start();
    }
}
ExTickQueue.queue = [];
//# sourceMappingURL=ExTickQueue.js.map