import { KrystalClient } from "../KrystalClient";

export interface IPluginOptions {
	name: string;
	path: string;
}

export class BasePlugin {
	public bot: KrystalClient;
	public options: IPluginOptions;

	constructor(bot: KrystalClient, options: IPluginOptions) {
		this.bot = bot;
		this.options = options;
	}

	public start() {}

	public unload() {}
	public stop() {}
}
