import ExGameConfig from "./ExGameConfig.js";
import ExClientEvents from "./ExClientEvents.js";
import { world } from 'mojang-minecraft';
import ExPlayer from "./entity/ExPlayer.js";
import ExDimension from "./ExDimension.js";
import ExErrorQueue from "./ExErrorQueue.js";
import ExActionAlert from "./ui/ExActionAlert.js";
export default class ExGameClient {
    constructor(server, id, player) {
        this.debuggerChatTest = (e) => {
            if (e.message.startsWith("*/"))
                ExGameConfig.console.info(eval(e.message.substring(2, e.message.length)));
        };
        this._server = server;
        this.clientId = id;
        this.player = player;
        this.exPlayer = ExPlayer.getInstance(player);
        this.playerName = player.name;
        this._events = new ExClientEvents(this);
        if (ExGameConfig.config.debug) {
            this.asDebugger();
        }
        else {
            this.notDebugger();
        }
        let func = () => {
            try {
                this.player.runCommand(`testfor @s`);
                try {
                    this.onLoaded();
                }
                catch (e) {
                    ExErrorQueue.throwError(e);
                }
            }
            catch (e) {
                this.setTimeout(func, 2000);
            }
        };
        func();
        this.onJoin();
    }
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
    getDimension(type) {
        if (type !== undefined) {
            return world.getDimension(type);
        }
        else {
            return this.exPlayer.getDimension();
        }
    }
    getExDimension(type = undefined) {
        return ExDimension.getInstance(this.getDimension(...arguments));
    }
    getPlayers() {
        return world.getPlayers();
    }
    getServer() {
        return this._server;
    }
    setInterworkingPool(pool) {
        this._pool = pool;
        this._poolCache = {};
        for (const name in this._pool) {
            this._poolCache[name] = this._pool[name];
            Object.defineProperty(this._pool, name, {
                set: (v) => {
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
                        };
                    }
                    else {
                        return value;
                    }
                },
                enumerable: true
            });
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
    setTimeout(fun, timeout) {
        let time = 0;
        let method = (e) => {
            time += e.deltaTime * 1000;
            if (time > timeout) {
                this.getEvents().exEvents.tick.unsubscribe(method);
                fun();
            }
        };
        this.getEvents().exEvents.tick.subscribe(method);
    }
}
//# sourceMappingURL=ExGameClient.js.map