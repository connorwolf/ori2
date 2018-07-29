const Nexus = require("../app/NexusBot"),
	Util = require("../app/lib/Util");

Util.log("START", "frontend");

const bot = new Nexus(require("../app/config"));
bot.start();
