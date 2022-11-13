export default class VarOnChangeListener {
    constructor(trigger, def) {
        this.trigger = trigger;
        this.value = def;
    }
    upDate(v) {
        if (this.value !== v) {
            const last = this.value;
            this.value = v;
            this.trigger(v, last);
        }
    }
}
//# sourceMappingURL=VarOnChangeListener.js.map