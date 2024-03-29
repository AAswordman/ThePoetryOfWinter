import ExGameServer from "../ExGameServer.js";
import ExEntity from "./ExEntity.js";
import { Entity, EntityHurtAfterEvent, EntityRemoveAfterEvent } from '@minecraft/server';
import ExEntityEvents from "./ExEntityEvents.js";
import DisposeAble from "../../interface/DisposeAble.js";
import SetTimeOutSupport from "../../interface/SetTimeOutSupport.js";
import { eventDecoratorFactory, registerEvent } from "../events/eventDecoratorFactory.js";
import { ExEventNames, ExOtherEventNames, TickEvent } from "../events/events.js";
/**
 * 控制实体的控制器类。
 * @implements {DisposeAble}
 * @implements {SetTimeOutSupport}
 */
export default class ExEntityController implements DisposeAble, SetTimeOutSupport {
    /**
     * 服务器实例。
     * @type {ExGameServer}
     */
    server!: ExGameServer;
  
    /**
     * 实体对象。
     * @private
     * @type {Entity}
     */
    private _entity: Entity;
  
    /**
     * 实体是否已被击杀。
     * @private
     * @type {boolean}
     */
    private _isKilled: boolean = false;
  
    /**
     * 实体的唯一标识符。
     * @private
     * @type {string}
     */
    private _id: string;
  
    /**
     * 获取实体对象。
     * @type {Entity}
     */
    public get entity(): Entity {
      return this._entity;
    }
  
    /**
     * 设置实体对象。
     * @param {Entity} value - 实体对象。
     */
    public set entity(value: Entity) {
      this._entity = value;
    }
  
    /**
     * ExEntity实例。
     * @private
     * @type {ExEntity}
     */
    private _exEntity!: ExEntity;
  
    /**
     * 获取ExEntity实例。
     * @type {ExEntity}
     */
    public get exEntity(): ExEntity {
      return this._exEntity;
    }
  
    /**
     * 设置ExEntity实例。
     * @param {ExEntity} value - ExEntity实例。
     */
    public set exEntity(value: ExEntity) {
      this._exEntity = value;
    }
  
    /**
     * ExEntity事件。
     * @private
     * @type {ExEntityEvents}
     */
    _events!: ExEntityEvents;
  
    /**
     * 创建一个ExEntityController实例。
     * @param {Entity} e - 实体对象。
     * @param {ExGameServer} server - 服务器实例。
     */
    public constructor(e: Entity, server: ExGameServer) {
      this._entity = e;
      this.server = server;
      this._events = new ExEntityEvents(this);
      this._id = e.id;
      this.init(server);
      this.onSpawn();
      console.warn("track "+this._entity.typeId)
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
    setTimeout(fun: () => void, timeout: number) {
      let time = 0;
      let method = (e: TickEvent) => {
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
    init(server: ExGameServer) {
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
    @registerEvent<ExEntityController>(
      ExEventNames.afterEntityRemove,
      (ctrl, e: EntityRemoveAfterEvent) => {
        return e.removedEntityId === ctrl.getId();
      }
    )
    public destroyTrigger() {
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
     * 实体是否已被销毁。
     * @type {boolean}
     */
    isDestroyed = false;
  
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
    @registerEvent<ExEntityController>(
      ExOtherEventNames.afterOnHurt,
      (ctrl, e) => ctrl.exEntity.health <= 0 && !ctrl._isKilled
    )
    onKilled(e: EntityHurtAfterEvent) {
      this._isKilled = true;
    }
  }