import { Entity, EntityHealthComponent } from 'mojang-minecraft';
import ExCommandRunner from '../interface/ExCommandRunner.js';
import ExTagManager from '../interface/ExTagManager.js';
import ExEntityComponentId from './ExEntityComponentId.js';
import ExScoresManager from './ExScoresManager.js';


export default class ExEntity implements ExCommandRunner,ExTagManager {
	static propertyNameCache = "exCache";
	private _entity: Entity;
	
	public get entity(): Entity {
		return this._entity;
	}
	public set entity(value: Entity) {
		this._entity = value;
	}

	constructor(entity: Entity) {
		this._entity = entity;
	}
	static getInstance(entity: any): ExEntity {
		if (this.propertyNameCache in entity) {
			return entity[this.propertyNameCache];
		}
		return (entity[this.propertyNameCache] = new ExEntity(entity));
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
	runCommand(str: string) {
		return this._entity.runCommand(str);
	}
	getScoresManager() {
		return new ExScoresManager(this._entity);
	}
	triggerEvent(name: string) {
		this._entity.triggerEvent(name);
	}

	hasComponent(name: string) {
		return this._entity.hasComponent(name);
	}

	getComponent(name: string) {
		return this._entity.getComponent(name);
	}

	hasHealth() {
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
}