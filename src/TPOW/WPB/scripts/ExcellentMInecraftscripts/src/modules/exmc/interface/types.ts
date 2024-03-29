export type basicFinalType = number | string | boolean | undefined | null;
type BuildArray<
    Length extends number,
    Ele = unknown,
    Arr extends unknown[] = []
> = Arr['length'] extends Length
    ? Arr
    : BuildArray<Length, Ele, [...Arr, Ele]>;
type Add<Num1 extends number, Num2 extends number> =
    [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];
type Subtract<Num1 extends number, Num2 extends number> =
    BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
    ? Rest['length']
    : never;
type Mutiply<
    Num1 extends number,
    Num2 extends number,
    ResultArr extends unknown[] = []
> = Num2 extends 0 ? ResultArr['length']
    : Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;
type Divide<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends 0 ? CountArr['length']
    : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;
type StrLen<
    Str extends string,
    CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}`
    ? StrLen<Rest, [...CountArr, unknown]>
    : CountArr['length']
type GreaterThan<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends Num2
    ? false
    : CountArr['length'] extends Num2
    ? true
    : CountArr['length'] extends Num1
    ? false
    : GreaterThan<Num1, Num2, [...CountArr, unknown]>;
type FibonacciLoop<
    PrevArr extends unknown[],
    CurrentArr extends unknown[],
    IndexArr extends unknown[] = [],
    Num extends number = 1
> = IndexArr['length'] extends Num
    ? CurrentArr['length']
    : FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num>

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>

type GetIntegerUnion<N extends number, R extends number = 0, Arr extends any[] = []>
    = Arr['length'] extends N
    ? R
    : GetIntegerUnion<N, R | Arr['length'], [any, ...Arr]>

export type IsInteger<T> = T extends number ? (T extends `${infer U}` ? `${U}` extends `-${string}` ? false : `${U}` extends `${infer V}.${string}` ? false : true : false) : false;

