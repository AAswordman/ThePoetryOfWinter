import { world, MinecraftDimensionTypes } from 'mojang-minecraft';
export default class ExGameConfig {
    static runCommand(str) {
        try {
            return world.getDimension(MinecraftDimensionTypes.overworld).runCommand(str);
        }
        catch (e) {
            console.warn("Console error:", e);
        }
    }
}
ExGameConfig.gameVersion = "1.9.10";
ExGameConfig.addonVersion = "1.5.2";
ExGameConfig.debug = true;
ExGameConfig.serverId = "Server";
ExGameConfig.transmissionType = {
    sendToServer: 0,
    sendToClient: 1,
    runOnServer: 2,
    runOnClient: 3
};
//# sourceMappingURL=ExGameConfig.js.map