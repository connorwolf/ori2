import { KrystalClient } from "../../KrystalClient";
import { BasePlugin, IPluginOptions } from "../BasePlugin";

class Plugin extends BasePlugin {
	constructor(bot: KrystalClient, options: IPluginOptions) {
		super(bot, options);
		this.bot = bot;
		this.options = {
			name: "CorePlugin",
			path: "CorePlugin",
		};
	}
	public start() {
		this.bot.logger.info("toast");
	}
}
export default Plugin;