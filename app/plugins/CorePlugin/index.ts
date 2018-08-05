import { SubHandler } from "../../EventUtil";
import { KrystalClient } from "../../KrystalClient";
import { BasePlugin, IPluginOptions } from "../BasePlugin";

class Plugin extends BasePlugin {
	constructor(bot: KrystalClient, options: IPluginOptions) {
		super(bot, options);
		this.bot = bot;
		this.options = {
			name: "CorePlugin",
			path: "CorePlugin",
			reloadable: false,
		};
	}
	public start() {
		this.bot.EventHandler.registerSubHandler(new SubHandler(this.bot, {
			eventType: "error",
			key: "default-error",
		}, (error) => {
			this.bot.logger.error(error);
		}));

		this.bot.EventHandler.registerSubHandler(new SubHandler(this.bot, {
			eventType: "info",
			key: "default-info",
		}, (message) => {
			this.bot.logger.debug(message);
		}));
	}
}
export default Plugin;