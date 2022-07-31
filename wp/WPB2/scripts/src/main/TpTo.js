import commandAnalysis from "../common/commandAnalysis.js";
import Manager from "../game/Manager.js";
import AlertData from "../game/AlertData.js";
import Monitor from "../common/Monitor.js";
//tpTo Command
export default class TpTo extends Monitor{
	constructor(service) {
		super(service);
	}
	//Override
	getMonitorFunction(event) {
		const { item, source } = event;
		
		if(item.id == "wb:conveyor_issue"){
			let players = this.service.getPlayers();
			let names = [];
			for(let i in players) {
				names.push(new AlertData(players[i].name, (res) => {
					Manager.sayTo(source,"§b你向对方发起了请求");
					Manager.alert(players[i],"传送请求","有玩家向你发送传送请求，是否接受？",
					new AlertData("是", (a) => {
						Manager.sayTo(source, "§b传送成功");
						Manager.sayTo(players[i], "§b传送成功");
						source.runCommand(`tp @s "${players[i].nameTag}"`);
						
					}),
					new AlertData("否", (b) => {
						Manager.sayTo(source, "§b对方拒绝了你的请求");
						Manager.sayTo(players[i], "§b你拒绝了对方的请求");
						item.data ++;
						if(item.data >= 5){
							item.amount --;
						}
					}));
				}));
			}
			
			Manager.alert(source, "发起传送", "请选择你要传送到的玩家", ...names);
			
		}
    }
}

