import { Entity } from '@minecraft/server';
import ExGameServer from '../ExGameServer.js';
import DisposeAble from '../../interface/DisposeAble.js';
import MonitorManager from '../../utils/MonitorManager.js';
import { falseIfError } from '../../utils/tool.js';

export default class EventHandle<T> {
    private listeners!: EventListenerSettings<T>;
    server!: ExGameServer;
    constructor() {
    }
    setEventLiseners(e: EventListenerSettings<T>) {
        this.listeners = e;
    }
    init(s: ExGameServer) {
        this.server = s;
        for (let k in this.listeners) {
            this.monitorMap[k] = new Map();
        }
        for (let k in this.monitorMap) {
            let p: EventListenerSetting = (<any>this.listeners)[k];
            let registerName = k;
            if (p.name) {
                registerName = p.name;
            }
            p.pattern(registerName, k);
        }
    }
    monitorMap: { [event: string]: Map<Entity, MonitorManager<unknown[]>> } = {

    }

    subscribe(entity: Entity, name: string, callback: (args: unknown) => void) {
        let e = this.monitorMap[name];
        if (!e.has(entity)) {
            e.set(entity, new MonitorManager());
        }

        e.get(entity)?.addMonitor(callback);

    }

    unsubscribe(entity: Entity, name: string, callback: (args: unknown) => void) {
        let e = this.monitorMap[name];
        let arr = e.get(entity);
        arr?.removeMonitor(callback);
    }

    unsubscribeAll(e: Entity) {
        for (let m in this.monitorMap) {
            this.monitorMap[m].delete(e);
        }
    }

    registerToServerByEntity = (registerName: string, k: string) => {
        this.server.getEvents().register(registerName, (e: any) => {
            const name = (this.listeners as any)[k].filter?.name;
            if (name) {
                let player;
                for (let k of name.split(".")) {
                    player = player ? player[k] : e[k];
                }

                let fArr = this.monitorMap[k].get(player);
                if (fArr) {
                    fArr.trigger(e);
                }
            }
        });
    }

    registerToServerByServerEvent = (registerName: string, k: string) => {
        this.server.getEvents().register(registerName, (e: any) => {
            for (let [key, value] of this.monitorMap[k]) {
                if (falseIfError(() => key.isValid())) {
                    value.trigger(e);
                }
            }
        });
    }
}


export type EventListenerSettings<T> = {
    [P in keyof T]-?: EventListenerSetting;
}
export interface EventListenerSetting {
    pattern: (registerName: string, key: string) => void;
    name?: string;
    filter?: EventFilter;
}
export interface EventListener<T> {
    subscribe: (callback: (arg: T) => void) => void;
    unsubscribe: (callback: (arg: T) => void) => void;
}
export type EventListeners = {
    [x: string]: EventListener<any>;
};
export interface EventFilter {
    name?: string;
}

export function eventGetter<T>(lis: EventListener<T>, filter: ((e: T) => boolean)) {
    return new Promise<T>((resolve, reject) => {
        const f = (e: T) => {
            if (filter(e)) {
                lis.unsubscribe(f);
                resolve(e);
            }
        }
        lis.subscribe(f);
    });
}