export default class Queue {
    constructor() {
        this.queue = [];
    }
    push(t) {
        this.queue.push(t);
    }
    shift() {
        return this.queue.shift();
    }
    get length() {
        return this.queue.length;
    }
}
//# sourceMappingURL=Queue.js.map