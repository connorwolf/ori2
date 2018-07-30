const CommandUtil = require("../../../lib/CommandUtil"),
	Util = require("../../../lib/Util");

function search(b, id) {
	return new Promise((resolve) => {
		b.client.guilds.map((gd) => {
			Util.log("CLEAR", `SEARCH: user ${id} in ${gd.id} - ${gd.members.get(id) ? "YES" : "NO"}`);
			gd.members.get(id) ? resolve(gd) : false;
		});
	});
}

const clear = new CommandUtil.Command(
	{
		name: "clear",
		description: "Clears messages",
		global: true,
		permission: new CommandUtil.CommandPermission(1),
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function (b, m, a) {
		let type = typeof a[0];
		let count = 100;
		let userid;

		let botOnly = false;

		switch (type) {
		case "number":
			if (!search(b, a[0])) count = parseInt(a[0], 10);
			if (search(b, a[0])) userid = a[0];
			break;
		case "string":
			if (a[0].toLowerCase() == "bot") botOnly = true;
			break;
		}

		let toDelete = [];

		m.channel.fetchMessages({
			limit: count
		}).then((msgs) => {
			msgs.map((msg) => {
				if (msg.pinned) return;
				if (userid && msg.author.id != userid) return;
				if (botOnly && !msg.author.bot) return;

				toDelete.push(msg);

			});

			if (toDelete.length < 1)
				return Util.nembed.send(m, {
					title: "Messages Purged",
					description: `Deleted ${toDelete.length} messages.`
				});

			m.channel.bulkDelete(toDelete).then(() => {

				Util.nembed.send(m, {
					title: "Messages Purged",
					description: `Deleted ${toDelete.length} messages.`
				});

			}, (err) => {

				Util.nembed.error(m, {
					title: "Could not purge messages.",
					description: err
				});

			});

		});
	}
);

module.exports = clear;