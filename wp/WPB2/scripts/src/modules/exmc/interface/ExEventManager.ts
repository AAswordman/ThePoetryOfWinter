
export default interface ExEventManager{
	register(name:string,fun:(arg:any) => void): (arg:any) => void;
	cancel(name:string,fun:(arg:any) => void): (arg:any) => void;
}