import * as chokidar from "chokidar"
import * as fs from 'fs';
import * as os from 'os';
import SingleFileDataSet, { JSONObject } from "./SingleFileDataSet.js";
import { readFile, writeFile } from "./fileOper.js";

const ROOT = "src/TPOW/WPB"
const GAMEROOT = "C:/Users/" + os.userInfo().username + "/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/WPB"
async function fileDisplay(filePath: string) {
    for (let f of fs.readdirSync(filePath)) {
        if (fs.statSync(filePath + "/" + f).isDirectory()) {
            await fileDisplay(filePath + "/" + f);
        } else {
            await compile(filePath + "/" + f);
        }
    }
}

let dataSet = new SingleFileDataSet("src/TPOW/WPB/scripts/ExcellentMInecraftscripts/src/filepack");
dataSet.init().then(async () => {
    await dataSet.setCacheMode(true);
    let watcher = chokidar.watch(ROOT, {
        ignored: /([\/\\]\.|scripts\/)/,
        persistent: true
    });

    let log = console.log.bind(console);

    watcher
        .on('add', function (path) {
            try {
                compile(transPath(path));
            } catch (e) {

            }
        })
        .on('change', function (path) { compile(transPath(path)); })
        .on('unlink', function (path) { compile(transPath(path)); })
        .on('error', function (error) { log('Error happened', error); })
        .on('ready', async function () {
            await dataSet.setCacheMode(false);
            log('Initial scan complete. Ready for changes.');
        })
});

function transPath(path: string) {
    return path.replace(/\\/g, "/");
}

async function compile(path: string) {
    try {
        // console.log("try compile  " + path);
        if (path.endsWith(".json")) {
            if (path.startsWith(ROOT + "/ex_blocks")) {
                await compileExBlock(path);
            } else if (path.startsWith(ROOT + "/ex_items")) {
                await compileExItem(path);
            }
        }
    } catch (e) {
        console.error(e);
        console.error("error in " + path + "\n")
    }
}
const ex = (name: string) => "ex:" + name;
const minecraft = (name: string) => "minecraft:" + name;
const fnamespace = (name: string) => name.split(":").slice(1).join(":");


async function compileExItem(path: string) {
    console.log("compileItem  " + path);
    if (!fs.existsSync(path)) {
        await dataSet.remove(path);
    } else {
        let jsonObj: JSONObject;
        try {
            jsonObj = eval("(" + await readFile(path) + ")");
        } catch (e) {
            return;
        }
        await dataSet.write(path.replace(ROOT + "/", ""), JSON.parse(JSON.stringify(jsonObj)));

        let items = GAMEROOT + "/items";
        let targetFile = items + path.replace(ROOT + "/ex_items", "");
        let targetDir = targetFile.substring(0, targetFile.lastIndexOf("/"));
        fs.mkdirSync(targetDir, { recursive: true })
        let item = jsonObj['minecraft:item'] as JSONObject;
        let format_version = jsonObj['format_version'] as string;
        if (format_version != "1.10") {
            let components = item['components'] as JSONObject;

            let category = components['minecraft:creative_category'] as JSONObject | undefined;
            let description = item['description'] as JSONObject;

            /*
            if (category) {
                delete components['minecraft:creative_category'];
                description['menu_category'] = category;
                category['group'] = category['parent'];
                delete category['parent'];
            } else {
                category = {
                }
                description['menu_category'] = category;
            }
            category['is_hidden_in_commands'] = false;
            category["category"] = description['category']

            if ('minecraft:armor' in components) {
                (components['minecraft:wearable'] as JSONObject)['protection'] = (components['minecraft:armor'] as JSONObject)['protection']
                delete components['minecraft:armor'];
            }

            delete description['category'];

            if ("minecraft:use_duration" in components) {
                components["minecraft:use_modifiers"] = {
                    "use_duration": components["minecraft:use_duration"]
                }
                delete components["minecraft:use_duration"];
            }
            delete components["minecraft:render_offsets"];

            if ("minecraft:food" in components) {
                let food = components["minecraft:food"] as JSONObject;
                if ("saturation_modifier" in food) {
                    food["saturation_modifier"] = ({
                        "low":0.5,
                        "normal":0.6,
                        "poor":0.4,
                        "good":0.8,
                        "supernatural":1.0
                    } as any)[(food as any)["saturation_modifier"]]
                }
            }
            let tag = {
                "tags": [] as string[]
            }
            for (let t of Object.keys(components)) {
                if (t.startsWith("tag:")) {
                    tag.tags.push(t.slice(4))
                    delete components[t]
                }
            }
            if (tag.tags.length > 0) components["minecraft:tags"] = tag;
            */

            if ("minecraft:food" in components) {
                let food = components["minecraft:food"] as JSONObject;
                if ("on_consume" in food) {
                    delete food["on_consume"];
                }
            }

            let i = item["components"] as JSONObject;

            if("minecraft:on_use" in i){
                if(!("minecraft:use_modifiers" in i)){
                    i["minecraft:use_modifiers"] = {
                        "use_duration": 10,
                        "movement_modifier": 0.7
                    };
                }
                delete i["minecraft:on_use"];
            }


            const custom = [] as string[];
            const list = [
                "chargeable",
                "weapon"
            ]
            for (let j of list) {
                if (minecraft(j) in i) {
                    custom.push(ex(j));
                    delete i[minecraft(j)];
                }
            }

            if (custom.length > 0) {
                i["minecraft:custom_components"] = custom;
            }

            delete item["events"];

        }
        fs.mkdirSync(items, { recursive: true })
        writeFile(targetFile, JSON.stringify(jsonObj, undefined, 4));
    }
}

async function compileExBlock(path: string) {
    console.log("compileBlock  " + path);
    if (!fs.existsSync(path)) {
        await dataSet.remove(path);
    } else {
        let jsonObj: JSONObject;
        try {
            jsonObj = eval("(" + await readFile(path) + ")");
        } catch (e) {
            return;
        }
        await dataSet.write(path.replace(ROOT + "/", ""), JSON.parse(JSON.stringify(jsonObj)));

        let blocks = GAMEROOT + "/blocks";
        let targetFile = blocks + path.replace(ROOT + "/ex_blocks", "");
        let targetDir = targetFile.substring(0, targetFile.lastIndexOf("/"));
        fs.mkdirSync(targetDir, { recursive: true })
        let block = jsonObj['minecraft:block'] as JSONObject;
        let components = block['components'] as JSONObject;
        delete block["events"];

        let permutationsArray = ([...(block['permutations'] ?? []) as JSONObject[]]);
        permutationsArray.push({ "components": components, "condition": "" });
        for (let obj of permutationsArray) {
            let i = obj["components"] as JSONObject;
            const custom = [] as string[];
            const list = [
                "on_interact",
                "on_step_on",
                "on_player_placing",
                "on_player_destroyed",
                "random_ticking"
            ]
            for (let j of list) {
                if (minecraft(j) in i) {
                    custom.push(ex(j));
                    delete i[minecraft(j)];
                }
            }

            if (minecraft("ticking") in i) {
                custom.push(ex("ticking"));
                i[minecraft("tick")] = {
                    "interval_range": ((i[minecraft("ticking")] as JSONObject).range as number[]).map(e => e * 20)
                };
                delete i[minecraft("ticking")];
            }

            if (custom.length > 0) {
                i["minecraft:custom_components"] = custom;
            }

            delete i["minecraft:breathability"];
            if ('minecraft:unit_cube' in i) {
                delete i["minecraft:unit_cube"];
                i['minecraft:geometry'] = 'minecraft:geometry.full_block';
            }
        }
        if ("minecraft:tags" in components) {
            let tags = (components["minecraft:tags"] as JSONObject).tags as string[];
            for (let i of tags) {
                components["tag:" + i] = {};
            }
            delete components["minecraft:tags"];
        }

        fs.mkdirSync(blocks, { recursive: true })
        writeFile(targetFile, JSON.stringify(jsonObj, undefined, 4));
    }
}
async function compileCommonJson(path: string) {
    console.log("compile  " + path);
    if (!fs.existsSync(path)) {
        await dataSet.remove(path);
    } else {
        await dataSet.write(path.replace(ROOT + "/", ""), eval("(" + await readFile(path) + ")"));
    }
}