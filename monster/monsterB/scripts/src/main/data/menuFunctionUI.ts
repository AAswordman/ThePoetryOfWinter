import PomClient from "../PomClient.js";
import MenuUIAlert from "../ui/MenuUIAlert.js";
import ExGameConfig from "../../modules/exmc/ExGameConfig.js";

export default {
	"main": {
		"img": "textures/pom_ui/ui_home",
		"text":"主页",
		"default":"notice",
		"page": {
			"notice": {
				"text":"啊对对对",
				"page":[
					{
						"msg":"伤害显示 开",
						"type":"button",
						"function":(client: PomClient,ui: MenuUIAlert) => {
							ExGameConfig.console.log("伤害显示 开");
							client.postMessage(ExGameConfig.serverId,ExGameConfig.transmissionType.sendToServer,"setDamageListenerOn");
						}
					},
					{
						"msg":"伤害显示 关",
						"type":"button",
						"function":(client: PomClient,ui: MenuUIAlert) => {
							ExGameConfig.console.log("伤害显示 关");
							client.postMessage(ExGameConfig.serverId,ExGameConfig.transmissionType.sendToServer,"setDamageListenerOff");
						}
					}
				]
			}
		}
	}
}