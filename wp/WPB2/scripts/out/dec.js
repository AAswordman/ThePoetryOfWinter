import DecServer from './dec/server/DecServer.js';
import ExConfig from './modules/exmc/ExConfig.js';
let config = new ExConfig();
config.addonVersion = "1.0.0";
config.gameVersion = "1.9.50";
config.watchDog = false;
config.debug = true;
let server = new DecServer(config);
//# sourceMappingURL=dec.js.map