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
import { EntityHurtAfterEvent } from '@minecraft/server';
import ExEntityEvents from "./ExEntityEvents.js";
import { eventDecoratorFactory, registerEvent } from "../events/eventDecoratorFactory.js";
import { ExEventNames, ExOtherEventNames } from "../events/events.js";
/**
 * 控制实体的控制器类。
 * @implements {DisposeAble}
 * @implements {SetTimeOutSupport}
 */
export default class ExEntityController {
    /**
     * 获取实体对象。
     * @type {Entity}
     */
    get entity() {
        return this._entity;
    }
    /**
     * 设置实体对象。
     * @param {Entity} value - 实体对象。
     */
    set entity(value) {
        this._entity = value;
    }
    /**
     * 获取ExEntity实例。
     * @type {ExEntity}
     */
    get exEntity() {
        return this._exEntity;
    }
    /**
     * 设置ExEntity实例。
     * @param {ExEntity} value - ExEntity实例。
     */
    set exEntity(value) {
        this._exEntity = value;
    }
    /**
     * 创建一个ExEntityController实例。
     * @param {Entity} e - 实体对象。
     * @param {ExGameServer} server - 服务器实例。
     */
    constructor(e, server) {
        /**
         * 实体是否已被击杀。
         * @private
         * @type {boolean}
         */
        this._isKilled = false;
        /**
         * 实体是否已被销毁。
         * @type {boolean}
         */
        this.isDestroyed = false;
        this._entity = e;
        this.server = server;
        this._events = new ExEntityEvents(this);
        this._id = e.id;
        this.init(server);
        this.onSpawn();
        console.warn("track " + this._entity.typeId);
        eventDecoratorFactory(this.getEvents(), this);
    }
    /**
     * 获取实体的唯一标识符。
     * @returns {string} - 实体的唯一标识符。
     */
    getId() {
        return this._id;
    }
    /**
     * 设置一个定时器。
     * @param {Function} fun - 定时器回调函数。
     * @param {number} timeout - 定时器超时时间（毫秒）。
     */
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
    /**
     * 初始化方法。
     * @param {ExGameServer} server - 服务器实例。
     */
    init(server) {
        this.exEntity = ExEntity.getInstance(this.entity);
    }
    /**
     * 实体生成时的回调方法。
     */
    onSpawn() {
    }
    /**
     * 销毁触发器。
     */
    destroyTrigger() {
        if (!this.isDestroyed) {
            this.isDestroyed = true;
            this.onDestroy();
        }
    }
    /**
     * 销毁方法。
     */
    onDestroy() {
        this.dispose();
    }
    /**
     * 释放资源。
     */
    dispose() {
        this.getEvents().cancelAll();
    }
    /**
     * 获取事件对象。
     * @returns {ExEntityEvents} - 事件对象。
     */
    getEvents() {
        return this._events;
    }
    /**
     * 实体消失时的回调方法。
     */
    onDespawn() {
        this.onDestroy();
    }
    /**
     * 实体被击杀时的回调方法。
     * @param {EntityHurtAfterEvent} e - 实体受伤事件对象。
     */
    onKilled(e) {
        this._isKilled = true;
    }
}
__decorate([
    registerEvent(ExEventNames.afterEntityRemove, (ctrl, e) => {
        return e.removedEntityId === ctrl.getId();
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExEntityController.prototype, "destroyTrigger", null);
__decorate([
    registerEvent(ExOtherEventNames.afterOnHurt, (ctrl, e) => ctrl.exEntity.health <= 0 && !ctrl._isKilled),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtAfterEvent]),
    __metadata("design:returntype", void 0)
], ExEntityController.prototype, "onKilled", null);
//# sourceMappingURL=ExEntityController.js.map