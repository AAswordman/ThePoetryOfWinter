import ExGameClient from "./ExGameClient.js";
import ExDimension from "./ExDimension.js";
import { world, MinecraftDimensionTypes, PlayerJoinEvent, Player, TickEvent, PlayerLeaveEvent, system } from "mojang-minecraft";
import ExGameConfig from "./ExGameConfig.js";
import initConsole from "../utils/Console.js";
import ExTransmissionMsg from "./ExTransmissionMsg.js";
import ExServerEvents from "./ExServerEvents.js";
import UUID from "../utils/UUID.js";
import ExErrorStack from './ExErrorStack.js';
import SetTimeOutSupport from "../interface/SetTimeOutSupport.js";
import ExConfig from '../ExConfig';

export default class ExGameServer implements SetTimeOutSupport {
    clients;
    _events;

    constructor(config: ExConfig) {
        ExGameConfig.config = config;

        if (!config.watchDog) {
            system.events.beforeWatchdogTerminate.subscribe((e) => {
                e.cancel = false;
            });
        }

        this.clients = new Map<string, ExGameClient>()
        ExGameConfig.console = initConsole(ExGameConfig);

        this._events = new ExServerEvents(this);
        ExErrorStack.init(this);

        this._events.events.playerJoin.subscribe(this.onClientJoin.bind(this));
        this._events.events.playerLeave.subscribe(this.onClientLeave.bind(this));
    }

    getDimension(dimensionId: string) {
        return world.getDimension(dimensionId);
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

    findClientByName(playerName: string) {
        for (let k of this.clients) {
            if (k[1].playerName == playerName) {
                return k[1];
            }
        }
        return undefined;
    }

    findClientByPlayer(player: Player) {
        for (let k of this.clients) {
            if (k[1].player == player) {
                return k[1];
            }
        }
        return undefined;
    }

    onClientJoin(event: PlayerJoinEvent) {
        let player = event.player;
        let id = UUID.randomUUID();
        this.clients.set(id, this.newClient(id, player));

    }

    onClientLeave(event: PlayerLeaveEvent) {
        let client = this.findClientByName(event.playerName);
        if (client === undefined) {
            ExGameConfig.console.error(event.playerName + "client is not exists");
            return;
        }
        client.onLeave();
        this.clients.delete(client.clientId);
    }

    newClient(id: string, player: Player): ExGameClient {
        return new ExGameClient(this, id, player);
    }

    setTimeout(fun: () => void, timeout: number) {
        let time = 0;
        let method = (e: TickEvent) => {
            time += e.deltaTime * 1000;
            if (time > timeout) {
                this.getEvents().events.tick.unsubscribe(method);
                fun();
            }
        };
        this.getEvents().events.tick.subscribe(method);
    }
}