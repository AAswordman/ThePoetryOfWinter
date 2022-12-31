import { CommandResult } from '@minecraft/server';

export interface ExCommandNativeRunner{
	runCommandAsync(str:string): Promise<any>;
}
export interface ExCommandRunner{
	run(str:string): Promise<CommandResult>;
}