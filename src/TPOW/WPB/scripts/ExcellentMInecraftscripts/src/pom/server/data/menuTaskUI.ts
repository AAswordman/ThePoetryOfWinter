import PomClient from "../PomClient.js";
import GameController from "../func/GameController.js";
import { MenuUIAlertView, MenuUIJson, MenuUIPage } from "../ui/MenuUIAlert.js";
import { langType } from "./langType.js";
import taskDaily_a from "./tasks/daily_a.js";
import taskDaily_b from "./tasks/daily_b.js";
import taskDaily_c from "./tasks/daily_c.js";
import taskDaily_x from "./tasks/daily_x.js";
import { PomTaskJSON } from './tasks/PomTask.js';
import { PomTasks, taskTranToNum } from "../../../dec/server/data/Task.js";
import getCharByNum, { PROGRESS_CHAR } from "./getCharByNum.js";
import taskProgress from "./tasks/taskProgress.js";



export default function menuTaskUI(ctrl: GameController): MenuUIJson<PomClient> {
    const lang = ctrl.getLang();
    let bagItems = ctrl.exPlayer.getBag().countAllItems();
    const ta = taskDaily_a(lang),
        tb = taskDaily_b(lang),
        tc = taskDaily_c(lang),
        tx = taskDaily_x(lang),
        pro = taskProgress(lang);
    return {
        "dailyTask": {
            "text": "dailyTask",
            "default": "0/" + ctrl.data.tasks!.daily.all[0][0].toString(),
            "img": "textures/items/leaves_knife.png",
            "page": (client, ui) => {
                let arr: MenuUIPage<PomClient> = {};
                const daily = client.data.tasks!.daily;
                let getTask = (index: number, taskJson: PomTaskJSON) => {
                    for (const i of daily.all[index]) {
                        let completed = daily.complete[index].includes(i);
                        let isOk = true;
                        let prog = 0;
                        let page: MenuUIAlertView<PomClient>[] = [
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
                        ]

                        for (let v of taskJson.tasks[i].rewards) {
                            page.push({
                                "type": "text",
                                "msg": "    " + v.name + " " + (v.count * client.getDifficulty().LevelFactor) + " " + v.unit
                            });
                        }

                        page.push({
                            "type": "padding"
                        });


                        for (let v of taskJson.tasks[i].conditions) {
                            let conn = "";
                            let haveNum: number = 0;
                            let textShow = "";
                            if (v.type === "break") {
                                haveNum = (daily.cache[v.typeId] ?? 0);
                                conn = "破坏";
                            } else if (v.type === "kill") {
                                haveNum = (daily.cache[v.typeId] ?? 0);
                                conn = "击杀";
                            } else if (v.type === "item") {
                                conn = "物品";
                                haveNum = (bagItems.get(v.typeId) ?? 0);
                            }
                            if (haveNum < v.count) {
                                isOk = false;
                            }
                            let mprog = completed ? 1 : Math.min(1, haveNum / v.count);
                            prog += mprog / taskJson.tasks[i].conditions.length;
                            textShow = (haveNum >= v.count || completed ? "§a" : "§c") + ("需求: " + conn + " " + v.name + " " + (completed ? v.count : haveNum) + "/" + v.count + "个\n");
                            textShow += getCharByNum(mprog, 10, PROGRESS_CHAR);

                            page.push({
                                "type": "textWithBg",
                                "msg": textShow
                            });

                        }
                        if (isOk && !completed) {
                            page.push(
                                {
                                    "type": "padding"
                                },
                                {
                                    "type": "button",
                                    "msg": "完成任务",
                                    "function": (client, ui) => {
                                        for (let v of taskJson.tasks[i].rewards) {
                                            if (v.type === "integral") {
                                                client.data.gameExperience += v.count * client.getDifficulty().LevelFactor;
                                            }
                                        }
                                        for (let v of taskJson.tasks[i].conditions) {
                                            if (v.type === "item") {
                                                let bag = client.exPlayer.getBag();
                                                bag.clearItem(v.typeId, v.count);
                                            }
                                        }
                                        bagItems = client.exPlayer.getBag().countAllItems();

                                        client.data.tasks?.daily.complete[index].push(i);
                                        client.cache.save();
                                        return true;
                                    }
                                })
                        }
                        arr[index + "/" + i] = {
                            "text": (completed ? "§a" : (isOk ? "§e" : "§c")) + taskJson.tasks[i].name + ": " + (completed ? "已完成" : Math.round(prog * 100) + "％"),
                            "page": page
                        }
                    }
                }
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
                let arr: MenuUIPage<PomClient> = {};
                let item = ctrl.exPlayer.getBag().itemOnMainHand;

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
                    }
                }
                let lor = item.getLore();
                let num = 0;
                for (let i of lor) {
                    num++;
                    let m: MenuUIAlertView<PomClient>[] = [];
                    arr[num] = {
                        "page": m,
                        "text": i
                    };
                    let x = taskTranToNum(i);
                    const index = PomTasks.findIndex(e => e.id === x);
                    if (index === -1) {
                        throw new Error("Can't find task " + taskTranToNum(i));

                    }
                    let task = PomTasks[index];

                    m.push(
                        {
                            "type": "text_title",
                            "msg": task.title()
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": task.body()
                        },
                        {
                            "type": "button",
                            "msg": "text.dec:task_complete_button.name",
                            "function": (client, ui) => {
                                task.detect(client,lor);
                                return false;
                            }
                        });
                }
                return arr;
            }
        },
        "progressTask": {
            "text": "progressTask",
            "default": "main_pom_1",
            "img": "textures/items/experience_book.png",
            "page": (client, ui) => {
                let arr: MenuUIPage<PomClient> = {};
                const taskList = client.data.tasks!.progress;
                for (const i in pro) {
                    let task = pro[i];
                    let completed = taskList.complete.includes(i);
                    let isOk = true;
                    let prog = 0;
                    let page: MenuUIAlertView<PomClient>[] = [
                        {
                            "type": "text_title",
                            "msg": task.name
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": "奖励："
                        }
                    ]

                    for (let v of task.rewards) {
                        page.push({
                            "type": "text",
                            "msg": "    " + v.name + " " + (v.count * client.getDifficulty().LevelFactor) + " " + (v.unit)
                        });
                    }

                    page.push({
                        "type": "padding"
                    });


                    for (let v of task.conditions) {
                        let conn = "";
                        let haveNum: number = 0;
                        let textShow = "";
                        if (v.type === "boss") {
                            v.damage = v.damage ?? 1;
                            haveNum = (taskList.data[v.typeId] ?? 0);
                            conn = "击杀并造成伤害";

                            if (haveNum < v.damage) {
                                isOk = false;
                            }
                            let mprog = completed ? 1 : Math.min(1, haveNum / v.damage);
                            prog += mprog / task.conditions.length;
                            textShow = (haveNum >= v.damage || completed ? "§a" : "§c") + ("需求: " + conn + " " + v.name + " " + (completed ? v.damage : haveNum) + "/" + v.damage + "点\n");
                            textShow += getCharByNum(mprog, 10, PROGRESS_CHAR);
                        } else if (v.type === "boss_tag") {
                            v.tagName = v.tagName ?? "undefined";
                            haveNum = client.player.hasTag(v.tagName) ? 1 : 0;
                            conn = "击杀";

                            if (haveNum < 1) {
                                isOk = false;
                            }
                            let mprog = completed ? 1 : Math.min(1, haveNum / 1);
                            prog += mprog / task.conditions.length;
                            textShow = (haveNum >= 1 || completed ? "§a" : "§c") + ("需求: " + conn + " " + v.name + " " + (completed ? 1 : haveNum) + "/" + 1 + "个\n");
                            textShow += getCharByNum(mprog, 10, PROGRESS_CHAR);
                        }
                        page.push({
                            "type": "textWithBg",
                            "msg": textShow
                        });
                    }


                    if (isOk && !completed) {
                        page.push(
                            {
                                "type": "padding"
                            },
                            {
                                "type": "button",
                                "msg": "完成任务",
                                "function": (client, ui) => {
                                    for (let v of task.rewards) {
                                        if (v.type === "integral") {
                                            client.data.gameExperience += v.count * client.getDifficulty().LevelFactor;
                                        }
                                    }
                                    // for (let v of task.conditions) {
                                    //     if (v.type === "item") {
                                    //         let bag = client.exPlayer.getBag();
                                    //         bag.clearItem(v.typeId, v.count);
                                    //     }
                                    // }
                                    bagItems = client.exPlayer.getBag().countAllItems();

                                    taskList.complete.push(i);
                                    client.cache.save();
                                    return true;
                                }
                            })
                    }
                    arr[i] = {
                        "text": (completed ? "§a" : (isOk ? "§e" : "§c")) + task.name + ": " + (completed ? "已完成" : Math.round(prog * 100) + "％"),
                        "page": page

                    }
                }

                return arr;
            }
        }

    }
}