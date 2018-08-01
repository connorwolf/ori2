const BasePlugin = require("../BasePlugin"),
	parterDbHandler = require("./partnerDbHandler"),
	Util = require("../../lib/Util");
    
const apply = require("./cmds/apply");

const subteams = ["414394912138592267"];
class SFEPlugin extends BasePlugin {
	constructor(bot) {
		super();
		this.options = {
			name: "SFE"
		};
		this.name = "SFE";
		this.bot = bot;
	}

	start() {
		parterDbHandler(this.bot);
		Util.log("SFE", "registering commands...");
		subteams.map((st) => {
			let g = this.bot.client.guilds.get(st);
			if (!g) return;
			this.bot.CommandHandler.registerCommand(g, apply);
		});
	}
}

module.exports = SFEPlugin;
