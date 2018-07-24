import Util from '../lib/Util';
import { BasePlugin, PluginOptions } from './BasePlugin';
import { Nexus } from '../NexusBot';
import { Command, CommandSyntax } from '../lib/CommandHandler';
import { NexusEmbed } from '../lib/NexusEmbed';
import { Message } from 'discord.js';
import { Presence } from './Presence';

function format(seconds: number) {
    function pad(s: number) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}
export class CorePlugin extends BasePlugin {
    bot: Nexus;
    options: PluginOptions;
    constructor(bot: Nexus) {
        super();
        this.options = {
            name: 'core'
        }
        this.bot = bot;
    }

    start() {
        this.bot.PluginManager.loadPlugin(new Presence(this.bot));
        this.registerComands();
    }

    registerComands() {
        Util.log("CORE", "registering commands");
        this.bot.CommandHandler.registerGlobalCommand(new Command({
            name: 'status',
            description: 'Returns the bot\'s status',
            global: true,
            syntax: new CommandSyntax('')
        }, async function (b: Nexus, m: Message, a: Array<any>) {
            let embed = new NexusEmbed().setTitle("Bot Status").setDescription(`
Here's a list of various statuses I found lying around...

Ping: \`${Math.round((b.client.ping + Date.now() - m.createdTimestamp) / 2)}ms\`
Response Time: \`${Math.round(Date.now() - m.createdTimestamp)}ms\`
Uptime: \`${format(process.uptime())}\`
Loaded Plugins: \`${b.PluginManager.plugins.size}\`
Registered Commands: \`${b.CommandHandler.globalCommands.size}\`

DM <@210118905006522369> for more info on what these mean.
                `);

            m.channel.send({ embed })
                .then((msg: Message) => msg.delete(10e3).catch(() => {}));
        }));
    }
}