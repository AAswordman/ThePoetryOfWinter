scoreboard objectives add unknow_book dummy
scoreboard players add @s unknow_book 1

tellraw @s[scores={unknow_book=1}] { "rawtext" : [ { "translate" : "大自然的愤怒…" } ] }

tellraw @s[scores={unknow_book=2}] { "rawtext" : [ { "translate" : "在掠夺者之王的土地不断的扩张之下，他们砍伐了众多的树木。" } ] }
give @s[scores={unknow_book=2}] log 2

tellraw @s[scores={unknow_book=3}] { "rawtext" : [ { "translate" : "就像大多数被欺压已久的人民一样，绿叶们也开始了反抗。" } ] }
give @s[scores={unknow_book=3}] leaves 4

tellraw @s[scores={unknow_book=4}] { "rawtext" : [ { "translate" : "他们学着村民，制造了绿叶精华。虽然是植物做的，但是仍然拥有着不比钢差的强度。" } ] }

tellraw @s[scores={unknow_book=5}] { "rawtext" : [ { "translate" : "这难道不是大自然的奇迹吗？" } ] }
give @s[scores={unknow_book=5}] dec:nature_essence 1



tellraw @s[scores={unknow_book=6}] { "rawtext" : [ { "translate" : "一位暴君和他最忠诚的伙伴。" } ] }

tellraw @s[scores={unknow_book=7}] { "rawtext" : [ { "translate" : "很久以前村庄里面出生了一个绿衣服的村民。" } ] }
give @s[scores={unknow_book=7}] wool 1 13

tellraw @s[scores={unknow_book=8}] { "rawtext" : [ { "translate" : "小时候只是因为衣服颜色与众不同，被其他村民孩子排挤。" } ] }

tellraw @s[scores={unknow_book=9}] { "rawtext" : [ { "translate" : "长大以后，所有村民都学会的经商，他也没有学会，只是天天在摆弄那些古籍。" } ] }
give @s[scores={unknow_book=9}] dec:old_book 1

tellraw @s[scores={unknow_book=10}] { "rawtext" : [ { "translate" : "大家都亲切的称呼他为“傻子村民”。" } ] }

tellraw @s[scores={unknow_book=11}] { "rawtext" : [ { "translate" : "没人愿意给他传授知识" } ] }

tellraw @s[scores={unknow_book=12}] { "rawtext" : [ { "translate" : "他没有学会经商，所以只能在村里面混饭吃。" } ] }

tellraw @s[scores={unknow_book=13}] { "rawtext" : [ { "translate" : "村长觉得这样下去也不是办法，于是就想了个方法解决。" } ] }

tellraw @s[scores={unknow_book=14}] { "rawtext" : [ { "translate" : "傻子村民迷恋着村里的一个故事，一个关于另一个世界的故事。" } ] }

tellraw @s[scores={unknow_book=15}] { "rawtext" : [ { "translate" : "他经常研究古籍，就是为了，更了解那个世界；去到那个世界；得到力量。" } ] }

tellraw @s[scores={unknow_book=16}] { "rawtext" : [ { "translate" : "在一次外出之中他被苦力怕迫害了，但他没有死，而且还发现了一个黑曜石组成的破损遗迹。" } ] }
give @s[scores={unknow_book=16}] gunpowder 1

tellraw @s[scores={unknow_book=17}] { "rawtext" : [ { "translate" : "他高兴的都跪下来了，双手颤抖着，他知道那是什么东西，那是村长家祖传的古典上提到过的传送门，可以把他送到梦中的传送门。" } ] }
give @s[scores={unknow_book=17}] flint_and_steel 1 60

tellraw @s[scores={unknow_book=18}] { "rawtext" : [ { "translate" : "他偷走了全村仅有的几个黑曜石去修复那个梦的传送门。?" } ] }
give @s[scores={unknow_book=18}] obsidian

tellraw @s[scores={unknow_book=19}] { "rawtext" : [ { "translate" : "可是总感觉背后凉飕飕的，回头一看，却没有人。" } ] }

tellraw @s[scores={unknow_book=20}] { "rawtext" : [ { "translate" : "到了那个遗迹之后，他按照记忆中的样子熟练地把传送门复原了，就快要完成时，他的背后中了一箭，箭里有毒。" } ] }

tellraw @s[scores={unknow_book=21}] { "rawtext" : [ { "translate" : "他依靠着顽强的意志力，接着复原出了整个传送门，并用打火石开启了传送门。" } ] }

tellraw @s[scores={unknow_book=22}] { "rawtext" : [ { "translate" : "他昏倒了，就在他马上就可以完成他的梦想时。" } ] }

tellraw @s[scores={unknow_book=23}] { "rawtext" : [ { "translate" : "古老的传送门开启之时，往往预示着灾难降临之时。" } ] }
give @s[scores={unknow_book=23}] dec:waste 2

tellraw @s[scores={unknow_book=24}] { "rawtext" : [ { "translate" : "以前傻瓜村民曾经养过一头小牛。" } ] }
give @s[scores={unknow_book=24}] beef 3

tellraw @s[scores={unknow_book=25}] { "rawtext" : [ { "translate" : "那头牛是他从山洞里救出来的，当时这只牛都快饿死了。" } ] }
give @s[scores={unknow_book=25}] wheat_seeds 4

tellraw @s[scores={unknow_book=26}] { "rawtext" : [ { "translate" : "其他村民不和傻子玩，所以孤独他常常找这只牛来玩，喂它吃东西，和它一起追逐打闹，和它说心里话。" } ] }
give @s[scores={unknow_book=26}] wheat 2

tellraw @s[scores={unknow_book=27}] { "rawtext" : [ { "translate" : "可是其他村民的孩子看他和一头牛玩的这么高兴，于是就把牛棚的栅栏打开了。" } ] }

tellraw @s[scores={unknow_book=28}] { "rawtext" : [ { "translate" : "牛跑了，傻子村民没找到牛。" } ] }

tellraw @s[scores={unknow_book=29}] { "rawtext" : [ { "translate" : "这只牛误入了传送门，处于鼎盛状态的灰烬骑士大军发现了这只牛，但灰烬骑士并没有像平常一样杀死这些外来生物，而是给它吃了一些玄武岩提取出来的“玩具”。" } ] }

tellraw @s[scores={unknow_book=30}] { "rawtext" : [ { "translate" : "这灰灰的东西源于生命的残骸" } ] }
give @s[scores={unknow_book=30}] dec:ash 2

tellraw @s[scores={unknow_book=31}] { "rawtext" : [ { "translate" : "这只牛渐膨胀，变大变灰，直到和骑马的灰烬骑士差不多高位为止。" } ] }

tellraw @s[scores={unknow_book=32}] { "rawtext" : [ { "translate" : "它的眼睛也变红了，似乎会碾碎一切阻挡它的人。" } ] }

tellraw @s[scores={unknow_book=33}] { "rawtext" : [ { "translate" : "后来灰烬骑士关闭了传送门，走了，留下了这头猛兽在这里。" } ] }

tellraw @s[scores={unknow_book=34}] { "rawtext" : [ { "translate" : "这头猛兽把这里当做家，每当外面有倒霉蛋开启传送门时，它就会冲出去让他们感受这只庞然巨兽的狂躁。" } ] }

tellraw @s[scores={unknow_book=35}] { "rawtext" : [ { "translate" : "傻瓜村民醒了，他以为他在天堂。" } ] }

tellraw @s[scores={unknow_book=36}] { "rawtext" : [ { "translate" : "因为这个地方和他做梦梦到的地方是一样的。" } ] }

tellraw @s[scores={unknow_book=37}] { "rawtext" : [ { "translate" : "很快地狱千万恶灵的压抑和燥热使他意识到这不是在天堂，而是现实。" } ] }
give @s[scores={unknow_book=37}] dec:soul 1

tellraw @s[scores={unknow_book=38}] { "rawtext" : [ { "translate" : "他回忆了半天，也只是隐约的记得，晕倒之后先是很吵，后来经历了像骑马一样的晃动。" } ] }
give @s[scores={unknow_book=38}] saddle 1

tellraw @s[scores={unknow_book=39}] { "rawtext" : [ { "translate" : "他发现自己坐在一只庞然巨兽身上，附近是左右两排整整齐齐的亡灵，正前方有个身披铠甲的亡灵。" } ] }

tellraw @s[scores={unknow_book=40}] { "rawtext" : [ { "translate" : "看情况，好像是这只巨兽把他带到了这里，并且救了他。" } ] }
give @s[scores={unknow_book=40}] emerald 1

tellraw @s[scores={unknow_book=41}] { "rawtext" : [ { "translate" : "骑士走到他跟前，傻瓜村民感觉压迫感更沉重了。" } ] }

tellraw @s[scores={unknow_book=42}] { "rawtext" : [ { "translate" : "我……我这是在……做梦吗？" } ] }

tellraw @s[scores={unknow_book=43}] { "rawtext" : [ { "translate" : "骑士开口说：“想要报仇吗？那就把这个东西喝下去”骑士不知从哪里拿出了一瓶灰色的药水。" } ] }

tellraw @s[scores={unknow_book=44}] { "rawtext" : [ { "translate" : "傻瓜村民喝了下去，发现自己变灰了也变强了。" } ] }

tellraw @s[scores={unknow_book=45}] { "rawtext" : [ { "translate" : "骑士嘴角微微一笑，教了他一些东西之后就放他们回去了。" } ] }
give @s[scores={unknow_book=45}] arrow 3

tellraw @s[scores={unknow_book=46}] { "rawtext" : [ { "translate" : "回去之后真正的灾难降临了。" } ] }

tellraw @s[scores={unknow_book=47}] { "rawtext" : [ { "translate" : "傻瓜村民和这只巨兽对村庄进行了报复。" } ] }

tellraw @s[scores={unknow_book=48}] { "rawtext" : [ { "translate" : "但这似乎还不够，他想灭绝村民。" } ] }

tellraw @s[scores={unknow_book=49}] { "rawtext" : [ { "translate" : "他逼村民们喝下自己的血，而产生更多同类。" } ] }
give @s[scores={unknow_book=49}] glass_bottle 1

tellraw @s[scores={unknow_book=51}] { "rawtext" : [ { "translate" : "他一步步扩大自己的力量与领土。" } ] }
give @s[scores={unknow_book=51}] bread 2

tellraw @s[scores={unknow_book=52}] { "rawtext" : [ { "translate" : "还用魔法隐藏了自己的基地。" } ] }
give @s[scores={unknow_book=52}] stone 3

tellraw @s[scores={unknow_book=53}] { "rawtext" : [ { "translate" : "修建了无数的掠夺者哨所，以更好的达到自己的目的。" } ] }
give @s[scores={unknow_book=53}] planks 2 5

tellraw @s[scores={unknow_book=54}] { "rawtext" : [ { "translate" : "傻子村民被称作掠夺者之王，那种庞然巨兽也被称为掠夺兽。" } ] }

tellraw @s[scores={unknow_book=55}] { "rawtext" : [ { "translate" : "掠夺之王战不胜，更可怕的是他的下一个目标就是你！" } ] }
give @s[scores={unknow_book=55}] dec:mysterious_key



tellraw @s[scores={unknow_book=56}] { "rawtext" : [ { "translate" : "爱情？只不过是个名字罢了" } ] }

tellraw @s[scores={unknow_book=57}] { "rawtext" : [ { "translate" : "一对恩爱的情侣被掠夺之王丢到了下界。" } ] }
give @s[scores={unknow_book=57}] netherrack 6

tellraw @s[scores={unknow_book=58}] { "rawtext" : [ { "translate" : "一群恶魂不知道从何处冒了出来，那个男人把女人丢下跑了。" } ] }
give @s[scores={unknow_book=58}] ghast_tear 2

tellraw @s[scores={unknow_book=59}] { "rawtext" : [ { "translate" : "女人被火球的爆炸炸晕了，男人逃过了一劫，可是后来到岩浆里面游泳被烧成焦炭了。" } ] }
give @s[scores={unknow_book=59}] fireball

tellraw @s[scores={unknow_book=60}] { "rawtext" : [ { "translate" : "下界不少生物死亡之后便会化成不可见，几乎毫无威胁的灵魂。" } ] }

tellraw @s[scores={unknow_book=61}] { "rawtext" : [ { "translate" : "灵魂并非无所事事，他们会侵入意识薄弱的躯体， 比如说一具尸体或一具骷髅。" } ] }
give @s[scores={unknow_book=61}] bone

tellraw @s[scores={unknow_book=62}] { "rawtext" : [ { "translate" : "这个男人早上还说要爱她，保护她一辈子。" } ] }

tellraw @s[scores={unknow_book=63}] { "rawtext" : [ { "translate" : "而晚上她就被抛弃在这个地方，她正在处于人生的低谷之中。" } ] }

tellraw @s[scores={unknow_book=64}] { "rawtext" : [ { "translate" : "地狱的亡灵并不会放过这个机会，大量的恶魂侵入了躯体当中。" } ] }

tellraw @s[scores={unknow_book=65}] { "rawtext" : [ { "translate" : "在那个女孩想通之后，她变得相当坚强，心也变得冰冷了。" } ] }

tellraw @s[scores={unknow_book=66}] { "rawtext" : [ { "translate" : "可是恶魂们出不去了，发现自己被困在一个冰冷的容器之中。" } ] }

tellraw @s[scores={unknow_book=67}] { "rawtext" : [ { "translate" : "那个女孩也发现了异样，发现了自己获得了力量。" } ] }

tellraw @s[scores={unknow_book=68}] { "rawtext" : [ { "translate" : "她将这份力量带了回去，并且还这个世界带来了一份大礼——魔力与魔法。" } ] }
give @s[scores={unknow_book=68}] minecraft:amethyst_cluster

tellraw @s[scores={unknow_book=69}] { "rawtext" : [ { "translate" : "这都是他回去之后对这种力量的研究成果。" } ] }

tellraw @s[scores={unknow_book=70}] { "rawtext" : [ { "translate" : "可她的内心早已变得冰冷而丑陋" } ] }

tellraw @s[scores={unknow_book=71}] { "rawtext" : [ { "translate" : "她不喜欢被人打扰，特别是男性。" } ] }

tellraw @s[scores={unknow_book=72}] { "rawtext" : [ { "translate" : "如果你敢靠打扰她的研究，你的下场就会像那些她的追求者一样，成为他美丽冰库的一个新冰雕，这很棒不是吗？" } ] }
give @s[scores={unknow_book=72}] dec:frozen_power



tellraw @s[scores={unknow_book=74}] { "rawtext" : [ { "translate" : "掠夺者之王手下的平凡工匠" } ] }
give @s[scores={unknow_book=74}] iron_ingot 1 2

tellraw @s[scores={unknow_book=75}] { "rawtext" : [ { "translate" : "附魔师德莱斯这是一个尊敬力量的人，" } ] }

tellraw @s[scores={unknow_book=76}] { "rawtext" : [ { "translate" : "他的掠夺者之王那强大的力量所深深着迷，于是他找到了值得他奉献一生的王。" } ] }
give @s[scores={unknow_book=76}] gold_ingot 1

tellraw @s[scores={unknow_book=77}] { "rawtext" : [ { "translate" : "他一生中最值得自己自豪的是他做出了“绝望长剑”，并且把这把剑献给了自己的王。" } ] }
give @s[scores={unknow_book=77}] dec:steel_ingot 1

tellraw @s[scores={unknow_book=78}] { "rawtext" : [ { "translate" : "他相信这把剑的灵魂有王才配得上，其他人用都是糟蹋东西。" } ] }

tellraw @s[scores={unknow_book=79}] { "rawtext" : [ { "translate" : "为什么他制造出来的剑有灵魂呢？因为他以前曾经在地牢里面参加过一个神秘项目，" } ] }

tellraw @s[scores={unknow_book=80}] { "rawtext" : [ { "translate" : "去往另一个世界又回来了，当时那个世界则无穷的黑暗，" } ] }
give @s[scores={unknow_book=80}] end_stone 5

tellraw @s[scores={unknow_book=81}] { "rawtext" : [ { "translate" : "只有少部分人逃回来了但是这并不代表他们就安全了，他们也被黑暗感染了。" } ] }

tellraw @s[scores={unknow_book=82}] { "rawtext" : [ { "translate" : "刚开始人们只是皮肤有点异样，慢慢发现都获得了瞬移的能力，然后变得越来越黑， 越来越高，不过最后都失去了理智。" } ] }
give @s[scores={unknow_book=82}] ender_eye 1

tellraw @s[scores={unknow_book=83}] { "rawtext" : [ { "translate" : "但也不是全都是这样，有一个人保持着理智，那就是我们的附魔师德莱斯。" } ] }

tellraw @s[scores={unknow_book=84}] { "rawtext" : [ { "translate" : "他也有特殊能力，以至于可以涛制剑的灵魂。" } ] }

tellraw @s[scores={unknow_book=85}] { "rawtext" : [ { "translate" : "但是德莱斯之所以能保持理智，是靠着吸收之前的黑暗能量。" } ] }

tellraw @s[scores={unknow_book=86}] { "rawtext" : [ { "translate" : "传送门关闭了，那哪来的黑暗能量呢？" } ] }
give @s[scores={unknow_book=86}] crying_obsidian 2

tellraw @s[scores={unknow_book=87}] { "rawtext" : [ { "translate" : "之前的同伴们身上不是有吗，杀了他们不就有了，" } ] }

tellraw @s[scores={unknow_book=88}] { "rawtext" : [ { "translate" : "他的想法和行动都十分“干脆利落”。" } ] }

tellraw @s[scores={unknow_book=89}] { "rawtext" : [ { "translate" : "虽然这种活性嗨呀物质似乎会逐渐繁殖扩散感染，但还是十分稀少。" } ] }
give @s[scores={unknow_book=89}] dec:pollution_algae 2

tellraw @s[scores={unknow_book=90}] { "rawtext" : [ { "translate" : "如果你身上也携带着类似这种东西走在他隐居的神秘森林里面被他发现，估计他也会“干脆利落”的得到得到他想要的东西。" } ] }

tellraw @s[scores={unknow_book=91}] { "rawtext" : [ { "translate" : "真希望你能知道它的真正能力，并且活着回来呢！" } ] }
give @s[scores={unknow_book=89}] dec:dark_pearl 2



tellraw @s[scores={unknow_book=93}] { "rawtext" : [ { "translate" : "最具野心和威胁性的东西。" } ] }

tellraw @s[scores={unknow_book=94}] { "rawtext" : [ { "translate" : "实体灵魂生前是掠夺者之王手下最强大战士之一，实力远超掠夺者之王。" } ] }

tellraw @s[scores={unknow_book=95}] { "rawtext" : [ { "translate" : "但在挑战掠夺者之王时，由于掠夺者之王耍阴招而亡。" } ] }

tellraw @s[scores={unknow_book=96}] { "rawtext" : [ { "translate" : "他们之中有一个规矩，只有强者才配当王。" } ] }

tellraw @s[scores={unknow_book=97}] { "rawtext" : [ { "translate" : "他的灵魂本来是不足以化作实体的，但是由于它吞噬了太多的灵魂，逐渐出现了实体。" } ] }

tellraw @s[scores={unknow_book=98}] { "rawtext" : [ { "translate" : "而且还创造了暗影射手和真实之魂来帮助他消除潜在的威胁。" } ] }
give @s[scores={unknow_book=98}] bow 1 215

tellraw @s[scores={unknow_book=99}] { "rawtext" : [ { "translate" : "或许有一天他会吞噬整个地狱的灵魂，但那时他将强大到无法被阻挡！" } ] }
give @s[scores={unknow_book=99}] dec:entity_soul