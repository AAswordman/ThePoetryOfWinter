import "../../reflect-metadata/Reflect.js";
//模仿实现多继承 的函数方法
export default function applyMixins(derivedCtor, baseCtor) {
    //遍历父类中的所有的属性，添加到子类的属性中中
    baseCtor.forEach(baseCtor => {
        //获取遍历到的父类中的所有属性
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== "constructor") {
                //父类中的属性，添加到子类的属性中
                derivedCtor.prototype[name] = baseCtor.prototype[name];
                // const keys = Reflect.getMetadataKeys(baseCtor.prototype, name);
                // for (let key of keys) {
                //     const v = Reflect.getMetadata(key, baseCtor.prototype, name);
                //     console.warn(name + "/" + key + ": " + Reflect.getMetadata(key, baseCtor.prototype, name) + " -> " + name + "/" + key)
                //     if (v) {
                //         Reflect.defineMetadata(key, derivedCtor.prototype, name, v);
                //     }
                // }
            }
        });
    });
}
//# sourceMappingURL=applyMixins.js.map