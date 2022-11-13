import CustomServer from "./demo/CustomServer.js";
import PomServer from "./main/server/PomServer.js";
import ExConfig from "./modules/exmc/ExConfig.js";

let config = new ExConfig();
config.addonVersion = "1.6.41";
config.gameVersion = "1.9.40";
config.watchDog = false;
config.debug = true;
let server = new PomServer(config);
//let server = new CustomServer(config);