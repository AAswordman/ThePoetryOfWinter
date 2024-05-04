"use strict";
// import { system, world } from "@minecraft/server";
// import SetTimeOutSupport from "../interface/SetTimeOutSupport.js";
// import ExSystem from "../utils/ExSystem.js";
// import TickDelayTask from "../utils/TickDelayTask.js";
// export default class ExThreadRunner {
//     settingTime = 500;
//     tasks!: Generator;
//     private tick?: TickDelayTask;
//     constructor(timeOut:SetTimeOutSupport){
//         timeOut.setTimeout()
//     }
//     async cut() {
//         let p = new Promise((resolve, reject) => {
//             set
//         })
//     }
//     isOver() {
//         return this.tasks.next().done;
//     }
//     start(delay: number, steps: number) {
//         let resolve: (value: unknown) => void, reject;
//         const pro = new Promise((rs, rj) => {
//             resolve = rs;
//         });
//         this.tick = ExSystem.tickTask(() => {
//             for (let i = 0; i < steps; i++)
//                 this.step();
//             if (this.isOver()) {
//                 this.tick!.stop();
//                 resolve(1);
//             }
//         }).delay(delay);
//         this.tick.start();
//         return pro;
//     }
//     run(r: () => Generator) {
//         this.tasks = r();
//     }
// }
//# sourceMappingURL=ExThreadRunner.js.map