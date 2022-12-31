import CustomServer from "./main/CustomServer.js";
import ExConfig from "./modules/exmc/ExConfig.js";

const config = new ExConfig();
config.debug = true;
config.watchDog = true;
const server = new CustomServer(config);