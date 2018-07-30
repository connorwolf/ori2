const util = require("util"),
	ts = require("time-stamp");

const NexusEmbed = require("./NexusEmbed");
require("colors");

const package = require("../../package.json");

const Util = {
	log(...args) {
		if (args[0].toUpperCase() == args[0]) args[0] = args[0].blue.bold;
		if (args[1].toUpperCase() == args[1] && args[1] == "ERROR") args[1] = args[1].red.bold;
		args[0] = util.format(ts("HH:mm:ss").gray, args[0]);
		console.log.apply(console, args);
	},
	package: package,
	nembed: {
		send(m, opts = {}, timeout = 5e3) {
			let embed = new NexusEmbed().setTitle(opts.title).setDescription(opts.description);

			m.channel.send({ embed }).then((msg) => {
				if (timeout && timeout != 0) msg.delete(timeout).catch(() => {});
			});
		}
	}
};

module.exports = Util;