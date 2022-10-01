import { system, System } from "mojang-minecraft";
import CustomServer from "./demo/CustomServer.js";
import PomServer from "./main/PomServer.js";
import ExGameConfig from './modules/exmc/ExGameConfig.js';

ExGameConfig.addonVersion = "1.6.32";
ExGameConfig.debug = true;

system.events.beforeWatchdogTerminate.subscribe((e) => {
    e.cancel = true;
});

//let server=new PomServer();
let server = new CustomServer();