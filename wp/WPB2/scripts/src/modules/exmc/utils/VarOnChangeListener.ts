export default class VarOnChangeListener<T>{
    value: T;
    trigger: (nvalue: T) => void;
    constructor(trigger:(nvalue:T) => void,def:T){
        this.trigger = trigger;
        this.value = def;
    }
    upDate(v:T){
        if(this.value !== v){
            this.value = v;
            this.trigger(v);
        }
    }
}