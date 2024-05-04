export default class ExMusic {
    constructor(manager, id) {
        this.isInDelayStop = false;
        this.soundId = id;
        // let s = time.split(":");
        // this.long = (parseInt(s[0]) * 60 + parseInt(s[1])) * 1000;
        this.manager = manager;
    }
    trackPlayers(players) {
        this.players = players.concat([]);
    }
    loop() {
        if (this.isInDelayStop) {
            this.isInDelayStop = false;
        }
        else {
            console.warn(`play ${this.soundId}`);
            if (this.players) {
                for (let p of this.players) {
                    console.warn(`play ${this.soundId} for ${p.name}`);
                    p.playMusic(this.soundId, {
                        "fade": 2,
                        "loop": true,
                        "volume": 0.5
                    });
                }
            }
        }
    }
    stop() {
        console.warn(`stop ${this.soundId}`);
        if (!this.players)
            return;
        for (let p of this.players) {
            p.playMusic("music.none10", {
                "fade": 2,
                "loop": false
            });
        }
    }
    delayStop(time) {
        this.isInDelayStop = true;
        this.manager.setTimeout(() => {
            if (this.isInDelayStop) {
                this.stop();
            }
            this.isInDelayStop = false;
        }, time);
    }
    play(dim, vec) {
        console.warn(`play ${this.soundId} at ${vec.x} ${vec.y} ${vec.z}`);
        if (!this.players) {
            this.players = [];
            for (let p of dim.getPlayers({
                maxDistance: 64,
                location: vec
            })) {
                this.players.push(p);
                p.queueMusic(this.soundId, {
                    "fade": 1,
                    "loop": false,
                    "volume": 0.5
                });
            }
        }
    }
}
//# sourceMappingURL=ExMusic.js.map