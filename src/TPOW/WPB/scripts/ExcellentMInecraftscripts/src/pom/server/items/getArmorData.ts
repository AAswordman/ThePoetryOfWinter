import { MinecraftBlockTypes, MinecraftItemTypes } from "../../../modules/vanilla-data/lib/index.js";

const data = {
    [MinecraftItemTypes.LeatherHelmet]: 1,
    [MinecraftItemTypes.LeatherChestplate]: 3,
    [MinecraftItemTypes.LeatherLeggings]: 2,
    [MinecraftItemTypes.LeatherBoots]: 1,
    [MinecraftItemTypes.IronHelmet]: 2,
    [MinecraftItemTypes.IronChestplate]: 6,
    [MinecraftItemTypes.IronLeggings]: 5,
    [MinecraftItemTypes.IronBoots]: 2,
    [MinecraftItemTypes.ChainmailHelmet]: 2,
    [MinecraftItemTypes.ChainmailChestplate]: 5,
    [MinecraftItemTypes.ChainmailLeggings]: 4,
    [MinecraftItemTypes.ChainmailBoots]: 1,
    [MinecraftItemTypes.GoldenHelmet]: 2,
    [MinecraftItemTypes.GoldenChestplate]: 5,
    [MinecraftItemTypes.GoldenLeggings]: 3,
    [MinecraftItemTypes.GoldenBoots]: 1,
    [MinecraftItemTypes.DiamondHelmet]: 3,
    [MinecraftItemTypes.DiamondChestplate]: 8,
    [MinecraftItemTypes.DiamondLeggings]: 6,
    [MinecraftItemTypes.DiamondBoots]: 3,
    [MinecraftItemTypes.NetheriteHelmet]: 3,
    [MinecraftItemTypes.NetheriteChestplate]: 8,
    [MinecraftItemTypes.NetheriteLeggings]: 6,
    [MinecraftItemTypes.NetheriteBoots]: 3,
    [MinecraftItemTypes.TurtleHelmet]: 2
}
export function getArmorData(id: string) {
    return (data as any)[id] as number;
}
export function hasArmorData(id: string) {
    return id in data;
}