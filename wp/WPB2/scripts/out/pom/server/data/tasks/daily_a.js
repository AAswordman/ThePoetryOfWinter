export default function taskDaily_a(lang) {
    return {
        "name": "每日任务-普通级",
        "tasks": [
            {
                "name": "粮食提交一",
                "conditions": [
                    {
                        "name": "小麦",
                        "typeId": "minecraft:wheat",
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "胡萝卜",
                        "typeId": "minecraft:carrot",
                        "count": 64,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "粮食提交二",
                "conditions": [
                    {
                        "name": "马铃薯",
                        "typeId": "minecraft:potato",
                        "count": 64,
                        "type": "item"
                    },
                    {
                        "name": "胡萝卜",
                        "typeId": "minecraft:carrot",
                        "count": 64,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "水果提交一",
                "conditions": [
                    {
                        "name": "西瓜",
                        "typeId": "minecraft:melon_block",
                        "count": 64,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "水果提交二",
                "conditions": [
                    {
                        "name": "熟鸡肉",
                        "typeId": "minecraft:pumpkin",
                        "count": 64,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "清理怪物",
                "conditions": [
                    {
                        "name": "僵尸",
                        "typeId": "minecraft:zombie",
                        "count": 8,
                        "type": "kill"
                    },
                    {
                        "name": "苦力怕",
                        "typeId": "minecraft:creeper",
                        "count": 2,
                        "type": "kill"
                    },
                    {
                        "name": "烈焰人",
                        "typeId": "minecraft:blaze",
                        "count": 2,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "初级升级台杀手",
                "conditions": [
                    {
                        "name": "初级升级台",
                        "typeId": "wb:station_upgrade_a",
                        "count": 1,
                        "type": "kill"
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
                "name": "狩猎愉快",
                "conditions": [
                    {
                        "name": "猪",
                        "typeId": "minecraft:pig",
                        "count": 3,
                        "type": "kill"
                    },
                    {
                        "name": "牛",
                        "typeId": "minecraft:cow",
                        "count": 3,
                        "type": "kill"
                    },
                    {
                        "name": "羊",
                        "typeId": "minecraft:sheep",
                        "count": 3,
                        "type": "kill"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "砍树",
                "conditions": [
                    {
                        "name": "木头",
                        "typeId": "minecraft:log",
                        "count": 64,
                        "type": "break"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "挖矿",
                "conditions": [
                    {
                        "name": "石头",
                        "typeId": "minecraft:stone",
                        "count": 64,
                        "type": "break"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "采苹果",
                "conditions": [
                    {
                        "name": "苹果",
                        "typeId": "minecraft:apple",
                        "count": 3,
                        "aux": 0,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "采毒马铃薯",
                "conditions": [
                    {
                        "name": "毒马铃薯",
                        "typeId": "minecraft:poisonous_potato",
                        "count": 3,
                        "aux": 0,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
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
                        "count": 3,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "腐肉回收",
                "conditions": [
                    {
                        "name": "腐肉",
                        "typeId": "minecraft:rotten_flesh",
                        "count": 128,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "好吃的南瓜派",
                "conditions": [
                    {
                        "name": "南瓜派",
                        "typeId": "minecraft:pumpkin_pie",
                        "count": 16,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "你对附魔一无所知",
                "conditions": [
                    {
                        "name": "转移附魔书",
                        "typeId": "wb:book_cache",
                        "count": 1,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            },
            {
                "name": "来点灵魂",
                "conditions": [
                    {
                        "name": "灵魂",
                        "typeId": "dec:soul",
                        "count": 8,
                        "type": "item"
                    }
                ],
                "rewards": [
                    {
                        "name": "模组经验",
                        "count": 125,
                        "unit": "点",
                        "type": "integral"
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=daily_a.js.map