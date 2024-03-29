import { IVector3 } from '../../../modules/exmc/math/Vector3.js';
import ExDimension from '../../../modules/exmc/server/ExDimension.js';
export default function damageShow(dim: ExDimension, damage: number, vec: IVector3) {
    if(damage > 20000) return;
    damage = Math.round(Math.min(9999, damage));
    if (damage > 1000) {
        let s = damage - damage % 1000;
        dim.spawnParticle("wb:show_damage_" + s, vec);
        damage -= s;
    }
    if (damage > 100) {
        let s = damage - damage % 100;
        dim.spawnParticle("wb:show_damage_" + s, vec);
        damage -= s;
    }
    dim.spawnParticle("wb:show_damage_" + damage, vec);
}