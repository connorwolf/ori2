import { BasePlugin, PluginOptions } from './BasePlugin';
import { Nexus } from '../NexusBot';
import Util from '../lib/Util';

export class Presence extends BasePlugin {
	bot: Nexus;
	options: PluginOptions;
	constructor(bot: Nexus) {
		super();
		this.options = {
		name: "presence"
		};
		this.bot = bot;
		this.start();
	}

	start() {
		Util.log("PRESENCE", "updating bot presence...");
		this.bot.client.user.setActivity(`ori2 !help | ${this.bot.client.users.size} members`);
		setInterval(function() {
			// this.bot.client.user.setActivity(`ori2 !help | ${this.bot.client.users} members`);
		}, 60e3);
	}
}

export default Presence;