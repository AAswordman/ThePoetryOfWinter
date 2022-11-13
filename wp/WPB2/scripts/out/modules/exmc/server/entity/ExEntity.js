import ExEntityComponentId from './ExEntityComponentId.js';
import ExScoresManager from './ExScoresManager.js';
import Vector3 from '../../math/Vector3.js';
import ExEntityBag from './ExEntityBag.js';
import ExCommandSelector from '../env/ExCommandSelector.js';
export default class ExEntity {
    constructor(entity) {
        this._entity = entity;
    }
    causeDamageTo(e, d) {
        if (e instanceof ExEntity)
            e = e.entity;
        ExCommandSelector.runAsync(this, `damage {0} ${d} entity_attack entity @s`, e);
    }
    getPreRemoveHealth() {
        return this._damage;
    }
    removeHealth(timeout, damage) {
        if (this._damage === undefined) {
            this._damage = damage;
            timeout.setTimeout(() => {
                var _a;
                let health = this.getHealthComponent();
                if (health.current > 0)
                    health.setCurrent(Math.max(0, health.current - ((_a = this._damage) !== null && _a !== void 0 ? _a : 0)));
                this._damage = undefined;
            }, 0);
        }
        else {
            this._damage += damage;
        }
    }
    addHealth(timeout, n) {
        this.removeHealth(timeout, -n);
    }
    get nameTag() {
        return this._entity.nameTag;
    }
    set nameTag(value) {
        this._entity.nameTag = value;
    }
    get entity() {
        return this._entity;
    }
    set entity(value) {
        this._entity = value;
    }
    static getInstance(source) {
        let entity = source;
        if (this.propertyNameCache in entity) {
            return entity[this.propertyNameCache];
        }
        return (entity[this.propertyNameCache] = new ExEntity(entity));
    }
    getDimension() {
        return this._entity.dimension;
    }
    addTag(str) {
        this._entity.addTag(str);
        return str;
    }
    getTags() {
        return this._entity.getTags();
    }
    hasTag(str) {
        return this._entity.hasTag(str);
    }
    removeTag(str) {
        //console.warn("removeTag called"+str);
        this._entity.removeTag(str);
        return str;
    }
    runCommand(str) {
        return this._entity.runCommand(str);
    }
    runCommandAsync(str) {
        return this._entity.runCommandAsync(str);
    }
    getScoresManager() {
        return new ExScoresManager(this._entity);
    }
    triggerEvent(name) {
        this._entity.triggerEvent(name);
    }
    getPosition() {
        return new Vector3(this.entity.location);
    }
    setPosition(position, dimension = this.entity.dimension) {
        this.entity.teleport(position, dimension, this.entity.rotation.x, this.entity.rotation.y);
    }
    setDimension(dimension) {
        this.setPosition(this.getPosition(), dimension);
    }
    getViewVector() {
        return new Vector3(this.entity.viewVector);
    }
    hasComponent(name) {
        return this._entity.hasComponent(name);
    }
    getComponent(name) {
        return this._entity.getComponent(name);
    }
    hasHealthComponent() {
        return this.hasComponent(ExEntityComponentId.health);
    }
    getHealthComponent() {
        return this.getComponent(ExEntityComponentId.health);
    }
    getHealth() {
        return this.getHealthComponent().current;
    }
    getMaxHealth() {
        return this.getHealthComponent().value;
    }
    hasInventoryComponent() {
        return this.hasComponent(ExEntityComponentId.inventory);
    }
    getInventoryComponent() {
        return this.getComponent(ExEntityComponentId.inventory);
    }
    getBag() {
        return new ExEntityBag(this);
    }
}
ExEntity.propertyNameCache = "exCache";
//# sourceMappingURL=ExEntity.js.map