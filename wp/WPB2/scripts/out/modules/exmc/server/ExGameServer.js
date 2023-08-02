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
import { world, MinecraftDimensionTypes, PlayerJoinAfterEvent, PlayerLeaveAfterEvent, system, EntitySpawnAfterEvent } from "@minecraft/server";
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
import { eventDecoratorFactory, registerEvent } from "./events/eventDecoratorFactory.js";
import notUtillTask from "../utils/notUtillTask.js";
import ExSound from "./env/ExSound.js";
import { ExEventNames } from "./events/events.js";
import { falseIfError } from "../utils/tool.js";
import ExSystem from "../utils/ExSystem.js";
export default class ExGameServer {
    constructor(config) {
        this.entityControllers = new Map();
        this.playerIsInSet = new Set();
        this.clients = new Map();
        this.clients_nameMap = new Map();
        this._events = new ExServerEvents(this);
        if (!ExGameServer.isInitialized) {
            ExGameServer.isInitialized = true;
            ExGameConfig.config = config;
            ExGameServer.dimensionMap.set(MinecraftDimensionTypes.nether, world.getDimension(MinecraftDimensionTypes.nether));
            ExGameServer.dimensionMap.set(MinecraftDimensionTypes.overworld, world.getDimension(MinecraftDimensionTypes.overworld));
            ExGameServer.dimensionMap.set(MinecraftDimensionTypes.theEnd, world.getDimension(MinecraftDimensionTypes.theEnd));
            if (!config.watchDog) {
                system.beforeEvents.watchdogTerminate.subscribe((e) => {
                    e.cancel = true;
                });
            }
            ExGameConfig.console = initConsole(ExGameConfig);
            ExErrorQueue.init();
            ExTickQueue.init(this);
            ExCommand.init(this);
            ExClientEvents.init(this);
            ExEntityEvents.init(this);
        }
        for (const p of world.getAllPlayers()) {
            if (!this.playerIsInSet.has(p.name)) {
                this.onClientJoin({
                    "playerId": p.id,
                    "playerName": p.name
                });
            }
        }
        // for (const c of this.getClients()) {
        //     if (!c.isLoaded) {
        //         c.onLoad();
        //         c.isLoaded = true;
        //     }
        // }
        eventDecoratorFactory(this.getEvents(), this);
    }
    say(msg) {
        world.sendMessage(msg);
    }
    addEntityController(id, ec) {
        this.entityControllers.set(id, ec);
    }
    onEntitySpawn(e) {
        if (!falseIfError(() => (e.entity.typeId)))
            return;
        let id;
        try {
            id = e.entity.typeId;
        }
        catch (e) {
            return;
        }
        const entityConstructor = this.entityControllers.get(e.entity.typeId);
        if (entityConstructor) {
            new (entityConstructor)(e.entity, this);
        }
    }
    createEntityController(e, ec) {
        return new ec(e, this);
    }
    getDimension(dimensionId) {
        return ExGameServer.dimensionMap.get(dimensionId);
    }
    getExDimension(dimensionId) {
        return ExDimension.getInstance(this.getDimension(dimensionId));
    }
    getEvents() {
        return this._events;
    }
    getSound(id, t) {
        if (ExGameServer.musicMap.has(id)) {
            return ExGameServer.musicMap.get(id);
        }
        else {
            let m = new ExSound(this, id, t);
            ExGameServer.musicMap.set(id, m);
            return m;
        }
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
    getExPlayers() {
        let players = [];
        for (let k of this.clients) {
            players.push(k[1].exPlayer);
        }
        return players;
    }
    // getPlayers(){
    //     return 
    // }
    findClientByName(playerName) {
        return this.clients_nameMap.get(playerName);
    }
    findClientByPlayer(player) {
        for (let k of this.clients) {
            if (ExSystem.getId(k[1].player) === ExSystem.getId(player)) {
                return k[1];
            }
        }
        return undefined;
    }
    onClientJoin(event) {
        const playerName = event.playerName;
        this.playerIsInSet.add(playerName);
        notUtillTask(this, () => {
            return world.getAllPlayers().findIndex(p => p.name === playerName) !== -1;
        }, () => {
            let player = world.getAllPlayers().find(e => e.name === playerName);
            if (!player)
                throw new Error(`Player ${playerName} not found`);
            let id = UUID.randomUUID();
            let client = this.newClient(id, player);
            this.clients.set(id, client);
            this.clients_nameMap.set(player.name, client);
        });
    }
    // @registerEvent(ExEventNames.afterPlayerSpawn, (obj: ExGameServer, e: PlayerSpawnAfterEvent) => e.initialSpawn)
    // onClientLoad(e: PlayerSpawnAfterEvent) {
    //     let c = this.findClientByPlayer(e.player);
    //     if (c && !c.isLoaded) {
    //         c.onLoad();
    //         c.isLoaded = true;
    //     } else {
    //         ExGameConfig.console.error("can't load client: " + e.player.nameTag);
    //     }
    // }
    onClientLeave(event) {
        this.playerIsInSet.delete(event.playerName);
        let client = this.findClientByName(event.playerName);
        if (client === undefined) {
            ExGameConfig.console.error(event.playerName + " client is not exists");
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
                this.getEvents().exEvents.tick.unsubscribe(method);
                fun();
            }
        };
        this.getEvents().exEvents.tick.subscribe(method);
    }
}
ExGameServer.dimensionMap = new Map();
ExGameServer.musicMap = new Map();
__decorate([
    registerEvent(ExEventNames.afterEntitySpawn),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntitySpawnAfterEvent]),
    __metadata("design:returntype", void 0)
], ExGameServer.prototype, "onEntitySpawn", null);
__decorate([
    registerEvent(ExEventNames.afterPlayerJoin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerJoinAfterEvent]),
    __metadata("design:returntype", void 0)
], ExGameServer.prototype, "onClientJoin", null);
__decorate([
    registerEvent(ExEventNames.afterPlayerLeave),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerLeaveAfterEvent]),
    __metadata("design:returntype", void 0)
], ExGameServer.prototype, "onClientLeave", null);
//# sourceMappingURL=ExGameServer.js.map