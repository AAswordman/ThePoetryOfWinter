export default interface SetTimeOutSupport{
    setTimeout(fun:() => void, timeout:number):void;
}