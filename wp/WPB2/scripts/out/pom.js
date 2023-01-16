import PomServer from "./pom/server/PomServer.js";
import ExConfig from "./modules/exmc/ExConfig.js";
import DecServer from "./dec/server/DecServer.js";
let config = new ExConfig();
config.addonName = "POM";
config.addonVersion = "1.6.42x";
config.gameVersion = "1.9.50";
config.watchDog = false;
config.debug = true;
let server1 = new PomServer(config);
let server2 = new DecServer(config);
//let server = new CustomServer(config);
//# sourceMappingURL=pom.js.map