import { EntityDamageCause, Vector } from '@minecraft/server';
import ExScoresManager from './ExScoresManager.js';
import Vector3 from '../../math/Vector3.js';
import ExEntityBag from './ExEntityBag.js';
import ExCommand from '../env/ExCommand.js';
import ExDimension from '../ExDimension.js';
import Matrix4 from '../../math/Matrix4.js';
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
                var _a;
                if (!this.entity.isValid())
                    return;
                let health = this.getComponent("minecraft:health");
                if (health.currentValue > 0)
                    health.setCurrentValue(Math.max(0.5, health.currentValue - ((_a = this._damage) !== null && _a !== void 0 ? _a : 0)));
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
    getHeadLocation() {
        return new Vector3(this._entity.getHeadLocation());
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
        var _a, _b, _c, _d;
        const bag = this.getBag();
        return ((_a = bag.equipmentOnHead) === null || _a === void 0 ? void 0 : _a.typeId) == head &&
            ((_b = bag.equipmentOnChest) === null || _b === void 0 ? void 0 : _b.typeId) == chest &&
            ((_c = bag.equipmentOnLegs) === null || _c === void 0 ? void 0 : _c.typeId) == legs &&
            ((_d = bag.equipmentOnFeet) === null || _d === void 0 ? void 0 : _d.typeId) == boots;
    }
    detectAnyArmor(head, chest, legs, boots) {
        var _a, _b, _c, _d;
        const bag = this.getBag();
        return ((_a = bag.equipmentOnHead) === null || _a === void 0 ? void 0 : _a.typeId) == head ||
            ((_b = bag.equipmentOnChest) === null || _b === void 0 ? void 0 : _b.typeId) == chest ||
            ((_c = bag.equipmentOnLegs) === null || _c === void 0 ? void 0 : _c.typeId) == legs ||
            ((_d = bag.equipmentOnFeet) === null || _d === void 0 ? void 0 : _d.typeId) == boots;
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
    hasComponent(componentId) {
        return this._entity.hasComponent(componentId);
    }
    getComponent(componentId) {
        return this._entity.getComponent(componentId);
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
        var _a;
        (_a = this.getComponent("minecraft:movement")) === null || _a === void 0 ? void 0 : _a.setCurrentValue(num);
    }
    shootProj(id, option, loc = this._entity.getHeadLocation(), shoot_dir = this.viewDirection) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        let locx = new Vector3(loc).add(0, 0, -1).add(this.viewDirection.scl((_a = option.spawnDistance) !== null && _a !== void 0 ? _a : 1.5));
        //这里z-1才是实际的head位置，可能是ojang的bug吧
        if (option.absPosOffset)
            locx.add(option.absPosOffset);
        if (option.viewPosOffset)
            locx.add(this.getViewVector(option.viewPosOffset));
        let proj = this.exDimension.spawnEntity(id, locx);
        if (!proj)
            return false;
        let proj_comp = proj.getComponent('minecraft:projectile');
        if (!proj_comp) {
            proj.remove();
            return false;
        }
        let view = new Vector3(shoot_dir);
        if (option.rotOffset) {
            view.add(this.relateRotate(option.rotOffset.x, option.rotOffset.y, false));
        }
        let shootOpt = {
            uncertainty: (_b = option.uncertainty) !== null && _b !== void 0 ? _b : 0
        };
        proj_comp.airInertia = (_c = option.airInertia) !== null && _c !== void 0 ? _c : proj_comp.airInertia;
        proj_comp.catchFireOnHurt = (_d = option.catchFireOnHurt) !== null && _d !== void 0 ? _d : proj_comp.catchFireOnHurt;
        proj_comp.critParticlesOnProjectileHurt = (_e = option.critParticlesOnProjectileHurt) !== null && _e !== void 0 ? _e : proj_comp.critParticlesOnProjectileHurt;
        proj_comp.destroyOnProjectileHurt = (_f = option.destroyOnProjectileHurt) !== null && _f !== void 0 ? _f : proj_comp.destroyOnProjectileHurt;
        proj_comp.gravity = (_g = option.gravity) !== null && _g !== void 0 ? _g : proj_comp.gravity;
        proj_comp.hitEntitySound = (_h = option.hitEntitySound) !== null && _h !== void 0 ? _h : proj_comp.hitEntitySound;
        proj_comp.hitGroundSound = (_j = option.hitGroundSound) !== null && _j !== void 0 ? _j : proj_comp.hitGroundSound;
        proj_comp.hitParticle = (_k = option.hitParticle) !== null && _k !== void 0 ? _k : proj_comp.hitParticle;
        proj_comp.lightningStrikeOnHit = (_l = option.lightningStrikeOnHit) !== null && _l !== void 0 ? _l : proj_comp.lightningStrikeOnHit;
        proj_comp.liquidInertia = (_m = option.liquidInertia) !== null && _m !== void 0 ? _m : proj_comp.liquidInertia;
        proj_comp.onFireTime = (_o = option.onFireTime) !== null && _o !== void 0 ? _o : proj_comp.onFireTime;
        proj_comp.owner = (_p = option.owner) !== null && _p !== void 0 ? _p : this._entity;
        proj_comp.shouldBounceOnHit = (_q = option.shouldBounceOnHit) !== null && _q !== void 0 ? _q : proj_comp.shouldBounceOnHit;
        proj_comp.stopOnHit = (_r = option.stopOnHit) !== null && _r !== void 0 ? _r : proj_comp.stopOnHit;
        proj_comp.shoot(view.normalize().scl(option.speed), shootOpt);
        return true;
    }
    relateRotate(x, y, take_effect = true) {
        let v_c = this._entity.getViewDirection();
        let l_0 = Math.pow(Math.pow(v_c.x, 2) + Math.pow(v_c.z, 2), 0.5);
        let phi_cur = -Math.atan(v_c.y / l_0) * 180 / Math.PI;
        let phi_ca = phi_cur + x;
        let phi = (phi_ca > 180 ? 180 : (phi_ca < -180 ? -180 : phi_ca)) * Math.PI / 180;
        v_c = new Vector3(v_c).mul(new Matrix4().rotateX(phi).rotateY(-y * Math.PI / 180));
        if (take_effect) {
            //这里有时间写个设置玩家视角
        }
        return v_c;
    }
    getViewVectorBase() {
        let c = this._entity.getViewDirection();
        let b = Vector.cross(new Vector3(0, 1, 0), c);
        let a = Vector.cross(c, b);
        let base = [
            a, b, c
        ];
        return base;
    }
    getViewVector(v) {
        let base = this.getViewVectorBase();
        let x = base[0].x * v.x + base[0].y * v.y + base[0].z * v.z;
        let y = base[1].x * v.x + base[1].y * v.y + base[1].z * v.z;
        let z = base[2].x * v.x + base[2].y * v.y + base[2].z * v.z;
        let new_v = new Vector3(x, y, z);
        return new_v;
    }
    getBag() {
        return new ExEntityBag(this);
    }
    getVariant() {
        var _a, _b;
        return (_b = (_a = this.getComponent("minecraft:variant")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
    }
    getMarkVariant() {
        var _a, _b;
        return (_b = (_a = this.getComponent("minecraft:variant")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
    }
}
ExEntity.propertyNameCache = "exCache";
export default ExEntity;
//# sourceMappingURL=ExEntity.js.map