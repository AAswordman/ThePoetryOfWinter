import CustomServer from "./demo/CustomServer.js";
import PomServer from "./main/PomServer.js";
import ExConfig from "./modules/exmc/ExConfig.js";

let config = new ExConfig();
config.addonVersion = "1.6.33";
config.gameVersion = "1.9.30";
config.watchDog = false;

//let server=new PomServer();
let server = new CustomServer(config);