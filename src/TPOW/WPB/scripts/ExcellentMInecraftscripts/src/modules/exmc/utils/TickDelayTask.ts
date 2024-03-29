import { TickEvent } from "../server/events/events.js";

export default interface TickDelayTask {
    func ?: (e: TickEvent) => void;
    getDelay():number;
    delay(time: number):this;
    isStarted(): boolean;
    startOnce():void;
    start():void;
    stop():void;
}