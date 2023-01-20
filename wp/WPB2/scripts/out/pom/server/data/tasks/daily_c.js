export default function taskDaily_c(lang) {
    return {
        "name": "每日任务-精锐级",
        "tasks": [
            {
                "name": "大地主",
                "conditions": [
                    {
                        "name": "小麦",
                        "typeId": "minecraft:wheat",
                        "count": 256,
                        "type": "item"
                    },
                    {
                        "name": "马铃薯",
                        "typeId": "minecraft:potatoes",
                        "count": 256,
                        "type": "item"
                    },
                    {
                        "name": "南瓜",
                        "typeId": "minecraft:pumpkin",
                        "count": 64,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 700,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "无忧粮仓",
                "conditions": [
                    {
                        "name": "小麦",
                        "typeId": "minecraft:wheat",
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "马铃薯",
                        "typeId": "minecraft:potatoes",
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "胡萝卜",
                        "typeId": "minecraft:carrot",
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "甜菜根",
                        "typeId": "minecraft:beetroot",
                        "count": 128,
                        "type": "item"
                    },
                    {
                        "name": "西瓜",
                        "typeId": "minecraft:melon_block",
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "南瓜",
                        "typeId": "minecraft:pumpkin",
                        "count": 64,
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
                "name": "盛宴",
                "conditions": [
                    {
                        "name": "熟鸡肉",
                        "typeId": "minecraft:cooked_chicken",
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "熟羊肉",
                        "typeId": "minecraft:cooked_mutton",
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "熟牛肉",
                        "typeId": "minecraft:cookebeef",
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "熟兔肉",
                        "typeId": "minecraft:cooked_rabbit",
                        "count": 16,
                        "type": "item"
                    },
                    {
                        "name": "蘑菇煲",
                        "typeId": "minecraft:mushroom_stew",
                        "count": 3,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 850,
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
                        "count": 32,
                        "type": "kill"
                    },
                    {
                        "name": "地狱苦力怕",
                        "typeId": "dec:nether_creeper",
                        "count": 8,
                        "type": "kill"
                    },
                    {
                        "name": "末影女巫",
                        "typeId": "dec:ender_witch",
                        "count": 6,
                        "type": "kill"
                    },
                    {
                        "name": "石头傀儡",
                        "typeId": "dec:stone_golem",
                        "count": 3,
                        "type": "kill"
                    },
                    {
                        "name": "黑曜石傀儡",
                        "typeId": "dec:obsidian_golem",
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
                "name": "高级升级台杀手",
                "conditions": [
                    {
                        "name": "高级升级台",
                        "typeId": "wb:station_upgrade_c",
                        "count": 1,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 850,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "凋零击败者",
                "conditions": [
                    {
                        "name": "凋零",
                        "typeId": "minecraft:wither",
                        "count": 1,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 1250,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "牧场主",
                "conditions": [
                    {
                        "name": "猪",
                        "typeId": "minecraft:pig",
                        "count": 16,
                        "type": "kill"
                    },
                    {
                        "name": "牛",
                        "typeId": "minecraft:cow",
                        "count": 20,
                        "type": "kill"
                    },
                    {
                        "name": "羊",
                        "typeId": "minecraft:sheep",
                        "count": 16,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 800,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "高级矿工",
                "conditions": [
                    {
                        "name": "钻石矿石",
                        "typeId": "minecraft:diamond_ore",
                        "count": 5,
                        "type": "break"
                    },
                    {
                        "name": "煤矿矿石",
                        "typeId": "minecraft:coal_ore",
                        "count": 64,
                        "type": "break"
                    },
                    {
                        "name": "金矿矿石",
                        "typeId": "minecraft:gold_ore",
                        "count": 5,
                        "type": "break"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 1000,
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
                        "typeId": "minecraft:rabbit_stew",
                        "count": 8,
                        "type": "item"
                    },
                    {
                        "name": "蘑菇煲",
                        "typeId": "minecraft:mushroom_stew",
                        "count": 8,
                        "type": "item"
                    },
                    {
                        "name": "苹果汁",
                        "typeId": "dec:apple_juice",
                        "count": 2,
                        "type": "item"
                    },
                    {
                        "name": "烤鲈鱼",
                        "typeId": "dec:perch_cooked",
                        "count": 32,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 850,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "魔能之力",
                "conditions": [
                    {
                        "name": "高级魔能锭",
                        "typeId": "wb:mineral_senior_equipment",
                        "count": 5,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 1400,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "附魔大师",
                "conditions": [
                    {
                        "name": "转移附魔书",
                        "typeId": "wb:book_cache",
                        "count": 7,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 1050,
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
                    },
                    {
                        "name": "末影鱼",
                        "typeId": "dec:ender_fish",
                        "count": 4,
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
                        "count": 4,
                        "type": "item"
                    },
                    {
                        "name": "煤矿鱼",
                        "typeId": "dec:coal_fish",
                        "count": 4,
                        "type": "item"
                    },
                    {
                        "name": "钻石鱼",
                        "typeId": "dec:diamond_fish",
                        "count": 2,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 1150,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=daily_c.js.map