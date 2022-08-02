import PomClient from "../PomClient.js";
import ExGameConfig from "../../modules/exmc/ExGameConfig.js";
import ExPlayer from '../../modules/exmc/entity/ExPlayer.js';
import MenuUIAlert, { MenuUIAlertView } from '../ui/MenuUIAlert.js';
import ExMessageAlert from "../../modules/exmc/ui/ExMessageAlert.js";
import { ItemStack } from "mojang-minecraft";
import { ExPlayerBag } from "../../modules/exmc/entity/ExEntityBag.js";
import { Occupation } from "../cache/TalentData.js";

export default {
	"main": {
		"img": "textures/items/wet_paper",
		"text": "主页",
		"default": "notice",
		"page": {
			"notice": {
				"text": "公告",
				"page": [
					{
						"type": "img_adjustToScreen",
						"msg": "textures/ui/title.png"
					},
					{
						"type": "text",
						"msg": "暂无公告"
					},
					{
						"type": "text",
						"msg": "如果以后有，可能会通过某个方式提供"
					},
					{
						"type": "padding"
					}
					/*
					,{
						"msg":"伤害显示 关",
						"type":"button",
						"function":(client: PomClient,ui: MenuUIAlert) => {
							ExGameConfig.console.log("伤害显示 关");
							client.postMessage(ExGameConfig.serverId,ExGameConfig.transmissionType.sendToServer,"setDamageListenerOff");
						}
					}
					*/
				]
			},
			"activity": {
				"text": "活动",
				"page": [
					{
						"type": "text_title",
						"msg": "当前没有活动哦"
					}
				]
			},
			"version": {
				"text": "版本",
				"page": [
					{
						"type": "text_title",
						"msg": "版本信息"
					},
					{
						"type": "text",
						"msg": "当前Addon版本: "
					},
					{
						"type": "text",
						"msg": ExGameConfig.addonVersion
					},
					{
						"type": "text",
						"msg": "补丁包信息请到以下链接查看："
					},
					{
						"type": "text",
						"msg": "https://aaswordman.github.io/ThePoetryOfWinter/"
					}
				]
			}
		}
	},
	"person": {
		"img": "textures/items/amethyst_chestplate.png",
		"text": "个人",
		"default": "info",
		"page": {
			"info": {
				"text": "信息",
				"page": (client: PomClient, ui: MenuUIAlert) => {
					let source = client.player;
					let scores = ExPlayer.getInstance(source).getScoresManager();
					let msg = [`玩家ID: ${client.gameId}`,
					`玩家等级: ${scores.getScore("wbdj")}`,
					`当前法力值: ${scores.getScore("wbfl")}`,
					`武器技能冷却: ${scores.getScore("wbwqlq")}`,
					`盔甲技能冷却: ${scores.getScore("wbkjlqcg")}`,
					`友好模式是否开启: ${source.hasTag("wbmsyh") ? "是" : "否"}`,
					`等级效果是否启用: ${source.hasTag("wbdjeff") ? "是" : "否"}`];
					return MenuUIAlert.getLabelViews(msg);
				}
			},
			"add": {
				"text": "加成",
				"page": [
					{
						"type": "text_title",
						"msg": "等级效果"
					},
					{
						"type": "padding"
					},
					{
						"type": "text",
						"msg": "到达一定等级可以获得药水增益"
					},
					{
						"type": "padding"
					},
					{
						"type": "toggle",
						"msg": "等级效果 开",
						"state": (client: PomClient, ui: MenuUIAlert) => client.player.hasTag("wbdjeff"),
						"function": (client: PomClient, ui: MenuUIAlert) => {
							if (!client.player.hasTag("wbdjeff")) {
								client.player.addTag("wbdjeff");
							} else {
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
						"msg": "粒子效果"
					},
					{
						"type": "padding"
					},
					{
						"type": "text",
						"msg": "可以通过合成相应的药水来获得粒子，用腻了再来这里取消"
					},
					{
						"type": "padding"
					},
					{
						"type": "button",
						"msg": "去除火焰",
						"function": (client: PomClient, ui: MenuUIAlert) => {
							client.player.removeTag("pflame");
							return true;
						}
					},
					{
						"type": "button",
						"msg": "去除光环",
						"function": (client: PomClient, ui: MenuUIAlert) => {
							client.player.removeTag("phalo");
							return true;
						}
					},
					{
						"type": "button",
						"msg": "去除符文",
						"function": (client: PomClient, ui: MenuUIAlert) => {
							client.player.removeTag("prune");
							return true;
						}
					},
					{
						"type": "button",
						"msg": "去除爱心",
						"function": (client: PomClient, ui: MenuUIAlert) => {
							client.player.removeTag("plove");
							return true;
						}
					}
				]
			},
			"talent": {
				"text": "天赋",
				"page": (client: PomClient, ui: MenuUIAlert): MenuUIAlertView[] => {
					let arr: MenuUIAlertView[];
					if (client.data.talent.hasOccupation()) {
						arr = [
						];
						for (let i of client.data.talent.talents) {
							arr.push({
								"type": "text",
								"msg": i.getCharacter() + ":" + i.level + "\n" + function () {
									let useChr = "";
									let a = Math.floor(i.level / 4);
									let b = i.level % 4;
									let c = 10 - a - b;
									let s = ""
									while (a > 0) {
										s += useChr[0];
										a--;
									}
									s += useChr[b];
									while (c > 0) {
										s += useChr[0];
										c--;
									}
									return s;
								}()
							});
						}
					} else {
						arr = [
							{
								"type": "text_title",
								"msg": "选择你的职业"
							},
							{
								"type": "padding",
							}
						];
						for (const i of Occupation.keys) {
							arr.push({
								"type": "button",
								"msg": i.character,
								"function": (client: PomClient, ui: MenuUIAlert) => {
									client.data.talent.chooseOccupation(i);
									return true;
								}
							});
						}
					}


					return arr;
				}
			}
		}
	},
	"social": {
		"img": "textures/items/gingerbread_totem.png",
		"text": "交往",
		"default": "setting",
		"page": {
			"setting": {
				"text": "交往设置",
				"page": [
					{
						"type": "text_title",
						"msg": "敌对模式"
					},
					{
						"type": "padding"
					},
					{
						"type": "text",
						"msg": "在敌对模式下，你可以攻击任何玩家，名字显示为红色；在友好模式下你无法攻击处于友好模式的玩家，名字显示为绿色。"
					},
					{
						"type": "text",
						"msg": "即：如果一个玩家名字是绿色，那么他是无威胁的；如果他开了红，那么他可能有攻击倾向。"
					},
					{
						"type": "padding"
					},
					{
						"type": "button",
						"msg": "友好模式",
						"function": (client: PomClient, ui: MenuUIAlert) => {
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
						"msg": "敌对模式",
						"function": (client: PomClient, ui: MenuUIAlert) => {
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
				"text": "传送",
				"page": async (client: PomClient, ui: MenuUIAlert): Promise<MenuUIAlertView[]> => {
					if (!client.globalSettings.playerCanTp) {
						return [{
							"type": "text",
							"msg": "不允许使用传送"
						}];
					};
					let arr: MenuUIAlertView[] = [];
					arr.push({
						"msg": "传送至",
						"type": "text_title"
					});
					arr.push({
						"type": "padding"
					});
					let players = await client.getPlayersAndIds() ?? [];
					for (const i of players) {
						const p = ExPlayer.getInstance(i[0]);
						arr.push({
							"type": "button",
							"msg": `${p.nameTag} pos:${p.getPosition().floor()}`,
							"function": (client: PomClient, ui: MenuUIAlert) => {
								let bag = client.exPlayer.getBag();
								if (!bag.hasItem("wb:conveyor_issue") && client.globalSettings.tpNeedItem) {
									client.sayTo("§b背包无传送石，传送失败");
									return false;
								}
								if (client.globalSettings.tpNeedItem) {
									(<ItemStack>bag.getItem("wb:conveyor_issue")).amount -= 1;
								}
								client.sayTo("§b你向对方发起了请求");

								new ExMessageAlert().title("传送请求").body(`玩家 ${client.player.nameTag} §r想要传送到你的位置，是否接受？`)
									.button1("是", () => {
										client.sayTo("§b传送成功");
										client.sayTo("§b传送成功", i[0]);
										client.exPlayer.setPosition(p.getPosition());
									})
									.button2("否", () => {
										client.sayTo("§b对方拒绝了你的请求");
										client.sayTo("§b你拒绝了对方的请求", i[0]);
									})
									.show(i[0]);
								return false;
							}
						});
					}
					arr.push({
						"msg": "邀请传送到你的位置",
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
							"function": (client: PomClient, ui: MenuUIAlert) => {
								let bag = client.exPlayer.getBag();
								if (!bag.hasItem("wb:conveyor_issue") && client.globalSettings.tpNeedItem) {
									client.sayTo("§b背包无传送石，传送失败");
									return false;
								}
								if (client.globalSettings.tpNeedItem) {
									(<ItemStack>bag.getItem("wb:conveyor_issue")).amount -= 1;
								}
								client.sayTo("§b你向对方发起了邀请");

								new ExMessageAlert().title("传送请求").body(`玩家 ${client.player.nameTag} §r邀请你传送到 pos:${client.exPlayer.getPosition().floor()} ，是否接受？`)
									.button1("是", () => {
										client.sayTo("§b传送成功");
										client.sayTo("§b传送成功", i[0]);
										p.setPosition(client.exPlayer.getPosition());
									})
									.button2("否", () => {
										client.sayTo("§b对方拒绝了你的邀请");
										client.sayTo("§b你拒绝了对方的邀请", i[0]);
									})
									.show(i[0]);
								return false;
							}
						});
					}
					return arr;
				}
			}
		}
	},
	"setting": {
		"img": "textures/items/artificial_meat_creator_on.png",
		"text": "设置",
		"default": "op",
		"page": {
			"op": {
				"text": "管理",
				"page": (client: PomClient, ui: MenuUIAlert): MenuUIAlertView[] => {
					if (client.player.hasTag("owner")) {
						return [
							{
								"type": "text_title",
								"msg": "游戏内容"
							},
							{
								"type": "toggle",
								"msg": "玩家传送",
								"state": (client: PomClient, ui: MenuUIAlert) => client.globalSettings.playerCanTp,
								"function": (client: PomClient, ui: MenuUIAlert) => {
									client.globalSettings.playerCanTp = !client.globalSettings.playerCanTp;
									return true;
								}
							},
							{
								"type": "toggle",
								"msg": "传送需要传送石",
								"state": (client: PomClient, ui: MenuUIAlert) => client.globalSettings.tpNeedItem,
								"function": (client: PomClient, ui: MenuUIAlert) => {
									client.globalSettings.tpNeedItem = !client.globalSettings.tpNeedItem;
									return true;
								}
							}
						];
					} else {
						return [{
							"type": "text",
							"msg": "无权限访问此页面。如果你是 op ，请输入/tag @s add owner 来获取管理权限"
						}];
					}
				}
			},
			"gc": {
				"text": "实体清理",
				"page": [
				]
			}
		}
	}
}