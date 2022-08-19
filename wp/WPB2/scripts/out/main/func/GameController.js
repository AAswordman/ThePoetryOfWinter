import ExGameConfig from '../../modules/exmc/ExGameConfig.js';
export default class GameController {
    constructor(client) {
        this._client = client;
    }
    get exPlayer() {
        return this._client.exPlayer;
    }
    get player() {
        return this._client.player;
    }
    get client() {
        return this._client;
    }
    get data() {
        return this._client.data;
    }
    runCommand(str) {
        return ExGameConfig.runCommand(str);
    }
    runCommandAsync(str) {
        return ExGameConfig.runCommandAsync(str);
    }
    setTimeout(fun, timeout) {
        this._client.setTimeout(fun, timeout);
    }
    getDimension(type = undefined) {
        return this._client.getDimension(type);
    }
    getPlayers() {
        return this._client.getPlayers();
    }
    getEvents() {
        return this._client.getEvents();
    }
    receiveMessage(msg) {
    }
    postMessage(id, useType, msg) {
        this._client.postMessage(id, useType, msg);
    }
    runOnServer(msg) {
        this._client.runOnServer(msg);
    }
    sayTo(str, p = this.player) {
        this._client.sayTo(str, p);
    }
    getLang() {
        return this._client.getLang();
    }
}
//# sourceMappingURL=GameController.js.map