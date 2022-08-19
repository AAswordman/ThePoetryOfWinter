import { Dimension, PlayerIterator } from "mojang-minecraft";
import ExGameServer from "../../modules/exmc/ExGameServer.js";
import ExTransmissionMsg from "../../modules/exmc/ExTransmissionMsg.js";
import ExCommandRunner from "../../modules/exmc/interface/ExCommandRunner.js";
import SetTimeOutSupport from "../../modules/exmc/interface/SetTimeOutSupport.js";
import PomClient from '../PomClient.js';
import ExGameConfig from '../../modules/exmc/ExGameConfig.js';

export default abstract class GameController implements ExCommandRunner,SetTimeOutSupport{
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
    public get data(){
        return this._client.data;
    }
    runCommand(str: string) {
        return ExGameConfig.runCommand(str);
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
	getPlayers(){
        return this._client.getPlayers();
    }
	abstract onJoin():void;
	abstract onLoaded():void
	abstract onLeave():void;
	getEvents(){
        return this._client.getEvents();
    }
	receiveMessage(msg: ExTransmissionMsg<any>){
        
    }
	postMessage(id: string, useType: number, msg: any){
        this._client.postMessage(id,useType,msg);
    }
	runOnServer<T>(msg: (arg: ExGameServer) => T){
        this._client.runOnServer(msg);
    }
    sayTo(str: string, p = this.player) {
		this._client.sayTo(str, p);
	}
    getLang() {
        return this._client.getLang();
    }
}