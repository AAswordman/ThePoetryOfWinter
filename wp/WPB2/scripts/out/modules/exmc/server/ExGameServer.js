var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ExGameClient from "./ExGameClient.js";
import ExDimension from "./ExDimension.js";
import { world, PlayerJoinEvent, PlayerLeaveEvent, system, EntityCreateEvent } from "@minecraft/server";
import ExGameConfig from "./ExGameConfig.js";
import initConsole from "../utils/Console.js";
import ExServerEvents from "./events/ExServerEvents.js";
import UUID from "../utils/UUID.js";
import ExErrorQueue from './ExErrorQueue.js';
import ExTickQueue from "./ExTickQueue.js";
import ExCommand from './env/ExCommand.js';
import ExClientEvents from "./events/ExClientEvents.js";
import ExEntityEvents from "./entity/ExEntityEvents.js";
import "../../reflect-metadata/Reflect.js";
import { eventDecoratorFactory, registerEvent } from "./events/EventDecoratorFactory.js";
export default class ExGameServer {
    constructor(config) {
        this.entityControllers = new Map();
        this.clients = new Map();
        this.clients_nameMap = new Map();
        this._events = new ExServerEvents(this);
        if (!ExGameServer.isInitialized) {
            ExGameServer.isInitialized = true;
            ExGameConfig.config = config;
            if (!config.watchDog) {
                system.events.beforeWatchdogTerminate.subscribe((e) => {
                    e.cancel = true;
                });
            }
            ExGameConfig.console = initConsole(ExGameConfig);
            ExErrorQueue.init(this);
            ExTickQueue.init(this);
            ExCommand.init(this);
            ExClientEvents.init(this);
            ExEntityEvents.init(this);
        }
        eventDecoratorFactory(this.getEvents(), this);
    }
    say(msg) {
        world.say(msg);
    }
    addEntityController(id, ec) {
        this.entityControllers.set(id, ec);
    }
    onEntitySpawn(e) {
        const entityConstructor = this.entityControllers.get(e.entity.typeId);
        if (entityConstructor) {
            new (entityConstructor)(e.entity, this);
        }
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
__decorate([
    registerEvent("entityCreate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityCreateEvent]),
    __metadata("design:returntype", void 0)
], ExGameServer.prototype, "onEntitySpawn", null);
__decorate([
    registerEvent("playerJoin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerJoinEvent]),
    __metadata("design:returntype", void 0)
], ExGameServer.prototype, "onClientJoin", null);
__decorate([
    registerEvent("playerLeave"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerLeaveEvent]),
    __metadata("design:returntype", void 0)
], ExGameServer.prototype, "onClientLeave", null);
//# sourceMappingURL=ExGameServer.js.map