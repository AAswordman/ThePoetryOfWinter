import CustomServer from "./demo/CustomServer.js";
import PomServer from "./main/PomServer.js";
import ExGameConfig from './modules/exmc/ExGameConfig.js';

ExGameConfig.addonVersion = "1.6.32";
ExGameConfig.debug = true;
let server=new PomServer();
//let server=new CustomServer();