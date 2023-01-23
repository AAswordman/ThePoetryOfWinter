var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MenuUIAlert from '../ui/MenuUIAlert.js';
import ExMessageAlert from "../../../modules/exmc/server/ui/ExMessageAlert.js";
import TalentData, { Occupation, Talent } from "../cache/TalentData.js";
import { ModalFormData } from "@minecraft/server-ui";
import Vector3 from '../../../modules/exmc/math/Vector3.js';
import ExPlayer from "../../../modules/exmc/server/entity/ExPlayer.js";
import ExErrorQueue from "../../../modules/exmc/server/ExErrorQueue.js";
import ExGameConfig from "../../../modules/exmc/server/ExGameConfig.js";
import getCharByNum, { PROGRESS_CHAR, TALENT_CHAR } from "./getCharByNum.js";
import POMLICENSE from "./POMLICENSE.js";
export default function menuFunctionUI(lang) {
    return {
        "main": {
            "img": "textures/items/wet_paper",
            "text": lang.menuUIMsgBailan1,
            "default": "notice",
            "page": {
                "notice": {
                    "text": lang.menuUISubtitleGonggao,
                    "page": [
                        {
                            "type": "img_adjustToScreen",
                            "msg": "textures/ui/title.png"
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgGonggao1
                        }
                    ]
                },
                "version": {
                    "text": lang.menuUIMsgBailan5,
                    "page": (client, ui) => {
                        return [
                            {
                                "type": "text_title",
                                "msg": lang.menuUIMsgBanben1
                            },
                            {
                                "type": "text",
                                "msg": lang.menuUIMsgBanben2
                            },
                            {
                                "type": "text",
                                "msg": ExGameConfig.config.addonVersion
                            },
                            {
                                "type": "text",
                                "msg": lang.menuUIMsgBanben3
                            },
                            {
                                "type": "text",
                                "msg": "https://aaswordman.github.io/ThePoetryOfWinter/"
                            },
                            {
                                "type": "padding"
                            },
                            {
                                "type": "text_title",
                                "msg": lang.menuUIMsgBanben4
                            },
                            {
                                "type": "padding"
                            },
                            {
                                "type": "text",
                                "msg": lang.menuUIMsgBanben5
                            },
                            {
                                "type": "padding"
                            },
                            {
                                "type": "text_title",
                                "msg": lang.menuUIMsgBanben6
                            },
                            {
                                "type": "padding"
                            }
                        ].concat(MenuUIAlert.getLabelViews(`
名字排序为随机排序

Main creator:   - LiLeyi   AAswordsman
Assistants:  -  
EnderghostScale  - 人造肉、部分怪物、投掷炸药和技术支持
haveyouwantto - 技术支持
huo鱼一只 - 技术支持
AR_UnryAllenCN - 技术支持
世心 - 狼人，暗狼人
論娘 - 幻术师
荷叶 - 提供灵感，新手指南
Q儿 - 贴图、提供灵感
SpiffyTerror - 模型、生物动画
悸动天使 - 指令支持
晴风 - 霸体核心
画盒豆腐 - 提供灵感
兔块子 - 部分实体
传说中阿库西斯教教徒 - 提供灵感、剧情、建筑
枫雪白霜 - 提供灵感和贴图
碧月狐DADA - 技术支持
Fulank彡North cat - 提供贴图、灵感
一只朴实无华的蒜头王八 - 提供贴图、灵感和测试
KirisamePPSH - 提供建筑、贴图
Miku4962 - 提供贴图和测试
Mr.龙灵 - 提供结构和贴图
Hanyi寒翼 - 灵感、建筑和贴图
鸥吃鱼 - 部分翻译
KucerLuo - 建筑
Repforce - 建筑
一只有疑问的猪 - 建筑
豆沙 - 部分怪物
某不知名的琦玉 - 灵感
Him1025(kALE) - 部分贴图、logo、icon、剧情、建筑、模型动画
WINDes - 任务清单、测试、灵感、部分
ALiFang ZHE - 部分模型、贴图
枨触 - 建筑
屑屑猹 - 部分翻译

Our Team
竹翼团队     无上蓝痕(BlueMark Studio)

Special Thanks
BunBun不是笨笨    在矿里的小金呀
`.split("\n")));
                    }
                },
                "imp": {
                    "text": lang.menuUIMsgBailan6,
                    "page": (client, ui) => {
                        return MenuUIAlert.getLabelViews(POMLICENSE.split("\n"));
                    }
                },
                "QA": {
                    "text": "Q & A",
                    "page": [
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text_title",
                            "msg": lang.menuUIMsgBailan103
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan104
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text_title",
                            "msg": lang.menuUIMsgBailan7
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan8
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text_title",
                            "msg": lang.menuUIMsgBailan9
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan10
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text_title",
                            "msg": lang.menuUIMsgBailan11
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan12
                        }
                    ]
                }
            }
        },
        "person": {
            "img": "textures/items/amethyst_chestplate.png",
            "text": lang.menuUIMsgBailan13,
            "default": "info",
            "page": {
                "info": {
                    "text": lang.menuUIMsgBailan14,
                    "page": (client, ui) => {
                        let source = client.player;
                        let scores = ExPlayer.getInstance(source).getScoresManager();
                        let msg = [`   ${lang.menuUIMsgBailan94}: ${client.gameId}`,
                            `   ${lang.menuUIMsgBailan96}: ${scores.getScore("wbfl")}`,
                            `   ${lang.menuUIMsgBailan97}: ${scores.getScore("wbwqlq")}`,
                            `   ${lang.menuUIMsgBailan98}: ${scores.getScore("wbkjlqcg")}`,
                            `   ${lang.menuUIMsgBailan99}: ${source.hasTag("wbmsyh") ? lang.menuUIMsgBailan15 : lang.menuUIMsgBailan16}`,
                            `   ${lang.menuUIMsgBailan100}: ${source.hasTag("wbdjeff") ? lang.menuUIMsgBailan15 : lang.menuUIMsgBailan16}`];
                        let arr = MenuUIAlert.getLabelViews(msg);
                        arr.unshift({
                            "type": "text_title",
                            "msg": "个人信息"
                        });
                        let g = scores.getScore("wbdjcg");
                        let gj = scores.getScore("wbdjjf");
                        arr.push({
                            "type": "textWithBg",
                            "msg": `${lang.menuUIMsgBailan95}: ${g} 当前等级积分: ${gj}/${150 * Math.pow(g, 2) + 1050 * g + 900}
${getCharByNum((gj - (150 * Math.pow((g - 1), 2) + 1050 * (g - 1) + 900)) / (300 * g + 900), 10, PROGRESS_CHAR)}`
                        });
                        return arr;
                    }
                },
                "add": {
                    "text": lang.menuUIMsgBailan19,
                    "page": [
                        {
                            "type": "text_title",
                            "msg": lang.menuUIMsgBailan20
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan21
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "toggle",
                            "msg": lang.menuUIMsgBailan22,
                            "state": (client, ui) => client.player.hasTag("wbdjeff"),
                            "function": (client, ui) => {
                                if (!client.player.hasTag("wbdjeff")) {
                                    client.player.addTag("wbdjeff");
                                }
                                else {
                                    client.player.removeTag("wbdjeff");
                                }
                                return true;
                            }
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text_title",
                            "msg": lang.menuUIMsgBailan23
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan24
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan25,
                            "function": (client, ui) => {
                                client.player.removeTag("pflame");
                                return true;
                            }
                        },
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan26,
                            "function": (client, ui) => {
                                client.player.removeTag("phalo");
                                return true;
                            }
                        },
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan27,
                            "function": (client, ui) => {
                                client.player.removeTag("prune");
                                return true;
                            }
                        },
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan28,
                            "function": (client, ui) => {
                                client.player.removeTag("plove");
                                return true;
                            }
                        }
                    ]
                },
                "talent": {
                    "text": lang.menuUIMsgBailan29,
                    "page": (client, ui) => {
                        var _a;
                        let arr;
                        if (TalentData.hasOccupation(client.data.talent)) {
                            const canUsePoint = (client.exPlayer.getScoresManager().getScore("wbdjcg") * 2 - ((_a = client.data.talent.pointUsed) !== null && _a !== void 0 ? _a : 0));
                            arr = [
                                {
                                    "type": "text",
                                    "msg": lang.menuUIMsgBailan30 + canUsePoint
                                }
                            ];
                            for (let i of client.data.talent.talents) {
                                arr.push({
                                    "type": "text",
                                    "msg": TalentData.getDescription(client.getLang(), client.data.talent.occupation, i.id, i.level)
                                }, {
                                    "type": "textWithBg",
                                    "msg": Talent.getCharacter(client.getLang(), i.id) + ": " + i.level + "\n" + (function () {
                                        return getCharByNum(i.level / 40, 10, TALENT_CHAR);
                                    }())
                                });
                                let addPoint = (point) => {
                                    return () => {
                                        var _a;
                                        if (canUsePoint > 0 && i.level < 40) {
                                            point = Math.min(Math.min(point, 40 - i.level), canUsePoint);
                                            i.level += point;
                                            client.data.talent.pointUsed = point + ((_a = client.data.talent.pointUsed) !== null && _a !== void 0 ? _a : 0);
                                            client.data.talent.talents.splice(client.data.talent.talents.findIndex(t => t.id === i.id), 1);
                                            client.data.talent.talents.unshift(i);
                                            client.talentSystem.updateTalentRes();
                                        }
                                        return true;
                                    };
                                };
                                arr.push({
                                    "type": "buttonList3",
                                    "msgs": ["+1", "+2", "+5"],
                                    "buttons": [addPoint(1), addPoint(2), addPoint(5)]
                                }, {
                                    "type": "padding"
                                });
                            }
                            if (!client.data.occupationChooseDate || new Date().getTime() - client.data.occupationChooseDate >= 1000 * 60 * 60 * 24 * 14) {
                                arr.push({
                                    "type": "button",
                                    "msg": "清空职业",
                                    "function": (client, ui) => {
                                        client.data.occupationChooseDate = new Date().getTime();
                                        client.data.talent.occupation = Occupation.EMPTY;
                                        client.data.talent.talents = [];
                                        client.data.talent.pointUsed = 0;
                                        client.talentSystem.updateTalentRes();
                                        return true;
                                    }
                                });
                            }
                        }
                        else {
                            arr = [
                                {
                                    "type": "text_title",
                                    "msg": lang.menuUIMsgBailan31
                                },
                                {
                                    "type": "padding",
                                }
                            ];
                            for (const i of Occupation.keys) {
                                arr.push({
                                    "type": "button",
                                    "msg": i.getCharacter(client.getLang()),
                                    "function": (client, ui) => {
                                        TalentData.chooseOccupation(client.data.talent, i);
                                        client.talentSystem.updateTalentRes();
                                        return true;
                                    }
                                });
                            }
                        }
                        return arr;
                    }
                },
                "deathback": {
                    "text": lang.menuUIMsgBailan32,
                    "page": (client, ui) => {
                        if (client.data.pointRecord == undefined)
                            client.data.pointRecord = {
                                deathPoint: [],
                                point: []
                            };
                        let arr = [
                            {
                                "type": "text_title",
                                "msg": lang.menuUIMsgBailan33
                            },
                            {
                                "type": "padding"
                            }
                        ];
                        if (client.globalSettings.tpPointRecord && !client.ruinsSystem.isInRuinJudge) {
                            for (let j = 0; j < client.data.pointRecord.point.length; j++) {
                                const i = client.data.pointRecord.point[j];
                                const v = new Vector3(i[2]);
                                arr.push({
                                    "type": "textWithBg",
                                    "msg": lang.menuUIMsgBailan34 + (i[0] + v.toString()) + "\n" + i[1]
                                }, {
                                    "type": "buttonList3",
                                    "msgs": [
                                        lang.menuUIMsgBailan35,
                                        lang.menuUIMsgBailan38,
                                        lang.menuUIMsgBailan40
                                    ],
                                    "buttons": [(client, ui) => {
                                            let bag = client.exPlayer.getBag();
                                            if (!bag.hasItem("wb:conveyor_issue") && client.globalSettings.tpNeedItem) {
                                                client.sayTo(lang.menuUIMsgBailan36);
                                                return false;
                                            }
                                            if (client.globalSettings.tpNeedItem) {
                                                let pos = (bag.searchItem("wb:conveyor_issue"));
                                                let item = bag.getItem(pos);
                                                item.amount--;
                                                bag.setItem(pos, item);
                                            }
                                            client.exPlayer.setPosition(v, client.getDimension(i[0]));
                                            client.sayTo(lang.menuUIMsgBailan37);
                                            return false;
                                        },
                                        (client, ui) => {
                                            new ModalFormData().textField(lang.menuUIMsgBailan39, (i[0] + v.toString()))
                                                .show(client.player)
                                                .then(e => {
                                                var _a;
                                                if (e.canceled)
                                                    return;
                                                i[1] = ((_a = e === null || e === void 0 ? void 0 : e.formValues) === null || _a === void 0 ? void 0 : _a[0]) || "";
                                            }).catch(e => {
                                                ExErrorQueue.throwError(e);
                                            });
                                            return false;
                                        },
                                        (client, ui) => {
                                            var _a;
                                            (_a = client.data.pointRecord) === null || _a === void 0 ? void 0 : _a.point.splice(j, 1);
                                            return true;
                                        }
                                    ]
                                }, {
                                    "type": "padding"
                                });
                            }
                            arr.push({
                                "msg": lang.menuUIMsgBailan41 + client.exPlayer.getPosition().floor().toString(),
                                "type": "button",
                                "function": (client, ui) => {
                                    var _a;
                                    (_a = client.data.pointRecord) === null || _a === void 0 ? void 0 : _a.point.push([client.exPlayer.getDimension().id, "", client.exPlayer.getPosition().floor()]);
                                    return true;
                                }
                            });
                        }
                        else {
                            arr.push({
                                "type": "text",
                                "msg": lang.menuUIMsgBailan42
                            });
                        }
                        // if (client.globalSettings.deathRecord) {
                        // 	for (let j = 0; j < client.data.pointRecord.deathPoint.length; j++) {
                        // 		let i = client.data.pointRecord.deathPoint[j];
                        // 		let v = new Vector3(i[1]);
                        // 		arr.push(
                        // 			{
                        // 				"type": "text",
                        // 				"msg": lang.menuUIMsgBailan43 + v.toString()
                        // 			},
                        // 			{
                        // 				"type": "button",
                        // 				"msg": lang.menuUIMsgBailan44 + v.toString()
                        // 			},
                        // 			{
                        // 				"type": "padding"
                        // 			}
                        // 		);
                        // 	}
                        // } else {
                        // 	arr.push(
                        // 		{
                        // 			"type": "text",
                        // 			"msg": lang.menuUIMsgBailan45
                        // 		}
                        // 	)
                        // }
                        return arr;
                    }
                },
                "other": {
                    "text": "其他",
                    "page": [
                        {
                            "type": "button",
                            "msg": "任务界面",
                            "function": (client, ui) => {
                                client.taskUI();
                                return false;
                            }
                        },
                        {
                            "type": "button",
                            "msg": "剧情线",
                            "function": (client, ui) => {
                                client.taskUI();
                                return false;
                            }
                        }
                    ]
                }
            }
        },
        "social": {
            "img": "textures/items/gingerbread_totem.png",
            "text": lang.menuUIMsgBailan46,
            "default": "setting",
            "page": {
                "setting": {
                    "text": lang.menuUIMsgBailan47,
                    "page": [
                        {
                            "type": "text_title",
                            "msg": lang.menuUIMsgBailan48
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan49
                        },
                        {
                            "type": "text",
                            "msg": lang.menuUIMsgBailan50
                        },
                        {
                            "type": "padding"
                        },
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan51,
                            "function": (client, ui) => {
                                client.player.addTag("wbmsyh");
                                if (client.player.nameTag.startsWith("§")) {
                                    client.player.nameTag = client.player.nameTag.substring(2);
                                }
                                client.player.nameTag = "§a" + client.player.nameTag;
                                return true;
                            }
                        },
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan48,
                            "function": (client, ui) => {
                                client.player.removeTag("wbmsyh");
                                if (client.player.nameTag.startsWith("§")) {
                                    client.player.nameTag = client.player.nameTag.substring(2);
                                }
                                client.player.nameTag = "§c" + client.player.nameTag;
                                return true;
                            }
                        }
                    ]
                },
                "tp": {
                    "text": lang.menuUIMsgBailan53,
                    "page": (client, ui) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        if (!client.globalSettings.playerCanTp || client.ruinsSystem.isInRuinJudge) {
                            return [{
                                    "type": "text",
                                    "msg": lang.menuUIMsgBailan54
                                }];
                        }
                        ;
                        let arr = [];
                        arr.push({
                            "msg": lang.menuUIMsgBailan55,
                            "type": "text_title"
                        });
                        arr.push({
                            "type": "padding"
                        });
                        let players = (_a = yield client.getPlayersAndIds()) !== null && _a !== void 0 ? _a : [];
                        for (const i of players) {
                            const p = ExPlayer.getInstance(i[0]);
                            arr.push({
                                "type": "button",
                                "msg": `${p.nameTag} pos:${p.getPosition().floor()}`,
                                "function": (client, ui) => {
                                    let bag = client.exPlayer.getBag();
                                    if (!bag.hasItem("wb:conveyor_issue") && client.globalSettings.tpNeedItem) {
                                        client.sayTo(lang.menuUIMsgBailan36);
                                        return false;
                                    }
                                    if (client.globalSettings.tpNeedItem) {
                                        let pos = (bag.searchItem("wb:conveyor_issue"));
                                        let item = bag.getItem(pos);
                                        item.amount--;
                                        bag.setItem(pos, item);
                                    }
                                    client.sayTo(lang.menuUIMsgBailan57);
                                    new ExMessageAlert().title(lang.menuUIMsgBailan58).body(`玩家 ${client.player.nameTag} §r想要传送到你的位置，是否接受？`)
                                        .button1(lang.menuUIMsgBailan15, () => {
                                        client.sayTo(lang.menuUIMsgBailan37);
                                        client.sayTo(lang.menuUIMsgBailan37, i[0]);
                                        client.exPlayer.setPosition(p.getPosition(), p.getDimension());
                                    })
                                        .button2(lang.menuUIMsgBailan16, () => {
                                        client.sayTo(lang.menuUIMsgBailan63);
                                        client.sayTo(lang.menuUIMsgBailan64, i[0]);
                                    })
                                        .show(i[0]);
                                    return false;
                                }
                            });
                        }
                        arr.push({
                            "msg": lang.menuUIMsgBailan65,
                            "type": "text_title"
                        });
                        arr.push({
                            "type": "padding"
                        });
                        for (const i of players) {
                            const p = ExPlayer.getInstance(i[0]);
                            arr.push({
                                "type": "button",
                                "msg": `${p.nameTag} (pos:${p.getPosition().floor()})`,
                                "function": (client, ui) => {
                                    let bag = client.exPlayer.getBag();
                                    if (!bag.hasItem("wb:conveyor_issue") && client.globalSettings.tpNeedItem) {
                                        client.sayTo(lang.menuUIMsgBailan36);
                                        return false;
                                    }
                                    if (client.getServer().findClientByPlayer(i[0]).ruinsSystem.isInRuinJudge) {
                                        client.sayTo("§b对方在遗迹中，申请失败");
                                        return false;
                                    }
                                    if (client.globalSettings.tpNeedItem) {
                                        let pos = (bag.searchItem("wb:conveyor_issue"));
                                        let item = bag.getItem(pos);
                                        item.amount--;
                                        bag.setItem(pos, item);
                                    }
                                    client.sayTo(lang.menuUIMsgBailan67);
                                    new ExMessageAlert().title(lang.menuUIMsgBailan58).body(`玩家 ${client.player.nameTag} §r邀请你传送到 pos:${client.exPlayer.getPosition().floor()} ，是否接受？`)
                                        .button1(lang.menuUIMsgBailan15, () => {
                                        client.sayTo(lang.menuUIMsgBailan37);
                                        client.sayTo(lang.menuUIMsgBailan37, i[0]);
                                        p.setPosition(client.exPlayer.getPosition(), client.exPlayer.getDimension());
                                    })
                                        .button2(lang.menuUIMsgBailan16, () => {
                                        client.sayTo(lang.menuUIMsgBailan73);
                                        client.sayTo(lang.menuUIMsgBailan74, i[0]);
                                    })
                                        .show(i[0]);
                                    return false;
                                }
                            });
                        }
                        return arr;
                    })
                }
            }
        },
        "setting": {
            "img": "textures/items/artificial_meat_creator_on.png",
            "text": lang.menuUIMsgBailan75,
            "default": "op",
            "page": {
                "personal": {
                    "text": lang.menuUIMsgBailan101,
                    "page": [
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan102,
                            "function": (client, ui) => {
                                new ModalFormData()
                                    .title("Choose a language")
                                    .dropdown("Language List", ["English", "简体中文"], 0)
                                    .show(client.player).then((e) => {
                                    if (!e.canceled) {
                                        client.data.lang = (e.formValues && e.formValues[0] == 0) ? "en" : "zh";
                                    }
                                })
                                    .catch((e) => {
                                    ExErrorQueue.throwError(e);
                                });
                                return false;
                            }
                        }
                    ]
                },
                "op": {
                    "text": lang.menuUIMsgBailan76,
                    "page": (client, ui) => {
                        if (client.player.hasTag("owner")) {
                            return [
                                {
                                    "type": "text_title",
                                    "msg": lang.menuUIMsgBailan77
                                },
                                {
                                    "type": "toggle",
                                    "msg": lang.menuUIMsgBailan78,
                                    "state": (client, ui) => client.globalSettings.playerCanTp,
                                    "function": (client, ui) => {
                                        client.globalSettings.playerCanTp = !client.globalSettings.playerCanTp;
                                        return true;
                                    }
                                },
                                {
                                    "type": "toggle",
                                    "msg": lang.menuUIMsgBailan79,
                                    "state": (client, ui) => client.globalSettings.tpNeedItem,
                                    "function": (client, ui) => {
                                        client.globalSettings.tpNeedItem = !client.globalSettings.tpNeedItem;
                                        return true;
                                    }
                                },
                                {
                                    "type": "toggle",
                                    "msg": lang.menuUIMsgBailan80,
                                    "state": (client, ui) => client.globalSettings.entityCleaner,
                                    "function": (client, ui) => {
                                        client.globalSettings.entityCleaner = !client.globalSettings.entityCleaner;
                                        client.getServer().upDateEntityCleaner();
                                        return true;
                                    }
                                },
                                //,
                                // {
                                // 	"type": "toggle",
                                // 	"msg": lang.menuUIMsgBailan81,
                                // 	"state": (client, ui) => client.globalSettings.deathRecord,
                                // 	"function": (client, ui) => {
                                // 		client.globalSettings.deathRecord = !client.globalSettings.deathRecord;
                                // 		return true;
                                // 	}
                                // },
                                {
                                    "type": "toggle",
                                    "msg": lang.menuUIMsgBailan82,
                                    "state": (client, ui) => client.globalSettings.tpPointRecord,
                                    "function": (client, ui) => {
                                        client.globalSettings.tpPointRecord = !client.globalSettings.tpPointRecord;
                                        return true;
                                    }
                                },
                                {
                                    "type": "toggle",
                                    "msg": "伤害显示",
                                    "state": (client, ui) => client.globalSettings.damageShow,
                                    "function": (client, ui) => {
                                        client.globalSettings.damageShow = !client.globalSettings.damageShow;
                                        return true;
                                    }
                                }
                            ];
                        }
                        else {
                            return [{
                                    "type": "text",
                                    "msg": lang.menuUIMsgBailan83
                                }];
                        }
                    }
                },
                "set": {
                    "text": lang.menuUIMsgBailan84,
                    "page": (client, ui) => {
                        if (client.player.hasTag("owner")) {
                            return [{
                                    "type": "button",
                                    "msg": lang.menuUIMsgBailan85,
                                    "function": (client, ui) => {
                                        new ModalFormData()
                                            .toggle(lang.menuUIMsgBailan80, client.globalSettings.entityCleaner)
                                            .slider(lang.menuUIMsgBailan91, 40, 1000, 20, client.globalSettings.entityCleanerLeastNum)
                                            .slider(lang.menuUIMsgBailan92, 2, 10, 1, client.globalSettings.entityCleanerStrength)
                                            .slider(lang.menuUIMsgBailan93, 1, 60, 1, client.globalSettings.entityCleanerDelay)
                                            .show(client.player).then((e) => {
                                            var _a, _b, _c, _d, _e, _f, _g, _h;
                                            if (e.canceled)
                                                return;
                                            client.globalSettings.entityCleaner = (_b = (_a = e.formValues) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : false;
                                            client.globalSettings.entityCleanerLeastNum = (_d = (_c = e.formValues) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : 200;
                                            client.globalSettings.entityCleanerStrength = (_f = (_e = e.formValues) === null || _e === void 0 ? void 0 : _e[2]) !== null && _f !== void 0 ? _f : 5;
                                            client.globalSettings.entityCleanerDelay = (_h = (_g = e.formValues) === null || _g === void 0 ? void 0 : _g[3]) !== null && _h !== void 0 ? _h : 30;
                                        })
                                            .catch((e) => {
                                            ExErrorQueue.throwError(e);
                                        });
                                        return false;
                                    }
                                }];
                        }
                        else {
                            return [{
                                    "type": "text",
                                    "msg": lang.menuUIMsgBailan83
                                }];
                        }
                    }
                }
            }
        }
    };
}
//# sourceMappingURL=menuFunctionUI.js.map