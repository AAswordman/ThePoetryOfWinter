import ExGameConfig from "./ExGameConfig.js";
import ExTransmissionMsg from "./ExTransmissionMsg.js";
import ExClientEvents from "./ExClientEvents.js";
export default class ExGameClient {
    constructor(server, id, player) {
        this.debuggerChatTest = (e) => {
            if (e.message.startsWith("*/"))
                ExGameConfig.console.info(eval(e.message.substring(2, e.message.length)));
        };
        this._server = server;
        this.clientId = id;
        this.player = player;
        this.playerName = player.name;
        this._events = new ExClientEvents(this);
        if (ExGameConfig.debug) {
            this.asDebugger();
        }
        else {
            this.notDebugger();
        }
    }
    onLeave() {
        this._events.unsubscribeAll();
    }
    getEvents() {
        return this._events;
    }
    _receiveMessage(msg) {
        if (msg.type == ExGameConfig.transmissionType.runOnClient) {
            msg.message(this);
        }
        else if (msg.type == ExGameConfig.transmissionType.sendToClient) {
            this.receiveMessage(msg);
        }
        else {
            ExGameConfig.console.error("客户端：未知传输类型" + msg.type);
        }
    }
    receiveMessage(msg) {
    }
    /**
     *
     * @param {string} id
     * @param {number} useType
     * @param {*} msg
     */
    postMessage(id, useType, msg) {
        this._server._receiveMessage(new ExTransmissionMsg(useType, id, this.clientId, msg));
    }
    /**
     *
     * @param {(arg: ExGameServer) => void} msg
     */
    runOnServer(msg) {
        this._server._receiveMessage(new ExTransmissionMsg(ExGameConfig.transmissionType.runOnServer, ExGameConfig.serverId, this.clientId, msg));
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
        const method = (e) => {
            time += e.deltaTime;
            if (time > timeout) {
                fun();
                this.getEvents().exEvents.tick.unsubscribe(method);
            }
        };
        this.getEvents().exEvents.tick.subscribe(method);
    }
}
//# sourceMappingURL=ExGameClient.js.map