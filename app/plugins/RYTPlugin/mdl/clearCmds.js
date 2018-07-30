module.exports = function(c) {
	let m = c.channels.get("453641475008364544");
	let count = 100;

	let toDelete = [];

	m.channel.fetchMessages({
		limit: count
	}).then((msgs) => {
		msgs.map((msg) => {
			if (msg.pinned) return;

			toDelete.push(msg);

		});

		m.channel.bulkDelete(toDelete).catch(() => {});

	});
};