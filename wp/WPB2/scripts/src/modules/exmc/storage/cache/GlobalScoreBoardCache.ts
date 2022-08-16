import { Objective } from "../../entity/ExScoresManager.js";
import ExNullEntity from '../../entity/ExNullEntity.js';

export default class GlobalScoreBoardCache {
    objective: Objective;
    entity = new ExNullEntity("");
    constructor(objective: Objective) {
        this.objective = objective;
        objective.create("cache:" + objective.name);

    }
    debug() {
        this.objective.setDisplay();

    }
    public setBoolean(name:string, value:boolean) {
        this.setNumber(name, value?1:0);
    }
    public getBoolean(name:string) {
        return this.getNumber(name) === 1;
    }

    public setNumber(name: string, value: number): void {
        this.entity.nameTag = name;
        this.entity.getScoresManager().setScore(this.objective, value);
    }
    public getNumber(name: string) {
        this.entity.nameTag = name;
        return this.entity.getScoresManager().getScore(this.objective);
    }
    public deleteNumber(name: string) {
        this.entity.nameTag = name;
        return this.entity.getScoresManager().deleteScore(this.objective);
    }
    public getList(name: string): number[] {
        if (name + "__cache" in GlobalScoreBoardCache) {
            return <number[]>(<any>GlobalScoreBoardCache)[name + "__cache"];
        } else {
            return ((<any>GlobalScoreBoardCache)[name + "__cache"] = new GlobalScoreBoardCacheList(this, name));
        }
    }
    public setList(name: string, value: number[]) {
        if (value.length > 99) throw new Error("Too many childs");
        (<GlobalScoreBoardCacheList>this.getList(name))
            .reset(value);
    }
}

export class GlobalScoreBoardCacheList implements Array<number>{
    cache: GlobalScoreBoardCache;
    name: string;
    src: number[] = []
    
    constructor(cache: GlobalScoreBoardCache, name: string) {
        this.cache = cache;
        this.name = name;
        this.src = [];
        for (let i = 0; i < this.mlength; i++) {
            this.src.push(this.cache.getNumber(this.name + "__" + i));
            this[i] = this.src[i];
        }
        
    }
    includes(searchElement: number, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    flatMap<U, This = undefined>(callback: (this: This, value: number, index: number, array: number[]) => U | readonly U[], thisArg?: This | undefined): U[] {
        throw new Error("Method not implemented.");
    }
    flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[] {
        throw new Error("Method not implemented.");
    }
    at(index: number): number | undefined {
        throw new Error("Method not implemented.");
    }
    public reset(src: number[]) {
        this.clearData();
        this.push(...src);
    }
    [n: number]:number;
    clearData(): void {
        for (let i = 0; i < this.mlength; i++) {
            this.cache.deleteNumber(this.name + "__" + i);
            delete this[i];
        }
        this.mlength = 0;
        this.src = [];
    }

    public get length() {
        return this.src.length;
    }
    public get mlength() {
        return this.cache.getNumber(this.name + "__len");
    }
    public set mlength(len: number) {
        this.cache.setNumber(this.name + "__len", len);
    }
    private toList() {
        return this.src;
    }
    public toString(): string {
        return this.src.toString();
    }
    toLocaleString(): string {
        return this.src.toLocaleString();
    }
    pop(): number | undefined {
        if (this.length === 0) { return undefined; }
        this.mlength--;
        let len=this.mlength;
        this.cache.deleteNumber(this.name + "__" + len);
        delete this[len];
        return this.src.pop();
    }
    push(...items: number[]): number {
        for (let i of items) {
            this.cache.setNumber(this.name + "__" + this.mlength, i);
            this[this.mlength] = i;
            this.mlength++;
        }
        this.src.push(...items);
        return this.mlength;
    }
    concat(...items: ConcatArray<number>[]): number[];
    concat(...items: (number | ConcatArray<number>)[]): number[];
    concat(...items: unknown[]): number[] {
        throw new Error("Method not implemented.");
    }
    join(separator?: string | undefined): string {
        return this.toList().join(separator);
    }
    reverse(): number[] {
        return this.toList().reverse();
    }
    shift(): number | undefined {
        throw new Error("No way!!!");
    }
    slice(start?: number | undefined, end?: number | undefined): number[] {
        return this.toList().slice(start, end);
    }
    sort(compareFn?: ((a: number, b: number) => number) | undefined): this {
        throw new Error("Method not implemented.");
    }
    splice(start: number, deleteCount?: number | undefined): number[];
    splice(start: number, deleteCount: number, ...items: number[]): number[];
    splice(start: unknown, deleteCount?: unknown, ...rest: unknown[]): number[] {
        throw new Error("Method not implemented.");
    }
    unshift(...items: number[]): number {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: number, fromIndex?: number | undefined): number {
        return this.toList().indexOf(searchElement, fromIndex);
    }
    lastIndexOf(searchElement: number, fromIndex?: number | undefined): number {
        return this.toList().lastIndexOf(searchElement, fromIndex);
    }
    every<S extends number>(predicate: (value: number, index: number, array: number[]) => value is S, thisArg?: any): this is S[];
    every(predicate: (value: number, index: number, array: number[]) => unknown, thisArg?: any): boolean;
    every(predicate: unknown, thisArg?: unknown): boolean {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: number, index: number, array: number[]) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: number, index: number, array: number[]) => void, thisArg?: any): void {
        this.src.forEach(callbackfn, thisArg);
    }
    map<U>(callbackfn: (value: number, index: number, array: number[]) => U, thisArg?: any): U[] {
        return this.src.map(callbackfn, thisArg);
    }
    filter<S extends number>(predicate: (value: number, index: number, array: number[]) => value is S, thisArg?: any): S[];
    filter(predicate: (value: number, index: number, array: number[]) => unknown, thisArg?: any): number[];
    filter(predicate: unknown, thisArg?: unknown): number[] {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number, initialValue: number): number;
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: number[]) => U, initialValue: U): U;
    reduce(callbackfn: unknown, initialValue?: unknown): number {
        throw new Error("Method not implemented.");
    }
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number, initialValue: number): number;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: number[]) => U, initialValue: U): U;
    reduceRight(callbackfn: unknown, initialValue?: unknown): number {
        throw new Error("Method not implemented.");
    }
    find<S extends number>(predicate: (this: void, value: number, index: number, obj: number[]) => value is S, thisArg?: any): S | undefined;
    find(predicate: (value: number, index: number, obj: number[]) => unknown, thisArg?: any): number | undefined;
    find(predicate: unknown, thisArg?: unknown): number | undefined {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate: (value: number, index: number, obj: number[]) => unknown, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    fill(value: number, start?: number | undefined, end?: number | undefined): this {
        throw new Error("Method not implemented.");
    }
    copyWithin(target: number, start: number, end?: number | undefined): this {
        throw new Error("Method not implemented.");
    }
    entries(): IterableIterator<[number, number]> {
        return this.toList().entries();
    }
    keys(): IterableIterator<number> {
        return this.toList().keys();
    }
    values(): IterableIterator<number> {
        return this.toList().values();
    }
    *[Symbol.iterator](): IterableIterator<number> {
        for(let i of this.src){
            yield i;
        }
    }
    [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
        throw new Error("Method not implemented.");
    }
}