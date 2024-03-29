import { Dimension, PlayerIterator } from "@minecraft/server";
import ExGameServer from "../../../modules/exmc/server/ExGameServer.js";
import SetTimeOutSupport from "../../../modules/exmc/interface/SetTimeOutSupport.js";
import PomClient from '../PomClient.js';
import ExGameConfig from "../../../modules/exmc/server/ExGameConfig.js";
import { ExCommandNativeRunner } from "../../../modules/exmc/interface/ExCommandRunner.js";

export default abstract class GameController implements ExCommandNativeRunner,SetTimeOutSupport{
    private _client: PomClient;
    constructor(client:PomClient){
        this._client = client;
    }
    public get exPlayer(){
        return this._client.exPlayer;
    }
    public get player(){
        return this._client.player;
    }
    public get client(){
        return this._client;
    }
    public get globalSettings(){
        return this._client.globalSettings;
    }
    public get data(){
        return this._client.data;
    }
    public get globalData(){
        return this._client.getServer().data;
    }
    public get gameId(){
        return this._client.gameId;
    }
    runCommandAsync(str: string): Promise<any> {
        return ExGameConfig.runCommandAsync(str);
    }
    setTimeout(fun: () => void, timeout: number): void {
        this._client.setTimeout(fun,timeout);
    }
    getDimension(type: string | undefined = undefined){
        return this._client.getDimension(type);
    }
    getExDimension(type: string | undefined = undefined){
        return this._client.getExDimension(type);
    }
	getPlayers(){
        return this._client.getPlayers();
    }
	abstract onJoin():void;
	abstract onLoad():void
	abstract onLeave():void;
	getEvents(){
        return this._client.getEvents();
    }
    sayTo(str: string, p = this.player) {
		this._client.sayTo(str, p);
	}
    getLang() {
        return this._client.getLang();
    }
}