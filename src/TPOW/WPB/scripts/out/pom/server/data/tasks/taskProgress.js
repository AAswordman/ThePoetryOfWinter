import PomAncientStoneBoss from "../../entities/PomAncientStoneBoss.js";
import PomHeadlessGuardBoss from "../../entities/PomHeadlessGuardBoss.js";
import { PomIntentionsBoss3 } from "../../entities/PomIntentionsBoss.js";
import PomMagicStoneBoss from "../../entities/PomMagicStoneBoss.js";
export default function taskProgress(lang) {
    return {
        "main_dec_leavesgolem": {
            "name": "自然的愤怒",
            "conditions": [
                {
                    "name": "绿叶精华BOSS",
                    "typeId": "dec:leaves_golem",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 2000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_king_of_pillager": {
            "name": "战胜掠夺！",
            "conditions": [
                {
                    "name": "掠夺者之王BOSS",
                    "typeId": "dec:king_of_pillager",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 2500,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_abyssal_controller": {
            "name": "海中牢笼",
            "conditions": [
                {
                    "name": "深海牢笼BOSS",
                    "typeId": "dec:abyssal_controller",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 3000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_predators": {
            "name": "蝙蝠之王",
            "conditions": [
                {
                    "name": "捕食者BOSS",
                    "typeId": "dec:predators",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 4500,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_enchant_illager": {
            "name": "神秘教堂",
            "conditions": [
                {
                    "name": "附魔师BOSS",
                    "typeId": "dec:enchant_illager_2",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 4500,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_evlghost": {
            "name": "永冬之魂",
            "conditions": [
                {
                    "name": "永冬恶魂BOSS",
                    "typeId": "dec:everlasting_winter_ghast_1",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 8000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_escaped_soul": {
            "name": "不死灵魂",
            "conditions": [
                {
                    "name": "逃逸之魂BOSS",
                    "typeId": "dec:escaped_soul_entity",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 9000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_host_of_deep": {
            "name": "深渊？",
            "conditions": [
                {
                    "name": "深渊之主BOSS",
                    "typeId": "dec:host_of_deep_2",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 9000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_dec_ash_knight": {
            "name": "挑战灰烬",
            "conditions": [
                {
                    "name": "灰烬骑士BOSS",
                    "typeId": "dec:ash_knight",
                    "damage": 1,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 7500,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "dragon": {
            "name": "结束了？",
            "conditions": [
                {
                    "name": "觉醒末影龙",
                    "typeId": "wb:magic_stoneman",
                    "type": "boss_tag",
                    "tagName": "wbstartkeyok"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 10000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_pom_1": {
            "name": "沙漠暴风",
            "conditions": [
                {
                    "name": "魔化石块BOSS",
                    "typeId": PomMagicStoneBoss.typeId,
                    "damage": 100,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 15000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_pom_2": {
            "name": "巨型洞穴",
            "conditions": [
                {
                    "name": "无头守卫BOSS",
                    "typeId": PomHeadlessGuardBoss.typeId,
                    "damage": 300,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 20000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_pom_3": {
            "name": "远古探索者",
            "conditions": [
                {
                    "name": "远古石像BOSS",
                    "typeId": PomAncientStoneBoss.typeId,
                    "damage": 400,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 30000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        },
        "main_pom_4": {
            "name": "心灵之境",
            "conditions": [
                {
                    "name": "念BOSS",
                    "typeId": PomIntentionsBoss3.typeId,
                    "damage": 500,
                    "type": "boss"
                }
            ],
            "rewards": [
                {
                    "name": "模组经验",
                    "count": 40000,
                    "unit": "点",
                    "type": "integral"
                }
            ]
        }
    };
}
//# sourceMappingURL=taskProgress.js.map