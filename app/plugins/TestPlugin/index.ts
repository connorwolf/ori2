import { KrystalClient } from "../../KrystalClient";
import { BasePlugin, IPluginOptions } from "../BasePlugin";

export const TestPluginOptions = {
	name: "TestPlugin",
	path: "./TestPlugin",
};
class TestPlugin extends BasePlugin {
	constructor(bot: KrystalClient, options: IPluginOptions) {
		super(bot, options);
		this.bot = bot;
		this.options = {
			name: "TestPlugin",
			path: "./TestPlugin",
		};
	}
}

export default TestPlugin;
