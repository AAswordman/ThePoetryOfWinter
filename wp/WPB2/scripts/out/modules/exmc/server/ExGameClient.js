var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ExGameConfig from "./ExGameConfig.js";
import ExClientEvents from "./events/ExClientEvents.js";
import { world } from '@minecraft/server';
import ExPlayer from "./entity/ExPlayer.js";
import ExDimension from "./ExDimension.js";
import ExActionAlert from "./ui/ExActionAlert.js";
import "../../reflect-metadata/Reflect.js";
import { eventDecoratorFactory } from "./events/eventDecoratorFactory.js";
import notUtillTask from "../utils/notUtillTask.js";
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
        notUtillTask(this, () => __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this.exPlayer.command.run(`testfor @s`);
                return true;
            }
            catch (e) {
                return false;
            }
        }), () => this.onLoaded());
        this.onJoin();
        eventDecoratorFactory(this.getEvents(), this);
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
            return this.exPlayer.dimension;
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
        this._events.cancelAll();
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
    runMethodOnEveryClient(fun) {
        for (let c of this.getServer().getClients()) {
            fun(c);
        }
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