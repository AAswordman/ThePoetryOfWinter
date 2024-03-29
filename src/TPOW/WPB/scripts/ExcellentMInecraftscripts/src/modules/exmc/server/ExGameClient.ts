import ExGameServer from "./ExGameServer.js";
import ExGameConfig from "./ExGameConfig.js";
import ExClientEvents from "./events/ExClientEvents.js";
import { ChatSendAfterEvent, ChatSendBeforeEvent, Dimension, Player, world } from '@minecraft/server';
import ExPlayer from "./entity/ExPlayer.js";
import SetTimeOutSupport from "../interface/SetTimeOutSupport.js";
import ExDimension from "./ExDimension.js";
import ExErrorQueue from "./ExErrorQueue.js";
import ExActionAlert from "./ui/ExActionAlert.js";
import ExInterworkingPool from '../interface/ExInterworkingPool.js';
import { basicFinalType } from "../interface/types.js";

import "../../reflect-metadata/Reflect.js";
import { eventDecoratorFactory } from "./events/eventDecoratorFactory.js";
import notUtillTask from "../utils/notUtillTask.js";
import { TickEvent } from "./events/events.js";
import ExGame from "./ExGame.js";
import DynamicPropertyManager from "../interface/DynamicPropertyManager.js";
import Vector3 from "../math/Vector3.js";

export default class ExGameClient<T extends ExInterworkingPool = ExInterworkingPool> implements SetTimeOutSupport {
    private _events: ExClientEvents;

    debuggerChatTest = (e: ChatSendBeforeEvent) => {
        ExGame.run(() => {
            if (e.message.startsWith("*/"))
                ExGameConfig.console.info(eval(e.message.substring(2, e.message.length)));
        });
    }
    player: Player;
    exPlayer: ExPlayer;
    private _server: ExGameServer;
    clientId: string;
    playerName: string;
    private _pool?: T;
    private _poolCache!: ExInterworkingPool;
    public isLoaded = false;

    debug_removeAllTag() {
        for (let i of this.exPlayer.getTags()) {
            this.exPlayer.removeTag(i);
        }
    }
    debug_alert() {
        new ExActionAlert().title("aaa").body("bbbb").button("alert", () => { })
            .button("alert", () => { })
            .show(this.player);
    }
    debug_error() {
        return ExErrorQueue.getError();
    }

    constructor(server: ExGameServer, id: string, player: Player) {
        this._server = server;
        this.clientId = id;
        this.player = player;
        this.exPlayer = ExPlayer.getInstance(player);
        this.playerName = player.name;

        this._events = new ExClientEvents(this);
        if (ExGameConfig.config.debug) {
            this.asDebugger();
        } else {
            this.notDebugger();
        }
        notUtillTask(this, async () => {
            try {
                let res = await this.exPlayer.command.run(`testfor @s`);
                return true;
            } catch (e) {
                return false;
            }
        },
            () => { this.onLoad(); this.isLoaded = true; }
        );
        this.onJoin();
        eventDecoratorFactory(this.getEvents(), this);
    }

    getDimension(type?: string) {
        if (type !== undefined) {
            return world.getDimension(type);
        } else {
            return this.exPlayer.dimension;
        }
    }
    getExDimension(type: string | undefined = undefined) {
        return ExDimension.getInstance(this.getDimension(...arguments));
    }

    getPlayers() {
        return world.getPlayers();
    }

    getServer() {
        return this._server;
    }

    getClient(name: string | Player) {
        if (typeof name === "string") {
            return this.getServer().findClientByName(name);
        } else {
            return this.getServer().findClientByPlayer(name);
        }
    }

    setInterworkingPool(pool: T) {
        this._pool = pool;
        this._poolCache = {};
        for (const name in this._pool) {
            this._poolCache[name] = this._pool[name];
            Object.defineProperty(this._pool, name, {
                set: (v: basicFinalType) => {
                    this._poolCache[name] = v;
                    // TODO: send to client
                },
                get: () => {
                    const value = this._poolCache[name];
                    if (typeof value === "function") {
                        return function () {
                            const msg = {
                                "type": "pool",
                                "name": name,
                                "args": [...arguments]
                            };
                            // TODO: send to client
                            return new Promise((v, e) => {
                                const res = value(...msg.args);
                                v(res);
                            });
                        }
                    } else {
                        return value;
                    }
                },
                enumerable: true
            })
        }
    }
    getInterworkingPool() {
        return this._pool;
    }

    onJoin() {

    }
    onLoad() {
    }


    onLeave() {
        this._events.cancelAll();
        ExPlayer.deleteInstance(this.player);
    }

    getEvents() {
        return this._events;
    }

    asDebugger() {
        this.player.addTag("debugger");
        this._events.exEvents.beforeChatSend.subscribe(this.debuggerChatTest);
    }
    notDebugger() {
        this.player.removeTag("debugger");
    }
    getDefaultSpawnLocation() {
        return this.getServer().getDefaultSpawnLocation();
    }
    getDynamicPropertyManager(): DynamicPropertyManager {
        return this.player;
    }

    runMethodOnEveryClient(fun: ((e: this) => void)) {
        for (let c of this.getServer().getClients()) {
            fun(c as any);
        }
    }

    setTimeout(fun: () => void, timeout: number) {
        let time = 0;
        let method = (e: TickEvent) => {
            time += e.deltaTime * 1000;
            if (time > timeout) {
                this.getEvents().exEvents.tick.unsubscribe(method);
                fun();
            }
        };
        this.getEvents().exEvents.tick.subscribe(method);
    }

}