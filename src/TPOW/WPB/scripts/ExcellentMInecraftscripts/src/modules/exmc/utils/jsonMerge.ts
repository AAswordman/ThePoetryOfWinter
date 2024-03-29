import { Merge } from "../server/events/events.js";


export default function jsonMerge<A, B>(a: A, b: B): Merge<A, B> {
    for (let i in b) {
        if (!(i in <any>a)) {
            (<any>a)[i] = b[i];
        }
    }
    return <any>a;
}