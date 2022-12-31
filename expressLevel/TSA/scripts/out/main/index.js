import ExConfig from "../modules/exmc/ExConfig.js";
import CustomServer from "./CustomServer.js";
const config = new ExConfig();
config.debug = true;
config.watchDog = true;
const server = new CustomServer(config);
//# sourceMappingURL=index.js.map