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
import ExTransmissionMsg from "./ExTransmissionMsg.js";
import ExClientEvents from "./ExClientEvents.js";
import { world } from 'mojang-minecraft';
import ExPlayer from "./entity/ExPlayer.js";
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
        if (ExGameConfig.debug) {
            this.asDebugger();
        }
        else {
            this.notDebugger();
        }
        this.onJoin();
    }
    getDimension(type) {
        return world.getDimension(type);
    }
    getPlayers() {
        return world.getPlayers();
    }
    onJoin() {
        let func = () => {
            try {
                this.player.runCommand(`testfor @s`);
                this.onLoaded();
            }
            catch (e) {
                this.setTimeout(func, 2000);
            }
        };
        func();
    }
    onLoaded() {
    }
    onLeave() {
        this._events.unsubscribeAll();
    }
    getEvents() {
        return this._events;
    }
    _receiveMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.type == ExGameConfig.transmissionType.runOnClient) {
                if (typeof msg.message === "function") {
                    return msg.message(this);
                }
                else {
                    ExGameConfig.console.error("Invalid message received: " + msg.message);
                }
            }
            else if (msg.type == ExGameConfig.transmissionType.sendToClient) {
                this.receiveMessage(msg);
            }
            else {
                ExGameConfig.console.error("客户端：未知传输类型" + msg.type);
            }
        });
    }
    receiveMessage(msg) {
    }
    postMessage(id, useType, msg) {
        this._server._receiveMessage(new ExTransmissionMsg(useType, id, this.clientId, msg));
    }
    runOnServer(msg) {
        return this._server._receiveMessage(new ExTransmissionMsg(ExGameConfig.transmissionType.runOnServer, ExGameConfig.serverId, this.clientId, msg));
    }
    asDebugger() {
        this.player.addTag("debugger");
        this._events.exEvents.chat.subscribe(this.debuggerChatTest);
    }
    notDebugger() {
        this.player.removeTag("debugger");
        this._events.exEvents.chat.unsubscribe(this.debuggerChatTest);
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