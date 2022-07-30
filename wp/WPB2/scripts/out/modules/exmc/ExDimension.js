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
    runCommand(str) {
        return this._dimension.runCommand(str);
    }
}
//# sourceMappingURL=ExDimension.js.map