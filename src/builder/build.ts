import * as chokidar from "chokidar"
import * as fs from 'fs';
import SingleFileDataSet, { JSONObject } from "./SingleFileDataSet.js";
import { readFile, writeFile } from "./fileOper.js";

const ROOT = "src/TPOW/WPB"

async function fileDisplay(filePath: string) {
    for (let f of fs.readdirSync(filePath)) {
        if (fs.statSync(filePath + "/" + f).isDirectory()) {
            await fileDisplay(filePath + "/" + f);
        } else {
            await compile(filePath + "/" + f);
        }
    }
}

let dataSet = new SingleFileDataSet("src/TPOW/WPB/scripts/ExcellentMInecraftscripts/filepack");
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
    // console.log("try compile  " + path);
    if (path.endsWith(".json")) {
        if (path.startsWith(ROOT + "/ex_blocks")) {
            await compileExBlock(path);
        }
    }
}

async function compileExBlock(path: string) {
    console.log("compileBlock  " + path);
    if (!fs.existsSync(path)) {
        await dataSet.remove(path);
    } else {
        let jsonObj: JSONObject = eval("(" + await readFile(path) + ")");
        await dataSet.write(path.replace(ROOT + "/", ""), JSON.stringify(jsonObj));

        let blocks = ROOT + "/blocks";
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
            delete i["minecraft:on_interact"];
            delete i["minecraft:on_step_on"];
            delete i["minecraft:on_player_placing"];
            delete i["minecraft:on_player_destroyed"];
            delete i["minecraft:random_ticking"];
            delete i["minecraft:ticking"];
            if ('minecraft:unit_cube' in i) {
                delete i["minecraft:unit_cube"];
                i['minecraft:geometry'] = 'minecraft:geometry.full_block';
            }
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