import Util from './Util';
import { Nexus } from "../NexusBot";
import { SubHandler } from './EventHandler';
import { Message } from 'discord.js';

export class CommandSyntax {
    syntax_string: string;
    syntaxArray: Array<string>;
    constructor(syntax_string: string) {
        this.syntax_string = syntax_string;
        this.syntaxArray = this.syntax_string.split(' ');
    }
}

export interface CommandOptions {
    name: string;
    description: string;
    syntax: CommandSyntax;
    global: boolean;
}

export interface CommandActionOptions {
    type: string;
}

export class Command {
    options: CommandOptions;
    run: Function
    constructor(options: CommandOptions, exec: Function) {
        this.options = options;
        this.run = exec;
    }
}

export class CommandAction {

}

export class CommandHandler {
    bot: Nexus;
    globalCommands: Map<string, any>;

    constructor(bot: Nexus) {
        this.bot = bot;
        this.globalCommands = new Map();
    }

    async start() {
        let handler = this.bot.eventHandlers.get('message');
        if (handler) {
            handler.addHandler(new SubHandler(handler, 'commandhandler', (bot: Nexus, m: Message) => {
                if (m.guild && this.bot.cache.get(m.guild.id)) {
                    let guildData = this.bot.cache.get(m.guild.id)
                    if (m.cleanContent.startsWith(guildData.options.prefix)) {

                        Util.log("COMMAND", 'potential command found');

                        let args = m.content.slice(guildData.options.prefix.length).trim().split(/ +/g);
                        if (args.length < 1) return; 
                        let cmd = String(args.shift()).toLowerCase();
                        
                        if (this.globalCommands.get(cmd)) {
                            Util.log("COMMAND", cmd, `${m.author.id}`);
                            let cmdx: Command = this.globalCommands.get(cmd);
                            cmdx.run(this.bot, m, args);
                            if (m.deletable) m.delete().catch(() => {});
                        }
                    }
                } else if (m.channel.type ='dm') {
                    if (m.cleanContent.startsWith(this.bot.config.defaults.prefix)) {

                        Util.log("COMMAND", 'potential command found');

                        let args = m.content.slice(this.bot.config.defaults.prefix.length).trim().split(/ +/g);
                        if (args.length < 1) return;
                        let cmd = String(args.shift()).toLowerCase();

                        if (this.globalCommands.get(cmd)) {
                            Util.log("COMMAND", cmd, `${m.author.id}`);
                            let cmdx: Command = this.globalCommands.get(cmd);
                            cmdx.run(this.bot, m, args);
                            if (m.deletable) m.delete().catch(() => { });
                        }
                    }
                }else {
                    Util.log("COMMANDHANDLER", "ERROR", `failed to access cache for guild ${m.guild.name}, ${m.guild.id}`);
                }
            }));
        }
    }

    registerGlobalCommand(command: Command) {
        if (this.globalCommands.get(command.options.name))
            return Error(`command with name ${command.options.name} already exists.`);
        
        Util.log("COMMANDHANDLER", `command ${command.options.name} registered as GLOBAL`);
        this.globalCommands.set(command.options.name, command);
    }

    registerCommand(command: Command) {

    }
    unregisterCommand(commandid: string) {
        this.globalCommands.set(commandid, null);
    }
}