// require('@babel/register');
import { Nexus } from "../app/NexusBot";
import Util from "../app/lib/Util";

console.log("\n\n\n\n");
Util.log("START", "frontend");
console.log("\n");

const bot = new Nexus(require("../app/config"));
bot.start();
