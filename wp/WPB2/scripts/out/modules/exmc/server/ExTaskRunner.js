import ExSystem from "../utils/ExSystem.js";
export default class ExTaskRunner {
    step() {
        this.tasks.next();
    }
    isOver() {
        return this.tasks.next().done;
    }
    start(delay, steps) {
        let resolve, reject;
        const pro = new Promise((rs, rj) => {
            resolve = rs;
        });
        this.tick = ExSystem.tickTask(() => {
            for (let i = 0; i < steps; i++)
                this.step();
            if (this.isOver()) {
                this.tick.stop();
                resolve(1);
            }
        }).delay(delay);
        this.tick.start();
        return pro;
    }
    run(r) {
        this.tasks = r();
    }
}
//# sourceMappingURL=ExTaskRunner.js.map