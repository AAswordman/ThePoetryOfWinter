import menuTaskUI from "../data/menuTaskUI.js";
import GameController from "./GameController.js";
import MenuUIAlert from '../ui/MenuUIAlert.js';
import taskDaily_a from '../data/tasks/daily_a.js';
import taskDaily_x from "../data/tasks/daily_x.js";
import taskDaily_c from "../data/tasks/daily_c.js";
import taskDaily_b from "../data/tasks/daily_b.js";
import ExEntity from '../../../modules/exmc/server/entity/ExEntity.js';
export default class PomTaskSystem extends GameController {
    constructor() {
        super(...arguments);
        this.recordDailyArray = new Set();
        this.recordProgressArray = new Set();
    }
    show(page, subpage) {
        let ui = new MenuUIAlert(this.client, menuTaskUI(this));
        if (!page || !subpage) {
            page = "dailyTask";
            subpage = ui.getJSON()[page].default;
        }
        ui.showPage(page, subpage);
    }
    onJoin() {
        if (!this.data.tasks) {
            this.data.tasks = {
                daily: {
                    complete: [[], [], [], []],
                    all: [[], [], [], []],
                    date: "1970-2-31",
                    cache: {}
                },
                progress: {
                    complete: [],
                    data: {}
                }
            };
        }
        let date = new Date();
        let nDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        let getInt = (arr) => {
            return Math.floor(arr.length * Math.random());
        };
        let ta = taskDaily_a(this.getLang()).tasks;
        let tb = taskDaily_b(this.getLang()).tasks;
        let tc = taskDaily_c(this.getLang()).tasks;
        let tx = taskDaily_x(this.getLang()).tasks;
        if (this.data.tasks.daily.date !== nDate) {
            this.data.tasks.daily.all = [[
                    getInt(ta), getInt(ta), getInt(ta)
                ],
                [
                    getInt(tb), getInt(tb)
                ],
                [
                    getInt(tc)
                ],
                [
                    getInt(tx)
                ]];
            this.data.tasks.daily.complete = [[], [], [], []];
            this.data.tasks.daily.cache = {};
            this.data.tasks.daily.date = nDate;
        }
        for (let k in ta) {
            for (let v of ta[k].conditions) {
                if (v.type === "break" || v.type === "kill") {
                    this.recordDailyArray.add(v.typeId);
                }
            }
        }
        for (let k in tb) {
            for (let v of tb[k].conditions) {
                if (v.type === "break" || v.type === "kill") {
                    this.recordDailyArray.add(v.typeId);
                }
            }
        }
        for (let k in tc) {
            for (let v of tc[k].conditions) {
                if (v.type === "break" || v.type === "kill") {
                    this.recordDailyArray.add(v.typeId);
                }
            }
        }
        for (let k in tx) {
            for (let v of tx[k].conditions) {
                if (v.type === "break" || v.type === "kill") {
                    this.recordDailyArray.add(v.typeId);
                }
            }
        }
        this.getEvents().exEvents.blockBreak.subscribe(e => {
            var _a, _b;
            if (!this.data.tasks)
                return;
            if (this.recordDailyArray.has(e.brokenBlockPermutation.type.id)) {
                this.data.tasks.daily.cache[e.brokenBlockPermutation.type.id] = 1 + ((_a = this.data.tasks.daily.cache[e.brokenBlockPermutation.type.id]) !== null && _a !== void 0 ? _a : 0);
            }
            if (this.recordProgressArray.has(e.brokenBlockPermutation.type.id)) {
                this.data.tasks.progress.data[e.brokenBlockPermutation.type.id] = 1 + ((_b = this.data.tasks.progress.data[e.brokenBlockPermutation.type.id]) !== null && _b !== void 0 ? _b : 0);
            }
        });
        this.getEvents().exEvents.playerHitEntity.subscribe(e => {
            var _a, _b;
            if (!this.data.tasks)
                return;
            if (this.recordDailyArray.has(e.hurtEntity.typeId)) {
                if (ExEntity.getInstance(e.hurtEntity).getHealth() < 0) {
                    this.data.tasks.daily.cache[e.hurtEntity.typeId] = 1 + ((_a = this.data.tasks.daily.cache[e.hurtEntity.typeId]) !== null && _a !== void 0 ? _a : 0);
                }
            }
            if (this.recordProgressArray.has(e.hurtEntity.typeId)) {
                if (ExEntity.getInstance(e.hurtEntity).getHealth() < 0) {
                    this.data.tasks.progress.data[e.hurtEntity.typeId] = 1 + ((_b = this.data.tasks.progress.data[e.hurtEntity.typeId]) !== null && _b !== void 0 ? _b : 0);
                }
            }
        });
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=PomTaskSystem.js.map