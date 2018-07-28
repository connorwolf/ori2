const Progress = require("progress");

const Util = require("../lib/Util"),
	ClientEvents = require("../lib/ClientEvents"),
	BaseTask = require("../tasks/BaseTask"),
	EventHandler = require("../lib/EventHandler");

const defaultEventFunctions = [
	{
		event: "error",
		function: (handler, error) => {
			Util.log("DISCORD", "ERROR", error.messsage);
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