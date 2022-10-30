import ExGameServer from "./ExGameServer.js";
import ExGameConfig from "./ExGameConfig.js";
import ExClientEvents from "./ExClientEvents.js";
import { ChatEvent, Dimension, Player, TickEvent, world } from '@minecraft/server';
import ExPlayer from "./entity/ExPlayer.js";
import SetTimeOutSupport from "../interface/SetTimeOutSupport.js";
import ExDimension from "./ExDimension.js";
import ExErrorQueue from "./ExErrorQueue.js";
import ExActionAlert from "./ui/ExActionAlert.js";
import ExInterworkingPool from '../interface/ExInterworkingPool.js';
import { basicFinalType } from "../interface/types.js";

export default class ExGameClient<T extends ExInterworkingPool = ExInterworkingPool> implements SetTimeOutSupport {
    private _events: ExClientEvents;

    debuggerChatTest = (e: ChatEvent) => {
        if (e.message.startsWith("*/"))
            ExGameConfig.console.info(eval(e.message.substring(2, e.message.length)));
    }
    player: Player;
    exPlayer: ExPlayer;
    private _server: ExGameServer;
    clientId: string;
    playerName: string;
    private _pool?: T;
    private _poolCache!: ExInterworkingPool;

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
        

        let func = () => {
            try {
                this.player.runCommand(`testfor @s`);
                try {
                    this.onLoaded();
                } catch (e) {
                    ExErrorQueue.throwError(e);
                }
            } catch (e) {
                this.setTimeout(func, 2000);
            }
        };
        func();

        this.onJoin();
    }

    getDimension(type?: string) {
        if (type !== undefined) {
            return world.getDimension(type);
        } else {
            return this.exPlayer.getDimension();
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
    onLoaded() {
    }

    onLeave() {
        this._events.unsubscribeAll();
    }

    getEvents() {
        return this._events;
    }

    asDebugger() {
        this.player.addTag("debugger");
        this._events.exEvents.chat.subscribe(this.debuggerChatTest);
    }
    notDebugger() {
        this.player.removeTag("debugger");
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