var GlobalA = [
    "/storage/emulated/0/数据库/44掌握之神/冬之纪行诗/加密/WPB",
    "/storage/emulated/0/数据库/44掌握之神/冬之纪行诗/加密/WPR",
    "/storage/emulated/0/数据库/44掌握之神/冬之纪行诗/WPB",
    "/storage/emulated/0/数据库/44掌握之神/冬之纪行诗/WPR"
]

var Base64 = require('./Base64.js');
var MD5 = require('./MD5.js');

toast(MD5.hex_md5("t3",false,true));

var globalI=0;
var globalMd;

randomCopy(new File(GlobalA[2])
    .child("spawn_rules"),
    new File(GlobalA[0])
    .child("spawn_rules"));
randomCopy(new File(GlobalA[2])
    .child("recipes"),
    new File(GlobalA[0])
    .child("recipes"));
randomCopy(new File(GlobalA[2])
    .child("items"),
    new File(GlobalA[0])
    .child("items"));
randomCopy(new File(GlobalA[2])
    .child("entities"),
    new File(GlobalA[0])
    .child("entities"));
randomCopy(new File(GlobalA[2])
    .child("dialogue"),
    new File(GlobalA[0])
    .child("dialogue"));
randomCopy(new File(GlobalA[2])
    .child("blocks"),
    new File(GlobalA[0])
    .child("blocks"));
randomCopy(new File(GlobalA[2])
    .child("animations"),
    new File(GlobalA[0])
    .child("animations"));
randomCopy(new File(GlobalA[2])
    .child("animation_controllers"),
    new File(GlobalA[0])
    .child("animation_controllers"));

Copy(new File(GlobalA[2])
    .child("structures"),
    new File(GlobalA[0])
    .child("structures"));
Copy(new File(GlobalA[2])
    .child("trading"),
    new File(GlobalA[0])
    .child("trading"));
Copy(new File(GlobalA[2])
    .child("loot_tables"),
    new File(GlobalA[0])
    .child("loot_tables"));
Copy(new File(GlobalA[2])
    .child("functions"),
    new File(GlobalA[0])
    .child("functions"));
Copy(new File(GlobalA[2])
    .child("features"),
    new File(GlobalA[0])
    .child("features"));
Copy(new File(GlobalA[2])
    .child("feature_rules"),
    new File(GlobalA[0])
    .child("feature_rules"));
Copy(new File(GlobalA[2])
    .child("biomes"),
    new File(GlobalA[0])
    .child("biomes"));

new File(GlobalA[2])
    .child("pack_icon.png").copyTo(
        new File(GlobalA[0])
        .child("pack_icon.png"));
new File(GlobalA[2])
    .child("manifest.json").copyTo(
        new File(GlobalA[0])
        .child("manifest.json"));



randomCopy(new File(GlobalA[3])
    .child("animation_controllers"),
    new File(GlobalA[1])
    .child("animation_controllers"));
randomCopy(new File(GlobalA[3])
    .child("render_controllers"),
    new File(GlobalA[1])
    .child("render_controllers"));
randomCopy(new File(GlobalA[3])
    .child("particles"),
    new File(GlobalA[1])
    .child("particles"));
randomCopy(new File(GlobalA[3])
    .child("items"),
    new File(GlobalA[1])
    .child("items"));
randomCopy(new File(GlobalA[3])
    .child("entity"),
    new File(GlobalA[1])
    .child("entity"));
randomCopy(new File(GlobalA[3])
    .child("models/entity"),
    new File(GlobalA[1])
    .child("models/entity"));
randomCopy(new File(GlobalA[3])
    .child("attachables"),
    new File(GlobalA[1])
    .child("attachables"));
randomCopy(new File(GlobalA[3])
    .child("animations"),
    new File(GlobalA[1])
    .child("animations"));
Copy(new File(GlobalA[3])
    .child("ui"),
    new File(GlobalA[1])
    .child("ui"));
Copy(new File(GlobalA[3])
    .child("textures"),
    new File(GlobalA[1])
    .child("textures"));
Copy(new File(GlobalA[3])
    .child("sounds"),
    new File(GlobalA[1])
    .child("sounds"));
Copy(new File(GlobalA[3])
    .child("texts"),
    new File(GlobalA[1])
    .child("texts"));
Copy(new File(GlobalA[3])
    .child("materials"),
    new File(GlobalA[1])
    .child("materials"));
Copy(new File(GlobalA[3])
    .child("font"),
    new File(GlobalA[1])
    .child("font"));
new File(GlobalA[3])
    .child("pack_icon.png").copyTo(
        new File(GlobalA[1])
        .child("pack_icon.png"));
new File(GlobalA[3])
    .child("sounds.json").copyTo(
        new File(GlobalA[1])
        .child("sounds.json"));
new File(GlobalA[3])
    .child("biomes_client.json").copyTo(
        new File(GlobalA[1])
        .child("biomes_client.json"));
new File(GlobalA[3])
    .child("manifest.json").copyTo(
        new File(GlobalA[1])
        .child("manifest.json"));
new File(GlobalA[3])
    .child("blocks.json").copyTo(
        new File(GlobalA[1])
        .child("blocks.json"));
new File(GlobalA[3])
    .child("items_offsets_client.json").copyTo(
        new File(GlobalA[1])
        .child("items_offsets_client.json"));
//randomCopy(new File(GlobalA[2]).child("recipes"),new File(GlobalA[0]).child("recipes"));


function randomCopy(f, f2) {
    forin(f.listFile(), function(i) {
        if (i.isDir()) {
            randomCopy(i, f2);
        } else {
            let target;
            let num;
            log(i.p);
            //eval("(" + i.read() + ")");
            init(MD5.hex_md5(i.p
            .replace(GlobalA[2],"").replace(GlobalA[3],""),false,true));
            do {
                num++;
                let arr = [];
                
                for (let index = 0; index <= 5; index++) {
                    arr.push(getBlank());
                }
                arr.push(".json");
                target = f2.child(arr.join("/"));
                if (num > 30) throw "无法复制";
            } while (target.exists());

            target.mkdirs();
            if (!i.copyTo(target)) {
                throw "复制失败";
            }

        }
    });
}

function Copy(f, f2) {
    forin(f.listFile(), function(i) {
        if (i.isDir()) {
            Copy(i, f2.child(i.getName()));
        } else {
            let target = f2.child(i.getName());
            let num;

            target.mkdirs();
            if (!i.copyTo(target)) {
                throw "复制失败";
            }

        }
    });
}

function randomCopy2(f, f2) {
    forin(f.listFile(), function(i) {
        if (i.isDir()) {
            randomCopy2(i, f2);
        } else {
            let target;
            let num;
            log(i.p);
            init(MD5.hex_md5(i.p
            .replace(GlobalA[2],"").replace(GlobalA[3],""),false,true));
         
            eval("(" + i.read() + ")");

            do {
                num++;
                let arr = [];
                for (let index = 0; index <= 5; index++) {
                    arr.push(getBlank());
                }
                arr.push(".json");
                target = f2.child(arr.join(""));
                
            } while (target.exists());

            target.mkdirs();
            if (!i.copyTo(target)) {
                throw "复制失败";
            }

        }
    });
}

function forin(b, c) {
    for (i in b) {
        c(b[i])
    }
}

function init(a){
    globalI=0;
    globalMd=parseInt(a, 16).toString(4);
    
}

function getBlank() {
    //log(globalMd)
    globalI++;
    //log(parseInt(globalMd[globalI]));
    return ["\u200E", "\u200F", "\u200C", "\u200d"][parseInt(globalMd[globalI])];
}

function File(path) {
    this.p = path;
    this.read = () => {
        return files.read(this.p);
    }
    this.write = (n) => {

        files.write(this.p, n);
    }
    this.exists = () => {
        return files.exists(this.p);
    }
    this.isDir = () => {
        return files.isDir(this.p)
    }
    this.listFile = () => {
        let i = files.listDir(this.p)
        let arr = []
        for (let f in i) {
            arr.push(new File(this.p + "/" + i[f]));
        }
        return arr;
    }
    this.child = (s) => {
        return new File(this.p + "/" + s);
    }
    this.getName = () => {
        return files.getName(this.p)
    }
    this.copyTo = (f) => {
        return files.copy(this.p, f.p)
    }
    this.getParent = () => {
        return this.p.substr(0, this.p.length - 1 - this.getName().length)
    }
    this.mkdirs = () => {
        files.ensureDir(this.p)
    }
}



