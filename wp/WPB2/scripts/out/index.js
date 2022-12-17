import PomServer from "./main/server/PomServer.js";
import ExConfig from "./modules/exmc/ExConfig.js";
let config = new ExConfig();
config.addonVersion = "1.6.42x";
config.gameVersion = "1.9.50";
config.watchDog = false;
config.debug = true;
let server = new PomServer(config);
//let server = new CustomServer(config);
//# sourceMappingURL=index.js.map