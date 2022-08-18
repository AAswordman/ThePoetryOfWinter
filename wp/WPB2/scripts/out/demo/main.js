import { world } from "mojang-minecraft"; //包
import { ActionFormData, MessageFormData } from "mojang-minecraft-ui"; //ui
function Wenjian(player) {
    let ALiFang = new MessageFormData()
        .title("技能菜单")
        .body("ALiFangZHE提醒您：/n道路千万条，安全第一条，/n行车不规范，亲人两行泪")
        .button1("技能1")
        .button2("技能2");
    ALiFang.show(player).then((response) => {
        if (response.isCanceled)
            return;
        if (response.selection == 0) {
            player.runCommand("say BUTTON2");
        }
    }).catch((e) => {
        throw e;
    });
}
world.events.beforeItemUse.subscribe(gkd => {
    const player = gkd.source;
    let getItem = gkd.item.id;
    if (getItem == 'zhe:zhao') { //选中的物品
        let ZHE = new ActionFormData() //菜单类
            .title('机架召唤菜单') //标题
            .body('ALiFang ZHE纸盒') //体
            .button('给予钻石') //按钮1
            .button('召唤贝利尔', 'textures/zhe.png') //按钮2
            .button('打开技能菜单', 'textures/jineng.png') //技能菜单
            .button('令', 'textures/ling.png')
            .button('年', 'textures/nian.png')
            .button('夕', 'textures/xi.png');
        ZHE.show(player).then((response) => {
            if (response.isCanceled)
                return;
            if (response.selection == 0) { //选中按钮1
                world.getDimension('overworld').runCommand("give @a diamond 1 1");
            }
            if (response.selection == 1) { //选中按钮2 
                world.getDimension('overworld').runCommand("function zhe1");
            }
            if (response.selection == 2) { //选中按钮3
                Wenjian(player);
            }
            if (response.selection == 3) { //选中按钮4
                world.getDimension('overworld').runCommand("无");
            }
            if (response.selection == 4) { //选中按钮5
                world.getDimension('overworld').runCommand("无");
            }
        }).catch((e) => {
            throw e;
        });
    }
});
//# sourceMappingURL=main.js.map