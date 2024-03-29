export function zeroIfNaN(i: number | string) {
    const s = (typeof i === "string" ? parseFloat(i) : i);
    return isNaN(s) ? s : 0;
}

export function falseIfError<T>(func: () => T) {
    try {
        return func();
    } catch (err) {
        return false;
    }
}

export type ExTend<T> = Menu extends (infer I)[] ?
    (I extends object ? I & { active: boolean } : I)[] :
    never
export type AlsoInstanceType<T extends { prototype: any }> =
    T["prototype"];
