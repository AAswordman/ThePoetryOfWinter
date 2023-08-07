import PerlinNoise from "../modules/exmc/utils/PerlinNoise.js";
const noise = new PerlinNoise(12362);
for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        console.log(20 + Math.floor(noise.noise((x) / 40, (y) / 40) * 40));
    }
}
//# sourceMappingURL=noiseTest.js.map