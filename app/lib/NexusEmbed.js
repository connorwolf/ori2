const RichEmbed = require("discord.js").RichEmbed;
const pkg = require("../../package.json");
class NexusEmbed extends RichEmbed {
	constructor() {
		super();
		this.setTimestamp();
		this.setColor(0xffffff);
		this.setTitle("Embed");
		this.setFooter(
			`ori v${pkg.version}`,
			"https://cdn.discordapp.com/avatars/430456068728946708/e2077a671835763d0ee17ffd90ff96ee.png?size=2048"
		);
	}
}

module.exports = NexusEmbed;