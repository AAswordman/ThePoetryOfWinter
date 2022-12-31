import { world } from '@minecraft/server';

export default class WorldCache {
    constructor() {
    }
    public setBoolean(name: string, value: boolean) {
        this.setNumber(name, value ? 1 : 0);
    }
    public getBoolean(name: string) {
        return this.getNumber(name) === 1;
    }

    public setNumber(name: string, value: number): void {
        world.setDynamicProperty(name, value);
    }
    public getNumber(name: string) {
        try { return world.getDynamicProperty(name) as number; }
        catch (e) { return 0; }
    }
    public deleteNumber(name: string) {
        world.removeDynamicProperty(name);
    }
}
