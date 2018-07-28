// require('@babel/register');
const Nexus = require("../app/NexusBot"),
	Util = require("../app/lib/Util");

console.log("\n\n\n\n");
Util.log("START", "frontend");
console.log("\n");

const bot = new Nexus(require("../app/config"));
bot.start();
