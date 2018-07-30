module.exports = function(client) {
	let c = client.channels.get("453641475008364544");
	let count = 100;

	let toDelete = [];

	c.fetchMessages({
		limit: count
	}).then((msgs) => {
		msgs.map((msg) => {
			if (msg.pinned) return;

			toDelete.push(msg);

		});

		c.bulkDelete(toDelete).catch(() => {});

	});
};