const Progress = require("progress");

const Util = require("../lib/Util"),
	ClientEvents = require("../lib/ClientEvents"),
	BaseTask = require("../tasks/BaseTask"),
	EventHandler = require("../lib/EventHandler"),
	Guild = require("../../shared/models/GuildModel").Guild;

function cache(bot, guild) {
	Guild.findOne(
		{
			gid: guild.id
		},
		(err, res) => {
			if (err) return Error(err.message);
			if (!res) {
				let guild = new Guild({
					name: guild.name,
					gid: guild.id,
					options: {
						channels: {},
						prefix: bot.config.defaults.prefix
					}
				});
				guild.save();
				bot.cache.set(guild.id, {
					name: guild.name,
					gid: guild.id,
					options: {
						channels: {},
						prefix: bot.config.defaults.prefix
					}
				});
			} else {
				bot.cache.set(res.gid, res);
			}
			bot.cache.get(guild.id) ? null : Util.log("CACHE", "ERROR", `${guild.id} failed`);
		}
	);
}

const defaultEventFunctions = [
	{
		event: "error",
		function: (handler, error) => {
			Util.log("DISCORD", "ERROR", error);
		}
	},
	{
		event: "guildCreate",
		function: (handler, guild) => {
			cache(handler.parent.bot, guild);
		}
	}
];

class SetupEventHandlers extends BaseTask {
	constructor(bot) {
		super(bot, {
			name: "SetupEventHandlers"
		});
		this.callback = async function() {
			Util.log("SETUPEVENTHANDLERS", `applying handlers to ${ClientEvents.length} events...`);
			let bar = new Progress("Applying handlers [:bar] :percent", ClientEvents.length);

			await ClientEvents.map((event) => {
				bot.eventHandlers.set(event, new EventHandler.EventHandler(this.bot, event));

				defaultEventFunctions.map((fn) => {
					let handler = bot.eventHandlers.get(fn.event);
					handler
						? handler.addHandler(new EventHandler.SubHandler(handler, "auto", fn.function))
						: Error("No event for default event function found!");
				});

				bar.tick();
			});
			Util.log("SETUPEVENTHANDLERS", "done.");
		};
	}
}

module.exports = SetupEventHandlers;