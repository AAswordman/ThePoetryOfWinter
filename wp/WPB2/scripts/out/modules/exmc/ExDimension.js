export default class ExDimension {
    constructor(dimension) {
        this._dimension = dimension;
    }
    getPlayers(entityQueryOptions) {
        return this._dimension.getPlayers(entityQueryOptions);
    }
    getEntities(entityQueryOptions) {
        let entities = this._dimension.getEntities(entityQueryOptions);
        let res = [];
        for (let entity of entities) {
            if (entity.dimension === this._dimension)
                res.push(entity);
        }
        return res;
    }
    getBlock(vec) {
        return this._dimension.getBlock(vec.getBlockLocation());
    }
    setBlock(vec, blockId) {
        var _a;
        if (typeof blockId === "string")
            this.runCommandAsync(`setBlock ${vec.x} ${vec.y} ${vec.z} ${blockId}`);
        else
            (_a = this.getBlock(vec)) === null || _a === void 0 ? void 0 : _a.setType(blockId);
    }
    setBlockAsync(vec, blockId) {
        this.runCommandAsync(`setBlock ${vec.x} ${vec.y} ${vec.z} ${blockId}`);
    }
    digBlock(vec) {
        try {
            this.runCommand(`setBlock ${vec.x} ${vec.y} ${vec.z} air 0 destroy`);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    spawnItem(item, v) {
        this._dimension.spawnItem(item, v.getLocation());
    }
    runCommand(str) {
        return this._dimension.runCommand(str);
    }
    runCommandAsync(str) {
        return this._dimension.runCommandAsync(str).then((e) => { });
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