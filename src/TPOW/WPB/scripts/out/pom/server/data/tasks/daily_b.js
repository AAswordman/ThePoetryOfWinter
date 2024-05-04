import { MinecraftItemTypes } from "../../../../modules/vanilla-data/lib/index.js";
export default function taskDaily_b(lang) {
    return {
        "name": "每日任务-稀有级",
        "tasks": [
            {
                "name": "粮食提交一",
                "conditions": [
                    {
                        "name": "小麦",
                        "typeId": MinecraftItemTypes.Wheat,
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "南瓜",
                        "typeId": MinecraftItemTypes.Pumpkin,
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "西瓜片",
                        "typeId": MinecraftItemTypes.MelonSlice,
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
                        "typeId": MinecraftItemTypes.Potato,
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "胡萝卜",
                        "typeId": MinecraftItemTypes.Carrot,
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "西瓜",
                        "typeId": MinecraftItemTypes.MelonBlock,
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
                        "typeId": MinecraftItemTypes.CookedChicken,
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "熟羊肉",
                        "typeId": MinecraftItemTypes.CookedMutton,
                        "count": 32,
                        "type": "item"
                    },
                    {
                        "name": "生牛肉",
                        "typeId": MinecraftItemTypes.Beef,
                        "count": 32,
                        "type": "item"
                    },
                    {
                        "name": "熟兔肉",
                        "typeId": MinecraftItemTypes.CookedRabbit,
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
                        "count": 550,
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
                        "typeId": "minecraft:pig",
                        "count": 10,
                        "type": "kill"
                    },
                    {
                        "name": "牛",
                        "typeId": "minecraft:cow",
                        "count": 12,
                        "type": "kill"
                    },
                    {
                        "name": "羊",
                        "typeId": "minecraft:sheep",
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
                        "typeId": "log",
                        "count": 128,
                        "type": "break"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 350,
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
                        "typeId": MinecraftItemTypes.Stone,
                        "count": 128,
                        "type": "break"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 350,
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
                        "typeId": MinecraftItemTypes.PoisonousPotato,
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
                        "typeId": MinecraftItemTypes.RabbitStew,
                        "count": 5,
                        "type": "item"
                    },
                    {
                        "name": "蘑菇煲",
                        "typeId": MinecraftItemTypes.MushroomStew,
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
                        "typeId": MinecraftItemTypes.EndCrystal,
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