import { EntityHealthComponent, EntityInventoryComponent, EntityVariantComponent, EntityMarkVariantComponent, EntityIsBabyComponent, EntityIsChargedComponent, EntityDamageCause, EntityEquipmentInventoryComponent } from '@minecraft/server';
import ExScoresManager from './ExScoresManager.js';
import Vector3 from '../../math/Vector3.js';
import ExEntityBag from './ExEntityBag.js';
import ExCommand from '../env/ExCommand.js';
import ExDimension from '../ExDimension.js';
import { EntityMovementComponent } from '@minecraft/server';
const compId = {
    [EntityIsBabyComponent.componentId]: EntityIsBabyComponent,
    [EntityMarkVariantComponent.componentId]: EntityMarkVariantComponent,
    [EntityVariantComponent.componentId]: EntityVariantComponent,
    [EntityInventoryComponent.componentId]: EntityInventoryComponent,
    [EntityEquipmentInventoryComponent.componentId]: EntityEquipmentInventoryComponent,
    [EntityIsChargedComponent.componentId]: EntityIsChargedComponent,
    [EntityMovementComponent.componentId]: EntityMovementComponent,
    [EntityHealthComponent.componentId]: EntityHealthComponent
};
class ExEntity {
    damage(d, source) {
        this.entity.applyDamage(d, source);
    }
    causeDamageTo(e, d) {
        if (e instanceof ExEntity)
            e = e.entity;
        e.applyDamage(d, {
            "cause": EntityDamageCause.entityAttack,
            "damagingEntity": this.entity
        });
    }
    getPreRemoveHealth() {
        return this._damage;
    }
    removeHealth(timeout, damage) {
        if (this._damage === undefined) {
            this._damage = damage;
            timeout.setTimeout(() => {
                if (!this.entity.isValid())
                    return;
                let health = this.getComponent("minecraft:health");
                if (health.currentValue > 0.01)
                    health.setCurrentValue(Math.max(0.5, health.currentValue - (this._damage ?? 0)));
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
    getVelocity() {
        return new Vector3(this._entity.getVelocity());
    }
    constructor(entity) {
        this.command = new ExCommand(this);
        this._entity = entity;
        if (ExEntity.propertyNameCache in entity) {
            throw new Error("Already have a instance in entity.please use ExEntity.getInstance to get it.");
        }
        else {
            Reflect.set(entity, ExEntity.propertyNameCache, this);
        }
    }
    static getInstance(source) {
        let entity = source;
        if (this.propertyNameCache in entity) {
            return Reflect.get(entity, this.propertyNameCache);
        }
        return (new ExEntity(entity));
    }
    get exDimension() {
        return ExDimension.getInstance(this.dimension);
    }
    set exDimension(ex) {
        this.dimension = ex.dimension;
    }
    addTag(str) {
        this._entity.addTag(str);
        return str;
    }
    get tags() {
        return this._entity.getTags();
    }
    getTags() {
        return this.tags;
    }
    hasTag(str) {
        return this._entity.hasTag(str);
    }
    removeTag(str) {
        this._entity.removeTag(str);
        return str;
    }
    runCommandAsync(str) {
        return this._entity.runCommandAsync(str);
    }
    detectAllArmor(head, chest, legs, boots) {
        const bag = this.getBag();
        return bag.equipmentOnHead?.typeId == head &&
            bag.equipmentOnChest?.typeId == chest &&
            bag.equipmentOnLegs?.typeId == legs &&
            bag.equipmentOnFeet?.typeId == boots;
    }
    detectAnyArmor(head, chest, legs, boots) {
        const bag = this.getBag();
        return bag.equipmentOnHead?.typeId == head ||
            bag.equipmentOnChest?.typeId == chest ||
            bag.equipmentOnLegs?.typeId == legs ||
            bag.equipmentOnFeet?.typeId == boots;
    }
    getScoresManager() {
        return new ExScoresManager(this._entity);
    }
    triggerEvent(name) {
        // console.warn(name+' trigger event');
        this._entity.triggerEvent(name);
    }
    get position() {
        return new Vector3(this.entity.location);
    }
    set position(position) {
        this.setPosition(position);
    }
    setPosition(position, dimension) {
        this.entity.teleport(position, {
            "dimension": dimension,
            "keepVelocity": true
        });
    }
    get rotation() {
        return this.entity.getRotation();
    }
    set rotation(ivec) {
        this.teleport(this.position, {
            "keepVelocity": true,
            "rotation": ivec
        });
    }
    teleport(location, teleportOptions) {
        this.entity.teleport(location, teleportOptions);
    }
    tryTeleport(location, teleportOptions) {
        this.entity.tryTeleport(location, teleportOptions);
    }
    set dimension(dimension) {
        this.setPosition(this.position, dimension);
    }
    get dimension() {
        return this._entity.dimension;
    }
    get viewDirection() {
        return new Vector3(this.entity.getViewDirection());
    }
    set viewDirection(ivec) {
        this.teleport(this.position, {
            "keepVelocity": true,
            "rotation": {
                x: ivec.rotateAngleX(),
                y: ivec.rotateAngleY()
            }
        });
    }
    addEffect(eff, during, aml, par = true) {
        this.entity.addEffect(eff, during, {
            "showParticles": par,
            "amplifier": aml
        });
    }
    hasComponent(key) {
        return this._entity.hasComponent(key);
    }
    getComponent(key) {
        return this._entity.getComponent(key);
    }
    get health() {
        return this.getComponent("minecraft:health").currentValue;
    }
    set health(h) {
        this.getComponent("minecraft:health").setCurrentValue(Math.max(0, h));
    }
    getMaxHealth() {
        return this.getComponent("minecraft:health").defaultValue;
    }
    get movement() {
        return this.getComponent("minecraft:movement").currentValue;
    }
    set movement(num) {
        this.getComponent("minecraft:movement")?.setCurrentValue(num);
    }
    getBag() {
        return new ExEntityBag(this);
    }
    getVariant() {
        return this.getComponent("minecraft:variant")?.value ?? 0;
    }
    getMarkVariant() {
        return this.getComponent("minecraft:variant")?.value ?? 0;
    }
}
ExEntity.propertyNameCache = "exCache";
export default ExEntity;
