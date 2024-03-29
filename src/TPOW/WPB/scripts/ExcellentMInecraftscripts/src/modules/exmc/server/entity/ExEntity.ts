import { Entity, EntityHealthComponent, EntityInventoryComponent, Dimension, EntityVariantComponent, EntityMarkVariantComponent, EntityIsBabyComponent, EntityIsChargedComponent, EntityDamageSource, EntityDamageCause, EquipmentSlot, TeleportOptions, EffectType, EntityAttributeComponent, EntityEquippableComponent, Vector, EntityProjectileComponent, ProjectileShootOptions, EntityComponentTypeMap } from '@minecraft/server';
import { ExCommandNativeRunner } from '../../interface/ExCommandRunner.js';
import ExTagManager from '../../interface/ExTagManager.js';
import ExScoresManager from './ExScoresManager.js';
import Vector3, { IVector3 } from '../../math/Vector3.js';
import ExEntityBag from './ExEntityBag.js';
import SetTimeOutSupport from '../../interface/SetTimeOutSupport.js';
import ExCommand from '../env/ExCommand.js';
import ExDimension from '../ExDimension.js';
import Vector2, { IVector2 } from '../../math/Vector2.js';
import Matrix4 from '../../math/Matrix4.js';

export default class ExEntity implements ExCommandNativeRunner, ExTagManager {
    public command = new ExCommand(this);
    

    public damage(d: number, source?: EntityDamageSource) {
        this.entity.applyDamage(d, source)
    }
    public causeDamageTo(e: Entity | ExEntity, d: number) {
        if (e instanceof ExEntity) e = e.entity;
        e.applyDamage(d, {
            "cause": EntityDamageCause.entityAttack,
            "damagingEntity": this.entity
        })
    }

    private _damage: number | undefined;
    getPreRemoveHealth() {
        return this._damage;
    }
    removeHealth(timeout: SetTimeOutSupport, damage: number) {
        if (this._damage === undefined) {
            this._damage = damage;
            timeout.setTimeout(() => {
                if (!this.entity.isValid()) return;
                let health = this.getComponent("minecraft:health")!;
                if (health.currentValue > 0) health.setCurrentValue(Math.max(0.5, health.currentValue - (this._damage ?? 0)));
                this._damage = undefined;
            }, 0);
        } else {
            this._damage += damage;
        }
    }
    addHealth(timeout: SetTimeOutSupport, n: number) {
        this.removeHealth(timeout, -n);
    }
    private _entity: Entity;

    public get nameTag(): string {
        return this._entity.nameTag;
    }
    public set nameTag(value: string) {
        this._entity.nameTag = value;
    }

    public get entity(): Entity {
        return this._entity;
    }
    public set entity(value: Entity) {
        this._entity = value;
    }
    getVelocity() {
        return new Vector3(this._entity.getVelocity());
    }
    getHeadLocation() {
        return new Vector3(this._entity.getHeadLocation());
    }
    static propertyNameCache = "exCache";
    protected constructor(entity: Entity) {
        this._entity = entity;
        if (ExEntity.propertyNameCache in entity) {
            throw new Error("Already have a instance in entity.please use ExEntity.getInstance to get it.");
        } else {
            Reflect.set(entity, ExEntity.propertyNameCache, this);
        }
    }
    static getInstance(source: Entity): ExEntity {
        let entity = source;
        if (this.propertyNameCache in entity) {
            return Reflect.get(entity, this.propertyNameCache);
        }
        return (new ExEntity(entity));
    }
    get exDimension() {
        return ExDimension.getInstance(this.dimension);
    }
    set exDimension(ex: ExDimension) {
        this.dimension = ex.dimension;
    }

    addTag(str: string) {
        this._entity.addTag(str);
        return str;
    }
    get tags() {
        return this._entity.getTags();
    }
    getTags(): string[] {
        return this.tags;
    }
    hasTag(str: string) {
        return this._entity.hasTag(str);
    }
    removeTag(str: string) {
        this._entity.removeTag(str);
        return str;
    }
    runCommandAsync(str: string) {
        return this._entity.runCommandAsync(str);
    }

    detectAllArmor(head?: string, chest?: string, legs?: string, boots?: string) {
        const bag = this.getBag();
        return bag.equipmentOnHead?.typeId == head &&
            bag.equipmentOnChest?.typeId == chest &&
            bag.equipmentOnLegs?.typeId == legs &&
            bag.equipmentOnFeet?.typeId == boots;
    }
    detectAnyArmor(head?: string, chest?: string, legs?: string, boots?: string) {
        const bag = this.getBag();
        return bag.equipmentOnHead?.typeId == head ||
            bag.equipmentOnChest?.typeId == chest ||
            bag.equipmentOnLegs?.typeId == legs ||
            bag.equipmentOnFeet?.typeId == boots;
    }

    getScoresManager() {
        return new ExScoresManager(this._entity);
    }
    triggerEvent(name: string) {
        // console.warn(name+' trigger event');
        this._entity.triggerEvent(name);
    }

    get position() {
        return new Vector3(this.entity.location);
    }
    set position(position: Vector3) {
        this.setPosition(position);
    }
    setPosition(position: Vector3, dimension?: Dimension) {
        this.entity.teleport(position, {
            "dimension": dimension,
            "keepVelocity": true
        });
    }

    get rotation() {
        return this.entity.getRotation();
    }
    set rotation(ivec: IVector2) {
        this.teleport(this.position, {
            "keepVelocity": true,
            "rotation": ivec
        });
    }

    teleport(location: Vector3, teleportOptions?: TeleportOptions) {
        this.entity.teleport(location, teleportOptions);
    }
    tryTeleport(location: Vector3, teleportOptions?: TeleportOptions) {
        this.entity.tryTeleport(location, teleportOptions);
    }
    set dimension(dimension: Dimension) {
        this.setPosition(this.position, dimension);
    }
    get dimension() {
        return this._entity.dimension;
    }

    get viewDirection() {
        return new Vector3(this.entity.getViewDirection());
    }
    set viewDirection(ivec: Vector3) {
        this.teleport(this.position, {
            "keepVelocity": true,
            "rotation": {
                x: ivec.rotateAngleX(),
                y: ivec.rotateAngleY()
            }
        })
    }

    addEffect(eff: EffectType | string, during: number, aml: number, par: boolean = true) {
        this.entity.addEffect(eff, during, {
            "showParticles": par,
            "amplifier": aml
        });
    }
    hasComponent<T extends keyof EntityComponentTypeMap>(componentId: T): boolean {
        return this._entity.hasComponent(componentId);
    }

    getComponent<T extends keyof EntityComponentTypeMap>(componentId: T): EntityComponentTypeMap[T] | undefined {
        return this._entity.getComponent(componentId);
    }
    get health() {
        return this.getComponent("minecraft:health")!.currentValue;
    }
    set health(h: number) {
        this.getComponent("minecraft:health")!.setCurrentValue(Math.max(0, h));
    }
    getMaxHealth() {
        return this.getComponent("minecraft:health")!.defaultValue;
    }

    get movement() {
        return this.getComponent("minecraft:movement")!.currentValue;
    }
    set movement(num: number) {
        this.getComponent("minecraft:movement")?.setCurrentValue(num);
    }

    shootProj(id: string, option: ExEntityShootOption, loc = this._entity.getHeadLocation(), shoot_dir = this.viewDirection) {
        let locx = new Vector3(loc).add(0, 0, -1).add(this.viewDirection.scl(option.spawnDistance ?? 1.5));
        //这里z-1才是实际的head位置，可能是ojang的bug吧
        if (option.absPosOffset) locx.add(option.absPosOffset);
        if (option.viewPosOffset) locx.add(this.getViewVector(option.viewPosOffset));

        let proj = this.exDimension.spawnEntity(id, locx);
        if (!proj) return false;
        let proj_comp = proj.getComponent('minecraft:projectile');
        if (!proj_comp) {
            proj.remove();
            return false;
        }
        let view = new Vector3(shoot_dir);
        if (option.rotOffset) {
            view.add(this.relateRotate(option.rotOffset.x, option.rotOffset.y, false));
        }
        let shootOpt: ProjectileShootOptions = {
            uncertainty: option.uncertainty ?? 0
        }
        proj_comp.airInertia = option.airInertia ?? proj_comp.airInertia
        proj_comp.catchFireOnHurt = option.catchFireOnHurt ?? proj_comp.catchFireOnHurt
        proj_comp.critParticlesOnProjectileHurt = option.critParticlesOnProjectileHurt ?? proj_comp.critParticlesOnProjectileHurt
        proj_comp.destroyOnProjectileHurt = option.destroyOnProjectileHurt ?? proj_comp.destroyOnProjectileHurt
        proj_comp.gravity = option.gravity ?? proj_comp.gravity
        proj_comp.hitEntitySound = option.hitEntitySound ?? proj_comp.hitEntitySound
        proj_comp.hitGroundSound = option.hitGroundSound ?? proj_comp.hitGroundSound
        proj_comp.hitParticle = option.hitParticle ?? proj_comp.hitParticle
        proj_comp.lightningStrikeOnHit = option.lightningStrikeOnHit ?? proj_comp.lightningStrikeOnHit
        proj_comp.liquidInertia = option.liquidInertia ?? proj_comp.liquidInertia
        proj_comp.onFireTime = option.onFireTime ?? proj_comp.onFireTime
        proj_comp.owner = option.owner ?? this._entity;
        proj_comp.shouldBounceOnHit = option.shouldBounceOnHit ?? proj_comp.shouldBounceOnHit
        proj_comp.stopOnHit = option.stopOnHit ?? proj_comp.stopOnHit
        proj_comp.shoot(view.normalize().scl(option.speed), shootOpt);
        return true
    }

    relateRotate(x: number, y: number, take_effect = true) {
        let v_c = this._entity.getViewDirection();
        let l_0 = Math.pow(Math.pow(v_c.x, 2) + Math.pow(v_c.z, 2), 0.5);
        let phi_cur = - Math.atan(v_c.y / l_0) * 180 / Math.PI;
        let phi_ca = phi_cur + x;
        let phi = (phi_ca > 180 ? 180 : (phi_ca < -180 ? -180 : phi_ca)) * Math.PI / 180;

        v_c = new Vector3(v_c).mul(new Matrix4().rotateX(phi).rotateY(-y * Math.PI / 180));

        if (take_effect) {
            //这里有时间写个设置玩家视角
        }
        return v_c
    }

    protected getViewVectorBase() {
        let c = this._entity.getViewDirection()
        let b = Vector.cross(new Vector3(0, 1, 0), c)
        let a = Vector.cross(c, b)
        let base = [
            a, b, c
        ]
        return base
    }

    protected getViewVector(v: Vector3) {
        let base = this.getViewVectorBase()
        let x = base[0].x * v.x + base[0].y * v.y + base[0].z * v.z
        let y = base[1].x * v.x + base[1].y * v.y + base[1].z * v.z
        let z = base[2].x * v.x + base[2].y * v.y + base[2].z * v.z
        let new_v = new Vector3(x, y, z);
        return new_v
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
/**
 * 实体射击选项
 */
export interface ExEntityShootOption {
    /**
     * 不确定性
     */
    uncertainty?: number;
    /**
     * 空气惯性
     */
    airInertia?: number;
    /**
     * 受伤时着火
     */
    catchFireOnHurt?: boolean;
    /**
     * 子弹伤害时产生暴击粒子
     */
    critParticlesOnProjectileHurt?: boolean;
    /**
     * 子弹伤害时销毁
     */
    destroyOnProjectileHurt?: boolean;
    /**
     * 重力
     */
    gravity?: number;
    /**
     * 击中实体声音
     */
    hitEntitySound?: string;
    /**
     * 击中地面声音
     */
    hitGroundSound?: string;
    /**
     * 击中粒子
     */
    hitParticle?: string;
    /**
     * 击中时产生闪电
     */
    lightningStrikeOnHit?: boolean;
    /**
     * 液体惯性
     */
    liquidInertia?: number;
    /**
     * 着火时间
     */
    onFireTime?: number;
    /**
     * 所有者
     */
    owner?: Entity;
    /**
     * 是否在击中时反弹
     */
    shouldBounceOnHit?: boolean;
    /**
     * 击中时停止
     */
    stopOnHit?: boolean;
    /**
     * 速度
     */
    speed: number;
    /**
     * 绝对位置偏移
     */
    absPosOffset?: Vector3;
    /**
     * 视图位置偏移
     */
    viewPosOffset?: Vector3;
    /**
     * 旋转偏移
     */
    rotOffset?: Vector2;
    /**
     * 生成点相对视角直线位移
     */
    spawnDistance?: number;
}