import { MinecraftEntityTypes, MinecraftItemTypes } from "@minecraft/server";
export default function taskDaily_b(lang) {
    return {
        "name": "每日任务-稀有级",
        "tasks": [
            {
                "name": "粮食提交一",
                "conditions": [
                    {
                        "name": "小麦",
                        "typeId": MinecraftItemTypes.wheat.id,
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "南瓜",
                        "typeId": MinecraftItemTypes.pumpkin.id,
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "西瓜片",
                        "typeId": MinecraftItemTypes.melonSlice.id,
                        "count": 128,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 400,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "粮食提交三",
                "conditions": [
                    {
                        "name": "马铃薯",
                        "typeId": MinecraftItemTypes.potato.id,
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "胡萝卜",
                        "typeId": MinecraftItemTypes.carrot.id,
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "西瓜",
                        "typeId": MinecraftItemTypes.melonBlock.id,
                        "count": 32,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 400,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "盛宴",
                "conditions": [
                    {
                        "name": "熟鸡肉",
                        "typeId": MinecraftItemTypes.cookedChicken.id,
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "熟羊肉",
                        "typeId": MinecraftItemTypes.cookedMutton.id,
                        "count": 32,
                        "type": "item"
                    },
                    {
                        "name": "生牛肉",
                        "typeId": MinecraftItemTypes.beef.id,
                        "count": 32,
                        "type": "item"
                    },
                    {
                        "name": "熟兔肉",
                        "typeId": MinecraftItemTypes.cookedRabbit.id,
                        "count": 6,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 400,
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
                        "count": 8,
                        "type": "kill"
                    },
                    {
                        "name": "地狱苦力怕",
                        "typeId": "dec:nether_creeper",
                        "count": 4,
                        "type": "kill"
                    },
                    {
                        "name": "末影女巫",
                        "typeId": "dec:ender_witch",
                        "count": 2,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 900,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "中级升级台杀手",
                "conditions": [
                    {
                        "name": "中级升级台",
                        "typeId": "wb:station_upgrade_b",
                        "count": 1,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 275,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "狩猎愉快!",
                "conditions": [
                    {
                        "name": "猪",
                        "typeId": MinecraftEntityTypes.pig.id,
                        "count": 10,
                        "type": "kill"
                    },
                    {
                        "name": "牛",
                        "typeId": MinecraftEntityTypes.cow.id,
                        "count": 12,
                        "type": "kill"
                    },
                    {
                        "name": "羊",
                        "typeId": MinecraftEntityTypes.sheep.id,
                        "count": 9,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 400,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "砍树!",
                "conditions": [
                    {
                        "name": "木头",
                        "typeId": MinecraftItemTypes.log.id,
                        "count": 128,
                        "type": "break"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 175,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "成为矿工",
                "conditions": [
                    {
                        "name": "石头",
                        "typeId": MinecraftItemTypes.stone.id,
                        "count": 128,
                        "type": "break"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 175,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "毒马铃薯",
                "conditions": [
                    {
                        "name": "毒马铃薯",
                        "typeId": MinecraftItemTypes.poisonousPotato.id,
                        "count": 16,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 900,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "改善伙食",
                "conditions": [
                    {
                        "name": "兔肉煲",
                        "typeId": MinecraftItemTypes.rabbitStew.id,
                        "count": 5,
                        "type": "item"
                    },
                    {
                        "name": "蘑菇煲",
                        "typeId": MinecraftItemTypes.mushroomStew.id,
                        "count": 5,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 900,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "僵尸大脑",
                "conditions": [
                    {
                        "name": "僵尸大脑",
                        "typeId": "dec:zombie_brain",
                        "count": 64,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 400,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "龙之力",
                "conditions": [
                    {
                        "name": "末地水晶",
                        "typeId": MinecraftItemTypes.endCrystal.id,
                        "count": 4,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 250,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "附魔匠",
                "conditions": [
                    {
                        "name": "转移附魔书",
                        "typeId": "wb:book_cache",
                        "count": 3,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 250,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "灵魂猎手",
                "conditions": [
                    {
                        "name": "灵魂",
                        "typeId": "dec:soul",
                        "count": 32,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 250,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "海洋美食",
                "conditions": [
                    {
                        "name": "海胆",
                        "typeId": "dec:sea_urchin",
                        "count": 4,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 900,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=daily_b.js.map