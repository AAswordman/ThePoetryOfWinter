/*
* dave.myQuestAPI.{..}
* getItemHand
* getItems
* getFormTitle
* getFromDesc
* getFromButton
*/
import { system, world, Items } from "@minecraft/server";
import { ActionFormData } from '@minecraft/server-ui';
// Used to import variables from config.js
import * as dave from './user/config.js';
system.events.beforeWatchdogTerminate.subscribe(e => {
    e.cancel = true;
    console.warn(e.terminateReason.stackOverflow);
});
// System
const getEnable = dave.myQuestAPI.system.enable;
const getTag = dave.myQuestAPI.system.tag;
const getVer = dave.myQuestAPI.system.version;
const msgDisable = dave.myQuestAPI.system.inactive;
// Id
const getAuthor = dave.myQuestAPI.getIdentifier.author;
const getTitle = dave.myQuestAPI.getIdentifier.title;
const getDesc = dave.myQuestAPI.getIdentifier.description;
// Quest Req
const getItemHand = dave.myQuestAPI.getQuest.itemHand;
const getItems = dave.myQuestAPI.getQuest.items;
const getRewards = dave.myQuestAPI.getQuest.rewards;
// Form
const getTitleOn = dave.myQuestAPI.getForm.title.enable;
const getTitleItems = dave.myQuestAPI.getForm.title.title;
const getDescItems = dave.myQuestAPI.getForm.description.description;
const getComplated = dave.myQuestAPI.getForm.description.complated;
const getNotComplated = dave.myQuestAPI.getForm.description.notComplated;
const getIconOn = dave.myQuestAPI.getForm.icon.enable;
const getIconConf = dave.myQuestAPI.getForm.icon.confirm;
const getIconItems = dave.myQuestAPI.getForm.icon.items;
const getBtnBack = dave.myQuestAPI.getForm.button.back;
const getBtnCheck = dave.myQuestAPI.getForm.button.check;
const getBtnAbout = dave.myQuestAPI.getForm.button.about;
world.events.itemUse.subscribe(eventData => {
    // Detect items used
    if (eventData.item.typeId == getItemHand) {
        if (getEnable == true) {
            // Open forms
            formMain(eventData.source);
        }
        else {
            if (eventData.hasTag(getTag)) {
                // Open forms
                formMain(eventData.source);
            }
            else {
                let runCmd = eventData.source.runCommandAsync;
                runCmd(`tellraw @s {"rawtext":[{"text":"${msgDisable}\n\n "}]}`);
                runCmd(`tellraw @s {"rawtext":[{"text":"===== ${getTitle} =====\n§e介绍: §r${getEnable}\n§e版本: §r${getVer}\n§e特别鸣谢: §r@${getAuthor}\n§e整合包作者: §r@云叶鲲"}]}`);
            }
        }
    }
});
//function fromItemReq(player)
let formMain = (player) => {
    let LIST = [];
    const form = new ActionFormData()
        .title(getTitle)
        .button(getBtnAbout);
    let COUNT = 0;
    for (const thisItems of getItems) {
        if (Items.get(thisItems) && getTitleOn == true) {
            let getTitleAuto = getItems[COUNT].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            // Checks whether the user wants to use the icon or not
            if (getIconOn == true) {
                if (!player.hasTag(thisItems)) {
                    form.button(getTitleAuto, `textures/${getIconItems[COUNT]}`);
                }
                else {
                    form.button(getTitleAuto, getIconConf);
                }
            }
            else {
                if (!player.hasTag(thisItems)) {
                    form.button(getTitleAuto);
                }
                else {
                    form.button(getTitleAuto + "\n §2完成");
                }
            }
            LIST.push(COUNT);
        }
        else {
            if (getIconOn == true) {
                if (!player.hasTag(thisItems)) {
                    form.button(getTitleItems[COUNT], `textures/${getIconItems[COUNT]}`);
                }
                else {
                    form.button(getTitleItems[COUNT], getIconConf);
                }
            }
            else {
                if (!player.hasTag(thisItems)) {
                    form.button(getTitleItems[COUNT]);
                }
                else {
                    form.button(getTitleItems[COUNT] + "\n §2完成");
                }
            }
            LIST.push(COUNT);
        }
        COUNT += 1;
    }
    form.show(player).then(response => {
        if (response.selection == 0) {
            formAbout(player);
        }
        if (response.selection) {
            formSelection(player, response.selection);
        }
    });
};
function formSelection(player, string) {
    let getItemName = getItems[string - 1].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let getRewardName = getRewards[string - 1][0].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let getIsComplate = player.hasTag(getItems[string - 1]);
    const form2 = new ActionFormData()
        .title(getTitle);
    if (getIsComplate == true) {
        form2.body(`${getDescItems[string - 1]}\n\n§e任务目标: §r${getItemName}\n§e完成情况: §r${getRewardName}\n§e完成: §r${getComplated}`);
    }
    if (getIsComplate == false) {
        form2.body(`${getDescItems[string - 1]}\n\n§e任务目标: §r${getItemName}\n§e任务奖励: §r${getRewardName}\n§e完成情况: §r${getNotComplated}`);
    }
    form2.button(getBtnCheck);
    form2.button(getBtnBack);
    form2.show(player).then(response2 => {
        if (!response2.isCanceled) {
            if (response2.selection == 0 && !player.hasTag(getItems[string - 1])) {
                for (let i = 0; i < 36; i++) {
                    if (player.getComponent("inventory").container.getItem(i) && player.getComponent("inventory").container.getItem(i).typeId == getItems[string - 1]) {
                        player.runCommandAsync(`give @s ${getRewards[string - 1][0]} ${getRewards[string - 1][1]}`);
                        player.addTag(getItems[string - 1]);
                        break;
                    }
                }
            }
            if (response2.selection == 1) {
                formMain(player);
            }
        }
    });
}
//function formAbout(player)
let formAbout = (player) => {
    const form = new ActionFormData()
        .title(getTitle)
        .body(`§e重生黄昏生存: §r${getEnable}\n§e版本: §r${getVer}\n§e特别鸣谢:冬月江离,灰机培百香果 §r@${getAuthor}\n§e整合包作者: §r@云叶鲲`)
        .button(getBtnBack);
    form.show(player).then(response => {
        if (response.selection == 0) {
            formMain(player);
        }
    });
};
//# sourceMappingURL=main.js.map