export default function damageShow(dim, damage, vec) {
    damage = Math.round(Math.min(9999, damage));
    if (damage > 1000) {
        let s = damage - damage % 1000;
        dim.spawnParticle("wb:show_damage_1", vec);
        damage -= s;
    }
    if (damage > 100) {
        let s = damage - damage % 100;
        dim.spawnParticle("wb:show_damage_1", vec);
        damage -= s;
    }
    dim.spawnParticle("wb:show_damage_1", vec);
}
//# sourceMappingURL=damageShow.js.map