import PomClient from "../PomClient.js";
import MenuUIAlert, { MenuUIAlertView, MenuUIJson } from '../ui/MenuUIAlert.js';
import ExMessageAlert from "../../../modules/exmc/server/ui/ExMessageAlert.js";
import { ItemStack, world } from '@minecraft/server';
import TalentData, { Occupation, Talent } from "../cache/TalentData.js";
import PomServer from '../PomServer.js';
import { ModalFormData } from "@minecraft/server-ui";
import Vector3 from '../../../modules/exmc/math/Vector3.js';
import { langType } from './langType.js';
import ExPlayer from "../../../modules/exmc/server/entity/ExPlayer.js";
import ExErrorQueue, { to } from "../../../modules/exmc/server/ExErrorQueue.js";
import ExGameConfig from "../../../modules/exmc/server/ExGameConfig.js";
import getCharByNum, { PROGRESS_CHAR, TALENT_CHAR } from "./getCharByNum.js";
import POMLICENSE from "./POMLICENSE.js";
import MathUtil from "../../../modules/exmc/math/MathUtil.js";
import ExActionAlert from "../../../modules/exmc/server/ui/ExActionAlert.js";
import WarningAlertUI from "../ui/WarningAlertUI.js";
import { pomDifficultyMap } from "./GameDifficulty.js";
import { getArmorData, hasArmorData } from "../items/getArmorData.js";
import Canvas from "../../../modules/exmc/canvas/Canvas.js";
import Bitmap from "../../../modules/exmc/canvas/Bitmap.js";
import Paint, { Style } from "../../../modules/exmc/canvas/Paint.js";
import ColorRGBA from "../../../modules/exmc/canvas/ColorRGBA.js";
import ExTerrain from "../../../modules/exmc/server/block/ExTerrain.js";
import getBlockThemeColor from '../../../modules/exmc/server/block/blockThemeColor.js';
import ExTaskRunner from "../../../modules/exmc/server/ExTaskRunner.js";
import ColorHSV from "../../../modules/exmc/canvas/ColorHSV.js";
import { eventGetter } from "../../../modules/exmc/server/events/EventHandle.js";
import { MinecraftItemTypes } from "../../../modules/vanilla-data/lib/index.js";
import { ExBlockArea } from "../../../modules/exmc/server/block/ExBlockArea.js";
import { MinecraftDimensionTypes } from "../../../modules/vanilla-data/lib/index.js";
import WorldCache from "../../../modules/exmc/server/storage/cache/WorldCache.js";
// import { http } from '@minecraft/server-net';

export default function menuFunctionUI(lang: langType): MenuUIJson<PomClient> {
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
                        return (<MenuUIAlertView<PomClient>[]>[
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
                        ]).concat(MenuUIAlert.getLabelViews(`
名字排序为随机排序

Main creator:   - LiLeyi   AAswordsman

Creator:  Him1025(kALE) - 部分贴图、logo、icon、剧情、建筑、模型动画、加农炮战车、ui贴图、弩弓、合并工作

Assistants:  -  
EnderghostScale  - 人造肉、部分怪物、投掷炸药和技术支持
haveyouwantto(Maple-Kaede) - 技术支持
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
Repforce2 - 建筑
一只有疑问的猪 - 建筑
枨触 - 建筑
LZN - 提供建筑、贴图
豆沙 - 部分怪物
某不知名的琦玉 - 灵感
夜长生 - 提供建筑
默笙 - 提供建筑
StereoRoom411 - 提供建筑
岚天 - 提供建筑
WINDes - 提供任务清单、测试、灵感、部分
文海求生 - 提供任务清单、测试反馈
ALiFang ZHE - 提供部分模型、贴图
屑屑猹 - 提供部分翻译
小小尽喵 - 提供贴图
幻想贝壳 - 提供方块贴图、建筑
驼贰 - 部分配乐
基岩 - 灰烬塔建筑、建议

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
                        const armors = [
                            client.talentSystem.headComp,
                            client.talentSystem.chestComp,
                            client.talentSystem.legComp,
                            client.talentSystem.feetComp
                        ];
                        let armorData = 0;
                        armors.forEach(v => {
                            if (!v) return;
                            let id = ((v?.manager as ItemStack).type.id);
                            if (hasArmorData(id)) {
                                armorData += getArmorData(id);
                            } else if (v?.hasComponent("armor_protection")) {
                                armorData += v.getComponentWithGroup("armor_protection");
                            }
                        });

                        let msg = [`   ${lang.menuUIMsgBailan94}: ${client.gameId}`,
                        `   ${lang.menuUIMsgBailan96}: ${scores.getScore("wbfl")}`,
                        `   ${`盔甲值`}: ${armorData}`,
                        `   ${`物理防御`}: ${MathUtil.round(1 - (1 - client.getDifficulty().physicalDefenseAddFactor) * (1 - client.talentSystem.armor_protection[1] / 100), 3) * 100}％ + ${Math.round(client.talentSystem.armor_protection[3])}`,
                        `   ${`魔法防御`}: ${MathUtil.round(1 - (1 - client.getDifficulty().magicDefenseAddFactor) * (1 - client.talentSystem.armor_protection[0] / 100), 3) * 100}％ + ${Math.round(client.talentSystem.armor_protection[2])}`,
                        `   ${lang.menuUIMsgBailan97}: ${scores.getScore("wbwqlq")}`,
                        `   ${lang.menuUIMsgBailan98}: ${scores.getScore("wbkjlqcg")}`,
                        `   ${lang.menuUIMsgBailan99}: ${source.hasTag("wbmsyh") ? lang.menuUIMsgBailan15 : lang.menuUIMsgBailan16}`,
                        `   ${lang.menuUIMsgBailan100}: ${source.hasTag("wbdjeff") ? lang.menuUIMsgBailan15 : lang.menuUIMsgBailan16}`,
                        `   ${`游戏难度`}: ${client.getDifficulty().name}`
                        ];
                        let arr: MenuUIAlertView<PomClient>[] = MenuUIAlert.getLabelViews(msg);
                        arr.unshift({
                            "type": "text_title",
                            "msg": "个人信息"
                        });
                        let g = client.data.gameGrade;

                        const addPoint = (num: number) => {
                            return () => {
                                for (let i = 0; i <= num; i++) {
                                    client.magicSystem.checkUpgrade();
                                }
                                return true;
                            }
                        };
                        arr.push({
                            "type": "textWithBg",
                            "msg": `${lang.menuUIMsgBailan95}: ${g} 当前等级积分: ${client.magicSystem.getGradeNeedExperience(g) + client.data.gameExperience}/${client.magicSystem.getGradeNeedExperience(g + 1)}
${getCharByNum(client.data.gameExperience / (client.magicSystem.getGradeNeedExperience(g + 1) - client.magicSystem.getGradeNeedExperience(g)), 10, PROGRESS_CHAR)}`
                        },
                            {
                                "type": "buttonList3",
                                "msgs": ["+1", "+2", "+5"],
                                "buttons": [addPoint(1), addPoint(2), addPoint(5)]
                            });
                        return arr;
                    }
                },
                "add": {
                    "text": lang.menuUIMsgBailan19,
                    "page": [
                        // {
                        //     "type": "text_title",
                        //     "msg": lang.menuUIMsgBailan20
                        // },
                        // {
                        //     "type": "padding"
                        // },
                        // {
                        //     "type": "text",
                        //     "msg": lang.menuUIMsgBailan21
                        // },
                        // {
                        //     "type": "padding"
                        // },
                        // {
                        //     "type": "toggle",
                        //     "msg": lang.menuUIMsgBailan22,
                        //     "state": (client, ui) => client.player.hasTag("wbdjeff"),
                        //     "function": (client, ui) => {
                        //         if (!client.player.hasTag("wbdjeff")) {
                        //             client.player.addTag("wbdjeff");
                        //         } else {
                        //             client.player.removeTag("wbdjeff");
                        //         }
                        //         return true;
                        //     }
                        // },
                        // {
                        //     "type": "padding"
                        // },
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
                    "page": (client, ui): MenuUIAlertView<PomClient>[] => {
                        let arr: MenuUIAlertView<PomClient>[];
                        if (TalentData.hasOccupation(client.data.talent)) {
                            const canUsePoint = (client.data.gameGrade * 2 - (client.data.talent.pointUsed ?? 0));
                            arr = [
                                {
                                    "type": "text",
                                    "msg": lang.menuUIMsgBailan30 + canUsePoint
                                }
                            ];
                            for (let i of client.data.talent.talents) {
                                arr.push(
                                    {
                                        "type": "text",
                                        "msg": TalentData.getDescription(client.getLang(), client.data.talent.occupation, i.id, i.level)
                                    },
                                    {
                                        "type": "textWithBg",
                                        "msg": Talent.getCharacter(client.getLang(), i.id) + ": " + i.level + "\n" + (function () {
                                            return getCharByNum(i.level / 40, 10, TALENT_CHAR);
                                        }())
                                    });
                                let addPoint = (point: number) => {
                                    return () => {
                                        if (canUsePoint > 0 && i.level < 40) {
                                            point = Math.min(Math.min(point, 40 - i.level), canUsePoint);
                                            i.level += point;
                                            client.data.talent.pointUsed = point + (client.data.talent.pointUsed ?? 0);
                                            client.data.talent.talents.splice(client.data.talent.talents.findIndex(t => t.id === i.id), 1);
                                            client.data.talent.talents.unshift(i);
                                            client.talentSystem.updateTalentRes();
                                        }
                                        return true;
                                    }
                                };
                                arr.push(
                                    {
                                        "type": "buttonList3",
                                        "msgs": ["+1", "+2", "+5"],
                                        "buttons": [addPoint(1), addPoint(2), addPoint(5)]
                                    },
                                    {
                                        "type": "padding"
                                    });
                            }
                            if (client.data.gameGrade > (client.data.occupationChooseNum ?? 0) + 1) {
                                arr.push({
                                    "type": "button",
                                    "msg": "清空职业",
                                    "function": (client, ui) => {
                                        client.data.occupationChooseNum = (client.data.occupationChooseNum ?? 0) + 1;
                                        client.data.gameGrade -= client.data.occupationChooseNum ?? 0;
                                        client.data.talent.occupation = Occupation.EMPTY;
                                        client.data.talent.talents = [];
                                        client.data.talent.pointUsed = 0;

                                        client.magicSystem.upDateGrade();
                                        client.talentSystem.updateTalentRes();

                                        return true;
                                    }
                                });
                            }
                        } else {
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
                    "page": (client, ui): MenuUIAlertView<PomClient>[] => {
                        let arr = <MenuUIAlertView<PomClient>[]>[
                            {
                                "type": "text_title",
                                "msg": lang.menuUIMsgBailan33
                            },
                            {
                                "type": "padding"
                            }
                        ]

                        if (client.globalSettings.tpPointRecord && !client.ruinsSystem.isInRuinJudge && client.territorySystem.inTerritotyLevel !== 0) {
                            for (let j = 0; j < client.data.pointRecord.point.length; j++) {
                                const i = client.data.pointRecord.point[j];
                                const v = new Vector3(i[2]);
                                arr.push(
                                    {
                                        "type": "textWithBg",
                                        "msg": lang.menuUIMsgBailan34 + (i[0] + v.toString()) + "\n" + i[1]
                                    },
                                    {
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
                                                bag.clearItem("wb:conveyor_issue", 1);
                                            }
                                            client.exPlayer.setPosition(v, client.getDimension(i[0]));
                                            client.sayTo(lang.menuUIMsgBailan37);
                                            return false;
                                        },
                                        (client, ui) => {
                                            new ModalFormData().textField(lang.menuUIMsgBailan39, (i[0] + v.toString()))
                                                .show(client.player)
                                                .then(e => {
                                                    if (e.canceled) return;
                                                    i[1] = String(e?.formValues?.[0] || "");
                                                }).catch(e => {
                                                    ExErrorQueue.throwError(e);
                                                })
                                            return false;
                                        },
                                        (client, ui) => {
                                            new ExMessageAlert().title("确认")
                                                .body(`是否删除传送点 ${client.data.pointRecord.point[j].map(e => e.toString()).join(" / ")}`)
                                                .button1(lang.menuUIMsgBailan15, () => {
                                                    client.data.pointRecord.point.splice(j, 1);
                                                })
                                                .button2(lang.menuUIMsgBailan16, () => {
                                                })
                                                .show(client.player);
                                            return false;
                                        }
                                        ]
                                    },

                                    {
                                        "type": "padding"
                                    }
                                );
                            }
                            arr.push({
                                "msg": lang.menuUIMsgBailan41 + client.exPlayer.position.floor().toString(),
                                "type": "button",
                                "function": (client, ui) => {
                                    if ((client.data.pointRecord.point.length ?? 0) <= 10) {
                                        client.data.pointRecord.point.push([client.exPlayer.dimension.id, "", client.exPlayer.position.floor()]);
                                        return true;
                                    } else {
                                        client.sayTo("§b传送点不得超过10个");
                                        return false;
                                    }
                                }
                            });

                        } else {
                            arr.push(
                                {
                                    "type": "text",
                                    "msg": lang.menuUIMsgBailan42
                                }
                            )
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
                "territory": {
                    "text": "领地",
                    "page": (client, ui) => {
                        let arr: MenuUIAlertView<PomClient>[] = [];
                        //领地参数设置
                        const num = Math.floor(client.data.gameGrade / 25);
                        const minSize = new Vector3(16, 10, 16);
                        const maxSize = new Vector3(36, 32, 36).sub(minSize).sub(4).scl((client.data.gameGrade - 25) / 75)
                            .floor().add(minSize).add(4);
                        const coolingTime = 3000;

                        arr.push({
                            "type": "text_title",
                            "msg": "领地管理"
                        });
                        client.data.territory.data = client.data.territory.data.filter(e => !(e.isRemoved && e.coolingTime === 0));
                        for (const d of client.data.territory.data) {
                            const areaMsg = client.territorySystem.territoryData?.getAreaIn(new Vector3(d.position), 2);
                            arr.push({
                                "type": "textWithBigBg",
                                "msg": `状态: ${(d.isUnderBuilding ?
                                    `建设中(${d.coolingTime}s)` : (d.isRemoved ? `拆除中(${d.coolingTime}s)` : (areaMsg ? "正常使用" : "异常")))}
位置: ${new Vector3(d.position).toString()}
大小: ${areaMsg?.[0].getWidth().toString()}
`
                            });
                            if (areaMsg && !d.isRemoved) {
                                arr.push({
                                    "type": "buttonList3",
                                    "msgs": ["移除", "锁定", "管理"],
                                    "buttons": [() => {
                                        new ExMessageAlert().title("确认")
                                            .body(`是否删除领地 ${areaMsg[0].center()}`)
                                            .button1(lang.menuUIMsgBailan15, () => {
                                                //删除服务器缓存领地，删除玩家缓存
                                                client.territorySystem.territoryData?.removeArea(areaMsg[0]);
                                                d.isRemoved = true;
                                                d.coolingTime = coolingTime;

                                                client.getServer().cache.save();
                                                client.cache.save();
                                            })
                                            .button2(lang.menuUIMsgBailan16, () => {
                                            })
                                            .show(client.player);
                                        return false;
                                    }, () => {
                                        client.sayTo("§b暂未开放");
                                        return false;
                                    }, () => {
                                        const data = new ModalFormData()
                                            .title("领地管理")
                                            .dropdown("选择领地粒子", ["雪花粒子"])
                                            .show(client.player).then(e => {
                                                if (e.canceled || !e.formValues) {
                                                    client.sayTo("§b领地创建取消");
                                                    return;
                                                }
                                                areaMsg[1].parIndex = e.formValues[0] as number;
                                            })
                                        return false;
                                    }]
                                })
                            }
                        }
                        if (num === 0) {
                            arr.push({
                                "type": "padding"
                            },
                                {
                                    "type": "text",
                                    "msg": "每25级才能拥有1个领地"
                                });
                        }
                        if (client.data.territory.data.length < num) {
                            arr.push({
                                "type": "padding"
                            },
                                {
                                    "type": "button",
                                    "msg": "创建领地",
                                    "function": (client, ui) => {
                                        to((async () => {
                                            if (client.getDimension().id !== MinecraftDimensionTypes.Overworld) {
                                                client.sayTo("§b只能在主世界创建领地");
                                                return;
                                            }
                                            if (client.getDefaultSpawnLocation().distance(new Vector3(client.player.location)) <= 128) {
                                                client.sayTo("§b请至少离开出生地128单位距离");
                                                return;
                                            }
                                            client.sayTo("§b请使用木棍点击选择点1");
                                            const p1 = new Vector3((await eventGetter(client.getEvents().exEvents.beforeItemUseOn,
                                                (e) => e.itemStack.typeId === MinecraftItemTypes.Stick)).block);
                                            const actions = client.magicSystem.registActionbarPass("facingBlockGetter");
                                            actions.push("", "");
                                            const sizeJedge = (width: Vector3) => {
                                                return width.cpy().sub(minSize).toArray().some(e => e < 0) || width.cpy().sub(maxSize).toArray().some(e => e > 0);
                                            }
                                            const facingBlockGetter = () => {
                                                const vec = new Vector3(client.player.getBlockFromViewDirection({
                                                    maxDistance: 6
                                                })?.block ?? { x: 0, y: 0, z: 0 }).floor();
                                                const area = new ExBlockArea(p1, vec, true);
                                                const width = area.getWidth();
                                                actions[0] = "面向方块坐标: " + vec.toString();
                                                actions[1] = "领域大小(以面向方块为顶点2): " + (sizeJedge(width) ? "§c无效| " : "§a有效| ") + width.toString();
                                            }
                                            if (client.getDefaultSpawnLocation())
                                                client.getEvents().exEvents.onLongTick.subscribe(facingBlockGetter);
                                            client.sayTo(`§b请使用木棍点击选择点2(长宽高在 ${minSize.toString()}-${maxSize.toString()})`);
                                            const p2 = new Vector3((await eventGetter(client.getEvents().exEvents.beforeItemUseOn,
                                                (e) => e.itemStack.typeId === MinecraftItemTypes.Stick)).block);
                                            //二次判断防止转空子
                                            if (client.getDimension().id !== MinecraftDimensionTypes.Overworld) {
                                                client.sayTo("§b只能在主世界创建领地");
                                                return;
                                            }
                                            client.getEvents().exEvents.onLongTick.unsubscribe(facingBlockGetter);
                                            client.magicSystem.deleteActionbarPass("facingBlockGetter");
                                            
                                            const area = new ExBlockArea(p1, p2, true);
                                            if (client.getDefaultSpawnLocation().distance(area.center()) <= 196) {
                                                client.sayTo("§b领地中心应距离出生地196单位距离之外");
                                                return;
                                            }
                                            const width = area.getWidth();
                                            if ((client.territorySystem.territoryData!.getAreasByNearby(area.center(), 3).some(e => e[0].contains(area)))) {
                                                client.sayTo("§b领地重叠，请换个位置")
                                                return;
                                            }
                                            if (sizeJedge(width)) {
                                                client.sayTo("§b领地大小不符合要求，请重新选择")
                                                return;
                                            }

                                            //成功创建，选择粒子
                                            const data = await new ModalFormData()
                                                .title("确认创建")
                                                .dropdown("选择领地粒子", ["雪花粒子"])
                                                .show(client.player);
                                            if (data.canceled || !data.formValues) {
                                                client.sayTo("§b领地创建取消");
                                                return;
                                            }
                                            client.territorySystem.territoryData?.addArea(area, {
                                                ownerId: client.gameId,
                                                ownerName: client.playerName,
                                                parIndex: data.formValues[0] as number ?? 0
                                            });
                                            client.data.territory.data.push({
                                                isRemoved: false,
                                                isUnderBuilding: false,
                                                coolingTime: 0,
                                                mark: {},
                                                position: area.center()
                                            });

                                            client.getServer().cache.save();
                                            client.cache.save();

                                            client.sayTo("§b领地创建成功");
                                        })());
                                        return false;
                                    }
                                });
                        }

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
                        },
                        {
                            "type": "button",
                            "msg": "兑换",
                            "function": (client, ui) => {
                                new ModalFormData().textField("输入你的兑换码", "input")
                                    .show(client.player)
                                    .then(e => {
                                        if (e.canceled)
                                            return;
                                        let cdk = String(e.formValues?.[0]);
                                        let cache = client.getGlobalData().redemptionCode;
                                        let award = cache[cdk];
                                        if (award != undefined) {
                                            if (!client.data.redemptionCode[cdk]) {
                                                client.sayTo(`兑换成功`);
                                                client.data.redemptionCode[cdk] = 1
                                                if (/^-?\d+$/.test(award.toString())) {
                                                    client.data.gameExperience += Math.floor(parseInt(award))
                                                } else {
                                                    client.exPlayer.command.run(`${award}`)
                                                }
                                            } else {
                                                client.sayTo(`该兑换码已经用过了`);
                                            }
                                        } else {
                                            client.sayTo(`兑换码错误`);
                                        }
                                    }).catch(e => {
                                        ExErrorQueue.throwError(e);
                                    });
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
                    "page": (client, ui) => {
                        if (!client.globalSettings.playerCanTp || client.ruinsSystem.isInRuinJudge || client.territorySystem.inTerritotyLevel === 0) {
                            return [{
                                "type": "text",
                                "msg": lang.menuUIMsgBailan54
                            }];
                        };
                        let arr: MenuUIAlertView<PomClient>[] = [];
                        arr.push({
                            "msg": lang.menuUIMsgBailan55,
                            "type": "text_title"
                        });
                        arr.push({
                            "type": "padding"
                        });
                        let players = client.getPlayersAndIds() ?? [];
                        for (const i of players) {
                            const p = ExPlayer.getInstance(i[0]);
                            arr.push({
                                "type": "button",
                                "msg": `${p.nameTag}${client.globalSettings.playerTpListShowPos ? " (pos:" + p.position.floor() + ")" : ""}`,
                                "function": (client, ui) => {
                                    let bag = client.exPlayer.getBag();
                                    if (!bag.hasItem("wb:conveyor_issue") && client.globalSettings.tpNeedItem) {
                                        client.sayTo(lang.menuUIMsgBailan36);
                                        return false;
                                    }

                                    if (client.globalSettings.tpNeedItem) {
                                        bag.clearItem("wb:conveyor_issue", 1);
                                    }
                                    client.sayTo(lang.menuUIMsgBailan57);
                                    client.setTimeout(() => {
                                        if ((<PomClient>client.getClient(i[0])).data
                                            .socialList.refuseList.filter(e => e[0] === client.gameId).length > 0) return;
                                        new ExMessageAlert().title(lang.menuUIMsgBailan58).body(`玩家 ${client.player.nameTag} §r想要传送到你的位置，是否接受？`)
                                            .button1(lang.menuUIMsgBailan15, () => {
                                                client.sayTo(lang.menuUIMsgBailan37);
                                                client.sayTo(lang.menuUIMsgBailan37, i[0]);
                                                client.exPlayer.setPosition(p.position, p.dimension);
                                            })
                                            .button2(lang.menuUIMsgBailan16, () => {
                                                client.sayTo(lang.menuUIMsgBailan63);
                                                client.sayTo(lang.menuUIMsgBailan64, i[0]);
                                            })
                                            .show(i[0]);
                                    }, 0);
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
                                "msg": `${p.nameTag}${client.globalSettings.playerTpListShowPos ? " (pos:" + p.position.floor() + ")" : ""}`,
                                "function": (client, ui) => {
                                    let bag = client.exPlayer.getBag();
                                    if (!bag.hasItem("wb:conveyor_issue") && client.globalSettings.tpNeedItem) {
                                        client.sayTo(lang.menuUIMsgBailan36);
                                        return false;
                                    }

                                    if ((<PomClient>client.getServer().findClientByPlayer(i[0])).ruinsSystem.isInRuinJudge) {
                                        client.sayTo("§b对方在遗迹中，申请失败");
                                        return false;
                                    }

                                    if (client.globalSettings.tpNeedItem) {
                                        bag.clearItem("wb:conveyor_issue", 1);
                                    }
                                    client.sayTo(lang.menuUIMsgBailan67);
                                    client.setTimeout(() => {
                                        if ((<PomClient>client.getClient(i[0])).data
                                            .socialList.refuseList.filter(e => e[0] === client.gameId).length > 0) return;
                                        new ExMessageAlert().title(lang.menuUIMsgBailan58).body(`玩家 ${client.player.nameTag} §r邀请你传送到 pos:${client.exPlayer.position.floor()} ，是否接受？`)
                                            .button1(lang.menuUIMsgBailan15, () => {
                                                client.sayTo(lang.menuUIMsgBailan37);
                                                client.sayTo(lang.menuUIMsgBailan37, i[0]);
                                                p.setPosition(client.exPlayer.position, client.exPlayer.dimension);
                                            })
                                            .button2(lang.menuUIMsgBailan16, () => {
                                                client.sayTo(lang.menuUIMsgBailan73);
                                                client.sayTo(lang.menuUIMsgBailan74, i[0]);
                                            })
                                            .show(i[0]);
                                    }, 0);
                                    return false;
                                }
                            });
                        }
                        return arr;
                    }
                },
                "refusedlist": {
                    "text": "交往名单",
                    "page": function (client, ui) {
                        let arr: MenuUIAlertView<PomClient>[] = [
                            {
                                "type": "text_title",
                                "msg": "拒绝名单列表(点击移除)"
                            }];

                        for (let a of client.data.socialList.refuseList) {
                            arr.push({
                                "type": "button",
                                "msg": "id:" + a[0] + " " + "name:" + a[1],
                                "function": (client, ui) => {
                                    client.data.socialList.refuseList = client.data.socialList.refuseList.filter((e) => e[0] !== a[0]);
                                    client.territorySystem.updateGlobalList();
                                    return true;
                                }
                            });
                        }

                        arr.push({
                            "type": "text_title",
                            "msg": "加入拒绝名单(点击添加)"
                        })
                        for (let a of client.getPlayersAndIds()) {
                            arr.push({
                                "type": "button",
                                "msg": "id:" + a[1] + " " + "name:" + a[0].nameTag,
                                "function": (client, ui) => {
                                    client.data.socialList.refuseList.push([a[1], a[0].name]);
                                    client.territorySystem.updateGlobalList();
                                    return true;
                                }
                            });
                        }
                        arr.push({
                            "type": "text_title",
                            "msg": "允许名单列表(点击移除)"
                        })
                        for (let a of client.data.socialList.acceptList) {
                            arr.push({
                                "type": "button",
                                "msg": "id:" + a[0] + " " + "name:" + a[1],
                                "function": (client, ui) => {
                                    client.data.socialList.acceptList = client.data.socialList.acceptList.filter((e) => e[0] !== a[0]);
                                    client.territorySystem.updateGlobalList();
                                    return true;
                                }
                            });
                        }

                        arr.push({
                            "type": "text_title",
                            "msg": "加入允许名单(点击添加)"
                        })

                        for (let a of client.getPlayersAndIds()) {
                            arr.push({
                                "type": "button",
                                "msg": "id:" + a[1] + " " + "name:" + a[0].nameTag,
                                "function": (client, ui) => {
                                    client.data.socialList.acceptList.push([a[1], a[0].name]);
                                    client.territorySystem.updateGlobalList();
                                    return true;
                                }
                            });
                        }
                        return arr;
                    }
                },
                "gradeList": {
                    "text": "排行榜",
                    "page": (client, ui) => {
                        let arr = <MenuUIAlertView<PomClient>[]>[
                            {
                                "type": "text_title",
                                "msg": "等级排行榜"
                            },
                            {
                                "type": "padding"
                            }
                        ]
                        let players = client.getPlayersAndIds() ?? [];
                        for (const i of players) {
                            const p = ExPlayer.getInstance(i[0]);
                            arr.push({
                                "type": "text",
                                "msg": `${p.nameTag} : ${(<PomClient>client.getClient(i[0])).data.gameGrade}`
                            });
                        }
                        return arr;
                    }
                }
            }
        },
        "setting": {
            "img": "textures/items/artificial_meat_creator_on.png",
            "text": lang.menuUIMsgBailan75,
            "default": "personal",
            "page": {
                "personal": {
                    "text": lang.menuUIMsgBailan101,
                    "page": [
                        {
                            "type": "toggle",
                            "msg": "连锁挖矿(特定镐子可使用)",
                            "state": (client, ui) => client.data.gamePreferrence.chainMining,
                            "function": (client, ui) => {
                                client.data.gamePreferrence.chainMining = !client.data.gamePreferrence.chainMining;
                                return true;
                            }
                        },
                        {
                            "type": "button",
                            "msg": lang.menuUIMsgBailan102,
                            "function": (client, ui): boolean => {
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
                        },
                        {
                            "type": "button",
                            "msg": "玩家状态UI个性化设置",
                            "function": (client, ui): boolean => {
                                new ModalFormData()
                                    .title("UI显示设置")
                                    .dropdown("左上面板样式", ["标准", "简约(未开放)", "新春(未开放）"], client.data.uiCustomSetting.topLeftMessageBarStyle)
                                    .slider("主要UI底板", 0, 100, 1, client.data.uiCustomSetting.topLeftMessageBarLayer1)
                                    .slider("下方装饰底板", 0, 100, 1, client.data.uiCustomSetting.topLeftMessageBarLayer2)
                                    .slider("右侧装饰纹样框", 0, 100, 1, client.data.uiCustomSetting.topLeftMessageBarLayer3)
                                    .slider("左侧装饰纹样框", 0, 100, 1, client.data.uiCustomSetting.topLeftMessageBarLayer4)
                                    .slider("背景层", 0, 100, 1, client.data.uiCustomSetting.topLeftMessageBarLayer5)
                                    .show(client.player).then((e) => {
                                        if (!e.canceled && e.formValues) {
                                            client.data.uiCustomSetting.topLeftMessageBarStyle = e.formValues[0] as number;
                                            client.data.uiCustomSetting.topLeftMessageBarLayer1 = e.formValues[1] as number;
                                            client.data.uiCustomSetting.topLeftMessageBarLayer2 = e.formValues[2] as number;
                                            client.data.uiCustomSetting.topLeftMessageBarLayer3 = e.formValues[3] as number;
                                            client.data.uiCustomSetting.topLeftMessageBarLayer4 = e.formValues[4] as number;
                                            client.data.uiCustomSetting.topLeftMessageBarLayer5 = e.formValues[5] as number;
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
                    "page": (client, ui): MenuUIAlertView<PomClient>[] => {
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
                                    "msg": "玩家传送列表显示坐标",
                                    "state": (client, ui) => client.globalSettings.playerTpListShowPos,
                                    "function": (client, ui) => {
                                        client.globalSettings.playerTpListShowPos = !client.globalSettings.playerTpListShowPos;
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

                                        (<PomServer>client.getServer()).upDateEntityCleaner();

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
                                },

                                {
                                    "type": "toggle",
                                    "msg": "初始魔能镐",
                                    "state": (client, ui) => client.globalSettings.initialMagicPickaxe,
                                    "function": (client, ui) => {
                                        client.globalSettings.initialMagicPickaxe = !client.globalSettings.initialMagicPickaxe;

                                        client.runMethodOnEveryClient(c => c.itemUseFunc.initialMagicPickaxe());
                                        return true;
                                    }
                                },
                                {
                                    "type": "toggle",
                                    "msg": "连锁挖矿总开关",
                                    "state": (client, ui) => client.globalSettings.chainMining,
                                    "function": (client, ui) => {
                                        client.globalSettings.chainMining = !client.globalSettings.chainMining;
                                        return true;
                                    }
                                },
                                {
                                    "type": "toggle",
                                    "msg": "允许核弹爆炸",
                                    "state": (client, ui) => client.globalSettings.nuclearBomb,
                                    "function": (client, ui) => {
                                        client.globalSettings.nuclearBomb = !client.globalSettings.nuclearBomb;
                                        return true;
                                    }
                                },
                                {
                                    "type": "toggle",
                                    "msg": "服务器内耗模式(你猜这是啥)",
                                    "state": (client, ui) => client.globalSettings.smallMapMode,
                                    "function": (client, ui) => {
                                        client.globalSettings.smallMapMode = !client.globalSettings.smallMapMode;

                                        return true;
                                    }
                                },
                                {
                                    "type": "button",
                                    "msg": "冬诗难度选择",
                                    "function": (client, ui): boolean => {
                                        let map = pomDifficultyMap;
                                        new ModalFormData()
                                            .title("Choose a mode")
                                            .dropdown("Difficulty List",
                                                [
                                                    map.get("1")!.name,
                                                    map.get("2")!.name,
                                                    map.get("3")!.name,
                                                    map.get("4")!.name,
                                                    map.get("5")!.name
                                                ], 2)
                                            .show(client.player).then((e) => {
                                                if (!e.canceled) {
                                                    let v = (e.formValues?.[0]);
                                                    client.globalSettings.gameDifficulty = 1 + parseFloat(v + "");
                                                    client.getServer().sayTo("Difficulty Choose " + client.getDifficulty().name);
                                                    for (let c of client.getServer().getClients()) {
                                                        (c as PomClient).talentSystem.updateTalentRes();
                                                    }
                                                }
                                            })
                                            .catch((e) => {
                                                ExErrorQueue.throwError(e);
                                            });
                                        return false;
                                    }
                                },
                                {
                                    "type": "button",
                                    "msg": "重置遗迹（特指4个BOSS的传送门遗迹）",
                                    "function": (client, ui) => {
                                        new ExMessageAlert().title("确认").body(`是否重置遗迹？`)
                                            .button1("是", () => {
                                                client.globalSettings.ruinsExsitsData = 0;
                                            })
                                            .button2("否", () => { })
                                            .show(client.player);
                                        return false;
                                    }
                                },
                                {
                                    "type": "button",
                                    "msg": "兑换奖励设置",
                                    "function": (client, ui) => {
                                        let cache = client.getGlobalData().redemptionCode;
                                        new ModalFormData()
                                        .title("兑换码设置")
                                            .textField("输入需要设置的兑换码", "建议输入英文数字混合")
                                            .dropdown("兑换类型选择", [
                                                "模组经验",
                                                "指令"
                                            ], 1)
                                            .textField("如在此输入指令或模组经验值", "指令不用打/,经验直接输数值")
                                            .show(client.player).then((e) => {
                                                if (!e.canceled && e.formValues) {
                                                    client.sayTo(`兑换码：${e.formValues[0]}`);
                                                    client.sayTo(`奖励：${e.formValues[2]}`);
                                                    cache[e.formValues[0] as string] = e.formValues[2] as string;
                                                }
                                            })
                                            .catch((e) => {
                                                ExErrorQueue.throwError(e);
                                            });
                                        return false;
                                    }
                                }
                            ];
                        } else {
                            return [{
                                "type": "text",
                                "msg": lang.menuUIMsgBailan83
                            }];
                        }
                    }
                },
                "set": {
                    "text": lang.menuUIMsgBailan84,
                    "page": (client, ui): MenuUIAlertView<PomClient>[] => {
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
                                        .toggle("清理信息显示", client.globalSettings.entityShowMsg)
                                        .show(client.player).then((e) => {
                                            if (e.canceled) return;
                                            client.globalSettings.entityCleaner = Boolean(e.formValues?.[0] ?? false);
                                            client.globalSettings.entityShowMsg = Boolean(e.formValues?.[4] ?? false);
                                            client.globalSettings.entityCleanerLeastNum = Number(e.formValues?.[1] ?? 200);
                                            client.globalSettings.entityCleanerStrength = Number(e.formValues?.[2] ?? 5);
                                            client.globalSettings.entityCleanerDelay = Number(e.formValues?.[3] ?? 30);
                                        })
                                        .catch((e) => {
                                            ExErrorQueue.throwError(e);
                                        })
                                    return false;
                                }
                            },
                            {
                                "type": "button",
                                "msg": "ui刷新间隔",
                                "function": (client, ui): boolean => {
                                    let map = pomDifficultyMap;
                                    new ModalFormData()
                                        .title("ui刷新间隔")
                                        .slider("界面刷新间隔(tick)", 4, 20, 1, 4)
                                        .slider("数据刷新间隔(每刷新n次界面刷新1次数据)", 1, 5, 1, 2)
                                        .show(client.player).then((e) => {
                                            if (!e.canceled) {
                                                let v = (e.formValues?.[0]);
                                                client.globalSettings.uiUpdateDelay = Number(v ?? 8);
                                                client.globalSettings.uiDataUpdateDelay = Number(v ?? 2);
                                                client.magicSystem.actionbarShow.stop();
                                                client.magicSystem.actionbarShow.delay(client.globalSettings.uiUpdateDelay);
                                                client.magicSystem.actionbarShow.start();
                                            }
                                        })
                                        .catch((e) => {
                                            ExErrorQueue.throwError(e);
                                        });
                                    return false;
                                }
                            },
                            {

                                "type": "button",
                                "msg": "作弊",
                                "function": (client, ui): boolean => {
                                    let map = pomDifficultyMap;
                                    new ModalFormData()
                                        .title("作弊面板")
                                        .slider("设置等级", 0, 99, 1, client.data.gameGrade)
                                        .slider("设置经验", 0, 990000, 10000, client.data.gameExperience)
                                        .show(client.player).then((e) => {
                                            if (!e.canceled && e.formValues) {
                                                client.data.gameGrade = Number(e.formValues?.[0] ?? 0);
                                                client.data.gameExperience = Number(e.formValues?.[1] ?? 0);
                                                client.magicSystem.upDateGrade();
                                            }
                                        })
                                        .catch((e) => {
                                            ExErrorQueue.throwError(e);
                                        });
                                    return false;
                                }
                            }
                            ];
                        } else {
                            return [{
                                "type": "text",
                                "msg": lang.menuUIMsgBailan83
                            }];
                        }
                    }
                },
                "gradeOrg": { 
                    "text": "等级管理",
                    "page": (client, ui): MenuUIAlertView<PomClient>[] => {
                        if (client.player.hasTag("owner")) {
                            let arr = <MenuUIAlertView<PomClient>[]>[
                                {
                                    "msg": "在线玩家等级列表",
                                    "type": "text_title"
                                },
                                {
                                    "type": "padding"
                                }
                            ]
                            let players = client.getPlayersAndIds() ?? [];
                            for (const i of players) {
                                const p = ExPlayer.getInstance(i[0]);
                                arr.push({
                                    "type": "button",
                                    "msg": `${p.nameTag} : ${(<PomClient>client.getClient(i[0])).data.gameGrade}`,
                                    "function": (client, ui): boolean => {
                                        client.setTimeout(() => {
                                            new ModalFormData()
                                                .title("等级修改面板")
                                                .slider("设置等级", 0, 99, 1, (<PomClient>client.getClient(i[0])).data.gameGrade)
                                                .show(client.player).then((e) => {
                                                    if (e.canceled)
                                                        return;
                                                    (<PomClient>client.getClient(i[0])).data.gameGrade =  Number(e.formValues?.[0] ?? 0);
                                                    (<PomClient>client.getClient(i[0])).magicSystem.upDateGrade();
                                                })
                                                .catch((e) => {
                                                    ExErrorQueue.throwError(e);
                                                });
                                        }, 0);
                                        return false;
                                    }
                                });
                            }
                            return arr;
                        } else {
                            return [{
                                "type": "text",
                                "msg": lang.menuUIMsgBailan83
                            }];
                        }
                    }
                },
                "general": {
                    "text": "通用",
                    "page": [
                        {
                            "type": "button",
                            "msg": "报错日志",
                            "function": (client, ui) => {
                                new WarningAlertUI(client, ExErrorQueue.getError(), [["我知道了", (client, ui) => {
                                }]]).showPage();
                                return false;
                            }
                        }
                    ]
                },
                "canvas": {
                    "text": "test",
                    "page": [
                        {
                            "type": "button",
                            "msg": "test",
                            "function": (client, ui) => {
                                updateScore();
                                async function updateScore() {
                                    // XMLHttpRequest
                                    // await http.get("http://baidu.com/").then(e => ExGameConfig.console.info(e.body));
                                }
                                return false;
                            }
                        },
                        {
                            "type": "button",
                            "msg": "test",
                            "function": (client, ui) => {
                                const canvas = new Canvas(new Bitmap(200, 200));
                                const paint = new Paint();
                                const terrain = new ExTerrain(client.getDimension());
                                const pos = client.exPlayer.position.floor();

                                paint.strokeWidth = 1;
                                paint.style = Style.FILL;

                                const num = client.globalSettings.smallMapMode ? 128 : 32
                                const step = 2
                                let centerX = 100, centerY = 100;
                                let perSize = centerX / num * 2 ** 0.5;

                                canvas.rotateRad(180 - client.exPlayer.rotation.y, centerX, centerY);

                                const task = new ExTaskRunner()
                                task.setTasks(function* () {
                                    const highMap = new Map<string, [number, ColorRGBA]>();
                                    for (let x = -num; x <= num; x += step) {
                                        for (let y = -num; y <= num; y += step) {
                                            try {
                                                let block = terrain.getSurfaceBlock(pos.x + x, pos.z + y);
                                                let b = getBlockThemeColor(block?.typeId ?? '');
                                                highMap.set(x + "|" + y, [block?.y ?? 0, b]);
                                                yield 0;
                                            } catch {

                                            }
                                        }
                                    }
                                    for (let x = -num; x <= num; x += step) {
                                        for (let y = -num; y <= num; y += step) {
                                            if (!highMap.has(x + "|" + y)) continue;
                                            let [high, b] = highMap.get(x + "|" + y)!;
                                            let fhsv = b.toHSV();
                                            let hsv: ColorHSV;
                                            if (
                                                (highMap.get((x - step) + "|" + y)?.[0] ?? 0) > high ||
                                                (highMap.get(x + "|" + (y - step))?.[0] ?? 0) > high
                                            ) {
                                                hsv = new ColorHSV(fhsv.h, fhsv.s, Math.max(fhsv.v - 20, 0))
                                            } else if (
                                                (highMap.get((x - step) + "|" + y)?.[0] ?? 0) < high ||
                                                (highMap.get(x + "|" + (y - step))?.[0] ?? 0) < high
                                            ) {
                                                hsv = new ColorHSV(fhsv.h, Math.max(fhsv.s - 20, 0), Math.min(fhsv.v + 20, 100))
                                            } else {
                                                hsv = fhsv;
                                            }
                                            paint.color = hsv.toRGB();
                                            canvas.drawRect(
                                                centerX + perSize * x - 1,
                                                centerY + perSize * y - 1,
                                                step * perSize + 1,
                                                step * perSize + 1,
                                                paint);
                                            yield 0;
                                        }
                                    }
                                });

                                task.start(1, 10000).then(() => {
                                    const layers = canvas.draw();

                                    let xui = new ExActionAlert()
                                        .title("__pomAlertCanvas")
                                        .button("canvasLayer1", () => { }, layers.layer1)
                                        .button("canvasLayer2", () => { }, layers.layer2)
                                        .button("canvasLayer3", () => { }, layers.layer3)
                                        .button("canvasLayer4", () => { }, layers.layer4)
                                        .button("canvasLayer5", () => { }, layers.layer5)
                                        .button("canvasLayer6", () => { }, layers.layer6)
                                        .body("_uiBody");
                                    xui.show(client.player);
                                });
                                return false;
                            }
                        },
                        {
                            "type": "img_notice_wp"
                            // "function": (client, ui) => {
                            //     new ExActionAlert().title("11").body("111")
                            //         .button("11", () => { }, "ftp://45.153.129.23:22224/bg5.png")
                            //         .show(client.player);
                            //     return false;
                            // }
                        }
                    ]
                }
            }
        }
    }
}