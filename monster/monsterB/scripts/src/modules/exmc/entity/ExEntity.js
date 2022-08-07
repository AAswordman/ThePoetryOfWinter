import ExEntityComponentId from './ExEntityComponentId.js';
import ExScoresManager from './ExScoresManager.js';
export default class ExEntity {
    constructor(entity) {
        this._entity = entity;
    }
    get entity() {
        return this._entity;
    }
    set entity(value) {
        this._entity = value;
    }
    static getInstance(entity) {
        if (this.propertyNameCache in entity) {
            return entity[this.propertyNameCache];
        }
        return (entity[this.propertyNameCache] = new ExEntity(entity));
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
        this._entity.removeTag(str);
        return str;
    }
    runCommand(str) {
        return this._entity.runCommand(str);
    }
    getScoresManager() {
        return new ExScoresManager(this._entity);
    }
    triggerEvent(name) {
        this._entity.triggerEvent(name);
    }
    hasComponent(name) {
        return this._entity.hasComponent(name);
    }
    getComponent(name) {
        return this._entity.getComponent(name);
    }
    hasHealth() {
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
}
ExEntity.propertyNameCache = "exCache";
//# sourceMappingURL=ExEntity.js.map