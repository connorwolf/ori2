import { BasePlugin } from "../BasePlugin";
import Util from "../../lib/Util";

function updatePresence(client) {
	client.user.setActivity(`v${Util.package.version} | ${client.users.size} members`);
}

export class Presence extends BasePlugin {
	constructor(bot) {
		super();
		this.options = {
			name: "presence"
		};
		this.bot = bot;
		this.name = "presence";
	}

	start() {
		Util.log("PRESENCE", "updating bot presence...");
		this.bot.client.user.setActivity(
			`v${Util.package.version} | ${this.bot.client.users.size} members`
		);
		setInterval(() => updatePresence(this.bot.client), 60e3);
	}
}

export default Presence;
