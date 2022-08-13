export default class ExDimension {
    constructor(dimension) {
        this._dimension = dimension;
    }
    getPlayers(entityQueryOptions = undefined) {
        return this._dimension.getPlayers(entityQueryOptions);
    }
    getEntities(entityQueryOptions = undefined) {
        return this._dimension.getEntities(entityQueryOptions);
    }
    getBlock(vec) {
        return this._dimension.getBlock(vec.getBlockLocation());
    }
    setBlock(vec, blockId) {
        this.runCommand(`setBlock ${vec.x} ${vec.y} ${vec.z} ${blockId}`);
    }
    spawnItem(item, v) {
        this._dimension.spawnItem(item, v.getLocation());
    }
    runCommand(str) {
        return this._dimension.runCommand(str);
    }
    runCommandAsync(str) {
        return this._dimension.runCommandAsync(str);
    }
    static getInstance(source) {
        let dimension = source;
        if (this.propertyNameCache in dimension) {
            return dimension[this.propertyNameCache];
        }
        return (dimension[this.propertyNameCache] = new ExDimension(dimension));
    }
}
ExDimension.propertyNameCache = "exCache";
//# sourceMappingURL=ExDimension.js.map