const Util = require("./Util"),
	SubHandler = require("./EventHandler").SubHandler;

class CommandSyntax {
	constructor(syntax_string) {
		this.syntax_string = syntax_string;
		this.syntaxArray = this.syntax_string.split(" ");
	}
}


class Command {
	constructor(options, exec) {
		this.options = options;
		this.run = exec;
	}
}

class CommandHandler {
	constructor(bot) {
		this.bot = bot;
		this.guildCommands = new Map();
		this.globalCommands = new Map();
	}

	async start() {
		await this.bot.client.guilds.map((g) => {
			this.guildCommands.set(g.id, {});
		});

		let handler = this.bot.eventHandlers.get("message");
		if (handler) {
			handler.addHandler(new SubHandler(handler, "commandhandler", (bot, m) => {
				if (m.guild && this.bot.cache.get(m.guild.id)) {
					let guildData = this.bot.cache.get(m.guild.id);
					if (m.cleanContent.startsWith(guildData.options.prefix)) {

						let args = m.content.slice(guildData.options.prefix.length).trim().split(/ +/g);
						if (args.length < 1) return; 
						let cmd = String(args.shift()).toLowerCase();

						if (this.guildCommands.get(m.guild.id) && this.guildCommands.get(m.guild.id)[cmd]) {
							Util.log("COMMAND", `${m.author.tag}, ${m.author.id} => ${cmd}`);
							let cmdx = this.guildCommands.get(m.guild.id)[cmd];
							cmdx.run(this.bot, m, args);
							if (m.deletable) return m
								.delete()
								.catch(() => {});
						}

						if (this.globalCommands.get(cmd)) {
							Util.log("COMMAND", `${m.author.tag}, ${m.author.id} => ${cmd}`);
							let cmdx = this.globalCommands.get(cmd);
							cmdx.run(this.bot, m, args);
							if (m.deletable) return m
								.delete()
								.catch(() => {});
						}
						
					}
				} else if (m.channel.type == "dm") {
					if (m.cleanContent.startsWith(this.bot.config.defaults.prefix)) {

						let args = m.content.slice(this.bot.config.defaults.prefix.length).trim().split(/ +/g);
						if (args.length < 1) return;
						let cmd = String(args.shift()).toLowerCase();

						if (this.globalCommands.get(cmd)) {
							Util.log("COMMAND", `${m.author.tag}, ${m.author.id} => ${cmd}`);
							let cmdx = this.globalCommands.get(cmd);
							cmdx.run(this.bot, m, args);
							if (m.deletable) m
								.delete()
								.catch(() => { });
						}

					}
				} else {
					Util.log("COMMANDHANDLER", "ERROR", `failed to access cache for guild ${m.guild.name}, ${m.guild.id}`);
				}
			}));
		}
	}

	registerGlobalCommand(command) {
		if (this.globalCommands.get(command.options.name))
			return Error(`command with name ${command.options.name} already exists.`);
		
		Util.log("COMMANDHANDLER", `command "${command.options.name}" registered as GLOBAL`);
		this.globalCommands.set(command.options.name, command);
	}

	registerCommand(guild, command) {
		if (this.guildCommands.get(guild.id))
			this.guildCommands.set(guild.id, {});

		if (this.guildCommands.get(guild.id)[command.options.name])
			return Error(`command with name ${command.options.name} already exists`);
		
		Util.log("COMMANDHANDLER", `command "${command.options.name}" registered in guild ${guild.id}`);
		let g = this.guildCommands.get(guild.id);

		if (!g) 
			g = {};

		g[command.options.name] = command;
		this.guildCommands.set(guild.id, g);
	}  

	unregisterGlobalCommand(commandid) {
		this.globalCommands.set(commandid, null);
	}
}

module.exports = {
	CommandHandler,
	Command,
	CommandSyntax
};