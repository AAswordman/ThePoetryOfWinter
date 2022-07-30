
export default interface ExTagManager {
	getTags(): string[];
	addTag(tag: string): string;
	hasTag(tag: string): boolean;
	removeTag(tag: string): string;
}
