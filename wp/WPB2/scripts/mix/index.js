/*! For license information please see index.js.LICENSE.txt */
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__ from "@minecraft/server";
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_ui_f6791859__ from "@minecraft/server-ui";
var __webpack_modules__ = {
        475: (e, t, n) => {
            n.d(t, {
                Z: () => s
            });
            class s {
                constructor(e) {
                    this.val = null != e ? e : [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                }
                clone() {
                    return new s(this.val.map((e => e.map((e => e)))))
                }
                mul(e) {
                    const t = new s;
                    for (let n = 0; n < 4; n++)
                        for (let s = 0; s < 4; s++) {
                            let i = 0;
                            this.val[n].forEach(((t, n) => i += t * e.val[n][s])), t.val[n][s] = i
                        }
                    return t
                }
                add(e) {
                    const t = this.clone();
                    for (let t = 0; t < 4; t++)
                        for (let n = 0; n < 4; n++) this.val[t][n] = this.val[t][n] + e.val[t][n];
                    return t
                }
                subtract(e) {
                    const t = this.clone();
                    for (let n = 0; n < 4; n++)
                        for (let s = 0; s < 4; s++) t.val[n][s] = this.val[n][s] - e.val[n][s];
                    return t
                }
                invert() {
                    const e = this.val,
                        t = new s,
                        n = e[0][0],
                        i = e[0][1],
                        a = e[0][2],
                        r = e[0][3],
                        o = e[1][0],
                        l = e[1][1],
                        c = e[1][2],
                        u = e[1][3],
                        h = e[2][0],
                        d = e[2][1],
                        m = e[2][2],
                        p = e[2][3],
                        g = e[3][0],
                        y = e[3][1],
                        f = e[3][2],
                        w = e[3][3],
                        b = n * l - i * o,
                        v = n * c - a * o,
                        _ = n * u - r * o,
                        k = i * c - a * l,
                        E = i * u - r * l,
                        T = a * u - r * c,
                        M = h * y - d * g,
                        I = h * f - m * g,
                        x = h * w - p * g,
                        D = d * f - m * y,
                        S = d * w - p * y,
                        N = m * w - p * f,
                        A = b * N - v * S + _ * D + k * x - E * I + T * M;
                    if (0 === A) return console.error("Cannot invert a matrix with zero determinant"), this.clone();
                    const C = 1 / A;
                    return t.val[0][0] = (l * N - c * S + u * D) * C, t.val[0][1] = (a * S - i * N - r * D) * C, t.val[0][2] = (y * T - f * E + w * k) * C, t.val[0][3] = (m * E - d * T - p * k) * C, t.val[1][0] = (c * x - o * N - u * I) * C, t.val[1][1] = (n * N - a * x + r * I) * C, t.val[1][2] = (f * _ - g * T - w * v) * C, t.val[1][3] = (h * T - m * _ + p * v) * C, t.val[2][0] = (o * S - l * x + u * M) * C, t.val[2][1] = (i * x - n * S - r * M) * C, t.val[2][2] = (g * E - y * _ + w * b) * C, t.val[2][3] = (d * _ - h * E - p * b) * C, t.val[3][0] = (l * I - o * D - c * M) * C, t.val[3][1] = (n * D - i * I + a * M) * C, t.val[3][2] = (y * v - g * k - f * b) * C, t.val[3][3] = (h * k - d * v + m * b) * C, t
                }
                get(e, t) {
                    return this.val[e][t]
                }
                set(e, t, n) {
                    this.val[e][t] = n
                }
                print() {
                    console.log(this)
                }
            }
        },
        721: (e, t, n) => {
            n.d(t, {
                Z: () => i
            });
            var s = n(475);
            class i {
                constructor(e, t, n) {
                    "number" == typeof e && "number" == typeof t && "number" == typeof n ? (this.x = e, this.y = t, this.z = n) : void 0 === e && void 0 === t && void 0 === n ? (this.x = 0, this.y = 0, this.z = 0) : (this.x = e.x, this.y = e.y, this.z = e.z)
                }
                set(e, t, n) {
                    return "number" == typeof e ? "number" == typeof t && "number" == typeof n ? (this.x = e, this.y = t, this.z = n) : (this.x = e, this.y = e, this.z = e) : this.set(e.x, e.y, e.z), this
                }
                min(e, t, n) {
                    return "number" == typeof e ? "number" == typeof t && "number" == typeof n ? (this.x = Math.min(this.x, e), this.y = Math.min(this.y, t), this.z = Math.min(this.z, n)) : (this.x = Math.min(this.x, e), this.y = Math.min(this.y, e), this.z = Math.min(this.z, e)) : this.min(e.x, e.y, e.z), this
                }
                add(e, t, n) {
                    return "number" == typeof e ? "number" == typeof t && "number" == typeof n ? (this.x += e, this.y += t, this.z += n) : (this.x += e, this.y += e, this.z += e) : this.add(e.x, e.y, e.z), this
                }
                sub(e, t, n) {
                    return "number" == typeof e ? "number" == typeof t && "number" == typeof n ? (this.x -= e, this.y -= t, this.z -= n) : (this.y -= e, this.z -= e, this.x -= e) : this.sub(e.x, e.y, e.z), this
                }
                scl(e, t, n) {
                    return "number" == typeof e ? "number" == typeof t && "number" == typeof n ? (this.x *= e, this.y *= t, this.z *= n) : (this.x *= e, this.y *= e, this.z *= e) : this.scl(e.x, e.y, e.z), this
                }
                div(e, t, n) {
                    return "number" == typeof e ? "number" == typeof t && "number" == typeof n ? (this.x /= e, this.y /= t, this.z /= n) : (this.x /= e, this.y /= e, this.z /= e) : this.div(e.x, e.y, e.z), this
                }
                len() {
                    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2))
                }
                len2() {
                    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
                }
                equals(e) {
                    return this.x === e.x && this.y === e.y && this.z === e.z
                }
                distance(e) {
                    return this.clone().sub(e).len()
                }
                toString() {
                    return `(${this.x}, ${this.y}, ${this.z})`
                } [Symbol.toStringTag]() {
                    return this.toString()
                }
                floor() {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
                }
                round() {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
                }
                ceil() {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
                }
                abs() {
                    return this.x = Math.abs(this.x), this.y = Math.abs(this.y), this.z = Math.abs(this.z), this
                }
                mul(e) {
                    if (e instanceof s.Z) {
                        const t = e.val;
                        return this.set(this.x * t[0][0] + this.y * t[0][1] + this.z * t[0][2] + t[0][3], this.x * t[1][0] + this.y * t[1][1] + this.z * t[1][2] + t[1][3], this.x * t[2][0] + this.y * t[2][1] + this.z * t[2][2] + t[2][3])
                    }
                    return e.x * this.x + e.y * this.y + e.z * this.z
                }
                normalize() {
                    return this.div(this.len()), this
                }
                clone() {
                    return new i(this.x, this.y, this.z)
                }
                toArray() {
                    return [this.x, this.y, this.z]
                }
                rotateAngleY() {
                    let [e, t, n] = [this.x, this.y, this.z];
                    return 180 * Math.atan2(t, Math.sqrt(e * e + n * n)) / Math.PI
                }
                rotateAngleX() {
                    let [e, t, n] = [this.x, this.y, this.z], s = Math.atan2(e, n);
                    return s < 0 && (s += 2 * Math.PI), 180 * s / Math.PI
                }
            }
            i.down = new i(0, -1, 0), i.forward = new i(0, 0, 1), i.back = new i(0, 0, -1), i.left = new i(-1, 0, 0), i.one = new i(1, 1, 1), i.right = new i(1, 0, 0), i.up = new i(0, 1, 0), i.zero = new i(0, 0, 0)
        },
        724: (e, t, n) => {
            n.d(t, {
                Z: () => r
            });
            var s = n(205),
                i = n(662),
                a = n(960);
            class r {
                constructor(e) {
                    this.command = new a.Z(this), this._dimension = e
                }
                spawnParticle(e, t) {
                    this._dimension.spawnParticle(e, t, new s.MolangVariableMap)
                }
                createExplosion(e, t, n) {
                    this._dimension.createExplosion(e, t, n)
                }
                get dimension() {
                    return this._dimension
                }
                getPlayers(e) {
                    return Array.from(this._dimension.getPlayers(e))
                }
                getEntities(e) {
                    let t = this._dimension.getEntities(e),
                        n = [];
                    for (let e of t) e.dimension === this._dimension && n.push(e);
                    return n
                }
                getBlock(e) {
                    return this._dimension.getBlock(e)
                }
                fillBlocks(e, t, n, i) {
                    "string" == typeof n && (n = s.MinecraftBlockTypes.get(n)), this.dimension.fillBlocks(e, t, n, i)
                }
                setBlock(e, t) {
                    "string" == typeof t && (t = s.MinecraftBlockTypes.get(t));
                    let n = this.getBlock(e);
                    null == n || n.setType(t)
                }
                setBlockAsync(e, t) {
                    this.runCommandAsync(`setBlock ${e.x} ${e.y} ${e.z} ${t}`)
                }
                digBlock(e) {
                    try {
                        return this.command.run(`setBlock ${e.x} ${e.y} ${e.z} air [] destroy`), !0
                    } catch (e) {
                        return !1
                    }
                }
                spawnItem(e, t) {
                    try {
                        return this._dimension.spawnItem(e, t)
                    } catch (e) {
                        return void i.Z.console.warn(e)
                    }
                }
                spawnEntity(e, t) {
                    try {
                        return this._dimension.spawnEntity(e, t)
                    } catch (e) {
                        return void i.Z.console.warn(e)
                    }
                }
                runCommandAsync(e) {
                    return this._dimension.runCommandAsync(e)
                }
                static getInstance(e) {
                    let t = e;
                    return this.propertyNameCache in t ? t[this.propertyNameCache] : t[this.propertyNameCache] = new r(t)
                }
            }
            r.propertyNameCache = "exCache"
        },
        361: (e, t, n) => {
            n.d(t, {
                W: () => a,
                Z: () => s,
                to: () => i
            });
            class s {
                static throwError(e) {
                    this.errorStack.push(e)
                }
                static init(e) {
                    e.getEvents().exEvents.tick.subscribe((e => {
                        if (this.errorStack.length > 0) throw this.errorStack.shift()
                    }))
                }
            }

            function i(e) {
                return e.then((e => [e, void 0])).catch((e => (s.throwError(e), [void 0, e])))
            }

            function a(e) {
                try {
                    return e()
                } catch (e) {
                    return
                }
            }
            s.errorStack = []
        },
        215: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                Z: () => ExGameClient
            });
            var _ExGameConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(662),
                _events_ExClientEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(654),
                _minecraft_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(205),
                _entity_ExPlayer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(782),
                _ExDimension_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(724),
                _ui_ExActionAlert_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(217),
                _reflect_metadata_Reflect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(855),
                _reflect_metadata_Reflect_js__WEBPACK_IMPORTED_MODULE_6___default = __webpack_require__.n(_reflect_metadata_Reflect_js__WEBPACK_IMPORTED_MODULE_6__),
                _events_eventDecoratorFactory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(478),
                _utils_notUtillTask_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(632),
                __awaiter = function(e, t, n, s) {
                    return new(n || (n = Promise))((function(i, a) {
                        function r(e) {
                            try {
                                l(s.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(s.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((s = s.apply(e, t || [])).next())
                    }))
                };
            class ExGameClient {
                constructor(server, id, player) {
                    this.debuggerChatTest = e => {
                        e.message.startsWith("*/") && _ExGameConfig_js__WEBPACK_IMPORTED_MODULE_0__.Z.console.info(eval(e.message.substring(2, e.message.length)))
                    }, this._server = server, this.clientId = id, this.player = player, this.exPlayer = _entity_ExPlayer_js__WEBPACK_IMPORTED_MODULE_3__.Z.getInstance(player), this.playerName = player.name, this._events = new _events_ExClientEvents_js__WEBPACK_IMPORTED_MODULE_1__.Z(this), _ExGameConfig_js__WEBPACK_IMPORTED_MODULE_0__.Z.config.debug ? this.asDebugger() : this.notDebugger(), (0, _utils_notUtillTask_js__WEBPACK_IMPORTED_MODULE_8__.Z)(this, (() => __awaiter(this, void 0, void 0, (function*() {
                        try {
                            return yield this.exPlayer.command.run("testfor @s"), !0
                        } catch (e) {
                            return !1
                        }
                    }))), (() => this.onLoaded())), this.onJoin(), (0, _events_eventDecoratorFactory_js__WEBPACK_IMPORTED_MODULE_7__.B)(this.getEvents(), this)
                }
                debug_removeAllTag() {
                    for (let e of this.exPlayer.getTags()) this.exPlayer.removeTag(e)
                }
                debug_alert() {
                    (new _ui_ExActionAlert_js__WEBPACK_IMPORTED_MODULE_5__.Z).title("aaa").body("bbbb").button("alert", (() => {})).button("alert", (() => {})).show(this.player)
                }
                getDimension(e) {
                    return void 0 !== e ? _minecraft_server__WEBPACK_IMPORTED_MODULE_2__.world.getDimension(e) : this.exPlayer.dimension
                }
                getExDimension(e) {
                    return _ExDimension_js__WEBPACK_IMPORTED_MODULE_4__.Z.getInstance(this.getDimension(...arguments))
                }
                getPlayers() {
                    return _minecraft_server__WEBPACK_IMPORTED_MODULE_2__.world.getPlayers()
                }
                getServer() {
                    return this._server
                }
                setInterworkingPool(e) {
                    this._pool = e, this._poolCache = {};
                    for (const e in this._pool) this._poolCache[e] = this._pool[e], Object.defineProperty(this._pool, e, {
                        set: t => {
                            this._poolCache[e] = t
                        },
                        get: () => {
                            const t = this._poolCache[e];
                            return "function" == typeof t ? function() {
                                const n = {
                                    type: "pool",
                                    name: e,
                                    args: [...arguments]
                                };
                                return new Promise(((e, s) => {
                                    e(t(...n.args))
                                }))
                            } : t
                        },
                        enumerable: !0
                    })
                }
                getInterworkingPool() {
                    return this._pool
                }
                onJoin() {}
                onLoaded() {}
                onLeave() {
                    this._events.cancelAll()
                }
                getEvents() {
                    return this._events
                }
                asDebugger() {
                    this.player.addTag("debugger"), this._events.exEvents.beforeChatSend.subscribe(this.debuggerChatTest)
                }
                notDebugger() {
                    this.player.removeTag("debugger")
                }
                runMethodOnEveryClient(e) {
                    for (let t of this.getServer().getClients()) e(t)
                }
                setTimeout(e, t) {
                    let n = 0,
                        s = i => {
                            n += 1e3 * i.deltaTime, n > t && (this.getEvents().exEvents.tick.unsubscribe(s), e())
                        };
                    this.getEvents().exEvents.tick.subscribe(s)
                }
            }
        },
        662: (e, t, n) => {
            n.d(t, {
                Z: () => i
            });
            var s = n(205);
            class i {
                static runCommandAsync(e) {
                    return t = this, n = void 0, a = function*() {
                        try {
                            return s.world.getDimension(s.MinecraftDimensionTypes.overworld).runCommandAsync(e)
                        } catch (e) {
                            console.warn("Console error:", e)
                        }
                    }, new((i = void 0) || (i = Promise))((function(e, s) {
                        function r(e) {
                            try {
                                l(a.next(e))
                            } catch (e) {
                                s(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(a.throw(e))
                            } catch (e) {
                                s(e)
                            }
                        }

                        function l(t) {
                            var n;
                            t.done ? e(t.value) : (n = t.value, n instanceof i ? n : new i((function(e) {
                                e(n)
                            }))).then(r, o)
                        }
                        l((a = a.apply(t, n || [])).next())
                    }));
                    var t, n, i, a
                }
            }
        },
        703: (e, t, n) => {
            n.d(t, {
                Z: () => c
            });
            var s = n(205),
                i = n(418),
                a = n(721),
                r = n(522),
                o = n(960),
                l = n(724);
            class c {
                constructor(e) {
                    if (this.command = new o.Z(this), this._entity = e, c.propertyNameCache in e) throw new Error("Already have a instance in entity.please use ExEntity.getInstance to get it.");
                    Reflect.set(e, c.propertyNameCache, this)
                }
                damage(e, t) {
                    this.entity.applyDamage(e, t)
                }
                causeDamageTo(e, t) {
                    e instanceof c && (e = e.entity), e.applyDamage(t, {
                        cause: s.EntityDamageCause.entityAttack,
                        damagingEntity: this.entity
                    })
                }
                getPreRemoveHealth() {
                    return this._damage
                }
                removeHealth(e, t) {
                    void 0 === this._damage ? (this._damage = t, e.setTimeout((() => {
                        var e;
                        let t = this.getHealthComponent();
                        t.value > .5 && t.setCurrent(Math.max(.5, t.value - (null !== (e = this._damage) && void 0 !== e ? e : 0))), this._damage = void 0
                    }), 0)) : this._damage += t
                }
                addHealth(e, t) {
                    this.removeHealth(e, -t)
                }
                get nameTag() {
                    return this._entity.nameTag
                }
                set nameTag(e) {
                    this._entity.nameTag = e
                }
                get entity() {
                    return this._entity
                }
                set entity(e) {
                    this._entity = e
                }
                static getInstance(e) {
                    let t = e;
                    return this.propertyNameCache in t ? Reflect.get(t, this.propertyNameCache) : new c(t)
                }
                get exDimension() {
                    return l.Z.getInstance(this.dimension)
                }
                set exDimension(e) {
                    this.dimension = e.dimension
                }
                addTag(e) {
                    return this._entity.addTag(e), e
                }
                get tags() {
                    return this._entity.getTags()
                }
                getTags() {
                    return this.tags
                }
                hasTag(e) {
                    return this._entity.hasTag(e)
                }
                removeTag(e) {
                    return this._entity.removeTag(e), e
                }
                runCommandAsync(e) {
                    return this._entity.runCommandAsync(e)
                }
                detectArmor(e, t, n, i) {
                    var a, r, o, l, c, u, h, d;
                    return c = this, u = void 0, d = function*() {
                        const c = this.getBag();
                        return (null === (a = c.getEquipment(s.EquipmentSlot.head)) || void 0 === a ? void 0 : a.typeId) == e && (null === (r = c.getEquipment(s.EquipmentSlot.chest)) || void 0 === r ? void 0 : r.typeId) == t && (null === (o = c.getEquipment(s.EquipmentSlot.legs)) || void 0 === o ? void 0 : o.typeId) == n && (null === (l = c.getEquipment(s.EquipmentSlot.feet)) || void 0 === l ? void 0 : l.typeId) == i
                    }, new((h = void 0) || (h = Promise))((function(e, t) {
                        function n(e) {
                            try {
                                i(d.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function s(e) {
                            try {
                                i(d.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(t) {
                            var i;
                            t.done ? e(t.value) : (i = t.value, i instanceof h ? i : new h((function(e) {
                                e(i)
                            }))).then(n, s)
                        }
                        i((d = d.apply(c, u || [])).next())
                    }))
                }
                getScoresManager() {
                    return new i.Z(this._entity)
                }
                triggerEvent(e) {
                    this._entity.triggerEvent(e)
                }
                getPosition() {
                    return new a.Z(this.entity.location)
                }
                setPosition(e, t) {
                    this.entity.teleport(e, {
                        dimension: t,
                        keepVelocity: !0
                    })
                }
                get rotation() {
                    return this.entity.getRotation()
                }
                set rotation(e) {
                    this.teleport(this.getPosition(), {
                        keepVelocity: !0,
                        rotation: e
                    })
                }
                teleport(e, t) {
                    this.entity.teleport(e, t)
                }
                tryTeleport(e, t) {
                    this.entity.tryTeleport(e, t)
                }
                set dimension(e) {
                    this.setPosition(this.getPosition(), e)
                }
                get dimension() {
                    return this._entity.dimension
                }
                get viewDirection() {
                    return new a.Z(this.entity.getViewDirection())
                }
                set viewDirection(e) {
                    this.teleport(this.getPosition(), {
                        keepVelocity: !0,
                        rotation: {
                            x: e.rotateAngleX(),
                            y: e.rotateAngleY()
                        }
                    })
                }
                addEffect(e, t, n, s = !0) {
                    this.entity.addEffect(e, t, n, s)
                }
                hasComponent(e) {
                    return this._entity.hasComponent(e)
                }
                getComponent(e) {
                    return this._entity.getComponent(e)
                }
                hasHealthComponent() {
                    return this.hasComponent(s.EntityHealthComponent.componentId)
                }
                getHealthComponent() {
                    return this.getComponent(s.EntityHealthComponent.componentId)
                }
                get health() {
                    return this.getHealthComponent().current
                }
                set health(e) {
                    this.getHealthComponent().setCurrent(Math.max(0, e))
                }
                getMaxHealth() {
                    return this.getHealthComponent().value
                }
                getBag() {
                    return new r.Z(this)
                }
                hasVariantComponent() {
                    return this.hasComponent(s.EntityVariantComponent.componentId)
                }
                getVariantComponent() {
                    return this.getComponent(s.EntityVariantComponent.componentId)
                }
                getVariant() {
                    var e, t;
                    return null !== (t = null === (e = this.getVariantComponent()) || void 0 === e ? void 0 : e.value) && void 0 !== t ? t : 0
                }
                hasMarkVariantComponent() {
                    return this.hasComponent(s.EntityMarkVariantComponent.componentId)
                }
                getMarkVariantComponent() {
                    return this.getComponent(s.EntityMarkVariantComponent.componentId)
                }
                getMarkVariant() {
                    var e, t;
                    return null !== (t = null === (e = this.getMarkVariantComponent()) || void 0 === e ? void 0 : e.value) && void 0 !== t ? t : 0
                }
                hasIsBabyComponent() {
                    return this.hasComponent(s.EntityIsBabyComponent.componentId)
                }
                hasIsChargedComponent() {
                    return this.hasComponent(s.EntityIsChargedComponent.componentId)
                }
            }
            c.propertyNameCache = "exCache"
        },
        522: (e, t, n) => {
            n.d(t, {
                Z: () => i
            });
            var s = n(205);
            class i {
                constructor(e) {
                    this._entity = e, this.bagComponent = e.getComponent(s.EntityInventoryComponent.componentId), this.equipmentComponent = e.getComponent(s.EntityEquipmentInventoryComponent.componentId)
                }
                getItem(e) {
                    if ("number" == typeof e) return this.bagComponent.container.getItem(e);
                    let t = this.searchItem(e);
                    return -1 !== t ? this.bagComponent.container.getItem(t) : void 0
                }
                searchItem(e) {
                    let t = this.getAllItems();
                    for (let n = 0; n < t.length; n++) {
                        let s = t[n];
                        if (void 0 !== s && s.typeId === e) return n
                    }
                    return -1
                }
                getAllItems() {
                    let e = [];
                    for (let t = 0; t < this.size(); t++) e.push(this.bagComponent.container.getItem(t));
                    return e
                }
                countAllItems() {
                    var e;
                    let t = new Map;
                    for (let n = 0; n < this.size(); n++) {
                        let s = this.getItem(n);
                        s && t.set(s.typeId, s.amount + (null !== (e = t.get(s.typeId)) && void 0 !== e ? e : 0))
                    }
                    return t
                }
                clearItem(e, t) {
                    if ("string" == typeof e) {
                        let n = e,
                            s = 0;
                        for (let e = 0; e < this.size(); e++) {
                            let i = this.getItem(e);
                            if ((null == i ? void 0 : i.typeId) === n) {
                                let n = this.clearItem(e, t);
                                if (s += n, (t -= n) <= 0) break
                            }
                        }
                        return s
                    } {
                        let n = this.getItem(e);
                        return n ? t >= n.amount ? (this.setItem(e, void 0), n.amount) : (n.amount -= t, this.setItem(e, n), t) : 0
                    }
                }
                size() {
                    return this.bagComponent.inventorySize
                }
                type() {
                    return this.bagComponent.containerType
                }
                isPrivate() {
                    return this.bagComponent.private
                }
                isRestrictToOwner() {
                    return this.bagComponent.restrictToOwner
                }
                setItem(e, t) {
                    return this.bagComponent.container.setItem(e, t)
                }
                hasItem(e) {
                    return -1 !== this.searchItem(e)
                }
                addItem(e) {
                    this.bagComponent.container.addItem(e)
                }
                getSlot(e) {
                    return this.bagComponent.container.getSlot(e)
                }
                getEquipment(e) {
                    return this.equipmentComponent.getEquipment(e)
                }
                setEquipment(e, t) {
                    return this.equipmentComponent.setEquipment(e, t)
                }
                getEquipmentSlot(e) {
                    return this.equipmentComponent.getEquipmentSlot(e)
                }
            }
        },
        344: (e, t, n) => {
            n.d(t, {
                Z: () => r
            });
            var s = n(205),
                i = n(418),
                a = n(960);
            class r {
                constructor(e) {
                    this.command = new a.Z(this), this.nameTag = e
                }
                runCommandAsync(e) {
                    return s.world.getDimension(s.MinecraftDimensionTypes.overworld).runCommandAsync(e)
                }
                getScoresManager() {
                    return new i.Z(this)
                }
            }
        },
        782: (e, t, n) => {
            n.d(t, {
                Z: () => o
            });
            var s = n(205),
                i = n(703),
                a = n(522);
            class r extends a.Z {
                constructor(e) {
                    super(e), this._player = e
                }
                getItemOnHand() {
                    return this.getItem(this.getSelectedSlot())
                }
                setItemOnHand(e) {
                    return this.setItem(this.getSelectedSlot(), e)
                }
                getSelectedSlot() {
                    return this._player.selectedSlot
                }
            }
            class o extends i.Z {
                constructor(e) {
                    super(e), this.bag = new r(this), this.scoresManager = super.getScoresManager()
                }
                get entity() {
                    return super.entity
                }
                set entity(e) {
                    super.entity = e
                }
                setGameMode(e) {
                    switch (e) {
                        case s.GameMode.survival:
                            this.runCommandAsync("gamemode 0");
                            break;
                        case s.GameMode.creative:
                            this.runCommandAsync("gamemode 1");
                            break;
                        case s.GameMode.adventure:
                            this.runCommandAsync("gamemode 2");
                            break;
                        case s.GameMode.spectator:
                            this.runCommandAsync("gamemode 3")
                    }
                }
                getGameMode() {
                    var e, t, n, i;
                    let a = s.GameMode.creative;
                    return a = (null === (e = Array.from(this.dimension.getPlayers({
                        location: this.entity.location,
                        closest: 1,
                        maxDistance: 1,
                        gameMode: s.GameMode.adventure
                    }))) || void 0 === e ? void 0 : e[0]) === this.entity ? s.GameMode.adventure : a, a = (null === (t = Array.from(this.dimension.getPlayers({
                        location: this.entity.location,
                        closest: 1,
                        maxDistance: 1,
                        gameMode: s.GameMode.creative
                    }))) || void 0 === t ? void 0 : t[0]) === this.entity ? s.GameMode.creative : a, a = (null === (n = Array.from(this.dimension.getPlayers({
                        location: this.entity.location,
                        closest: 1,
                        maxDistance: 1,
                        gameMode: s.GameMode.spectator
                    }))) || void 0 === n ? void 0 : n[0]) === this.entity ? s.GameMode.spectator : a, a = (null === (i = Array.from(this.dimension.getPlayers({
                        location: this.entity.location,
                        closest: 1,
                        maxDistance: 1,
                        gameMode: s.GameMode.survival
                    }))) || void 0 === i ? void 0 : i[0]) === this.entity ? s.GameMode.survival : a, a
                }
                title(e, t) {
                    this.entity.onScreenDisplay.setTitle(e), t && this.entity.onScreenDisplay.updateSubtitle(t)
                }
                titleActionBar(e) {
                    this.entity.onScreenDisplay.setActionBar(e)
                }
                get selectedSlot() {
                    return this.entity.selectedSlot
                }
                set selectedSlot(e) {
                    this.entity.selectedSlot = e
                }
                getBag() {
                    return this.bag
                }
                static getInstance(e) {
                    let t = e;
                    return this.propertyNameCache in t ? t[this.propertyNameCache] : t[this.propertyNameCache] = new o(t)
                }
                getScoresManager() {
                    return this.scoresManager
                }
            }
        },
        418: (e, t, n) => {
            n.d(t, {
                C: () => o,
                Z: () => r
            });
            var s = n(205),
                i = n(344),
                a = n(662);
            class r {
                constructor(e) {
                    this.entity = e
                }
                getIdentity(e) {
                    if (this.entity instanceof i.Z) {
                        const t = this.entity;
                        return s.world.scoreboard.getObjective(e).getParticipants().find((e => e.displayName === t.nameTag))
                    }
                    return this.entity.scoreboardIdentity
                }
                getScore(e) {
                    let t = "string" == typeof e ? e : e.name,
                        n = this.getIdentity(t);
                    if (!n) return 0;
                    try {
                        return s.world.scoreboard.getObjective(t).getScore(n)
                    } catch (e) {
                        return 0
                    }
                }
                setScore(e, t) {
                    let n = "string" == typeof e ? e : e.name,
                        i = this.getIdentity(n);
                    return !!i && (s.world.scoreboard.getObjective(n).setScore(i, t), !0)
                }
                addScore(e, t) {
                    return this.setScore(e, this.getScore(e) + t)
                }
                removeScore(e, t) {
                    return this.setScore(e, this.getScore(e) - t)
                }
                deleteScore(e) {
                    const t = "string" == typeof e ? e : e.name,
                        n = this.getIdentity(t);
                    return !!n && (s.world.scoreboard.getObjective(t).removeParticipant(n), !0)
                }
            }
            class o {
                constructor(e) {
                    this.name = e
                }
                create(e) {
                    try {
                        s.world.scoreboard.addObjective(this.name, e)
                    } catch (e) {}
                    return this
                }
                delete() {
                    s.world.scoreboard.removeObjective(this.name)
                }
                setDisplay(e = "sidebar", t = !0) {
                    return "sidebar" == e ? a.Z.runCommandAsync(`scoreboard objectives setdisplay ${e} ${this.name} ${t?"ascending":"descending"}`) : a.Z.runCommandAsync(`scoreboard objectives setdisplay ${e} ${this.name}`), this
                }
            }
        },
        960: (e, t, n) => {
            n.d(t, {
                Z: () => l
            });
            var s = n(703),
                i = n(38),
                a = n(242);
            class r {
                constructor() {
                    this.queue = []
                }
                push(e) {
                    this.queue.push(e)
                }
                shift() {
                    return this.queue.shift()
                }
                get length() {
                    return this.queue.length
                }
            }
            var o = n(932);
            class l {
                constructor(e) {
                    this.runner = e
                }
                run(e, ...t) {
                    if ("string" == typeof e) return new Promise(((n, s) => {
                        l.queue.push([this.runner, e, t, n, s])
                    })); {
                        let n = [];
                        for (let n of e) this.run(n, ...t);
                        return n
                    }
                }
                static init(e) {
                    this.queue = new r, this.delay = o.Z.tickTask((() => {
                        let e = 0;
                        for (; l.queue.length > 0 && e < 100;) {
                            const t = l.queue.shift();
                            e++, void 0 !== t && l.run(t[0], t[1], ...t[2]).then((e => {
                                t[3](e)
                            })).catch((e => {
                                t[4](e)
                            }))
                        }
                    })).delay(1), this.delay.start()
                }
                static run(e, t, ...n) {
                    return r = this, o = void 0, c = function*() {
                        const r = [];
                        let o = yield e.runCommandAsync(0 === n.length ? t : (0, i.Z)(t, n.map((e => {
                            let t = a.Z.randomUUID();
                            return e instanceof s.Z && (e = e.entity), e.addTag(t), r.push([e, t]), `@e[tag="${t}"]`
                        }))));
                        for (let e of r) e[0].removeTag(e[1]);
                        return o
                    }, new((l = void 0) || (l = Promise))((function(e, t) {
                        function n(e) {
                            try {
                                i(c.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function s(e) {
                            try {
                                i(c.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(t) {
                            var i;
                            t.done ? e(t.value) : (i = t.value, i instanceof l ? i : new l((function(e) {
                                e(i)
                            }))).then(n, s)
                        }
                        i((c = c.apply(r, o || [])).next())
                    }));
                    var r, o, l, c
                }
            }
        },
        710: (e, t, n) => {
            n.d(t, {
                Z: () => s
            });
            class s {
                constructor() {
                    this.monitorMap = {}, this.registerToServerByEntity = (e, t) => {
                        this.server.getEvents().register(e, (e => {
                            var n;
                            const s = null === (n = this.listeners[t].filter) || void 0 === n ? void 0 : n.name;
                            if (s) {
                                let n;
                                for (let t of s.split(".")) n = n ? n[t] : e[t];
                                let i = this.monitorMap[t].get(n);
                                i && i.forEach((t => {
                                    t(e)
                                }))
                            }
                        }))
                    }, this.registerToServerByServerEvent = (e, t) => {
                        this.server.getEvents().register(e, (e => {
                            for (let [n, s] of this.monitorMap[t]) s.forEach((t => {
                                t(e)
                            }))
                        }))
                    }
                }
                setEventLiseners(e) {
                    this.listeners = e
                }
                init(e) {
                    this.server = e;
                    for (let e in this.listeners) this.monitorMap[e] = new Map;
                    for (let e in this.monitorMap) {
                        let t = this.listeners[e],
                            n = e;
                        t.name && (n = t.name), t.pattern(n, e)
                    }
                }
                subscribe(e, t, n) {
                    var s;
                    let i = this.monitorMap[t];
                    i.has(e) || i.set(e, []), null === (s = i.get(e)) || void 0 === s || s.push(n)
                }
                unsubscribe(e, t, n) {
                    let s = this.monitorMap[t].get(e);
                    if (s) {
                        let e = s.indexOf(n); - 1 !== e && s.splice(e, 1)
                    }
                }
                unsubscribeAll(e) {
                    for (let t in this.monitorMap) this.monitorMap[t].delete(e)
                }
            }
        },
        654: (e, t, n) => {
            n.d(t, {
                Z: () => o
            });
            var s, i = n(782),
                a = n(513),
                r = n(710);
            class o {
                constructor(e) {
                    this.exEvents = {
                        [a.gw.beforeItemUse]: new l(this, a.gw.beforeItemUse),
                        [a.gw.afterItemUse]: new l(this, a.gw.beforeItemUse),
                        [a.gw.afterChatSend]: new l(this, a.gw.afterChatSend),
                        [a.gw.beforeChatSend]: new l(this, a.gw.beforeChatSend),
                        [a.A.tick]: new l(this, a.A.tick),
                        [a.A.onLongTick]: new l(this, a.A.onLongTick),
                        [a.gw.afterEntityHit]: new l(this, a.gw.afterEntityHit),
                        [a.gw.afterItemUseOn]: new l(this, a.gw.afterItemUseOn),
                        [a.gw.beforeItemUseOn]: new l(this, a.gw.beforeItemUseOn),
                        [a.A.afterPlayerHitEntity]: new l(this, a.A.afterPlayerHitEntity),
                        [a.A.afterPlayerHurt]: new l(this, a.A.afterPlayerHurt),
                        [a.A.afterItemOnHandChange]: new l(this, a.A.afterItemOnHandChange),
                        [a.gw.afterBlockBreak]: new l(this, a.gw.afterBlockBreak)
                    }, this._client = e
                }
                _subscribe(e, t) {
                    o.eventHandlers.subscribe(this._client.player, e, t)
                }
                _unsubscribe(e, t) {
                    o.eventHandlers.unsubscribe(this._client.player, e, t)
                }
                cancelAll() {
                    o.eventHandlers.unsubscribeAll(this._client.player)
                }
                static init(e) {
                    this.eventHandlers.setEventLiseners(this.exEventSetting), this.eventHandlers.init(e)
                }
                register(e, t) {
                    let n = t;
                    if (e in this.exEvents) return this.exEvents[e].subscribe(n);
                    console.warn("No event registered for name " + e)
                }
                cancel(e, t) {
                    if (e in this.exEvents) return this.exEvents[e].unsubscribe(t)
                }
            }
            s = o, o.eventHandlers = new r.Z, o.exEventSetting = {
                [a.gw.beforeItemUse]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "source"
                    }
                },
                [a.gw.afterChatSend]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "sender"
                    }
                },
                [a.gw.afterChatSend]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "sender"
                    }
                },
                [a.gw.beforeChatSend]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "sender"
                    }
                },
                [a.A.tick]: {
                    pattern: o.eventHandlers.registerToServerByServerEvent
                },
                [a.A.onLongTick]: {
                    pattern: o.eventHandlers.registerToServerByServerEvent
                },
                [a.gw.afterEntityHit]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "entity"
                    }
                },
                [a.gw.afterItemUseOn]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "source"
                    }
                },
                [a.gw.beforeItemUseOn]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "source"
                    }
                },
                [a.A.afterPlayerHitEntity]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "damageSource.damagingEntity"
                    },
                    name: a.gw.afterEntityHurt
                },
                [a.A.afterPlayerHurt]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "hurtEntity"
                    },
                    name: a.gw.afterEntityHurt
                },
                [a.A.afterItemOnHandChange]: {
                    pattern: (e, t) => {
                        s.onHandItemMap = new Map, o.eventHandlers.server.getEvents().register(e, (e => {
                            for (let e of o.eventHandlers.monitorMap[t]) {
                                let t = s.onHandItemMap.get(e[0]),
                                    n = null == t ? void 0 : t[0],
                                    r = i.Z.getInstance(e[0]).getBag().getItemOnHand();
                                (null == n ? void 0 : n.typeId) === (null == r ? void 0 : r.typeId) && e[0].selectedSlot === (null == t ? void 0 : t[1]) || (e[1].forEach((t => {
                                    t(new a.aH(n, i.Z.getInstance(e[0]).getBag().getItemOnHand(), e[0]))
                                })), s.onHandItemMap.set(e[0], [r, e[0].selectedSlot]))
                            }
                        }))
                    },
                    name: a.A.onLongTick
                },
                [a.gw.afterBlockBreak]: {
                    pattern: o.eventHandlers.registerToServerByEntity,
                    filter: {
                        name: "player"
                    }
                }
            }, o.onHandItemMap = new Map, o.onceItemUseOnMap = new Map;
            class l {
                constructor(e, t) {
                    this.subscribe = n => {
                        e._subscribe(t, n)
                    }, this.unsubscribe = n => {
                        e._unsubscribe(t, n)
                    }
                }
            }
        },
        478: (e, t, n) => {
            n.d(t, {
                B: () => i,
                K: () => a
            });
            var s = n(932);

            function i(e, t) {
                for (let n of s.Z.keys(t)) {
                    const s = Reflect.getMetadata("eventName", t, n);
                    if (s) {
                        const i = Reflect.getMetadata("eventCondition", t, n);
                        i ? e.register(s, (e => {
                            i(t, e) && t[n].call(t, e)
                        })) : e.register(s, t[n].bind(t))
                    }
                }
            }

            function a(e, t) {
                return function(n, s, i) {
                    Reflect.defineMetadata("eventName", e, n, s), Reflect.defineMetadata("eventCondition", t, n, s)
                }
            }
        },
        513: (e, t, n) => {
            n.d(t, {
                A: () => o,
                aH: () => i,
                gw: () => r
            });
            var s = n(205);
            class i {
                constructor(e, t, n) {
                    this.beforeItem = e, this.afterItem = t, this.source = n
                }
            }
            let a = {};
            for (let e in s.world.afterEvents) a[`after${e[0].toUpperCase()}${e.slice(1)}`] = `after${e[0].toUpperCase()}${e.slice(1)}`;
            for (let e in s.world.beforeEvents) a[`before${e[0].toUpperCase()}${e.slice(1)}`] = `before${e[0].toUpperCase()}${e.slice(1)}`;
            let r = a,
                o = {
                    tick: "tick",
                    onLongTick: "onLongTick",
                    afterPlayerHurt: "afterPlayerHurt",
                    afterPlayerHitEntity: "afterPlayerHitEntity",
                    afterItemOnHandChange: "afterItemOnHandChange",
                    afterEntityHit: "afterEntityHit",
                    afterOnHitEntity: "afterOnHitEntity",
                    afterOnHurt: "afterOnHurt"
                }
        },
        217: (e, t, n) => {
            n.d(t, {
                Z: () => a
            });
            var s = n(985),
                i = n(361);
            class a {
                constructor() {
                    this._alert = new s.ActionFormData, this.buttonEvent = []
                }
                body(e) {
                    return this._alert.body(e), this
                }
                button(e, t, n) {
                    return this._alert.button(e, n), this.buttonEvent.push(t), this
                }
                show(e) {
                    return this._alert.show(e).then((e => {
                        e.canceled || void 0 === e.selection || this.buttonEvent[e.selection]()
                    })).catch((e => i.Z.throwError(e))), this
                }
                title(e) {
                    return this._alert.title(e), this
                }
            }
        },
        932: (e, t, n) => {
            n.d(t, {
                Z: () => r
            });
            var s = n(205);
            class i {
                constructor(e) {
                    this.time = 20, this.looper = e
                }
                getDelay() {
                    return this.time
                }
                delay(e) {
                    if (this.isStarted()) throw new Error("TickDelayTask already started");
                    return this.time = e, this
                }
                isStarted() {
                    return void 0 !== this.func
                }
                startOnce() {
                    this.isStarted() || (this.func = () => {
                        this.looper()
                    }, this.id = s.system.runTimeout(this.func, this.time))
                }
                start() {
                    this.isStarted() || (this.func = () => {
                        this.looper()
                    }, this.id = s.system.runInterval(this.func, this.time))
                }
                stop() {
                    if (this.func) {
                        if (!this.id) throw new Error("error id is required");
                        s.system.clearRun(this.id), this.func = void 0
                    }
                }
            }
            var a = n(647);
            class r {
                static getId(e) {
                    return this.idMap.has(e) || this.idMap.set(e, Math.floor(Math.random() * a.Z.MAX_VALUE)), this.idMap.get(e)
                }
                static hasChineseCharacter(e) {
                    return this.chineseCharMatcher.test(e)
                }
                static keys(e) {
                    const t = Reflect.ownKeys(e);
                    let n = e.__proto__;
                    for (; n;) {
                        for (let e of Reflect.ownKeys(n)) t.push(e);
                        n = n.__proto__
                    }
                    return t
                }
                static parseObj(e) {
                    let t = r.keys(e),
                        n = "{\n";
                    for (const s of t) {
                        const t = e[s];
                        null === t && (n += `${String(s)}: null\n`), n += "object" != typeof t ? `${String(s)}: ${t}\n` : `${String(s)}: {...}\n`
                    }
                    return n + "}"
                }
                static isServer() {
                    return !0
                }
                static tickTask(e) {
                    return this.isServer(), new i(e)
                }
            }
            r.idMap = new Map, r.chineseCharMatcher = /([\u4E00-\u9FA5])+/
        },
        647: (e, t, n) => {
            n.d(t, {
                Z: () => s
            });
            class s {
                constructor(e) {
                    this.seed = (e || Date.now()) % 999999999
                }
                next() {
                    return this.seed = (9301 * this.seed + 49297) % 233280, this.seed / 233280
                }
                nextDouble() {
                    return this.next()
                }
                nextLong() {
                    return Math.floor(this.nextDouble() * s.MAX_VALUE)
                }
                nextInt(e = s.MAX_VALUE) {
                    return Math.floor(this.nextDouble() * e)
                }
                nextBoolean() {
                    return this.nextDouble() >= .5
                }
                static choice(e) {
                    if (e instanceof Array) {
                        if (0 === e.length) throw new Error("array mustnot be empty");
                        return e[Math.floor(Math.random() * e.length)]
                    } {
                        let t = [];
                        for (let n in e) t.push(n);
                        return e[s.choice(t)]
                    }
                }
            }
            s.MAX_VALUE = ~(1 << 31), s.MIN_VALUE = 1 << 31
        },
        242: (e, t, n) => {
            n.d(t, {
                Z: () => s
            });
            class s {
                static randomUUID() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                        var t = 16 * Math.random() | 0;
                        return ("x" == e ? t : 3 & t | 8).toString(16)
                    }))
                }
            }
        },
        342: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            function encodeUnicode(e) {
                let t = [];
                for (var n = 0; n < e.length; n++) t[n] = ("00" + e.charCodeAt(n).toString(16)).slice(-4);
                return "\\u" + t.join("\\u")
            }

            function decodeUnicode(str) {
                return eval('{"' + str + '"}')
            }
            __webpack_require__.d(__webpack_exports__, {
                L: () => decodeUnicode
            })
        },
        38: (e, t, n) => {
            function s(e, ...t) {
                var n = e;
                for (let e in t) n = n.replace("{" + e + "}", t[e] + "");
                return n
            }
            n.d(t, {
                Z: () => s
            })
        },
        437: () => {
            Array.prototype.clear = function() {
                this.splice(0, this.length)
            }
        },
        632: (e, t, n) => {
            n.d(t, {
                Z: () => i
            });
            var s = n(361);

            function i(e, t, n, i = 1e3, a = 60) {
                let r = () => {
                    return o = this, l = void 0, u = function*() {
                        try {
                            let s = t();
                            s instanceof Promise && (s = yield s), s ? n() : a > 0 && (a--, e.setTimeout(r, i))
                        } catch (e) {
                            s.Z.throwError(e)
                        }
                    }, new((c = void 0) || (c = Promise))((function(e, t) {
                        function n(e) {
                            try {
                                i(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function s(e) {
                            try {
                                i(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function i(t) {
                            var i;
                            t.done ? e(t.value) : (i = t.value, i instanceof c ? i : new c((function(e) {
                                e(i)
                            }))).then(n, s)
                        }
                        i((u = u.apply(o, l || [])).next())
                    }));
                    var o, l, c, u
                };
                e.setTimeout(r, 100)
            }
        },
        855: (e, t, n) => {
            var s;
            ! function(e) {
                ! function(t) {
                    var s = "object" == typeof n.g ? n.g : "object" == typeof self ? self : "object" == typeof this ? this : Function("return this;")(),
                        i = a(e);

                    function a(e, t) {
                        return function(n, s) {
                            "function" != typeof e[n] && Object.defineProperty(e, n, {
                                configurable: !0,
                                writable: !0,
                                value: s
                            }), t && t(n, s)
                        }
                    }
                    void 0 === s.Reflect ? s.Reflect = e : i = a(s.Reflect, i),
                        function(e) {
                            var t = Object.prototype.hasOwnProperty,
                                n = "function" == typeof Symbol,
                                s = n && void 0 !== Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive",
                                i = n && void 0 !== Symbol.iterator ? Symbol.iterator : "@@iterator",
                                a = "function" == typeof Object.create,
                                r = {
                                    __proto__: []
                                }
                            instanceof Array, o = !a && !r, l = {
                                create: a ? function() {
                                    return Z(Object.create(null))
                                } : r ? function() {
                                    return Z({
                                        __proto__: null
                                    })
                                } : function() {
                                    return Z({})
                                },
                                has: o ? function(e, n) {
                                    return t.call(e, n)
                                } : function(e, t) {
                                    return t in e
                                },
                                get: o ? function(e, n) {
                                    return t.call(e, n) ? e[n] : void 0
                                } : function(e, t) {
                                    return e[t]
                                }
                            }, c = Object.getPrototypeOf(Function), u = "object" == typeof process && process.env && "true" === process.env.REFLECT_METADATA_USE_MAP_POLYFILL, h = u || "function" != typeof Map || "function" != typeof Map.prototype.entries ? function() {
                                var e = {},
                                    t = [],
                                    n = function() {
                                        function e(e, t, n) {
                                            this._index = 0, this._keys = e, this._values = t, this._selector = n
                                        }
                                        return e.prototype["@@iterator"] = function() {
                                            return this
                                        }, e.prototype[i] = function() {
                                            return this
                                        }, e.prototype.next = function() {
                                            var e = this._index;
                                            if (e >= 0 && e < this._keys.length) {
                                                var n = this._selector(this._keys[e], this._values[e]);
                                                return e + 1 >= this._keys.length ? (this._index = -1, this._keys = t, this._values = t) : this._index++, {
                                                    value: n,
                                                    done: !1
                                                }
                                            }
                                            return {
                                                value: void 0,
                                                done: !0
                                            }
                                        }, e.prototype.throw = function(e) {
                                            throw this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), e
                                        }, e.prototype.return = function(e) {
                                            return this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), {
                                                value: e,
                                                done: !0
                                            }
                                        }, e
                                    }();
                                return function() {
                                    function t() {
                                        this._keys = [], this._values = [], this._cacheKey = e, this._cacheIndex = -2
                                    }
                                    return Object.defineProperty(t.prototype, "size", {
                                        get: function() {
                                            return this._keys.length
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }), t.prototype.has = function(e) {
                                        return this._find(e, !1) >= 0
                                    }, t.prototype.get = function(e) {
                                        var t = this._find(e, !1);
                                        return t >= 0 ? this._values[t] : void 0
                                    }, t.prototype.set = function(e, t) {
                                        var n = this._find(e, !0);
                                        return this._values[n] = t, this
                                    }, t.prototype.delete = function(t) {
                                        var n = this._find(t, !1);
                                        if (n >= 0) {
                                            for (var s = this._keys.length, i = n + 1; i < s; i++) this._keys[i - 1] = this._keys[i], this._values[i - 1] = this._values[i];
                                            return this._keys.length--, this._values.length--, t === this._cacheKey && (this._cacheKey = e, this._cacheIndex = -2), !0
                                        }
                                        return !1
                                    }, t.prototype.clear = function() {
                                        this._keys.length = 0, this._values.length = 0, this._cacheKey = e, this._cacheIndex = -2
                                    }, t.prototype.keys = function() {
                                        return new n(this._keys, this._values, s)
                                    }, t.prototype.values = function() {
                                        return new n(this._keys, this._values, a)
                                    }, t.prototype.entries = function() {
                                        return new n(this._keys, this._values, r)
                                    }, t.prototype["@@iterator"] = function() {
                                        return this.entries()
                                    }, t.prototype[i] = function() {
                                        return this.entries()
                                    }, t.prototype._find = function(e, t) {
                                        return this._cacheKey !== e && (this._cacheIndex = this._keys.indexOf(this._cacheKey = e)), this._cacheIndex < 0 && t && (this._cacheIndex = this._keys.length, this._keys.push(e), this._values.push(void 0)), this._cacheIndex
                                    }, t
                                }();

                                function s(e, t) {
                                    return e
                                }

                                function a(e, t) {
                                    return t
                                }

                                function r(e, t) {
                                    return [e, t]
                                }
                            }() : Map, d = u || "function" != typeof Set || "function" != typeof Set.prototype.entries ? function() {
                                function e() {
                                    this._map = new h
                                }
                                return Object.defineProperty(e.prototype, "size", {
                                    get: function() {
                                        return this._map.size
                                    },
                                    enumerable: !0,
                                    configurable: !0
                                }), e.prototype.has = function(e) {
                                    return this._map.has(e)
                                }, e.prototype.add = function(e) {
                                    return this._map.set(e, e), this
                                }, e.prototype.delete = function(e) {
                                    return this._map.delete(e)
                                }, e.prototype.clear = function() {
                                    this._map.clear()
                                }, e.prototype.keys = function() {
                                    return this._map.keys()
                                }, e.prototype.values = function() {
                                    return this._map.values()
                                }, e.prototype.entries = function() {
                                    return this._map.entries()
                                }, e.prototype["@@iterator"] = function() {
                                    return this.keys()
                                }, e.prototype[i] = function() {
                                    return this.keys()
                                }, e
                            }() : Set, m = new(u || "function" != typeof WeakMap ? function() {
                                var e = l.create(),
                                    n = s();
                                return function() {
                                    function e() {
                                        this._key = s()
                                    }
                                    return e.prototype.has = function(e) {
                                        var t = i(e, !1);
                                        return void 0 !== t && l.has(t, this._key)
                                    }, e.prototype.get = function(e) {
                                        var t = i(e, !1);
                                        return void 0 !== t ? l.get(t, this._key) : void 0
                                    }, e.prototype.set = function(e, t) {
                                        return i(e, !0)[this._key] = t, this
                                    }, e.prototype.delete = function(e) {
                                        var t = i(e, !1);
                                        return void 0 !== t && delete t[this._key]
                                    }, e.prototype.clear = function() {
                                        this._key = s()
                                    }, e
                                }();

                                function s() {
                                    var t;
                                    do {
                                        t = "@@WeakMap@@" + r()
                                    } while (l.has(e, t));
                                    return e[t] = !0, t
                                }

                                function i(e, s) {
                                    if (!t.call(e, n)) {
                                        if (!s) return;
                                        Object.defineProperty(e, n, {
                                            value: l.create()
                                        })
                                    }
                                    return e[n]
                                }

                                function a(e, t) {
                                    for (var n = 0; n < t; ++n) e[n] = 255 * Math.random() | 0;
                                    return e
                                }

                                function r() {
                                    var e, t = (e = 16, "function" == typeof Uint8Array ? "undefined" != typeof crypto ? crypto.getRandomValues(new Uint8Array(e)) : "undefined" != typeof msCrypto ? msCrypto.getRandomValues(new Uint8Array(e)) : a(new Uint8Array(e), e) : a(new Array(e), e));
                                    t[6] = 79 & t[6] | 64, t[8] = 191 & t[8] | 128;
                                    for (var n = "", s = 0; s < 16; ++s) {
                                        var i = t[s];
                                        4 !== s && 6 !== s && 8 !== s || (n += "-"), i < 16 && (n += "0"), n += i.toString(16).toLowerCase()
                                    }
                                    return n
                                }
                            }() : WeakMap);

                            function p(e, t, n) {
                                var s = m.get(e);
                                if (E(s)) {
                                    if (!n) return;
                                    s = new h, m.set(e, s)
                                }
                                var i = s.get(t);
                                if (E(i)) {
                                    if (!n) return;
                                    i = new h, s.set(t, i)
                                }
                                return i
                            }

                            function g(e, t, n) {
                                if (y(e, t, n)) return !0;
                                var s = R(t);
                                return !T(s) && g(e, s, n)
                            }

                            function y(e, t, n) {
                                var s = p(t, n, !1);
                                return !E(s) && !!s.has(e)
                            }

                            function f(e, t, n) {
                                if (y(e, t, n)) return w(e, t, n);
                                var s = R(t);
                                return T(s) ? void 0 : f(e, s, n)
                            }

                            function w(e, t, n) {
                                var s = p(t, n, !1);
                                if (!E(s)) return s.get(e)
                            }

                            function b(e, t, n, s) {
                                p(n, s, !0).set(e, t)
                            }

                            function v(e, t) {
                                var n = _(e, t),
                                    s = R(e);
                                if (null === s) return n;
                                var i = v(s, t);
                                if (i.length <= 0) return n;
                                if (n.length <= 0) return i;
                                for (var a = new d, r = [], o = 0, l = n; o < l.length; o++) {
                                    var c = l[o];
                                    a.has(c) || (a.add(c), r.push(c))
                                }
                                for (var u = 0, h = i; u < h.length; u++) c = h[u], a.has(c) || (a.add(c), r.push(c));
                                return r
                            }

                            function _(e, t) {
                                var n = [],
                                    s = p(e, t, !1);
                                if (E(s)) return n;
                                for (var a = function(e) {
                                        var t = A(e, i);
                                        if (!S(t)) throw new TypeError;
                                        var n = t.call(e);
                                        if (!M(n)) throw new TypeError;
                                        return n
                                    }(s.keys()), r = 0;;) {
                                    var o = C(a);
                                    if (!o) return n.length = r, n;
                                    var l = o.value;
                                    try {
                                        n[r] = l
                                    } catch (e) {
                                        try {
                                            O(a)
                                        } finally {
                                            throw e
                                        }
                                    }
                                    r++
                                }
                            }

                            function k(e) {
                                if (null === e) return 1;
                                switch (typeof e) {
                                    case "undefined":
                                        return 0;
                                    case "boolean":
                                        return 2;
                                    case "string":
                                        return 3;
                                    case "symbol":
                                        return 4;
                                    case "number":
                                        return 5;
                                    case "object":
                                        return null === e ? 1 : 6;
                                    default:
                                        return 6
                                }
                            }

                            function E(e) {
                                return void 0 === e
                            }

                            function T(e) {
                                return null === e
                            }

                            function M(e) {
                                return "object" == typeof e ? null !== e : "function" == typeof e
                            }

                            function I(e, t) {
                                switch (k(e)) {
                                    case 0:
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                        return e
                                }
                                var n = 3 === t ? "string" : 5 === t ? "number" : "default",
                                    i = A(e, s);
                                if (void 0 !== i) {
                                    var a = i.call(e, n);
                                    if (M(a)) throw new TypeError;
                                    return a
                                }
                                return function(e, t) {
                                    if ("string" === t) {
                                        var n = e.toString;
                                        if (S(n) && !M(i = n.call(e))) return i;
                                        if (S(s = e.valueOf) && !M(i = s.call(e))) return i
                                    } else {
                                        var s;
                                        if (S(s = e.valueOf) && !M(i = s.call(e))) return i;
                                        var i, a = e.toString;
                                        if (S(a) && !M(i = a.call(e))) return i
                                    }
                                    throw new TypeError
                                }(e, "default" === n ? "number" : n)
                            }

                            function x(e) {
                                var t = I(e, 3);
                                return "symbol" == typeof t ? t : function(e) {
                                    return "" + e
                                }(t)
                            }

                            function D(e) {
                                return Array.isArray ? Array.isArray(e) : e instanceof Object ? e instanceof Array : "[object Array]" === Object.prototype.toString.call(e)
                            }

                            function S(e) {
                                return "function" == typeof e
                            }

                            function N(e) {
                                return "function" == typeof e
                            }

                            function A(e, t) {
                                var n = e[t];
                                if (null != n) {
                                    if (!S(n)) throw new TypeError;
                                    return n
                                }
                            }

                            function C(e) {
                                var t = e.next();
                                return !t.done && t
                            }

                            function O(e) {
                                var t = e.return;
                                t && t.call(e)
                            }

                            function R(e) {
                                var t = Object.getPrototypeOf(e);
                                if ("function" != typeof e || e === c) return t;
                                if (t !== c) return t;
                                var n = e.prototype,
                                    s = n && Object.getPrototypeOf(n);
                                if (null == s || s === Object.prototype) return t;
                                var i = s.constructor;
                                return "function" != typeof i || i === e ? t : i
                            }

                            function Z(e) {
                                return e.__ = void 0, delete e.__, e
                            }
                            e("decorate", (function(e, t, n, s) {
                                if (E(n)) {
                                    if (!D(e)) throw new TypeError;
                                    if (!N(t)) throw new TypeError;
                                    return function(e, t) {
                                        for (var n = e.length - 1; n >= 0; --n) {
                                            var s = (0, e[n])(t);
                                            if (!E(s) && !T(s)) {
                                                if (!N(s)) throw new TypeError;
                                                t = s
                                            }
                                        }
                                        return t
                                    }(e, t)
                                }
                                if (!D(e)) throw new TypeError;
                                if (!M(t)) throw new TypeError;
                                if (!M(s) && !E(s) && !T(s)) throw new TypeError;
                                return T(s) && (s = void 0),
                                    function(e, t, n, s) {
                                        for (var i = e.length - 1; i >= 0; --i) {
                                            var a = (0, e[i])(t, n, s);
                                            if (!E(a) && !T(a)) {
                                                if (!M(a)) throw new TypeError;
                                                s = a
                                            }
                                        }
                                        return s
                                    }(e, t, n = x(n), s)
                            })), e("metadata", (function(e, t) {
                                return function(n, s) {
                                    if (!M(n)) throw new TypeError;
                                    if (!E(s) && ! function(e) {
                                            switch (k(e)) {
                                                case 3:
                                                case 4:
                                                    return !0;
                                                default:
                                                    return !1
                                            }
                                        }(s)) throw new TypeError;
                                    b(e, t, n, s)
                                }
                            })), e("defineMetadata", (function(e, t, n, s) {
                                if (!M(n)) throw new TypeError;
                                return E(s) || (s = x(s)), b(e, t, n, s)
                            })), e("hasMetadata", (function(e, t, n) {
                                if (!M(t)) throw new TypeError;
                                return E(n) || (n = x(n)), g(e, t, n)
                            })), e("hasOwnMetadata", (function(e, t, n) {
                                if (!M(t)) throw new TypeError;
                                return E(n) || (n = x(n)), y(e, t, n)
                            })), e("getMetadata", (function(e, t, n) {
                                if (!M(t)) throw new TypeError;
                                return E(n) || (n = x(n)), f(e, t, n)
                            })), e("getOwnMetadata", (function(e, t, n) {
                                if (!M(t)) throw new TypeError;
                                return E(n) || (n = x(n)), w(e, t, n)
                            })), e("getMetadataKeys", (function(e, t) {
                                if (!M(e)) throw new TypeError;
                                return E(t) || (t = x(t)), v(e, t)
                            })), e("getOwnMetadataKeys", (function(e, t) {
                                if (!M(e)) throw new TypeError;
                                return E(t) || (t = x(t)), _(e, t)
                            })), e("deleteMetadata", (function(e, t, n) {
                                if (!M(t)) throw new TypeError;
                                E(n) || (n = x(n));
                                var s = p(t, n, !1);
                                if (E(s)) return !1;
                                if (!s.delete(e)) return !1;
                                if (s.size > 0) return !0;
                                var i = m.get(t);
                                return i.delete(n), i.size > 0 || m.delete(t), !0
                            }))
                        }(i)
                }()
            }(s || (s = {}))
        },
        205: (e, t, n) => {
            var s, i;
            e.exports = (s = {
                ChatSendBeforeEvent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ChatSendBeforeEvent,
                DynamicPropertiesDefinition: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.DynamicPropertiesDefinition,
                EntityDamageCause: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityDamageCause,
                EntityEquipmentInventoryComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityEquipmentInventoryComponent,
                EntityHealthComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHealthComponent,
                EntityHurtAfterEvent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHurtAfterEvent,
                EntityInventoryComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityInventoryComponent,
                EntityIsBabyComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityIsBabyComponent,
                EntityIsChargedComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityIsChargedComponent,
                EntityMarkVariantComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityMarkVariantComponent,
                EntitySpawnAfterEvent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntitySpawnAfterEvent,
                EntityVariantComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityVariantComponent,
                EquipmentSlot: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EquipmentSlot,
                GameMode: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.GameMode,
                ItemDurabilityComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemDurabilityComponent,
                ItemEnchantsComponent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemEnchantsComponent,
                ItemStack: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemStack,
                ItemTypes: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemTypes,
                MinecraftBlockTypes: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.MinecraftBlockTypes,
                MinecraftDimensionTypes: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.MinecraftDimensionTypes,
                MinecraftEffectTypes: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.MinecraftEffectTypes,
                MinecraftEntityTypes: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.MinecraftEntityTypes,
                MinecraftItemTypes: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.MinecraftItemTypes,
                MolangVariableMap: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.MolangVariableMap,
                PlayerJoinAfterEvent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.PlayerJoinAfterEvent,
                PlayerLeaveAfterEvent: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.PlayerLeaveAfterEvent,
                system: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.system,
                world: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.world
            }, i = {}, n.d(i, s), i)
        },
        985: (e, t, n) => {
            var s, i;
            e.exports = (s = {
                ActionFormData: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_ui_f6791859__.ActionFormData,
                MessageFormData: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_ui_f6791859__.MessageFormData,
                ModalFormData: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_ui_f6791859__.ModalFormData
            }, i = {}, n.d(i, s), i)
        }
    },
    __webpack_module_cache__ = {};

function __webpack_require__(e) {
    var t = __webpack_module_cache__[e];
    if (void 0 !== t) return t.exports;
    var n = __webpack_module_cache__[e] = {
        exports: {}
    };
    return __webpack_modules__[e](n, n.exports, __webpack_require__), n.exports
}
__webpack_require__.n = e => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return __webpack_require__.d(t, {
        a: t
    }), t
}, __webpack_require__.d = (e, t) => {
    for (var n in t) __webpack_require__.o(t, n) && !__webpack_require__.o(e, n) && Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
    })
}, __webpack_require__.g = function() {
    if ("object" == typeof globalThis) return globalThis;
    try {
        return this || new Function("return this")()
    } catch (e) {
        if ("object" == typeof window) return window
    }
}(), __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
var __webpack_exports__ = {};
(() => {
    var e = __webpack_require__(205),
        t = __webpack_require__(721),
        n = __webpack_require__(724),
        s = __webpack_require__(215),
        i = __webpack_require__(662);
    __webpack_require__(855);
    var a, r = __webpack_require__(932);
    class o {
        constructor() {
            this.mixer = []
        }
        addMonitor(e) {
            return this.mixer.push(e), e
        }
        removeMonitor(e) {
            let t = this.mixer.indexOf(e); - 1 !== t && this.mixer.splice(t, 1)
        }
        hasMonitor(e) {
            return -1 !== this.mixer.indexOf(e)
        }
        trigger(...e) {
            for (let t of this.mixer) t(...e)
        }
    }
    class l {
        static createServer(e, t) {
            let n = new e(t);
            this.serverMap.set(e, n)
        }
        static postMessageBetweenServer() {}
        static postMessageBetweenClient(e, t, n, s) {
            let i = this.serverMap.get(t);
            if (!i) return;
            let a = i.findClientByPlayer(e.player);
            if (a)
                for (let e of r.Z.keys(a)) Reflect.getMetadata("exportName", a, e) === n && Reflect.get(a, e).apply(a, s)
        }
        static thread() {}
    }

    function c(e) {
        return function(t, n, s) {
            Reflect.defineMetadata("exportName", e, t, n)
        }
    }
    a = l, l.tickMonitor = new o, l.longTickMonitor = new o, (() => {
        let t = 0,
            n = 0;
        e.system.runInterval((() => {
            const e = Date.now();
            let s = {
                currentTick: t,
                deltaTime: (e - n) / 1e3
            };
            n = e, t += 1, a.tickMonitor.trigger(s)
        }), 1)
    })(), (() => {
        let t = 0,
            n = 0;
        e.system.runInterval((() => {
            const e = Date.now();
            let s = {
                currentTick: t,
                deltaTime: (e - n) / 1e3
            };
            n = e, t += 1, a.longTickMonitor.trigger(s)
        }), 5)
    })(), l.serverMap = new Map;
    var u = __webpack_require__(513);
    class h {
        constructor(t) {
            this.exEvents = {
                [u.A.tick]: {
                    subscribe: e => {
                        this._subscribe(u.A.tick, e)
                    },
                    unsubscribe: e => {
                        this._unsubscribe(u.A.tick, e)
                    },
                    pattern: () => {
                        l.tickMonitor.addMonitor((e => {
                            var t;
                            null === (t = h.monitorMap.get(u.A.tick)) || void 0 === t || t.forEach((t => {
                                t(e)
                            }))
                        }))
                    }
                },
                [u.A.onLongTick]: {
                    subscribe: e => {
                        this._subscribe(u.A.onLongTick, e)
                    },
                    unsubscribe: e => {
                        this._unsubscribe(u.A.onLongTick, e)
                    },
                    pattern: () => {
                        l.longTickMonitor.addMonitor((e => {
                            var t;
                            null === (t = h.monitorMap.get(u.A.onLongTick)) || void 0 === t || t.forEach((t => {
                                t(e)
                            }))
                        }))
                    }
                }
            }, this._server = t, this.events = {};
            for (let t in e.world.afterEvents) this.events[`after${t[0].toUpperCase()}${t.slice(1)}`] = e.world.afterEvents[t];
            for (let t in e.world.beforeEvents) this.events[`before${t[0].toUpperCase()}${t.slice(1)}`] = e.world.beforeEvents[t];
            if (!h.init) {
                h.init = !0;
                for (let e in this.exEvents) this.exEvents[e].pattern()
            }
        }
        _subscribe(e, t) {
            let n = h.monitorMap.get(e);
            void 0 === n && (n = [], h.monitorMap.set(e, n)), n.push(t)
        }
        _unsubscribe(e, t) {
            var n;
            let s = null !== (n = h.monitorMap.get(e)) && void 0 !== n ? n : [];
            s.splice(s.findIndex(((e, n) => {
                if (e === t) return !0
            })), 1)
        }
        cancelAll() {
            throw new Error("Method not implemented.")
        }
        register(e, t) {
            let n = t;
            return e in this.events ? this.events[e].subscribe(n) : e in this.exEvents ? this.exEvents[e].subscribe(n) : void console.warn("No event registered for name " + e)
        }
        cancel(e, t) {
            return e in this.events ? this.events[e].unsubscribe(t) : e in this.exEvents ? this.exEvents[e].unsubscribe(t) : void 0
        }
    }
    h.monitorMap = new Map, h.init = !1;
    var d = __webpack_require__(242),
        m = __webpack_require__(361);
    class p {
        static push(e) {
            return this.queue.push(e), this
        }
        static init(e) {
            this.delay = r.Z.tickTask((() => {
                var e;
                this.queue.length > 0 && (null === (e = this.queue.shift()) || void 0 === e || e())
            })).delay(60), this.delay.start()
        }
    }
    p.queue = [];
    var g, y = __webpack_require__(960),
        f = __webpack_require__(654),
        w = __webpack_require__(782),
        b = __webpack_require__(710);
    class v {
        constructor(e) {
            this.exEvents = {
                [u.gw.beforeItemUse]: new _(this, u.gw.beforeItemUse),
                [u.gw.afterItemUse]: new _(this, u.gw.afterItemUse),
                [u.A.tick]: new _(this, u.A.tick),
                [u.A.afterEntityHit]: new _(this, u.A.afterEntityHit),
                [u.A.afterOnHitEntity]: new _(this, u.A.afterOnHitEntity),
                [u.A.afterOnHurt]: new _(this, u.A.afterOnHurt),
                [u.A.afterItemOnHandChange]: new _(this, u.A.afterItemOnHandChange),
                [u.A.onLongTick]: new _(this, u.A.onLongTick),
                [u.gw.afterBlockBreak]: new _(this, u.gw.afterBlockBreak)
            }, this._ctrl = e, console.warn("regist events")
        }
        _subscribe(e, t) {
            v.eventHandlers.subscribe(this._ctrl.entity, e, t)
        }
        _unsubscribe(e, t) {
            v.eventHandlers.unsubscribe(this._ctrl.entity, e, t)
        }
        cancelAll() {
            console.warn("destroy all events"), v.eventHandlers.unsubscribeAll(this._ctrl.entity)
        }
        static init(e) {
            this.eventHandlers.setEventLiseners(this.exEventSetting), this.eventHandlers.init(e)
        }
        register(e, t) {
            let n = t;
            if (e in this.exEvents) return this.exEvents[e].subscribe(n);
            console.warn("No event registered for name " + e)
        }
        cancel(e, t) {
            if (e in this.exEvents) return this.exEvents[e].unsubscribe(t)
        }
    }
    g = v, v.eventHandlers = new b.Z, v.exEventSetting = {
        [u.gw.beforeItemUse]: {
            pattern: v.eventHandlers.registerToServerByEntity,
            filter: {
                name: "source"
            }
        },
        [u.gw.afterItemUse]: {
            pattern: v.eventHandlers.registerToServerByEntity,
            filter: {
                name: "source"
            }
        },
        [u.A.tick]: {
            pattern: v.eventHandlers.registerToServerByServerEvent
        },
        [u.A.afterEntityHit]: {
            pattern: v.eventHandlers.registerToServerByEntity,
            filter: {
                name: "entity"
            }
        },
        [u.A.afterOnHitEntity]: {
            pattern: v.eventHandlers.registerToServerByEntity,
            filter: {
                name: "damageSource.damagingEntity"
            },
            name: u.gw.afterEntityHurt
        },
        [u.A.afterOnHurt]: {
            pattern: v.eventHandlers.registerToServerByEntity,
            filter: {
                name: "hurtEntity"
            },
            name: u.gw.afterEntityHurt
        },
        [u.A.afterItemOnHandChange]: {
            pattern: (e, t) => {
                g.onHandItemMap = new Map, v.eventHandlers.server.getEvents().register(e, (e => {
                    for (let e of v.eventHandlers.monitorMap[t]) {
                        let t = g.onHandItemMap.get(e[0]),
                            n = null == t ? void 0 : t[0],
                            s = w.Z.getInstance(e[0]).getBag().getItemOnHand();
                        (null == n ? void 0 : n.typeId) === (null == s ? void 0 : s.typeId) && e[0].selectedSlot === (null == t ? void 0 : t[1]) || (e[1].forEach((t => {
                            t(new u.aH(n, w.Z.getInstance(e[0]).getBag().getItemOnHand(), e[0]))
                        })), g.onHandItemMap.set(e[0], [s, e[0].selectedSlot]))
                    }
                }))
            },
            name: u.A.onLongTick
        },
        [u.A.onLongTick]: {
            pattern: v.eventHandlers.registerToServerByServerEvent
        },
        [u.gw.afterBlockBreak]: {
            pattern: v.eventHandlers.registerToServerByEntity,
            filter: {
                name: "player"
            }
        }
    }, v.onHandItemMap = new Map, v.onceItemUseOnMap = new Map;
    class _ {
        constructor(e, t) {
            this.subscribe = n => {
                e._subscribe(t, n)
            }, this.unsubscribe = n => {
                e._unsubscribe(t, n)
            }
        }
    }
    var k = __webpack_require__(478),
        E = __webpack_require__(632);
    class T {
        constructor(e, t) {
            this.time = 1e3, this.timeOut = e, this.looper = t
        }
        getDelay() {
            return this.time
        }
        delay(e) {
            return this.time = e, this
        }
        isStarted() {
            return void 0 !== this.func
        }
        startOnce() {
            let e = 0;
            this.isStarted() || (this.func = t => {
                e += 1e3 * t.deltaTime, e >= this.time && (this.stop(), this.looper())
            }, this.timeOut.register("tick", this.func))
        }
        start() {
            let e = 0;
            this.isStarted() || (this.func = t => {
                e += 1e3 * t.deltaTime, e >= this.time && (this.looper(), e = 0)
            }, this.timeOut.register("tick", this.func))
        }
        stop() {
            this.func && (this.timeOut.cancel("tick", this.func), this.func = void 0)
        }
    }
    class M {
        constructor(e, t, n) {
            this.isInDelayStop = !1, this.soundId = t;
            let s = n.split(":");
            this.long = 1e3 * (60 * parseInt(s[0]) + parseInt(s[1])), this.manager = e
        }
        loop(e, t) {
            this.isInDelayStop ? this.isInDelayStop = !1 : (this.stop(), this.play(e, t), this.looper = new T(this.manager.getEvents(), (() => {
                this.play(e, t)
            })).delay(this.long), this.looper.start())
        }
        stop() {
            var t;
            null === (t = this.looper) || void 0 === t || t.stop(), e.world.getDimension(e.MinecraftDimensionTypes.overworld).runCommandAsync("stopsound @a " + this.soundId)
        }
        delayStop(e) {
            this.isInDelayStop = !0, this.manager.setTimeout((() => {
                this.isInDelayStop && this.stop(), this.isInDelayStop = !1
            }), e)
        }
        play(e, t) {
            console.warn(`play ${this.soundId} at ${t.x} ${t.y} ${t.z}`), (0, m.to)(e.command.run(`playsound ${this.soundId} @a[r=64,x=${t.x},y=${t.y},z=${t.z}] ${t.x} ${t.y} ${t.z} 0.5 1 0.5`))
        }
    }
    var I = function(e, t, n, s) {
            var i, a = arguments.length,
                r = a < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, n) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, s);
            else
                for (var o = e.length - 1; o >= 0; o--)(i = e[o]) && (r = (a < 3 ? i(r) : a > 3 ? i(t, n, r) : i(t, n)) || r);
            return a > 3 && r && Object.defineProperty(t, n, r), r
        },
        x = function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
        };
    class D {
        constructor(t) {
            this.entityControllers = new Map, this.clients = new Map, this.clients_nameMap = new Map, this._events = new h(this), D.isInitialized || (D.isInitialized = !0, i.Z.config = t, t.watchDog || e.system.events.beforeWatchdogTerminate.subscribe((e => {
                e.cancel = !0
            })), i.Z.console = function(e) {
                const t = "§c",
                    n = "§5",
                    s = (e = "§f", t = "") => Array.isArray(t) ? (t[0] = e + t[0], t[t.length - 1] += "§r", t) : e + t + "§r",
                    i = t => e.runCommandAsync(`tellraw @a[tag=debugger] {"rawtext": [{"text": "${t}"}]}`),
                    a = e => {
                        let t = "{\n";
                        for (const i in Object.keys(e)) {
                            const a = e[i];
                            null === a && (t += `${i}: null\n`), t += "object" != typeof a ? `${i}: ${"number"==typeof a?s(n,a):a}\n` : `${i}: {...}\n`
                        }
                        return t + "}"
                    },
                    r = (() => {
                        const e = (e, t) => e.replace("%s", t && "string" == typeof t ? t : t.toString()),
                            t = (e, t) => e.replace("%d", s("§b", t && "number" == typeof t ? Math.floor(t) : "string" == typeof t ? Math.floor(parseInt(t)) : NaN)),
                            r = (e, t) => e.replace("%f", s(n, "number" == typeof t ? t : "string" == typeof t ? Math.floor(parseFloat(t)) : NaN)),
                            o = (e, t) => e.replace("%o", a(t));
                        return (n, ...s) => {
                            for (let i = 0; i < s.length; i++) {
                                let a = /(%[s|d|f|o])/.exec(n)[1];
                                "%s" === a && (n = e(n, s[i])) || "%d" === a && (n = t(n, s[i])) || "%f" === a && (n = r(n, s[i])) || "%o" !== a || (n = o(n, s[i]))
                            }
                            return i(n)
                        }
                    })();

                function o(...e) {
                    let t = new Array(c).fill("    ").join("");
                    return /%[s|d|f|o]/.test(e[0]) ? r(t + e.shift(), ...e) : (e = e.map((e => "number" == typeof e ? s(n, e) : "object" == typeof e ? a(e) : e)).join("\n"), i(t + e))
                }
                let l = 0,
                    c = 0,
                    u = {},
                    h = [];
                return new class {
                    constructor() {
                        this.log = o, this.info = o
                    }
                    countReset(e) {}
                    debug(...e) {}
                    dir(e, t) {}
                    dirxml(...e) {}
                    groupCollapsed(...e) {}
                    table(e, t) {}
                    timeLog(e, ...t) {}
                    timeStamp(e) {}
                    assert(e, n) {
                        return !e && o(s(t, n))
                    }
                    clear() {
                        o("\n\n\n\n\n\n\n\n\n\n")
                    }
                    error(...e) {
                        return h.length > 0 && o(s(t, h.join(" > ") + "\n")), o(...s(t, e))
                    }
                    warn(...e) {
                        return o(...s("§e", e))
                    }
                    count(e) {
                        return o(e + ": " + l++)
                    }
                    group(e = `分组${c}`) {
                        let t = o(`▼ ${e}`);
                        return c++, t
                    }
                    groupEnd() {
                        c > 0 && c--
                    }
                    time(e = "default") {
                        u[e] = (new Date).getTime()
                    }
                    timeEnd(e = "default") {
                        if (u[e]) {
                            let t = ((new Date).getTime() - u[e]) / 1e3;
                            u[e] = null, o(`${e}: ${t} s`)
                        }
                    }
                    trace() {
                        o(h.join("\n\n"))
                    }
                    setTracePoint(e) {
                        let t = this.name || "anonymous";
                        e && (t += ` at line: ${e}`), h.push(t)
                    }
                }
            }(i.Z), m.Z.init(this), p.init(this), y.Z.init(this), f.Z.init(this), v.init(this)), (0, k.B)(this.getEvents(), this)
        }
        say(t) {
            e.world.sendMessage(t)
        }
        addEntityController(e, t) {
            this.entityControllers.set(e, t)
        }
        onEntitySpawn(e) {
            const t = this.entityControllers.get(e.entity.typeId);
            t && new t(e.entity, this)
        }
        getDimension(t) {
            return e.world.getDimension(t)
        }
        getExDimension(e) {
            return n.Z.getInstance(this.getDimension(e))
        }
        getEvents() {
            return this._events
        }
        getSound(e, t) {
            if (D.musicMap.has(e)) return D.musicMap.get(e); {
                let n = new M(this, e, t);
                return D.musicMap.set(e, n), n
            }
        }
        getClients() {
            return this.clients.values()
        }
        getPlayers() {
            let e = [];
            for (let t of this.clients) e.push(t[1].player);
            return e
        }
        findClientByName(e) {
            return this.clients_nameMap.get(e)
        }
        findClientByPlayer(e) {
            for (let t of this.clients)
                if (t[1].player == e) return t[1]
        }
        onClientJoin(t) {
            const n = t.playerName;
            (0, E.Z)(this, (() => -1 !== e.world.getAllPlayers().findIndex((e => e.name === n))), (() => {
                let t = e.world.getAllPlayers().find((e => e.name === n));
                if (!t) throw new Error(`Player ${n} not found`);
                let s = d.Z.randomUUID(),
                    i = this.newClient(s, t);
                this.clients.set(s, i), this.clients_nameMap.set(t.name, i)
            }))
        }
        onClientLeave(e) {
            let t = this.findClientByName(e.playerName);
            void 0 !== t ? (t.onLeave(), this.clients.delete(t.clientId), this.clients_nameMap.delete(e.playerName)) : i.Z.console.error(e.playerName + "client is not exists")
        }
        newClient(e, t) {
            return new s.Z(this, e, t)
        }
        setTimeout(e, t) {
            let n = 0,
                s = i => {
                    n += 1e3 * i.deltaTime, n > t && (this.getEvents().exEvents.tick.unsubscribe(s), e())
                };
            this.getEvents().exEvents.tick.subscribe(s)
        }
    }
    D.musicMap = new Map, I([(0, k.K)(u.gw.afterEntitySpawn), x("design:type", Function), x("design:paramtypes", [e.EntitySpawnAfterEvent]), x("design:returntype", void 0)], D.prototype, "onEntitySpawn", null), I([(0, k.K)(u.gw.afterPlayerJoin), x("design:type", Function), x("design:paramtypes", [e.PlayerJoinAfterEvent]), x("design:returntype", void 0)], D.prototype, "onClientJoin", null), I([(0, k.K)(u.gw.afterPlayerLeave), x("design:type", Function), x("design:paramtypes", [e.PlayerLeaveAfterEvent]), x("design:returntype", void 0)], D.prototype, "onClientLeave", null);
    var S = __webpack_require__(475);
    class N {
        constructor(e, n, s) {
            if (this._width = new t.Z, this._tmpA = new t.Z, this._tmpC = new t.Z, this._judgeWidth = new t.Z, this._tmpD = new t.Z, this.start = e.clone(), this.end = n.clone(), s) this.start.x > this.end.x && ([this.start.x, this.end.x] = [this.end.x, this.start.x]), this.start.y > this.end.y && ([this.start.y, this.end.y] = [this.end.y, this.start.y]), this.start.z > this.end.z && ([this.start.z, this.end.z] = [this.end.z, this.start.z]), this.end.add(1, 1, 1);
            else {
                if (this.end.x < 0 || this.end.y < 0 || this.end.z < 0) throw new Error("Invalid value (x,y,z < 0)");
                this.end.add(this.start)
            }
            this.resetRotation()
        }
        center() {
            return this.end.clone().sub(this.start).scl(.5).add(this.start)
        }
        contains(e) {
            return this.start.x <= e.x && this.start.z <= e.z && e.x <= this.end.x && e.z <= this.end.z && this.start.y <= e.y && e.y <= this.end.y
        }
        resetRotation() {
            this.setMatrix4(new S.Z([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]))
        }
        turnUp() {
            this.setMatrix4(this.mat.mul(new S.Z([
                [1, 0, 0, 0],
                [0, 0, -1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1]
            ])))
        }
        turnRight() {
            this.setMatrix4(this.mat = this.mat.mul(new S.Z([
                [0, 0, -1, 0],
                [0, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 1]
            ])))
        }
        turnFrontClockwise() {
            this.setMatrix4(this.mat.mul(new S.Z([
                [0, -1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ])))
        }
        pointAtStart(e) {
            this.end.sub(this.start).add(e), this.start.set(e)
        }
        calculateWidth() {
            return this._width.set(this.end).sub(this.start).mul(this.mat).abs(), this._judgeWidth.set(1, 1, 1).mul(this.mat), this.getWidth()
        }
        getWidth() {
            return this._width
        }
        calculateAbsPos(e, t = this._tmpA) {
            return this.calculateRelPos(this._tmpC.sub(this.start), t).add(this.start)
        }
        calculateRelPos(e, t = this._tmpA) {
            t.set(e).mul(this.mat);
            const n = this.getWidth();
            return t.x = this._judgeWidth.x < 0 ? n.x + t.x - 1 : t.x, t.y = this._judgeWidth.y < 0 ? n.y + t.y - 1 : t.y, t.z = this._judgeWidth.z < 0 ? n.z + t.z - 1 : t.z, t
        }
        forEachArea(e, t) {
            const n = e.clone();
            n.pointAtStart(this._tmpD.set(0, 0, 0));
            const s = this.getWidth(),
                i = n.getWidth();
            for (let e = 0; e <= s.x - i.x; e++)
                for (let a = 0; a <= s.y - i.y; a++)
                    for (let r = 0; r <= s.z - i.z; r++) n.pointAtStart(this._tmpD.set(e, a, r).add(this.start)), t(n)
        }
        clone() {
            const e = new N(this.start.clone(), this.end.clone().sub(1, 1, 1), !0);
            return e.setMatrix4(this.mat.clone()), e
        }
        setMatrix4(e) {
            this.mat = e, this.calculateWidth()
        }
        static randomPoint(e, t = 0) {
            if (0 === e.length) throw new Error("empty array");
            let n = e[Math.floor(Math.random() * e.length)];
            if (N.tempV.set(n.start).add(t, t, t), N.tempP.set(n.end).sub(t, t, t), N.tempP.sub(this.tempV), N.tempP.x < 0 || N.tempP.y < 0 || N.tempP.z < 0) throw new Error("Bound is too large");
            return N.tempP.set(N.tempP.x * Math.random(), N.tempP.y * Math.random(), N.tempP.z * Math.random()), N.tempV.add(N.tempP).clone()
        }
    }
    N.tempV = new t.Z, N.tempP = new t.Z;
    class A {
        constructor() {
            this.direction = A.DIRECTION_AROUND | A.DIRECTION_LAY
        }
        clone() {
            let e = new A;
            return e.dimension = this.dimension, e.structure = this.structure, e.analysisMap = this.analysisMap, e.direction = this.direction, e.area = this.area, e
        }
        setDimension(e) {
            return this.dimension = n.Z.getInstance(e), this
        }
        find() {
            if (void 0 === this.dimension) throw new Error("dimension is undefined");
            if (void 0 === this.structure) throw new Error("structure is undefined");
            if (void 0 === this.analysisMap) throw new Error("analysisMap is undefined");
            if (void 0 === this.area) throw new Error("area is undefined");
            const e = new N(new t.Z, new t.Z(this.structure[0][0].length, this.structure[0].length, this.structure.length));
            let n, s = e.clone();
            if (this.direction >> 0 & 1)
                if (this.direction >> 6 & 1) {
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n
                } else if (n = this.searchOnce(s)) return n;
            if (s = e.clone(), s.turnRight(), s.turnRight(), this.direction >> 1 & 1)
                if (this.direction >> 6 & 1) {
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n
                } else if (n = this.searchOnce(s)) return n;
            if (s = e.clone(), s.turnRight(), this.direction >> 2 & 1)
                if (this.direction >> 6 & 1) {
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n
                } else if (n = this.searchOnce(s)) return n;
            if (s = e.clone(), s.turnRight(), s.turnRight(), s.turnRight(), this.direction >> 3 & 1)
                if (this.direction >> 6 & 1) {
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                    if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n
                } else if (n = this.searchOnce(s)) return n;
            if (s = e.clone(), s.turnUp(), this.direction >> 4 & 1) {
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n
            }
            if (s = e.clone(), s.turnUp(), s.turnUp(), s.turnUp(), this.direction >> 5 & 1) {
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n;
                if (s.turnFrontClockwise(), n = this.searchOnce(s)) return n
            }
            return n
        }
        searchOnce(n) {
            var s, i;
            const a = null !== (s = this.structure) && void 0 !== s ? s : [
                    [""]
                ],
                r = new t.Z,
                o = new t.Z,
                l = this.dimension;
            let c;
            return null === (i = this.area) || void 0 === i || i.forEachArea(n, (t => {
                var n, s, i;
                for (o.z = 0; o.z < a.length; o.z++)
                    for (o.y = 0; o.y < a[o.z].length; o.y++) {
                        const c = a[o.z][o.y];
                        for (o.x = 0; o.x < c.length; o.x++) {
                            const a = c.charAt(o.x);
                            if (" " != a && (t.calculateRelPos(o, r).add(t.start), (null === (n = null == l ? void 0 : l.getBlock(r)) || void 0 === n ? void 0 : n.typeId) !== (null !== (i = null === (s = this.analysisMap) || void 0 === s ? void 0 : s.get(a)) && void 0 !== i ? i : e.MinecraftBlockTypes.air.id))) return
                        }
                    }
                c = t.clone()
            })), c
        }
        setStructure(e) {
            return this.structure = e, this.structure.forEach((e => {
                e.reverse()
            })), this
        }
        analysis(e) {
            if (e instanceof Map) this.analysisMap = e;
            else {
                const t = new Map;
                for (const n in e) t.set(n, e[n]);
                this.analysisMap = t
            }
            return this
        }
        putStructure(n) {
            if (void 0 === this.dimension) throw new Error("dimension is undefined");
            if (void 0 === this.analysisMap) throw new Error("analysisMap is undefined");
            if (void 0 === this.structure) throw new Error("structure is undefined");
            const s = new t.Z,
                i = new t.Z;
            for (i.z = 0; i.z < this.structure.length; i.z++)
                for (i.y = 0; i.y < this.structure[i.z].length; i.y++) {
                    const t = this.structure[i.z][i.y];
                    for (i.x = 0; i.x < t.length; i.x++) {
                        const a = t.charAt(i.x);
                        if (" " == a) continue;
                        n.calculateRelPos(i, s).add(n.start);
                        let r = this.analysisMap.get(a);
                        this.dimension.setBlock(s, null != r ? r : e.MinecraftBlockTypes.air.id)
                    }
                }
            return this
        }
        setArea(e) {
            return this.area = e, this
        }
        setDirection(e) {
            return this.direction = e, this
        }
    }
    A.DIRECTION_SOUTH = Math.pow(2, 0), A.DIRECTION_NORTH = Math.pow(2, 1), A.DIRECTION_EAST = Math.pow(2, 2), A.DIRECTION_WEST = Math.pow(2, 3), A.DIRECTION_UP = Math.pow(2, 4), A.DIRECTION_BUTTOM = Math.pow(2, 5), A.DIRECTION_ALLOW_ROTATE = Math.pow(2, 6), A.DIRECTION_AROUND = A.DIRECTION_WEST | A.DIRECTION_EAST | A.DIRECTION_SOUTH | A.DIRECTION_NORTH, A.DIRECTION_AROUND_MIRROR = A.DIRECTION_EAST | A.DIRECTION_NORTH, A.DIRECTION_LAY = A.DIRECTION_UP | A.DIRECTION_BUTTOM, A.DIRECTION_LAY_MIRROR = A.DIRECTION_UP;
    var C = __webpack_require__(703),
        O = __webpack_require__(418),
        R = __webpack_require__(647),
        Z = __webpack_require__(344);
    class L {
        constructor(e) {
            this.entity = new Z.Z(""), this.objective = e, e.create("cache:" + e.name), L.varMap.has(e.name) || L.varMap.set(e.name, new Map), this.useMap = L.varMap.get(e.name)
        }
        debug() {
            this.objective.setDisplay()
        }
        setBoolean(e, t) {
            this.setNumber(e, t ? 1 : 0)
        }
        getBoolean(e) {
            return 1 === this.getNumber(e)
        }
        setNumber(e, t) {
            this.entity.nameTag = e, this.entity.getScoresManager().setScore(this.objective, t), this.useMap.set(e, t)
        }
        getNumber(e) {
            return this.entity.nameTag = e, this.useMap.has(e) || this.useMap.set(e, this.entity.getScoresManager().getScore(this.objective)), this.useMap.get(e)
        }
        deleteNumber(e) {
            return this.entity.nameTag = e, this.useMap.delete(e), this.entity.getScoresManager().deleteScore(this.objective)
        }
    }
    L.varMap = new Map;
    class B extends L {
        get playerCanTp() {
            return this.getBoolean("playerCanTp")
        }
        set playerCanTp(e) {
            this.setBoolean("playerCanTp", e)
        }
        get tpNeedItem() {
            return this.getBoolean("tpNeedItem")
        }
        set tpNeedItem(e) {
            this.setBoolean("tpNeedItem", e)
        }
        get entityCleaner() {
            return this.getBoolean("entityCleaner")
        }
        set entityCleaner(e) {
            this.setBoolean("entityCleaner", e)
        }
        get deathRecord() {
            return this.getBoolean("deathRecord")
        }
        set deathRecord(e) {
            this.setBoolean("deathRecord", e)
        }
        get tpPointRecord() {
            return this.getBoolean("tpPointRecord")
        }
        set tpPointRecord(e) {
            this.setBoolean("tpPointRecord", e)
        }
        get damageShow() {
            return this.getBoolean("damageShow")
        }
        set damageShow(e) {
            this.setBoolean("damageShow", e)
        }
        get chainMining() {
            return this.getBoolean("chainMining")
        }
        set chainMining(e) {
            this.setBoolean("chainMining", e)
        }
        get initialMagicPickaxe() {
            return this.getBoolean("initialMagicPickaxe")
        }
        set initialMagicPickaxe(e) {
            this.setBoolean("initialMagicPickaxe", e)
        }
        get ownerExists() {
            return this.getBoolean("ownerExists")
        }
        set ownerExists(e) {
            this.setBoolean("ownerExists", e)
        }
        get entityCleanerLeastNum() {
            return this.getNumber("entityCleanerLeastNum") || 200
        }
        set entityCleanerLeastNum(e) {
            this.setNumber("entityCleanerLeastNum", e)
        }
        get entityCleanerStrength() {
            return this.getNumber("entityCleanerStrength") || 5
        }
        set entityCleanerStrength(e) {
            this.setNumber("entityCleanerStrength", e)
        }
        get entityCleanerDelay() {
            return this.getNumber("entityCleanerDelay") || 30
        }
        set entityCleanerDelay(e) {
            this.setNumber("entityCleanerDelay", e)
        }
        get worldSeed() {
            return Math.abs(this.getNumber("worldSeed") || (this.worldSeed = Math.floor(Math.random() * R.Z.MAX_VALUE)))
        }
        set worldSeed(e) {
            this.setNumber("worldSeed", e)
        }
        get ruinsExsitsData() {
            return this.getNumber("ruinsExsitsData") || 0
        }
        set ruinsExsitsData(e) {
            this.setNumber("ruinsExsitsData", e)
        }
    }
    class U {
        static clamp(e, t, n) {
            return Math.max(t, Math.min(n, e))
        }
        static IEEEremainder(e, t) {
            return e - t * Math.round(e / t)
        }
        static isNumber(e) {
            return /^\d+(\.\d+)?$/.test(e) && /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(e)
        }
        static zeroIfNaN(e) {
            return "string" == typeof e && (e = parseFloat(e)), void 0 === e || isNaN(e) ? 0 : e
        }
        static randomInteger(e, t) {
            return e + Math.floor(Math.random() * (t - e + 1))
        }
    }
    var z = __webpack_require__(38);
    class P {
        constructor(e) {
            this.item = e
        }
        append(e) {
            let t = this.getLore();
            t.push(e), this.setLore(t)
        }
        insert(e, t) {
            let n = this.getLore();
            n.splice(e, 0, t), this.setLore(n)
        }
        getLore() {
            return this.item.getLore()
        }
        setLore(e) {
            this.item.setLore(e)
        }
        search(e) {
            let t = this.getLore();
            for (let n = 0; n < t.length; n++)
                if (t[n].startsWith(e + " : ")) return new W(this.item, n)
        }
        getValueUseDefault(e) {
            let t = this.search(e);
            if (t) return t.get().substring(e.length + 3)
        }
        hasTag(e) {
            let t = this.getLore();
            for (let n of t)
                if (n.startsWith(e)) return !0;
            return !1
        }
        getValueUseRepeat(e) {
            let t = this.getValueUseDefault(e);
            return t ? t.length : 0
        }
        getValueUseMap(e, t) {
            let n = "  ",
                s = this.search(e);
            if (s)
                for (; s.hasNext() && (s.next(), s.get().startsWith(n));)
                    if (s.get().startsWith(n + t + " : ")) return s.get().substring(n.length + 3 + t.length)
        }
        setValueUseDefault(e, t) {
            let n = this.search(e);
            n ? n.revise(e + " : " + t).set() : this.append(e + " : " + t)
        }
        setTag(e) {
            this.hasTag(e) || this.append(e)
        }
        setValueUseRepeat(e, t, n) {
            this.setValueUseDefault(e, new Array(n).fill(t).join(""))
        }* entries(e) {
            if (e) {
                let t = "  ",
                    n = this.search(e);
                if (!n) return;
                for (; n.hasNext() && (n.next(), n.get().startsWith(t));) yield [...n.get().trim().split(" : ")]
            } else
                for (let e of this.getLore()) yield [...e.trim().split(" : ")]
        }
        setValueUseMap(e, t, n) {
            let s = "  ",
                a = this.search(e);
            if (!a) return this.append(e + " : "), void this.append(s + t + " : " + n);
            for (; a.hasNext() && (a.next(), a.get().startsWith(s));)
                if (a.get().startsWith(s + t + " : ")) return void a.revise(s + t + " : " + n).set();
            a = this.search(e), a ? this.insert(a.index + 1, s + t + " : " + n) : i.Z.console.error("Could not find " + e + " : " + n + " in lore")
        }
        delete(e) {
            let t = this.search(e);
            if (!t) return;
            let n = 1,
                s = t.index;
            for (; t.hasNext() && (t.next(), t.get().startsWith("  "));) n++;
            let i = this.getLore();
            i.splice(s, n), this.setLore(i)
        }
    }
    class W {
        constructor(e, t) {
            this.item = e, this.lore = e.getLore(), this.index = t
        }
        set() {
            this.item.setLore(this.lore)
        }
        revise(e) {
            return this.lore[this.index] = e, this
        }
        get() {
            return this.lore[this.index]
        }
        hasNext() {
            return this.index + 1 < this.lore.length
        }
        next() {
            this.index++
        }
    }
    class V extends P {
        setTag(e) {
            super.setTag("§r§n§6" + e)
        }
        hasTag(e) {
            return super.hasTag(e.startsWith("§") ? e : "§r§n§6" + e)
        }
        getValueUseMap(e, t) {
            let n = super.getValueUseMap("§r§l§f" + e, "§r§o§b" + t);
            return (null == n ? void 0 : n.startsWith("§")) ? n.substring(6) : n
        }
        setValueUseMap(e, t, n) {
            super.setValueUseMap("§r§l§f" + e, "§r§o§b" + t, "§r§o§e" + n)
        }* entries(e) {
            for (let t of super.entries(e)) yield [t[0].startsWith("§") ? t[0].substring(6) : t[0], t[1].startsWith("§") ? t[1].substring(6) : t[1]]
        }
        search(e) {
            let t = this.getLore();
            e = e.startsWith("§") ? e.substring(6) : e;
            for (let n = 0; n < t.length; n++)
                if ((t[n].startsWith("§") ? t[n].substring(6) : t[n]).startsWith(e + " : ")) return new W(this.item, n)
        }
    }
    class q {
        constructor() {
            this.pointUsed = 0, this.occupation = F.EMPTY, this.talents = []
        }
        static getDescription(e, t, n, s) {
            let i = q.calculateTalent(t, n, s);
            switch (n) {
                case Y.VIENTIANE:
                    return (0, z.Z)(e.talentWanxiangDesc, `§o§e${i}§r`);
                case Y.CLOAD_PIERCING:
                    return (0, z.Z)(e.talentChuanyunDesc, `§o§b${i}％§r`);
                case Y.ARMOR_BREAKING:
                    return (0, z.Z)(e.talentChuanjiaDesc, `§o§b${i}％§r`);
                case Y.SANCTION:
                    return (0, z.Z)(e.talentZhicaiDesc, `§o§b${i}％§r`);
                case Y.DEFENSE:
                    return (0, z.Z)(e.talentFangyuDesc, `§o§b${i}％§r`);
                case Y.CHARGING:
                    return (0, z.Z)(e.talentChongnengDesc, `§o§b${i}％§r`);
                case Y.RELOAD:
                    return (0, z.Z)(e.talentChongzhuangDesc, `§o§b${i}％§r`);
                case Y.SOURCE:
                    return (0, z.Z)(e.talentYuanquanDesc, `§o§b${i}％§r`);
                case Y.SUDDEN_STRIKE:
                    return (0, z.Z)(e.talentTuxiDesc, `§o§b${i}％§r`);
                case Y.REGENERATE:
                    return (0, z.Z)(e.talentZaishengDesc, `§o§e${i}§r`);
                default:
                    return ""
            }
        }
        static getLevel(e, t) {
            for (let n of e.talents)
                if (n.id === t) return n.level;
            return 0
        }
        static hasOccupation(e) {
            return e.occupation.id !== F.EMPTY.id
        }
        static chooseOccupation(e, t) {
            e.occupation = t;
            let n = new Set([Y.VIENTIANE, Y.CLOAD_PIERCING, Y.ARMOR_BREAKING, Y.SANCTION, Y.DEFENSE, Y.CHARGING, Y.RELOAD, Y.SOURCE]);
            for (let e of t.talentId) n.add(e);
            n.forEach((t => {
                e.talents.push(new Y(t, 0))
            }))
        }
        static calculateTalent(e, t, n) {
            switch (t) {
                case Y.VIENTIANE:
                    return n * (q.isOccupationTalent(e, t) ? 20 : 10) / 40;
                case Y.CLOAD_PIERCING:
                    return n * (q.isOccupationTalent(e, t) ? 80 : 40) / 40;
                case Y.ARMOR_BREAKING:
                    return n * (q.isOccupationTalent(e, t) ? 20 : 10) / 40;
                case Y.SANCTION:
                    return n * (q.isOccupationTalent(e, t) ? 50 : 25) / 40;
                case Y.DEFENSE:
                    return n * (q.isOccupationTalent(e, t) ? 45 : 25) / 40;
                case Y.CHARGING:
                case Y.RELOAD:
                    return n * (q.isOccupationTalent(e, t) ? 35 : 15) / 40;
                case Y.SOURCE:
                    return n * (q.isOccupationTalent(e, t) ? 100 : 40) / 40;
                case Y.SUDDEN_STRIKE:
                    return n * (q.isOccupationTalent(e, t) ? 80 : 0) / 40;
                case Y.REGENERATE:
                    return n * (q.isOccupationTalent(e, t) ? 20 : 0) / 40;
                default:
                    return 0
            }
        }
        static calculateTalentToLore(e, t, n, s) {
            let i = new V(n);
            i.delete("addition");
            for (let n of e) {
                let e = 0,
                    a = U.zeroIfNaN(i.getValueUseMap("enchanting", Y.getCharacter(s, n.id))) + n.level;
                e = q.calculateTalent(t, n.id, a);
                let r = U.zeroIfNaN(i.getValueUseMap("enchanting", Y.getCharacter(s, n.id))),
                    o = Math.round(r + 10 * e) / 10;
                0 !== o && i.setValueUseMap("addition", Y.getCharacter(s, n.id), r + " -> " + o)
            }
        }
        static isOccupationTalent(e, t) {
            return -1 !== e.talentId.indexOf(t)
        }
    }
    class Y {
        constructor(e, t) {
            this.id = e, this.level = t
        }
        static getCharacter(e, t) {
            switch (t) {
                case Y.VIENTIANE:
                    return e.talentWanxiang;
                case Y.CLOAD_PIERCING:
                    return e.talentChuanyun;
                case Y.ARMOR_BREAKING:
                    return e.talentChuanjia;
                case Y.SANCTION:
                    return e.talentZhicai;
                case Y.DEFENSE:
                    return e.talentFangyu;
                case Y.CHARGING:
                    return e.talentChongneng;
                case Y.RELOAD:
                    return e.talentChongzhuang;
                case Y.SOURCE:
                    return e.talentYuanquan;
                case Y.SUDDEN_STRIKE:
                    return e.talentTuxi;
                case Y.REGENERATE:
                    return e.talentZaisheng;
                default:
                    return e.talentWeizhi
            }
        }
    }
    Y.VIENTIANE = 1, Y.CLOAD_PIERCING = 2, Y.ARMOR_BREAKING = 3, Y.SANCTION = 4, Y.DEFENSE = 5, Y.CHARGING = 6, Y.RELOAD = 7, Y.SOURCE = 8, Y.SUDDEN_STRIKE = 9, Y.REGENERATE = 10;
    class F {
        constructor(e, t) {
            this.id = e, this.talentId = t
        }
        getCharacter(e) {
            switch (this.id) {
                case 0:
                    return e.occupationEmpty;
                case 1:
                    return e.occupationGuard;
                case 2:
                    return e.occupationWarrior;
                case 3:
                    return e.occupationAssassin;
                case 4:
                    return e.occupationArcher;
                case 5:
                    return e.occupationWarlock;
                case 6:
                    return e.occupationPriest
            }
            return ""
        }
    }
    F.EMPTY = new F(0, []), F.GUARD = new F(1, [Y.VIENTIANE, Y.ARMOR_BREAKING]), F.WARRIOR = new F(2, [Y.SANCTION, Y.DEFENSE]), F.ASSASSIN = new F(3, [Y.SANCTION, Y.SUDDEN_STRIKE]), F.ARCHER = new F(4, [Y.CLOAD_PIERCING, Y.ARMOR_BREAKING]), F.WARLOCK = new F(5, [Y.RELOAD, Y.SOURCE, Y.CHARGING]), F.PRIEST = new F(6, [Y.SOURCE, Y.REGENERATE]), F.keys = [F.GUARD, F.WARRIOR, F.ASSASSIN, F.ARCHER, F.WARLOCK, F.PRIEST];
    class j {
        constructor() {
            this.talent = new q
        }
    }
    const X = '冬之纪行诗最终用户许可协议\n\n一、为保护玩家乐趣、利益及维护开发者利益，我们需要这些最终用户许可条款为冬之纪行诗Add-Ons(以下简称本作品)的下载和使用制定一些规则。本许可是您与本作品的开发者(包括但不限于剑侠、LiLeyi及其他未列出或将来加入开发的人员，以下简称我们)之间达成的协议，描述使用游戏的条款和条件，这些条款应在中国法律所允许的范围内最大程度地适用。\n二、由于网络服务的特殊性，您同意本协议以电子协议形式签订。您一旦以任何形式表明同意，即视为您同意并已经接受本协议的全部条款；\n三、本协议的订立、履行、解释及争议的解决均适用中华人民共和国法律并排除其他一切冲突法的适用。如您就本协议内容或其执行有任何疑问，请与我们联系。您因使用我们服务所产生的及与本协议相关的争议，应由我们与您友好协商解决；如协商不成，任何一方均可向合同签订地有管辖权的人民法院提起诉讼。\n\n您知晓并同意：\n一、知识产权\n1.本作品是基于游戏"MineCraft"创作的 免费 内容拓展模组，在未取得我们允许的情况下，您不得将本作品用于商业用途/盈利。\n\n2.阅览本作品的代码以学习交流是允许的，但在未取得我们允许的情况下，您不得以任何方式窃取本作品中的代码、美术、音乐、文档等内容后将其复制、分发、发行、出租、展览、表演、广播、修改、改编、销售、运营、转许可、通过信息网络传播。\n\n3.您可以就本作品向我们提出有关建议，但这并不意味着您的建议会被采纳，我们可以通过所需的任何方式使用或不使用您的建议，且不必向您支付报酬。如果您认为我们应为您的建议支付报酬，请提前说明该要求，在我们以书面形式答复后再提交该建议，否则您提交该建议造成的损失将由您个人承担。\n\n二、我们的权利和义务\n1.下载的提供\n1).您可以直接从MCPEDL及我们所授权的其他网站/平台/渠道获取本作品\n2).如果您从未经我们授权的第三方获取本作品或与本作品名称相同的内容，我们无法保证该软件能够正常使用，并对因此给您造成的损失不予负责。\n3).我们会不断丰富本作品的内容、终端、形式等。当您使用本服务时，您应选择与您的终端、系统等相匹配的作品/游戏版本，否则，您可能无法正常使用本作品；我们可能会在本作品的完成之前发布测试版本，因此它可能包含BUG，这是无法避免的。\n2.作品的更新\n1).为了增进玩家体验、完善作品内容，我们  可能  不断努力开发新的服务，并为您不时提供作品更新。\n2).为了改善用户体验或提高服务安全性、保证功能的一致性等目的，我们有权对本作品进行更新，或者对作品的部分功能效果、服务内容进行改变。\n\n三、其他\n1.当暴露在特定光影图案或闪光光亮下时，有极小部分人群会引发癫痫。这种情形可能是由于某些未查出的癫痫症状引起，即使该人员没有患癫痫病史也有可能造成此类病症。如果您的家人或任意家庭成员有过类似症状，请在请在进行游戏前咨询您的医生或医师。如果您在游戏过程中出现任何症状，包括头晕、目眩、眼部或肌肉抽搐、失去意识、失去方向感、抽搐或出现任何自己无法控制的动作，请立刻停止游戏并在继续游戏前咨询您的医生或医师，否则所造成的一切后果由您自己承担。\n2.您在游戏MineCraft中的存档可能会由于装载本作品的更新而损坏，在更新前请自行备份您的存档，否则所造成的一切后果由您自己承担。\n3. 本协议内容同时包括本协议附件中的协议或规则，我们可能不断发布的关于本服务的其他相关协议、规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。\n\n您理解并同意，英文版为机器翻译内容，若本协议有中文、英文等多个语言版本，相应内容不一致的，均以中文版的内容为准。\n\n1、 In order to protect the fun and interests of players and the interests of developers, we need these end-user license terms to formulate some rules for the download and use of winter chronicles add ons (hereinafter referred to as this work). This license is an agreement between you and the developers of this work (including but not limited to AA swordsman, LiLeyi and other people not listed or who will join the development in the future, hereinafter referred to as US). It describes the terms and conditions of using the game. These terms shall be applied to the maximum extent permitted by Chinese laws.\n2、 Due to the particularity of network services, you agree that this agreement is signed in the form of electronic agreement. Once you express your consent in any form, it shall be deemed that you agree and have accepted all the terms of this Agreement;\n3、 The conclusion, performance, interpretation and dispute settlement of this Agreement shall be governed by the laws of the people\'s Republic of China, excluding the application of other conflict laws. If you have any questions about the contents of this agreement or its implementation, please contact us. Any dispute arising from your use of our services and related to this Agreement shall be settled through friendly negotiation between us and you; If the negotiation fails, either party may bring a lawsuit to the people\'s court with jurisdiction at the place where the contract is signed.\nYou understand and agree that:\n1、 Intellectual property\n1. This work is a free content expansion module created based on the game "minecraft". You may not use this work for commercial purposes / profits without our permission.\n2. It is allowed to read the code of this work to learn and communicate, but without our permission, you shall not steal the code, art, music, documents and other contents of this work in any way, and then copy, distribute, distribute, rent, exhibit, perform, broadcast, modify, adapt, sell, operate, sublicense, and disseminate them through the information network.\n3. You can make suggestions to us about this work, but this does not mean that your suggestions will be adopted. We can use or not use your suggestions in any way we need, and do not need to pay you any remuneration. If you think that we should pay for your proposal, please explain this requirement in advance and submit the proposal after we reply in writing. Otherwise, you will bear the losses caused by submitting the proposal.\n2、 Our rights and obligations\n1. Provision of download\n1) . you can directly obtain this work from mcpedl and other websites / platforms / channels authorized by us\n2). If you have never obtained this work or the content with the same name as this work from a third party authorized by us, we cannot guarantee the normal use of this software and will not be responsible for the losses caused to you.\n3). We will constantly enrich the content, terminal and form of this work. When you use this service, you should select a work / game version that matches your terminal, system, etc., otherwise, you may not be able to use this work normally; We may release the test version before the completion of this work, so it may contain bugs, which is unavoidable.\n2. Update of works\n1). In order to improve the player\'s experience and improve the content of the work, we may constantly strive to develop new services and provide you with work updates from time to time.\n2). In order to improve the user experience, improve the service security and ensure the consistency of functions, we have the right to update the work, or change some of the functional effects and service contents of the work.\n3、 Other\n1. When exposed to specific light and shadow patterns or flash light, a small part of the population will cause epilepsy. This situation may be caused by some undetected epileptic symptoms. Even if the person has no history of epilepsy, it may cause such symptoms. If your family or any family member has similar symptoms, please consult your doctor or physician before playing the game. If you have any symptoms during the game, including dizziness, dizziness, eye or muscle convulsions, loss of consciousness, loss of direction, convulsions, or any movement beyond your control, please stop the game immediately and consult your doctor or physician before continuing the game. Otherwise, you will bear all the consequences.\n2. Your archives in the game minecraft may be damaged due to loading the updates of this work. Please back up your archives before updating, otherwise you will bear all the consequences.\n3. The contents of this agreement also include the agreements or rules in the annexes to this agreement, and other relevant agreements and rules on this service that we may continuously publish. Once the above contents are officially released, they shall be an integral part of this agreement, and you shall also abide by them.\n',
        G = {
            zh: {
                ruinDesertCmd_SELF: "原地",
                ruinDesertCmd_TP: "传送",
                ruinDesertCmd_BLAST: "生成爆炸",
                ruinDesertCmd_EFFECT: "设置药水",
                ruinDesertCmd_DAMAGE: "造成伤害",
                ruinDesertCmd_HEALTH_ADD: "增加血量",
                ruinDesertCmd_HEALTH_REMOVE: "减少血量",
                ruinDesertCmd_FACING_ADD_2: "面向+2",
                ruinDesertCmd_FACING_ADD_4: "面向+4",
                ruinDesertCmd_FACING_ADD_6: "面向+6",
                ruinDesertCmd_FACING_ADD_8: "面向+8",
                ruinDesertCmd_FACING_ADD_10: "面向+10",
                ruinDesertCmd_FACING_ADD_12: "面向+12",
                ruinDesertCmd_FACING_ADD_16: "面向+16",
                ruinDesertCmd_FACING_ADD_20: "面向+20",
                ruinDesertCmd_FACING_ADD_28: "面向+28",
                ruinDesertCmd_FACING_ADD_32: "面向+32",
                ruinDesertCmd_Y_ADD_4: "Y+4",
                ruinDesertCmd_Y_ADD_8: "Y+8",
                ruinDesertCmd_Y_ADD_16: "Y+16",
                ruinDesertCmd_Y_ADD_32: "Y+32",
                ruinDesertCmd_Y_REMOVE_4: "Y-4",
                ruinDesertCmd_Y_REMOVE_8: "Y-8",
                ruinDesertCmd_Y_REMOVE_16: "Y-16",
                ruinDesertCmd_Y_REMOVE_32: "Y-32",
                ruinDesertCmd_WEAKNESS: "虚弱",
                ruinDesertCmd_STRENGTH: "力量",
                ruinDesertCmd_BLIND: "失明",
                ruinDesertCmd_SPEED: "速度",
                ruinDesertCmd_DEFENSE: "防御",
                ruinDesertCmd_WITHER: "凋零",
                ruinDesertCmd_EXECUTE: "检测",
                ruinDesertCmd_VALUE_1: "值: 1",
                ruinDesertCmd_VALUE_2: "值: 2",
                ruinDesertCmd_VALUE_4: "值: 4",
                ruinDesertCmd_VALUE_8: "值: 8",
                ruinDesertCmd_VALUE_16: "值: 16",
                ruinDesertCmd_VALUE_32: "值: 32",
                ruinDesertCmd_VALUE_3: "值: 3",
                ruinDesertCmd_VALUE_5: "值: 5",
                ruinDesertCmd_VALUE_10: "值: 4",
                ruinDesertCmd_VALUE_64: "值: 64",
                ruinDesertCmd_GUARD_POS: "守卫者位置",
                maxSingleDamage: "最大单体伤害",
                maxSecondaryDamage: "最大秒伤",
                talentWanxiang: "万象",
                talentChuanyun: "穿云",
                talentChuanjia: "穿甲",
                talentZhicai: "制裁",
                talentFangyu: "防御",
                talentChongneng: "充能",
                talentChongzhuang: "重装",
                talentYuanquan: "源泉",
                talentTuxi: "突袭",
                talentZaisheng: "再生",
                talentWeizhi: "未知",
                talentWanxiangDesc: "生命值增加 {0} 点",
                talentChuanyunDesc: "对0 ~ 64距离远处目标造成 {0} 额外伤害，距离越近额外伤害越小",
                talentChuanjiaDesc: "对目标造成 {0} * (自身最大生命值) 额外伤害",
                talentZhicaiDesc: "对0 ~ 16距离远处目标造成 {0} 额外伤害，距离越远额外伤害越小",
                talentFangyuDesc: "受到一切伤害减免 {0} ，致命伤无效",
                talentChongnengDesc: "武器冷却回复加快 {0}",
                talentChongzhuangDesc: "盔甲冷却回复加快 {0}",
                talentYuanquanDesc: "法力值回复加快 {0}",
                talentTuxiDesc: "攻击造成额外 {0} 伤害，该效果冷却10s",
                talentZaishengDesc: "每10s为18半径内血量最少玩家回复 {0} 点血量，敌对模式下该技能不发动",
                talentWeizhiDesc: "未知",
                occupationEmpty: "空",
                occupationGuard: "近卫",
                occupationWarrior: "战士",
                occupationAssassin: "暗杀者",
                occupationArcher: "射手",
                occupationWarlock: "术士",
                occupationPriest: "牧师",
                menuUISubtitleGonggao: "公告",
                menuUIMsgGonggao1: "大部分boss召唤方式更新，请前往游戏指南查看",
                menuUISubtitleHuodong: "活动",
                menuUISubtitleBanben: "版本",
                menuUIMsgBanben1: "版本信息",
                menuUIMsgBanben2: "当前Addon版本: ",
                menuUIMsgBanben3: "补丁包信息请到以下链接查看：",
                menuUIMsgBanben4: "版本须知",
                menuUIMsgBanben6: "致谢名单",
                menuUIMsgBanben5: "冬诗可能存在卡顿现象，因此我们建议您先输入/tag @s add owner，再前往菜单设置中，打开实体清理选项。如果您担心重要实体被清，请不要开启。",
                menuUIMsgBailan1: "主页",
                menuUIMsgBailan2: "宣传赢好礼",
                menuUIMsgBailan3: "本作品是耗时三年制作的大型模组，但奈何并无人气，我们决定举办本活动",
                menuUIMsgBailan4: "征稿活动：",
                menuUIMsgBailan5: "版本",
                menuUIMsgBailan6: "最终用户许可协议",
                menuUIMsgBailan7: "为什么无法召唤BOSS",
                menuUIMsgBailan8: "现在部分boss有专属的召唤者方块了。在他们的群系中，概率生成BOSS建筑，建筑内有召唤者方块。使用 钥匙 类物品点击即可召唤boss。对于未激活的召唤者方块，使用特定物品可以再次激活。如果找不到特定建筑，说明脸黑。请在特定的群系找。",
                menuUIMsgBailan9: "为什么那么卡",
                menuUIMsgBailan10: "卡顿多半是因为实体过多导致的。请尝试在 管理 界面（只有带有owner tag的玩家才能进入）打开实体清理功能，并调整最低保留实体数。建议350，配置好就往上调，配置差就往下调。",
                menuUIMsgBailan11: "如何升级、天赋点数怎么获得",
                menuUIMsgBailan12: "可以通过升级台挂机，以及在线时间来升级。升级可获得点数。",
                menuUIMsgBailan13: "个人",
                menuUIMsgBailan14: "信息",
                menuUIMsgBailan15: "是",
                menuUIMsgBailan16: "否",
                menuUIMsgBailan17: "是",
                menuUIMsgBailan18: "否",
                menuUIMsgBailan19: "加成",
                menuUIMsgBailan20: "等级效果",
                menuUIMsgBailan21: "到达一定等级可以获得药水增益",
                menuUIMsgBailan22: "等级效果 开",
                menuUIMsgBailan23: "粒子效果",
                menuUIMsgBailan24: "可以通过合成相应的药水来获得粒子，用腻了再来这里取消",
                menuUIMsgBailan25: "去除火焰",
                menuUIMsgBailan26: "去除光环",
                menuUIMsgBailan27: "去除符文",
                menuUIMsgBailan28: "去除爱心",
                menuUIMsgBailan29: "天赋",
                menuUIMsgBailan30: "剩余可使用点数 ： ",
                menuUIMsgBailan31: "选择你的职业",
                menuUIMsgBailan32: "传送点",
                menuUIMsgBailan33: "传送点记录",
                menuUIMsgBailan34: "传送点：",
                menuUIMsgBailan35: "前往点",
                menuUIMsgBailan36: "§b背包无传送石，传送失败",
                menuUIMsgBailan37: "§b传送成功",
                menuUIMsgBailan38: "备注点",
                menuUIMsgBailan39: "输入备注",
                menuUIMsgBailan40: "删除点",
                menuUIMsgBailan41: "记录当前点",
                menuUIMsgBailan42: "禁止记录传送点",
                menuUIMsgBailan43: "死亡点：",
                menuUIMsgBailan44: "前往点",
                menuUIMsgBailan45: "禁止死亡回溯",
                menuUIMsgBailan46: "交往",
                menuUIMsgBailan47: "交往设置",
                menuUIMsgBailan48: "敌对模式",
                menuUIMsgBailan49: "在敌对模式下，你可以攻击任何玩家，名字显示为红色；在友好模式下你无法攻击处于 友好模式 的玩家，名字显示为绿色。",
                menuUIMsgBailan50: "即：如果一个玩家名字是绿色，那么他是无威胁的；如果他开了红，那么他可能有攻击倾向。",
                menuUIMsgBailan51: "友好模式",
                menuUIMsgBailan52: "敌对模式",
                menuUIMsgBailan53: "传送",
                menuUIMsgBailan54: "不允许使用传送",
                menuUIMsgBailan55: "传送至",
                menuUIMsgBailan56: "§b背包无传送石，传送失败",
                menuUIMsgBailan57: "§b你向对方发起了请求",
                menuUIMsgBailan58: "传送请求",
                menuUIMsgBailan59: "是",
                menuUIMsgBailan60: "§b传送成功",
                menuUIMsgBailan61: "§b传送成功",
                menuUIMsgBailan62: "否",
                menuUIMsgBailan63: "§b对方拒绝了你的请求",
                menuUIMsgBailan64: "§b你拒绝了对方的请求",
                menuUIMsgBailan65: "邀请传送到你的位置",
                menuUIMsgBailan66: "§b背包无传送石，传送失败",
                menuUIMsgBailan67: "§b你向对方发起了邀请",
                menuUIMsgBailan68: "传送请求",
                menuUIMsgBailan69: "是",
                menuUIMsgBailan70: "§b传送成功",
                menuUIMsgBailan71: "§b传送成功",
                menuUIMsgBailan72: "否",
                menuUIMsgBailan73: "§b对方拒绝了你的邀请",
                menuUIMsgBailan74: "§b你拒绝了对方的邀请",
                menuUIMsgBailan75: "设置",
                menuUIMsgBailan76: "管理",
                menuUIMsgBailan77: "游戏内容",
                menuUIMsgBailan78: "玩家传送",
                menuUIMsgBailan79: "任何传送需要传送石",
                menuUIMsgBailan80: "开启实体清理",
                menuUIMsgBailan81: "开启死亡点回溯",
                menuUIMsgBailan82: "允许记录传送点",
                menuUIMsgBailan83: "无权限访问此页面。如果你是 op ，请输入/tag @s add owner 来获取管理权限",
                menuUIMsgBailan84: "高级设置",
                menuUIMsgBailan85: "实体清理设置",
                menuUIMsgBailan86: "开启实体清理",
                menuUIMsgBailan87: "保留实体数(最低实体数)",
                menuUIMsgBailan88: "清理灵敏度(瞬时卡顿处理)",
                menuUIMsgBailan89: "清理频次(长期清理强度)",
                menuUIMsgBailan90: "无权限访问此页面。如果你是 op ，请输入/tag @s add owner 来获取管理权限",
                menuUIMsgBailan91: "保留实体数(最低实体数)",
                menuUIMsgBailan92: "清理灵敏度(瞬时卡顿处理)",
                menuUIMsgBailan93: "清理频次(长期清理强度)",
                menuUIMsgBailan94: "玩家ID",
                menuUIMsgBailan95: "玩家等级",
                menuUIMsgBailan96: "法力值",
                menuUIMsgBailan97: "武器技能冷却",
                menuUIMsgBailan98: "盔甲技能冷却",
                menuUIMsgBailan99: "友好模式是否开启",
                menuUIMsgBailan100: "等级加成是否开启",
                menuUIMsgBailan101: "个人设置",
                menuUIMsgBailan102: "语言选择",
                menuUIMsgBailan103: "向作者提问",
                menuUIMsgBailan104: "你可以通过qq联系，Bilibili联系（找作者很容易的）LiLeyi 和 aa剑侠"
            },
            en: {
                ruinDesertCmd_SELF: "原地",
                ruinDesertCmd_TP: "TP",
                ruinDesertCmd_BLAST: "BLAST",
                ruinDesertCmd_EFFECT: "EFFECT",
                ruinDesertCmd_DAMAGE: "DAMAGE",
                ruinDesertCmd_HEALTH_ADD: "HEALTH_ADD",
                ruinDesertCmd_HEALTH_REMOVE: "HEALTH_REMOVE",
                ruinDesertCmd_FACING_ADD_2: "facing+2",
                ruinDesertCmd_FACING_ADD_4: "facing+4",
                ruinDesertCmd_FACING_ADD_6: "facing+6",
                ruinDesertCmd_FACING_ADD_8: "facing+8",
                ruinDesertCmd_FACING_ADD_10: "facing+10",
                ruinDesertCmd_FACING_ADD_12: "facing+12",
                ruinDesertCmd_FACING_ADD_16: "facing+16",
                ruinDesertCmd_FACING_ADD_20: "facing+20",
                ruinDesertCmd_FACING_ADD_28: "facing+28",
                ruinDesertCmd_FACING_ADD_32: "facing+32",
                ruinDesertCmd_Y_ADD_4: "Y+4",
                ruinDesertCmd_Y_ADD_8: "Y+8",
                ruinDesertCmd_Y_ADD_16: "Y+16",
                ruinDesertCmd_Y_ADD_32: "Y+32",
                ruinDesertCmd_Y_REMOVE_4: "Y-4",
                ruinDesertCmd_Y_REMOVE_8: "Y-8",
                ruinDesertCmd_Y_REMOVE_16: "Y-16",
                ruinDesertCmd_Y_REMOVE_32: "Y-32",
                ruinDesertCmd_WEAKNESS: "WEAKNESS",
                ruinDesertCmd_STRENGTH: "STRENGTH",
                ruinDesertCmd_BLIND: "BLIND",
                ruinDesertCmd_SPEED: "SPEED",
                ruinDesertCmd_DEFENSE: "DEFENSE",
                ruinDesertCmd_WITHER: "WITHER",
                ruinDesertCmd_EXECUTE: "EXECUTE",
                ruinDesertCmd_VALUE_1: "VALUE_1",
                ruinDesertCmd_VALUE_2: "VALUE_2",
                ruinDesertCmd_VALUE_4: "VALUE_4",
                ruinDesertCmd_VALUE_8: "VALUE_8",
                ruinDesertCmd_VALUE_16: "VALUE_16",
                ruinDesertCmd_VALUE_32: "VALUE_32",
                ruinDesertCmd_VALUE_3: "VALUE_3",
                ruinDesertCmd_VALUE_5: "VALUE_5",
                ruinDesertCmd_VALUE_10: "VALUE_10",
                ruinDesertCmd_VALUE_64: "VALUE_64",
                ruinDesertCmd_GUARD_POS: "GUARD_POS",
                maxSingleDamage: "Maximum monomer damage",
                maxSecondaryDamage: "Maximum second injury",
                talentWanxiang: "Juvenation",
                talentChuanyun: "Precision",
                talentChuanjia: "Bloodrage",
                talentZhicai: "Overheat",
                talentFangyu: "DamageAbsorption",
                talentChongneng: "WeaponRecharge",
                talentChongzhuang: "ArmorRecharge",
                talentYuanquan: "MagicRecharge",
                talentTuxi: "Frenzy",
                talentZaisheng: "Regeneration",
                talentWeizhi: "unknown",
                talentWanxiangDesc: "HP increases {0}",
                talentChuanyunDesc: "Deal {0} extra damage to targets within 0-64 blocks",
                talentChuanjiaDesc: "Deal extra damage ({0} * your HP) to targets",
                talentZhicaiDesc: "Deal {0} extra damage to targets within 0-16 blocks, the closer the distance, the higher the damage.",
                talentFangyuDesc: "Absorb {0} of the damage.",
                talentChongnengDesc: "Reduce {0} of your weapon's CD",
                talentChongzhuangDesc: "Reduce {0} of your armor's CD",
                talentYuanquanDesc: "Mana recharge speed up {0}",
                talentTuxiDesc: "Deal {0} extra damage to targets. CD: 10s",
                talentZaishengDesc: "Cure the players {0} HP around you every 10s, this talent is invalid when you are in hostile mode",
                talentWeizhiDesc: "unknown",
                occupationEmpty: "null",
                occupationGuard: "Guard",
                occupationWarrior: "warrior",
                occupationAssassin: "Assassin",
                occupationArcher: "Archer",
                occupationWarlock: "Warlock",
                occupationPriest: "Priest",
                menuUISubtitleGonggao: "announcement",
                menuUIMsgGonggao1: "Our new update is out, Let's take a look!",
                menuUISubtitleHuodong: "Activity",
                menuUISubtitleBanben: "Version",
                menuUIMsgBanben1: "Version Information",
                menuUIMsgBanben2: "Basic information",
                menuUIMsgBanben3: "Addon's version: 1.7.5B1, more info about the addon: ",
                menuUIMsgBanben4: "Edition notice",
                menuUIMsgBanben6: "Thanks list",
                menuUIMsgBanben5: "Winter poetry may have a stuttering phenomenon, so we recommend that you first enter/tag @s add owner, then go to the menu settings to open the entity cleanup option.If you are worried that the important entity will be cleared, please don't open it.",
                menuUIMsgBailan1: "Homepage",
                menuUIMsgBailan2: "Propaganda and winning gifts",
                menuUIMsgBailan3: "This work is a large module made for three years, but it is no popular, we decided to host this event",
                menuUIMsgBailan4: "Payment activity: ",
                menuUIMsgBailan5: "Version",
                menuUIMsgBailan6: "End User License Agreement",
                menuUIMsgBailan7: "How to summon the bosses?",
                menuUIMsgBailan8: "Now some of the bosses have their own summon blocks, in some biomes, there will be structures with summon blocks inside. With different items, you can unlock the block to summon the boss. It may takes you a long time to find these summon blocks, good luck!",
                menuUIMsgBailan9: "Why it is so laggy?",
                menuUIMsgBailan10: "Too many mobs may cause the problem, you can go to the Manage page to opem the 'Mob Cleanup'.(Only players with owner tag can visit the Manage page)",
                menuUIMsgBailan11: "How can I upgrade?",
                menuUIMsgBailan12: "You can upgrade your level through the level up table, and you can get some talent points to upgrade your talents when your level is up.",
                menuUIMsgBailan13: "personal",
                menuUIMsgBailan14: "information",
                menuUIMsgBailan15: "Yes",
                menuUIMsgBailan16: "no",
                menuUIMsgBailan17: "Yes",
                menuUIMsgBailan18: "no",
                menuUIMsgBailan19: "addition",
                menuUIMsgBailan20: "Level effect",
                menuUIMsgBailan21: "You can get some powerful buffs when you reach some special levels.",
                menuUIMsgBailan22: "Level effect",
                menuUIMsgBailan23: "Particles",
                menuUIMsgBailan24: "You can craft special potions to get particles, remove them here if you don't like it.",
                menuUIMsgBailan25: "Remove flame particle",
                menuUIMsgBailan26: "Remove halo particle",
                menuUIMsgBailan27: "Remove rune particle",
                menuUIMsgBailan28: "Remove love particle",
                menuUIMsgBailan29: "talent",
                menuUIMsgBailan30: "Talent points: ",
                menuUIMsgBailan31: "Choose your job",
                menuUIMsgBailan32: "Teleport point",
                menuUIMsgBailan33: "Teleport point record",
                menuUIMsgBailan34: "Teleport point: ",
                menuUIMsgBailan35: "Go to point:",
                menuUIMsgBailan36: "§bbackpack without teleport stones, teleport failed",
                menuUIMsgBailan37: "§bsuccessful teleport",
                menuUIMsgBailan38: "Remarks",
                menuUIMsgBailan39: "Enter remarks",
                menuUIMsgBailan40: "Delete point:",
                menuUIMsgBailan41: "Record the current point",
                menuUIMsgBailan42: "Forbidden record teleportation point",
                menuUIMsgBailan43: "Death point: ",
                menuUIMsgBailan44: "Go to the point",
                menuUIMsgBailan45: "Destroy retrospective",
                menuUIMsgBailan46: "Exchanges",
                menuUIMsgBailan47: "Associated settings",
                menuUIMsgBailan48: "Hostile mode",
                menuUIMsgBailan49: "When you are in hostile mode, you can attack other players and your name will turn into red. When you are in friendly mode, you can't attack other players and your name will turn into green.",
                menuUIMsgBailan50: "That is, if a player's name is green, then he is not threatened; if he starts red, then he may have a tendency to attack.",
                menuUIMsgBailan51: "Friendly mode",
                menuUIMsgBailan52: "Hostile mode",
                menuUIMsgBailan53: "Teleport",
                menuUIMsgBailan54: "teleport not allowed",
                menuUIMsgBailan55: "Teleport to",
                menuUIMsgBailan56: "§bbackpack without teleport stones, teleport failed",
                menuUIMsgBailan57: "§byou initiated a request to the other party",
                menuUIMsgBailan58: "Teleport request",
                menuUIMsgBailan59: "Yes",
                menuUIMsgBailan60: "§bsuccessful teleport",
                menuUIMsgBailan61: "§bsuccessful teleport",
                menuUIMsgBailan62: "no",
                menuUIMsgBailan63: "§bthe other party rejected your request",
                menuUIMsgBailan64: "§byou reject the other party's request",
                menuUIMsgBailan65: "Invite the player to teleport to your position",
                menuUIMsgBailan66: "§bbackpack without teleport stones, teleport failed",
                menuUIMsgBailan67: "§byou initiated an invitation to the other party",
                menuUIMsgBailan68: "Teleport request",
                menuUIMsgBailan69: "Yes",
                menuUIMsgBailan70: "§bsuccessful teleport",
                menuUIMsgBailan71: "§bsuccessful teleport",
                menuUIMsgBailan72: "no",
                menuUIMsgBailan73: "§bthe target player rejected your invitation",
                menuUIMsgBailan74: "§byou rejected the invitation.",
                menuUIMsgBailan75: "set up",
                menuUIMsgBailan76: "manage",
                menuUIMsgBailan77: "Game content",
                menuUIMsgBailan78: "Player Teleportation",
                menuUIMsgBailan79: "Any teleportation requires teleportation stone",
                menuUIMsgBailan80: "Entity Cleanup",
                menuUIMsgBailan81: "Starting the death point back",
                menuUIMsgBailan82: "Allow players to record teleportation point",
                menuUIMsgBailan83: "Access to this page without permissions.If you are OP, enter/tag @s add owner to obtain management permissions",
                menuUIMsgBailan84: "advanced settings",
                menuUIMsgBailan85: "Entity Cleaning Settings",
                menuUIMsgBailan86: "Entity Cleanup",
                menuUIMsgBailan87: "Reserve the number of entities (minimum entity)",
                menuUIMsgBailan88: "Clean up sensitivity (instantaneous stuck processing)",
                menuUIMsgBailan89: "Cleaning frequency (long -term cleaning intensity)",
                menuUIMsgBailan90: "Access to this page without permissions.If you are OP, enter/tag @s add owner to obtain management permissions",
                menuUIMsgBailan91: "Reserve the number of entities (minimum entity)",
                menuUIMsgBailan92: "Clean up sensitivity (instantaneous stuck processing)",
                menuUIMsgBailan93: "Cleaning frequency (long -term cleaning intensity)",
                menuUIMsgBailan94: "Player ID",
                menuUIMsgBailan95: "Player level",
                menuUIMsgBailan96: "Mana",
                menuUIMsgBailan97: "Weapon skill cooling",
                menuUIMsgBailan98: "Armor skills cooling",
                menuUIMsgBailan99: "Whether the friendly mode is opened",
                menuUIMsgBailan100: "Whether the level bonus is turned on",
                menuUIMsgBailan101: "Personal settings",
                menuUIMsgBailan102: "language selection",
                menuUIMsgBailan103: "How can I contact the creator?",
                menuUIMsgBailan104: "Twitter: @le_lyii or @EAT_YOUR_PANTS     (issues)Github: https://github.com/AAswordman/ThePoetryOfWinter"
            }
        };
    class H {
        constructor(e) {
            this._client = e
        }
        get exPlayer() {
            return this._client.exPlayer
        }
        get player() {
            return this._client.player
        }
        get client() {
            return this._client
        }
        get globalSettings() {
            return this._client.globalSettings
        }
        get data() {
            return this._client.data
        }
        runCommandAsync(e) {
            return i.Z.runCommandAsync(e)
        }
        setTimeout(e, t) {
            this._client.setTimeout(e, t)
        }
        getDimension(e) {
            return this._client.getDimension(e)
        }
        getExDimension(e) {
            return this._client.getExDimension(e)
        }
        getPlayers() {
            return this._client.getPlayers()
        }
        getEvents() {
            return this._client.getEvents()
        }
        sayTo(e, t = this.player) {
            this._client.sayTo(e, t)
        }
        getLang() {
            return this._client.getLang()
        }
    }
    var J;
    class K {}
    J = K, K.DESERT_RUIN_NUM = 0, K.DESERT_RUIN_LOCATION_START = new t.Z(16384, 64, 16384), K.DESERT_RUIN_LOCATION_SIZE = new t.Z(512, 191, 512), K.DESERT_RUIN_LOCATION_END = J.DESERT_RUIN_LOCATION_START.clone().add(J.DESERT_RUIN_LOCATION_SIZE), K.DESERT_RUIN_LOCATION_CENTER = J.DESERT_RUIN_LOCATION_START.clone().add(J.DESERT_RUIN_LOCATION_SIZE.x / 2, 0, J.DESERT_RUIN_LOCATION_SIZE.z / 2), K.DESERT_RUIN_AREA = new N(J.DESERT_RUIN_LOCATION_START, J.DESERT_RUIN_LOCATION_SIZE), K.DESERT_RUIN_PROTECT_AREA = new N(J.DESERT_RUIN_LOCATION_START.clone().sub(J.DESERT_RUIN_LOCATION_SIZE), J.DESERT_RUIN_LOCATION_END.clone().add(J.DESERT_RUIN_LOCATION_SIZE)), K.STONE_RUIN_NUM = 1, K.STONE_RUIN_LOCATION_START = new t.Z(15360, 64, 15360), K.STONE_RUIN_LOCATION_SIZE = new t.Z(128, 128, 128), K.STONE_RUIN_LOCATION_END = J.STONE_RUIN_LOCATION_START.clone().add(J.STONE_RUIN_LOCATION_SIZE), K.STONE_RUIN_LOCATION_CENTER = J.STONE_RUIN_LOCATION_START.clone().add(J.STONE_RUIN_LOCATION_SIZE.x / 2, 0, J.STONE_RUIN_LOCATION_SIZE.z / 2), K.STONE_RUIN_AREA = new N(J.STONE_RUIN_LOCATION_START, J.STONE_RUIN_LOCATION_SIZE), K.STONE_RUIN_PROTECT_AREA = new N(J.STONE_RUIN_LOCATION_START.clone().sub(J.STONE_RUIN_LOCATION_SIZE), J.STONE_RUIN_LOCATION_END.clone().add(J.STONE_RUIN_LOCATION_SIZE)), K.CAVE_RUIN_NUM = 2, K.CAVE_RUIN_LOCATION_START = new t.Z(17408, 64, 17408), K.CAVE_RUIN_LOCATION_SIZE = new t.Z(128, 128, 128), K.CAVE_RUIN_LOCATION_END = J.CAVE_RUIN_LOCATION_START.clone().add(J.CAVE_RUIN_LOCATION_SIZE), K.CAVE_RUIN_LOCATION_CENTER = J.CAVE_RUIN_LOCATION_START.clone().add(J.CAVE_RUIN_LOCATION_SIZE.x / 2, 0, J.CAVE_RUIN_LOCATION_SIZE.z / 2), K.CAVE_RUIN_AREA = new N(J.CAVE_RUIN_LOCATION_START, J.CAVE_RUIN_LOCATION_SIZE), K.CAVE_RUIN_PROTECT_AREA = new N(J.CAVE_RUIN_LOCATION_START.clone().sub(J.CAVE_RUIN_LOCATION_SIZE), J.CAVE_RUIN_LOCATION_END.clone().add(J.CAVE_RUIN_LOCATION_SIZE)), K.ANCIENT_RUIN_NUM = 3, K.ANCIENT_RUIN_LOCATION_START = new t.Z(15360, 64, 16384), K.ANCIENT_RUIN_LOCATION_SIZE = new t.Z(128, 128, 128), K.ANCIENT_RUIN_LOCATION_END = J.ANCIENT_RUIN_LOCATION_START.clone().add(J.ANCIENT_RUIN_LOCATION_SIZE), K.ANCIENT_RUIN_LOCATION_CENTER = J.ANCIENT_RUIN_LOCATION_START.clone().add(J.ANCIENT_RUIN_LOCATION_SIZE.x / 2, 0, J.ANCIENT_RUIN_LOCATION_SIZE.z / 2), K.ANCIENT_RUIN_AREA = new N(J.ANCIENT_RUIN_LOCATION_START, J.ANCIENT_RUIN_LOCATION_SIZE), K.ANCIENT_RUIN_PROTECT_AREA = new N(J.ANCIENT_RUIN_LOCATION_START.clone().sub(J.ANCIENT_RUIN_LOCATION_SIZE), J.ANCIENT_RUIN_LOCATION_END.clone().add(J.ANCIENT_RUIN_LOCATION_SIZE)), K.MIND_RUIN_NUM = 4, K.MIND_RUIN_LOCATION_START = new t.Z(15360, 64, 17408), K.MIND_RUIN_LOCATION_SIZE = new t.Z(128, 128, 128), K.MIND_RUIN_LOCATION_END = J.MIND_RUIN_LOCATION_START.clone().add(J.MIND_RUIN_LOCATION_SIZE), K.MIND_RUIN_LOCATION_CENTER = J.MIND_RUIN_LOCATION_START.clone().add(J.MIND_RUIN_LOCATION_SIZE.x / 2, 0, J.MIND_RUIN_LOCATION_SIZE.z / 2), K.MIND_RUIN_AREA = new N(J.MIND_RUIN_LOCATION_START, J.MIND_RUIN_LOCATION_SIZE), K.MIND_RUIN_PROTECT_AREA = new N(J.MIND_RUIN_LOCATION_START.clone().sub(J.MIND_RUIN_LOCATION_SIZE), J.MIND_RUIN_LOCATION_END.clone().add(J.MIND_RUIN_LOCATION_SIZE));
    class Q {
        constructor(e) {
            this.game = e
        }
        get client() {
            return this.game.client
        }
    }
    var $, ee, te, ne, se = __webpack_require__(985);

    function ie(e, t) {
        return e[t]
    }! function(e) {
        e[e.TP = 0] = "TP", e[e.BLAST = 1] = "BLAST", e[e.EFFECT = 2] = "EFFECT", e[e.DAMAGE = 3] = "DAMAGE", e[e.HEALTH_ADD = 4] = "HEALTH_ADD", e[e.HEALTH_REMOVE = 5] = "HEALTH_REMOVE", e[e.EXECUTE = 6] = "EXECUTE"
    }($ || ($ = {})),
    function(e) {
        e[e.SELF = 0] = "SELF", e[e.FACING_ADD_2 = 1] = "FACING_ADD_2", e[e.FACING_ADD_4 = 2] = "FACING_ADD_4", e[e.FACING_ADD_6 = 3] = "FACING_ADD_6", e[e.FACING_ADD_8 = 4] = "FACING_ADD_8", e[e.FACING_ADD_10 = 5] = "FACING_ADD_10", e[e.FACING_ADD_12 = 6] = "FACING_ADD_12", e[e.FACING_ADD_16 = 7] = "FACING_ADD_16", e[e.FACING_ADD_20 = 8] = "FACING_ADD_20", e[e.FACING_ADD_28 = 9] = "FACING_ADD_28", e[e.FACING_ADD_32 = 10] = "FACING_ADD_32", e[e.Y_ADD_4 = 11] = "Y_ADD_4", e[e.Y_ADD_8 = 12] = "Y_ADD_8", e[e.Y_ADD_16 = 13] = "Y_ADD_16", e[e.Y_ADD_32 = 14] = "Y_ADD_32", e[e.Y_REMOVE_4 = 15] = "Y_REMOVE_4", e[e.Y_REMOVE_8 = 16] = "Y_REMOVE_8", e[e.Y_REMOVE_16 = 17] = "Y_REMOVE_16", e[e.Y_REMOVE_32 = 18] = "Y_REMOVE_32", e[e.GUARD_POS = 19] = "GUARD_POS"
    }(ee || (ee = {})),
    function(e) {
        e[e.WEAKNESS = 0] = "WEAKNESS", e[e.STRENGTH = 1] = "STRENGTH", e[e.BLIND = 2] = "BLIND", e[e.SPEED = 3] = "SPEED", e[e.DEFENSE = 4] = "DEFENSE", e[e.WITHER = 5] = "WITHER"
    }(te || (te = {})),
    function(e) {
        e[e.VALUE_1 = 0] = "VALUE_1", e[e.VALUE_2 = 1] = "VALUE_2", e[e.VALUE_4 = 2] = "VALUE_4", e[e.VALUE_8 = 3] = "VALUE_8", e[e.VALUE_16 = 4] = "VALUE_16", e[e.VALUE_32 = 5] = "VALUE_32", e[e.VALUE_3 = 6] = "VALUE_3", e[e.VALUE_5 = 7] = "VALUE_5", e[e.VALUE_10 = 8] = "VALUE_10", e[e.VALUE_64 = 9] = "VALUE_64"
    }(ne || (ne = {}));
    class ae {
        constructor(e) {
            this.collections = [], this.game = e
        }
        clear() {
            this.collections.splice(0, this.collections.length)
        }
        init() {
            this.collections = []
        }
        randomAddRule() {
            let e = R.Z.choice(function(e) {
                let t = [];
                for (let n in e) isNaN(Number(n)) && t.push(n);
                return t
            }(R.Z.choice([te, $, ee, ne])));
            return this.collections.push(e), e
        }
        show() {
            return n = this, s = void 0, a = function*() {
                let n = [];
                e: for (let s of [1]) {
                    let s = "/ ",
                        i = $.EXECUTE;
                    for (; i === $.EXECUTE;) {
                        let e = (new se.ActionFormData).title("使用规则").body("规则结构：" + s + "\n当前有：" + this.collections.map((e => this.game.getLang()["ruinDesertCmd_" + e])).join(" , ")),
                            t = [];
                        for (let e of this.collections) e in $ && t.push(e);
                        if (0 === t.length) break e;
                        for (let n of t) e.button(this.game.getLang()["ruinDesertCmd_" + n]);
                        let a = yield e.show(this.game.player);
                        if (a.canceled || void 0 === a.selection) break e;
                        s += this.game.getLang()["ruinDesertCmd_" + t[a.selection]] + " / ", n.push(t[a.selection]), this.collections.splice(this.collections.indexOf(t[a.selection]), 1), i = $[t[a.selection]], console.log(this.collections), e = (new se.ActionFormData).title("执行坐标").body("规则结构：" + s + "\n当前有：" + this.collections.map((e => this.game.getLang()["ruinDesertCmd_" + e])).join(" , ")), t = [];
                        for (let e of this.collections) e in ee && t.push(e);
                        if (0 === t.length) break e;
                        for (let n of t) e.button(this.game.getLang()["ruinDesertCmd_" + n]);
                        if (a = yield e.show(this.game.player), a.canceled || void 0 === a.selection) break e;
                        s += this.game.getLang()["ruinDesertCmd_" + t[a.selection]] + " / ", n.push(t[a.selection]), this.collections.splice(this.collections.indexOf(t[a.selection]), 1)
                    }
                    let a = (new se.ActionFormData).title("效果/值/倍数").body("规则结构：" + s + "\n当前有：" + this.collections.map((e => this.game.getLang()["ruinDesertCmd_" + e])).join(" , ")),
                        o = [];
                    if (i === $.EFFECT)
                        for (let e of this.collections) e in te && o.push(e);
                    else
                        for (let e of this.collections) e in ne && o.push(e);
                    if (0 === o.length) break e;
                    for (let e of o) a.button(this.game.getLang()["ruinDesertCmd_" + e]);
                    let l = yield a.show(this.game.player);
                    if (l.canceled || void 0 === l.selection) break e;
                    s += this.game.getLang()["ruinDesertCmd_" + o[l.selection]] + " / ", n.push(o[l.selection]), this.collections.splice(this.collections.indexOf(o[l.selection]), 1);
                    const c = new t.Z;
                    let u = 0;
                    for (i = $.EXECUTE; i === $.EXECUTE && n[u] in $;) {
                        i = ie($, n[u]), u += 1;
                        let e = ie(ee, n[u]);
                        switch (u += 1, e) {
                            case ee.FACING_ADD_2:
                                c.add(this.game.exPlayer.viewDirection.scl(2));
                                break;
                            case ee.FACING_ADD_4:
                                c.add(this.game.exPlayer.viewDirection.scl(4));
                                break;
                            case ee.FACING_ADD_6:
                                c.add(this.game.exPlayer.viewDirection.scl(6));
                                break;
                            case ee.FACING_ADD_8:
                                c.add(this.game.exPlayer.viewDirection.scl(8));
                                break;
                            case ee.FACING_ADD_10:
                                c.add(this.game.exPlayer.viewDirection.scl(10));
                                break;
                            case ee.FACING_ADD_12:
                                c.add(this.game.exPlayer.viewDirection.scl(12));
                                break;
                            case ee.FACING_ADD_16:
                                c.add(this.game.exPlayer.viewDirection.scl(16));
                                break;
                            case ee.FACING_ADD_32:
                                c.add(this.game.exPlayer.viewDirection.scl(32));
                                break;
                            case ee.FACING_ADD_20:
                                c.add(this.game.exPlayer.viewDirection.scl(20));
                                break;
                            case ee.FACING_ADD_28:
                                c.add(this.game.exPlayer.viewDirection.scl(28));
                                break;
                            case ee.Y_ADD_8:
                                c.y += 8;
                                break;
                            case ee.Y_ADD_4:
                                c.y += 4;
                                break;
                            case ee.Y_ADD_16:
                                c.y += 16;
                                break;
                            case ee.Y_ADD_32:
                                c.y += 32;
                                break;
                            case ee.Y_REMOVE_8:
                                c.y -= 8;
                                break;
                            case ee.Y_REMOVE_4:
                                c.y -= 4;
                                break;
                            case ee.Y_REMOVE_16:
                                c.y -= 16;
                                break;
                            case ee.Y_REMOVE_32:
                                c.y -= 32
                        }
                    }
                    const h = ie(te, n[u]) || ie(ne, n[u]),
                        d = n[u].startsWith("VALUE_") ? parseInt(n[u].split("_")[1]) : 0,
                        m = yield(new se.ModalFormData).title("其他选项").slider("延迟(s)", 0, 15, .5, 0).show(this.game.player);
                    if (m.canceled || void 0 === m.formValues) break e;
                    const p = 1e3 * Number(m.formValues[0]),
                        g = new t.Z,
                        y = r.Z.tickTask((() => {
                            g.set(this.game.player.location).add(c), this.game.getExDimension().spawnParticle("wb:ruin_desert_rulepre", g)
                        })).delay(1);
                    return y.start(), void this.game.setTimeout((() => {
                        switch (y.stop(), i) {
                            case $.BLAST:
                                this.game.getExDimension().createExplosion(g, d, {
                                    breaksBlocks: !1,
                                    source: this.game.player
                                });
                                break;
                            case $.DAMAGE:
                                this.game.getExDimension().getEntities({
                                    maxDistance: 15,
                                    excludeTags: this.game.player.hasTag("wbmsyh") ? ["wbmsyh"] : [],
                                    location: g
                                }).forEach((e => this.game.exPlayer.causeDamageTo(e, d)));
                                break;
                            case $.HEALTH_ADD:
                                this.game.getExDimension().getEntities({
                                    maxDistance: 15,
                                    location: g
                                }).forEach((e => {
                                    C.Z.getInstance(e).health -= d
                                }));
                                break;
                            case $.HEALTH_REMOVE:
                                this.game.getExDimension().getEntities({
                                    maxDistance: 15,
                                    excludeTags: this.game.player.hasTag("wbmsyh") ? ["wbmsyh"] : [],
                                    location: g
                                }).forEach((e => {
                                    C.Z.getInstance(e).health -= d
                                }));
                                break;
                            case $.TP:
                                this.game.getExDimension().getEntities({
                                    maxDistance: 15,
                                    location: g
                                }).forEach((e => C.Z.getInstance(e).setPosition(g.clone().sub(this.game.exPlayer.getPosition()).scl(d / 2).add(g))));
                                break;
                            case $.EFFECT: {
                                let t = e.MinecraftEffectTypes.absorption;
                                switch (h) {
                                    case te.WITHER:
                                        t = e.MinecraftEffectTypes.wither;
                                        break;
                                    case te.BLIND:
                                        t = e.MinecraftEffectTypes.blindness;
                                        break;
                                    case te.DEFENSE:
                                        t = e.MinecraftEffectTypes.resistance;
                                        break;
                                    case te.SPEED:
                                        t = e.MinecraftEffectTypes.speed;
                                        break;
                                    case te.STRENGTH:
                                        t = e.MinecraftEffectTypes.strength;
                                        break;
                                    case te.WEAKNESS:
                                        t = e.MinecraftEffectTypes.weakness
                                }
                                this.game.getExDimension().getEntities({
                                    maxDistance: 15,
                                    location: g
                                }).forEach((e => {
                                    e.addEffect(t, 600, 1, !1)
                                }));
                                break
                            }
                        }
                    }), p)
                }
                this.collections = this.collections.concat(n)
            }, new((i = void 0) || (i = Promise))((function(e, t) {
                function r(e) {
                    try {
                        l(a.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        l(a.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function l(t) {
                    var n;
                    t.done ? e(t.value) : (n = t.value, n instanceof i ? n : new i((function(e) {
                        e(n)
                    }))).then(r, o)
                }
                l((a = a.apply(n, s || [])).next())
            }));
            var n, s, i, a
        }
    }
    class re {}
    re.CHAR_MAZE_EMPTY = "", re.CHAR_MAZE_PATH = "", re.CHAR_MAZE_ROOM = "", re.CHAR_MAZE_ROOM_PASSED = "", re.CHAR_MAZE_ROOM_ARROW_UP = "", re.CHAR_MAZE_ROOM_ARROW_RIGHT = "", re.CHAR_MAZE_ROOM_ARROW_DOWN = "", re.CHAR_MAZE_ROOM_ARROW_LEFT = "", re.CHAR_MAZE_PATH_ARROW_UP = "", re.CHAR_MAZE_PATH_ARROW_RIGHT = "", re.CHAR_MAZE_PATH_ARROW_DOWN = "", re.CHAR_MAZE_PATH_ARROW_LEFT = "", re.CHAR_MAZE_PATH_GUARD = "";
    class oe {
        constructor(e, t) {
            this.trigger = e, this.value = t
        }
        upDate(e) {
            if (this.value !== e) {
                const t = this.value;
                this.value = e, this.trigger(e, t)
            }
        }
    }
    class le extends Q {
        constructor(n) {
            super(n), this.tmpA = new t.Z;
            const s = e => {
                this.client.magicSystem.additionHealth -= e / 2, this.client.magicSystem.additionHealth <= 0 && n.exPlayer.removeHealth(n, 999)
            };
            this.desertRuinRules = new ae(n), this.inRuinsListener = new oe((e => {
                e ? (this.desertRuinRules.init(), this.client.talentSystem.hasBeenDamaged.hasMonitor(s) || this.client.talentSystem.hasBeenDamaged.addMonitor(s), this.client.magicSystem.deleteActionbarPass("desertRuinMap")) : (this.client.magicSystem.additionHealth = 40, this.client.talentSystem.hasBeenDamaged.removeMonitor(s), this.desertRoomCounter.clear(), this.desertRuinRules.clear(), this.client.magicSystem.deleteActionbarPass("desertRuinMap"))
            }), !1), this.desertRoomCounter = new Map, this.desertRuinScoreJudge = new oe(((s, i) => {
                var a, r;
                const o = this.client.getServer().ruin_desertBoss;
                if (i && o.isInRoom(i)) {
                    let s = i.split(",").map((e => parseInt(e))),
                        a = new t.Z(s[0], s[1], s[2]).scl(16).add(K.DESERT_RUIN_LOCATION_START).add(8, 8, 8);
                    const r = new t.Z,
                        o = [];
                    for (let t of n.getDimension().getEntities({
                            excludeTypes: ["minecraft:item", e.MinecraftEntityTypes.player.id],
                            maxDistance: 16,
                            location: a
                        })) a.clone().sub(r.set(t.location)).abs().toArray().every((e => e <= 8)) && (o.push(t.id), this.client.magicSystem.additionHealth -= 1, t.kill());
                    0 !== o.length && n.sayTo("§b[遗迹]§f" + o.length + "个实体未清理, 已扣除 " + o.length + " 点血量")
                }
                if (this.client.getServer().ruin_desertBoss.isInRoom(s)) {
                    this.desertRoomCounter.set(s, (null !== (a = this.desertRoomCounter.get(s)) && void 0 !== a ? a : 0) + 1);
                    let e = Math.max(-2, Math.floor(Math.random() * (5 + (n.player.location.y - K.DESERT_RUIN_LOCATION_START.y) / 12 - 2 * (null !== (r = this.desertRoomCounter.get(s)) && void 0 !== r ? r : 0))));
                    n.sayTo("§b[遗迹]§f第" + this.desertRoomCounter.get(s) + "次进入，随机点数：" + e);
                    let t = e;
                    for (; t >= 1;) n.sayTo("§b[遗迹]§f获得规则 §b§l" + n.getLang()["ruinDesertCmd_" + this.desertRuinRules.randomAddRule()]), n.sayTo("§b[遗迹]§f获得规则 §b§l" + n.getLang()["ruinDesertCmd_" + this.desertRuinRules.randomAddRule()]), t--;
                    this.client.magicSystem.additionHealth += e, Math.random() < .7 && this.desertRuinRules.show().then((t => {
                        let s = Math.floor(10 * Math.random()),
                            i = n.exPlayer.getPosition().div(16).floor().scl(16).add(8, 4, 8);
                        switch (s) {
                            case 0:
                            default:
                                break;
                            case 1:
                                for (; e + 1 > 0;) n.getExDimension().spawnEntity("wb:magic_book", i), n.getExDimension().spawnEntity("wb:magic_book", i), e -= 2;
                                break;
                            case 2:
                                for (; e + 1 > 0;) n.getExDimension().spawnEntity("wb:desert_insect", i), n.getExDimension().spawnEntity("wb:magic_book", i), n.getExDimension().spawnEntity("wb:magic_book", i), n.getExDimension().spawnEntity("wb:desert_chester_normal", i), e -= 2;
                                break;
                            case 3:
                                for (; e + 1 > 0;) n.getExDimension().spawnEntity("wb:desert_chester_high", i), n.getExDimension().spawnEntity("wb:desert_skeleton", i), n.getExDimension().spawnEntity("wb:desert_skeleton", i), n.getExDimension().spawnEntity("wb:desert_skeleton", i), n.getExDimension().spawnEntity("wb:desert_skeleton", i), e -= 2;
                                break;
                            case 4:
                                for (; e + 1 > 0;) n.getExDimension().spawnEntity("dec:stone_golem", i), n.getExDimension().spawnEntity("dec:stone_golem", i), n.getExDimension().spawnEntity("wb:desert_chester_high", i), e -= 4;
                                break;
                            case 5:
                                for (; e + 1 > 0;) n.getExDimension().spawnEntity("dec:stone_golem", i), n.getExDimension().spawnEntity("dec:stone_golem", i), n.getExDimension().spawnEntity("wb:desert_chester_high", i), e -= 4;
                                break;
                            case 6:
                                for (; e + 1 > 0;) n.getExDimension().spawnEntity("wb:desert_zombie", i), n.getExDimension().spawnEntity("wb:desert_zombie", i), n.getExDimension().spawnEntity("wb:desert_skeleton", i), e -= 2
                        }
                    })).catch((e => m.Z.throwError(e)))
                }
            }), "0,0,0")
        }
        getShowMap() {
            const e = [],
                t = this.client.exPlayer.getPosition().sub(K.DESERT_RUIN_LOCATION_START).div(16).floor();
            t.div(8, 1, 8).floor().scl(8, 1, 8);
            const n = this.client.exPlayer.getPosition().sub(K.DESERT_RUIN_LOCATION_START).div(16).floor(),
                s = t.clone(),
                i = t.clone().add(8, 0, 8),
                a = this.client.getServer().ruin_desertBoss;
            for (this.tmpA.set(this.client.getServer().ruinDesertGuardPos).sub(K.DESERT_RUIN_LOCATION_START).div(16).floor(); t.z < i.z; t.z++) {
                let r = [];
                for (t.x = s.x; t.x < i.x; t.x++) {
                    const e = `${t.x},${t.y},${t.z}`;
                    if (t.x === this.tmpA.x && t.y === this.tmpA.y && t.z === this.tmpA.z) r.push(re.CHAR_MAZE_PATH_GUARD);
                    else if (t.x === n.x && t.z === n.z) {
                        const t = this.game.player.getViewDirection();
                        a.isInRoom(e) ? t.x > t.z ? Math.abs(t.x) > Math.abs(t.z) ? r.push(re.CHAR_MAZE_ROOM_ARROW_LEFT) : r.push(re.CHAR_MAZE_ROOM_ARROW_DOWN) : Math.abs(t.x) > Math.abs(t.z) ? r.push(re.CHAR_MAZE_ROOM_ARROW_RIGHT) : r.push(re.CHAR_MAZE_ROOM_ARROW_UP) : a.isOnPath(e) ? t.x > t.z ? Math.abs(t.x) > Math.abs(t.z) ? r.push(re.CHAR_MAZE_PATH_ARROW_LEFT) : r.push(re.CHAR_MAZE_PATH_ARROW_DOWN) : Math.abs(t.x) > Math.abs(t.z) ? r.push(re.CHAR_MAZE_PATH_ARROW_RIGHT) : r.push(re.CHAR_MAZE_PATH_ARROW_UP) : r.push(re.CHAR_MAZE_EMPTY)
                    } else a.isInRoom(e) ? this.desertRoomCounter.has(e) ? r.push(re.CHAR_MAZE_ROOM_PASSED) : r.push(re.CHAR_MAZE_ROOM) : a.isOnPath(e) ? r.push(re.CHAR_MAZE_PATH) : r.push(re.CHAR_MAZE_EMPTY)
                }
                e.unshift(r.reverse().join(""))
            }
            return e
        }
    }
    class ce {
        constructor() {
            this._alert = new se.MessageFormData, this.buttonEvent = [() => {}, () => {}]
        }
        body(e) {
            return this._alert.body(e), this
        }
        button1(e, t) {
            return this._alert.button1(e), this.buttonEvent[1] = t, this
        }
        button2(e, t) {
            return this._alert.button2(e), this.buttonEvent[0] = t, this
        }
        show(e) {
            return this._alert.show(e).then((e => {
                e.canceled || void 0 === e.selection || this.buttonEvent[e.selection]()
            })).catch((e => m.Z.throwError(e))), this
        }
        title(e) {
            return this._alert.title(e), this
        }
    }
    var ue = __webpack_require__(217);
    class he {
        constructor(e, t, n, s) {
            this.deathTimes = 0, this.fogListener = new oe(((e, t) => {
                this.dim.command.run(`fog @a[x=${this.center.x},y=${this.center.y},z=${this.center.z},r=128] remove "ruin_fog"`), this.fog = e
            }), ""), this.players = new Map, this.area = n, this.center = n.center(), this.id = d.Z.randomUUID(), he.map.set(this.id, this), this.dim = t;
            for (let s of t.getPlayers())
                if (n.contains(s.location)) {
                    this.players.set(s, !0);
                    let t = e.findClientByPlayer(s);
                    t && (t.ruinsSystem.barrier = this)
                } this.tickEvent = this.update.bind(this), this.server = e, this.manager = e.getEvents(), this.manager.register("onLongTick", this.tickEvent), this.boss = s
        }
        particle(e) {
            this.dim.spawnParticle(e, this.center)
        }
        static find(e) {
            for (let [t, n] of this.map)
                if (n.area.contains(e)) return n
        }
        setBoss(e) {
            this.boss = e
        }
        static isInBarrier(e) {
            return void 0 !== he.find(e.location)
        }
        dispose() {
            he.map.delete(this.id), this.manager.cancel("onLongTick", this.tickEvent);
            for (let e of this.clientsByPlayer()) e.ruinsSystem.barrier = void 0
        }* clientsByPlayer() {
            for (let e of this.players) {
                let t = this.server.findClientByPlayer(e[0]);
                t && (yield t)
            }
        }
        notifyDeathAdd() {
            this.deathTimes += 1;
            for (let e of this.clientsByPlayer()) e.ruinsSystem.deathTimes = this.deathTimes;
            this.deathTimes >= 3 && this.boss.onFail()
        }
        update() {
            this.dim.spawnParticle("wb:boss_barrier", this.center);
            for (let t of this.server.getPlayers()) t.location && (this.players.has(t) ? this.area.contains(t.location) ? this.players.set(t, !0) : this.players.get(t) && (this.server.setTimeout((() => {
                if (this.dim.dimension !== t.dimension) {
                    let n = w.Z.getInstance(t);
                    n.addEffect(e.MinecraftEffectTypes.resistance, 280, 10, !1), n.addEffect(e.MinecraftEffectTypes.weakness, 280, 10, !1)
                }
                w.Z.getInstance(t).setPosition(this.area.center(), this.dim.dimension)
            }), 2e3), this.players.set(t, !1)) : this.area.contains(t.location) && t.kill());
            (0, m.W)((() => this.boss.entity.location)) && !this.area.contains(this.boss.entity.location) && this.boss.exEntity.setPosition(this.area.center()), this.fog && this.dim.command.run(`fog @a[x=${this.center.x},y=${this.center.y},z=${this.center.z},r=128] push ${this.fog} "ruin_fog"`)
        }
        stop() {
            this.dispose()
        }
        changeFog(e) {
            this.fogListener.upDate(e)
        }
    }
    he.map = new Map;
    class de extends H {
        constructor() {
            super(...arguments), this.i_inviolable = new O.C("i_inviolable"), this.i_damp = new O.C("i_damp"), this.i_soft = new O.C("i_soft"), this.desertRuinRules = new le(this), this.isInRuinJudge = !1, this.causeDamage = 0, this.deathTimes = 0, this._causeDamageShow = !1, this.causeDamageType = new Set, this.causeDamageListenner = new oe(((e, t) => {
                e ? (this.causeDamageMonitor = this.client.talentSystem.hasCauseDamage.addMonitor(((e, t) => {
                    this.causeDamageType.has(t.typeId) && (this.causeDamage += e)
                })), this.deathTimesListener = e => {
                    var t;
                    this.exPlayer.health <= 0 && (null === (t = this.barrier) || void 0 === t || t.notifyDeathAdd())
                }, this.getEvents().exEvents.afterPlayerHurt.subscribe(this.deathTimesListener)) : (this.causeDamageMonitor && (this.client.talentSystem.hasCauseDamage.removeMonitor(this.causeDamageMonitor), this.causeDamageMonitor = void 0, this.client.magicSystem.deleteActionbarPass("hasCauseDamage")), this.deathTimesListener && (this.getEvents().exEvents.afterPlayerHurt.unsubscribe(this.deathTimesListener), this.deathTimesListener = void 0), this.deathTimes = 0, this.causeDamage = 0, this.causeDamageType.clear())
            }), !1), this.desertRuinBackJudge = new oe((n => {
                n && (new ce).title("返回").body("是否返回主世界?").button1("否", (() => {})).button2("是", (() => {
                    let n = this.data.dimBackPoint;
                    n || (n = new t.Z(0, 255, 0)), this.exPlayer.setPosition(n, this.getDimension(e.MinecraftDimensionTypes.overworld))
                })).show(this.player)
            }), !1), this.stoneRuinBackJudge = new oe((n => {
                n && (new ue.Z).title("操作").body("选择你的操作").button("召唤boss", (() => {
                    this.getExDimension().spawnEntity("wb:magic_stoneman", this.client.getServer().ruin_stoneBoss.getBossSpawnArea().center())
                })).button("返回主世界", (() => {
                    let n = this.data.dimBackPoint;
                    n || (n = new t.Z(0, 255, 0)), this.exPlayer.setPosition(n, this.getDimension(e.MinecraftDimensionTypes.overworld))
                })).button("取消", (() => {})).show(this.player)
            }), !1), this.caveRuinBackJudge = new oe((n => {
                n && (new ue.Z).title("操作").body("选择你的操作").button("召唤boss", (() => {
                    this.getExDimension().spawnEntity("wb:headless_guard", this.client.getServer().ruin_caveBoss.getBossSpawnArea().center())
                })).button("返回主世界", (() => {
                    let n = this.data.dimBackPoint;
                    n || (n = new t.Z(0, 255, 0)), this.exPlayer.setPosition(n, this.getDimension(e.MinecraftDimensionTypes.overworld))
                })).button("取消", (() => {})).show(this.player)
            }), !1), this.ancientRuinBackJudge = new oe((n => {
                n && (new ue.Z).title("操作").body("选择你的操作").button("召唤boss", (() => {
                    this.getExDimension().spawnEntity("wb:ancient_stone", this.client.getServer().ruin_ancientBoss.getBossSpawnArea().center())
                })).button("返回主世界", (() => {
                    let n = this.data.dimBackPoint;
                    n || (n = new t.Z(0, 255, 0)), this.exPlayer.setPosition(n, this.getDimension(e.MinecraftDimensionTypes.overworld))
                })).button("取消", (() => {})).show(this.player)
            }), !1), this.mindRuinBackJudge = new oe((n => {
                n && (new ue.Z).title("操作").body("选择你的操作").button("召唤boss", (() => {
                    this.getExDimension().spawnEntity("wb:intentions_first", this.client.getServer().ruin_mindBoss.getBossSpawnArea().center())
                })).button("返回主世界", (() => {
                    let n = this.data.dimBackPoint;
                    n || (n = new t.Z(0, 255, 0)), this.exPlayer.setPosition(n, this.getDimension(e.MinecraftDimensionTypes.overworld))
                })).button("取消", (() => {})).show(this.player)
            }), !1), this.fogChange = new oe(((e, t) => {
                this.exPlayer.command.run('fog @s remove "ruin_fog"')
            }), "")
        }
        get causeDamageShow() {
            return this._causeDamageShow
        }
        set causeDamageShow(e) {
            this._causeDamageShow = e, this.causeDamageListenner.upDate(e)
        }
        onJoin() {
            const n = new t.Z;
            new t.Z, new t.Z, this.getEvents().exEvents.onLongTick.subscribe((s => {
                var i, a, r, o, l, c, u, h, d, m;
                if (s.currentTick % 4 != 0) return;
                let p;
                n.set(this.player.location), n.y -= 1;
                try {
                    p = this.getDimension().getBlock(n.floor())
                } catch (e) {}
                "wb:portal_desertboss" === (null == p ? void 0 : p.typeId) ? (this.data.dimBackPoint = new t.Z(this.player.location).add(3, 2, 3), this.client.cache.save(), this.exPlayer.setPosition(N.randomPoint(this.client.getServer().ruin_desertBoss.getPlayerSpawnArea(), 4), this.getDimension(e.MinecraftDimensionTypes.theEnd)), 0 == (this.globalSettings.ruinsExsitsData >> K.DESERT_RUIN_NUM & 1) && (this.client.getServer().ruin_desertBoss.generate(), this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | 1 << K.DESERT_RUIN_NUM)) : "wb:portal_stoneboss" === (null == p ? void 0 : p.typeId) ? (this.data.dimBackPoint = new t.Z(this.player.location).add(3, 2, 3), this.client.cache.save(), this.exPlayer.addEffect(e.MinecraftEffectTypes.resistance, 200, 10, !0), this.exPlayer.setPosition(N.randomPoint(this.client.getServer().ruin_stoneBoss.getPlayerSpawnArea(), 0), this.getDimension(e.MinecraftDimensionTypes.theEnd)), 0 == (this.globalSettings.ruinsExsitsData >> K.STONE_RUIN_NUM & 1) && (this.client.getServer().ruin_stoneBoss.generate(), this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | 1 << K.STONE_RUIN_NUM)) : "wb:portal_caveboss" === (null == p ? void 0 : p.typeId) ? (this.data.dimBackPoint = new t.Z(this.player.location).add(3, 2, 3), this.client.cache.save(), this.exPlayer.addEffect(e.MinecraftEffectTypes.resistance, 200, 10, !0), this.exPlayer.setPosition(N.randomPoint(this.client.getServer().ruin_caveBoss.getPlayerSpawnArea(), 0), this.getDimension(e.MinecraftDimensionTypes.theEnd)), 0 == (this.globalSettings.ruinsExsitsData >> K.CAVE_RUIN_NUM & 1) && (this.client.getServer().ruin_caveBoss.generate(), this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | 1 << K.CAVE_RUIN_NUM)) : "wb:portal_ancientboss" === (null == p ? void 0 : p.typeId) ? (this.data.dimBackPoint = new t.Z(this.player.location).add(3, 2, 3), this.client.cache.save(), this.exPlayer.addEffect(e.MinecraftEffectTypes.resistance, 200, 10, !0), this.exPlayer.setPosition(N.randomPoint(this.client.getServer().ruin_ancientBoss.getPlayerSpawnArea(), 0), this.getDimension(e.MinecraftDimensionTypes.theEnd)), 0 == (this.globalSettings.ruinsExsitsData >> K.ANCIENT_RUIN_NUM & 1) && (this.client.getServer().ruin_ancientBoss.generate(), this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | 1 << K.ANCIENT_RUIN_NUM)) : "wb:portal_mindboss" === (null == p ? void 0 : p.typeId) && (this.data.dimBackPoint = new t.Z(this.player.location).add(3, 2, 3), this.client.cache.save(), this.exPlayer.addEffect(e.MinecraftEffectTypes.resistance, 200, 10, !0), this.exPlayer.setPosition(N.randomPoint(this.client.getServer().ruin_mindBoss.getPlayerSpawnArea(), 0), this.getDimension(e.MinecraftDimensionTypes.theEnd)), 0 == (this.globalSettings.ruinsExsitsData >> K.MIND_RUIN_NUM & 1) && (this.client.getServer().ruin_mindBoss.generate(), this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | 1 << K.MIND_RUIN_NUM)), he.isInBarrier(this.player) || (this.desertRuinBackJudge.upDate(null !== (a = null === (i = this.client.getServer().ruin_desertBoss.getBossSpawnArea()) || void 0 === i ? void 0 : i.contains(n)) && void 0 !== a && a && this.player.dimension.id === e.MinecraftDimensionTypes.theEnd), this.stoneRuinBackJudge.upDate(null !== (o = null === (r = this.client.getServer().ruin_stoneBoss.getBossSpawnArea()) || void 0 === r ? void 0 : r.contains(n)) && void 0 !== o && o && this.player.dimension.id === e.MinecraftDimensionTypes.theEnd), this.caveRuinBackJudge.upDate(null !== (c = null === (l = this.client.getServer().ruin_caveBoss.getBossSpawnArea()) || void 0 === l ? void 0 : l.contains(n)) && void 0 !== c && c && this.player.dimension.id === e.MinecraftDimensionTypes.theEnd), this.ancientRuinBackJudge.upDate(null !== (h = null === (u = this.client.getServer().ruin_ancientBoss.getBossSpawnArea()) || void 0 === u ? void 0 : u.contains(n)) && void 0 !== h && h && this.player.dimension.id === e.MinecraftDimensionTypes.theEnd), this.mindRuinBackJudge.upDate(null !== (m = null === (d = this.client.getServer().ruin_mindBoss.getBossSpawnArea()) || void 0 === d ? void 0 : d.contains(n)) && void 0 !== m && m && this.player.dimension.id === e.MinecraftDimensionTypes.theEnd));
                let g = !1,
                    y = !1,
                    f = !1,
                    w = !1,
                    b = !1;
                if (this.getDimension(e.MinecraftDimensionTypes.theEnd) === this.player.dimension && n.x >= K.DESERT_RUIN_LOCATION_START.x && n.x <= K.DESERT_RUIN_LOCATION_END.x && n.z >= K.DESERT_RUIN_LOCATION_START.z && n.z <= K.DESERT_RUIN_LOCATION_END.z) {
                    n.y < K.DESERT_RUIN_LOCATION_START.y - 2 && (n.y = K.DESERT_RUIN_LOCATION_START.y + 4, this.exPlayer.setPosition(n)), 3 <= n.x % 16 && n.x % 16 <= 13 && 3 <= n.z % 16 && n.z % 16 <= 13 && this.desertRuinRules.desertRuinScoreJudge.upDate(`${Math.floor((n.x-K.DESERT_RUIN_LOCATION_START.x)/16)},${Math.floor((n.y-K.DESERT_RUIN_LOCATION_START.y)/16)},${Math.floor((n.z-K.DESERT_RUIN_LOCATION_START.z)/16)}`), g = !0;
                    let e = [];
                    e = this.desertRuinRules.getShowMap(), this.client.magicSystem.setActionbarByPass("desertRuinMap", e)
                }
                if (this.desertRuinRules.inRuinsListener.upDate(g), this.getDimension(e.MinecraftDimensionTypes.theEnd) === this.player.dimension && n.x >= K.STONE_RUIN_LOCATION_START.x && n.x <= K.STONE_RUIN_LOCATION_END.x && n.z >= K.STONE_RUIN_LOCATION_START.z && n.z <= K.STONE_RUIN_LOCATION_END.z && (n.y < K.STONE_RUIN_LOCATION_START.y - 2 && (n.y = K.STONE_RUIN_LOCATION_START.y + 6, this.exPlayer.setPosition(n)), y = !0, this.exPlayer.command.run('fog @s push wb:ruin_stone_boss "ruin_fog"')), this.getDimension(e.MinecraftDimensionTypes.theEnd) === this.player.dimension && n.x >= K.CAVE_RUIN_LOCATION_START.x && n.x <= K.CAVE_RUIN_LOCATION_END.x && n.z >= K.CAVE_RUIN_LOCATION_START.z && n.z <= K.CAVE_RUIN_LOCATION_END.z && (f = !0, this.exPlayer.command.run('fog @s push wb:ruin_cave_boss "ruin_fog"')), this.getDimension(e.MinecraftDimensionTypes.theEnd) === this.player.dimension && n.x >= K.ANCIENT_RUIN_LOCATION_START.x && n.x <= K.ANCIENT_RUIN_LOCATION_END.x && n.z >= K.ANCIENT_RUIN_LOCATION_START.z && n.z <= K.ANCIENT_RUIN_LOCATION_END.z && (w = !0, this.exPlayer.command.run('fog @s push wb:ruin_ancient_boss "ruin_fog"')), this.getDimension(e.MinecraftDimensionTypes.theEnd) === this.player.dimension && n.x >= K.MIND_RUIN_LOCATION_START.x && n.x <= K.MIND_RUIN_LOCATION_END.x && n.z >= K.MIND_RUIN_LOCATION_START.z && n.z <= K.MIND_RUIN_LOCATION_END.z && (b = !0), this.causeDamageShow) {
                    let e = this.client.magicSystem.registActionbarPass("hasCauseDamage");
                    e.push(`玩家死亡: ${this.deathTimes} 次`), e.push(`造成伤害: ${this.causeDamage} 点`)
                }
                this.client.magicSystem.additionHealthShow = g, this.isInRuinJudge = g || y || f || w || b, this.fogChange.upDate(`${g}-${y}-${f}-${w}-${b}`)
            })), this.getEvents().exEvents.beforeItemUseOn.subscribe((n => {
                let s = n.block;
                if ("wb:start_key" === n.itemStack.typeId)
                    if ("wb:block_magic_equipment" === (null == s ? void 0 : s.typeId)) {
                        let s = this.client.getServer().portal_desertBoss;
                        const i = new t.Z(n.block).add(2, 2, 2),
                            a = new t.Z(n.block).sub(2, 0, 2);
                        let r = s.setArea(new N(a, i, !0)).setDimension(this.getDimension(e.MinecraftDimensionTypes.overworld)).find();
                        if (r) {
                            s.clone().analysis({
                                X: e.MinecraftBlockTypes.sandstone.id,
                                W: "wb:portal_desertboss",
                                Y: "wb:portal_desertboss",
                                A: e.MinecraftBlockTypes.air.id,
                                S: e.MinecraftBlockTypes.stoneBlockSlab2.id,
                                C: e.MinecraftBlockTypes.cobblestoneWall.id
                            }).putStructure(r);
                            const i = new t.Z(n.block).add(.5, .5, .5);
                            this.getExDimension().spawnParticle("wb:portal_desertboss_par1", i), this.getExDimension().spawnParticle("wb:portal_desertboss_par2", i)
                        }
                    } else if ("wb:block_energy_seal" === (null == s ? void 0 : s.typeId)) {
                    const s = new t.Z(n.block).add(2, 1, 2),
                        i = new t.Z(n.block).sub(2, 0, 2);
                    let a = this.client.getServer().portal_stoneBoss,
                        r = a.setArea(new N(i, s, !0)).setDimension(this.getDimension(e.MinecraftDimensionTypes.overworld)).find();
                    r && a.clone().analysis({
                        X: e.MinecraftBlockTypes.sandstone.id,
                        W: "wb:portal_stoneboss",
                        Y: "wb:portal_stoneboss",
                        S: e.MinecraftBlockTypes.cobblestoneWall.id,
                        A: e.MinecraftBlockTypes.air.id,
                        B: e.MinecraftBlockTypes.stonebrick.id
                    }).putStructure(r)
                } else if ("wb:block_energy_boundary" === (null == s ? void 0 : s.typeId)) {
                    const s = new t.Z(n.block).add(2, 1, 2),
                        i = new t.Z(n.block).sub(2, 0, 2);
                    let a = this.client.getServer().portal_caveBoss,
                        r = a.setArea(new N(i, s, !0)).setDimension(this.getDimension(e.MinecraftDimensionTypes.overworld)).find();
                    r && a.clone().analysis({
                        X: e.MinecraftBlockTypes.deepslateTiles.id,
                        W: "wb:portal_caveboss",
                        Y: "wb:portal_caveboss",
                        S: e.MinecraftBlockTypes.lantern.id,
                        A: e.MinecraftBlockTypes.air.id
                    }).putStructure(r)
                } else if ("wb:block_magic_ink" === (null == s ? void 0 : s.typeId)) {
                    const s = new t.Z(n.block).add(2, 1, 2),
                        i = new t.Z(n.block).sub(2, 0, 2);
                    let a = this.client.getServer().portal_ancientBoss,
                        r = a.setArea(new N(i, s, !0)).setDimension(this.getDimension(e.MinecraftDimensionTypes.overworld)).find();
                    r && a.clone().analysis({
                        X: e.MinecraftBlockTypes.chiseledDeepslate.id,
                        W: "wb:portal_ancientboss",
                        Y: "wb:portal_ancientboss",
                        S: e.MinecraftBlockTypes.verdantFroglight.id,
                        A: e.MinecraftBlockTypes.air.id,
                        B: e.MinecraftBlockTypes.mossyCobblestone.id
                    }).putStructure(r)
                } else if ("wb:block_senior_equipment" === (null == s ? void 0 : s.typeId)) {
                    const s = new t.Z(n.block).add(2, 1, 2),
                        i = new t.Z(n.block).sub(2, 0, 2);
                    let a = this.client.getServer().portal_mindBoss,
                        r = a.setArea(new N(i, s, !0)).setDimension(this.getDimension(e.MinecraftDimensionTypes.overworld)).find();
                    r && a.clone().analysis({
                        X: "wb:block_magic_equipment",
                        W: "wb:portal_mindboss",
                        Y: "wb:portal_mindboss",
                        S: "wb:block_magic_barrier",
                        A: e.MinecraftBlockTypes.air.id
                    }).putStructure(r)
                }
            }))
        }
        onLoaded() {}
        onLeave() {}
    }
    class me {
        constructor(e) {
            this._block = e
        }
        static getInstance(e) {
            let t = e;
            return this.propertyNameCache in t ? t[this.propertyNameCache] : t[this.propertyNameCache] = new me(t)
        }
        getPosition() {
            return new t.Z(this._block)
        }
        transTo(e) {
            n.Z.getInstance(this._block.dimension).setBlock(this.getPosition(), e)
        }
    }
    me.propertyNameCache = "exCache";
    class pe {
        constructor(e) {
            this._item = e
        }
        getItem() {
            return this._item
        }
        static getInstance(e) {
            let t = e;
            return this.propertyNameCache in t ? t[this.propertyNameCache] : t[this.propertyNameCache] = new pe(t)
        }
        getLore() {
            var e;
            return null !== (e = this._item.getLore()) && void 0 !== e ? e : []
        }
        setLore(e) {
            -1 !== e.indexOf(" ") && e.splice(e.indexOf(" "), 1), this._item.setLore(0 == e.length ? [Math.random() > .9 ? "mojang nmsl" : " "] : e)
        }
        getComponent(e) {
            return this._item.getComponent(e)
        }
        hasComponent(e) {
            return this._item.hasComponent(e)
        }
        getEnchantsComponent() {
            return this.getComponent(e.ItemEnchantsComponent.componentId)
        }
        hasEnchantsComponent() {
            return this.hasComponent(e.ItemEnchantsComponent.componentId)
        }
        getItemDurabilityComponent() {
            return this.getComponent(e.ItemDurabilityComponent.componentId)
        }
        hasItemDurabilityComponent() {
            return this.hasComponent(e.ItemDurabilityComponent.componentId)
        }
    }
    pe.propertyNameCache = "exCache";
    class ge extends H {
        onJoin() {
            this.getEvents().exEvents.afterItemOnHandChange.subscribe((e => {
                const t = this.exPlayer.getBag();
                if (e.afterItem) {
                    let n = new V(pe.getInstance(e.afterItem));
                    if (null !== n.search("enchants")) {
                        for (let t of n.entries("enchants")) try {
                            this.player.runCommandAsync("enchant @s " + t[0].replace(/[A-Z]/g, (e => "_" + e.toLowerCase())) + " " + t[1])
                        } catch (e) {}
                        let s = t.getItemOnHand();
                        null != s && (n = new V(new pe(s)), n.delete("enchants"), this.exPlayer.getBag().setItem(this.player.selectedSlot, s))
                    }
                }
            })), this.getEvents().exEvents.beforeItemUseOn.subscribe((n => {
                let s = new t.Z(n.block),
                    i = this.getExDimension().getBlock(s);
                if (i && i.typeId !== e.MinecraftBlockTypes.air.id)
                    if ("wb:block_translate" === i.typeId) {
                        n.cancel = !0;
                        let e = this.exPlayer.getBag(),
                            s = e.getItemOnHand(),
                            a = e.getItemOnHand();
                        s && a && "wb:book_cache" === s.typeId && (ge.blockTranslateData.set(new t.Z(i).toString(), s), me.getInstance(i).transTo("wb:block_translate_book"), e.clearItem(e.getSelectedSlot(), 1))
                    } else if ("wb:block_translate_book" === i.typeId) {
                    n.cancel = !0;
                    let a = this.exPlayer.getBag(),
                        r = a.getItemOnHand(),
                        o = ge.blockTranslateData.get(new t.Z(i).toString());
                    if (!o) return me.getInstance(i).transTo("wb:block_translate");
                    if (r && 1 === r.amount) {
                        let n = pe.getInstance(r),
                            l = pe.getInstance(o),
                            c = l.getItemDurabilityComponent().damage,
                            u = new pe(new e.ItemStack(c >= 4 ? e.MinecraftItemTypes.enchantedBook : e.ItemTypes.get("wb:book_cache")));
                        u.hasItemDurabilityComponent() && (u.getItemDurabilityComponent().damage = c + 1);
                        let h = new V(u);
                        if (u.setLore([...n.getLore()]), n.hasEnchantsComponent()) {
                            for (let e of n.getEnchantsComponent().enchantments) h.setValueUseMap("enchants", e.type.id, e.level + "");
                            n.getEnchantsComponent().removeAllEnchantments()
                        }
                        if (h = new V(n), h.setLore([...l.getLore()]), l.hasEnchantsComponent()) {
                            for (let e of l.getEnchantsComponent().enchantments) h.setValueUseMap("enchants", e.type.id, e.level + "");
                            l.getEnchantsComponent().removeAllEnchantments()
                        }
                        ge.blockTranslateData.delete(new t.Z(i).toString()), me.getInstance(i).transTo("wb:block_translate"), a.setItem(this.exPlayer.selectedSlot, r), this.getDimension().spawnItem(u.getItem(), s.add(0, 1, 0))
                    }
                }
            }))
        }
        onLoaded() {}
        onLeave() {}
    }
    ge.blockTranslateData = new Map, __webpack_require__(437);
    class ye extends H {
        onJoin() {
            this.getEvents().exEvents.afterItemOnHandChange.subscribe((e => {
                var t, n;
                "epic:machanical_operator" === (null === (t = e.afterItem) || void 0 === t ? void 0 : t.typeId) || "epic:alliance_token" === (null === (n = e.afterItem) || void 0 === n ? void 0 : n.typeId) ? (this.listenCannonState = e => {
                    if (e.currentTick % 4 == 0) {
                        let e = this.client.magicSystem.getActionbarByPass("cannon_state");
                        null == e || e.clear();
                        for (let t of this.getDimension().getEntities({
                                location: this.player.location,
                                closest: 1,
                                maxDistance: 3,
                                type: "epic:cannon_cart"
                            })) {
                            let n = C.Z.getInstance(t);
                            switch (null == e || e.push("加农炮战车: " + n.nameTag), t.hasTag("wbmsyh") ? null == e || e.push("    = §a友好模式§f =") : null == e || e.push("    = §4敌对模式§f ="), n.getVariant()) {
                                case 2:
                                    null == e || e.push("    攻击模式: §3[护卫]");
                                    break;
                                case 1:
                                    null == e || e.push("    攻击模式: §6[待命]");
                                    break;
                                case 3:
                                    null == e || e.push("    攻击模式: §c[破坏]")
                            }
                            switch (n.getMarkVariant()) {
                                case 1:
                                    null == e || e.push("    行动模式: §6[待命]");
                                    break;
                                case 2:
                                    null == e || e.push("    行动模式: §3[跟随]");
                                    break;
                                case 3:
                                    null == e || e.push("    行动模式: §c[自由]")
                            }
                        }
                    }
                }, this.getEvents().exEvents.onLongTick.subscribe(this.listenCannonState), this.client.magicSystem.registActionbarPass("cannon_state")) : this.listenCannonState && (this.client.magicSystem.deleteActionbarPass("cannon_state"), this.getEvents().exEvents.onLongTick.unsubscribe(this.listenCannonState), this.listenCannonState = void 0)
            }))
        }
        onLoaded() {}
        onLeave() {}
    }
    class fe extends H {
        constructor() {
            super(...arguments), this.additionHealthShow = !1, this.additionHealth = 40, this.scoresManager = this.exPlayer.getScoresManager(), this.wbflLooper = r.Z.tickTask((() => {
                this.scoresManager.getScore("wbfl") < 200 && this.scoresManager.addScore("wbfl", 2)
            })).delay(100), this.armorCoolingLooper = r.Z.tickTask((() => {
                this.scoresManager.getScore("wbkjlq") > 0 && this.scoresManager.removeScore("wbkjlq", 1)
            })).delay(20), this._anotherShow = [], this._mapShow = new Map, this.actionbarShow = r.Z.tickTask((() => {
                let e = [
                        [fe.AdditionHPChar, this.additionHealth / 100, !0, this.additionHealthShow, "HP"],
                        [fe.wbflChar, this.scoresManager.getScore("wbfl") / 200, !0, !0, "MP"],
                        [fe.weaponCoolingChar, this.scoresManager.getScore("wbwqlq") / 20, !1, !0, "CD"],
                        [fe.armorCoolingChar, this.scoresManager.getScore("wbkjlqcg") / 20, !1, !0, "CD"]
                    ],
                    t = [];
                for (let n of e) {
                    if (0 === n[1] && !n[2] || !n[3]) continue;
                    let e = "";
                    for (; n[1] >= .2;) n[1] -= .2, e += n[0][0];
                    for (n[1] < 0 && (n[1] = 0), e.length < 5 && (e += n[0][n[0].length - 1 - Math.floor(n[1] / (.2 / n[0].length))]); e.length < 5;) e += n[0][n[0].length - 1];
                    e = n[4] + ": " + e, t.push(e)
                }
                for (let e = 0; e < 100; e++) t.push("");
                t = t.concat(Array.from(this._mapShow.values()).map((e => e.join("\n§r")))), this.exPlayer.titleActionBar(t.join("\n§r"))
            })).delay(10)
        }
        registActionbarPass(e) {
            return this._mapShow.set(e, []), this.getActionbarByPass(e)
        }
        getActionbarSize() {
            return this._mapShow.size
        }
        getActionbarByPass(e) {
            return this._mapShow.get(e)
        }
        setActionbarByPass(e, t) {
            this._mapShow.set(e, t)
        }
        deleteActionbarPass(e) {
            this._mapShow.delete(e)
        }
        onJoin() {}
        onLoaded() {
            this.wbflLooper.start(), this.armorCoolingLooper.start(), this.actionbarShow.start()
        }
        onLeave() {}
        upDateByTalent(e) {
            var t, n, s;
            let i = this.exPlayer.getScoresManager();
            i.setScore("wbwqlqjs", Math.round(100 + (null !== (t = e.get(Y.CHARGING)) && void 0 !== t ? t : 0))), this.wbflLooper.stop(), this.armorCoolingLooper.stop(), this.wbflLooper.delay(100 / ((1 + (null !== (n = e.get(Y.SOURCE)) && void 0 !== n ? n : 0) / 100) * (1 + 3 * i.getScore("wbdjcg") / 100))), this.armorCoolingLooper.delay(1 / (.05 * (1 + (null !== (s = e.get(Y.RELOAD)) && void 0 !== s ? s : 0) / 100))), this.wbflLooper.start(), this.armorCoolingLooper.start()
        }
    }
    fe.weaponCoolingChar = "", fe.armorCoolingChar = "", fe.wbflChar = "", fe.AdditionHPChar = "";
    var we = __webpack_require__(342);

    function be(e, t, n) {
        if ((t = Math.round(Math.min(9999, t))) > 1e3) {
            let s = t - t % 1e3;
            e.spawnParticle("wb:show_damage_" + s, n), t -= s
        }
        if (t > 100) {
            let s = t - t % 100;
            e.spawnParticle("wb:show_damage_" + s, n), t -= s
        }
        e.spawnParticle("wb:show_damage_" + t, n)
    }
    class ve extends H {
        constructor() {
            super(...arguments), this.strikeSkill = !0, this.talentRes = new Map, this.skillLoop = r.Z.tickTask((() => {
                var e;
                if (this.data.talent.occupation.id === F.ASSASSIN.id && (this.strikeSkill = !0), this.data.talent.occupation.id === F.PRIEST.id) {
                    let t = 999,
                        n = this.exPlayer;
                    for (let e of this.player.dimension.getPlayers({
                            maxDistance: 20,
                            location: this.player.location
                        })) {
                        let s = w.Z.getInstance(e);
                        s.health < t && (t = s.health, n = s)
                    }
                    n.addHealth(this, null !== (e = this.talentRes.get(Y.REGENERATE)) && void 0 !== e ? e : 0)
                }
            })).delay(200), this.hasBeenDamaged = new o, this.hasCauseDamage = new o
        }
        updateTalentRes() {
            this.talentRes.clear();
            for (let e of this.data.talent.talents) this.talentRes.set(e.id, q.calculateTalent(this.data.talent.occupation, e.id, e.level));
            this.client.magicSystem.upDateByTalent(this.talentRes), this.data.talent.occupation.id === F.PRIEST.id || this.data.talent.occupation.id === F.ASSASSIN.id ? this.skillLoop.start() : this.skillLoop.stop()
        }
        onJoin() {
            this.getEvents().exEvents.afterPlayerHitEntity.subscribe((e => {
                var t, n, s, i, a, r, o, l;
                let c = this.exPlayer.getBag().getItemOnHand(),
                    u = 0,
                    h = 0,
                    d = C.Z.getInstance(e.hurtEntity),
                    m = d.getPosition().distance(this.exPlayer.getPosition());
                if (c) {
                    let e = new V(pe.getInstance(c)),
                        t = U.zeroIfNaN(parseFloat((null !== (a = e.getValueUseMap("addition", Y.getCharacter(this.getLang(), Y.CLOAD_PIERCING))) && void 0 !== a ? a : "->0").split("->")[1]));
                    u += Math.min(64, m) / 64 * t / 100;
                    let n = U.zeroIfNaN(parseFloat((null !== (r = e.getValueUseMap("addition", Y.getCharacter(this.getLang(), Y.ARMOR_BREAKING))) && void 0 !== r ? r : "->0").split("->")[1]));
                    h += this.exPlayer.getMaxHealth() * n / 100;
                    let s = U.zeroIfNaN(parseFloat((null !== (o = e.getValueUseMap("addition", Y.getCharacter(this.getLang(), Y.SANCTION))) && void 0 !== o ? o : "->0").split("->")[1]));
                    u += (16 - Math.min(16, m)) / 16 * s / 100;
                    let i = U.zeroIfNaN(parseFloat((null !== (l = e.getValueUseMap("addition", Y.getCharacter(this.getLang(), Y.SUDDEN_STRIKE))) && void 0 !== l ? l : "->0").split("->")[1]));
                    c.typeId.startsWith("dec:") && (u += .4), this.strikeSkill && (this.data.talent.occupation.id === F.ASSASSIN.id && this.skillLoop.startOnce(), this.strikeSkill = !1, u += i / 100)
                } else {
                    let e = null !== (t = this.talentRes.get(Y.CLOAD_PIERCING)) && void 0 !== t ? t : 0;
                    u += Math.min(64, m) / 64 * e / 100;
                    let a = null !== (n = this.talentRes.get(Y.ARMOR_BREAKING)) && void 0 !== n ? n : 0;
                    h += this.exPlayer.getMaxHealth() * a / 100;
                    let r = null !== (s = this.talentRes.get(Y.SANCTION)) && void 0 !== s ? s : 0;
                    u += (16 - Math.min(16, m)) / 16 * r / 100;
                    let o = null !== (i = this.talentRes.get(Y.SUDDEN_STRIKE)) && void 0 !== i ? i : 0;
                    this.strikeSkill && (this.data.talent.occupation.id === F.ASSASSIN.id && this.skillLoop.startOnce(), this.strikeSkill = !1, u += o / 100)
                }
                let p = e.damage * u + h;
                this.globalSettings.damageShow && be(this.getExDimension(), p, d.entity.location), this.hasCauseDamage.trigger(e.damage + p, e.hurtEntity), d.removeHealth(this, p)
            })), this.getEvents().exEvents.afterPlayerHurt.subscribe((e => {
                var t, n;
                let s = 0;
                s += ((null !== (t = this.exPlayer.getPreRemoveHealth()) && void 0 !== t ? t : 0) + e.damage) * (null !== (n = this.talentRes.get(Y.DEFENSE)) && void 0 !== n ? n : 0) / 100, this.exPlayer.addHealth(this, s), this.hasBeenDamaged.trigger(e.damage - s, e.damageSource.damagingEntity)
            }));
            let e = e => {};
            this.getEvents().exEvents.afterItemOnHandChange.subscribe((t => {
                var n, s, i, a, o;
                let l = this.exPlayer.getBag();
                if (t.afterItem && function(e) {
                        if (e.startsWith("wb:sword_") || e.startsWith("wb:staff_")) return !0;
                        if (e.startsWith("minecraft:") && ("minecraft:bow" === e || "minecraft:cross_bow" === e || -1 !== e.indexOf("_sword"))) return !0;
                        if (e.startsWith("dec:")) {
                            if (e.endsWith("_sword") || e.endsWith("_dagger") || e.endsWith("_sickle") || e.endsWith("_staff") || e.endsWith("_axe") || e.endsWith("_battleaxe") || e.endsWith("flintlock") || e.startsWith("sword_of_") || e.endsWith("_dart")) return !0;
                            let t = ["bamboo_yataghan", "absolute_zero", "growth", "angel_purification", "blood_mare", "blue_of_the_sea", "candy_cane", "cudgel", "lollipop", "hard_lollipop", "mace", "long_bread", "scimitar", "sharp_coral", "village_guardian", "flare_magic_book", "snowball_magic_book", "wave_magic_book", "giant_ivy", "god_of_sun", "night_mare", "natura_spear", "radiate_spreader", "thunder_rapier", "ghost_summoner"];
                            for (let n of t)
                                if ("dec:" + n === e) return !0
                        }
                        return !1
                    }(t.afterItem.typeId)) {
                    const a = new V(t.afterItem);
                    q.calculateTalentToLore(this.data.talent.talents, this.data.talent.occupation, pe.getInstance(t.afterItem), this.getLang()), t.afterItem.typeId.startsWith("dec:") && a.setTag("在主手时: +40％攻击伤害"), l.setItem(this.exPlayer.selectedSlot, t.afterItem);
                    let o = parseFloat(null !== (n = a.getValueUseMap("total", this.getLang().maxSingleDamage)) && void 0 !== n ? n : "0"),
                        c = parseFloat(null !== (s = a.getValueUseMap("total", this.getLang().maxSecondaryDamage)) && void 0 !== s ? s : "0"),
                        u = 0;
                    this.hasCauseDamage.removeMonitor(e), e = e => {
                        u += e, o = Math.ceil(Math.max(e, o))
                    }, this.hasCauseDamage.addMonitor(e), null === (i = this.equiTotalTask) || void 0 === i || i.stop(), (this.equiTotalTask = r.Z.tickTask((() => {
                        var e, n, s, i;
                        let r = !1;
                        c = Math.ceil(Math.max(c, u / 5)), u = 0, (null !== (e = a.getValueUseMap("total", this.getLang().maxSingleDamage)) && void 0 !== e ? e : "0") !== o + "" && (a.setValueUseMap("total", this.getLang().maxSingleDamage, o + ""), r = !0), (null !== (n = a.getValueUseMap("total", this.getLang().maxSecondaryDamage)) && void 0 !== n ? n : "0") !== c + "" && (a.setValueUseMap("total", this.getLang().maxSecondaryDamage, c + ""), r = !0), r && (null === (s = l.getItemOnHand()) || void 0 === s ? void 0 : s.typeId) === (null === (i = null == t ? void 0 : t.afterItem) || void 0 === i ? void 0 : i.typeId) && l.setItem(this.exPlayer.selectedSlot, t.afterItem)
                    })).delay(100)).start()
                } else null === (a = this.equiTotalTask) || void 0 === a || a.stop();
                this.exPlayer.triggerEvent("hp:" + Math.round(20 + (null !== (o = this.talentRes.get(Y.VIENTIANE)) && void 0 !== o ? o : 0)))
            }))
        }
        onLoaded() {
            this.updateTalentRes(),
                function(e) {
                    let t, n, s, i;
                    i = "sdgdfhfacfhllyzsFsxdTLLBo", t = i[0] + i[7] + i[13] + i[20] + i[24], s = "%AF%B7%E5%8F%8A%E6%97%B6%E9%80%9A%E7%9F%A5%E6%88%91%E4%BB%AC%EF%BC%81", n = `%E6%9C%AC${i[7]}ddon%E7%94%B1${i[7]+i[7]}%E5%89%91%E4%BE%A0%E5%92%8C${i[22]}i${i[22]}e${i[13]}i%E5%88%B6%E4%BD%9C%EF%BC%8C%E8%8B%A5%E5%8F%91%E7%8E%B0%E5%85%B6%E4%BB`, e[t](decodeURIComponent((null != n ? n : 0) + "%96%E5%9C%B0%E6%96%B9%E4%BF%A1%E6%81%AF%E8%A2%AB%E4%BF%AE%E6%94%B9%E8%BF%87%E8%AF%B7%E5%8F%8A%E6%97%B6%E9%80%9A%E7%9F%A5%E6%88%91%E4%BB%AC%EF%BC%81")), e[t]((0, we.L)("\\u0054\\u0068\\u0069\\u0073\\u0020\\u0061\\u0064\\u0064\\u006f\\u006e\\u0020\\u0069\\u0073\\u0020\\u006d\\u0061\\u0064\\u0065\\u0020\\u0062\\u0079\\u0020\\u0041\\u0041\\u0020\\u0073\\u0077\\u006f\\u0072\\u0064\\u0073\\u006d\\u0061\\u006e\\u0020\\u0061\\u006e\\u0064\\u0020\\u004c\\u0069\\u004c\\u0065\\u0079\\u0069\\u002e\\u0020\\u0049\\u0066\\u0020\\u0079\\u006f\\u0075\\u0020\\u0066\\u0069\\u006e\\u0064\\u0020\\u0074\\u0068\\u0061\\u0074\\u0020\\u0074\\u0068\\u0065\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u0020\\u0068\\u0061\\u0073\\u0020\\u0062\\u0065\\u0065\\u006e\\u0020\\u006d\\u006f\\u0064\\u0069\\u0066\\u0069\\u0065\\u0064\\u002c\\u0020\\u0070\\u006c\\u0065\\u0061\\u0073\\u0065\\u0020\\u0063\\u006f\\u006e\\u0074\\u0061\\u0063\\u0074\\u0020\\u0075\\u0073\\uff08\\u0020\\u0047\\u0069\\u0074\\u0068\\u0075\\u0062\\u0040\\u0041\\u0041\\u0073\\u0077\\u006f\\u0072\\u0064\\u006d\\u0061\\u006e\\u0020\\u006f\\u0072\\u0020\\u0054\\u0077\\u0069\\u0074\\u0074\\u0065\\u0072\\u0040\\u006c\\u0065\\u005f\\u006c\\u0079\\u0069\\u0069\\uff09"))
                }(this)
        }
        onLeave() {}
    }

    function _e(t) {
        return {
            name: "每日任务-普通级",
            tasks: [{
                name: "粮食提交一",
                conditions: [{
                    name: "小麦",
                    typeId: e.MinecraftItemTypes.wheat.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "胡萝卜",
                    typeId: e.MinecraftItemTypes.carrot.id,
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "粮食提交二",
                conditions: [{
                    name: "马铃薯",
                    typeId: e.MinecraftItemTypes.potato.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "胡萝卜",
                    typeId: e.MinecraftItemTypes.carrot.id,
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "水果提交一",
                conditions: [{
                    name: "西瓜",
                    typeId: e.MinecraftItemTypes.melonBlock.id,
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "水果提交二",
                conditions: [{
                    name: "熟鸡肉",
                    typeId: e.MinecraftItemTypes.pumpkin.id,
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "清理怪物",
                conditions: [{
                    name: "僵尸",
                    typeId: e.MinecraftEntityTypes.zombie.id,
                    count: 8,
                    type: "kill"
                }, {
                    name: "苦力怕",
                    typeId: e.MinecraftEntityTypes.creeper.id,
                    count: 2,
                    type: "kill"
                }, {
                    name: "烈焰人",
                    typeId: e.MinecraftEntityTypes.blaze.id,
                    count: 2,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "初级升级台杀手",
                conditions: [{
                    name: "初级升级台",
                    typeId: "wb:station_upgrade_a",
                    count: 1,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 175,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "狩猎愉快",
                conditions: [{
                    name: "猪",
                    typeId: e.MinecraftEntityTypes.pig.id,
                    count: 3,
                    type: "kill"
                }, {
                    name: "牛",
                    typeId: e.MinecraftEntityTypes.cow.id,
                    count: 3,
                    type: "kill"
                }, {
                    name: "羊",
                    typeId: e.MinecraftEntityTypes.sheep.id,
                    count: 3,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "砍树",
                conditions: [{
                    name: "木头",
                    typeId: e.MinecraftItemTypes.log.id,
                    count: 64,
                    type: "break"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "挖矿",
                conditions: [{
                    name: "石头",
                    typeId: e.MinecraftItemTypes.stone.id,
                    count: 64,
                    type: "break"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "采苹果",
                conditions: [{
                    name: "苹果",
                    typeId: e.MinecraftItemTypes.apple.id,
                    count: 3,
                    aux: 0,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "采毒马铃薯",
                conditions: [{
                    name: "毒马铃薯",
                    typeId: e.MinecraftItemTypes.poisonousPotato.id,
                    count: 3,
                    aux: 0,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "改善伙食",
                conditions: [{
                    name: "兔肉煲",
                    typeId: e.MinecraftItemTypes.rabbitStew.id,
                    count: 3,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "腐肉回收",
                conditions: [{
                    name: "腐肉",
                    typeId: e.MinecraftItemTypes.rottenFlesh.id,
                    count: 128,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "好吃的南瓜派",
                conditions: [{
                    name: "南瓜派",
                    typeId: e.MinecraftItemTypes.pumpkinPie.id,
                    count: 16,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "你对附魔一无所知",
                conditions: [{
                    name: "转移附魔书",
                    typeId: "wb:book_cache",
                    count: 1,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "来点灵魂",
                conditions: [{
                    name: "灵魂",
                    typeId: "dec:soul",
                    count: 8,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 125,
                    unit: "点",
                    type: "integral"
                }]
            }]
        }
    }

    function ke(t) {
        return {
            name: "每日任务-稀有级",
            tasks: [{
                name: "粮食提交一",
                conditions: [{
                    name: "小麦",
                    typeId: e.MinecraftItemTypes.wheat.id,
                    count: 128,
                    type: "item"
                }, {
                    name: "南瓜",
                    typeId: e.MinecraftItemTypes.pumpkin.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "西瓜片",
                    typeId: e.MinecraftItemTypes.melonSlice.id,
                    count: 128,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 200,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "粮食提交三",
                conditions: [{
                    name: "马铃薯",
                    typeId: e.MinecraftItemTypes.potato.id,
                    count: 128,
                    type: "item"
                }, {
                    name: "胡萝卜",
                    typeId: e.MinecraftItemTypes.carrot.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "西瓜",
                    typeId: e.MinecraftItemTypes.melonBlock.id,
                    count: 32,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 200,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "盛宴",
                conditions: [{
                    name: "熟鸡肉",
                    typeId: e.MinecraftItemTypes.cookedChicken.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "熟羊肉",
                    typeId: e.MinecraftItemTypes.cookedMutton.id,
                    count: 32,
                    type: "item"
                }, {
                    name: "生牛肉",
                    typeId: e.MinecraftItemTypes.beef.id,
                    count: 32,
                    type: "item"
                }, {
                    name: "熟兔肉",
                    typeId: e.MinecraftItemTypes.cookedRabbit.id,
                    count: 6,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 200,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "清缴怪物",
                conditions: [{
                    name: "僵尸战士",
                    typeId: "dec:zombie_warrior",
                    count: 8,
                    type: "kill"
                }, {
                    name: "地狱苦力怕",
                    typeId: "dec:nether_creeper",
                    count: 4,
                    type: "kill"
                }, {
                    name: "末影女巫",
                    typeId: "dec:ender_witch",
                    count: 2,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 225,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "中级升级台杀手",
                conditions: [{
                    name: "中级升级台",
                    typeId: "wb:station_upgrade_b",
                    count: 1,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 275,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "狩猎愉快!",
                conditions: [{
                    name: "猪",
                    typeId: e.MinecraftEntityTypes.pig.id,
                    count: 10,
                    type: "kill"
                }, {
                    name: "牛",
                    typeId: e.MinecraftEntityTypes.cow.id,
                    count: 12,
                    type: "kill"
                }, {
                    name: "羊",
                    typeId: e.MinecraftEntityTypes.sheep.id,
                    count: 9,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 200,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "砍树!",
                conditions: [{
                    name: "木头",
                    typeId: e.MinecraftItemTypes.log.id,
                    count: 128,
                    type: "break"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 175,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "成为矿工",
                conditions: [{
                    name: "石头",
                    typeId: e.MinecraftItemTypes.stone.id,
                    count: 128,
                    type: "break"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 175,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "毒马铃薯",
                conditions: [{
                    name: "毒马铃薯",
                    typeId: e.MinecraftItemTypes.poisonousPotato.id,
                    count: 16,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 225,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "改善伙食",
                conditions: [{
                    name: "兔肉煲",
                    typeId: e.MinecraftItemTypes.rabbitStew.id,
                    count: 5,
                    type: "item"
                }, {
                    name: "蘑菇煲",
                    typeId: e.MinecraftItemTypes.mushroomStew.id,
                    count: 5,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 225,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "僵尸大脑",
                conditions: [{
                    name: "僵尸大脑",
                    typeId: "dec:zombie_brain",
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 200,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "龙之力",
                conditions: [{
                    name: "末地水晶",
                    typeId: e.MinecraftItemTypes.endCrystal.id,
                    count: 4,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 250,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "附魔匠",
                conditions: [{
                    name: "转移附魔书",
                    typeId: "wb:book_cache",
                    count: 3,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 250,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "灵魂猎手",
                conditions: [{
                    name: "灵魂",
                    typeId: "dec:soul",
                    count: 32,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 250,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "海洋美食",
                conditions: [{
                    name: "海胆",
                    typeId: "dec:sea_urchin",
                    count: 4,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 225,
                    unit: "点",
                    type: "integral"
                }]
            }]
        }
    }

    function Ee(t) {
        return {
            name: "每日任务-精锐级",
            tasks: [{
                name: "大地主",
                conditions: [{
                    name: "小麦",
                    typeId: e.MinecraftItemTypes.wheat.id,
                    count: 256,
                    type: "item"
                }, {
                    name: "马铃薯",
                    typeId: e.MinecraftItemTypes.potato.id,
                    count: 256,
                    type: "item"
                }, {
                    name: "南瓜",
                    typeId: e.MinecraftItemTypes.pumpkin.id,
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 350,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "无忧粮仓",
                conditions: [{
                    name: "小麦",
                    typeId: e.MinecraftItemTypes.wheat.id,
                    count: 128,
                    type: "item"
                }, {
                    name: "马铃薯",
                    typeId: e.MinecraftItemTypes.potato.id,
                    count: 128,
                    type: "item"
                }, {
                    name: "胡萝卜",
                    typeId: e.MinecraftItemTypes.carrot.id,
                    count: 128,
                    type: "item"
                }, {
                    name: "甜菜根",
                    typeId: e.MinecraftItemTypes.beetroot.id,
                    count: 128,
                    type: "item"
                }, {
                    name: "西瓜",
                    typeId: e.MinecraftItemTypes.melonBlock.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "南瓜",
                    typeId: e.MinecraftItemTypes.pumpkin.id,
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 450,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "盛宴",
                conditions: [{
                    name: "熟鸡肉",
                    typeId: e.MinecraftItemTypes.cookedChicken.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "熟羊肉",
                    typeId: e.MinecraftItemTypes.cookedMutton.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "熟牛肉",
                    typeId: e.MinecraftItemTypes.cookedBeef.id,
                    count: 64,
                    type: "item"
                }, {
                    name: "熟兔肉",
                    typeId: e.MinecraftItemTypes.cookedRabbit.id,
                    count: 16,
                    type: "item"
                }, {
                    name: "蘑菇煲",
                    typeId: e.MinecraftItemTypes.mushroomStew.id,
                    count: 3,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 450,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "清缴怪物",
                conditions: [{
                    name: "僵尸战士",
                    typeId: "dec:zombie_warrior",
                    count: 32,
                    type: "kill"
                }, {
                    name: "地狱苦力怕",
                    typeId: "dec:nether_creeper",
                    count: 8,
                    type: "kill"
                }, {
                    name: "末影女巫",
                    typeId: "dec:ender_witch",
                    count: 6,
                    type: "kill"
                }, {
                    name: "石头傀儡",
                    typeId: "dec:stone_golem",
                    count: 3,
                    type: "kill"
                }, {
                    name: "黑曜石傀儡",
                    typeId: "dec:obsidian_golem",
                    count: 2,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 450,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "高级升级台杀手",
                conditions: [{
                    name: "高级升级台",
                    typeId: "wb:station_upgrade_c",
                    count: 1,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 450,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "凋零击败者",
                conditions: [{
                    name: "凋零",
                    typeId: e.MinecraftEntityTypes.wither.id,
                    count: 1,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 600,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "牧场主",
                conditions: [{
                    name: "猪",
                    typeId: e.MinecraftEntityTypes.pig.id,
                    count: 16,
                    type: "kill"
                }, {
                    name: "牛",
                    typeId: e.MinecraftEntityTypes.cow.id,
                    count: 20,
                    type: "kill"
                }, {
                    name: "羊",
                    typeId: e.MinecraftEntityTypes.sheep.id,
                    count: 16,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 400,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "高级矿工",
                conditions: [{
                    name: "钻石矿石",
                    typeId: e.MinecraftItemTypes.diamondOre.id,
                    count: 5,
                    type: "break"
                }, {
                    name: "煤矿矿石",
                    typeId: e.MinecraftItemTypes.coalOre.id,
                    count: 64,
                    type: "break"
                }, {
                    name: "金矿矿石",
                    typeId: e.MinecraftItemTypes.goldOre.id,
                    count: 5,
                    type: "break"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 500,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "改善伙食",
                conditions: [{
                    name: "兔肉煲",
                    typeId: e.MinecraftItemTypes.rabbitStew.id,
                    count: 8,
                    type: "item"
                }, {
                    name: "蘑菇煲",
                    typeId: e.MinecraftItemTypes.mushroomStew.id,
                    count: 8,
                    type: "item"
                }, {
                    name: "苹果汁",
                    typeId: "dec:apple_juice",
                    count: 2,
                    type: "item"
                }, {
                    name: "烤鲈鱼",
                    typeId: "dec:perch_cooked",
                    count: 32,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 450,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "魔能之力",
                conditions: [{
                    name: "高级魔能锭",
                    typeId: "wb:mineral_senior_equipment",
                    count: 5,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 700,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "附魔大师",
                conditions: [{
                    name: "转移附魔书",
                    typeId: "wb:book_cache",
                    count: 7,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 600,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "海洋美食",
                conditions: [{
                    name: "海胆",
                    typeId: "dec:sea_urchin",
                    count: 4,
                    type: "item"
                }, {
                    name: "末影鱼",
                    typeId: "dec:ender_fish",
                    count: 4,
                    type: "item"
                }, {
                    name: "三文鱼片",
                    typeId: "dec:a_piece_of_salmon",
                    count: 64,
                    type: "item"
                }, {
                    name: "金矿鱼",
                    typeId: "dec:gold_fish",
                    count: 4,
                    type: "item"
                }, {
                    name: "煤矿鱼",
                    typeId: "dec:coal_fish",
                    count: 4,
                    type: "item"
                }, {
                    name: "钻石鱼",
                    typeId: "dec:diamond_fish",
                    count: 2,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 600,
                    unit: "点",
                    type: "integral"
                }]
            }]
        }
    }

    function Te(t) {
        return {
            name: "每日任务-传说级",
            tasks: [{
                name: "食物不过如此",
                conditions: [{
                    name: "小麦",
                    typeId: e.MinecraftItemTypes.wheat.id,
                    count: 512,
                    type: "item"
                }, {
                    name: "马铃薯",
                    typeId: e.MinecraftItemTypes.potato.id,
                    count: 512,
                    type: "item"
                }, {
                    name: "胡萝卜",
                    typeId: e.MinecraftItemTypes.carrot.id,
                    count: 512,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 1250,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "排宴!!!",
                conditions: [{
                    name: "熟鸡肉",
                    typeId: e.MinecraftItemTypes.cookedChicken.id,
                    count: 256,
                    type: "item"
                }, {
                    name: "熟羊肉",
                    typeId: e.MinecraftItemTypes.cookedMutton.id,
                    count: 256,
                    type: "item"
                }, {
                    name: "熟牛肉",
                    typeId: e.MinecraftItemTypes.cookedBeef.id,
                    count: 256,
                    type: "item"
                }, {
                    name: "熟兔肉",
                    typeId: e.MinecraftItemTypes.cookedRabbit.id,
                    count: 64,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 1250,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "清缴怪物",
                conditions: [{
                    name: "僵尸战士",
                    typeId: "dec:zombie_warrior",
                    count: 64,
                    type: "kill"
                }, {
                    name: "末影女巫",
                    typeId: "dec:ender_witch",
                    count: 32,
                    type: "kill"
                }, {
                    name: "石头傀儡",
                    typeId: "dec:stone_golem",
                    count: 4,
                    type: "kill"
                }, {
                    name: "黑曜石傀儡",
                    typeId: "dec:obsidian_golem",
                    count: 2,
                    type: "kill"
                }, {
                    name: "骷髅战士",
                    typeId: "dec:skeleton_warrior",
                    count: 64,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 1250,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "传说升级台杀手",
                conditions: [{
                    name: "传说升级台",
                    typeId: "wb:station_upgrade_x",
                    count: 1,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 800,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "传说矿工",
                conditions: [{
                    name: "钻石矿石",
                    typeId: e.MinecraftItemTypes.diamondOre.id,
                    count: 16,
                    type: "break"
                }, {
                    name: "煤矿矿石",
                    typeId: e.MinecraftItemTypes.coalOre.id,
                    count: 64,
                    type: "break"
                }, {
                    name: "金矿矿石",
                    typeId: e.MinecraftItemTypes.goldOre.id,
                    count: 64,
                    type: "break"
                }, {
                    name: "铁矿矿石",
                    typeId: e.MinecraftItemTypes.ironOre.id,
                    count: 64,
                    type: "break"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 1500,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "海鲜美食家",
                conditions: [{
                    name: "海胆",
                    typeId: "dec:sea_urchin",
                    count: 8,
                    type: "item"
                }, {
                    name: "末影鱼",
                    typeId: "dec:ender_fish",
                    count: 12,
                    type: "item"
                }, {
                    name: "三文鱼片",
                    typeId: "dec:a_piece_of_salmon",
                    count: 64,
                    type: "item"
                }, {
                    name: "金矿鱼",
                    typeId: "dec:gold_fish",
                    count: 12,
                    type: "item"
                }, {
                    name: "煤矿鱼",
                    typeId: "dec:coal_fish",
                    count: 16,
                    type: "item"
                }, {
                    name: "钻石鱼",
                    typeId: "dec:diamond_fish",
                    count: 6,
                    type: "item"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 1050,
                    unit: "点",
                    type: "integral"
                }]
            }, {
                name: "觉醒龙之力",
                conditions: [{
                    name: "觉醒末影龙",
                    typeId: e.MinecraftEntityTypes.enderDragon.id,
                    count: 1,
                    type: "kill"
                }],
                rewards: [{
                    name: "模组经验",
                    count: 3500,
                    unit: "点",
                    type: "integral"
                }]
            }]
        }
    }
    class Me {
        constructor(e, t, n, s) {
            this.id = e, n instanceof Array ? (this.commands = n, s && s instanceof Array ? this.commands = this.commands.concat(s) : this.commands.push('tellraw @s[tag=task_complete] { "rawtext" : [ { "translate" : "text.dec:task_' + e + '_complete.name" } ] }', 'tellraw @s[tag=!task_complete] { "rawtext" : [ { "translate" : "text.dec:task_fail.name" } ] }', 'loot give @s[tag=task_complete] loot "tasks/' + e + '"', "xp " + t.toString() + " @s[tag=task_complete]", "replaceitem entity @s[tag=task_complete] slot.weapon.mainhand 0 air", "tag @s remove task_complete")) : !s || s instanceof Array || (this.conditions = n, this.respond = s)
        }
        title() {
            return "text.dec:task_" + this.id + "_title.name"
        }
        body() {
            return "text.dec:task_" + this.id + "_body.name"
        }
        detect(e) {
            this.commands && e.command.run(this.commands), this.conditions && this.respond && this.conditions(e) && this.respond(e)
        }
    }
    let Ie = [new Me("000", 1213, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:lava_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:lava_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:lava_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:lava_boots}] run tag @s add task_complete"]), new Me("001", 1321, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:frozen_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:frozen_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:frozen_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:frozen_boots}] run tag @s add task_complete"]), new Me("002", 1422, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:rupert_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:rupert_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:rupert_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:rupert_boots}] run tag @s add task_complete"]), new Me("003", 961, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:amethyst_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:amethyst_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:amethyst_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:amethyst_boots}] run tag @s add task_complete"]), new Me("004", 381, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:copper_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:copper_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:copper_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:copper_boots}] run tag @s add task_complete"]), new Me("005", 1623, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:crying_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:crying_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:crying_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:crying_boots}] run tag @s add task_complete"]), new Me("006", 1724, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:emerald_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:emerald_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:emerald_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:emerald_boots}] run tag @s add task_complete"]), new Me("007", 2310, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:everlasting_winter_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:everlasting_winter_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:everlasting_winter_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:everlasting_winter_boots}] run tag @s add task_complete"]), new Me("008", 945, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:knight_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=iron_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=iron_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=iron_boots}] run tag @s add task_complete"]), new Me("009", 423, ["execute if entity @s[hasitem={location=slot.armor.head,item=dec:witch_hat}] run tag @s add task_complete"]), new Me("010", 72, ["execute if entity @s[hasitem={item=paper}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s paper 0 1"]), new Me("011", 71, ["tag @s add task_complete"]), new Me("012", 0, ["tag @s add task_complete"]), new Me("013", 751, ["execute if entity @s[hasitem={item=dec:chocolates,quantity=8..}] if entity @s[hasitem={item=dec:long_bread,quantity=16..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:long_bread 0 16", "execute if entity @s[tag=task_complete] run clear @s dec:chocolates 0 8"]), new Me("014", 68, ["execute if entity @s[hasitem={item=iron_sword}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s iron_sword 0 1"]), new Me("015", 142, ["execute if entity @s[hasitem={item=yellow_flower,quantity=14..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s yellow_flower 0 14"]), new Me("016", 471, ["execute if entity @s[hasitem={item=log,data=0,quantity=64..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s log 0 64"]), new Me("017", 512, ["execute if entity @s[hasitem={item=snow,quantity=12..}] if entity @s[hasitem={item=water_bucket}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s snow 0 12", "execute if entity @s[tag=task_complete] run clear @s water_bucket 0 1"]), new Me("018", 224, ["execute if entity @s[hasitem={item=dec:candy,quantity=3..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:candy 0 3"]), new Me("019", 375, ["execute if entity @s[hasitem={item=dec:rice_wine,quantity=16..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:rice_wine 0 16"]), new Me("020", 1213, ["execute if entity @s[hasitem={item=netherite_ingot,quantity=4..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s netherite_ingot 0 4"]), new Me("021", 742, ["execute if entity @s[hasitem={item=dec:ice_ingot}] if entity @s[hasitem={item=iron_ingot,quantity=35..}] if entity @s[hasitem={item=gold_ingot,quantity=62..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:ice_ingot 0 1", "execute if entity @s[tag=task_complete] run clear @s iron_ingot 0 35", "execute if entity @s[tag=task_complete] run clear @s gold_ingot 0 62"]), new Me("022", 941, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] if entity @s[hasitem={item=amethyst_shard,quantity=42..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31", "execute if entity @s[tag=task_complete] run clear @s amethyst_shard 0 42"]), new Me("023", 421, ["execute if entity @s[hasitem={item=dec:ice_ingot}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:ice_ingot 0 1"]), new Me("024", 761, ["execute if entity @s[hasitem={item=dec:coral_ingot,quantity=4..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:coral_ingot 0 4"]), new Me("025", 761, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=14..}] if entity @s[hasitem={item=prismarine_shard,quantity=34..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 14", "execute if entity @s[tag=task_complete] run clear @s prismarine_shard 0 34"]), new Me("026", 1231, ["execute if entity @s[hasitem={item=dec:ghost_ingot,quantity=2..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:ghost_ingot 0 2"]), new Me("027", 541, ["execute if entity @s[hasitem={item=dec:pure_ingot}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:pure_ingot 0 1"]), new Me("028", 1342, ["execute if entity @s[hasitem={item=dec:steel_ingot,quantity=41..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:steel_ingot 0 41"]), new Me("029", 1433, ["execute if entity @s[hasitem={item=dec:star_debris,quantity=2..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:star_debris 0 2"]), new Me("030", 978, ["execute if entity @s[hasitem={item=dec:echo_shard,quantity=2..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:echo_shard 0 2"]), new Me("031", 134, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=13..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 13"]), new Me("032", 134, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=32..}] if entity @s[hasitem={item=lapis_lazuli,quantity=26..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 32", "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 26"]), new Me("033", 432, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=21..}] if entity @s[hasitem={item=lapis_lazuli,quantity=42..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 21", "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 42"]), new Me("034", 331, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=14..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 14"]), new Me("035", 451, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] if entity @s[hasitem={item=lapis_lazuli,quantity=42..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31", "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 42"]), new Me("036", 433, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=34..}] if entity @s[hasitem={item=lapis_lazuli,quantity=13..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 34", "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 13"]), new Me("037", 264, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=21..}] if entity @s[hasitem={item=lapis_lazuli,quantity=41..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 21", "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 41"]), new Me("038", 612, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] if entity @s[hasitem={item=lapis_lazuli,quantity=44..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31", "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 44"]), new Me("039", 951, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=71..}] if entity @s[hasitem={item=lapis_lazuli,quantity=42..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 71", "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 42"]), new Me("040", 541, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31"]), new Me("041", 845, ["execute if entity @s[hasitem={item=dec:stream_stone,quantity=72..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 72"]), new Me("042", 421, ["execute if entity @s[hasitem={item=log,quantity=64..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s log -1 64"]), new Me("043", 562, ["execute if entity @s[hasitem={item=log,quantity=73..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s log -1 73"]), new Me("044", 741, ["execute if entity @s[hasitem={item=log,quantity=134..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s log -1 134"]), new Me("045", 854, ["execute if entity @s[hasitem={item=dec:rice,quantity=85..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:rice 0 85"]), new Me("046", 951, ["execute if entity @s[hasitem={item=dec:soybean,quantity=75..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:soybean 0 75"]), new Me("047", 1034, ["execute if entity @s[hasitem={item=dec:leek,quantity=76..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:leek 0 76"]), new Me("048", 1045, ["execute if entity @s[hasitem={item=dec:bracken,quantity=73..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:bracken 0 73"]), new Me("049", 1641, ["execute if entity @s[hasitem={item=dec:houttuynia,quantity=93..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:houttuynia 0 93"]), new Me("050", 1241, ["execute if entity @s[hasitem={item=dec:fritillary,quantity=64..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:fritillary 0 64"]), new Me("051", 1541, ["execute if entity @s[hasitem={item=dec:brizarre_chilli,quantity=95..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:brizarre_chilli 0 95"]), new Me("052", 375, ["execute if entity @s[hasitem={item=dec:a_bowl_of_rice,quantity=4..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:a_bowl_of_rice 0 4"]), new Me("053", 498, ["execute if entity @s[hasitem={item=dec:potato_rice,quantity=4..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:potato_rice 0 4"]), new Me("054", 783, ["execute if entity @s[hasitem={item=dec:rice_wine,quantity=17..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:rice_wine 0 17"]), new Me("055", 273, ["execute if entity @s[hasitem={item=dec:cooked_brain,quantity=27..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:cooked_brain 0 27"]), new Me("056", 751, ["execute if entity @s[hasitem={item=dec:sea_urchin,quantity=4..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:sea_urchin 0 4"]), new Me("057", 482, ["execute if entity @s[hasitem={item=dec:shell,quantity=3..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:shell 0 3"]), new Me("058", 754, ["execute if entity @s[hasitem={item=dec:melon_piece,quantity=78..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:melon_piece 0 78"]), new Me("059", 751, ["execute if entity @s[hasitem={item=dec:fried_melon_seed,quantity=64..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:fried_melon_seed 0 64"]), new Me("060", 1752, ["execute if entity @s[hasitem={item=dec:apple_pie,quantity=74..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:apple_pie 0 74"]), new Me("061", 1342, ["execute if entity @s[hasitem={item=dec:chocolate_cookie,quantity=32..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:chocolate_cookie 0 32"]), new Me("062", 754, ["execute if entity @s[hasitem={item=dec:fried_egg,quantity=18..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:fried_egg 0 18"]), new Me("063", 571, ["execute if entity @s[hasitem={item=dec:ender_fish,quantity=6..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:ender_fish 0 6"]), new Me("064", 751, ["execute if entity @s[hasitem={item=dec:snailfish,quantity=16..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:snailfish 0 16"]), new Me("065", 1375, ["execute if entity @s[hasitem={item=dec:spiral_shell,quantity=7..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:spiral_shell 0 7"]), new Me("066", 1243, ["execute if entity @s[hasitem={item=dec:sword_fish,quantity=2..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:sword_fish 0 2"]), new Me("067", 1243, ["execute if entity @s[hasitem={item=dec:tropical_fish,quantity=72..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:tropical_fish 0 72"]), new Me("068", 1471, ["execute if entity @s[hasitem={item=dec:tropical_fish_cooked,quantity=76..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:tropical_fish_cooked 0 76"]), new Me("069", 1471, ["execute if entity @s[hasitem={item=dec:candy,quantity=75..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:candy 0 75"]), new Me("070", 1672, ["execute if entity @s[hasitem={item=dec:lollipop,quantity=14..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:lollipop 0 14"]), new Me("071", 1851, ["execute if entity @s[hasitem={item=dec:hard_lollipop,quantity=17..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:hard_lollipop 0 17"]), new Me("072", 214, ["execute if entity @s[hasitem={item=dec:long_bread}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:long_bread 0 1"]), new Me("073", 985, ["execute if entity @s[hasitem={item=dec:tofu,quantity=64..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:tofu 0 64"]), new Me("074", 276, ["execute if entity @s[hasitem={item=dec:apple_juice}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:apple_juice 0 1"]), new Me("074", 276, ["execute if entity @s[hasitem={item=dec:crab_leg,quantity=6..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:crab_leg 0 6"]), new Me("075", 457, ["execute if entity @s[hasitem={item=dec:crab_leg_cooked,quantity=6..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:crab_leg_cooked 0 6"]), new Me("077", 384, ["execute if entity @s[hasitem={item=dec:pine_cone}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:pine_cone 0 1"]), new Me("078", 572, ["execute if entity @s[hasitem={item=dec:artificial_meat,quantity=15..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:artificial_meat 0 15"]), new Me("079", 427, ["execute if entity @s[hasitem={item=dec:nautilus_alive}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:nautilus_alive 0 1"]), new Me("080", 432, ["execute if entity @s[hasitem={item=dec:a_piece_of_salmon,quantity=16..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:a_piece_of_salmon 0 16"]), new Me("081", 1864, ["execute if entity @s[hasitem={item=dec:lamprey,quantity=16..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:lamprey 0 16"]), new Me("082", 675, ["execute if entity @s[hasitem={item=dec:perch,quantity=16..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:perch 0 16"]), new Me("083", 791, ["execute if entity @s[hasitem={item=dec:perch_cooked,quantity=17..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:perch 0 17"]), new Me("084", 754, ["execute if entity @s[hasitem={item=dec:blue_jellyfish}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:blue_jellyfish 0 1"]), new Me("085", 473, ["execute if entity @s[hasitem={item=dec:pink_jellyfish}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:pink_jellyfish 0 1"]), new Me("086", 521, ["execute if entity @s[hasitem={item=dec:yellow_jellyfish}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:yellow_jellyfish 0 1"]), new Me("087", 1427, ["execute if entity @s[hasitem={item=dec:chocolates,quantity=64..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:chocolates 0 64"]), new Me("088", 1213, ["execute if entity @s[hasitem={item=dec:gingerbread_man,quantity=16..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:gingerbread_man 0 16"]), new Me("089", 746, ["execute if entity @s[hasitem={item=dec:gingerbread_sword}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:gingerbread_sword 0 1"]), new Me("090", 754, ["execute if entity @s[hasitem={item=dec:candy_cane}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:candy_cane 0 1"]), new Me("091", 781, ["execute if entity @s[hasitem={item=dec:gingerbread_totem}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:gingerbread_totem 0 1"]), new Me("092", 542, ["execute if entity @s[hasitem={item=dec:sardine,quantity=15..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:sardine 0 15"]), new Me("093", 1312, ["execute if entity @s[hasitem={item=dec:leek_cooked,quantity=81..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:leek_cooked 0 81"]), new Me("094", 572, ["execute if entity @s[hasitem={item=dec:ice_cream,quantity=3..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:ice_cream 0 3"]), new Me("095", 711, ["execute if entity @s[hasitem={item=dec:magic_ice_cream}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dec:magic_ice_cream 0 1"]), new Me("096", 157, ["execute if entity @s[hasitem={item=baked_potato}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s baked_potato 0 1"]), new Me("097", 1170, ["execute if entity @s[hasitem={item=beetroot,quantity=77..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s beetroot 0 77"]), new Me("098", 312, ["execute if entity @s[hasitem={item=bread,quantity=18..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s bread 0 18"]), new Me("099", 127, ["execute if entity @s[hasitem={item=cake}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s cake 0 1"]), new Me("100", 1210, ["execute if entity @s[hasitem={item=carrot,quantity=72..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s carrot 0 72"]), new Me("101", 1241, ["execute if entity @s[hasitem={item=chorus,quantity=251..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s chorus 0 251"]), new Me("102", 1512, ["execute if entity @s[hasitem={item=cooked_chicken,quantity=73..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s cooked_chicken 0 73"]), new Me("103", 1572, ["execute if entity @s[hasitem={item=cooked_salmon,quantity=72..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s cooked_salmon 0 72"]), new Me("104", 1542, ["execute if entity @s[hasitem={item=cooked_cod,quantity=72..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s cooked_cod 0 72"]), new Me("104", 1542, ["execute if entity @s[hasitem={item=cooked_porkchop,quantity=71..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s cooked_porkchop 0 71"]), new Me("106", 741, ["execute if entity @s[hasitem={item=rabbit,quantity=71..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s rabbit 0 71"]), new Me("107", 1513, ["execute if entity @s[hasitem={item=cooked_salmon,quantity=217..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s cooked_salmon 0 217"]), new Me("108", 774, ["execute if entity @s[hasitem={item=cookie,quantity=71..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s cookie 0 71"]), new Me("109", 794, ["execute if entity @s[hasitem={item=dried_kelp,quantity=81..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s dried_kelp 0 81"]), new Me("110", 721, ["execute if entity @s[hasitem={item=pumpkin_pie,quantity=21..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s pumpkin_pie 0 21"]), new Me("111", 711, ["execute if entity @s[hasitem={item=sweet_berries,quantity=417..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s sweet_berries 0 417"]), new Me("112", 320, ["execute if entity @s[hasitem={item=glow_berries,quantity=423..}] run tag @s add task_complete", "execute if entity @s[tag=task_complete] run clear @s glow_berries 0 423"]), new Me("113", 300, ["execute if entity @s[lm=40] run tag @s add task_complete"])],
        xe = Ie.concat([]);
    const De = ["Ao", "Jf", "Sk", "Ch", "Om", "Bs", "Hd", "Oa", "Gx", "Xe"];

    function Se(e) {
        return e.split(" ").map((e => De.indexOf(e))).join("")
    }

    function Ne(e, t, n) {
        e = U.clamp(e, 0, 1), e = Math.floor(4 * e * t);
        let s = Math.floor(e / 4),
            i = e % 4,
            a = t - s - 1,
            r = "";
        for (; s > 0;) r += n[0], s--;
        for (r.length < t && (r += n[4 - i]); a > 0;) r += n[4], a--;
        return r
    }
    let Ae = "";
    var Ce = function(e, t, n, s) {
            var i, a = arguments.length,
                r = a < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, n) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, s);
            else
                for (var o = e.length - 1; o >= 0; o--)(i = e[o]) && (r = (a < 3 ? i(r) : a > 3 ? i(t, n, r) : i(t, n)) || r);
            return a > 3 && r && Object.defineProperty(t, n, r), r
        },
        Oe = function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
        };
    class Re {
        constructor(e, t) {
            this._isKilled = !1, this.isDestroyed = !1, this._entity = e, this.server = t, this._events = new v(this), this.init(t), this.onSpawn(), (0, k.B)(this.getEvents(), this)
        }
        get entity() {
            return this._entity
        }
        set entity(e) {
            this._entity = e
        }
        get exEntity() {
            return this._exEntity
        }
        set exEntity(e) {
            this._exEntity = e
        }
        setTimeout(e, t) {
            let n = 0,
                s = i => {
                    n += 1e3 * i.deltaTime, n > t && (this.getEvents().exEvents.tick.unsubscribe(s), e())
                };
            this.getEvents().exEvents.tick.subscribe(s)
        }
        init(e) {
            this.exEntity = C.Z.getInstance(this.entity)
        }
        onSpawn() {}
        destroyTrigger() {
            this.isDestroyed || (this.isDestroyed = !0, this.onDestroy())
        }
        onDestroy() {
            this.dispose()
        }
        dispose() {
            this.getEvents().cancelAll()
        }
        getEvents() {
            return this._events
        }
        onDespawn() {
            this.onDestroy()
        }
        onKilled(e) {
            this._isKilled = !0
        }
    }
    Ce([(0, k.K)(u.A.tick, ((e, t) => {
        if (t.currentTick % 1 == 0) try {
            return void 0 === e.entity.dimension
        } catch (e) {
            return !0
        }
        return !1
    })), Oe("design:type", Function), Oe("design:paramtypes", []), Oe("design:returntype", void 0)], Re.prototype, "destroyTrigger", null), Ce([(0, k.K)(u.A.afterOnHurt, ((e, t) => e.exEntity.health <= 0 && !e._isKilled)), Oe("design:type", Function), Oe("design:paramtypes", [e.EntityHurtAfterEvent]), Oe("design:returntype", void 0)], Re.prototype, "onKilled", null);
    class Ze extends Re {
        constructor(e, t) {
            super(e, t), this.isFisrtCall = !1, this.startPos = this.exEntity.getPosition();
            let n = he.find(this.startPos);
            n ? n.setBoss(this) : (this.isFisrtCall = !0, n = new he(t, this.exEntity.exDimension, new N(this.startPos.clone().sub(32, 32, 32), this.startPos.clone().add(32, 32, 32), !0), this)), this.barrier = n, 0 === n.players.size ? (this.despawn(), this.stopBarrier(), this.destroyBossEntity()) : this.initBossEntity()
        }
        despawn() {
            this.entity.triggerEvent("minecraft:despawn")
        }
        onFail() {
            console.warn("onFail");
            for (let e of this.barrier.clientsByPlayer()) e.ruinsSystem.causeDamageShow = !1;
            this.stopBarrier(), this.destroyBossEntity(), this.server.say({
                rawtext: [{
                    translate: "text.dec:killed_by_boss.name"
                }]
            }), this.despawn()
        }
        onKilled(t) {
            this.destroyBossEntity(), t.damageSource.cause === e.EntityDamageCause.suicide && this.stopBarrier(), super.onKilled(t)
        }
        onSpawn() {
            super.onSpawn()
        }
        stopBarrier() {
            this.barrier.stop()
        }
        destroyBossEntity() {}
        initBossEntity() {}
    }
    class Le extends Ze {
        constructor(e, t) {
            super(e, t), this.music = t.getSound("music.wb.anger_of_ancient", "2:24")
        }
        initBossEntity() {
            for (let e of this.barrier.clientsByPlayer()) e.ruinsSystem.causeDamageShow = !0, e.ruinsSystem.causeDamageType.add(this.entity.typeId);
            !this.exEntity.hasIsBabyComponent() && this.isFisrtCall && (this.server.say({
                rawtext: [{
                    translate: "text.wb:summon_ancient_stone.name"
                }]
            }), this.setTimeout((() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location)
            }), 500))
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(t) {
            if (this.exEntity.hasIsBabyComponent()) {
                for (let e of this.barrier.clientsByPlayer()) e.progressTaskFinish(this.entity.typeId, e.ruinsSystem.causeDamage), e.ruinsSystem.causeDamageShow = !1;
                this.server.say({
                    rawtext: [{
                        translate: "text.wb:defeat_ancient_stone.name"
                    }]
                }), console.warn("onWin"), this.stopBarrier(), this.music.stop()
            }
            t.damageSource.cause === e.EntityDamageCause.suicide && this.music.stop(), super.onKilled(t)
        }
        onFail() {
            this.music.stop(), super.onFail()
        }
    }
    Le.typeId = "wb:ancient_stone";
    class Be extends Ze {
        constructor(e, t) {
            super(e, t), this.music = t.getSound("music.wb.unknown_world", "2:16")
        }
        initBossEntity() {
            for (let e of this.barrier.clientsByPlayer()) e.ruinsSystem.causeDamageShow = !0, e.ruinsSystem.causeDamageType.add(this.entity.typeId);
            this.isFisrtCall && (this.server.say({
                rawtext: [{
                    translate: "text.wb:summon_headless_guard.name"
                }]
            }), this.setTimeout((() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location)
            }), 500))
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            for (let e of this.barrier.clientsByPlayer()) e.progressTaskFinish(this.entity.typeId, e.ruinsSystem.causeDamage), e.ruinsSystem.causeDamageShow = !1;
            this.server.say({
                rawtext: [{
                    translate: "text.wb:defeat_headless_guard.name"
                }]
            }), console.warn("onWin"), this.stopBarrier(), this.music.stop(), super.onKilled(e)
        }
        onFail() {
            this.music.stop(), super.onFail()
        }
    }
    Be.typeId = "wb:headless_guard";
    var Ue = function(e, t, n, s) {
            var i, a = arguments.length,
                r = a < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, n) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, s);
            else
                for (var o = e.length - 1; o >= 0; o--)(i = e[o]) && (r = (a < 3 ? i(r) : a > 3 ? i(t, n, r) : i(t, n)) || r);
            return a > 3 && r && Object.defineProperty(t, n, r), r
        },
        ze = function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
        };
    class Pe extends Ze {
        constructor(e, t) {
            super(e, t)
        }
        initBossEntity() {
            for (let e of this.barrier.clientsByPlayer()) e.ruinsSystem.causeDamageShow = !0, e.ruinsSystem.causeDamageType.add(this.entity.typeId);
            this.isFisrtCall && this.server.say({
                rawtext: [{
                    translate: "text.wb:summon_intentions.name"
                }]
            }), this.barrier.changeFog("wb:ruin_mind_1_boss")
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            super.onKilled(e)
        }
        onFail() {
            super.onFail()
        }
        onLongTick(e) {
            try {
                this.exEntity.hasIsChargedComponent() && this.barrier.particle("wb:ruin_mind_boss_resist_par")
            } catch (e) {
                m.Z.throwError(e)
            }
        }
    }
    Pe.typeId = "wb:intentions_first", Ue([(0, k.K)("onLongTick"), ze("design:type", Function), ze("design:paramtypes", [Object]), ze("design:returntype", void 0)], Pe.prototype, "onLongTick", null);
    class We extends Ze {
        constructor(e, t) {
            super(e, t)
        }
        initBossEntity() {
            for (let e of this.barrier.clientsByPlayer()) e.ruinsSystem.causeDamageShow = !0, e.ruinsSystem.causeDamageType.add(this.entity.typeId);
            this.barrier.changeFog("wb:ruin_mind_2_boss")
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            super.onKilled(e)
        }
        onFail() {
            super.onFail()
        }
        onLongTick(e) {
            try {
                this.exEntity.hasIsBabyComponent() ? (this.barrier.particle("wb:ruin_mind_boss_floor_par"), this.barrier.changeFog("wb:ruin_mind_3_boss")) : this.barrier.changeFog("wb:ruin_mind_2_boss")
            } catch (e) {
                m.Z.throwError(e)
            }
        }
    }
    We.typeId = "wb:intentions_second", Ue([(0, k.K)("onLongTick"), ze("design:type", Function), ze("design:paramtypes", [Object]), ze("design:returntype", void 0)], We.prototype, "onLongTick", null);
    class Ve extends Ze {
        constructor(e, t) {
            super(e, t)
        }
        initBossEntity() {
            this.state = new oe((e => {
                switch (e) {
                    case 9:
                        this.exEntity.exDimension.spawnParticle("wb:ruin_mind_boss_third_par", this.exEntity.getPosition());
                        break;
                    case 1:
                    case 2:
                    case 3:
                        this.exEntity.exDimension.spawnParticle("wb:ruin_mind_boss_second_par", this.exEntity.getPosition())
                }
            }), 1), this.changeFog = new oe((e => {
                "wb:ruin_mind_5_boss" === e ? (this.barrier.changeFog("wb:ruin_mind_4_boss"), this.setTimeout((() => {
                    this.barrier.changeFog("wb:ruin_mind_5_boss")
                }), 5e3)) : this.barrier.changeFog(e)
            }), "");
            for (let e of this.barrier.clientsByPlayer()) e.ruinsSystem.causeDamageShow = !0, e.ruinsSystem.causeDamageType.add(this.entity.typeId);
            this.changeFog.upDate("wb:ruin_mind_5_boss")
        }
        onLongTick(e) {
            try {
                this.exEntity.hasIsBabyComponent() ? (this.barrier.particle("wb:ruin_mind_boss_floor_par"), this.changeFog.upDate("wb:ruin_mind_3_boss")) : this.changeFog.upDate("wb:ruin_mind_5_boss"), this.state.upDate(this.exEntity.getVariant())
            } catch (e) {
                m.Z.throwError(e)
            }
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            for (let e of this.barrier.clientsByPlayer()) e.progressTaskFinish(this.entity.typeId, e.ruinsSystem.causeDamage), e.ruinsSystem.causeDamageShow = !1;
            this.server.say({
                rawtext: [{
                    translate: "text.wb:defeat_intentions.name"
                }]
            }), console.warn("onWin"), this.stopBarrier(), super.onKilled(e)
        }
        onFail() {
            super.onFail()
        }
    }
    Ve.typeId = "wb:intentions_third", Ue([(0, k.K)("onLongTick"), ze("design:type", Function), ze("design:paramtypes", [Object]), ze("design:returntype", void 0)], Ve.prototype, "onLongTick", null);
    class qe extends Ze {
        constructor(e, t) {
            super(e, t)
        }
        initBossEntity() {
            for (let e of this.barrier.clientsByPlayer()) e.ruinsSystem.causeDamageShow = !0, e.ruinsSystem.causeDamageType.add(this.entity.typeId);
            this.isFisrtCall && this.server.say({
                rawtext: [{
                    translate: "text.wb:summon_magic_stoneman.name"
                }]
            })
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            for (let e of this.barrier.clientsByPlayer()) e.progressTaskFinish(this.entity.typeId, e.ruinsSystem.causeDamage), e.ruinsSystem.causeDamageShow = !1;
            this.server.say({
                rawtext: [{
                    translate: "text.wb:defeat_magic_stoneman.name"
                }]
            }), console.warn("onWin"), this.stopBarrier(), super.onKilled(e)
        }
    }
    qe.typeId = "wb:magic_stoneman";
    class Ye {
        constructor(e, t) {
            this.choose = [], this.pageNum = 0, this.maxPageNum = 4, this._uiJson = t, this._client = e
        }
        static getLabelViews(e) {
            let t = [];
            for (let n = 0; n < e.length; n++) t.push({
                type: "text",
                msg: e[n]
            });
            return t
        }
        getJSON() {
            return this._uiJson
        }
        showPage(e, t) {
            this.choose = [e, t];
            let n = this._uiJson[e].page;
            n instanceof Function && (n = n(this._client, this));
            let s = Object.keys(n).indexOf(t);
            if (-1 === s) throw new Error("Can't find page " + t);
            this.pageNum = Math.floor(s / this.maxPageNum), (0, m.to)(this.upDatePage())
        }
        upDatePage() {
            var e, t, n, s, i, a;
            return n = this, s = void 0, a = function*() {
                let n = this._uiJson[this.choose[0]].page;
                "function" == typeof n && (n = n(this._client, this));
                let s = n[this.choose[1]],
                    i = new ue.Z;
                i.body(this.choose.join(" -> ")), i.title("__pomAlertMenu");
                for (let e in this._uiJson)
                    if (e == this.choose[0]) i.button("top1_d", (() => {}), this._uiJson[e].img);
                    else {
                        const t = e;
                        i.button("top1", (() => {
                            this.choose[0] = t, this.choose[1] = this._uiJson[this.choose[0]].default, this.pageNum = 0, (0, m.to)(this.upDatePage())
                        }), this._uiJson[e].img)
                    } let a, r = Object.keys(n);
                if (r.length > this.maxPageNum) {
                    this.pageNum > 0 && i.button("top2", (() => {
                        this.pageNum -= 1, (0, m.to)(this.upDatePage())
                    }), "-- ↑ --"), a = r.slice(this.pageNum * this.maxPageNum, Math.min(r.length, (this.pageNum + 1) * this.maxPageNum));
                    let e = {};
                    for (let t of a) e[t] = n[t];
                    n = e
                }
                for (let e in n) {
                    let t = n[e].text;
                    if (e == this.choose[1]) i.button("top2_d", (() => {}), t);
                    else {
                        const n = e;
                        i.button("top2", (() => {
                            this.choose[1] = n, (0, m.to)(this.upDatePage())
                        }), t)
                    }
                }
                r.length > this.maxPageNum && this.maxPageNum * this.pageNum + 1 < r.length && i.button("top2", (() => {
                    this.pageNum += 1, (0, m.to)(this.upDatePage())
                }), "-- ↓ --");
                let o = s.page;
                if ("function" == typeof o) {
                    let e = o(this._client, this);
                    e instanceof Promise && (e = yield e), o = e
                }
                for (const n of o) switch (n.type) {
                    case "toggle":
                        n.state && i.button(n.type + "_" + (n.state(this._client, this, n) ? "on" : "off"), (() => {
                            n.function && n.function(this._client, this, n) && (0, m.to)(this.upDatePage())
                        }), n.msg);
                        break;
                    case "buttonList3":
                        3 === (null === (e = n.msgs) || void 0 === e ? void 0 : e.length) && 3 === (null === (t = n.buttons) || void 0 === t ? void 0 : t.length) && (i.button(n.type + "_1", (() => {
                            n.buttons && n.buttons[0](this._client, this, n) && (0, m.to)(this.upDatePage())
                        }), n.msgs[0]), i.button(n.type + "_2", (() => {
                            n.buttons && n.buttons[1](this._client, this, n) && (0, m.to)(this.upDatePage())
                        }), n.msgs[1]), i.button(n.type + "_3", (() => {
                            n.buttons && n.buttons[2](this._client, this, n) && (0, m.to)(this.upDatePage())
                        }), n.msgs[2]), i.button(n.type + "_4", (() => {}), " "));
                        break;
                    default:
                        i.button(n.type, (() => {
                            n.function && n.function(this._client, this, n) && (0, m.to)(this.upDatePage())
                        }), n.msg)
                }
                i.show(this._client.player)
            }, new((i = void 0) || (i = Promise))((function(e, t) {
                function r(e) {
                    try {
                        l(a.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(e) {
                    try {
                        l(a.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function l(t) {
                    var n;
                    t.done ? e(t.value) : (n = t.value, n instanceof i ? n : new i((function(e) {
                        e(n)
                    }))).then(r, o)
                }
                l((a = a.apply(n, s || [])).next())
            }))
        }
    }
    class Fe extends H {
        constructor() {
            super(...arguments), this.recordDailyArray = new Set, this.recordProgressArray = new Set
        }
        progressTaskFinish(e, t) {
            this.data.tasks.progress.data[e] = t
        }
        show(e, t) {
            let n = new Ye(this.client, function(e) {
                e.getLang();
                let t = e.exPlayer.getBag().countAllItems();
                const n = _e(),
                    s = ke(),
                    i = Ee(),
                    a = Te(),
                    r = {
                        main_dec_leavesgolem: {
                            name: "自然的愤怒",
                            conditions: [{
                                name: "绿叶精华BOSS",
                                typeId: "dec:leaves_golem",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 2e3,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_king_of_pillager: {
                            name: "战胜掠夺！",
                            conditions: [{
                                name: "掠夺者之王BOSS",
                                typeId: "dec:king_of_pillager",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 2500,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_abyssal_controller: {
                            name: "海中牢笼",
                            conditions: [{
                                name: "深海牢笼BOSS",
                                typeId: "dec:abyssal_controller",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 3e3,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_predators: {
                            name: "蝙蝠之王",
                            conditions: [{
                                name: "捕食者BOSS",
                                typeId: "dec:predators",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 4500,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_enchant_illager: {
                            name: "神秘教堂",
                            conditions: [{
                                name: "附魔师BOSS",
                                typeId: "dec:enchant_illager_2",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 4500,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_evlghost: {
                            name: "永冬之魂",
                            conditions: [{
                                name: "永冬恶魂BOSS",
                                typeId: "dec:everlasting_winter_ghast_1",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 8e3,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_escaped_soul: {
                            name: "不死灵魂",
                            conditions: [{
                                name: "逃逸之魂BOSS",
                                typeId: "dec:escaped_soul_entity",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 9e3,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_host_of_deep: {
                            name: "深渊？",
                            conditions: [{
                                name: "深渊之主BOSS",
                                typeId: "dec:host_of_deep_2",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 9e3,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_dec_ash_knight: {
                            name: "挑战灰烬",
                            conditions: [{
                                name: "灰烬骑士BOSS",
                                typeId: "dec:ash_knight",
                                damage: 1,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 7500,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        dragon: {
                            name: "结束了？",
                            conditions: [{
                                name: "觉醒末影龙",
                                typeId: "wb:magic_stoneman",
                                type: "boss_tag",
                                tagName: "wbstartkeyok"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 1e4,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_pom_1: {
                            name: "沙漠暴风",
                            conditions: [{
                                name: "魔化石块BOSS",
                                typeId: qe.typeId,
                                damage: 100,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 15e3,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_pom_2: {
                            name: "巨型洞穴",
                            conditions: [{
                                name: "无头守卫BOSS",
                                typeId: Be.typeId,
                                damage: 300,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 2e4,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_pom_3: {
                            name: "远古探索者",
                            conditions: [{
                                name: "远古石像BOSS",
                                typeId: Le.typeId,
                                damage: 400,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 3e4,
                                unit: "点",
                                type: "integral"
                            }]
                        },
                        main_pom_4: {
                            name: "心灵之境",
                            conditions: [{
                                name: "念BOSS",
                                typeId: Ve.typeId,
                                damage: 500,
                                type: "boss"
                            }],
                            rewards: [{
                                name: "模组经验",
                                count: 4e4,
                                unit: "点",
                                type: "integral"
                            }]
                        }
                    };
                return {
                    dailyTask: {
                        text: "dailyTask",
                        default: "0/" + e.data.tasks.daily.all[0][0].toString(),
                        img: "textures/items/leaves_knife.png",
                        page: (e, r) => {
                            let o = {};
                            const l = e.data.tasks.daily;
                            let c = (e, n) => {
                                var s, i, a;
                                for (const r of l.all[e]) {
                                    let c = l.complete[e].includes(r),
                                        u = !0,
                                        h = 0,
                                        d = [{
                                            type: "text_title",
                                            msg: n.name + " " + n.tasks[r].name
                                        }, {
                                            type: "padding"
                                        }, {
                                            type: "text",
                                            msg: "奖励："
                                        }];
                                    for (let e of n.tasks[r].rewards) d.push({
                                        type: "text",
                                        msg: "    " + e.name + " " + e.count + " " + e.unit
                                    });
                                    d.push({
                                        type: "padding"
                                    });
                                    for (let e of n.tasks[r].conditions) {
                                        let o = "",
                                            m = 0,
                                            p = "";
                                        "break" === e.type ? (m = null !== (s = l.cache[e.typeId]) && void 0 !== s ? s : 0, o = "破坏") : "kill" === e.type ? (m = null !== (i = l.cache[e.typeId]) && void 0 !== i ? i : 0, o = "击杀") : "item" === e.type && (o = "物品", m = null !== (a = t.get(e.typeId)) && void 0 !== a ? a : 0), m < e.count && (u = !1);
                                        let g = c ? 1 : Math.min(1, m / e.count);
                                        h += g / n.tasks[r].conditions.length, p = (m >= e.count || c ? "§a" : "§c") + "需求: " + o + " " + e.name + " " + (c ? e.count : m) + "/" + e.count + "个\n", p += Ne(g, 10, Ae), d.push({
                                            type: "textWithBg",
                                            msg: p
                                        })
                                    }
                                    u && !c && d.push({
                                        type: "padding"
                                    }, {
                                        type: "button",
                                        msg: "完成任务",
                                        function: (s, i) => {
                                            var a;
                                            for (let e of n.tasks[r].rewards) "integral" === e.type && s.exPlayer.getScoresManager().addScore("wbdjjf", e.count);
                                            for (let e of n.tasks[r].conditions) "item" === e.type && s.exPlayer.getBag().clearItem(e.typeId, e.count);
                                            return t = s.exPlayer.getBag().countAllItems(), null === (a = s.data.tasks) || void 0 === a || a.daily.complete[e].push(r), !0
                                        }
                                    }), o[e + "/" + r] = {
                                        text: (c ? "§a" : u ? "§e" : "§c") + n.tasks[r].name + ": " + (c ? "已完成" : Math.round(100 * h) + "％"),
                                        page: d
                                    }
                                }
                            };
                            return c(0, n), c(1, s), c(2, i), c(3, a), o
                        }
                    },
                    paperTask: {
                        text: "paperTask",
                        default: "1",
                        img: "textures/items/magic_scroll_blue.png",
                        page: (t, n) => {
                            let s = {},
                                i = e.exPlayer.getBag().getItemOnHand();
                            if (!i || 0 === i.getLore().length) return {
                                1: {
                                    text: "空",
                                    page: [{
                                        type: "text",
                                        msg: "你的手上未持有蓝魔法卷轴"
                                    }]
                                }
                            };
                            let a = i.getLore(),
                                r = 0;
                            for (let e of a) {
                                r++;
                                let t = [];
                                s[r] = {
                                    page: t,
                                    text: e
                                };
                                let n = Se(e);
                                const i = xe.findIndex((e => e.id === n));
                                if (-1 === i) throw new Error("Can't find task " + Se(e));
                                let a = xe[i];
                                t.push({
                                    type: "text_title",
                                    msg: a.title()
                                }, {
                                    type: "padding"
                                }, {
                                    type: "text",
                                    msg: a.body()
                                }, {
                                    type: "button",
                                    msg: "text.dec:task_complete_button.name",
                                    function: (e, t) => (a.detect(e.exPlayer), !1)
                                })
                            }
                            return s
                        }
                    },
                    progressTask: {
                        text: "progressTask",
                        default: "main_pom_1",
                        img: "textures/items/experience_book.png",
                        page: (e, n) => {
                            var s, i, a;
                            let o = {};
                            const l = e.data.tasks.progress;
                            for (const n in r) {
                                let c = r[n],
                                    u = l.complete.includes(n),
                                    h = !0,
                                    d = 0,
                                    m = [{
                                        type: "text_title",
                                        msg: c.name
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: "奖励："
                                    }];
                                for (let e of c.rewards) m.push({
                                    type: "text",
                                    msg: "    " + e.name + " " + e.count + " " + e.unit
                                });
                                m.push({
                                    type: "padding"
                                });
                                for (let t of c.conditions) {
                                    let n = "",
                                        r = 0,
                                        o = "";
                                    if ("boss" === t.type) {
                                        t.damage = null !== (s = t.damage) && void 0 !== s ? s : 1, r = null !== (i = l.data[t.typeId]) && void 0 !== i ? i : 0, n = "击杀并造成伤害", r < t.damage && (h = !1);
                                        let e = u ? 1 : Math.min(1, r / t.damage);
                                        d += e / c.conditions.length, o = (r >= t.damage || u ? "§a" : "§c") + "需求: " + n + " " + t.name + " " + (u ? t.damage : r) + "/" + t.damage + "点\n", o += Ne(e, 10, Ae)
                                    } else if ("boss_tag" === t.type) {
                                        t.tagName = null !== (a = t.tagName) && void 0 !== a ? a : "undefined", r = e.player.hasTag(t.tagName) ? 1 : 0, n = "击杀", r < 1 && (h = !1);
                                        let s = u ? 1 : Math.min(1, r / 1);
                                        d += s / c.conditions.length, o = (r >= 1 || u ? "§a" : "§c") + "需求: " + n + " " + t.name + " " + (u ? 1 : r) + "/1个\n", o += Ne(s, 10, Ae)
                                    }
                                    m.push({
                                        type: "textWithBg",
                                        msg: o
                                    })
                                }
                                h && !u && m.push({
                                    type: "padding"
                                }, {
                                    type: "button",
                                    msg: "完成任务",
                                    function: (e, s) => {
                                        for (let t of c.rewards) "integral" === t.type && e.exPlayer.getScoresManager().addScore("wbdjjf", t.count);
                                        return t = e.exPlayer.getBag().countAllItems(), l.complete.push(n), !0
                                    }
                                }), o[n] = {
                                    text: (u ? "§a" : h ? "§e" : "§c") + c.name + ": " + (u ? "已完成" : Math.round(100 * d) + "％"),
                                    page: m
                                }
                            }
                            return o
                        }
                    }
                }
            }(this));
            e && t || (e = "dailyTask", t = n.getJSON()[e].default), n.showPage(e, t)
        }
        onJoin() {
            this.data.tasks || (this.data.tasks = {
                daily: {
                    complete: [
                        [],
                        [],
                        [],
                        []
                    ],
                    all: [
                        [],
                        [],
                        [],
                        []
                    ],
                    date: "1970-2-31",
                    cache: {}
                },
                progress: {
                    complete: [],
                    data: {}
                }
            });
            let e = new Date,
                t = `${e.getFullYear()}-${e.getMonth()}-${e.getDay()}`,
                n = e => Math.floor(e.length * Math.random()),
                s = _e(this.getLang()).tasks,
                i = ke(this.getLang()).tasks,
                a = Ee(this.getLang()).tasks,
                r = Te(this.getLang()).tasks;
            this.data.tasks.daily.date !== t && (this.data.tasks.daily.all = [
                [n(s), n(s), n(s)],
                [n(i), n(i)],
                [n(a)],
                [n(r)]
            ], this.data.tasks.daily.complete = [
                [],
                [],
                [],
                []
            ], this.data.tasks.daily.cache = {}, this.data.tasks.daily.date = t);
            for (let e of s)
                for (let t of e.conditions) "break" !== t.type && "kill" !== t.type || this.recordDailyArray.add(t.typeId);
            for (let e of i)
                for (let t of e.conditions) "break" !== t.type && "kill" !== t.type || this.recordDailyArray.add(t.typeId);
            for (let e of a)
                for (let t of e.conditions) "break" !== t.type && "kill" !== t.type || this.recordDailyArray.add(t.typeId);
            for (let e of r)
                for (let t of e.conditions) "break" !== t.type && "kill" !== t.type || this.recordDailyArray.add(t.typeId);
            this.getEvents().exEvents.afterBlockBreak.subscribe((e => {
                var t;
                this.data.tasks && this.recordDailyArray.has(e.brokenBlockPermutation.type.id) && (this.data.tasks.daily.cache[e.brokenBlockPermutation.type.id] = 1 + (null !== (t = this.data.tasks.daily.cache[e.brokenBlockPermutation.type.id]) && void 0 !== t ? t : 0))
            })), this.getEvents().exEvents.afterPlayerHitEntity.subscribe((e => {
                var t;
                this.data.tasks && this.recordDailyArray.has(e.hurtEntity.typeId) && C.Z.getInstance(e.hurtEntity).getMaxHealth() < 0 && (this.data.tasks.daily.cache[e.hurtEntity.typeId] = 1 + (null !== (t = this.data.tasks.daily.cache[e.hurtEntity.typeId]) && void 0 !== t ? t : 0))
            }))
        }
        onLoaded() {}
        onLeave() {}
    }
    class je extends H {
        onJoin() {
            this.getEvents().exEvents.afterBlockBreak.subscribe((e => {
                var n;
                const s = null === (n = this.exPlayer.getBag().getItemOnHand()) || void 0 === n ? void 0 : n.typeId;
                "wb:axex_equipment_a" === s ? e.brokenBlockPermutation.hasTag("log") && this.chainDigging(new t.Z(e.block), e.brokenBlockPermutation.type.id, 16) : "wb:pickaxex_equipment_a" === s && this.globalSettings.chainMining && this.chainDigging(new t.Z(e.block), e.brokenBlockPermutation.type.id, 5)
            })), this.getEvents().exEvents.beforeItemUseOn.subscribe((e => {
                var t, n;
                "wb:technology_world_explorer" === e.itemStack.typeId && this.sayTo(null !== (n = null === (t = e.block) || void 0 === t ? void 0 : t.typeId) && void 0 !== n ? n : "")
            })), this.getEvents().exEvents.beforeItemUse.subscribe((n => {
                const s = n.itemStack;
                "wb:power" == s.typeId ? this.data.lang ? new Ye(this.client, function(e) {
                    return {
                        main: {
                            img: "textures/items/wet_paper",
                            text: e.menuUIMsgBailan1,
                            default: "notice",
                            page: {
                                notice: {
                                    text: e.menuUISubtitleGonggao,
                                    page: [{
                                        type: "img_adjustToScreen",
                                        msg: "textures/ui/title.png"
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgGonggao1
                                    }]
                                },
                                version: {
                                    text: e.menuUIMsgBailan5,
                                    page: (t, n) => [{
                                        type: "text_title",
                                        msg: e.menuUIMsgBanben1
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBanben2
                                    }, {
                                        type: "text",
                                        msg: i.Z.config.addonVersion
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBanben3
                                    }, {
                                        type: "text",
                                        msg: "https://aaswordman.github.io/ThePoetryOfWinter/"
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text_title",
                                        msg: e.menuUIMsgBanben4
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBanben5
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text_title",
                                        msg: e.menuUIMsgBanben6
                                    }, {
                                        type: "padding"
                                    }].concat(Ye.getLabelViews("\n名字排序为随机排序\n\nMain creator:   - LiLeyi   AAswordsman\nAssistants:  -  \nEnderghostScale  - 人造肉、部分怪物、投掷炸药和技术支持\nhaveyouwantto - 技术支持\nhuo鱼一只 - 技术支持\nAR_UnryAllenCN - 技术支持\n世心 - 狼人，暗狼人\n論娘 - 幻术师\n荷叶 - 提供灵感，新手指南\nQ儿 - 贴图、提供灵感\nSpiffyTerror - 模型、生物动画\n悸动天使 - 指令支持\n晴风 - 霸体核心\n画盒豆腐 - 提供灵感\n兔块子 - 部分实体\n传说中阿库西斯教教徒 - 提供灵感、剧情、建筑\n枫雪白霜 - 提供灵感和贴图\n碧月狐DADA - 技术支持\nFulank彡North cat - 提供贴图、灵感\n一只朴实无华的蒜头王八 - 提供贴图、灵感和测试\nKirisamePPSH - 提供建筑、贴图\nMiku4962 - 提供贴图和测试\nMr.龙灵 - 提供结构和贴图\nHanyi寒翼 - 灵感、建筑和贴图\n鸥吃鱼 - 部分翻译\nKucerLuo - 建筑\nRepforce - 建筑\n一只有疑问的猪 - 建筑\n枨触 - 建筑\n豆沙 - 部分怪物\n某不知名的琦玉 - 灵感\nHim1025(kALE) - 部分贴图、logo、icon、剧情、建筑、模型动画、加农炮战车\nWINDes - 任务清单、测试、灵感、部分\n文海求生 - 任务清单、测试反馈\nALiFang ZHE - 部分模型、贴图\n屑屑猹 - 部分翻译\n\nOur Team\n竹翼团队     无上蓝痕(BlueMark Studio)\n\nSpecial Thanks\nBunBun不是笨笨    在矿里的小金呀\n".split("\n")))
                                },
                                imp: {
                                    text: e.menuUIMsgBailan6,
                                    page: (e, t) => Ye.getLabelViews(X.split("\n"))
                                },
                                QA: {
                                    text: "Q & A",
                                    page: [{
                                        type: "padding"
                                    }, {
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan103
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan104
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan7
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan8
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan9
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan10
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan11
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan12
                                    }]
                                }
                            }
                        },
                        person: {
                            img: "textures/items/amethyst_chestplate.png",
                            text: e.menuUIMsgBailan13,
                            default: "info",
                            page: {
                                info: {
                                    text: e.menuUIMsgBailan14,
                                    page: (t, n) => {
                                        let s = t.player,
                                            i = w.Z.getInstance(s).getScoresManager(),
                                            a = [`   ${e.menuUIMsgBailan94}: ${t.gameId}`, `   ${e.menuUIMsgBailan96}: ${i.getScore("wbfl")}`, `   ${e.menuUIMsgBailan97}: ${i.getScore("wbwqlq")}`, `   ${e.menuUIMsgBailan98}: ${i.getScore("wbkjlqcg")}`, `   ${e.menuUIMsgBailan99}: ${s.hasTag("wbmsyh")?e.menuUIMsgBailan15:e.menuUIMsgBailan16}`, `   ${e.menuUIMsgBailan100}: ${s.hasTag("wbdjeff")?e.menuUIMsgBailan15:e.menuUIMsgBailan16}`],
                                            r = Ye.getLabelViews(a);
                                        r.unshift({
                                            type: "text_title",
                                            msg: "个人信息"
                                        });
                                        let o = i.getScore("wbdjcg"),
                                            l = i.getScore("wbdjjf");
                                        return r.push({
                                            type: "textWithBg",
                                            msg: `${e.menuUIMsgBailan95}: ${o} 当前等级积分: ${l}/${150*Math.pow(o,2)+1050*o+900}\n${Ne((l-(150*Math.pow(o-1,2)+1050*(o-1)+900))/(300*o+900),10,Ae)}`
                                        }), r
                                    }
                                },
                                add: {
                                    text: e.menuUIMsgBailan19,
                                    page: [{
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan20
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan21
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "toggle",
                                        msg: e.menuUIMsgBailan22,
                                        state: (e, t) => e.player.hasTag("wbdjeff"),
                                        function: (e, t) => (e.player.hasTag("wbdjeff") ? e.player.removeTag("wbdjeff") : e.player.addTag("wbdjeff"), !0)
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan23
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan24
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "button",
                                        msg: e.menuUIMsgBailan25,
                                        function: (e, t) => (e.player.removeTag("pflame"), !0)
                                    }, {
                                        type: "button",
                                        msg: e.menuUIMsgBailan26,
                                        function: (e, t) => (e.player.removeTag("phalo"), !0)
                                    }, {
                                        type: "button",
                                        msg: e.menuUIMsgBailan27,
                                        function: (e, t) => (e.player.removeTag("prune"), !0)
                                    }, {
                                        type: "button",
                                        msg: e.menuUIMsgBailan28,
                                        function: (e, t) => (e.player.removeTag("plove"), !0)
                                    }]
                                },
                                talent: {
                                    text: e.menuUIMsgBailan29,
                                    page: (t, n) => {
                                        var s;
                                        let i;
                                        if (q.hasOccupation(t.data.talent)) {
                                            const n = 2 * t.exPlayer.getScoresManager().getScore("wbdjcg") - (null !== (s = t.data.talent.pointUsed) && void 0 !== s ? s : 0);
                                            i = [{
                                                type: "text",
                                                msg: e.menuUIMsgBailan30 + n
                                            }];
                                            for (let e of t.data.talent.talents) {
                                                i.push({
                                                    type: "text",
                                                    msg: q.getDescription(t.getLang(), t.data.talent.occupation, e.id, e.level)
                                                }, {
                                                    type: "textWithBg",
                                                    msg: Y.getCharacter(t.getLang(), e.id) + ": " + e.level + "\n" + Ne(e.level / 40, 10, "")
                                                });
                                                let s = s => () => {
                                                    var i;
                                                    return n > 0 && e.level < 40 && (s = Math.min(Math.min(s, 40 - e.level), n), e.level += s, t.data.talent.pointUsed = s + (null !== (i = t.data.talent.pointUsed) && void 0 !== i ? i : 0), t.data.talent.talents.splice(t.data.talent.talents.findIndex((t => t.id === e.id)), 1), t.data.talent.talents.unshift(e), t.talentSystem.updateTalentRes()), !0
                                                };
                                                i.push({
                                                    type: "buttonList3",
                                                    msgs: ["+1", "+2", "+5"],
                                                    buttons: [s(1), s(2), s(5)]
                                                }, {
                                                    type: "padding"
                                                })
                                            }(!t.data.occupationChooseDate || (new Date).getTime() - t.data.occupationChooseDate >= 12096e5) && i.push({
                                                type: "button",
                                                msg: "清空职业",
                                                function: (e, t) => (e.data.occupationChooseDate = (new Date).getTime(), e.data.talent.occupation = F.EMPTY, e.data.talent.talents = [], e.data.talent.pointUsed = 0, e.talentSystem.updateTalentRes(), !0)
                                            })
                                        } else {
                                            i = [{
                                                type: "text_title",
                                                msg: e.menuUIMsgBailan31
                                            }, {
                                                type: "padding"
                                            }];
                                            for (const e of F.keys) i.push({
                                                type: "button",
                                                msg: e.getCharacter(t.getLang()),
                                                function: (t, n) => (q.chooseOccupation(t.data.talent, e), t.talentSystem.updateTalentRes(), !0)
                                            })
                                        }
                                        return i
                                    }
                                },
                                deathback: {
                                    text: e.menuUIMsgBailan32,
                                    page: (n, s) => {
                                        null == n.data.pointRecord && (n.data.pointRecord = {
                                            deathPoint: [],
                                            point: []
                                        });
                                        let i = [{
                                            type: "text_title",
                                            msg: e.menuUIMsgBailan33
                                        }, {
                                            type: "padding"
                                        }];
                                        if (n.globalSettings.tpPointRecord && !n.ruinsSystem.isInRuinJudge) {
                                            for (let s = 0; s < n.data.pointRecord.point.length; s++) {
                                                const a = n.data.pointRecord.point[s],
                                                    r = new t.Z(a[2]);
                                                i.push({
                                                    type: "textWithBg",
                                                    msg: e.menuUIMsgBailan34 + (a[0] + r.toString()) + "\n" + a[1]
                                                }, {
                                                    type: "buttonList3",
                                                    msgs: [e.menuUIMsgBailan35, e.menuUIMsgBailan38, e.menuUIMsgBailan40],
                                                    buttons: [(t, n) => {
                                                        let s = t.exPlayer.getBag();
                                                        if (!s.hasItem("wb:conveyor_issue") && t.globalSettings.tpNeedItem) return t.sayTo(e.menuUIMsgBailan36), !1;
                                                        if (t.globalSettings.tpNeedItem) {
                                                            let e = s.searchItem("wb:conveyor_issue"),
                                                                t = s.getItem(e);
                                                            t.amount--, s.setItem(e, t)
                                                        }
                                                        return t.exPlayer.setPosition(r, t.getDimension(a[0])), t.sayTo(e.menuUIMsgBailan37), !1
                                                    }, (t, n) => ((new se.ModalFormData).textField(e.menuUIMsgBailan39, a[0] + r.toString()).show(t.player).then((e => {
                                                        var t;
                                                        e.canceled || (a[1] = String((null === (t = null == e ? void 0 : e.formValues) || void 0 === t ? void 0 : t[0]) || ""))
                                                    })).catch((e => {
                                                        m.Z.throwError(e)
                                                    })), !1), (e, t) => {
                                                        var n;
                                                        return null === (n = e.data.pointRecord) || void 0 === n || n.point.splice(s, 1), !0
                                                    }]
                                                }, {
                                                    type: "padding"
                                                })
                                            }
                                            i.push({
                                                msg: e.menuUIMsgBailan41 + n.exPlayer.getPosition().floor().toString(),
                                                type: "button",
                                                function: (e, t) => {
                                                    var n;
                                                    return null === (n = e.data.pointRecord) || void 0 === n || n.point.push([e.exPlayer.dimension.id, "", e.exPlayer.getPosition().floor()]), !0
                                                }
                                            })
                                        } else i.push({
                                            type: "text",
                                            msg: e.menuUIMsgBailan42
                                        });
                                        return i
                                    }
                                },
                                other: {
                                    text: "其他",
                                    page: [{
                                        type: "button",
                                        msg: "任务界面",
                                        function: (e, t) => (e.taskUI(), !1)
                                    }, {
                                        type: "button",
                                        msg: "剧情线",
                                        function: (e, t) => (e.taskUI(), !1)
                                    }]
                                }
                            }
                        },
                        social: {
                            img: "textures/items/gingerbread_totem.png",
                            text: e.menuUIMsgBailan46,
                            default: "setting",
                            page: {
                                setting: {
                                    text: e.menuUIMsgBailan47,
                                    page: [{
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan48
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan49
                                    }, {
                                        type: "text",
                                        msg: e.menuUIMsgBailan50
                                    }, {
                                        type: "padding"
                                    }, {
                                        type: "button",
                                        msg: e.menuUIMsgBailan51,
                                        function: (e, t) => (e.player.addTag("wbmsyh"), e.player.nameTag.startsWith("§") && (e.player.nameTag = e.player.nameTag.substring(2)), e.player.nameTag = "§a" + e.player.nameTag, !0)
                                    }, {
                                        type: "button",
                                        msg: e.menuUIMsgBailan48,
                                        function: (e, t) => (e.player.removeTag("wbmsyh"), e.player.nameTag.startsWith("§") && (e.player.nameTag = e.player.nameTag.substring(2)), e.player.nameTag = "§c" + e.player.nameTag, !0)
                                    }]
                                },
                                tp: {
                                    text: e.menuUIMsgBailan53,
                                    page: (t, n) => {
                                        return s = this, i = void 0, r = function*() {
                                            var n;
                                            if (!t.globalSettings.playerCanTp || t.ruinsSystem.isInRuinJudge) return [{
                                                type: "text",
                                                msg: e.menuUIMsgBailan54
                                            }];
                                            let s = [];
                                            s.push({
                                                msg: e.menuUIMsgBailan55,
                                                type: "text_title"
                                            }), s.push({
                                                type: "padding"
                                            });
                                            let i = null !== (n = yield t.getPlayersAndIds()) && void 0 !== n ? n : [];
                                            for (const t of i) {
                                                const n = w.Z.getInstance(t[0]);
                                                s.push({
                                                    type: "button",
                                                    msg: `${n.nameTag} pos:${n.getPosition().floor()}`,
                                                    function: (s, i) => {
                                                        let a = s.exPlayer.getBag();
                                                        if (!a.hasItem("wb:conveyor_issue") && s.globalSettings.tpNeedItem) return s.sayTo(e.menuUIMsgBailan36), !1;
                                                        if (s.globalSettings.tpNeedItem) {
                                                            let e = a.searchItem("wb:conveyor_issue"),
                                                                t = a.getItem(e);
                                                            t.amount--, a.setItem(e, t)
                                                        }
                                                        return s.sayTo(e.menuUIMsgBailan57), (new ce).title(e.menuUIMsgBailan58).body(`玩家 ${s.player.nameTag} §r想要传送到你的位置，是否接受？`).button1(e.menuUIMsgBailan15, (() => {
                                                            s.sayTo(e.menuUIMsgBailan37), s.sayTo(e.menuUIMsgBailan37, t[0]), s.exPlayer.setPosition(n.getPosition(), n.dimension)
                                                        })).button2(e.menuUIMsgBailan16, (() => {
                                                            s.sayTo(e.menuUIMsgBailan63), s.sayTo(e.menuUIMsgBailan64, t[0])
                                                        })).show(t[0]), !1
                                                    }
                                                })
                                            }
                                            s.push({
                                                msg: e.menuUIMsgBailan65,
                                                type: "text_title"
                                            }), s.push({
                                                type: "padding"
                                            });
                                            for (const t of i) {
                                                const n = w.Z.getInstance(t[0]);
                                                s.push({
                                                    type: "button",
                                                    msg: `${n.nameTag} (pos:${n.getPosition().floor()})`,
                                                    function: (s, i) => {
                                                        let a = s.exPlayer.getBag();
                                                        if (!a.hasItem("wb:conveyor_issue") && s.globalSettings.tpNeedItem) return s.sayTo(e.menuUIMsgBailan36), !1;
                                                        if (s.getServer().findClientByPlayer(t[0]).ruinsSystem.isInRuinJudge) return s.sayTo("§b对方在遗迹中，申请失败"), !1;
                                                        if (s.globalSettings.tpNeedItem) {
                                                            let e = a.searchItem("wb:conveyor_issue"),
                                                                t = a.getItem(e);
                                                            t.amount--, a.setItem(e, t)
                                                        }
                                                        return s.sayTo(e.menuUIMsgBailan67), (new ce).title(e.menuUIMsgBailan58).body(`玩家 ${s.player.nameTag} §r邀请你传送到 pos:${s.exPlayer.getPosition().floor()} ，是否接受？`).button1(e.menuUIMsgBailan15, (() => {
                                                            s.sayTo(e.menuUIMsgBailan37), s.sayTo(e.menuUIMsgBailan37, t[0]), n.setPosition(s.exPlayer.getPosition(), s.exPlayer.dimension)
                                                        })).button2(e.menuUIMsgBailan16, (() => {
                                                            s.sayTo(e.menuUIMsgBailan73), s.sayTo(e.menuUIMsgBailan74, t[0])
                                                        })).show(t[0]), !1
                                                    }
                                                })
                                            }
                                            return s
                                        }, new((a = void 0) || (a = Promise))((function(e, t) {
                                            function n(e) {
                                                try {
                                                    l(r.next(e))
                                                } catch (e) {
                                                    t(e)
                                                }
                                            }

                                            function o(e) {
                                                try {
                                                    l(r.throw(e))
                                                } catch (e) {
                                                    t(e)
                                                }
                                            }

                                            function l(t) {
                                                var s;
                                                t.done ? e(t.value) : (s = t.value, s instanceof a ? s : new a((function(e) {
                                                    e(s)
                                                }))).then(n, o)
                                            }
                                            l((r = r.apply(s, i || [])).next())
                                        }));
                                        var s, i, a, r
                                    }
                                }
                            }
                        },
                        setting: {
                            img: "textures/items/artificial_meat_creator_on.png",
                            text: e.menuUIMsgBailan75,
                            default: "op",
                            page: {
                                personal: {
                                    text: e.menuUIMsgBailan101,
                                    page: [{
                                        type: "button",
                                        msg: e.menuUIMsgBailan102,
                                        function: (e, t) => ((new se.ModalFormData).title("Choose a language").dropdown("Language List", ["English", "简体中文"], 0).show(e.player).then((t => {
                                            t.canceled || (e.data.lang = t.formValues && 0 == t.formValues[0] ? "en" : "zh")
                                        })).catch((e => {
                                            m.Z.throwError(e)
                                        })), !1)
                                    }]
                                },
                                op: {
                                    text: e.menuUIMsgBailan76,
                                    page: (t, n) => t.player.hasTag("owner") ? [{
                                        type: "text_title",
                                        msg: e.menuUIMsgBailan77
                                    }, {
                                        type: "toggle",
                                        msg: e.menuUIMsgBailan78,
                                        state: (e, t) => e.globalSettings.playerCanTp,
                                        function: (e, t) => (e.globalSettings.playerCanTp = !e.globalSettings.playerCanTp, !0)
                                    }, {
                                        type: "toggle",
                                        msg: e.menuUIMsgBailan79,
                                        state: (e, t) => e.globalSettings.tpNeedItem,
                                        function: (e, t) => (e.globalSettings.tpNeedItem = !e.globalSettings.tpNeedItem, !0)
                                    }, {
                                        type: "toggle",
                                        msg: e.menuUIMsgBailan80,
                                        state: (e, t) => e.globalSettings.entityCleaner,
                                        function: (e, t) => (e.globalSettings.entityCleaner = !e.globalSettings.entityCleaner, e.getServer().upDateEntityCleaner(), !0)
                                    }, {
                                        type: "toggle",
                                        msg: e.menuUIMsgBailan82,
                                        state: (e, t) => e.globalSettings.tpPointRecord,
                                        function: (e, t) => (e.globalSettings.tpPointRecord = !e.globalSettings.tpPointRecord, !0)
                                    }, {
                                        type: "toggle",
                                        msg: "伤害显示",
                                        state: (e, t) => e.globalSettings.damageShow,
                                        function: (e, t) => (e.globalSettings.damageShow = !e.globalSettings.damageShow, !0)
                                    }, {
                                        type: "toggle",
                                        msg: "魔能镐连锁挖矿",
                                        state: (e, t) => e.globalSettings.chainMining,
                                        function: (e, t) => (e.globalSettings.chainMining = !e.globalSettings.chainMining, !0)
                                    }, {
                                        type: "toggle",
                                        msg: "初始魔能镐",
                                        state: (e, t) => e.globalSettings.initialMagicPickaxe,
                                        function: (e, t) => (e.globalSettings.initialMagicPickaxe = !e.globalSettings.initialMagicPickaxe, e.runMethodOnEveryClient((e => e.itemUseFunc.initialMagicPickaxe())), !0)
                                    }] : [{
                                        type: "text",
                                        msg: e.menuUIMsgBailan83
                                    }]
                                },
                                set: {
                                    text: e.menuUIMsgBailan84,
                                    page: (t, n) => t.player.hasTag("owner") ? [{
                                        type: "button",
                                        msg: e.menuUIMsgBailan85,
                                        function: (t, n) => ((new se.ModalFormData).toggle(e.menuUIMsgBailan80, t.globalSettings.entityCleaner).slider(e.menuUIMsgBailan91, 40, 1e3, 20, t.globalSettings.entityCleanerLeastNum).slider(e.menuUIMsgBailan92, 2, 10, 1, t.globalSettings.entityCleanerStrength).slider(e.menuUIMsgBailan93, 1, 60, 1, t.globalSettings.entityCleanerDelay).show(t.player).then((e => {
                                            var n, s, i, a, r, o, l, c;
                                            e.canceled || (t.globalSettings.entityCleaner = Boolean(null !== (s = null === (n = e.formValues) || void 0 === n ? void 0 : n[0]) && void 0 !== s && s), t.globalSettings.entityCleanerLeastNum = Number(null !== (a = null === (i = e.formValues) || void 0 === i ? void 0 : i[1]) && void 0 !== a ? a : 200), t.globalSettings.entityCleanerStrength = Number(null !== (o = null === (r = e.formValues) || void 0 === r ? void 0 : r[2]) && void 0 !== o ? o : 5), t.globalSettings.entityCleanerDelay = Number(null !== (c = null === (l = e.formValues) || void 0 === l ? void 0 : l[3]) && void 0 !== c ? c : 30))
                                        })).catch((e => {
                                            m.Z.throwError(e)
                                        })), !1)
                                    }] : [{
                                        type: "text",
                                        msg: e.menuUIMsgBailan83
                                    }]
                                }
                            }
                        }
                    }
                }(this.getLang())).showPage("main", "notice") : (new se.ModalFormData).title("Choose a language").dropdown("Language List", ["English", "简体中文"], 0).show(this.player).then((e => {
                    e.canceled || (this.data.lang = e.formValues && 0 == e.formValues[0] ? "en" : "zh")
                })).catch((e => {
                    m.Z.throwError(e)
                })) : "wb:jet_pack" === s.typeId ? (this.exPlayer.addEffect(e.MinecraftEffectTypes.levitation, 7, 15, !1), this.exPlayer.addEffect(e.MinecraftEffectTypes.slowFalling, 150, 3, !1), this.exPlayer.dimension.spawnEntity("wb:ball_jet_pack", this.exPlayer.getPosition().sub(this.exPlayer.viewDirection.scl(2)))) : "wb:start_key" === s.typeId || "wb:technology_world_explorer" === s.typeId || "wb:pickaxex_equipment_a" === s.typeId && (this.globalSettings.chainMining || this.exPlayer.command.run(['execute as @s[scores={wbfl=..39}] at @s run tellraw @s {"rawtext":[{"translate":"tell.play.29.name"}]}', "execute as @s[tag=!wbplot,scores={wbfl=40..},m=!adventure] at @s run fill ~+4 ~+4 ~+4 ~-4 ~ ~-4 air [] replace stone []", "execute as @s[tag=!wbplot,scores={wbfl=40..},m=!adventure] at @s run fill ~+4 ~+4 ~+4 ~-4 ~ ~-4 air [] replace end_stone []", "execute as @s[tag=!wbplot,scores={wbfl=40..},m=!adventure] at @s run fill ~+4 ~+4 ~+4 ~-4 ~ ~-4 air [] replace cobblestone []", "execute as @s[tag=!wbplot,scores={wbfl=40..},m=!adventure] at @s run fill ~+4 ~+4 ~+4 ~-4 ~ ~-4 air [] replace netherrack []", "execute as @s[tag=!wbplot,scores={wbfl=40..},m=!adventure] at @s run fill ~+4 ~+4 ~+4 ~-4 ~ ~-4 air [] replace red_sandstone []", "execute as @s[scores={wbfl=40..}] at @s run scoreboard players remove @s wbfl 40"]))
            }))
        }
        chainDigging(e, t, s, i) {
            var a;
            let r = void 0 === i;
            if (i || (i = new Set), !(s > 0)) return;
            s--;
            const o = e.floor().toString();
            if (i.has(o)) return;
            i.add(o);
            const l = n.Z.getInstance(this.getDimension());
            ((null === (a = l.getBlock(e)) || void 0 === a ? void 0 : a.typeId) === t || r) && (l.digBlock(e), this.chainDigging(e.add(0, 1, 0), t, s, i), this.chainDigging(e.sub(0, 1, 0).add(0, -1, 0), t, s, i), this.chainDigging(e.sub(0, -1, 0).add(0, 0, 1), t, s, i), this.chainDigging(e.sub(0, 0, 1).add(0, 0, -1), t, s, i), this.chainDigging(e.sub(0, 0, -1).add(1, 0, 0), t, s, i), this.chainDigging(e.sub(1, 0, 0).add(-1, 0, 0), t, s, i), e.sub(-1, 0, 0), this.chainDigging(e.add(1, 1, 0), t, s, i), this.chainDigging(e.sub(1, 1, 0).add(1, -1, 0), t, s, i), this.chainDigging(e.sub(1, -1, 0).add(1, 0, 1), t, s, i), this.chainDigging(e.sub(1, 0, 1).add(1, 0, -1), t, s, i), this.chainDigging(e.sub(1, 0, -1).add(-1, -1, 0), t, s, i), this.chainDigging(e.sub(-1, -1, 0).add(-1, 1, 0), t, s, i), this.chainDigging(e.sub(-1, 1, 0).add(-1, 0, 1), t, s, i), this.chainDigging(e.sub(-1, 0, 1).add(-1, 0, -1), t, s, i), e.sub(-1, 0, -1))
        }
        onLoaded() {
            this.initialMagicPickaxe()
        }
        onLeave() {}
        initialMagicPickaxe() {
            this.globalSettings.initialMagicPickaxe && (this.data.initialMagicPickaxe || (this.exPlayer.getBag().addItem(new e.ItemStack(e.ItemTypes.get("wb:pickaxex_equipment_a"))), this.data.initialMagicPickaxe = !0))
        }
    }
    class Xe {
        constructor(e, t, n) {
            this._uiBody = t, this._client = e, this._button = n
        }
        getMessage() {
            return this._uiBody
        }
        showPage() {
            let e = (new ue.Z).title("__pomAlertWarning").body(this._uiBody);
            for (let [t, n] of this._button) e.button(t, (() => {
                n(this._client, this)
            }));
            e.show(this._client.player)
        }
    }
    class Ge {
        static from(e, t) {
            let n;
            try {
                n = JSON.parse(e)
            } catch (e) {
                n = t
            }
            return n
        }
        static to(e) {
            return JSON.stringify(e)
        }
    }

    function He(e) {
        for (var t = e.length; --t >= 0;) e[t] = 0
    }
    var Je = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
        Ke = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),
        Qe = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
        $e = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
        et = new Array(576);
    He(et);
    var tt = new Array(60);
    He(tt);
    var nt = new Array(512);
    He(nt);
    var st = new Array(256);
    He(st);
    var it = new Array(29);
    He(it);
    var at, rt, ot, lt = new Array(30);

    function ct(e, t, n, s, i) {
        this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = s, this.max_length = i, this.has_stree = e && e.length
    }

    function ut(e, t) {
        this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
    }
    He(lt);
    var ht = function(e) {
            return e < 256 ? nt[e] : nt[256 + (e >>> 7)]
        },
        dt = function(e, t) {
            e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
        },
        mt = function(e, t, n) {
            e.bi_valid > 16 - n ? (e.bi_buf |= t << e.bi_valid & 65535, dt(e, e.bi_buf), e.bi_buf = t >> 16 - e.bi_valid, e.bi_valid += n - 16) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n)
        },
        pt = function(e, t, n) {
            mt(e, n[2 * t], n[2 * t + 1])
        },
        gt = function(e, t) {
            var n = 0;
            do {
                n |= 1 & e, e >>>= 1, n <<= 1
            } while (--t > 0);
            return n >>> 1
        },
        yt = function(e, t, n) {
            var s, i, a = new Array(16),
                r = 0;
            for (s = 1; s <= 15; s++) a[s] = r = r + n[s - 1] << 1;
            for (i = 0; i <= t; i++) {
                var o = e[2 * i + 1];
                0 !== o && (e[2 * i] = gt(a[o]++, o))
            }
        },
        ft = function(e) {
            var t;
            for (t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;
            for (t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0;
            for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
            e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
        },
        wt = function(e) {
            e.bi_valid > 8 ? dt(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
        },
        bt = function(e, t, n, s) {
            var i = 2 * t,
                a = 2 * n;
            return e[i] < e[a] || e[i] === e[a] && s[t] <= s[n]
        },
        vt = function(e, t, n) {
            for (var s = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && bt(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !bt(t, s, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
            e.heap[n] = s
        },
        _t = function(e, t, n) {
            var s, i, a, r, o = 0;
            if (0 !== e.last_lit)
                do {
                    s = e.pending_buf[e.d_buf + 2 * o] << 8 | e.pending_buf[e.d_buf + 2 * o + 1], i = e.pending_buf[e.l_buf + o], o++, 0 === s ? pt(e, i, t) : (a = st[i], pt(e, a + 256 + 1, t), 0 !== (r = Je[a]) && (i -= it[a], mt(e, i, r)), s--, a = ht(s), pt(e, a, n), 0 !== (r = Ke[a]) && (s -= lt[a], mt(e, s, r)))
                } while (o < e.last_lit);
            pt(e, 256, t)
        },
        kt = function(e, t) {
            var n, s, i, a = t.dyn_tree,
                r = t.stat_desc.static_tree,
                o = t.stat_desc.has_stree,
                l = t.stat_desc.elems,
                c = -1;
            for (e.heap_len = 0, e.heap_max = 573, n = 0; n < l; n++) 0 !== a[2 * n] ? (e.heap[++e.heap_len] = c = n, e.depth[n] = 0) : a[2 * n + 1] = 0;
            for (; e.heap_len < 2;) a[2 * (i = e.heap[++e.heap_len] = c < 2 ? ++c : 0)] = 1, e.depth[i] = 0, e.opt_len--, o && (e.static_len -= r[2 * i + 1]);
            for (t.max_code = c, n = e.heap_len >> 1; n >= 1; n--) vt(e, a, n);
            i = l;
            do {
                n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], vt(e, a, 1), s = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = s, a[2 * i] = a[2 * n] + a[2 * s], e.depth[i] = (e.depth[n] >= e.depth[s] ? e.depth[n] : e.depth[s]) + 1, a[2 * n + 1] = a[2 * s + 1] = i, e.heap[1] = i++, vt(e, a, 1)
            } while (e.heap_len >= 2);
            e.heap[--e.heap_max] = e.heap[1],
                function(e, t) {
                    var n, s, i, a, r, o, l = t.dyn_tree,
                        c = t.max_code,
                        u = t.stat_desc.static_tree,
                        h = t.stat_desc.has_stree,
                        d = t.stat_desc.extra_bits,
                        m = t.stat_desc.extra_base,
                        p = t.stat_desc.max_length,
                        g = 0;
                    for (a = 0; a <= 15; a++) e.bl_count[a] = 0;
                    for (l[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < 573; n++)(a = l[2 * l[2 * (s = e.heap[n]) + 1] + 1] + 1) > p && (a = p, g++), l[2 * s + 1] = a, s > c || (e.bl_count[a]++, r = 0, s >= m && (r = d[s - m]), o = l[2 * s], e.opt_len += o * (a + r), h && (e.static_len += o * (u[2 * s + 1] + r)));
                    if (0 !== g) {
                        do {
                            for (a = p - 1; 0 === e.bl_count[a];) a--;
                            e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[p]--, g -= 2
                        } while (g > 0);
                        for (a = p; 0 !== a; a--)
                            for (s = e.bl_count[a]; 0 !== s;)(i = e.heap[--n]) > c || (l[2 * i + 1] !== a && (e.opt_len += (a - l[2 * i + 1]) * l[2 * i], l[2 * i + 1] = a), s--)
                    }
                }(e, t), yt(a, c, e.bl_count)
        },
        Et = function(e, t, n) {
            var s, i, a = -1,
                r = t[1],
                o = 0,
                l = 7,
                c = 4;
            for (0 === r && (l = 138, c = 3), t[2 * (n + 1) + 1] = 65535, s = 0; s <= n; s++) i = r, r = t[2 * (s + 1) + 1], ++o < l && i === r || (o < c ? e.bl_tree[2 * i] += o : 0 !== i ? (i !== a && e.bl_tree[2 * i]++, e.bl_tree[32]++) : o <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++, o = 0, a = i, 0 === r ? (l = 138, c = 3) : i === r ? (l = 6, c = 3) : (l = 7, c = 4))
        },
        Tt = function(e, t, n) {
            var s, i, a = -1,
                r = t[1],
                o = 0,
                l = 7,
                c = 4;
            for (0 === r && (l = 138, c = 3), s = 0; s <= n; s++)
                if (i = r, r = t[2 * (s + 1) + 1], !(++o < l && i === r)) {
                    if (o < c)
                        do {
                            pt(e, i, e.bl_tree)
                        } while (0 != --o);
                    else 0 !== i ? (i !== a && (pt(e, i, e.bl_tree), o--), pt(e, 16, e.bl_tree), mt(e, o - 3, 2)) : o <= 10 ? (pt(e, 17, e.bl_tree), mt(e, o - 3, 3)) : (pt(e, 18, e.bl_tree), mt(e, o - 11, 7));
                    o = 0, a = i, 0 === r ? (l = 138, c = 3) : i === r ? (l = 6, c = 3) : (l = 7, c = 4)
                }
        },
        Mt = !1,
        It = function(e, t, n, s) {
            mt(e, 0 + (s ? 1 : 0), 3),
                function(e, t, n, s) {
                    wt(e), dt(e, n), dt(e, ~n), e.pending_buf.set(e.window.subarray(t, t + n), e.pending), e.pending += n
                }(e, t, n)
        },
        xt = function(e) {
            Mt || (function() {
                var e, t, n, s, i, a = new Array(16);
                for (n = 0, s = 0; s < 28; s++)
                    for (it[s] = n, e = 0; e < 1 << Je[s]; e++) st[n++] = s;
                for (st[n - 1] = s, i = 0, s = 0; s < 16; s++)
                    for (lt[s] = i, e = 0; e < 1 << Ke[s]; e++) nt[i++] = s;
                for (i >>= 7; s < 30; s++)
                    for (lt[s] = i << 7, e = 0; e < 1 << Ke[s] - 7; e++) nt[256 + i++] = s;
                for (t = 0; t <= 15; t++) a[t] = 0;
                for (e = 0; e <= 143;) et[2 * e + 1] = 8, e++, a[8]++;
                for (; e <= 255;) et[2 * e + 1] = 9, e++, a[9]++;
                for (; e <= 279;) et[2 * e + 1] = 7, e++, a[7]++;
                for (; e <= 287;) et[2 * e + 1] = 8, e++, a[8]++;
                for (yt(et, 287, a), e = 0; e < 30; e++) tt[2 * e + 1] = 5, tt[2 * e] = gt(e, 5);
                at = new ct(et, Je, 257, 286, 15), rt = new ct(tt, Ke, 0, 30, 15), ot = new ct(new Array(0), Qe, 0, 19, 7)
            }(), Mt = !0), e.l_desc = new ut(e.dyn_ltree, at), e.d_desc = new ut(e.dyn_dtree, rt), e.bl_desc = new ut(e.bl_tree, ot), e.bi_buf = 0, e.bi_valid = 0, ft(e)
        },
        Dt = It,
        St = function(e, t, n, s) {
            var i, a, r = 0;
            e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = function(e) {
                var t, n = 4093624447;
                for (t = 0; t <= 31; t++, n >>>= 1)
                    if (1 & n && 0 !== e.dyn_ltree[2 * t]) return 0;
                if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
                for (t = 32; t < 256; t++)
                    if (0 !== e.dyn_ltree[2 * t]) return 1;
                return 0
            }(e)), kt(e, e.l_desc), kt(e, e.d_desc), r = function(e) {
                var t;
                for (Et(e, e.dyn_ltree, e.l_desc.max_code), Et(e, e.dyn_dtree, e.d_desc.max_code), kt(e, e.bl_desc), t = 18; t >= 3 && 0 === e.bl_tree[2 * $e[t] + 1]; t--);
                return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
            }(e), i = e.opt_len + 3 + 7 >>> 3, (a = e.static_len + 3 + 7 >>> 3) <= i && (i = a)) : i = a = n + 5, n + 4 <= i && -1 !== t ? It(e, t, n, s) : 4 === e.strategy || a === i ? (mt(e, 2 + (s ? 1 : 0), 3), _t(e, et, tt)) : (mt(e, 4 + (s ? 1 : 0), 3), function(e, t, n, s) {
                var i;
                for (mt(e, t - 257, 5), mt(e, n - 1, 5), mt(e, s - 4, 4), i = 0; i < s; i++) mt(e, e.bl_tree[2 * $e[i] + 1], 3);
                Tt(e, e.dyn_ltree, t - 1), Tt(e, e.dyn_dtree, n - 1)
            }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, r + 1), _t(e, e.dyn_ltree, e.dyn_dtree)), ft(e), s && wt(e)
        },
        Nt = function(e, t, n) {
            return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (st[n] + 256 + 1)]++, e.dyn_dtree[2 * ht(t)]++), e.last_lit === e.lit_bufsize - 1
        },
        At = function(e) {
            mt(e, 2, 3), pt(e, 256, et),
                function(e) {
                    16 === e.bi_valid ? (dt(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
                }(e)
        },
        Ct = function(e, t, n, s) {
            for (var i = 65535 & e | 0, a = e >>> 16 & 65535 | 0, r = 0; 0 !== n;) {
                n -= r = n > 2e3 ? 2e3 : n;
                do {
                    a = a + (i = i + t[s++] | 0) | 0
                } while (--r);
                i %= 65521, a %= 65521
            }
            return i | a << 16 | 0
        },
        Ot = new Uint32Array(function() {
            for (var e, t = [], n = 0; n < 256; n++) {
                e = n;
                for (var s = 0; s < 8; s++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                t[n] = e
            }
            return t
        }()),
        Rt = function(e, t, n, s) {
            var i = Ot,
                a = s + n;
            e ^= -1;
            for (var r = s; r < a; r++) e = e >>> 8 ^ i[255 & (e ^ t[r])];
            return -1 ^ e
        },
        Zt = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
        },
        Lt = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_MEM_ERROR: -4,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
        },
        Bt = xt,
        Ut = Dt,
        zt = St,
        Pt = Nt,
        Wt = At,
        Vt = Lt.Z_NO_FLUSH,
        qt = Lt.Z_PARTIAL_FLUSH,
        Yt = Lt.Z_FULL_FLUSH,
        Ft = Lt.Z_FINISH,
        jt = Lt.Z_BLOCK,
        Xt = Lt.Z_OK,
        Gt = Lt.Z_STREAM_END,
        Ht = Lt.Z_STREAM_ERROR,
        Jt = Lt.Z_DATA_ERROR,
        Kt = Lt.Z_BUF_ERROR,
        Qt = Lt.Z_DEFAULT_COMPRESSION,
        $t = Lt.Z_FILTERED,
        en = Lt.Z_HUFFMAN_ONLY,
        tn = Lt.Z_RLE,
        nn = Lt.Z_FIXED,
        sn = Lt.Z_UNKNOWN,
        an = Lt.Z_DEFLATED,
        rn = 258,
        on = 262,
        ln = 103,
        cn = 113,
        un = 666,
        hn = function(e, t) {
            return e.msg = Zt[t], t
        },
        dn = function(e) {
            return (e << 1) - (e > 4 ? 9 : 0)
        },
        mn = function(e) {
            for (var t = e.length; --t >= 0;) e[t] = 0
        },
        pn = function(e, t, n) {
            return (t << e.hash_shift ^ n) & e.hash_mask
        },
        gn = function(e) {
            var t = e.state,
                n = t.pending;
            n > e.avail_out && (n = e.avail_out), 0 !== n && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + n), e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, 0 === t.pending && (t.pending_out = 0))
        },
        yn = function(e, t) {
            zt(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, gn(e.strm)
        },
        fn = function(e, t) {
            e.pending_buf[e.pending++] = t
        },
        wn = function(e, t) {
            e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t
        },
        bn = function(e, t) {
            var n, s, i = e.max_chain_length,
                a = e.strstart,
                r = e.prev_length,
                o = e.nice_match,
                l = e.strstart > e.w_size - on ? e.strstart - (e.w_size - on) : 0,
                c = e.window,
                u = e.w_mask,
                h = e.prev,
                d = e.strstart + rn,
                m = c[a + r - 1],
                p = c[a + r];
            e.prev_length >= e.good_match && (i >>= 2), o > e.lookahead && (o = e.lookahead);
            do {
                if (c[(n = t) + r] === p && c[n + r - 1] === m && c[n] === c[a] && c[++n] === c[a + 1]) {
                    a += 2, n++;
                    do {} while (c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && a < d);
                    if (s = rn - (d - a), a = d - rn, s > r) {
                        if (e.match_start = t, r = s, s >= o) break;
                        m = c[a + r - 1], p = c[a + r]
                    }
                }
            } while ((t = h[t & u]) > l && 0 != --i);
            return r <= e.lookahead ? r : e.lookahead
        },
        vn = function(e) {
            var t, n, s, i, a, r, o, l, c, u, h = e.w_size;
            do {
                if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= h + (h - on)) {
                    e.window.set(e.window.subarray(h, h + h), 0), e.match_start -= h, e.strstart -= h, e.block_start -= h, t = n = e.hash_size;
                    do {
                        s = e.head[--t], e.head[t] = s >= h ? s - h : 0
                    } while (--n);
                    t = n = h;
                    do {
                        s = e.prev[--t], e.prev[t] = s >= h ? s - h : 0
                    } while (--n);
                    i += h
                }
                if (0 === e.strm.avail_in) break;
                if (r = e.strm, o = e.window, l = e.strstart + e.lookahead, c = i, u = void 0, (u = r.avail_in) > c && (u = c), n = 0 === u ? 0 : (r.avail_in -= u, o.set(r.input.subarray(r.next_in, r.next_in + u), l), 1 === r.state.wrap ? r.adler = Ct(r.adler, o, u, l) : 2 === r.state.wrap && (r.adler = Rt(r.adler, o, u, l)), r.next_in += u, r.total_in += u, u), e.lookahead += n, e.lookahead + e.insert >= 3)
                    for (a = e.strstart - e.insert, e.ins_h = e.window[a], e.ins_h = pn(e, e.ins_h, e.window[a + 1]); e.insert && (e.ins_h = pn(e, e.ins_h, e.window[a + 3 - 1]), e.prev[a & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = a, a++, e.insert--, !(e.lookahead + e.insert < 3)););
            } while (e.lookahead < on && 0 !== e.strm.avail_in)
        },
        _n = function(e, t) {
            for (var n, s;;) {
                if (e.lookahead < on) {
                    if (vn(e), e.lookahead < on && t === Vt) return 1;
                    if (0 === e.lookahead) break
                }
                if (n = 0, e.lookahead >= 3 && (e.ins_h = pn(e, e.ins_h, e.window[e.strstart + 3 - 1]), n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== n && e.strstart - n <= e.w_size - on && (e.match_length = bn(e, n)), e.match_length >= 3)
                    if (s = Pt(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
                        e.match_length--;
                        do {
                            e.strstart++, e.ins_h = pn(e, e.ins_h, e.window[e.strstart + 3 - 1]), n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart
                        } while (0 != --e.match_length);
                        e.strstart++
                    } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = pn(e, e.ins_h, e.window[e.strstart + 1]);
                else s = Pt(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
                if (s && (yn(e, !1), 0 === e.strm.avail_out)) return 1
            }
            return e.insert = e.strstart < 2 ? e.strstart : 2, t === Ft ? (yn(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (yn(e, !1), 0 === e.strm.avail_out) ? 1 : 2
        },
        kn = function(e, t) {
            for (var n, s, i;;) {
                if (e.lookahead < on) {
                    if (vn(e), e.lookahead < on && t === Vt) return 1;
                    if (0 === e.lookahead) break
                }
                if (n = 0, e.lookahead >= 3 && (e.ins_h = pn(e, e.ins_h, e.window[e.strstart + 3 - 1]), n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, 0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - on && (e.match_length = bn(e, n), e.match_length <= 5 && (e.strategy === $t || 3 === e.match_length && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= 3 && e.match_length <= e.prev_length) {
                    i = e.strstart + e.lookahead - 3, s = Pt(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
                    do {
                        ++e.strstart <= i && (e.ins_h = pn(e, e.ins_h, e.window[e.strstart + 3 - 1]), n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart)
                    } while (0 != --e.prev_length);
                    if (e.match_available = 0, e.match_length = 2, e.strstart++, s && (yn(e, !1), 0 === e.strm.avail_out)) return 1
                } else if (e.match_available) {
                    if ((s = Pt(e, 0, e.window[e.strstart - 1])) && yn(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1
                } else e.match_available = 1, e.strstart++, e.lookahead--
            }
            return e.match_available && (s = Pt(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < 2 ? e.strstart : 2, t === Ft ? (yn(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (yn(e, !1), 0 === e.strm.avail_out) ? 1 : 2
        };

    function En(e, t, n, s, i) {
        this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = s, this.func = i
    }
    var Tn = [new En(0, 0, 0, 0, (function(e, t) {
        var n = 65535;
        for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
            if (e.lookahead <= 1) {
                if (vn(e), 0 === e.lookahead && t === Vt) return 1;
                if (0 === e.lookahead) break
            }
            e.strstart += e.lookahead, e.lookahead = 0;
            var s = e.block_start + n;
            if ((0 === e.strstart || e.strstart >= s) && (e.lookahead = e.strstart - s, e.strstart = s, yn(e, !1), 0 === e.strm.avail_out)) return 1;
            if (e.strstart - e.block_start >= e.w_size - on && (yn(e, !1), 0 === e.strm.avail_out)) return 1
        }
        return e.insert = 0, t === Ft ? (yn(e, !0), 0 === e.strm.avail_out ? 3 : 4) : (e.strstart > e.block_start && (yn(e, !1), e.strm.avail_out), 1)
    })), new En(4, 4, 8, 4, _n), new En(4, 5, 16, 8, _n), new En(4, 6, 32, 32, _n), new En(4, 4, 16, 16, kn), new En(8, 16, 32, 32, kn), new En(8, 16, 128, 128, kn), new En(8, 32, 128, 256, kn), new En(32, 128, 258, 1024, kn), new En(32, 258, 258, 4096, kn)];

    function Mn() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = an, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(1146), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), mn(this.dyn_ltree), mn(this.dyn_dtree), mn(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), mn(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), mn(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
    }
    var In = function(e) {
            if (!e || !e.state) return hn(e, Ht);
            e.total_in = e.total_out = 0, e.data_type = sn;
            var t = e.state;
            return t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? 42 : cn, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = Vt, Bt(t), Xt
        },
        xn = function(e) {
            var t, n = In(e);
            return n === Xt && ((t = e.state).window_size = 2 * t.w_size, mn(t.head), t.max_lazy_match = Tn[t.level].max_lazy, t.good_match = Tn[t.level].good_length, t.nice_match = Tn[t.level].nice_length, t.max_chain_length = Tn[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = 2, t.match_available = 0, t.ins_h = 0), n
        },
        Dn = function(e, t, n, s, i, a) {
            if (!e) return Ht;
            var r = 1;
            if (t === Qt && (t = 6), s < 0 ? (r = 0, s = -s) : s > 15 && (r = 2, s -= 16), i < 1 || i > 9 || n !== an || s < 8 || s > 15 || t < 0 || t > 9 || a < 0 || a > nn) return hn(e, Ht);
            8 === s && (s = 9);
            var o = new Mn;
            return e.state = o, o.strm = e, o.wrap = r, o.gzhead = null, o.w_bits = s, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = i + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + 3 - 1) / 3), o.window = new Uint8Array(2 * o.w_size), o.head = new Uint16Array(o.hash_size), o.prev = new Uint16Array(o.w_size), o.lit_bufsize = 1 << i + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new Uint8Array(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = t, o.strategy = a, o.method = n, xn(e)
        },
        Sn = Dn,
        Nn = function(e, t) {
            return e && e.state ? 2 !== e.state.wrap ? Ht : (e.state.gzhead = t, Xt) : Ht
        },
        An = function(e, t) {
            var n, s;
            if (!e || !e.state || t > jt || t < 0) return e ? hn(e, Ht) : Ht;
            var i = e.state;
            if (!e.output || !e.input && 0 !== e.avail_in || i.status === un && t !== Ft) return hn(e, 0 === e.avail_out ? Kt : Ht);
            i.strm = e;
            var a = i.last_flush;
            if (i.last_flush = t, 42 === i.status)
                if (2 === i.wrap) e.adler = 0, fn(i, 31), fn(i, 139), fn(i, 8), i.gzhead ? (fn(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), fn(i, 255 & i.gzhead.time), fn(i, i.gzhead.time >> 8 & 255), fn(i, i.gzhead.time >> 16 & 255), fn(i, i.gzhead.time >> 24 & 255), fn(i, 9 === i.level ? 2 : i.strategy >= en || i.level < 2 ? 4 : 0), fn(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (fn(i, 255 & i.gzhead.extra.length), fn(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (e.adler = Rt(e.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (fn(i, 0), fn(i, 0), fn(i, 0), fn(i, 0), fn(i, 0), fn(i, 9 === i.level ? 2 : i.strategy >= en || i.level < 2 ? 4 : 0), fn(i, 3), i.status = cn);
                else {
                    var r = an + (i.w_bits - 8 << 4) << 8;
                    r |= (i.strategy >= en || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6, 0 !== i.strstart && (r |= 32), r += 31 - r % 31, i.status = cn, wn(i, r), 0 !== i.strstart && (wn(i, e.adler >>> 16), wn(i, 65535 & e.adler)), e.adler = 1
                } if (69 === i.status)
                if (i.gzhead.extra) {
                    for (n = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > n && (e.adler = Rt(e.adler, i.pending_buf, i.pending - n, n)), gn(e), n = i.pending, i.pending !== i.pending_buf_size));) fn(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
                    i.gzhead.hcrc && i.pending > n && (e.adler = Rt(e.adler, i.pending_buf, i.pending - n, n)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73)
                } else i.status = 73;
            if (73 === i.status)
                if (i.gzhead.name) {
                    n = i.pending;
                    do {
                        if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (e.adler = Rt(e.adler, i.pending_buf, i.pending - n, n)), gn(e), n = i.pending, i.pending === i.pending_buf_size)) {
                            s = 1;
                            break
                        }
                        s = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, fn(i, s)
                    } while (0 !== s);
                    i.gzhead.hcrc && i.pending > n && (e.adler = Rt(e.adler, i.pending_buf, i.pending - n, n)), 0 === s && (i.gzindex = 0, i.status = 91)
                } else i.status = 91;
            if (91 === i.status)
                if (i.gzhead.comment) {
                    n = i.pending;
                    do {
                        if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (e.adler = Rt(e.adler, i.pending_buf, i.pending - n, n)), gn(e), n = i.pending, i.pending === i.pending_buf_size)) {
                            s = 1;
                            break
                        }
                        s = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, fn(i, s)
                    } while (0 !== s);
                    i.gzhead.hcrc && i.pending > n && (e.adler = Rt(e.adler, i.pending_buf, i.pending - n, n)), 0 === s && (i.status = ln)
                } else i.status = ln;
            if (i.status === ln && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && gn(e), i.pending + 2 <= i.pending_buf_size && (fn(i, 255 & e.adler), fn(i, e.adler >> 8 & 255), e.adler = 0, i.status = cn)) : i.status = cn), 0 !== i.pending) {
                if (gn(e), 0 === e.avail_out) return i.last_flush = -1, Xt
            } else if (0 === e.avail_in && dn(t) <= dn(a) && t !== Ft) return hn(e, Kt);
            if (i.status === un && 0 !== e.avail_in) return hn(e, Kt);
            if (0 !== e.avail_in || 0 !== i.lookahead || t !== Vt && i.status !== un) {
                var o = i.strategy === en ? function(e, t) {
                    for (var n;;) {
                        if (0 === e.lookahead && (vn(e), 0 === e.lookahead)) {
                            if (t === Vt) return 1;
                            break
                        }
                        if (e.match_length = 0, n = Pt(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (yn(e, !1), 0 === e.strm.avail_out)) return 1
                    }
                    return e.insert = 0, t === Ft ? (yn(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (yn(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                }(i, t) : i.strategy === tn ? function(e, t) {
                    for (var n, s, i, a, r = e.window;;) {
                        if (e.lookahead <= rn) {
                            if (vn(e), e.lookahead <= rn && t === Vt) return 1;
                            if (0 === e.lookahead) break
                        }
                        if (e.match_length = 0, e.lookahead >= 3 && e.strstart > 0 && (s = r[i = e.strstart - 1]) === r[++i] && s === r[++i] && s === r[++i]) {
                            a = e.strstart + rn;
                            do {} while (s === r[++i] && s === r[++i] && s === r[++i] && s === r[++i] && s === r[++i] && s === r[++i] && s === r[++i] && s === r[++i] && i < a);
                            e.match_length = rn - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead)
                        }
                        if (e.match_length >= 3 ? (n = Pt(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = Pt(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (yn(e, !1), 0 === e.strm.avail_out)) return 1
                    }
                    return e.insert = 0, t === Ft ? (yn(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (yn(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                }(i, t) : Tn[i.level].func(i, t);
                if (3 !== o && 4 !== o || (i.status = un), 1 === o || 3 === o) return 0 === e.avail_out && (i.last_flush = -1), Xt;
                if (2 === o && (t === qt ? Wt(i) : t !== jt && (Ut(i, 0, 0, !1), t === Yt && (mn(i.head), 0 === i.lookahead && (i.strstart = 0, i.block_start = 0, i.insert = 0))), gn(e), 0 === e.avail_out)) return i.last_flush = -1, Xt
            }
            return t !== Ft ? Xt : i.wrap <= 0 ? Gt : (2 === i.wrap ? (fn(i, 255 & e.adler), fn(i, e.adler >> 8 & 255), fn(i, e.adler >> 16 & 255), fn(i, e.adler >> 24 & 255), fn(i, 255 & e.total_in), fn(i, e.total_in >> 8 & 255), fn(i, e.total_in >> 16 & 255), fn(i, e.total_in >> 24 & 255)) : (wn(i, e.adler >>> 16), wn(i, 65535 & e.adler)), gn(e), i.wrap > 0 && (i.wrap = -i.wrap), 0 !== i.pending ? Xt : Gt)
        },
        Cn = function(e) {
            if (!e || !e.state) return Ht;
            var t = e.state.status;
            return 42 !== t && 69 !== t && 73 !== t && 91 !== t && t !== ln && t !== cn && t !== un ? hn(e, Ht) : (e.state = null, t === cn ? hn(e, Jt) : Xt)
        },
        On = function(e, t) {
            var n = t.length;
            if (!e || !e.state) return Ht;
            var s = e.state,
                i = s.wrap;
            if (2 === i || 1 === i && 42 !== s.status || s.lookahead) return Ht;
            if (1 === i && (e.adler = Ct(e.adler, t, n, 0)), s.wrap = 0, n >= s.w_size) {
                0 === i && (mn(s.head), s.strstart = 0, s.block_start = 0, s.insert = 0);
                var a = new Uint8Array(s.w_size);
                a.set(t.subarray(n - s.w_size, n), 0), t = a, n = s.w_size
            }
            var r = e.avail_in,
                o = e.next_in,
                l = e.input;
            for (e.avail_in = n, e.next_in = 0, e.input = t, vn(s); s.lookahead >= 3;) {
                var c = s.strstart,
                    u = s.lookahead - 2;
                do {
                    s.ins_h = pn(s, s.ins_h, s.window[c + 3 - 1]), s.prev[c & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = c, c++
                } while (--u);
                s.strstart = c, s.lookahead = 2, vn(s)
            }
            return s.strstart += s.lookahead, s.block_start = s.strstart, s.insert = s.lookahead, s.lookahead = 0, s.match_length = s.prev_length = 2, s.match_available = 0, e.next_in = o, e.input = l, e.avail_in = r, s.wrap = i, Xt
        };

    function Rn(e) {
        return Rn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Rn(e)
    }
    var Zn = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        },
        Ln = function(e) {
            for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                var n = t.shift();
                if (n) {
                    if ("object" !== Rn(n)) throw new TypeError(n + "must be non-object");
                    for (var s in n) Zn(n, s) && (e[s] = n[s])
                }
            }
            return e
        },
        Bn = function(e) {
            for (var t = 0, n = 0, s = e.length; n < s; n++) t += e[n].length;
            for (var i = new Uint8Array(t), a = 0, r = 0, o = e.length; a < o; a++) {
                var l = e[a];
                i.set(l, r), r += l.length
            }
            return i
        },
        Un = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1))
    } catch (e) {
        Un = !1
    }
    for (var zn = new Uint8Array(256), Pn = 0; Pn < 256; Pn++) zn[Pn] = Pn >= 252 ? 6 : Pn >= 248 ? 5 : Pn >= 240 ? 4 : Pn >= 224 ? 3 : Pn >= 192 ? 2 : 1;
    zn[254] = zn[254] = 1;
    var Wn = function(e) {
            if ("function" == typeof TextEncoder && TextEncoder.prototype.encode) return (new TextEncoder).encode(e);
            var t, n, s, i, a, r = e.length,
                o = 0;
            for (i = 0; i < r; i++) 55296 == (64512 & (n = e.charCodeAt(i))) && i + 1 < r && 56320 == (64512 & (s = e.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (s - 56320), i++), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
            for (t = new Uint8Array(o), a = 0, i = 0; a < o; i++) 55296 == (64512 & (n = e.charCodeAt(i))) && i + 1 < r && 56320 == (64512 & (s = e.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (s - 56320), i++), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | 63 & n) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n);
            return t
        },
        Vn = function(e, t) {
            var n, s, i = t || e.length;
            if ("function" == typeof TextDecoder && TextDecoder.prototype.decode) return (new TextDecoder).decode(e.subarray(0, t));
            var a = new Array(2 * i);
            for (s = 0, n = 0; n < i;) {
                var r = e[n++];
                if (r < 128) a[s++] = r;
                else {
                    var o = zn[r];
                    if (o > 4) a[s++] = 65533, n += o - 1;
                    else {
                        for (r &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && n < i;) r = r << 6 | 63 & e[n++], o--;
                        o > 1 ? a[s++] = 65533 : r < 65536 ? a[s++] = r : (r -= 65536, a[s++] = 55296 | r >> 10 & 1023, a[s++] = 56320 | 1023 & r)
                    }
                }
            }
            return function(e, t) {
                if (t < 65534 && e.subarray && Un) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
                for (var n = "", s = 0; s < t; s++) n += String.fromCharCode(e[s]);
                return n
            }(a, s)
        },
        qn = function(e, t) {
            (t = t || e.length) > e.length && (t = e.length);
            for (var n = t - 1; n >= 0 && 128 == (192 & e[n]);) n--;
            return n < 0 || 0 === n ? t : n + zn[e[n]] > t ? n : t
        },
        Yn = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
        },
        Fn = Object.prototype.toString,
        jn = Lt.Z_NO_FLUSH,
        Xn = Lt.Z_SYNC_FLUSH,
        Gn = Lt.Z_FULL_FLUSH,
        Hn = Lt.Z_FINISH,
        Jn = Lt.Z_OK,
        Kn = Lt.Z_STREAM_END,
        Qn = Lt.Z_DEFAULT_COMPRESSION,
        $n = Lt.Z_DEFAULT_STRATEGY,
        es = Lt.Z_DEFLATED;

    function ts(e) {
        this.options = Ln({
            level: Qn,
            method: es,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: $n
        }, e || {});
        var t = this.options;
        t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Yn, this.strm.avail_out = 0;
        var n = Sn(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
        if (n !== Jn) throw new Error(Zt[n]);
        if (t.header && Nn(this.strm, t.header), t.dictionary) {
            var s;
            if (s = "string" == typeof t.dictionary ? Wn(t.dictionary) : "[object ArrayBuffer]" === Fn.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, (n = On(this.strm, s)) !== Jn) throw new Error(Zt[n]);
            this._dict_set = !0
        }
    }

    function ns(e, t) {
        var n = new ts(t);
        if (n.push(e, !0), n.err) throw n.msg || Zt[n.err];
        return n.result
    }
    ts.prototype.push = function(e, t) {
        var n, s, i = this.strm,
            a = this.options.chunkSize;
        if (this.ended) return !1;
        for (s = t === ~~t ? t : !0 === t ? Hn : jn, "string" == typeof e ? i.input = Wn(e) : "[object ArrayBuffer]" === Fn.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;;)
            if (0 === i.avail_out && (i.output = new Uint8Array(a), i.next_out = 0, i.avail_out = a), (s === Xn || s === Gn) && i.avail_out <= 6) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
            else {
                if ((n = An(i, s)) === Kn) return i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)), n = Cn(this.strm), this.onEnd(n), this.ended = !0, n === Jn;
                if (0 !== i.avail_out) {
                    if (s > 0 && i.next_out > 0) this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
                    else if (0 === i.avail_in) break
                } else this.onData(i.output)
            } return !0
    }, ts.prototype.onData = function(e) {
        this.chunks.push(e)
    }, ts.prototype.onEnd = function(e) {
        e === Jn && (this.result = Bn(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
    };
    var ss = ts,
        is = ns,
        as = function(e, t) {
            return (t = t || {}).raw = !0, ns(e, t)
        },
        rs = function(e, t) {
            return (t = t || {}).gzip = !0, ns(e, t)
        },
        os = function(e, t) {
            var n, s, i, a, r, o, l, c, u, h, d, m, p, g, y, f, w, b, v, _, k, E, T, M, I = e.state;
            n = e.next_in, T = e.input, s = n + (e.avail_in - 5), i = e.next_out, M = e.output, a = i - (t - e.avail_out), r = i + (e.avail_out - 257), o = I.dmax, l = I.wsize, c = I.whave, u = I.wnext, h = I.window, d = I.hold, m = I.bits, p = I.lencode, g = I.distcode, y = (1 << I.lenbits) - 1, f = (1 << I.distbits) - 1;
            e: do {
                m < 15 && (d += T[n++] << m, m += 8, d += T[n++] << m, m += 8), w = p[d & y];
                t: for (;;) {
                    if (d >>>= b = w >>> 24, m -= b, 0 == (b = w >>> 16 & 255)) M[i++] = 65535 & w;
                    else {
                        if (!(16 & b)) {
                            if (0 == (64 & b)) {
                                w = p[(65535 & w) + (d & (1 << b) - 1)];
                                continue t
                            }
                            if (32 & b) {
                                I.mode = 12;
                                break e
                            }
                            e.msg = "invalid literal/length code", I.mode = 30;
                            break e
                        }
                        v = 65535 & w, (b &= 15) && (m < b && (d += T[n++] << m, m += 8), v += d & (1 << b) - 1, d >>>= b, m -= b), m < 15 && (d += T[n++] << m, m += 8, d += T[n++] << m, m += 8), w = g[d & f];
                        n: for (;;) {
                            if (d >>>= b = w >>> 24, m -= b, !(16 & (b = w >>> 16 & 255))) {
                                if (0 == (64 & b)) {
                                    w = g[(65535 & w) + (d & (1 << b) - 1)];
                                    continue n
                                }
                                e.msg = "invalid distance code", I.mode = 30;
                                break e
                            }
                            if (_ = 65535 & w, m < (b &= 15) && (d += T[n++] << m, (m += 8) < b && (d += T[n++] << m, m += 8)), (_ += d & (1 << b) - 1) > o) {
                                e.msg = "invalid distance too far back", I.mode = 30;
                                break e
                            }
                            if (d >>>= b, m -= b, _ > (b = i - a)) {
                                if ((b = _ - b) > c && I.sane) {
                                    e.msg = "invalid distance too far back", I.mode = 30;
                                    break e
                                }
                                if (k = 0, E = h, 0 === u) {
                                    if (k += l - b, b < v) {
                                        v -= b;
                                        do {
                                            M[i++] = h[k++]
                                        } while (--b);
                                        k = i - _, E = M
                                    }
                                } else if (u < b) {
                                    if (k += l + u - b, (b -= u) < v) {
                                        v -= b;
                                        do {
                                            M[i++] = h[k++]
                                        } while (--b);
                                        if (k = 0, u < v) {
                                            v -= b = u;
                                            do {
                                                M[i++] = h[k++]
                                            } while (--b);
                                            k = i - _, E = M
                                        }
                                    }
                                } else if (k += u - b, b < v) {
                                    v -= b;
                                    do {
                                        M[i++] = h[k++]
                                    } while (--b);
                                    k = i - _, E = M
                                }
                                for (; v > 2;) M[i++] = E[k++], M[i++] = E[k++], M[i++] = E[k++], v -= 3;
                                v && (M[i++] = E[k++], v > 1 && (M[i++] = E[k++]))
                            } else {
                                k = i - _;
                                do {
                                    M[i++] = M[k++], M[i++] = M[k++], M[i++] = M[k++], v -= 3
                                } while (v > 2);
                                v && (M[i++] = M[k++], v > 1 && (M[i++] = M[k++]))
                            }
                            break
                        }
                    }
                    break
                }
            } while (n < s && i < r);
            n -= v = m >> 3, d &= (1 << (m -= v << 3)) - 1, e.next_in = n, e.next_out = i, e.avail_in = n < s ? s - n + 5 : 5 - (n - s), e.avail_out = i < r ? r - i + 257 : 257 - (i - r), I.hold = d, I.bits = m
        },
        ls = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
        cs = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
        us = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]),
        hs = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]),
        ds = function(e, t, n, s, i, a, r, o) {
            var l, c, u, h, d, m, p, g, y, f = o.bits,
                w = 0,
                b = 0,
                v = 0,
                _ = 0,
                k = 0,
                E = 0,
                T = 0,
                M = 0,
                I = 0,
                x = 0,
                D = null,
                S = 0,
                N = new Uint16Array(16),
                A = new Uint16Array(16),
                C = null,
                O = 0;
            for (w = 0; w <= 15; w++) N[w] = 0;
            for (b = 0; b < s; b++) N[t[n + b]]++;
            for (k = f, _ = 15; _ >= 1 && 0 === N[_]; _--);
            if (k > _ && (k = _), 0 === _) return i[a++] = 20971520, i[a++] = 20971520, o.bits = 1, 0;
            for (v = 1; v < _ && 0 === N[v]; v++);
            for (k < v && (k = v), M = 1, w = 1; w <= 15; w++)
                if (M <<= 1, (M -= N[w]) < 0) return -1;
            if (M > 0 && (0 === e || 1 !== _)) return -1;
            for (A[1] = 0, w = 1; w < 15; w++) A[w + 1] = A[w] + N[w];
            for (b = 0; b < s; b++) 0 !== t[n + b] && (r[A[t[n + b]]++] = b);
            if (0 === e ? (D = C = r, m = 19) : 1 === e ? (D = ls, S -= 257, C = cs, O -= 257, m = 256) : (D = us, C = hs, m = -1), x = 0, b = 0, w = v, d = a, E = k, T = 0, u = -1, h = (I = 1 << k) - 1, 1 === e && I > 852 || 2 === e && I > 592) return 1;
            for (;;) {
                p = w - T, r[b] < m ? (g = 0, y = r[b]) : r[b] > m ? (g = C[O + r[b]], y = D[S + r[b]]) : (g = 96, y = 0), l = 1 << w - T, v = c = 1 << E;
                do {
                    i[d + (x >> T) + (c -= l)] = p << 24 | g << 16 | y | 0
                } while (0 !== c);
                for (l = 1 << w - 1; x & l;) l >>= 1;
                if (0 !== l ? (x &= l - 1, x += l) : x = 0, b++, 0 == --N[w]) {
                    if (w === _) break;
                    w = t[n + r[b]]
                }
                if (w > k && (x & h) !== u) {
                    for (0 === T && (T = k), d += v, M = 1 << (E = w - T); E + T < _ && !((M -= N[E + T]) <= 0);) E++, M <<= 1;
                    if (I += 1 << E, 1 === e && I > 852 || 2 === e && I > 592) return 1;
                    i[u = x & h] = k << 24 | E << 16 | d - a | 0
                }
            }
            return 0 !== x && (i[d + x] = w - T << 24 | 64 << 16 | 0), o.bits = k, 0
        },
        ms = Lt.Z_FINISH,
        ps = Lt.Z_BLOCK,
        gs = Lt.Z_TREES,
        ys = Lt.Z_OK,
        fs = Lt.Z_STREAM_END,
        ws = Lt.Z_NEED_DICT,
        bs = Lt.Z_STREAM_ERROR,
        vs = Lt.Z_DATA_ERROR,
        _s = Lt.Z_MEM_ERROR,
        ks = Lt.Z_BUF_ERROR,
        Es = Lt.Z_DEFLATED,
        Ts = 12,
        Ms = 30,
        Is = function(e) {
            return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
        };

    function xs() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
    }
    var Ds, Ss, Ns = function(e) {
            if (!e || !e.state) return bs;
            var t = e.state;
            return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = 1, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(852), t.distcode = t.distdyn = new Int32Array(592), t.sane = 1, t.back = -1, ys
        },
        As = function(e) {
            if (!e || !e.state) return bs;
            var t = e.state;
            return t.wsize = 0, t.whave = 0, t.wnext = 0, Ns(e)
        },
        Cs = function(e, t) {
            var n;
            if (!e || !e.state) return bs;
            var s = e.state;
            return t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? bs : (null !== s.window && s.wbits !== t && (s.window = null), s.wrap = n, s.wbits = t, As(e))
        },
        Os = function(e, t) {
            if (!e) return bs;
            var n = new xs;
            e.state = n, n.window = null;
            var s = Cs(e, t);
            return s !== ys && (e.state = null), s
        },
        Rs = !0,
        Zs = function(e) {
            if (Rs) {
                Ds = new Int32Array(512), Ss = new Int32Array(32);
                for (var t = 0; t < 144;) e.lens[t++] = 8;
                for (; t < 256;) e.lens[t++] = 9;
                for (; t < 280;) e.lens[t++] = 7;
                for (; t < 288;) e.lens[t++] = 8;
                for (ds(1, e.lens, 0, 288, Ds, 0, e.work, {
                        bits: 9
                    }), t = 0; t < 32;) e.lens[t++] = 5;
                ds(2, e.lens, 0, 32, Ss, 0, e.work, {
                    bits: 5
                }), Rs = !1
            }
            e.lencode = Ds, e.lenbits = 9, e.distcode = Ss, e.distbits = 5
        },
        Ls = function(e, t, n, s) {
            var i, a = e.state;
            return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), s >= a.wsize ? (a.window.set(t.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : ((i = a.wsize - a.wnext) > s && (i = s), a.window.set(t.subarray(n - s, n - s + i), a.wnext), (s -= i) ? (a.window.set(t.subarray(n - s, n), 0), a.wnext = s, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0
        },
        Bs = As,
        Us = Os,
        zs = function(e, t) {
            var n, s, i, a, r, o, l, c, u, h, d, m, p, g, y, f, w, b, v, _, k, E, T, M, I = 0,
                x = new Uint8Array(4),
                D = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
            if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return bs;
            (n = e.state).mode === Ts && (n.mode = 13), r = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, s = e.input, o = e.avail_in, c = n.hold, u = n.bits, h = o, d = l, E = ys;
            e: for (;;) switch (n.mode) {
                case 1:
                    if (0 === n.wrap) {
                        n.mode = 13;
                        break
                    }
                    for (; u < 16;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    if (2 & n.wrap && 35615 === c) {
                        n.check = 0, x[0] = 255 & c, x[1] = c >>> 8 & 255, n.check = Rt(n.check, x, 2, 0), c = 0, u = 0, n.mode = 2;
                        break
                    }
                    if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & c) << 8) + (c >> 8)) % 31) {
                        e.msg = "incorrect header check", n.mode = Ms;
                        break
                    }
                    if ((15 & c) !== Es) {
                        e.msg = "unknown compression method", n.mode = Ms;
                        break
                    }
                    if (u -= 4, k = 8 + (15 & (c >>>= 4)), 0 === n.wbits) n.wbits = k;
                    else if (k > n.wbits) {
                        e.msg = "invalid window size", n.mode = Ms;
                        break
                    }
                    n.dmax = 1 << n.wbits, e.adler = n.check = 1, n.mode = 512 & c ? 10 : Ts, c = 0, u = 0;
                    break;
                case 2:
                    for (; u < 16;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    if (n.flags = c, (255 & n.flags) !== Es) {
                        e.msg = "unknown compression method", n.mode = Ms;
                        break
                    }
                    if (57344 & n.flags) {
                        e.msg = "unknown header flags set", n.mode = Ms;
                        break
                    }
                    n.head && (n.head.text = c >> 8 & 1), 512 & n.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, n.check = Rt(n.check, x, 2, 0)), c = 0, u = 0, n.mode = 3;
                case 3:
                    for (; u < 32;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    n.head && (n.head.time = c), 512 & n.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, x[2] = c >>> 16 & 255, x[3] = c >>> 24 & 255, n.check = Rt(n.check, x, 4, 0)), c = 0, u = 0, n.mode = 4;
                case 4:
                    for (; u < 16;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    n.head && (n.head.xflags = 255 & c, n.head.os = c >> 8), 512 & n.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, n.check = Rt(n.check, x, 2, 0)), c = 0, u = 0, n.mode = 5;
                case 5:
                    if (1024 & n.flags) {
                        for (; u < 16;) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        n.length = c, n.head && (n.head.extra_len = c), 512 & n.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, n.check = Rt(n.check, x, 2, 0)), c = 0, u = 0
                    } else n.head && (n.head.extra = null);
                    n.mode = 6;
                case 6:
                    if (1024 & n.flags && ((m = n.length) > o && (m = o), m && (n.head && (k = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(s.subarray(a, a + m), k)), 512 & n.flags && (n.check = Rt(n.check, s, m, a)), o -= m, a += m, n.length -= m), n.length)) break e;
                    n.length = 0, n.mode = 7;
                case 7:
                    if (2048 & n.flags) {
                        if (0 === o) break e;
                        m = 0;
                        do {
                            k = s[a + m++], n.head && k && n.length < 65536 && (n.head.name += String.fromCharCode(k))
                        } while (k && m < o);
                        if (512 & n.flags && (n.check = Rt(n.check, s, m, a)), o -= m, a += m, k) break e
                    } else n.head && (n.head.name = null);
                    n.length = 0, n.mode = 8;
                case 8:
                    if (4096 & n.flags) {
                        if (0 === o) break e;
                        m = 0;
                        do {
                            k = s[a + m++], n.head && k && n.length < 65536 && (n.head.comment += String.fromCharCode(k))
                        } while (k && m < o);
                        if (512 & n.flags && (n.check = Rt(n.check, s, m, a)), o -= m, a += m, k) break e
                    } else n.head && (n.head.comment = null);
                    n.mode = 9;
                case 9:
                    if (512 & n.flags) {
                        for (; u < 16;) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        if (c !== (65535 & n.check)) {
                            e.msg = "header crc mismatch", n.mode = Ms;
                            break
                        }
                        c = 0, u = 0
                    }
                    n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = Ts;
                    break;
                case 10:
                    for (; u < 32;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    e.adler = n.check = Is(c), c = 0, u = 0, n.mode = 11;
                case 11:
                    if (0 === n.havedict) return e.next_out = r, e.avail_out = l, e.next_in = a, e.avail_in = o, n.hold = c, n.bits = u, ws;
                    e.adler = n.check = 1, n.mode = Ts;
                case Ts:
                    if (t === ps || t === gs) break e;
                case 13:
                    if (n.last) {
                        c >>>= 7 & u, u -= 7 & u, n.mode = 27;
                        break
                    }
                    for (; u < 3;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    switch (n.last = 1 & c, u -= 1, 3 & (c >>>= 1)) {
                        case 0:
                            n.mode = 14;
                            break;
                        case 1:
                            if (Zs(n), n.mode = 20, t === gs) {
                                c >>>= 2, u -= 2;
                                break e
                            }
                            break;
                        case 2:
                            n.mode = 17;
                            break;
                        case 3:
                            e.msg = "invalid block type", n.mode = Ms
                    }
                    c >>>= 2, u -= 2;
                    break;
                case 14:
                    for (c >>>= 7 & u, u -= 7 & u; u < 32;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    if ((65535 & c) != (c >>> 16 ^ 65535)) {
                        e.msg = "invalid stored block lengths", n.mode = Ms;
                        break
                    }
                    if (n.length = 65535 & c, c = 0, u = 0, n.mode = 15, t === gs) break e;
                case 15:
                    n.mode = 16;
                case 16:
                    if (m = n.length) {
                        if (m > o && (m = o), m > l && (m = l), 0 === m) break e;
                        i.set(s.subarray(a, a + m), r), o -= m, a += m, l -= m, r += m, n.length -= m;
                        break
                    }
                    n.mode = Ts;
                    break;
                case 17:
                    for (; u < 14;) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    if (n.nlen = 257 + (31 & c), c >>>= 5, u -= 5, n.ndist = 1 + (31 & c), c >>>= 5, u -= 5, n.ncode = 4 + (15 & c), c >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
                        e.msg = "too many length or distance symbols", n.mode = Ms;
                        break
                    }
                    n.have = 0, n.mode = 18;
                case 18:
                    for (; n.have < n.ncode;) {
                        for (; u < 3;) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        n.lens[D[n.have++]] = 7 & c, c >>>= 3, u -= 3
                    }
                    for (; n.have < 19;) n.lens[D[n.have++]] = 0;
                    if (n.lencode = n.lendyn, n.lenbits = 7, T = {
                            bits: n.lenbits
                        }, E = ds(0, n.lens, 0, 19, n.lencode, 0, n.work, T), n.lenbits = T.bits, E) {
                        e.msg = "invalid code lengths set", n.mode = Ms;
                        break
                    }
                    n.have = 0, n.mode = 19;
                case 19:
                    for (; n.have < n.nlen + n.ndist;) {
                        for (; f = (I = n.lencode[c & (1 << n.lenbits) - 1]) >>> 16 & 255, w = 65535 & I, !((y = I >>> 24) <= u);) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        if (w < 16) c >>>= y, u -= y, n.lens[n.have++] = w;
                        else {
                            if (16 === w) {
                                for (M = y + 2; u < M;) {
                                    if (0 === o) break e;
                                    o--, c += s[a++] << u, u += 8
                                }
                                if (c >>>= y, u -= y, 0 === n.have) {
                                    e.msg = "invalid bit length repeat", n.mode = Ms;
                                    break
                                }
                                k = n.lens[n.have - 1], m = 3 + (3 & c), c >>>= 2, u -= 2
                            } else if (17 === w) {
                                for (M = y + 3; u < M;) {
                                    if (0 === o) break e;
                                    o--, c += s[a++] << u, u += 8
                                }
                                u -= y, k = 0, m = 3 + (7 & (c >>>= y)), c >>>= 3, u -= 3
                            } else {
                                for (M = y + 7; u < M;) {
                                    if (0 === o) break e;
                                    o--, c += s[a++] << u, u += 8
                                }
                                u -= y, k = 0, m = 11 + (127 & (c >>>= y)), c >>>= 7, u -= 7
                            }
                            if (n.have + m > n.nlen + n.ndist) {
                                e.msg = "invalid bit length repeat", n.mode = Ms;
                                break
                            }
                            for (; m--;) n.lens[n.have++] = k
                        }
                    }
                    if (n.mode === Ms) break;
                    if (0 === n.lens[256]) {
                        e.msg = "invalid code -- missing end-of-block", n.mode = Ms;
                        break
                    }
                    if (n.lenbits = 9, T = {
                            bits: n.lenbits
                        }, E = ds(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, T), n.lenbits = T.bits, E) {
                        e.msg = "invalid literal/lengths set", n.mode = Ms;
                        break
                    }
                    if (n.distbits = 6, n.distcode = n.distdyn, T = {
                            bits: n.distbits
                        }, E = ds(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, T), n.distbits = T.bits, E) {
                        e.msg = "invalid distances set", n.mode = Ms;
                        break
                    }
                    if (n.mode = 20, t === gs) break e;
                case 20:
                    n.mode = 21;
                case 21:
                    if (o >= 6 && l >= 258) {
                        e.next_out = r, e.avail_out = l, e.next_in = a, e.avail_in = o, n.hold = c, n.bits = u, os(e, d), r = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, s = e.input, o = e.avail_in, c = n.hold, u = n.bits, n.mode === Ts && (n.back = -1);
                        break
                    }
                    for (n.back = 0; f = (I = n.lencode[c & (1 << n.lenbits) - 1]) >>> 16 & 255, w = 65535 & I, !((y = I >>> 24) <= u);) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    if (f && 0 == (240 & f)) {
                        for (b = y, v = f, _ = w; f = (I = n.lencode[_ + ((c & (1 << b + v) - 1) >> b)]) >>> 16 & 255, w = 65535 & I, !(b + (y = I >>> 24) <= u);) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        c >>>= b, u -= b, n.back += b
                    }
                    if (c >>>= y, u -= y, n.back += y, n.length = w, 0 === f) {
                        n.mode = 26;
                        break
                    }
                    if (32 & f) {
                        n.back = -1, n.mode = Ts;
                        break
                    }
                    if (64 & f) {
                        e.msg = "invalid literal/length code", n.mode = Ms;
                        break
                    }
                    n.extra = 15 & f, n.mode = 22;
                case 22:
                    if (n.extra) {
                        for (M = n.extra; u < M;) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        n.length += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra
                    }
                    n.was = n.length, n.mode = 23;
                case 23:
                    for (; f = (I = n.distcode[c & (1 << n.distbits) - 1]) >>> 16 & 255, w = 65535 & I, !((y = I >>> 24) <= u);) {
                        if (0 === o) break e;
                        o--, c += s[a++] << u, u += 8
                    }
                    if (0 == (240 & f)) {
                        for (b = y, v = f, _ = w; f = (I = n.distcode[_ + ((c & (1 << b + v) - 1) >> b)]) >>> 16 & 255, w = 65535 & I, !(b + (y = I >>> 24) <= u);) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        c >>>= b, u -= b, n.back += b
                    }
                    if (c >>>= y, u -= y, n.back += y, 64 & f) {
                        e.msg = "invalid distance code", n.mode = Ms;
                        break
                    }
                    n.offset = w, n.extra = 15 & f, n.mode = 24;
                case 24:
                    if (n.extra) {
                        for (M = n.extra; u < M;) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        n.offset += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra
                    }
                    if (n.offset > n.dmax) {
                        e.msg = "invalid distance too far back", n.mode = Ms;
                        break
                    }
                    n.mode = 25;
                case 25:
                    if (0 === l) break e;
                    if (m = d - l, n.offset > m) {
                        if ((m = n.offset - m) > n.whave && n.sane) {
                            e.msg = "invalid distance too far back", n.mode = Ms;
                            break
                        }
                        m > n.wnext ? (m -= n.wnext, p = n.wsize - m) : p = n.wnext - m, m > n.length && (m = n.length), g = n.window
                    } else g = i, p = r - n.offset, m = n.length;
                    m > l && (m = l), l -= m, n.length -= m;
                    do {
                        i[r++] = g[p++]
                    } while (--m);
                    0 === n.length && (n.mode = 21);
                    break;
                case 26:
                    if (0 === l) break e;
                    i[r++] = n.length, l--, n.mode = 21;
                    break;
                case 27:
                    if (n.wrap) {
                        for (; u < 32;) {
                            if (0 === o) break e;
                            o--, c |= s[a++] << u, u += 8
                        }
                        if (d -= l, e.total_out += d, n.total += d, d && (e.adler = n.check = n.flags ? Rt(n.check, i, d, r - d) : Ct(n.check, i, d, r - d)), d = l, (n.flags ? c : Is(c)) !== n.check) {
                            e.msg = "incorrect data check", n.mode = Ms;
                            break
                        }
                        c = 0, u = 0
                    }
                    n.mode = 28;
                case 28:
                    if (n.wrap && n.flags) {
                        for (; u < 32;) {
                            if (0 === o) break e;
                            o--, c += s[a++] << u, u += 8
                        }
                        if (c !== (4294967295 & n.total)) {
                            e.msg = "incorrect length check", n.mode = Ms;
                            break
                        }
                        c = 0, u = 0
                    }
                    n.mode = 29;
                case 29:
                    E = fs;
                    break e;
                case Ms:
                    E = vs;
                    break e;
                case 31:
                    return _s;
                default:
                    return bs
            }
            return e.next_out = r, e.avail_out = l, e.next_in = a, e.avail_in = o, n.hold = c, n.bits = u, (n.wsize || d !== e.avail_out && n.mode < Ms && (n.mode < 27 || t !== ms)) && Ls(e, e.output, e.next_out, d - e.avail_out), h -= e.avail_in, d -= e.avail_out, e.total_in += h, e.total_out += d, n.total += d, n.wrap && d && (e.adler = n.check = n.flags ? Rt(n.check, i, d, e.next_out - d) : Ct(n.check, i, d, e.next_out - d)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Ts ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0), (0 === h && 0 === d || t === ms) && E === ys && (E = ks), E
        },
        Ps = function(e) {
            if (!e || !e.state) return bs;
            var t = e.state;
            return t.window && (t.window = null), e.state = null, ys
        },
        Ws = function(e, t) {
            if (!e || !e.state) return bs;
            var n = e.state;
            return 0 == (2 & n.wrap) ? bs : (n.head = t, t.done = !1, ys)
        },
        Vs = function(e, t) {
            var n, s = t.length;
            return e && e.state ? 0 !== (n = e.state).wrap && 11 !== n.mode ? bs : 11 === n.mode && Ct(1, t, s, 0) !== n.check ? vs : Ls(e, t, s, s) ? (n.mode = 31, _s) : (n.havedict = 1, ys) : bs
        },
        qs = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
        },
        Ys = Object.prototype.toString,
        Fs = Lt.Z_NO_FLUSH,
        js = Lt.Z_FINISH,
        Xs = Lt.Z_OK,
        Gs = Lt.Z_STREAM_END,
        Hs = Lt.Z_NEED_DICT,
        Js = Lt.Z_STREAM_ERROR,
        Ks = Lt.Z_DATA_ERROR,
        Qs = Lt.Z_MEM_ERROR;

    function $s(e) {
        this.options = Ln({
            chunkSize: 65536,
            windowBits: 15,
            to: ""
        }, e || {});
        var t = this.options;
        t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Yn, this.strm.avail_out = 0;
        var n = Us(this.strm, t.windowBits);
        if (n !== Xs) throw new Error(Zt[n]);
        if (this.header = new qs, Ws(this.strm, this.header), t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = Wn(t.dictionary) : "[object ArrayBuffer]" === Ys.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = Vs(this.strm, t.dictionary)) !== Xs)) throw new Error(Zt[n])
    }

    function ei(e, t) {
        var n = new $s(t);
        if (n.push(e), n.err) throw n.msg || Zt[n.err];
        return n.result
    }
    $s.prototype.push = function(e, t) {
        var n, s, i, a = this.strm,
            r = this.options.chunkSize,
            o = this.options.dictionary;
        if (this.ended) return !1;
        for (s = t === ~~t ? t : !0 === t ? js : Fs, "[object ArrayBuffer]" === Ys.call(e) ? a.input = new Uint8Array(e) : a.input = e, a.next_in = 0, a.avail_in = a.input.length;;) {
            for (0 === a.avail_out && (a.output = new Uint8Array(r), a.next_out = 0, a.avail_out = r), (n = zs(a, s)) === Hs && o && ((n = Vs(a, o)) === Xs ? n = zs(a, s) : n === Ks && (n = Hs)); a.avail_in > 0 && n === Gs && a.state.wrap > 0 && 0 !== e[a.next_in];) Bs(a), n = zs(a, s);
            switch (n) {
                case Js:
                case Ks:
                case Hs:
                case Qs:
                    return this.onEnd(n), this.ended = !0, !1
            }
            if (i = a.avail_out, a.next_out && (0 === a.avail_out || n === Gs))
                if ("string" === this.options.to) {
                    var l = qn(a.output, a.next_out),
                        c = a.next_out - l,
                        u = Vn(a.output, l);
                    a.next_out = c, a.avail_out = r - c, c && a.output.set(a.output.subarray(l, l + c), 0), this.onData(u)
                } else this.onData(a.output.length === a.next_out ? a.output : a.output.subarray(0, a.next_out));
            if (n !== Xs || 0 !== i) {
                if (n === Gs) return n = Ps(this.strm), this.onEnd(n), this.ended = !0, !0;
                if (0 === a.avail_in) break
            }
        }
        return !0
    }, $s.prototype.onData = function(e) {
        this.chunks.push(e)
    }, $s.prototype.onEnd = function(e) {
        e === Xs && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = Bn(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
    };
    const ti = {
        Deflate: ss,
        deflate: is,
        deflateRaw: as,
        gzip: rs,
        Inflate: $s,
        inflate: ei,
        inflateRaw: function(e, t) {
            return (t = t || {}).raw = !0, ei(e, t)
        },
        ungzip: ei,
        constants: Lt
    };
    class ni {
        static arrayBufferToBase64(e) {
            const t = new Uint8Array(e),
                n = t.byteLength,
                s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            let i = "",
                a = 0;
            for (; a < n;) {
                const e = t[a++],
                    n = t[a++],
                    r = t[a++];
                i += s.charAt(e >> 2) + s.charAt((3 & e) << 4 | n >> 4) + (isNaN(n) ? "=" : s.charAt((15 & n) << 2 | r >> 6)) + (isNaN(r) ? "=" : s.charAt(63 & r))
            }
            return i
        }
        static base64ToArrayBuffer(e) {
            var t, n, s, i, a, r, o, l = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            for (r = e.length, a = 0, o = []; a < r;) {
                do {
                    t = l[255 & e.charCodeAt(a++)]
                } while (a < r && -1 == t);
                if (-1 == t) break;
                do {
                    n = l[255 & e.charCodeAt(a++)]
                } while (a < r && -1 == n);
                if (-1 == n) break;
                o.push(t << 2 | (48 & n) >> 4);
                do {
                    if (61 == (s = 255 & e.charCodeAt(a++))) return new Uint8Array(o);
                    s = l[s]
                } while (a < r && -1 == s);
                if (-1 == s) break;
                o.push((15 & n) << 4 | (60 & s) >> 2);
                do {
                    if (61 == (i = 255 & e.charCodeAt(a++))) return new Uint8Array(o);
                    i = l[i]
                } while (a < r && -1 == i);
                if (-1 == i) break;
                o.push((3 & s) << 6 | i)
            }
            return new Uint8Array(o)
        }
    }
    class si {
        static zipString(e) {
            const t = ti.deflate(e, {
                to: "string"
            });
            return ni.arrayBufferToBase64(t)
        }
        static unzipString(e) {
            return ti.inflate(ni.base64ToArrayBuffer(e), {
                to: "string"
            })
        }
    }
    e.world.afterEvents.worldInitialize.subscribe((t => {
        let n = (new e.DynamicPropertiesDefinition).defineString("__cache:", 980);
        t.propertyRegistry.registerEntityTypeDynamicProperties(n, e.MinecraftEntityTypes.player)
    }));
    class ii {
        constructor(e) {
            this.entity = e
        }
        load() {
            let e, t = this.entity.getDynamicProperty("__cache:");
            if ("string" == typeof t && void 0 !== (e = t)) {
                try {
                    e = si.unzipString(e)
                } catch (e) {
                    return
                }
                return this.tagFrom = e, e
            }
        }
        get(e) {
            if (this.cache) return this.cache; {
                let t = this.load();
                return t ? (this.cache = Ge.from(t, e), this.cache) : (this.cache = e, this.tagFrom = JSON.stringify(this.cache), this.entity.setDynamicProperty("__cache:", this.tagFrom), e)
            }
        }
        save() {
            let e = Ge.to(this.cache);
            e !== this.tagFrom && (this.entity.setDynamicProperty("__cache:", si.zipString(e)), this.tagFrom = e)
        }
    }
    var ai = function(e, t, n, s) {
            var i, a = arguments.length,
                r = a < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, n) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, s);
            else
                for (var o = e.length - 1; o >= 0; o--)(i = e[o]) && (r = (a < 3 ? i(r) : a > 3 ? i(t, n, r) : i(t, n)) || r);
            return a > 3 && r && Object.defineProperty(t, n, r), r
        },
        ri = function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
        };
    class oi extends s.Z {
        constructor(e, t, n) {
            super(e, t, n), this.gameControllers = [], this.enchantSystem = new ge(this), this.talentSystem = new ve(this), this.magicSystem = new fe(this), this.itemUseFunc = new je(this), this.ruinsSystem = new de(this), this.taskSystem = new Fe(this), this.interactSystem = new ye(this), this.globalSettings = new B(new O.C("wpsetting")), this.cache = new ii(this.exPlayer.entity), this.looper = r.Z.tickTask((() => {
                this.cache.save()
            })), this.looper.delay(200), this.looper.start(), this.data = this.cache.get(new j), this.globalSettings.ownerExists || (n.addTag("owner"), this.globalSettings.ownerExists = !0), this.addCtrller(this.enchantSystem), this.addCtrller(this.magicSystem), this.addCtrller(this.talentSystem), this.addCtrller(this.itemUseFunc), this.addCtrller(this.ruinsSystem), this.addCtrller(this.taskSystem), this.addCtrller(this.interactSystem), this.gameControllers.forEach((e => {
                (0, k.B)(this.getEvents(), e), e.onJoin()
            }))
        }
        onJoin() {
            this.setInterworkingPool({
                setSkyBox: () => {
                    return e = this, t = void 0, s = function*() {}, new((n = void 0) || (n = Promise))((function(i, a) {
                        function r(e) {
                            try {
                                l(s.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(s.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((s = s.apply(e, t || [])).next())
                    }));
                    var e, t, n, s
                }
            })
        }
        addCtrller(e) {
            this.gameControllers.push(e)
        }
        getLang() {
            var e;
            return G[null !== (e = this.data.lang) && void 0 !== e ? e : "en"]
        }
        onLoaded() {
            let e = w.Z.getInstance(this.player).getScoresManager();
            if (this.gameId = e.getScore("wbldid"), 0 === this.gameId && (this.gameId = Math.floor(Math.random() * R.Z.MAX_VALUE), e.setScore("wbldid", this.gameId)), this.gameControllers.forEach((e => e.onLoaded())), this.data.lang || this.exPlayer.runCommandAsync("mojang nmsl").catch((e => {
                    r.Z.hasChineseCharacter(JSON.stringify(e)) ? this.data.lang = "zh" : this.data.lang = "en"
                })), !this.data.licenseRead) {
                const e = r.Z.tickTask((() => {
                    new Xe(this, X, [
                        ["同意并继续", (t, n) => {
                            this.data.licenseRead = !0, e.stop()
                        }]
                    ]).showPage(), this.data.licenseRead || e.startOnce()
                })).delay(20);
                e.startOnce()
            }
            this.player.hasTag("wbmsyh") ? this.player.nameTag = "§a" + this.player.nameTag : this.player.nameTag = "§c" + this.player.nameTag, this.exPlayer.command.run(["execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbef 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbdj 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbdjcg 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbdjjf 0", 'execute as @s[tag=!wbyzc] at @s run give @s wb:power 1 0 {"minecraft:keep_on_death":{}}', "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbcsjs -1", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbnldx 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbldpd 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbldcg 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbfl 200", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbwqlq 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbkjlqcg 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbkjlqjs 0", "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbwqlqjs 100", "tag @s[scores={wbdj=-100..}] add wbyzc"])
        }
        onLeave() {
            this.gameControllers.forEach((e => e.onLeave())), this.looper.stop(), super.onLeave()
        }
        getPlayersAndIds() {
            let e = [];
            for (let t of this.getServer().getClients()) e.push([t.player, t.gameId]);
            return e
        }
        sayTo(e, t = this.player) {
            t.runCommandAsync(`tellraw @s {"rawtext": [{"text": "${e}"}]}`)
        }
        getServer() {
            return super.getServer()
        }
        taskUI(e, t) {
            this.taskSystem.show(e, t)
        }
        progressTaskFinish(e, t) {
            this.taskSystem.progressTaskFinish(e, t)
        }
    }
    ai([c("taskUi"), ri("design:type", Function), ri("design:paramtypes", [String, String]), ri("design:returntype", void 0)], oi.prototype, "taskUI", null), ai([c("progressTaskFinish"), ri("design:type", Function), ri("design:paramtypes", [String, Number]), ri("design:returntype", void 0)], oi.prototype, "progressTaskFinish", null);
    class li {
        constructor(e, t, n = 0) {
            this.mirror = "none", this.structureId = e, this.position = t, this.rotation = n
        }
        generate(e) {
            let t = this.rotation,
                s = n.Z.getInstance(e);
            (0, m.to)(s.command.run(`structure load ${this.structureId} ${this.position.x} ${this.position.y} ${this.position.z} ${Math.round(t)}_degrees ${this.mirror}`))
        }
    }
    class ci {
        constructor(e, t, n = 1) {
            this.width = t, this.height = n, this.size = e, this.jigsawData = Array.from(new Array(this.height), (() => Array.from(new Array(this.width), (() => new Array(this.width)))))
        }
        isEmpty(e, t, n = 0) {
            return void 0 === this.jigsawData[n][t][e]
        }
        setStructurePlane(e, t, n, s, i, a, r = 0, o = "none", l = 1, c = 1) {
            this.setStructure(e, t, 0, n, s, i, a, r, o, l, c, 1)
        }
        setStructure(e, t, n, s, i, a, r, o = 0, l = "none", c = 1, u = 1, h = 1) {
            this.clearStructure(e, t, n);
            for (let s = e; s < c + e; s++)
                for (let e = t; e < u + t; e++)
                    for (let t = n; t < h + n; t++)
                        if (!this.isEmpty(s, e, t)) throw new Error("Structure already contains " + s + " , " + t + " , " + e);
            for (let s = e; s < c + e; s++)
                for (let e = t; e < u + t; e++)
                    for (let t = n; t < h + n; t++) this.jigsawData[t][e][s] = ci.ContinueStructure;
            this.jigsawData[n][t][e] = [s, i, a, r, o, l, c, u, h]
        }
        fillStructure(e, t, n, s, i = 0, a = "none", r = 1, o = 1, l = 1) {
            const c = [e, t, n, s, i, a, r, o, l];
            for (let e = 0; e < this.width; e++)
                for (let t = 0; t < this.width; t++)
                    for (let n = 0; n < this.height; n++) this.jigsawData[n][t][e] = c
        }
        getStructure(e, t, n) {
            const s = this.findBaseStructure(e, t, n);
            if (void 0 === s) return;
            const i = this.jigsawData[s[0]][s[1]][s[2]];
            return i instanceof Array ? new ui(...i) : void 0
        }
        clearStructure(e, t, n = 0) {
            const s = this.findBaseStructure(e, t, n);
            if (void 0 !== s) {
                const [i, a, r] = s, o = this.jigsawData[r][a][i];
                if (void 0 !== o) {
                    if ("number" == typeof o) throw new Error("Error clearing");
                    for (let s = 0; s < o[6]; s++)
                        for (let i = 0; i < o[7]; i++)
                            for (let a = 0; a < o[8]; a++) this.jigsawData[a + n][i + t][s + e] = void 0
                }
            }
        }
        findBaseStructure(e, t, n = 0) {
            let s = this.jigsawData[n][t][e];
            if (void 0 !== s) {
                if (s === ci.ContinueStructure) {
                    for (; s === ci.ContinueStructure && n > 0;) s = this.jigsawData[n--][t][e];
                    for (; s === ci.ContinueStructure && t > 0;) s = this.jigsawData[n][t--][e];
                    for (; s === ci.ContinueStructure && e > 0;) s = this.jigsawData[n][t][e--];
                    return [e, t, n]
                }
                return [e, t, n]
            }
        }
        getWidth() {
            return this.size * this.width
        }
        getHeight() {
            return this.size * this.height
        }
        generate(e, n, s, i) {
            let a = new li("", new t.Z, 0);
            this.jigsawData.forEach(((t, r) => {
                t.forEach(((t, o) => {
                    t.forEach(((t, l) => {
                        "number" != typeof t && void 0 !== t && (a.position.set(e + l * this.size + t[0], n + r * this.size + t[1], s + o * this.size + t[2]), a.structureId = t[3], a.rotation = t[4], a.mirror = t[5], a.generate(i))
                    }))
                }))
            }))
        } [Symbol.toStringTag]() {
            return "symbol"
        }
        foreach(e) {
            const t = new ui(0, 0, 0, "", 0, "none", 1, 1, 1);
            for (let n = 0; n < this.height; n++)
                for (let s = 0; s < this.width; s++)
                    for (let i = 0; i < this.width; i++) {
                        let a = this.jigsawData[n][s][i];
                        a instanceof Array && (t.set(...a), e(t, i, s, n))
                    }
        }
    }
    ci.ContinueStructure = 1;
    class ui {
        constructor(e, t, n, s, i, a, r, o, l) {
            this.set(e, t, n, s, i, a, l, o, r)
        }
        set(e, t, n, s, i, a, r, o, l) {
            this.offsetX = e, this.offsetY = t, this.offsetZ = n, this.structureName = s, this.structureRot = i, this.mirror = a, this.coverGridHeight = r, this.coverGridWidth = o, this.coverGridLength = l
        }
    }
    class hi {
        constructor(e) {
            this.structure_area1 = "mystructure:boss_cave_area_b1", this.structure_area2 = "mystructure:boss_cave_area_b2", this.structure_area3 = "mystructure:boss_cave_area_b3", this.structure_area4 = "mystructure:boss_cave_area_b4", this._pathArea = [], this._monsterArea = [], this._playerArea = [], this.seed = e
        }
        init(e, n, s, i) {
            this._monsterArea = [], this._pathArea = [], this._playerArea = [], this.x = e, this.y = n, this.z = s, this.dim = i, this.jigsaw = new ci(32, 4), this.jigsaw.setStructurePlane(0, 0, 0, 0, 0, this.structure_area1, 0), this.jigsaw.setStructurePlane(1, 0, 0, 0, 0, this.structure_area2, 0), this.jigsaw.setStructurePlane(0, 1, 0, 0, 0, this.structure_area3, 0), this.jigsaw.setStructurePlane(1, 1, 0, 0, 0, this.structure_area4, 0), this.jigsaw.setStructurePlane(3, 0, 0, 0, 0, this.structure_area1, 90), this.jigsaw.setStructurePlane(3, 1, 0, 0, 0, this.structure_area2, 90), this.jigsaw.setStructurePlane(2, 0, 0, 0, 0, this.structure_area3, 90), this.jigsaw.setStructurePlane(2, 1, 0, 0, 0, this.structure_area4, 90), this.jigsaw.setStructurePlane(0, 3, 0, 0, 0, this.structure_area1, 270), this.jigsaw.setStructurePlane(0, 2, 0, 0, 0, this.structure_area2, 270), this.jigsaw.setStructurePlane(1, 3, 0, 0, 0, this.structure_area3, 270), this.jigsaw.setStructurePlane(1, 2, 0, 0, 0, this.structure_area4, 270), this.jigsaw.setStructurePlane(3, 3, 0, 0, 0, this.structure_area1, 180), this.jigsaw.setStructurePlane(2, 3, 0, 0, 0, this.structure_area2, 180), this.jigsaw.setStructurePlane(3, 2, 0, 0, 0, this.structure_area3, 180), this.jigsaw.setStructurePlane(2, 2, 0, 0, 0, this.structure_area4, 180), this._bossArea = new N(new t.Z(62, 13, 62).add(e, n, s), new t.Z(4, 6, 4)), this._playerArea.push(new N(new t.Z(15, 6, 39).add(e, n, s), new t.Z(1, 1, 1)), new N(new t.Z(89, 6, 15).add(e, n, s), new t.Z(1, 1, 1)), new N(new t.Z(39, 6, 113).add(e, n, s), new t.Z(1, 1, 1)), new N(new t.Z(113, 6, 89).add(e, n, s), new t.Z(1, 1, 1))), this._playerArea.push(new N(new t.Z(7, 50, 39).add(e, n, s), new t.Z(1, 1, 1)), new N(new t.Z(89, 50, 7).add(e, n, s), new t.Z(1, 1, 1)), new N(new t.Z(39, 50, 121).add(e, n, s), new t.Z(1, 1, 1)), new N(new t.Z(121, 50, 89).add(e, n, s), new t.Z(1, 1, 1)))
        }
        generate() {
            this.init(this.x, this.y, this.z, this.dim), this.jigsaw.generate(this.x, this.y, this.z, this.dim), this.dispose()
        }
        getPathArea() {
            return this._pathArea
        }
        getMonsterSpawnArea() {
            return this._monsterArea
        }
        getPlayerSpawnArea() {
            return this._playerArea
        }
        getBossSpawnArea() {
            return this._bossArea
        }
        dispose() {
            this.jigsaw = new ci(1, 1, 1)
        }
    }
    class di {
        constructor(e, t) {
            "number" == typeof e && "number" == typeof t ? (this.x = e, this.y = t) : void 0 === e && void 0 === t ? (this.x = 0, this.y = 0) : (this.x = e.x, this.y = e.y)
        }
        set(e, t) {
            return "number" == typeof e ? "number" == typeof t && (this.x = e, this.y = t) : this.set(e.x, e.y), this
        }
        add(e, t) {
            return "number" == typeof e ? "number" == typeof t && (this.x += e, this.y += t) : this.add(e.x, e.y), this
        }
        sub(e, t) {
            return "number" == typeof e ? "number" == typeof t && (this.x -= e, this.y -= t) : this.sub(e.x, e.y), this
        }
        scl(e, t, n) {
            return "number" == typeof e ? "number" == typeof t && "number" == typeof n ? (this.x *= e, this.y *= t) : void 0 === t && void 0 === n && (this.x *= e, this.y *= e) : this.sub(e.x, e.y), this
        }
        div(e) {
            return this.x /= e, this.y /= e, this
        }
        len() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
        }
        len2() {
            return Math.pow(this.x, 2) + Math.pow(this.y, 2)
        }
        equals(e) {
            return this.x === e.x && this.y === e.y
        }
        distance(e) {
            return this.clone().sub(e).len()
        }
        toString() {
            return `(${this.x}, ${this.y})`
        } [Symbol.toStringTag]() {
            return this.toString()
        }
        floor() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        }
        round() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        }
        ceil() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        }
        abs() {
            return this.x = Math.abs(this.x), this.y = Math.abs(this.y), this
        }
        mul(e) {
            return e.x * this.x + e.y * this.y
        }
        normalize() {
            return this.div(this.len()), this
        }
        clone() {
            return new di(this.x, this.y)
        }
    }
    di.back = new di(0, -1), di.forward = new di(0, 1), di.left = new di(-1, 0), di.one = new di(1, 1), di.right = new di(1, 0), di.zero = new di(0, 0);
    class mi {
        constructor(e) {
            this.structure_bossArea = "mystructure:boss_desert_1", this.structure_straightLine = "mystructure:boss_desert_2", this.structure_curve = "mystructure:boss_desert_3", this.structure_triple = "mystructure:boss_desert_4", this.structure_crossing = "mystructure:boss_desert_5", this.structure_straightLineTower = "mystructure:boss_desert_6", this.structure_towerBlock1 = "mystructure:boss_desert_7", this.structure_towerBlock2 = "mystructure:boss_desert_8", this.structure_towerBlock3 = "mystructure:boss_desert_10", this.structure_towerBlock4 = "mystructure:boss_desert_12", this.structure_upplain = "mystructure:boss_desert_13", this.structure_upstairs = "mystructure:boss_desert_14", this.structure_towerPiece = "mystructure:boss_desert_15", this.structure_boss = "mystructure:boss_desert_16", this.structure_block1 = "mystructure:boss_desert_9", this.structure_block2 = "mystructure:boss_desert_11", this.completed = !1, this.rooms = new Set, this.paths = new Set, this._pathArea = [], this._airPathArea = [], this._monsterArea = [], this._airMonsterArea = [], this._playerArea = [], this.seed = e
        }
        isCompleted() {
            return this.completed
        }
        isInRoom(e) {
            return this.rooms.has(e)
        }
        isOnPath(e) {
            return this.paths.has(e)
        }
        getPathArea() {
            return this._pathArea
        }
        getAirPathArea() {
            return this._airPathArea
        }
        getMonsterSpawnArea() {
            return this._monsterArea
        }
        getAirMonsterSpawnArea() {
            return this._airMonsterArea
        }
        getPlayerSpawnArea() {
            return this._playerArea
        }
        getBossSpawnArea() {
            return this._bossArea
        }
        dispose() {
            this.jigsaw = new ci(1, 1, 1)
        }
        generate() {
            this.init(this.x, this.y, this.z, this.dim), this.jigsaw.generate(this.x, this.y, this.z, this.dim), this.dispose()
        }
        init(e, n, s, i) {
            this.x = e, this.y = n, this.z = s, this.dim = i, this._bossArea = new N(new t.Z(254, 2, 254).add(e, n, s), new t.Z(4, 4, 4));
            const a = Array.from(new Array(32), (() => new Array(32).fill(0)));
            let r = 64,
                o = this.seed;
            const l = new R.Z(o),
                c = (e, t) => t >= 0 && t < a.length && e >= 0 && e < a[t].length ? a[t][e] : 3;
            for (let e = 14; e < 18; e++)
                for (let t = 14; t < 18; t++) a[e][t] = 4;
            for (; r > 0;) {
                let e = l.nextInt(32),
                    t = l.nextInt(32);
                4 !== a[e][t] && (a[e][t] = 1, r--)
            }
            let u = [
                [new di, di.forward]
            ];
            a[1][0] = 0;
            const h = new di;
            for (; u.length > 0;) {
                let e = [];
                e = [];
                for (let t of u)
                    if (h.set(t[0]).add(t[1]), !(0 !== c(h.x, h.y) || (t[1] !== di.right && t[1] !== di.left || 2 === c(h.x, h.y + 1) && 2 === c(h.x - 1, h.y + 1) || 2 === c(h.x, h.y + 1) && 2 === c(h.x + 1, h.y + 1) || 2 === c(h.x, h.y - 1) && 2 === c(h.x - 1, h.y - 1) || 2 === c(h.x, h.y - 1) && 2 === c(h.x + 1, h.y - 1)) && (t[1] !== di.forward && t[1] !== di.back || 2 === c(h.x + 1, h.y + 1) && 2 === c(h.x + 1, h.y) || 2 === c(h.x + 1, h.y - 1) && 2 === c(h.x + 1, h.y) || 2 === c(h.x - 1, h.y + 1) && 2 === c(h.x - 1, h.y) || 2 === c(h.x - 1, h.y - 1) && 2 === c(h.x - 1, h.y)))) {
                        a[h.y][h.x] = 2;
                        let t = u.length < 30 ? 4 : Math.min(4, l.nextInt(6)),
                            n = [di.forward, di.back, di.left, di.right];
                        for (; t > 0;) {
                            let s = l.nextInt(n.length);
                            e.push([h.clone(), n[s]]), n.splice(s, 1), t--
                        }
                    } u = e
            }
            class d {
                constructor(e, t, n) {
                    this.height = n, this.connections = new Set, this.x = e, this.y = t
                }*[Symbol.iterator]() {
                    for (let e of this.connections) yield e
                }
                connect(e) {
                    this.connections.add(e)
                } [Symbol.toStringTag]() {
                    return this.toString()
                }
                toString() {
                    return `(${this.x},${this.y},${this.height})`
                }
            }
            const m = Array.from(new Array(16), (() => new Array(16).fill(0))),
                p = (e, t) => t >= 0 && t < m.length && e >= 0 && e < m[t].length ? m[t][e] : 3;
            for (let e = 6; e < 10; e++)
                for (let t = 6; t < 10; t++) m[e][t] = 4;
            const g = [];
            for (r = 24; r > 0;) {
                let e = l.nextInt(16),
                    t = l.nextInt(16);
                const [n, s] = [16 - m.length / 2 + t, 16 - m.length / 2 + e], i = c(n, s);
                if (4 !== p(t, e) && 1 == i || 0 == i) {
                    const i = new d(e, t, 3 + Math.floor(r / 4));
                    g.push(i), m[e][t] = i, a[s][n] = 5, r--
                }
            }
            g.forEach((e => {
                for (let t = -4; t <= 4; t++)
                    for (let n = -4; n <= 4; n++)
                        if (0 != t || 0 != n) {
                            let s = p(e.x + t, e.y + n);
                            s instanceof d && e.connect(s)
                        }
            })), this.jigsaw = new ci(16, 32, 10), a.forEach(((e, t) => {
                e.forEach(((e, n) => {
                    if (1 === e) this.jigsaw.setStructurePlane(n, t, 0, 0, 0, [this.structure_block1, this.structure_block2][l.nextInt(2)], 90 * l.nextInt(4));
                    else if (0 === e) this.jigsaw.setStructurePlane(n, t, 0, 0, 0, [this.structure_towerBlock1, this.structure_towerBlock2, this.structure_towerBlock3, this.structure_towerBlock4][l.nextInt(4)], 90 * l.nextInt(4));
                    else if (5 === e) {
                        let e = p(n - 16 + m.length / 2, t - 16 + m.length / 2);
                        if (e instanceof d) {
                            let s = e.height;
                            for (; s >= 0;) this.jigsaw.setStructure(n, t, s, 0, 0, 0, this.structure_towerPiece, 0), s--
                        }
                    } else if (2 === e) {
                        let e = 2 === c(n, t + 1) ? 1 : 0,
                            s = 2 === c(n, t - 1) ? 1 : 0,
                            i = 2 === c(n + 1, t) ? 1 : 0,
                            a = 2 === c(n - 1, t) ? 1 : 0;
                        switch (e + a + i + s) {
                            case 1:
                                e + s === 1 ? this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_straightLine, 0) : a + i === 1 && this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_straightLine, 90);
                                break;
                            case 2:
                                if (e + s === 2) this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_straightLine, 0);
                                else if (a + i === 2) this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_straightLine, 90);
                                else if (1 === a)
                                    if (1 === e) this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_curve, 90);
                                    else {
                                        if (1 !== s) throw new Error("num error");
                                        this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_curve, 180)
                                    }
                                else if (1 === i)
                                    if (1 === e) this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_curve, 0);
                                    else {
                                        if (1 !== s) throw new Error("num error");
                                        this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_curve, 270)
                                    } break;
                            case 3:
                                0 === a ? this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_triple, 0) : 0 === s ? this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_triple, 90) : 0 === i ? this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_triple, 180) : 0 === e && this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_triple, 270);
                                break;
                            case 4:
                                this.jigsaw.setStructurePlane(n, t, 0, 0, 0, this.structure_crossing, 0)
                        }
                    }
                }))
            }));
            const y = new t.Z,
                f = new t.Z;
            g.forEach((e => {
                for (const t of e)
                    if (t.height > e.height) {
                        y.set(e.x, e.height, e.y), f.set(t.x, e.height, t.y).sub(y), f.set(f.x > 0 ? 1 : -1, e.height, f.z > 0 ? 1 : -1);
                        let n = 16 - m.length / 2;
                        if (l.nextBoolean()) {
                            for (; y.x != t.x; y.x += f.x) this.jigsaw.isEmpty(y.x + n, y.z + n, y.y) && this.jigsaw.setStructure(y.x + n, y.z + n, y.y, 0, 0, 0, this.structure_upplain);
                            for (; y.z != t.y; y.z += f.z) this.jigsaw.isEmpty(y.x + n, y.z + n, y.y) && this.jigsaw.setStructure(y.x + n, y.z + n, y.y, 0, 0, 0, this.structure_upplain)
                        } else {
                            for (; y.z != t.y; y.z += f.z) this.jigsaw.isEmpty(y.x + n, y.z + n, y.y) && this.jigsaw.setStructure(y.x + n, y.z + n, y.y, 0, 0, 0, this.structure_upplain);
                            for (; y.x != t.x; y.x += f.x) this.jigsaw.isEmpty(y.x + n, y.z + n, y.y) && this.jigsaw.setStructure(y.x + n, y.z + n, y.y, 0, 0, 0, this.structure_upplain)
                        }
                    }
            })), this.jigsaw.setStructurePlane(14, 14, 0, -1, 0, this.structure_boss, 0, "none", 2, 2), this.jigsaw.setStructurePlane(14, 16, 0, -1, 0, this.structure_boss, 270, "none", 2, 2), this.jigsaw.setStructurePlane(16, 14, 0, -1, 0, this.structure_boss, 90, "none", 2, 2), this.jigsaw.setStructurePlane(16, 16, 0, -1, 0, this.structure_boss, 180, "none", 2, 2), this._airMonsterArea = [], this._airPathArea = [], this._monsterArea = [], this._pathArea = [], this._playerArea = [], this.rooms = new Set, this.paths = new Set, this.jigsaw.foreach(((e, n, s, i) => {
                if (e.structureName === this.structure_straightLine || e.structureName === this.structure_triple || e.structureName === this.structure_curve || e.structureName === this.structure_crossing) this._pathArea.push(new N(new t.Z(n, i, s).scl(this.jigsaw.size).add(this.x, this.y, this.z), new t.Z(1, 1, 1).scl(this.jigsaw.size))), this.paths.add(`${n},${i},${s}`), e.structureName === this.structure_crossing && (this._playerArea.push(new N(new t.Z(n, i, s).scl(this.jigsaw.size).add(this.x, this.y, this.z), new t.Z(1, 1, 1).scl(this.jigsaw.size))), this.paths.add(`${n},${i},${s}`));
                else if (e.structureName === this.structure_towerBlock3 || e.structureName === this.structure_towerBlock4 || e.structureName === this.structure_towerBlock2 || e.structureName === this.structure_towerBlock1) this._monsterArea.push(new N(new t.Z(n, i, s).scl(this.jigsaw.size).add(this.x, this.y, this.z), new t.Z(1, 1, 1).scl(this.jigsaw.size))), this.rooms.add(`${n},${i},${s}`);
                else if (e.structureName === this.structure_boss);
                else if (e.structureName === this.structure_upplain) this._airPathArea.push(new N(new t.Z(n, i, s).scl(this.jigsaw.size).add(this.x, this.y, this.z), new t.Z(1, 1, 1).scl(this.jigsaw.size))), this.paths.add(`${n},${i},${s}`);
                else if (e.structureName === this.structure_towerPiece) {
                    let e = new t.Z(n, i, s).scl(this.jigsaw.size).add(this.x, this.y, this.z);
                    this._airMonsterArea.push(new N(e, new t.Z(1, 1, 1).scl(this.jigsaw.size))), this.rooms.add(`${n},${i},${s}`)
                }
            })), this.completed = !0
        }
    }
    class pi {
        constructor(e) {
            this.structure_area1 = "mystructure:boss_stone_area_b1", this.structure_area2 = "mystructure:boss_stone_area_b2", this.structure_area3 = "mystructure:boss_stone_area_b3", this.structure_area4 = "mystructure:boss_stone_area_b4", this._pathArea = [], this._monsterArea = [], this._playerArea = [], this.seed = e
        }
        init(e, n, s, i) {
            this._monsterArea = [], this._pathArea = [], this._playerArea = [], this.x = e, this.y = n, this.z = s, this.dim = i, this.jigsaw = new ci(32, 4), this.jigsaw.setStructurePlane(0, 0, 0, 0, 0, this.structure_area1, 0), this.jigsaw.setStructurePlane(1, 0, 0, 0, 0, this.structure_area2, 0), this.jigsaw.setStructurePlane(0, 1, 0, 0, 0, this.structure_area3, 0), this.jigsaw.setStructurePlane(1, 1, 0, 0, 0, this.structure_area4, 0), this.jigsaw.setStructurePlane(3, 0, 0, 0, 0, this.structure_area1, 90), this.jigsaw.setStructurePlane(3, 1, 0, 0, 0, this.structure_area2, 90), this.jigsaw.setStructurePlane(2, 0, 0, 0, 0, this.structure_area3, 90), this.jigsaw.setStructurePlane(2, 1, 0, 0, 0, this.structure_area4, 90), this.jigsaw.setStructurePlane(0, 3, 0, 0, 0, this.structure_area1, 270), this.jigsaw.setStructurePlane(0, 2, 0, 0, 0, this.structure_area2, 270), this.jigsaw.setStructurePlane(1, 3, 0, 0, 0, this.structure_area3, 270), this.jigsaw.setStructurePlane(1, 2, 0, 0, 0, this.structure_area4, 270), this.jigsaw.setStructurePlane(3, 3, 0, 0, 0, this.structure_area1, 180), this.jigsaw.setStructurePlane(2, 3, 0, 0, 0, this.structure_area2, 180), this.jigsaw.setStructurePlane(3, 2, 0, 0, 0, this.structure_area3, 180), this.jigsaw.setStructurePlane(2, 2, 0, 0, 0, this.structure_area4, 180), this._bossArea = new N(new t.Z(62, 2, 62).add(e, n, s), new t.Z(4, 6, 4)), this._playerArea.push(new N(new t.Z(6, 5, 6).add(e, n, s), new t.Z(2, 4, 2)), new N(new t.Z(120, 5, 6).add(e, n, s), new t.Z(2, 4, 2)), new N(new t.Z(6, 5, 120).add(e, n, s), new t.Z(2, 4, 2)), new N(new t.Z(120, 5, 120).add(e, n, s), new t.Z(2, 4, 2)))
        }
        generate() {
            this.init(this.x, this.y, this.z, this.dim), this.jigsaw.generate(this.x, this.y, this.z, this.dim), this.dispose()
        }
        getPathArea() {
            return this._pathArea
        }
        getMonsterSpawnArea() {
            return this._monsterArea
        }
        getPlayerSpawnArea() {
            return this._playerArea
        }
        getBossSpawnArea() {
            return this._bossArea
        }
        dispose() {
            this.jigsaw = new ci(1, 1, 1)
        }
    }
    class gi {
        constructor(e) {
            this.structure_area1 = "mystructure:boss_ancient_area1", this.structure_area2 = "mystructure:boss_ancient_area2", this.structure_area3 = "mystructure:boss_ancient_area3", this.structure_area4 = "mystructure:boss_ancient_area4", this._pathArea = [], this._monsterArea = [], this._playerArea = [], this.seed = e
        }
        init(e, n, s, i) {
            this._monsterArea = [], this._pathArea = [], this._playerArea = [], this.x = e, this.y = n, this.z = s, this.dim = i, this.jigsaw = new ci(32, 4), this.jigsaw.setStructurePlane(0, 0, 0, 0, 0, this.structure_area1, 0, "none"), this.jigsaw.setStructurePlane(3, 0, 0, 0, 0, this.structure_area1, 0, "z"), this.jigsaw.setStructurePlane(0, 3, 0, 0, 0, this.structure_area1, 0, "x"), this.jigsaw.setStructurePlane(3, 3, 0, 0, 0, this.structure_area1, 0, "xz"), this.jigsaw.setStructurePlane(1, 0, 0, 0, 0, this.structure_area2, 0, "none"), this.jigsaw.setStructurePlane(2, 0, 0, 0, 0, this.structure_area2, 0, "z"), this.jigsaw.setStructurePlane(1, 3, 0, 0, 0, this.structure_area2, 0, "x"), this.jigsaw.setStructurePlane(2, 3, 0, 0, 0, this.structure_area2, 0, "xz"), this.jigsaw.setStructurePlane(0, 1, 0, 0, 0, this.structure_area3, 0, "none"), this.jigsaw.setStructurePlane(3, 1, 0, 0, 0, this.structure_area3, 0, "z"), this.jigsaw.setStructurePlane(0, 2, 0, 0, 0, this.structure_area3, 0, "x"), this.jigsaw.setStructurePlane(3, 2, 0, 0, 0, this.structure_area3, 0, "xz"), this.jigsaw.setStructurePlane(1, 1, 0, 0, 0, this.structure_area4, 0, "none"), this.jigsaw.setStructurePlane(2, 1, 0, 0, 0, this.structure_area4, 0, "z"), this.jigsaw.setStructurePlane(1, 2, 0, 0, 0, this.structure_area4, 0, "x"), this.jigsaw.setStructurePlane(2, 2, 0, 0, 0, this.structure_area4, 0, "xz"), this._bossArea = new N(new t.Z(62, 2, 62).add(e, n, s), new t.Z(4, 6, 4)), this._playerArea.push(new N(new t.Z(10, 17, 40).add(e, n, s), new t.Z(2, 1, 2)), new N(new t.Z(118, 17, 40).add(e, n, s), new t.Z(2, 1, 2)), new N(new t.Z(118, 17, 88).add(e, n, s), new t.Z(2, 1, 2)), new N(new t.Z(10, 17, 88).add(e, n, s), new t.Z(2, 1, 2)))
        }
        generate() {
            this.init(this.x, this.y, this.z, this.dim), this.jigsaw.generate(this.x, this.y, this.z, this.dim), this.dispose()
        }
        getPathArea() {
            return this._pathArea
        }
        getMonsterSpawnArea() {
            return this._monsterArea
        }
        getPlayerSpawnArea() {
            return this._playerArea
        }
        getBossSpawnArea() {
            return this._bossArea
        }
        dispose() {
            this.jigsaw = new ci(1, 1, 1)
        }
    }
    class yi {
        constructor(e) {
            this.structure_area1 = "mystructure:boss_mind_area_b1", this.structure_area2 = "mystructure:boss_mind_area_b2", this.structure_area3 = "mystructure:boss_mind_area_b3", this.structure_area4 = "mystructure:boss_mind_area_b4", this._pathArea = [], this._monsterArea = [], this._playerArea = [], this.seed = e
        }
        init(e, n, s, i) {
            this._monsterArea = [], this._pathArea = [], this._playerArea = [], this.x = e, this.y = n, this.z = s, this.dim = i, this.jigsaw = new ci(32, 4), this.jigsaw.setStructurePlane(0, 0, 0, 0, 0, this.structure_area1, 0), this.jigsaw.setStructurePlane(1, 0, 0, 0, 0, this.structure_area2, 0), this.jigsaw.setStructurePlane(0, 1, 0, 0, 0, this.structure_area3, 0), this.jigsaw.setStructurePlane(1, 1, 0, 0, 0, this.structure_area4, 0), this.jigsaw.setStructurePlane(3, 0, 0, 0, 0, this.structure_area1, 90), this.jigsaw.setStructurePlane(3, 1, 0, 0, 0, this.structure_area2, 90), this.jigsaw.setStructurePlane(2, 0, 0, 0, 0, this.structure_area3, 90), this.jigsaw.setStructurePlane(2, 1, 0, 0, 0, this.structure_area4, 90), this.jigsaw.setStructurePlane(0, 3, 0, 0, 0, this.structure_area1, 270), this.jigsaw.setStructurePlane(0, 2, 0, 0, 0, this.structure_area2, 270), this.jigsaw.setStructurePlane(1, 3, 0, 0, 0, this.structure_area3, 270), this.jigsaw.setStructurePlane(1, 2, 0, 0, 0, this.structure_area4, 270), this.jigsaw.setStructurePlane(3, 3, 0, 0, 0, this.structure_area1, 180), this.jigsaw.setStructurePlane(2, 3, 0, 0, 0, this.structure_area2, 180), this.jigsaw.setStructurePlane(3, 2, 0, 0, 0, this.structure_area3, 180), this.jigsaw.setStructurePlane(2, 2, 0, 0, 0, this.structure_area4, 180), this._bossArea = new N(new t.Z(62, 36, 62).add(e, n, s), new t.Z(4, 6, 4)), this._playerArea.push(new N(new t.Z(36, 37, 36).add(e, n, s), new t.Z(50, 4, 50)))
        }
        generate() {
            this.init(this.x, this.y, this.z, this.dim), this.jigsaw.generate(this.x, this.y, this.z, this.dim), this.dispose()
        }
        getPathArea() {
            return this._pathArea
        }
        getMonsterSpawnArea() {
            return this._monsterArea
        }
        getPlayerSpawnArea() {
            return this._playerArea
        }
        getBossSpawnArea() {
            return this._bossArea
        }
        dispose() {
            this.jigsaw = new ci(1, 1, 1)
        }
    }
    const fi = ["dec:god_of_destroy", "dec:destroy_staff", "wb:pickaxex_equipment_a", "wb:axex_equipment_a"];
    class wi {
        constructor(t) {
            this.time = null != t ? t : e.world.getAbsoluteTime()
        }
        print() {
            e.world.sendMessage("time is " + this.time)
        }
        isDay() {
            return this.days() < 12e3
        }
        isNight() {
            return this.days() > 12e3
        }
        days() {
            return this.time - 24e3 * Math.floor(this.time / 24e3)
        }
    }
    var bi = function(e, t, n, s) {
            var i, a = arguments.length,
                r = a < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, n) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, s);
            else
                for (var o = e.length - 1; o >= 0; o--)(i = e[o]) && (r = (a < 3 ? i(r) : a > 3 ? i(t, n, r) : i(t, n)) || r);
            return a > 3 && r && Object.defineProperty(t, n, r), r
        },
        vi = function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
        };
    class _i extends D {
        constructor(s) {
            super(s), this.tps = 20, this._mtps = 20, this.fakeplayers = [], this.setting = new B(new O.C("wpsetting")), (this.clearEntityNumUpdate = new T(this.getEvents(), (() => {
                this.updateClearEntityNum()
            })).delay(1e4)).start(), this.updateClearEntityNum(), this.entityCleaner = new T(this.getEvents(), (() => {
                let t = Array.from(n.Z.getInstance(this.getDimension(e.MinecraftDimensionTypes.overworld)).getEntities()).concat(Array.from(n.Z.getInstance(this.getDimension(e.MinecraftDimensionTypes.theEnd)).getEntities())).concat(Array.from(n.Z.getInstance(this.getDimension(e.MinecraftDimensionTypes.nether)).getEntities())),
                    s = new Map;
                t.forEach((e => {
                    var t;
                    null != (null == e ? void 0 : e.typeId) && s.set(e.typeId, (null !== (t = s.get(e.typeId)) && void 0 !== t ? t : 0) + 1)
                }));
                let i = [0, ""];
                s.forEach(((t, n) => {
                    t > i[0] && -1 === [e.MinecraftEntityTypes.player.id, e.MinecraftEntityTypes.villager.id, e.MinecraftEntityTypes.villagerV2.id].indexOf(n) && (i[0] = t, i[1] = n)
                })), t.length > this.entityCleanerLeastNum && (this.say("Clear Entity Type：" + i[1]), this.say("Clear Entity Num：" + i[0]), t.forEach((e => {
                    e && e.typeId && e.typeId === i[1] && ("minecraft:item" === e.typeId && 0 !== e.getViewDirection().y || e.kill())
                })))
            })).delay(8e3), this.upDateEntityCleaner();
            let i = 0;
            this.tpsListener = new T(this.getEvents(), (() => {
                this.tps = i;
                let e = this.tps - this._mtps > 0 ? this.entityCleanerStrength : 11 - this.entityCleanerStrength;
                this._mtps = this._mtps * (e - 1) / e + this.tps / e, this.entityCleaner.delay(Math.pow(this.entityCleanerDelay, this._mtps)), i = 0
            })).delay(1e3), this.getEvents().exEvents.tick.subscribe((e => {
                i++
            })), this.tpsListener.start(), this.portal_desertBoss = new A, this.portal_desertBoss.setDirection(A.DIRECTION_LAY).setStructure([
                ["XXXXX", "XWWWX", "XWYWX", "XWWWX", "XXXXX"],
                ["XSXSX", "SAAAS", "XAAAX", "SAAAS", "XSXSX"],
                ["CAAAC", "AAAAA", "AAAAA", "AAAAA", "CAAAC"]
            ]).analysis({
                X: e.MinecraftBlockTypes.sandstone.id,
                W: e.MinecraftBlockTypes.water.id,
                Y: "wb:block_magic_equipment",
                A: e.MinecraftBlockTypes.air.id,
                S: e.MinecraftBlockTypes.stoneBlockSlab2.id,
                C: e.MinecraftBlockTypes.cobblestoneWall.id
            }), this.portal_stoneBoss = new A, this.portal_stoneBoss.setDirection(A.DIRECTION_LAY).setStructure([
                ["BXXXB", "XWWWX", "XWYWX", "XWWWX", "BXXXB"],
                ["BASAB", "AAAAA", "SAAAS", "AAAAA", "BASAB"]
            ]).analysis({
                X: e.MinecraftBlockTypes.sandstone.id,
                W: e.MinecraftBlockTypes.water.id,
                Y: "wb:block_energy_seal",
                S: e.MinecraftBlockTypes.cobblestoneWall.id,
                A: e.MinecraftBlockTypes.air.id,
                B: e.MinecraftBlockTypes.stonebrick.id
            }), this.portal_caveBoss = new A, this.portal_caveBoss.setDirection(A.DIRECTION_LAY).setStructure([
                ["XXXXX", "XWWWX", "XWYWX", "XWWWX", "XXXXX"],
                ["XASAX", "AAAAA", "SAAAS", "AAAAA", "XASAX"]
            ]).analysis({
                X: e.MinecraftBlockTypes.deepslateTiles.id,
                W: e.MinecraftBlockTypes.water.id,
                Y: "wb:block_energy_boundary",
                S: e.MinecraftBlockTypes.lantern.id,
                A: e.MinecraftBlockTypes.air.id
            }), this.portal_ancientBoss = new A, this.portal_ancientBoss.setDirection(A.DIRECTION_LAY).setStructure([
                ["BXXXB", "XWWWX", "XWYWX", "XWWWX", "BXXXB"],
                ["BASAB", "AAAAA", "SAAAS", "AAAAA", "BASAB"]
            ]).analysis({
                X: e.MinecraftBlockTypes.chiseledDeepslate.id,
                W: e.MinecraftBlockTypes.water.id,
                Y: "wb:block_magic_ink",
                S: e.MinecraftBlockTypes.verdantFroglight.id,
                A: e.MinecraftBlockTypes.air.id,
                B: e.MinecraftBlockTypes.mossyCobblestone.id
            }), this.portal_mindBoss = new A, this.portal_mindBoss.setDirection(A.DIRECTION_LAY).setStructure([
                ["XSSSX", "SWWWS", "SWYWS", "SWWWS", "XSSSX"],
                ["XAAAX", "AAAAA", "AAAAA", "AAAAA", "XAAAX"]
            ]).analysis({
                X: "wb:block_magic_equipment",
                W: e.MinecraftBlockTypes.water.id,
                Y: "wb:block_senior_equipment",
                S: "wb:block_magic_barrier",
                A: e.MinecraftBlockTypes.air.id
            });
            let a = new R.Z(this.setting.worldSeed);
            this.ruin_desertBoss = new mi(a.nextInt()), this.ruin_stoneBoss = new pi(a.nextInt()), this.ruin_caveBoss = new hi(a.nextInt()), this.ruin_ancientBoss = new gi(a.nextInt()), this.ruin_mindBoss = new yi(a.nextInt()), p.push((() => {
                this.ruin_desertBoss.init(K.DESERT_RUIN_LOCATION_START.x, K.DESERT_RUIN_LOCATION_START.y, K.DESERT_RUIN_LOCATION_START.z, this.getDimension(e.MinecraftDimensionTypes.theEnd)), this.ruin_desertBoss.dispose(), this.ruin_stoneBoss.init(K.STONE_RUIN_LOCATION_START.x, K.STONE_RUIN_LOCATION_START.y, K.STONE_RUIN_LOCATION_START.z, this.getDimension(e.MinecraftDimensionTypes.theEnd)), this.ruin_stoneBoss.dispose(), this.ruin_caveBoss.init(K.CAVE_RUIN_LOCATION_START.x, K.CAVE_RUIN_LOCATION_START.y, K.CAVE_RUIN_LOCATION_START.z, this.getDimension(e.MinecraftDimensionTypes.theEnd)), this.ruin_caveBoss.dispose(), this.ruin_ancientBoss.init(K.ANCIENT_RUIN_LOCATION_START.x, K.ANCIENT_RUIN_LOCATION_START.y, K.ANCIENT_RUIN_LOCATION_START.z, this.getDimension(e.MinecraftDimensionTypes.theEnd)), this.ruin_ancientBoss.dispose(), this.ruin_mindBoss.init(K.MIND_RUIN_LOCATION_START.x, K.MIND_RUIN_LOCATION_START.y, K.MIND_RUIN_LOCATION_START.z, this.getDimension(e.MinecraftDimensionTypes.theEnd)), this.ruin_ancientBoss.dispose()
            }));
            const o = () => {
                let t = this.getExDimension(e.MinecraftDimensionTypes.theEnd).getEntities({
                    location: K.DESERT_RUIN_LOCATION_CENTER,
                    maxDistance: 400
                });
                for (let e of t) "minecraft:item" === e.typeId && 0 === e.getViewDirection().y && e.kill()
            };
            this.ruinCleaner = r.Z.tickTask((() => {
                o()
            })).delay(1200), o(), this.ruinCleaner.start();
            const l = e => K.DESERT_RUIN_PROTECT_AREA.contains(e) || K.STONE_RUIN_PROTECT_AREA.contains(e) || K.CAVE_RUIN_PROTECT_AREA.contains(e) || K.ANCIENT_RUIN_PROTECT_AREA.contains(e) || K.MIND_RUIN_PROTECT_AREA.contains(e);
            this.getEvents().events.afterBlockBreak.subscribe((t => {
                if (t.dimension === this.getDimension(e.MinecraftDimensionTypes.theEnd) && l(t.block)) {
                    let n = w.Z.getInstance(t.player),
                        s = t.dimension.getBlock(t.block.location);
                    if (!s) return;
                    s.setType(t.brokenBlockPermutation.type), n.exDimension.command.run("kill @e[type=item,r=2,x=" + t.block.x + ",y=" + t.block.y + ",z=" + t.block.z + "]"), n.addEffect(e.MinecraftEffectTypes.nausea, 200, 0, !0), n.addEffect(e.MinecraftEffectTypes.darkness, 400, 0, !0), n.addEffect(e.MinecraftEffectTypes.wither, 100, 0, !0), n.addEffect(e.MinecraftEffectTypes.miningFatigue, 600, 2, !0), n.addEffect(e.MinecraftEffectTypes.hunger, 600, 1, !0), n.addEffect(e.MinecraftEffectTypes.blindness, 200, 0, !0), n.command.run('tellraw @s { "rawtext" : [ { "translate" : "text.dec:i_inviolable.name" } ] }')
                }
            })), this.getEvents().events.beforeItemUseOn.subscribe((t => {
                t.source.dimension === this.getDimension(e.MinecraftDimensionTypes.theEnd) && l(t.block) && (t.cancel = !0)
            })), this.getEvents().events.beforeExplosion.subscribe((t => {
                t.source && t.dimension === this.getDimension(e.MinecraftDimensionTypes.theEnd) && l(t.source.location) && 0 !== t.getImpactedBlocks.length && (this.getExDimension(e.MinecraftDimensionTypes.theEnd).spawnParticle("dec:damp_explosion_particle", t.source.location), t.cancel = !0)
            })), this.getEvents().events.beforeItemUse.subscribe((t => {
                var n;
                t.source.dimension === this.getDimension(e.MinecraftDimensionTypes.theEnd) && l(t.source.location) && (n = t.itemStack.typeId, fi.includes(n) && (t.cancel = !0))
            }));
            const c = this.getExDimension(e.MinecraftDimensionTypes.theEnd);
            let u = 0;
            const h = new t.Z,
                d = new t.Z;
            this.ruinDesertGuardPos = new t.Z(K.DESERT_RUIN_LOCATION_CENTER), this.ruinDesertGuardRule = r.Z.tickTask((() => {
                if (c.spawnParticle("wb:ruin_desert_guardpar", this.ruinDesertGuardPos), u > 400 && (u = 0), u > 200) {
                    let t = c.getPlayers({
                        location: K.DESERT_RUIN_LOCATION_CENTER,
                        maxDistance: 400,
                        closest: 1,
                        gameMode: e.GameMode.adventure
                    });
                    if (t.length > 0) {
                        const e = t[0].location;
                        e.x && e.y && e.z && (d.set(e), h.set(this.ruinDesertGuardPos), d.sub(h), d.len() < 2 && C.Z.getInstance(t[0]).damage(4), d.normalize(), h.set(e).sub(K.DESERT_RUIN_LOCATION_START).div(16).floor(), this.ruin_desertBoss.isInRoom(`${h.x},${h.y},${h.z}`) ? this.ruinDesertGuardPos.add(d.scl(.2)) : this.ruinDesertGuardPos.add(d.scl(.38)))
                    }
                }
                u += 1
            })).delay(1), this.ruinFuncLooper = r.Z.tickTask((() => {
                var t;
                let n = !1,
                    s = !1;
                for (let e of this.getClients()) h.set(e.player.location), this.ruin_desertBoss.isCompleted() && h.x >= K.DESERT_RUIN_LOCATION_START.x && h.x <= K.DESERT_RUIN_LOCATION_END.x && h.z >= K.DESERT_RUIN_LOCATION_START.z && h.z <= K.DESERT_RUIN_LOCATION_END.z && (n = !0), h.x >= K.MIND_RUIN_LOCATION_START.x && h.x <= K.MIND_RUIN_LOCATION_END.x && h.z >= K.MIND_RUIN_LOCATION_START.z && h.z <= K.MIND_RUIN_LOCATION_END.z && (s = !0);
                if (n ? (this.ruinDesertGuardRule.start(), this.ruinCleaner.start()) : (this.ruinDesertGuardRule.stop(), this.ruinCleaner.stop()), s) {
                    let n = null === (t = this.ruin_mindBoss.getBossSpawnArea()) || void 0 === t ? void 0 : t.center();
                    n && !he.find(n) && this.getExDimension(e.MinecraftDimensionTypes.theEnd).spawnParticle("wb:ruin_mind_boss_center_par", n)
                }
            })).delay(240), this.ruinFuncLooper.start(), this.getEvents().events.afterEntitySpawn.subscribe((t => {
                t.entity.typeId === e.MinecraftEntityTypes.enderman.id && t.entity.dimension === this.getDimension(e.MinecraftDimensionTypes.theEnd) && l(t.entity.location) && t.entity.triggerEvent("minecraft:despawn")
            })), this.addEntityController(qe.typeId, qe), this.addEntityController(Be.typeId, Be), this.addEntityController(Le.typeId, Le), this.addEntityController(Pe.typeId, Pe), this.addEntityController(We.typeId, We), this.addEntityController(Ve.typeId, Ve)
        }
        sayTo(t) {
            this.getExDimension(e.MinecraftDimensionTypes.theEnd).command.run(`tellraw @a {"rawtext": [{"text": "${t}"}]}`)
        }
        updateClearEntityNum() {
            this.entityCleanerStrength = this.setting.entityCleanerStrength, this.entityCleanerLeastNum = this.setting.entityCleanerLeastNum, this.entityCleanerDelay = (60 - this.setting.entityCleanerDelay) / 100 + 1.8
        }
        upDateEntityCleaner() {
            this.setting.entityCleaner ? this.entityCleaner.start() : this.entityCleaner.stop()
        }
        time(e) {
            (new wi).print()
        }
        damageShow(e) {
            be(n.Z.getInstance(e.hurtEntity.dimension), e.damage, e.hurtEntity.location)
        }
        newClient(e, t) {
            return new oi(this, e, t)
        }
    }
    bi([(0, k.K)(u.gw.beforeChatSend, ((e, t) => "time" === t.message)), vi("design:type", Function), vi("design:paramtypes", [e.ChatSendBeforeEvent]), vi("design:returntype", void 0)], _i.prototype, "time", null), bi([(0, k.K)(u.gw.afterEntityHurt, ((t, n) => t.setting.damageShow && n.damageSource.cause !== e.EntityDamageCause.suicide)), vi("design:type", Function), vi("design:paramtypes", [e.EntityHurtAfterEvent]), vi("design:returntype", void 0)], _i.prototype, "damageShow", null);
    class ki {
        constructor(e, t, n, s) {
            this.head = e, this.chest = t, this.legs = n, this.boots = s
        }
        detect(e) {
            return e.detectArmor(this.head, this.chest, this.legs, this.boots)
        }
        find(e) {
            return t = this, n = void 0, i = function*() {
                try {
                    return yield e.run("execute as @a if entity @s[hasitem={location=slot.armor.head,item=" + this.head + "}] if entity @s[hasitem={location=slot.armor.chest,item=" + this.chest + "}] if entity @s[hasitem={location=slot.armor.legs,item=" + this.legs + "}] if entity @s[hasitem={location=slot.armor.feet,item=" + this.boots + "}] run tag @s add armorTest:" + this.name)
                } catch (e) {
                    return e
                }
            }, new((s = void 0) || (s = Promise))((function(e, a) {
                function r(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        a(e)
                    }
                }

                function o(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }

                function l(t) {
                    var n;
                    t.done ? e(t.value) : (n = t.value, n instanceof s ? n : new s((function(e) {
                        e(n)
                    }))).then(r, o)
                }
                l((i = i.apply(t, n || [])).next())
            }));
            var t, n, s, i
        }
    }
    let Ei = {
            rupert: new ki("dec:rupert_helmet", "dec:rupert_chestplate", "dec:rupert_leggings", "dec:rupert_boots"),
            lava: new ki("dec:lava_helmet", "dec:lava_chestplate", "dec:lava_leggings", "dec:lava_boots"),
            crying: new ki("dec:crying_helmet", "dec:crying_chestplate", "dec:crying_leggings", "dec:crying_boots"),
            everlasting_winter: new ki("dec:everlasting_winter_helmet", "dec:everlasting_winter_chestplate", "dec:everlasting_winter_leggings", "dec:everlasting_winter_boots"),
            amethyst: new ki("dec:amethyst_helmet", "dec:amethyst_chestplate", "dec:amethyst_leggings", "dec:amethyst_boots"),
            turtle: new ki("minecraft:turtle_helmet", "dec:turtle_chestplate", "dec:turtle_leggings", "dec:turtle_boots"),
            wood: new ki("dec:wood_helmet", "dec:wood_chestplate", "dec:wood_leggings", "dec:wood_boots")
        },
        Ti = function(e, t) {
            for (let n in t) n in e || (e[n] = t[n]);
            return e
        }({
            bloodsucking: new ki("wb:armor_bloodsucking_helmet", "wb:armor_bloodsucking_chestplate", "wb:armor_bloodsucking_leggings", "wb:armor_bloodsucking_boots"),
            ink: new ki("wb:armor_ink_helmet", "wb:armor_ink_chestplate", "wb:armor_ink_leggings", "wb:armor_ink_boots"),
            forget: new ki("wb:armor_forget_helmet", "wb:armor_forget_chestplate", "wb:armor_forget_leggings", "wb:armor_forget_boots"),
            seal: new ki("wb:armor_seal_helmet", "wb:armor_seal_chestplate", "wb:armor_seal_leggings", "wb:armor_seal_boots"),
            equipment: new ki("wb:armor_equipment_helmet", "wb:armor_equipment_chestplate", "wb:armor_equipment_leggings", "wb:armor_equipment_boots"),
            water: new ki("wb:armor_water_helmet", "wb:armor_water_chestplate", "wb:armor_water_leggings", "wb:armor_water_boots"),
            senior_bloodsucking: new ki("wb:armor_senior_bloodsucking_helmet", "wb:armor_senior_bloodsucking_chestplate", "wb:armor_senior_bloodsucking_leggings", "wb:armor_senior_bloodsucking_boots"),
            senior_ink: new ki("wb:armor_senior_ink_helmet", "wb:armor_senior_ink_chestplate", "wb:armor_senior_ink_leggings", "wb:armor_senior_ink_boots"),
            senior_forget: new ki("wb:armor_senior_forget_helmet", "wb:armor_senior_forget_chestplate", "wb:armor_senior_forget_leggings", "wb:armor_senior_forget_boots"),
            senior_seal: new ki("wb:armor_senior_seal_helmet", "wb:armor_senior_seal_chestplate", "wb:armor_senior_seal_leggings", "wb:armor_senior_seal_boots"),
            senior_equipment: new ki("wb:armor_senior_equipment_helmet", "wb:armor_senior_equipment_chestplate", "wb:armor_senior_equipment_leggings", "wb:armor_senior_equipment_boots"),
            senior_water: new ki("wb:armor_senior_water_helmet", "wb:armor_senior_water_chestplate", "wb:armor_senior_water_leggings", "wb:armor_senior_water_boots")
        }, Ei),
        Mi = new Map;
    for (let e in Ti) Ti[e].name = e, Mi.set(Ti[e], e);
    class Ii {
        static isDec() {
            return "DEC" === i.Z.config.addonName
        }
    }
    class xi extends s.Z {
        constructor(e, n, s) {
            super(e, n, s), this.useArmor = void 0, this.tmpV = new t.Z(0, 0, 0), this.globalscores = new L(new O.C("global"))
        }
        onJoin() {
            super.onJoin(), this.getEvents().exEvents.afterPlayerHurt.subscribe((t => {
                this.exPlayer.health <= 0 && (this.exPlayer.command.run("function die/normal"), 1 === this.globalscores.getNumber("DieMode") ? this.exPlayer.command.run("function die/die_mode") : 1 == U.randomInteger(1, 3) && this.exPlayer.command.run("function die/ghost"));
                let n = U.randomInteger(1, 100);
                if (1 <= n && n <= 20 && this.useArmor === Ei.rupert && (this.player.addEffect(e.MinecraftEffectTypes.regeneration, 200), this.player.addEffect(e.MinecraftEffectTypes.speed, 100), this.tmpV.set(this.player.location).add(0, 1, 0), this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV), this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV), this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV), this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV), this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV)), this.useArmor === Ei.lava && (this.tmpV.set(this.player.location).add(0, 1, 0), this.getExDimension().spawnParticle("dec:fire_spurt_particle", this.tmpV), this.player.addEffect(e.MinecraftEffectTypes.fireResistance, 80)), this.useArmor === Ei.crying && (n < 1 || (1 <= n && n <= 10 ? this.player.addEffect(e.MinecraftEffectTypes.weakness, 100) : n <= 20 ? this.player.addEffect(e.MinecraftEffectTypes.slowness, 80) : n <= 30 ? this.player.addEffect(e.MinecraftEffectTypes.blindness, 100) : n <= 40 && this.player.addEffect(e.MinecraftEffectTypes.nausea, 140))), 1 <= n && n <= 12 && this.useArmor === Ei.everlasting_winter) {
                    for (let t of this.getDimension().getEntities({
                            maxDistance: 5,
                            location: this.player.location
                        })) t != this.player && this.exPlayer.addEffect(e.MinecraftEffectTypes.slowness, 60, 1);
                    this.exPlayer.addEffect(e.MinecraftEffectTypes.healthBoost, 600, 0), this.tmpV.set(this.player.location), this.getExDimension().spawnParticle("dec:everlasting_winter_spurt_particle", this.tmpV)
                }
                if (!Ii.isDec() && !this.player.hasTag("wbkjlq")) switch (this.useArmor) {
                    case Ti.bloodsucking:
                        this.exPlayer.command.run("function armor/bloodsucking");
                        break;
                    case Ti.senior_bloodsucking:
                        this.exPlayer.command.run("function armor/bloodsucking2");
                        break;
                    case Ti.ink:
                    case Ti.senior_ink:
                        break;
                    case Ti.senior_seal:
                        this.exPlayer.command.run("function armor/seal2");
                        break;
                    case Ti.seal:
                        this.exPlayer.command.run("function armor/seal");
                        break;
                    case Ti.senior_water:
                        this.exPlayer.command.run("function armor/water2");
                        break;
                    case Ti.water:
                        this.exPlayer.command.run("function armor/water");
                        break;
                    case Ti.senior_equipment:
                        this.exPlayer.command.run("function armor/equipment2");
                        break;
                    case Ti.equipment:
                        this.exPlayer.command.run("function armor/equipment");
                        break;
                    case Ti.senior_forget:
                        this.exPlayer.command.run("function armor/forget2");
                        break;
                    case Ti.forget:
                        this.exPlayer.command.run("function armor/forget")
                }
            })), this.getEvents().exEvents.afterItemOnHandChange.subscribe((e => {
                let t = this.exPlayer.getBag();
                const n = e.afterItem;
                if (n && "dec:magic_scroll_blue" == n.typeId && 1 == n.amount && 0 == n.getLore().length) {
                    let e = U.randomInteger(1, 3),
                        s = n,
                        i = [],
                        a = Ii.isDec() ? Ie : xe;
                    for (let t = 0; t < e; t++) i.push(R.Z.choice(a).id.split("").map((e => De[parseInt(e)])).join(" "));
                    s.setLore(i), t.setItemOnHand(s)
                }
            })), this.getEvents().exEvents.tick.subscribe((t => {
                var n;
                const s = this.player,
                    i = this.exPlayer,
                    a = this.exPlayer.getScoresManager();
                if (s.isSneaking ? s.addTag("is_sneaking") : s.removeTag("is_sneaking"), s.dimension.id === e.MinecraftDimensionTypes.overworld ? (s.addTag("dOverworld"), s.removeTag("dNether"), s.removeTag("dTheEnd")) : s.dimension.id === e.MinecraftDimensionTypes.nether ? (s.addTag("dNether"), s.removeTag("dOverworld"), s.removeTag("dTheEnd"), t.currentTick % 80 == 0 && i.command.run('fog @s remove "night_event"')) : s.dimension.id === e.MinecraftDimensionTypes.theEnd && (s.addTag("dTheEnd"), s.removeTag("dNether"), s.removeTag("dOverworld"), t.currentTick % 80 == 0 && i.command.run('fog @s remove "night_event"')), t.currentTick % 20 == 0 && this.useArmor === Ei.amethyst)
                    if (Ii.isDec()) {
                        let e = a.getScore("magicpoint");
                        11 <= e && e <= 29 && (this.getExDimension().spawnParticle("dec:amethyst_armor_magic_increase_particle", s.location), a.addScore("magicpoint", 1))
                    } else {
                        let e = a.getScore("wbfl");
                        20 <= e && e <= 100 && (this.getExDimension().spawnParticle("dec:amethyst_armor_magic_increase_particle", s.location), a.addScore("wbfl", 1))
                    } t.currentTick % 40 == 0 && (this.useArmor === Ei.rupert && this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV.set(s.location).add(0, 1, 0)), s.isSneaking && this.useArmor === Ei.turtle && "dec:turtle_sword" === (null === (n = i.getBag().getItemOnHand()) || void 0 === n ? void 0 : n.typeId) && (i.addEffect(e.MinecraftEffectTypes.slowness, 100, 5), i.addEffect(e.MinecraftEffectTypes.slowness, 40, 3), i.addEffect(e.MinecraftEffectTypes.slowness, 40, 50))), t.currentTick % 100 == 0 && this.useArmor === Ei.wood && (Ii.isDec() ? a.getScore("magicpoint") <= 15 && (this.getExDimension().spawnParticle("dec:wood_armor_magic_increase_particle", s.location), a.addScore("magicpoint", 1)) : a.getScore("wbfl") <= 70 && (this.getExDimension().spawnParticle("dec:wood_armor_magic_increase_particle", s.location), a.addScore("wbfl", 1)))
            })), this.getEvents().exEvents.afterItemUse.subscribe((e => {
                "dec:magic_scroll_blue" == e.itemStack.typeId && (Ii.isDec() ? function(e, t) {
                    let n = new se.ActionFormData;
                    n = n.title("text.dec:task_choose_title.name"), n = n.body("text.dec:task_choose_body.name");
                    let s = t.getLore();
                    s.forEach((e => {
                        n = n.button(e)
                    })), n.show(e.player).then((t => {
                        if (null != t.selection) {
                            let n = Se(s[t.selection]);
                            ! function(e, t) {
                                let n = (new se.ActionFormData).button("text.dec:task_complete_button.name");
                                const s = Ie.findIndex((e => e.id === t)); - 1 !== s && n.title(Ie[s].title()).body(Ie[s].body()).show(e.player).then((t => {
                                    0 == t.selection && Ie[s].detect(e.exPlayer)
                                }))
                            }(e, n)
                        }
                    }))
                }(this, e.itemStack) : l.postMessageBetweenClient(this, _i, "taskUi", ["paperTask", "1"]))
            }))
        }
        checkArmor() {
            return e = this, t = void 0, s = function*() {
                return Ii.isDec() || (this.useArmor === Ti.ink ? this.player.triggerEvent("armor_ink") : this.useArmor === Ti.senior_ink ? this.player.triggerEvent("armor_senior_ink") : this.player.triggerEvent("hostile_mode")), !!this.useArmor && (yield this.useArmor.detect(this.exPlayer))
            }, new((n = void 0) || (n = Promise))((function(i, a) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        a(e)
                    }
                }

                function o(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(r, o)
                }
                l((s = s.apply(e, t || [])).next())
            }));
            var e, t, n, s
        }
        chooseArmor(e) {
            this.useArmor = e
        }
        onLoaded() {
            super.onLoaded()
        }
        onLeave() {
            super.onLeave()
        }
    }
    class Di extends Re {
        constructor(e, t) {
            super(e, t)
        }
        despawn() {
            this.entity.triggerEvent("minecraft:despawn")
        }
        onFail() {
            this.server.say({
                rawtext: [{
                    translate: "text.dec:killed_by_boss.name"
                }]
            }), this.despawn()
        }
        onWin() {
            if (!Ii.isDec())
                for (let e of this.entity.dimension.getPlayers({
                        location: this.entity.location,
                        maxDistance: 32
                    })) {
                    let t = this.server.findClientByPlayer(e);
                    t && l.postMessageBetweenClient(t, _i, "progressTaskFinish", [this.entity.typeId, 1e3])
                }
        }
    }
    class Si extends Di {
        constructor(e, t) {
            super(e, t)
        }
        onDestroy() {
            super.onDestroy()
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            this.onWin(), super.onKilled(e)
        }
    }
    class Ni extends Di {
        constructor(e, t) {
            super(e, t), this.music = t.getSound("music.wb.ghost_tears", "2:16"), this.setTimeout((() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location)
            }), 500)
        }
        onDestroy() {
            this.music.stop(), super.onDestroy()
        }
        onSpawn() {
            super.onSpawn()
        }
    }
    class Ai extends Si {
        constructor(e, t) {
            super(e, t), this.music = t.getSound("music.wb.the_peotry_of_ghost", "3:12"), this.setTimeout((() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location)
            }), 500)
        }
        onDestroy() {
            this.music.stop(), super.onDestroy()
        }
        onSpawn() {
            super.onSpawn()
        }
    }
    class Ci extends Di {
        constructor(e, t) {
            super(e, t), this.music = t.getSound("music.wb.from_the_burning_deep", "4:18"), this.setTimeout((() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location)
            }), 500)
        }
        onDestroy() {
            this.music.delayStop(800), super.onDestroy()
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            super.onKilled(e)
        }
    }
    class Oi extends Di {
        constructor(e, t) {
            super(e, t), this.music = t.getSound("music.wb.from_the_burning_deep", "4:18"), this.setTimeout((() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location)
            }), 500)
        }
        onDestroy() {
            this.music.delayStop(500), super.onDestroy()
        }
        onSpawn() {
            super.onSpawn()
        }
        onKilled(e) {
            super.onKilled(e)
        }
    }
    class Ri extends Si {
        constructor(e, t) {
            super(e, t), this.music = t.getSound("music.wb.from_the_burning_deep", "4:18"), this.setTimeout((() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location)
            }), 500)
        }
        onDestroy() {
            this.music.stop(), super.onDestroy()
        }
        onSpawn() {
            super.onSpawn()
        }
    }
    class Zi {
        step() {
            this.tasks.next()
        }
        isOver() {
            return this.tasks.next().done
        }
        start(e, t) {
            let n;
            const s = new Promise(((e, t) => {
                n = e
            }));
            return this.tick = r.Z.tickTask((() => {
                for (let e = 0; e < t; e++) this.step();
                this.isOver() && (this.tick.stop(), n(1))
            })).delay(e), this.tick.start(), s
        }
        run(e) {
            this.tasks = e()
        }
    }
    class Li {
        constructor() {
            this.cmds = [], this.block = new Map, this.blockloads = new Map
        }
        dispose() {
            this.cmds = [], this.block.clear(), this.blockloads.clear()
        }
        get length() {
            return this.cmds.length
        }
        fill(e, t, n) {
            var s;
            if (!this.blockloads.has(n)) {
                let e = Math.floor(Math.random() * R.Z.MAX_VALUE);
                this.block.set(e, n), this.blockloads.set(n, e)
            }
            this.cmds.push({
                start: e,
                end: t,
                blockId: null !== (s = this.blockloads.get(n)) && void 0 !== s ? s : 0
            })
        }
        set(e, t) {
            var n;
            if (!this.blockloads.has(t)) {
                let e = Math.floor(Math.random() * R.Z.MAX_VALUE);
                this.block.set(e, t), this.blockloads.set(t, e)
            }
            this.cmds.push({
                start: e,
                blockId: null !== (n = this.blockloads.get(t)) && void 0 !== n ? n : 0
            })
        }
        run(n, s) {
            return i = this, a = void 0, o = function*() {
                const i = new t.Z,
                    a = new t.Z;
                let r = new Zi;
                const o = this,
                    l = new t.Z,
                    c = new t.Z;
                return r.run((function*() {
                    var t;
                    for (let r of o.cmds) i.set(...r.start), a.set(...r.end ? r.end : r.start), r.end && a.sub(1), n.fillBlocks(l.set(s).add(i), c.set(s).add(a), null !== (t = o.block.get(r.blockId)) && void 0 !== t ? t : e.MinecraftBlockTypes.air), yield !0;
                    return !1
                })), yield r.start(1, 30), !0
            }, new((r = void 0) || (r = Promise))((function(e, t) {
                function n(e) {
                    try {
                        l(o.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function s(e) {
                    try {
                        l(o.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function l(t) {
                    var i;
                    t.done ? e(t.value) : (i = t.value, i instanceof r ? i : new r((function(e) {
                        e(i)
                    }))).then(n, s)
                }
                l((o = o.apply(i, a || [])).next())
            }));
            var i, a, r, o
        }
        merge(e) {
            this.cmds = this.cmds.concat(e.cmds), e.blockloads.forEach(((e, t) => this.blockloads.set(t, e))), e.block.forEach(((e, t) => this.block.set(t, e)))
        }
        toData() {
            return {
                cmds: this.cmds,
                idToBlock: (() => {
                    let e = {};
                    return this.block.forEach(((t, n) => e[n] = t)), e
                })(),
                blockToId: (() => {
                    let e = {};
                    return this.blockloads.forEach(((t, n) => e[n] = t)), e
                })()
            }
        }
        load(e) {
            for (let t in e.blockToId) this.blockloads.set(t, e.blockToId[t]);
            for (let t in e.idToBlock) this.block.set(parseInt(t), e.idToBlock[t]);
            this.cmds = e.cmds
        }
    }
    class Bi {
        * save(e, n, s) {
            n.x > s.x && ([n.x, s.x] = [s.x, n.x]), n.y > s.y && ([n.y, s.y] = [s.y, n.y]), n.z > s.z && ([n.z, s.z] = [s.z, n.z]);
            let i = s.clone().sub(n);
            new t.Z, this.save(e, n.clone(), n.clone().add(Math.floor(i.x / 2), Math.floor(i.y / 2), Math.floor(i.z / 2)));
            for (let s = 0; s < i.x; s += 32)
                for (let a = 0; a < i.y; a += 32)
                    for (let r = 0; r < i.z; r += 32) yield this._save(e, n.clone().add(s, a, r), n.clone().add(s, a, r).add(32).min(i.clone().sub(1)), new t.Z(s, a, r))
        }
        _save(n, s, i, a) {
            s.x > i.x && ([s.x, i.x] = [i.x, s.x]), s.y > i.y && ([s.y, i.y] = [i.y, s.y]), s.z > i.z && ([s.z, i.z] = [i.z, s.z]);
            let r = new Li,
                o = i.clone().sub(s);
            const l = new t.Z;
            for (let t = 0; t < o.x; t++)
                for (let i = 0; i < o.y; i++) {
                    let c, u = "",
                        h = 0;
                    for (let d = 0; d < o.z; d++) l.set(s).add(t, i, d), c = n.getBlock(l).type.id, c !== u && ("" !== u && u !== e.MinecraftBlockTypes.air.id && r.fill([t + a.x, i + a.y, h + a.z], [t + 1 + a.x, i + 1 + a.y, d + a.z], u), u = c, h = d);
                    c !== e.MinecraftBlockTypes.air.id && r.fill([t + a.x, i + a.y, h + a.z], [t + 1 + a.x, i + 1 + a.y, o.z + a.z], u)
                }
            return r
        }
    }
    let Ui = ["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"],
        zi = new class {
            constructor() {
                this.addonName = "", this.gameVersion = "1.9.20", this.addonVersion = "1.7.5B1", this.debug = !1, this.watchDog = !1
            }
        };
    zi.addonName = "POM", zi.addonVersion = "1.7.5B1", zi.gameVersion = "1.9.70", zi.watchDog = !1, zi.debug = !0, l.createServer(_i, zi), l.createServer(class extends D {
        constructor(n) {
            super(n), this.tmpV = new t.Z, this.compress = [""], this.i_inviolable = new O.C("i_inviolable").create("i_inviolable"), this.i_damp = new O.C("i_damp").create("i_damp"), this.i_soft = new O.C("i_soft").create("i_soft"), this.nightEventListener = new oe((t => {
                t ? this.getExDimension(e.MinecraftDimensionTypes.overworld).command.run(["scoreboard players random NightRandom global 1 100", "scoreboard players set IsDay global 0", "scoreboard players set IsNight global 1"]) : this.getExDimension(e.MinecraftDimensionTypes.overworld).command.run(["scoreboard players set IsDay global 1", "scoreboard players set IsNight global 0", "scoreboard players set NightRandom global 0", "scoreboard players set @a night_event 0", 'fog @a remove "night_event"'])
            }), !1), this.getEvents().events.beforeChatSend.subscribe((n => {
                var s, i;
                let a = this.getExDimension(e.MinecraftDimensionTypes.overworld),
                    r = w.Z.getInstance(n.sender);
                if (n.message.startsWith(">/")) {
                    let o = function(e) {
                            (e.startsWith("/") || e.startsWith("$")) && (e = e.substring(1, e.length));
                            let t = e.split(" "),
                                n = [];
                            for (let e of t) n.push(e);
                            return n
                        }(n.message.substring(2)),
                        l = "";
                    switch (o[0]) {
                        case "help":
                            r.command.run("function help");
                            break;
                        case "creators":
                            Ii.isDec() && r.command.run("function test/creator_list");
                            break;
                        case "diemode":
                            "open" === o[1] ? r.command.run("function diemode/open") : "test" === o[1] ? r.command.run("function diemode/test") : l = "Invalid command " + o[1];
                            break;
                        case "magic":
                            Ii.isDec() && ("display" === o[1] ? n.sender.isOp() ? "true" === o[2] ? a.command.run("function magic/display_on") : "false" === o[2] ? a.command.run("function magic/display_off") : l = "Invalid command " + o[2] : r.command.run('tellraw @s { "rawtext" : [ { "translate" : "text.dec:command_fail.name" } ] }') : l = "Invalid command " + o[1]);
                            break;
                        case "_save": {
                            if (o.length < 7) return;
                            let n = new t.Z(Math.floor(parseFloat(o[1])), Math.floor(parseFloat(o[2])), Math.floor(parseFloat(o[3]))),
                                s = new t.Z(Math.floor(parseFloat(o[4])), Math.floor(parseFloat(o[5])), Math.floor(parseFloat(o[6]))).add(1),
                                i = [],
                                a = new Zi;
                            const r = this;
                            a.run(function*() {
                                var t;
                                for (let a of (new Bi).save(r.getExDimension(e.MinecraftDimensionTypes.overworld), n, s)) {
                                    let e = a.toData();
                                    a.dispose();
                                    let n = null !== (t = si.zipString(JSON.stringify(e))) && void 0 !== t ? t : "";
                                    i.push(n), yield !0
                                }
                            }.bind(this)), a.start(2, 1).then((() => {
                                this.compress = i, console.warn("over"), console.warn(JSON.stringify(i))
                            }));
                            break
                        }
                        case "_load": {
                            let n = new t.Z(Math.floor(parseFloat(o[1])), Math.floor(parseFloat(o[2])), Math.floor(parseFloat(o[3]))),
                                i = new Li,
                                a = [];
                            for (let t of this.compress) a.push((() => {
                                i.load(JSON.parse(si.unzipString(t))), i.run(this.getExDimension(e.MinecraftDimensionTypes.overworld), n).then((() => {
                                    var e;
                                    null === (e = a.shift()) || void 0 === e || e()
                                }))
                            }));
                            null === (s = a.shift()) || void 0 === s || s();
                            break
                        }
                        case "_test": {
                            let n = new t.Z(Math.floor(parseFloat(o[1])), Math.floor(parseFloat(o[2])), Math.floor(parseFloat(o[3]))),
                                s = new Li,
                                a = [];
                            for (let t of Ui) a.push((() => {
                                s.load(JSON.parse(si.unzipString(t))), s.run(this.getExDimension(e.MinecraftDimensionTypes.overworld), n).then((() => {
                                    var e;
                                    null === (e = a.shift()) || void 0 === e || e()
                                }))
                            }));
                            null === (i = a.shift()) || void 0 === i || i();
                            break
                        }
                    }
                    0 !== l.length && r.command.run(`tellraw @s { "rawtext" : [ { "text" : "Command Error: ${l}" } ] }`), n.cancel = !0
                }
            })), this.getEvents().events.afterBlockBreak.subscribe((t => {
                var n;
                const s = w.Z.getInstance(t.player);
                if (s.getScoresManager().getScore(this.i_inviolable) > 1) {
                    null === (n = t.dimension.getBlock(t.block.location)) || void 0 === n || n.setType(t.brokenBlockPermutation.type);
                    let i = w.Z.getInstance(t.player);
                    s.exDimension.command.run("kill @e[type=item,r=2,x=" + t.block.x + ",y=" + t.block.y + ",z=" + t.block.z + "]"), i.addEffect(e.MinecraftEffectTypes.blindness, 200, 0, !0), i.addEffect(e.MinecraftEffectTypes.darkness, 400, 0, !0), i.addEffect(e.MinecraftEffectTypes.wither, 100, 0, !0), i.addEffect(e.MinecraftEffectTypes.miningFatigue, 600, 2, !0), i.addEffect(e.MinecraftEffectTypes.hunger, 600, 1, !0), i.addEffect(e.MinecraftEffectTypes.nausea, 200, 0, !0), s.command.run('tellraw @s { "rawtext" : [ { "translate" : "text.dec:i_inviolable.name" } ] }')
                }
            })), this.getEvents().events.beforeExplosion.subscribe((e => {
                if (e.source) {
                    const t = C.Z.getInstance(e.source);
                    t.getScoresManager().getScore(this.i_damp) > 0 && (t.exDimension.spawnParticle("dec:damp_explosion_particle", e.source.location), e.cancel = !0)
                }
            })), this.getEvents().events.beforeItemUseOn.subscribe((e => {
                C.Z.getInstance(e.source).getScoresManager().getScore(this.i_soft) > 0 && "dec:iron_key" != e.itemStack.typeId && "dec:frozen_power" != e.itemStack.typeId && (e.cancel = !0)
            })), this.getEvents().exEvents.tick.subscribe((t => {
                if (this.getExDimension(e.MinecraftDimensionTypes.overworld).command.run(["scoreboard players remove @e[scores={i_inviolable=1..}] i_inviolable 1", "scoreboard players remove @e[scores={i_damp=1..}] i_damp 1", "scoreboard players remove @e[scores={i_soft=1..}] i_soft 1", "scoreboard players remove @e[scores={harmless=1..}] harmless 1"]), t.currentTick % 100 == 0) {
                    this.nightEventListener.upDate((new wi).isNight());
                    let t = [];
                    for (const e of this.getClients()) t.push(e.checkArmor());
                    (0, m.to)(Promise.all(t).then((t => {
                        if (!t.every((e => e))) {
                            let t = [];
                            if (Ii.isDec())
                                for (let n in Ei) t.push(Ei[n].find(this.getExDimension(e.MinecraftDimensionTypes.overworld).command));
                            else
                                for (let n in Ti) t.push(Ti[n].find(this.getExDimension(e.MinecraftDimensionTypes.overworld).command));
                            (0, m.to)(Promise.all(t).then((e => {
                                for (const e of this.getClients()) {
                                    let t = !1;
                                    for (let n of e.player.getTags()) n.startsWith("armorTest:") && (e.player.removeTag(n), e.chooseArmor(Ti[n.split(":")[1]]), t = !0);
                                    t || e.chooseArmor(void 0)
                                }
                            })))
                        }
                    })))
                }
            })), this.addEntityController("dec:leaves_golem", Si), this.addEntityController("dec:king_of_pillager", Si), this.addEntityController("dec:abyssal_controller", Si), this.addEntityController("dec:predators", Si), this.addEntityController("dec:enchant_illager_2", Si), this.addEntityController("dec:escaped_soul_entity", Si), this.addEntityController("dec:host_of_deep", Ci), this.addEntityController("dec:host_of_deep_1", Oi), this.addEntityController("dec:host_of_deep_2", Ri), this.addEntityController("dec:ash_knight", Si), this.addEntityController("dec:everlasting_winter_ghast", Ni), this.addEntityController("dec:everlasting_winter_ghast_1", Ai)
        }
        newClient(e, t) {
            return new xi(this, e, t)
        }
    }, zi)
})();