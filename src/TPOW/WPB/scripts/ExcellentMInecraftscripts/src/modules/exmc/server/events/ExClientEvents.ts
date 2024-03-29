import ExGameClient from "../ExGameClient.js";
import { PlayerBreakBlockAfterEvent, ChatSendAfterEvent, ChatSendBeforeEvent, EffectAddAfterEvent, EntityHealthChangedAfterEvent, EntityHitBlockAfterEvent, EntityHurtAfterEvent, ItemDefinitionTriggeredAfterEvent, ItemDefinitionTriggeredBeforeEvent, ItemReleaseUseAfterEvent, ItemStopUseAfterEvent, ItemUseAfterEvent, ItemUseBeforeEvent, ItemUseOnAfterEvent, ItemUseOnBeforeEvent, PlayerSpawnAfterEvent } from '@minecraft/server';
import ExEventManager from "../../interface/ExEventManager.js";
import ExGameServer from '../ExGameServer.js';
import { Player, ItemStack, Entity } from '@minecraft/server';
import ExPlayer from '../entity/ExPlayer.js';
import { ExEventNames, ExOtherEventNames, ItemOnHandChangeEvent, PlayerShootProjectileEvent, TickEvent } from "./events.js";
import TickDelayTask from "../../utils/TickDelayTask.js";
import EventHandle, { EventListenerSettings } from './EventHandle.js';
import ExEntity from "../entity/ExEntity.js";
import Vector3 from "../../math/Vector3.js";
import { MinecraftEntityTypes } from "../../../vanilla-data/lib/index.js";



export default class ExClientEvents implements ExEventManager {

    private static eventHandlers: EventHandle<ExClientEvents["exEvents"]> = new EventHandle();

    _subscribe(arg0: string, callback: (arg: any) => void) {
        ExClientEvents.eventHandlers.subscribe(this._client.player, arg0, callback);
    }
    _unsubscribe(arg0: string, callback: (arg: any) => void) {
        ExClientEvents.eventHandlers.unsubscribe(this._client.player, arg0, callback);
    }
    cancelAll() {
        ExClientEvents.eventHandlers.unsubscribeAll(this._client.player);
    }

    _client: ExGameClient;

    static exEventSetting: EventListenerSettings<ExClientEvents["exEvents"]> = {
        [ExEventNames.beforeItemDefinitionEvent]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        [ExEventNames.afterItemDefinitionEvent]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        [ExEventNames.beforeItemUse]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        [ExEventNames.afterItemUse]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        [ExEventNames.afterItemStopUse]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        [ExEventNames.afterItemReleaseUse]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        [ExEventNames.afterChatSend]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "sender"
            }
        },
        [ExEventNames.beforeChatSend]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "sender"
            }
        },
        [ExOtherEventNames.tick]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByServerEvent
        },
        [ExOtherEventNames.beforeTick]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByServerEvent
        },
        [ExOtherEventNames.onLongTick]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByServerEvent
        },
        [ExEventNames.afterItemUseOn]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        [ExEventNames.beforeItemUseOn]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "source"
            }
        },
        // onceItemUseOn: {
        //     pattern: (registerName: string, k: string) => {
        //         this.onceItemUseOnMap = new Map<Entity, [TickDelayTask, boolean]>();
        //         ExClientEvents.eventHandlers.server.getEvents().register(registerName, (e: ItemUseOnEvent) => {
        //             if (!(e.source instanceof Player)) return;
        //             let part = (<Map<Player, ((i: ItemUseOnEvent) => void)[]>>ExClientEvents.eventHandlers.monitorMap[k]);
        //             if (!this.onceItemUseOnMap.has(e.source)) {
        //                 const player = e.source;
        //                 this.onceItemUseOnMap.set(e.source, [ExSystem.tickTask(() => {
        //                     let res = this.onceItemUseOnMap.get(player);
        //                     if (res === undefined) return;
        //                     res[1] = true;
        //                 }).delay(3), true]);
        //             }

        //             let res = this.onceItemUseOnMap.get(e.source);
        //             if (res === undefined) return;
        //             if (res[1]) {
        //                 res[1] = false;
        //                 part.get(e.source)?.forEach((v) => v(e));
        //             }
        //             res[0].stop();
        //             res[0].startOnce();

        //         });
        //     },
        //     filter: {
        //         "name": "source"
        //     },
        //     name: "itemUseOn"
        // },
        [ExOtherEventNames.afterPlayerHitBlock]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "damagingEntity"
            },
            name: ExEventNames.afterEntityHitBlock
        },
        [ExOtherEventNames.afterPlayerHitEntity]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "damageSource.damagingEntity"
            },
            name: ExEventNames.afterEntityHurt
        },
        [ExOtherEventNames.afterPlayerHurt]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "hurtEntity"
            },
            name: ExEventNames.afterEntityHurt
        },
        [ExOtherEventNames.afterItemOnHandChange]: {
            pattern: (registerName: string, k: string) => {
                this.onHandItemMap = new Map<Player, [ItemStack | undefined, number]>();
                ExClientEvents.eventHandlers.server.getEvents().register(registerName, (e: TickEvent) => {
                    for (let i of (ExClientEvents.eventHandlers.monitorMap[k])) {
                        let lastItemCache = this.onHandItemMap.get(<Player>i[0]);
                        if (e.currentTick % 4 === 0 || ((<Player>i[0]).selectedSlot !== lastItemCache?.[1])) {
                            let lastItem = lastItemCache?.[0];
                            let nowItem = ExPlayer.getInstance(<Player>i[0]).getBag().itemOnMainHand;

                            if (lastItem?.typeId !== nowItem?.typeId || (<Player>i[0]).selectedSlot !== lastItemCache?.[1]) {
                                let res: ItemStack | undefined = nowItem;
                                i[1].forEach((f) => {
                                    res = <ItemStack | undefined>f(new ItemOnHandChangeEvent(lastItem, lastItemCache?.[1] ?? 0, res, (<Player>i[0]).selectedSlot, <Player>i[0])) ?? res;
                                });
                                if (res !== undefined) {
                                    if(res.isWillBeRemoved){
                                        ExPlayer.getInstance(<Player>i[0]).getBag().itemOnMainHand = undefined;
                                    }else{
                                        ExPlayer.getInstance(<Player>i[0]).getBag().itemOnMainHand = res;
                                    }
                                }

                                this.onHandItemMap.set(<Player>i[0], [res, (<Player>i[0]).selectedSlot]);
                            }
                        }
                    }

                });
            },
            name: ExOtherEventNames.tick
        },
        [ExOtherEventNames.afterPlayerShootProj]: {
            pattern: (registerName: string, k: string) => {
                const func = (p: Entity, e: { "itemStack": ItemStack }) => {
                    let liss = ExClientEvents.eventHandlers.monitorMap[k].get(p);
                    if (!liss || liss.length === 0) return;

                    let arr: Entity[] = [];
                    const viewDic = ExEntity.getInstance(p).viewDirection;
                    const viewLen = viewDic.len();
                    const tmpV = new Vector3();
                    for (let e of p.dimension.getEntities({
                        "location": p.location,
                        "maxDistance": 16,
                        "families": ["arrow"]
                    })) {
                        tmpV.set(e.getVelocity());
                        const len = tmpV.len();
                        if (len === 0) continue;
                        if (tmpV.len() > 0.15
                            && Math.acos(tmpV.mul(viewDic) / viewLen / tmpV.len()) < 0.25) {
                            arr.push(e);
                        }
                    }
                    if (arr.length === 0) {
                        for (let e of p.dimension.getEntities({
                            "location": p.location,
                            "maxDistance": 6,
                            "excludeFamilies": [MinecraftEntityTypes.Player]
                        })) {
                            tmpV.set(e.getVelocity());
                            const len = tmpV.len();
                            if (len === 0) continue;
                            if (tmpV.len() > 0.15
                                && Math.acos(tmpV.mul(viewDic) / viewLen / tmpV.len()) < 0.25) {
                                arr.push(e);
                            }
                        }
                    }
                    if (arr.length > 0) {
                        // console.warn("Entity :"+ arr.map(e => e.typeId).join());
                        for (let i of liss) {
                            i(new PlayerShootProjectileEvent(p, arr[0]));
                        }
                    }
                };

                ExClientEvents.eventHandlers.server.getEvents().events.afterItemDefinitionEvent.subscribe((e) => {
                    func(<Player>e.source, e);
                });
                ExClientEvents.eventHandlers.server.getEvents().events.afterItemReleaseUse.subscribe((e) => {
                    if (e.itemStack) func(e.source, { "itemStack": e.itemStack });
                });
                ExClientEvents.eventHandlers.server.getEvents().events.afterItemUse.subscribe((e) => {
                    func(e.source, e);
                });
            }
        },

        [ExEventNames.afterPlayerBreakBlock]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "player"
            }
        },
        [ExEventNames.afterPlayerSpawn]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "player"
            }
        },
        [ExEventNames.afterEntityHealthChanged]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "entity"
            }
        },
        [ExEventNames.afterEffectAdd]: {
            pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
            filter: {
                "name": "entity"
            }
        }
    }

    exEvents = {
        [ExEventNames.beforeItemDefinitionEvent]: new Listener<ItemDefinitionTriggeredBeforeEvent>(this, ExEventNames.beforeItemDefinitionEvent),
        [ExEventNames.afterItemDefinitionEvent]: new Listener<ItemDefinitionTriggeredAfterEvent>(this, ExEventNames.afterItemDefinitionEvent),
        [ExEventNames.beforeItemUse]: new Listener<ItemUseBeforeEvent>(this, ExEventNames.beforeItemUse),
        [ExEventNames.afterItemUse]: new Listener<ItemUseAfterEvent>(this, ExEventNames.afterItemUse),
        [ExEventNames.afterItemStopUse]: new Listener<ItemStopUseAfterEvent>(this, ExEventNames.afterItemStopUse),
        [ExEventNames.afterItemReleaseUse]: new Listener<ItemReleaseUseAfterEvent>(this, ExEventNames.afterItemReleaseUse),
        [ExEventNames.afterChatSend]: new Listener<ChatSendAfterEvent>(this, ExEventNames.afterChatSend),
        [ExEventNames.beforeChatSend]: new Listener<ChatSendBeforeEvent>(this, ExEventNames.beforeChatSend),
        [ExOtherEventNames.tick]: new Listener<TickEvent>(this, ExOtherEventNames.tick),
        [ExOtherEventNames.beforeTick]: new Listener<TickEvent>(this, ExOtherEventNames.beforeTick),
        [ExOtherEventNames.onLongTick]: new Listener<TickEvent>(this, ExOtherEventNames.onLongTick),
        [ExEventNames.afterItemUseOn]: new Listener<ItemUseOnAfterEvent>(this, ExEventNames.afterItemUseOn),
        [ExEventNames.beforeItemUseOn]: new Listener<ItemUseOnBeforeEvent>(this, ExEventNames.beforeItemUseOn),
        [ExOtherEventNames.afterPlayerHitBlock]: new Listener<EntityHitBlockAfterEvent>(this, ExOtherEventNames.afterPlayerHitBlock),
        [ExOtherEventNames.afterPlayerHitEntity]: new Listener<EntityHurtAfterEvent>(this, ExOtherEventNames.afterPlayerHitEntity),
        [ExOtherEventNames.afterPlayerHurt]: new Listener<EntityHurtAfterEvent>(this, ExOtherEventNames.afterPlayerHurt),
        [ExOtherEventNames.afterItemOnHandChange]: new CallBackListener<ItemOnHandChangeEvent, ItemStack | void>(this, ExOtherEventNames.afterItemOnHandChange),
        [ExOtherEventNames.afterPlayerShootProj]: new Listener<PlayerShootProjectileEvent>(this, ExOtherEventNames.afterPlayerShootProj),
        [ExEventNames.afterPlayerBreakBlock]: new Listener<PlayerBreakBlockAfterEvent>(this, ExEventNames.afterPlayerBreakBlock),
        [ExEventNames.afterPlayerSpawn]: new Listener<PlayerSpawnAfterEvent>(this, ExEventNames.afterPlayerSpawn),
        [ExEventNames.afterEntityHealthChanged]: new Listener<EntityHealthChangedAfterEvent>(this, ExEventNames.afterEntityHealthChanged),
        [ExEventNames.afterEffectAdd]: new Listener<EffectAddAfterEvent>(this, ExEventNames.afterEffectAdd)
    };

    public static init(s: ExGameServer) {
        this.eventHandlers.setEventLiseners(this.exEventSetting);
        this.eventHandlers.init(s);
    }
    static onHandItemMap = new Map<Player, [ItemStack | undefined, number]>();
    static onceItemUseOnMap = new Map<Entity, [TickDelayTask, boolean]>();

    constructor(client: ExGameClient) {
        this._client = client;
    }
    register(name: string, fun: (...arg: unknown[]) => void) {
        let func: (...arg: unknown[]) => void = fun;
        if (name in this.exEvents) {
            return (<any>this.exEvents)[name].subscribe(func);
        }

        console.warn("No event registered for name " + name);
    }


    cancel(name: string, fun: (...arg: unknown[]) => void) {
        if (name in this.exEvents) {
            return (<any>this.exEvents)[name].unsubscribe(fun);
        }
    }
}

class Listener<T> {
    subscribe: (callback: (arg: T) => void) => void;
    unsubscribe: (callback: (arg: T) => void) => void;
    constructor(e: ExClientEvents, name: string) {
        this.subscribe = (callback: (arg: T) => void) => {
            e._subscribe(name, callback);
        }
        this.unsubscribe = (callback: (arg: T) => void) => {
            e._unsubscribe(name, callback);
        }
    }
}

class CallBackListener<T, V> {
    subscribe: (callback: (arg1: T) => V) => void;
    unsubscribe: (callback: (arg1: T) => V) => void;
    constructor(e: ExClientEvents, name: string) {
        this.subscribe = (callback: (arg1: T) => V) => {
            e._subscribe(name, callback);
        }
        this.unsubscribe = (callback: (arg1: T) => V) => {
            e._unsubscribe(name, callback);
        }
    }
}