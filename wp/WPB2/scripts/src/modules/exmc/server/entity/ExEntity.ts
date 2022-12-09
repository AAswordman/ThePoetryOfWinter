import { Entity, EntityHealthComponent, Vector, Location, EntityInventoryComponent, Player, Dimension } from '@minecraft/server';
import {ExCommandNativeRunner} from '../../interface/ExCommandRunner.js';
import ExTagManager from '../../interface/ExTagManager.js';
import ExEntityComponentId from './ExEntityComponentId.js';
import ExScoresManager from './ExScoresManager.js';
import Vector3 from '../../math/Vector3.js';
import ExEntityBag from './ExEntityBag.js';
import SetTimeOutSupport from '../../interface/SetTimeOutSupport.js';
import ExGameVector3 from '../math/ExGameVector3.js';
import ExCommand from '../env/ExCommand.js';


export default class ExEntity implements ExCommandNativeRunner, ExTagManager {
    public command = new ExCommand(this);

    public damage(d: number) {
        this.runCommandAsync(`damage @s ${d}`);
    }
    public causeDamageTo(e:Entity|ExEntity,d:number) {
        if(e instanceof ExEntity) e=e.entity;
        ExCommand.run(this,`damage {0} ${d} entity_attack entity @s`,e);
    }

	private _damage: number | undefined;
	getPreRemoveHealth() {
		return this._damage;
	}
	removeHealth(timeout: SetTimeOutSupport, damage: number) {
		if (this._damage === undefined) {
			this._damage = damage;
			timeout.setTimeout(() => {
				let health = this.getHealthComponent();
				if (health.current > 0) health.setCurrent(Math.max(0,health.current - (this._damage ?? 0)));
				this._damage = undefined;
			}, 0);
		} else {
			this._damage += damage;
		}
	}
	addHealth(timeout: SetTimeOutSupport, n: number) {
		this.removeHealth(timeout, -n);
	}
	static propertyNameCache = "exCache";
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

	constructor(entity: Entity) {
		this._entity = entity;
	}
	static getInstance(source: Entity): ExEntity {
		let entity = <any>source;
		if (this.propertyNameCache in entity) {
			return entity[this.propertyNameCache];
		}
		return (entity[this.propertyNameCache] = new ExEntity(entity));
	}

	getDimension() {
		return this._entity.dimension;
	}

	addTag(str: string) {
		this._entity.addTag(str);
		return str;
	}
	getTags() {
		return this._entity.getTags();
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
	getScoresManager() {
		return new ExScoresManager(this._entity);
	}
	triggerEvent(name: string) {
		this._entity.triggerEvent(name);
	}

	getPosition() {
		return new Vector3(this.entity.location);
	}


	setPosition(position: Vector3, dimension = this.entity.dimension) {
		this.entity.teleport(position, dimension, this.entity.rotation.x, this.entity.rotation.y);

	}
	setDimension(dimension: Dimension){
		this.setPosition(this.getPosition(), dimension);
	}

	getViewVector(){
		return new Vector3(this.entity.viewVector);
	}

	hasComponent(name: string) {
		return this._entity.hasComponent(name);
	}

	getComponent(name: string) {
		return this._entity.getComponent(name);
	}

	hasHealthComponent() {
		return this.hasComponent(ExEntityComponentId.health);
	}
	getHealthComponent() {
		return (<EntityHealthComponent>this.getComponent(ExEntityComponentId.health));
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
		return <EntityInventoryComponent>this.getComponent(ExEntityComponentId.inventory);
	}
	getBag() {
		return new ExEntityBag(this);
	}
}