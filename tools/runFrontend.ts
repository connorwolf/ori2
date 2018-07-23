// require('@babel/register');
import { Nexus } from '../app/NexusBot';
import Util from '../app/lib/Util';

Util.log("START", "frontend");

const bot = new Nexus(require('../app/config'));
bot.start();