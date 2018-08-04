import { KrystalClient } from "../KrystalClient";

export class IPluginOptions {
    name: string;
}

export class BasePlugin {
    bot: KrystalClient;
    options: IPluginOptions;

	constructor(bot: KrystalClient, options: IPluginOptions) {
        this.bot = bot;
        this.options = options;
    }

	start() {}

	unload() {}
	stop() {}
}