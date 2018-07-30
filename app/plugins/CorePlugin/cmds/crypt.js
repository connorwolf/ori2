const cipher = require("cipher")("#ori4owner");

const CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed");

const crypt = new CommandUtil.Command(
	{
		name: "crypt",
		description: "?",
		global: true,
		permission: new CommandUtil.CommandPermission(0),
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function (b, m, a) {
		if (a.length < 2) {
			return m.reply("ERROR>16: CONDITION NOT SATISFIED: INCORRECT SYNTAX");
		}
		let operation = a.shift();
        
		switch(operation) {
		case "en":
			let msg = a.join(" ");
			if (msg.length < 1)
				return m.reply("ERROR>24: MSG NOT GIVEN");

			let enobj = JSON.parse(cipher.encrypt(msg).toString());
			let embed = new NexusEmbed()
				.setTitle("ENCRYPT COMPLETE")
                .setDescription("CT IV S - OPERATION SUCCESSFULL")
                .addField("CRYPTO STRING", `\`${enobj.ct} ${enobj.iv} ${enobj.s}\``)
				.addField("CT", `\`${enobj.ct}\``, true)
				.addField("IV", `\`${enobj.iv}\``, true)
				.addField("S", `\`${enobj.s}\``, true);
            
			m.author.send({ embed });
			break;
		case "de":
			let ct = a[0];
			let iv = a[1];
			let s = a[2];

			let deobj = JSON.stringify({ ct: ct, iv: iv, s: s});
			let destr = cipher.decrypt(deobj);

			if (destr.length < 1) {
				let embed = new NexusEmbed()
					.setTitle("DECRYPT FAILED")
					.setDescription("CT IV S - OPERATION FALIURE")
					.addField("CT", `\`${a[0]}\``, true)
					.addField("IV", `\`${a[1]}\``, true)
					.addField("S", `\`${a[2]}\``, true)

				return m.author.send({ embed });
			} else {
				let embed = new NexusEmbed()
					.setTitle("DECRYPT COMPLETE")
					.setDescription("CT IV S - OPERATION SUCCESSFULL")
					.addField("CT", `\`${a[0]}\``, true)
					.addField("IV", `\`${a[1]}\``, true)
					.addField("S", `\`${a[2]}\``, true)
					.addField("RES", destr);
                
				return m.author.send({ embed });
			}
			break;
		default:
			return m.reply("ERROR>28: CONDITION NOT SATISFIED: INVALID OPERATION");
		}
	}
);

module.exports = crypt;