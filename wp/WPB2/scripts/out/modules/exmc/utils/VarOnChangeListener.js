export default class VarOnChangeListener {
    constructor(trigger, def) {
        this.trigger = trigger;
        this.value = def;
    }
    upDate(v) {
        if (this.value !== v) {
            this.value = v;
            this.trigger(v);
        }
    }
}
//# sourceMappingURL=VarOnChangeListener.js.map