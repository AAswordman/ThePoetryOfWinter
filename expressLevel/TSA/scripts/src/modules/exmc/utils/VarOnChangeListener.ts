export default class VarOnChangeListener<T>{
    value: T;
    trigger: (nvalue: T,lastValue?:T) => void;
    constructor(trigger:(nvalue:T,lastValue?:T) => void,def:T){
        this.trigger = trigger;
        this.value = def;
    }
    upDate(v:T){
        if(this.value !== v){
            const last = this.value;
            this.value = v;
            this.trigger(v,last);
        }
    }
}