import { world } from '@minecraft/server';
export default class WorldCache {
    constructor() {
    }
    setBoolean(name, value) {
        this.setNumber(name, value ? 1 : 0);
    }
    getBoolean(name) {
        return this.getNumber(name) === 1;
    }
    setNumber(name, value) {
        world.setDynamicProperty(name, value);
    }
    getNumber(name) {
        try {
            return world.getDynamicProperty(name);
        }
        catch (e) {
            return 0;
        }
    }
    deleteNumber(name) {
        world.removeDynamicProperty(name);
    }
}
//# sourceMappingURL=WorldCache.js.map