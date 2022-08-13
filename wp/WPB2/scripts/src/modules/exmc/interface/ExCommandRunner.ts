
export default interface ExCommandRunner{
	runCommand(str:string): any;
	runCommandAsync(str:string): Promise<any>;
}