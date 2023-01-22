import taskDaily_a from "./tasks/daily_a.js";
import taskDaily_b from "./tasks/daily_b.js";
import taskDaily_c from "./tasks/daily_c.js";
import taskDaily_x from "./tasks/daily_x.js";
import { PomTasks, taskTranToNum } from "../../../dec/server/data/Task.js";
import getgetCharByNum, { PROGRESS_CHAR } from "./getCharByNum.js";
export default function menuTaskUI(ctrl) {
    const lang = ctrl.getLang();
    let bagItems = ctrl.exPlayer.getBag().countAllItems();
    const ta = taskDaily_a(lang), tb = taskDaily_b(lang), tc = taskDaily_c(lang), tx = taskDaily_x(lang);
    return {
        "dailyTask": {
            "text": "dailyTask",
            "default": "0/" + ctrl.data.tasks.daily.all[0][0].toString(),
            "img": "textures/items/leaves_knife.png",
            "page": (client, ui) => {
                let arr = {};
                const daily = client.data.tasks.daily;
                let getTask = (index, taskJson) => {
                    var _a, _b, _c;
                    for (const i of daily.all[index]) {
                        let completed = daily.complete[index].includes(i);
                        let isOk = true;
                        let prog = 0;
                        let page = [
                            {
                                "type": "text_title",
                                "msg": taskJson.name + " " + taskJson.tasks[i].name
                            },
                            {
                                "type": "padding"
                            },
                            {
                                "type": "text",
                                "msg": "奖励："
                            }
                        ];
                        for (let v of taskJson.tasks[i].rewards) {
                            page.push({
                                "type": "text",
                                "msg": "    " + v.name + " " + v.count + " " + v.unit
                            });
                        }
                        page.push({
                            "type": "padding"
                        });
                        for (let v of taskJson.tasks[i].conditions) {
                            let conn = "";
                            let haveNum = 0;
                            let textShow = "";
                            if (v.type === "break") {
                                haveNum = ((_a = daily.cache[v.typeId]) !== null && _a !== void 0 ? _a : 0);
                                conn = "破坏";
                            }
                            else if (v.type === "kill") {
                                haveNum = ((_b = daily.cache[v.typeId]) !== null && _b !== void 0 ? _b : 0);
                                conn = "击杀";
                            }
                            else if (v.type === "item") {
                                conn = "物品";
                                haveNum = ((_c = bagItems.get(v.typeId)) !== null && _c !== void 0 ? _c : 0);
                            }
                            if (haveNum < v.count) {
                                isOk = false;
                            }
                            let mprog = completed ? 1 : Math.min(1, haveNum / v.count);
                            prog += mprog / taskJson.tasks[i].conditions.length;
                            textShow = (haveNum >= v.count || completed ? "§a" : "§c") + ("需求: " + conn + " " + v.name + " " + (completed ? v.count : haveNum) + "/" + v.count + "个\n");
                            textShow += getgetCharByNum(mprog, 10, PROGRESS_CHAR);
                            page.push({
                                "type": "textWithBg",
                                "msg": textShow
                            });
                        }
                        if (isOk && !completed) {
                            page.push({
                                "type": "padding"
                            }, {
                                "type": "button",
                                "msg": "完成任务",
                                "function": (client, ui) => {
                                    var _a;
                                    for (let v of taskJson.tasks[i].rewards) {
                                        if (v.type === "integral") {
                                            client.exPlayer.getScoresManager().addScoreAsync("wbdjjf", v.count);
                                        }
                                    }
                                    for (let v of taskJson.tasks[i].conditions) {
                                        if (v.type === "item") {
                                            let bag = client.exPlayer.getBag();
                                            bag.clearItem(v.typeId, v.count);
                                        }
                                    }
                                    bagItems = client.exPlayer.getBag().countAllItems();
                                    (_a = client.data.tasks) === null || _a === void 0 ? void 0 : _a.daily.complete[index].push(i);
                                    return true;
                                }
                            });
                        }
                        arr[index + "/" + i] = {
                            "text": (completed ? "§a" : (isOk ? "§e" : "§c")) + taskJson.tasks[i].name + ": " + (completed ? "已完成" : Math.round(prog * 100) + "％"),
                            "page": page
                        };
                    }
                };
                getTask(0, ta);
                getTask(1, tb);
                getTask(2, tc);
                getTask(3, tx);
                return arr;
            }
        },
        "paperTask": {
            "text": "paperTask",
            "default": "1",
            "img": "textures/items/magic_scroll_blue.png",
            "page": (client, ui) => {
                let arr = {};
                let item = ctrl.exPlayer.getBag().getItemOnHand();
                if (!item || item.getLore().length === 0) {
                    return {
                        "1": {
                            "text": "空",
                            "page": [
                                {
                                    "type": "text",
                                    "msg": "你的手上未持有蓝魔法卷轴"
                                }
                            ]
                        }
                    };
                }
                let lor = item.getLore();
                for (let i in lor) {
                    let m = [];
                    arr[i] = {
                        "page": m,
                        "text": lor[i]
                    };
                    const index = PomTasks.findIndex(t => t.id === taskTranToNum(lor[i]));
                    if (index === -1) {
                        throw new Error("Can't find task " + taskTranToNum(lor[i]));
                    }
                    let task = PomTasks[index];
                    m.push({
                        "type": "text_title",
                        "msg": lor[i] + " : " + task.title()
                    }, {
                        "type": "padding"
                    }, {
                        "type": "text",
                        "msg": task.body()
                    }, {
                        "type": "button",
                        "msg": "text.dec:task_complete_button.name",
                        "function": (client, ui) => {
                            task.detect(client.exPlayer);
                            return false;
                        }
                    });
                }
                return arr;
            }
        },
        "progressTask": {
            "text": "progressTask",
            "default": "start",
            "img": "textures/items/experience_book.png",
            "page": (client, ui) => {
                return {
                    "start": {
                        "text": "开始",
                        "page": [
                            {
                                "type": "text_title",
                                "msg": "开始"
                            }
                        ]
                    }
                };
            }
        }
    };
}
//# sourceMappingURL=menuTaskUI.js.map