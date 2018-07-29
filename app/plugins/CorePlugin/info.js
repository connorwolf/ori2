const CommandUtil = require("../../lib/CommandUtil"),
	NexusEmbed = require("../../lib/NexusEmbed"),
	Util = require("../../lib/Util");

function formUserEmbed(u, m) {
	let embed = new NexusEmbed().setTitle("")
		.setAuthor(`Info for ${u.tag}`, u.avatarURL)
		.addField("ID", u.id, true)
		.addField("Status", u.presence.status, true)
		// .addField("Joined On", moment(member.joinedTimestamp).format("HH:mm:ss DD/MM/YY"), true)
		.addField("Registered On", new Date(u.createdTimestamp), true)
		.setThumbnail(u.avatarURL);
	//.addField(`Roles [${member.roles.array().length - 1}]`, temp.join(", "));
        
	m.channel.send({ embed }).catch((err) => {
		Util.log(err);
	});
}

function formChannelEmbed(u, m) {
	let embed = new NexusEmbed().setTitle(`#${u.name}`).addField("ID", u.id, true).addField("Created", new Date(u.createdTimestamp));
	m.channel.send({ embed }).catch((err) => {
		Util.log(err);
	});
}

function formRoleEmbed(u, m) {
	let embed = new NexusEmbed();
	m.channel.send({ embed }).catch((err) => {
		Util.log(err);
	});
}

function formGuildEmbed(u, m) {
	let embed = new NexusEmbed().setTitle("")
		.setAuthor(u.name, u.iconURL)
		.addField("Name", u.name, true)
		.addField("ID", u.id, true)
		.addField("Owner", u.owner.user.tag, true)
		.addField("Region", u.region, true)
		.addField("Created On", new Date(u.createdTimestamp), true)
		.addField("Members", u.members.array().length, true)
		.addField("Channels", u.channels.array().length, true)
		.addField("Roles", u.roles.array().length, true)
		.setThumbnail(u.iconURL);
	m.channel.send({ embed }).catch((err) => {
		Util.log(err);
	});
}

const status = new CommandUtil.Command(
	{
		name: "info",
		description: "Fetch info on a user/guild",
		global: true,
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m, a) {
		if (a[0]) {
			if (b.client.users.get(a[0])) {
				return formUserEmbed(b.client.users.get(a[0]), m);
			} else if (b.client.guilds.get(a[0])) {
				return formGuildEmbed(b.client.guilds.get(a[0]), m);
			} else if (b.client.channels.get(a[0])) {
				return formChannelEmbed(b.client.channels.get(a[0]), m);
			} else if (m.mentions) {
				if (m.mentions.users.first()) {
					return formUserEmbed(m.mentions.users.first(), m);
				} else if (m.mentions.channels.first()) {
					return formChannelEmbed(m.mentions.channels.first(), m);
				} else if (m.mentions.roles.first()) {
					return formRoleEmbed(m.mentions.roles.first(), m);
				}
			} 
			else m.reply(`Cannot resolve \`${a[0]}\` to type \`user/guild/role/channel/snowflake\`.`);
		}
		return formUserEmbed(m.author, m);
	}
);

module.exports = status;
