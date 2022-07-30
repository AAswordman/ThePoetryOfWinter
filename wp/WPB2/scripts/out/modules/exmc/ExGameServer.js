var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ExGameClient from "./ExGameClient.js";
import ExDimension from "./ExDimension.js";
import { world } from "mojang-minecraft";
import ExGameConfig from "./ExGameConfig.js";
import initConsole from "./utils/Console.js";
import ExTransmissionMsg from "./ExTransmissionMsg.js";
import ExServerEvents from "./ExServerEvents.js";
import UUID from "./utils/UUID.js";
import ExErrorStack from './ExErrorStack.js';
export default class ExGameServer {
    constructor() {
        this.clients = new Map();
        ExGameConfig.console = initConsole(ExGameConfig);
        this._events = new ExServerEvents(this);
        ExErrorStack.init(this);
        this._events.events.playerJoin.subscribe(this.onClientJoin.bind(this));
        this._events.events.playerLeave.subscribe(this.onClientLeave.bind(this));
    }
    getDimension(dimensionId) {
        return new ExDimension(world.getDimension(dimensionId));
    }
    getEvents() {
        return this._events;
    }
    //====== interactive with clients =======
    sendMessage(clientId, useType, msg) {
        if (this.clients.has(clientId)) {
            this.clients.get(clientId).receiveMessage(new ExTransmissionMsg(useType, clientId, ExGameConfig.serverId, msg));
        }
    }
    _receiveMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.toId == ExGameConfig.serverId) {
                if (msg.type == ExGameConfig.transmissionType.runOnServer) {
                    return msg.message(this);
                }
                else if (msg.type == ExGameConfig.transmissionType.sendToServer) {
                    this.receiveMessage(msg);
                }
                else {
                    ExGameConfig.console.error("服务端：未知传输类型" + msg.type);
                }
            }
            else {
                let client;
                if (typeof (msg.toId) == "object") {
                    let clientId = this.findClientByPlayer(msg.toId);
                    if (clientId === undefined) {
                        ExGameConfig.console.error(msg.toId, "is not exists");
                        return;
                    }
                    client = this.clients.get(clientId);
                }
                else {
                    client = this.clients.get(msg.toId);
                    if (client == null) {
                        let clientId = this.findClientByName(msg.toId);
                        if (clientId == null) {
                            ExGameConfig.console.error("服务端： 未找到目标" + msg.toId);
                            return;
                        }
                        client = this.clients.get(clientId);
                    }
                }
                if (client === undefined) {
                    ExGameConfig.console.error(msg.toId, "is not exists");
                    return;
                }
                client._receiveMessage(msg);
            }
        });
    }
    receiveMessage(msg) {
    }
    getClients() {
        return this.clients.values();
    }
    getPlayers() {
        let players = [];
        for (let k of this.clients) {
            players.push(k[1].player);
        }
        return players;
    }
    findClientByName(playerName) {
        for (let k of this.clients) {
            if (k[1].playerName == playerName) {
                return k[0];
            }
        }
        return undefined;
    }
    findClientByPlayer(player) {
        for (let k of this.clients) {
            if (k[1].player == player) {
                return k[0];
            }
        }
        return undefined;
    }
    onClientJoin(event) {
        let player = event.player;
        let id = UUID.randomUUID();
        this.clients.set(id, this.newClient(id, player));
    }
    onClientLeave(event) {
        let clientId = this.findClientByName(event.playerName);
        if (clientId === undefined) {
            ExGameConfig.console.error(clientId, "is not exists");
            return;
        }
        let client = this.clients.get(clientId);
        if (client === undefined) {
            ExGameConfig.console.error(clientId, "is not exists");
            return;
        }
        client.onLeave();
        this.clients.delete(client.clientId);
    }
    newClient(id, player) {
        return new ExGameClient(this, id, player);
    }
    setTimeout(fun, timeout) {
        let time = 0;
        const method = (e) => {
            time += e.deltaTime * 1000;
            if (time > timeout) {
                this.getEvents().events.tick.unsubscribe(method);
                fun();
            }
        };
        this.getEvents().events.tick.subscribe(method);
    }
}
//# sourceMappingURL=ExGameServer.js.map