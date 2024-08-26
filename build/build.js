"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar = require("chokidar");
const fs = require("fs");
const SingleFileDataSet_js_1 = require("./SingleFileDataSet.js");
const fileOper_js_1 = require("./fileOper.js");
const ROOT = "src/TPOW/WPB";
async function fileDisplay(filePath) {
    for (let f of fs.readdirSync(filePath)) {
        if (fs.statSync(filePath + "/" + f).isDirectory()) {
            await fileDisplay(filePath + "/" + f);
        }
        else {
            await compile(filePath + "/" + f);
        }
    }
}
let dataSet = new SingleFileDataSet_js_1.default("src/TPOW/WPB/scripts/ExcellentMInecraftscripts/filepack");
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
        }
        catch (e) {
        }
    })
        .on('change', function (path) { compile(transPath(path)); })
        .on('unlink', function (path) { compile(transPath(path)); })
        .on('error', function (error) { log('Error happened', error); })
        .on('ready', async function () {
        await dataSet.setCacheMode(false);
        log('Initial scan complete. Ready for changes.');
    });
});
function transPath(path) {
    return path.replace(/\\/g, "/");
}
async function compile(path) {
    // console.log("try compile  " + path);
    if (path.endsWith(".json")) {
        if (path.startsWith(ROOT + "/ex_blocks")) {
            await compileExBlock(path);
        }
    }
}
async function compileExBlock(path) {
    var _a;
    console.log("compileBlock  " + path);
    if (!fs.existsSync(path)) {
        await dataSet.remove(path);
    }
    else {
        let jsonObj = eval("(" + await (0, fileOper_js_1.readFile)(path) + ")");
        await dataSet.write(path.replace(ROOT + "/", ""), JSON.stringify(jsonObj));
        let blocks = ROOT + "/blocks";
        let targetFile = blocks + path.replace(ROOT + "/ex_blocks", "");
        let targetDir = targetFile.substring(0, targetFile.lastIndexOf("/"));
        fs.mkdirSync(targetDir, { recursive: true });
        let block = jsonObj['minecraft:block'];
        let components = block['components'];
        delete block["events"];
        let permutationsArray = ([...((_a = block['permutations']) !== null && _a !== void 0 ? _a : [])]);
        permutationsArray.push({ "components": components, "condition": "" });
        for (let obj of permutationsArray) {
            let i = obj["components"];
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
        fs.mkdirSync(blocks, { recursive: true });
        (0, fileOper_js_1.writeFile)(targetFile, JSON.stringify(jsonObj, undefined, 4));
    }
}
async function compileCommonJson(path) {
    console.log("compile  " + path);
    if (!fs.existsSync(path)) {
        await dataSet.remove(path);
    }
    else {
        await dataSet.write(path.replace(ROOT + "/", ""), eval("(" + await (0, fileOper_js_1.readFile)(path) + ")"));
    }
}
//# sourceMappingURL=build.js.map