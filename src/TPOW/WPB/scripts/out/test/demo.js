import { world } from "@minecraft/server";
const func = (arg) => {
    if (arg.damageSource.damagingEntity)
        arg.damageSource.damagingEntity.runCommandAsync("say helloworld");
};
world.afterEvents.entityDie.subscribe(func);
//# sourceMappingURL=demo.js.map