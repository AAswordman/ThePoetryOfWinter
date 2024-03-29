import { EntityDieAfterEvent, world } from "@minecraft/server";
const func = (arg:EntityDieAfterEvent) => {
    if (arg.damageSource.damagingEntity)
        arg.damageSource.damagingEntity.runCommandAsync("say helloworld")
};
world.afterEvents.entityDie.subscribe(func);