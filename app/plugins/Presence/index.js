const BasePlugin = require("../BasePlugin"),
	Util = require("../../lib/Util");
	
function updatePresence(client) {
	Util.log("PRESENCE", "updating bot presence...");
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
		updatePresence(this.bot.client);
		setInterval(() => updatePresence(this.bot.client), 60e3);
	}
}

module.exports = Presence;