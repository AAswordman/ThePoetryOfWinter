import PomServer from "./pom/server/PomServer.js";
import ExConfig from "./modules/exmc/ExConfig.js";
import DecServer from "./dec/server/DecServer.js";
import ExGame from "./modules/exmc/server/ExGame.js";

let config = new ExConfig();
config.addonName = "POM";
config.addonVersion = "1.8.3R1";
config.gameVersion = "1.20.0";
config.watchDog = false;
config.debug = true;

ExGame.createServer(PomServer, config);
ExGame.createServer(DecServer, config);