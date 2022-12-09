import ExGameClient from "./ExGameClient.js";
import ExDimension from "./ExDimension.js";
import { world, system } from "@minecraft/server";
import ExGameConfig from "./ExGameConfig.js";
import initConsole from "../utils/Console.js";
import ExServerEvents from "./ExServerEvents.js";
import UUID from "../utils/UUID.js";
import ExErrorQueue from './ExErrorQueue.js';
import ExTickQueue from "./ExTickQueue.js";
import ExCommand from './env/ExCommand.js';
export default class ExGameServer {
    constructor(config) {
        ExGameConfig.config = config;
        if (!config.watchDog) {
            system.events.beforeWatchdogTerminate.subscribe((e) => {
                e.cancel = true;
            });
        }
        this.clients = new Map();
        this.clients_nameMap = new Map();
        ExGameConfig.console = initConsole(ExGameConfig);
        this._events = new ExServerEvents(this);
        ExErrorQueue.init(this);
        ExTickQueue.init(this);
        ExCommand.init(this);
        this._events.events.playerJoin.subscribe(this.onClientJoin.bind(this));
        this._events.events.playerLeave.subscribe(this.onClientLeave.bind(this));
    }
    getDimension(dimensionId) {
        return world.getDimension(dimensionId);
    }
    getExDimension(dimensionId) {
        return ExDimension.getInstance(this.getDimension(dimensionId));
    }
    getEvents() {
        return this._events;
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
        return this.clients_nameMap.get(playerName);
    }
    findClientByPlayer(player) {
        for (let k of this.clients) {
            if (k[1].player == player) {
                return k[1];
            }
        }
        return undefined;
    }
    onClientJoin(event) {
        let player = event.player;
        let id = UUID.randomUUID();
        let client = this.newClient(id, player);
        this.clients.set(id, client);
        this.clients_nameMap.set(player.name, client);
    }
    onClientLeave(event) {
        let client = this.findClientByName(event.playerName);
        if (client === undefined) {
            ExGameConfig.console.error(event.playerName + "client is not exists");
            return;
        }
        client.onLeave();
        this.clients.delete(client.clientId);
        this.clients_nameMap.delete(event.playerName);
    }
    newClient(id, player) {
        return new ExGameClient(this, id, player);
    }
    setTimeout(fun, timeout) {
        let time = 0;
        let method = (e) => {
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