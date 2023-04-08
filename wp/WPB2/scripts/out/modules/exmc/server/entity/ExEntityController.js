var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ExEntity from "./ExEntity.js";
import { EntityHurtEvent } from '@minecraft/server';
import ExEntityEvents from "./ExEntityEvents.js";
import { eventDecoratorFactory, registerEvent } from "../events/eventDecoratorFactory.js";
export default class ExEntityController {
    constructor(e, server) {
        this._isKilled = false;
        this.isDestroyed = false;
        this._entity = e;
        this.server = server;
        this._events = new ExEntityEvents(this);
        this.init(server);
        this.onSpawn();
        eventDecoratorFactory(this.getEvents(), this);
        // console.warn("track " + e.typeId);
    }
    get entity() {
        return this._entity;
    }
    set entity(value) {
        this._entity = value;
    }
    get exEntity() {
        return this._exEntity;
    }
    set exEntity(value) {
        this._exEntity = value;
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
    init(server) {
        this.exEntity = ExEntity.getInstance(this.entity);
    }
    onSpawn() {
    }
    destroyTrigger() {
        if (!this.isDestroyed) {
            this.isDestroyed = true;
            this.onDestroy();
        }
    }
    onDestroy() {
        this.dispose();
    }
    dispose() {
        this.getEvents().cancelAll();
    }
    getEvents() {
        return this._events;
    }
    onDespawn() {
        this.onDestroy();
    }
    onKilled(e) {
        this._isKilled = true;
    }
}
__decorate([
    registerEvent("tick", (ctrl, e) => {
        if (e.currentTick % 1 === 0) {
            try {
                let dim = ctrl.entity.dimension;
                // console.warn(dim === undefined)
                return dim === undefined;
            }
            catch (o) {
                return true;
            }
        }
        return false;
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExEntityController.prototype, "destroyTrigger", null);
__decorate([
    registerEvent("onHurt", (ctrl, e) => ctrl.exEntity.getHealth() <= 0 && !ctrl._isKilled),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtEvent]),
    __metadata("design:returntype", void 0)
], ExEntityController.prototype, "onKilled", null);
//# sourceMappingURL=ExEntityController.js.map