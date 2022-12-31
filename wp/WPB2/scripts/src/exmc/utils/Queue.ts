export default class Queue<T>{
    queue: T[];
    constructor(){
        this.queue = [];
    }
    push(t:T){
        this.queue.push(t);
    }
    shift(){
        return this.queue.shift();
    }
    get length(){

        return this.queue.length;
    }
}