import Util from '../lib/Util';
import { Guild } from '../../shared/models/GuildModel';
import { IGuild } from '../../shared/interfaces/Guild';
import { Guild as _Guild} from 'discord.js';
import { Nexus } from '../NexusBot';
import { BaseTask } from './BaseTask';

class PrepareCache extends BaseTask {
    constructor(bot: Nexus) {
        super(bot, {
            name: 'PrepareCache'
        });
        this.callback = async function () {
            Util.log(this.options.name.toUpperCase(), 'prepare cache');

            await bot.client.guilds.map((g: _Guild) => {
                Util.log(this.options.name.toUpperCase(), `${g.id}...`);

                Guild.findOne({
                    gid: g.id
                }, (err: Error, res: IGuild) => {
                    if (err) return Error(err.message);
                    if (!res) {
                        let guild = new Guild({
                            name: g.name,
                            gid: g.id,
                            options: {
                                channels: {},
                                prefix: bot.config.defaults.prefix
                            }
                        });
                        guild.save();
                        bot.cache.set(g.id, {
                            name: g.name,
                            gid: g.id,
                            options: {
                                channels: {},
                                prefix: bot.config.defaults.prefix
                            }
                        });
                    } else {
                        bot.cache.set(res.gid, res);
                    }
                    bot.cache.get(g.id) 
                    ? Util.log(this.options.name.toUpperCase(), `${g.id} complete`) 
                    : Util.log(this.options.name.toUpperCase(), "ERROR", `${g.id} failed`);
                });
            });
        }
    }
}

export default PrepareCache;