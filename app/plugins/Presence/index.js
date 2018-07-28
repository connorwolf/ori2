const BasePlugin = require("../BasePlugin"),
	Util = require("../../lib/Util");
    
function updatePresence(client) {
	client.user.setActivity(`v${Util.package.version} | ${client.users.size} members`);
}

class Presence extends BasePlugin {
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

module.exports = Presence;