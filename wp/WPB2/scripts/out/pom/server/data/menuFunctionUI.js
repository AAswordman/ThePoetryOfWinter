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
import getgetCharByNum, { PROGRESS_CHAR, TALENT_CHAR } from "./getCharByNum.js";
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
EnderghostScale     haveyouwantto
huo鱼一只            AR_UnryAllenCN
世心                 論娘
荷叶                 Q儿
SpiffyTerror         悸动天使
画盒豆腐             兔块子
传说中阿库西斯教教徒   枫雪白霜
碧月狐DADA            Fulank彡North cat
一只朴实无华的蒜头王八  KirisamePPSH
Lone114514            Mr.龙灵
Hanyi寒翼             鸥吃鱼
某不知名的琦玉        Him1025(kALE)
WINDes              ALiFang ZHE
屑屑猹               灵言

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
                        return MenuUIAlert.getLabelViews(`
冬之纪行诗最终用户许可协议

一、为保护玩家乐趣、利益及维护开发者利益，我们需要这些最终用户许可条款为冬之纪行诗Add-Ons(以下简称本作品)的下载和使用制定一些规则。本许可是您与本作品的开发者(包括但不限于剑侠、LiLeyi及其他未列出或将来加入开发的人员，以下简称我们)之间达成的协议，描述使用游戏的条款和条件，这些条款应在中国法律所允许的范围内最大程度地适用。
二、由于网络服务的特殊性，您同意本协议以电子协议形式签订。您一旦以任何形式表明同意，即视为您同意并已经接受本协议的全部条款；
三、本协议的订立、履行、解释及争议的解决均适用中华人民共和国法律并排除其他一切冲突法的适用。如您就本协议内容或其执行有任何疑问，请与我们联系。您因使用我们服务所产生的及与本协议相关的争议，应由我们与您友好协商解决；如协商不成，任何一方均可向合同签订地有管辖权的人民法院提起诉讼。

您知晓并同意：
一、知识产权
1.本作品是基于游戏"MineCraft"创作的 免费 内容拓展模组，在未取得我们允许的情况下，您不得将本作品用于商业用途/盈利。

2.阅览本作品的代码以学习交流是允许的，但在未取得我们允许的情况下，您不得以任何方式窃取本作品中的代码、美术、音乐、文档等内容后将其复制、分发、发行、出租、展览、表演、广播、修改、改编、销售、运营、转许可、通过信息网络传播。

3.您可以就本作品向我们提出有关建议，但这并不意味着您的建议会被采纳，我们可以通过所需的任何方式使用或不使用您的建议，且不必向您支付报酬。如果您认为我们应为您的建议支付报酬，请提前说明该要求，在我们以书面形式答复后再提交该建议，否则您提交该建议造成的损失将由您个人承担。

二、我们的权利和义务
1.下载的提供
1).您可以直接从MCPEDL及我们所授权的其他网站/平台/渠道获取本作品
2).如果您从未经我们授权的第三方获取本作品或与本作品名称相同的内容，我们无法保证该软件能够正常使用，并对因此给您造成的损失不予负责。
3).我们会不断丰富本作品的内容、终端、形式等。当您使用本服务时，您应选择与您的终端、系统等相匹配的作品/游戏版本，否则，您可能无法正常使用本作品；我们可能会在本作品的完成之前发布测试版本，因此它可能包含BUG，这是无法避免的。
2.作品的更新
1).为了增进玩家体验、完善作品内容，我们  可能  不断努力开发新的服务，并为您不时提供作品更新。
2).为了改善用户体验或提高服务安全性、保证功能的一致性等目的，我们有权对本作品进行更新，或者对作品的部分功能效果、服务内容进行改变。

三、其他
1.当暴露在特定光影图案或闪光光亮下时，有极小部分人群会引发癫痫。这种情形可能是由于某些未查出的癫痫症状引起，即使该人员没有患癫痫病史也有可能造成此类病症。如果您的家人或任意家庭成员有过类似症状，请在请在进行游戏前咨询您的医生或医师。如果您在游戏过程中出现任何症状，包括头晕、目眩、眼部或肌肉抽搐、失去意识、失去方向感、抽搐或出现任何自己无法控制的动作，请立刻停止游戏并在继续游戏前咨询您的医生或医师，否则所造成的一切后果由您自己承担。
2.您在游戏MineCraft中的存档可能会由于装载本作品的更新而损坏，在更新前请自行备份您的存档，否则所造成的一切后果由您自己承担。
3. 本协议内容同时包括本协议附件中的协议或规则，我们可能不断发布的关于本服务的其他相关协议、规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。

您理解并同意，英文版为机器翻译内容，若本协议有中文、英文等多个语言版本，相应内容不一致的，均以中文版的内容为准。

1、 In order to protect the fun and interests of players and the interests of developers, we need these end-user license terms to formulate some rules for the download and use of winter chronicles add ons (hereinafter referred to as this work). This license is an agreement between you and the developers of this work (including but not limited to AA swordsman, LiLeyi and other people not listed or who will join the development in the future, hereinafter referred to as US). It describes the terms and conditions of using the game. These terms shall be applied to the maximum extent permitted by Chinese laws.
2、 Due to the particularity of network services, you agree that this agreement is signed in the form of electronic agreement. Once you express your consent in any form, it shall be deemed that you agree and have accepted all the terms of this Agreement;
3、 The conclusion, performance, interpretation and dispute settlement of this Agreement shall be governed by the laws of the people's Republic of China, excluding the application of other conflict laws. If you have any questions about the contents of this agreement or its implementation, please contact us. Any dispute arising from your use of our services and related to this Agreement shall be settled through friendly negotiation between us and you; If the negotiation fails, either party may bring a lawsuit to the people's court with jurisdiction at the place where the contract is signed.
You understand and agree that:
1、 Intellectual property
1. This work is a free content expansion module created based on the game "minecraft". You may not use this work for commercial purposes / profits without our permission.
2. It is allowed to read the code of this work to learn and communicate, but without our permission, you shall not steal the code, art, music, documents and other contents of this work in any way, and then copy, distribute, distribute, rent, exhibit, perform, broadcast, modify, adapt, sell, operate, sublicense, and disseminate them through the information network.
3. You can make suggestions to us about this work, but this does not mean that your suggestions will be adopted. We can use or not use your suggestions in any way we need, and do not need to pay you any remuneration. If you think that we should pay for your proposal, please explain this requirement in advance and submit the proposal after we reply in writing. Otherwise, you will bear the losses caused by submitting the proposal.
2、 Our rights and obligations
1. Provision of download
1) . you can directly obtain this work from mcpedl and other websites / platforms / channels authorized by us
2). If you have never obtained this work or the content with the same name as this work from a third party authorized by us, we cannot guarantee the normal use of this software and will not be responsible for the losses caused to you.
3). We will constantly enrich the content, terminal and form of this work. When you use this service, you should select a work / game version that matches your terminal, system, etc., otherwise, you may not be able to use this work normally; We may release the test version before the completion of this work, so it may contain bugs, which is unavoidable.
2. Update of works
1). In order to improve the player's experience and improve the content of the work, we may constantly strive to develop new services and provide you with work updates from time to time.
2). In order to improve the user experience, improve the service security and ensure the consistency of functions, we have the right to update the work, or change some of the functional effects and service contents of the work.
3、 Other
1. When exposed to specific light and shadow patterns or flash light, a small part of the population will cause epilepsy. This situation may be caused by some undetected epileptic symptoms. Even if the person has no history of epilepsy, it may cause such symptoms. If your family or any family member has similar symptoms, please consult your doctor or physician before playing the game. If you have any symptoms during the game, including dizziness, dizziness, eye or muscle convulsions, loss of consciousness, loss of direction, convulsions, or any movement beyond your control, please stop the game immediately and consult your doctor or physician before continuing the game. Otherwise, you will bear all the consequences.
2. Your archives in the game minecraft may be damaged due to loading the updates of this work. Please back up your archives before updating, otherwise you will bear all the consequences.
3. The contents of this agreement also include the agreements or rules in the annexes to this agreement, and other relevant agreements and rules on this service that we may continuously publish. Once the above contents are officially released, they shall be an integral part of this agreement, and you shall also abide by them.
`.split("\n"));
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
${getgetCharByNum((gj - (150 * Math.pow((g - 1), 2) + 1050 * (g - 1) + 900)) / (300 * g + 900), 10, PROGRESS_CHAR)}`
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
                            const point = (client.exPlayer.getScoresManager().getScore("wbdjcg") * 2 - ((_a = client.data.talent.pointUsed) !== null && _a !== void 0 ? _a : 0));
                            arr = [
                                {
                                    "type": "text",
                                    "msg": lang.menuUIMsgBailan30 + point
                                }
                            ];
                            for (let i of client.data.talent.talents) {
                                arr.push({
                                    "type": "text",
                                    "msg": TalentData.getDescription(client.getLang(), client.data.talent.occupation, i.id, i.level)
                                }, {
                                    "type": "textWithBg",
                                    "msg": Talent.getCharacter(client.getLang(), i.id) + ": " + i.level + "\n" + (function () {
                                        return getgetCharByNum(i.level / 40, 10, TALENT_CHAR);
                                    }())
                                });
                                let addPoint = (point) => {
                                    return () => {
                                        var _a;
                                        if (point > 0 && i.level < 40) {
                                            point = Math.min(point, 40 - i.level);
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
                "tasks": {
                    "text": "任务",
                    "page": [
                        {
                            "type": "button",
                            "msg": "任务界面",
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