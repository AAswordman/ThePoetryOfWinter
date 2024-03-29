import { system } from '@minecraft/server';
import ExGameServer from './ExGameServer.js';
export default class ExErrorQueue {
    private static errorStack: unknown[] = [];
    private static errorFlow = "";

    public static throwError(error: unknown) {
        this.reportError(error);
        this.errorStack.push(error);
    }
    public static reportError(error: unknown) {
        if (error instanceof Error) {
            this.errorFlow = (this.errorFlow + "\n\n" + error.name + " : " + error.message + "\n" + error.stack);
        } else {
            this.errorFlow = (this.errorFlow + "\n\n" + error);
        }
        //console.warn(typeof error === "object" ? error instanceof Object ? (error as Object).constructor.name : JSON.stringify(error) : "abc: " +error);
        this.errorFlow = this.errorFlow.substring(Math.max(0, this.errorFlow.length - 5000));
    }
    public static getError() {
        return this.errorFlow;
    }
    public static init() {
        system.runInterval(() => {
            if (this.errorStack.length > 0) {
                throw this.errorStack.shift();
            }
        }, 1);
    }
}

export function to<T>(p: Promise<T>) {
    return p.then(res => [res, undefined]).catch(err => { ExErrorQueue.throwError(err); return [undefined, err]; });
}
export function tofunc<T>(p: (...args: unknown[]) => Promise<T>) {
    return (...args: unknown[]) => {
        return to(p(...args));
    };
}

export function ignorn<T>(fun: () => T) {
    try {
        let res = fun();
        return res;
    } catch (err) {
        return undefined;
    }
}