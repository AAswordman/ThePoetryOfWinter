
import { MinecraftEntityTypes, MinecraftItemTypes } from "../../../../modules/vanilla-data/lib/index.js";
import { langType } from "../langType.js";
import { PomTaskJSON } from "./PomTask.js";

export default function taskDaily_x(lang: langType):PomTaskJSON {
    return {
        "name": "每日任务-传说级",
        "tasks": [
            {
                "name": "食物不过如此",
                "conditions": [
                    {
                        "name": "小麦",
                        "typeId": MinecraftItemTypes.Wheat,
                        "count": 512,
                        "type": "item"
                    },
                    {
                        "name": "马铃薯",
                        "typeId": MinecraftItemTypes.Potato,
                        "count": 512,
                        "type": "item"
                    },
                    {
                        "name": "胡萝卜",
                        "typeId": MinecraftItemTypes.Carrot,
                        "count": 512,
                        "type": "item"
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
            {
                "name": "排宴!!!",
                "conditions": [
                    {
                        "name": "熟鸡肉",
                        "typeId": MinecraftItemTypes.CookedChicken,
                        "count": 256,
                        "type": "item"
                    },
                    {
                        "name": "熟羊肉",
                        "typeId": MinecraftItemTypes.CookedMutton,
                        "count": 256,
                        "type": "item"
                    },
                    {
                        "name": "熟牛肉",
                        "typeId": MinecraftItemTypes.CookedBeef,
                        "count": 256,
                        "type": "item"
                    },
                    {
                        "name": "熟兔肉",
                        "typeId": MinecraftItemTypes.CookedRabbit,
                        "count": 64,
                        "type": "item"
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
            {
                "name": "清缴怪物",
                "conditions": [
                    {
                        "name": "僵尸战士",
                        "typeId": "dec:zombie_warrior",
                        "count": 64,
                        "type": "kill"
                    },
                    {
                        "name": "末影女巫",
                        "typeId": "dec:ender_witch",
                        "count": 32,
                        "type": "kill"
                    },
                    {
                        "name": "石头傀儡",
                        "typeId": "dec:stone_golem",
                        "count": 4,
                        "type": "kill"
                    },
                    {
                        "name": "黑曜石傀儡",
                        "typeId": "dec:obsidian_golem",
                        "count": 2,
                        "type": "kill"
                    },
                    {
                        "name": "骷髅战士",
                        "typeId": "dec:skeleton_warrior",
                        "count": 64,
                        "type": "kill"
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
            {
                "name": "传说升级台杀手",
                "conditions": [
                    {
                        "name": "传说升级台",
                        "typeId": "wb:station_upgrade_x",
                        "count": 1,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 1600,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "传说矿工",
                "conditions": [
                    {
                        "name": "钻石矿石",
                        "typeId": MinecraftItemTypes.DiamondOre,
                        "count": 16,
                        "type": "break"
                    },
                    {
                        "name": "煤矿矿石",
                        "typeId": MinecraftItemTypes.CoalOre,
                        "count": 64,
                        "type": "break"
                    },
                    {
                        "name": "金矿矿石",
                        "typeId": MinecraftItemTypes.GoldOre,
                        "count": 64,
                        "type": "break"
                    },
                    {
                        "name": "铁矿矿石",
                        "typeId": MinecraftItemTypes.IronOre,
                        "count": 64,
                        "type": "break"
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
            {
                "name": "海鲜美食家",
                "conditions": [
                    {
                        "name": "海胆",
                        "typeId": "dec:sea_urchin",
                        "count": 8,
                        "type": "item"
                    },
                    {
                        "name": "末影鱼",
                        "typeId": "dec:ender_fish",
                        "count": 12,
                        "type": "item"
                    },
                    {
                        "name": "三文鱼片",
                        "typeId": "dec:a_piece_of_salmon",
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "金矿鱼",
                        "typeId": "dec:gold_fish",
                        "count": 12,
                        "type": "item"
                    },
                    {
                        "name": "煤矿鱼",
                        "typeId": "dec:coal_fish",
                        "count": 16,
                        "type": "item"
                    },
                    {
                        "name": "钻石鱼",
                        "typeId": "dec:diamond_fish",
                        "count": 6,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 2100,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "觉醒龙之力",
                "conditions": [
                    {
                        "name": "觉醒末影龙",
                        "typeId": "minecraft:ender_dragon",
                        "count": 1,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 7000,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            }
        ]
    }
}