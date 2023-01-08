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
import { eventDecoratorFactory, registerEvent } from "../events/EventDecoratorFactory.js";
export default class ExEntityController extends ExEntity {
    constructor(e, server) {
        super(e);
        this.server = server;
        this._events = new ExEntityEvents(this);
        this.onSpawn();
        eventDecoratorFactory(this.getEvents(), this);
    }
    onSpawn() {
    }
    onDespawn() {
    }
    getEvents() {
        return this._events;
    }
    onKilled(e) {
    }
}
__decorate([
    registerEvent("onHurt", (ctrl, e) => ctrl.getHealth() <= 0),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtEvent]),
    __metadata("design:returntype", void 0)
], ExEntityController.prototype, "onKilled", null);
//# sourceMappingURL=ExEntityController.js.map