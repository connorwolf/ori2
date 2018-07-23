import Util from '../lib/Util';
import ClientEvents from '../lib/ClientEvents';
import { Nexus } from '../NexusBot';
import { BaseTask } from './BaseTask';
import { EventHandler, SubHandler } from '../lib/EventHandler';

const defaultEventFunctions = [
    {
        event: 'debug',
        function: (handler: EventHandler, msg: any) => {
            Util.log("DISCORD", msg);
        }
    },
    {
        event: 'error',
        function: (handler: EventHandler, error: any) => {
            Util.log("DISCORD","ERROR", error.messsage);
        }
    }
]

class SetupEventHandlers extends BaseTask {
    constructor(bot: Nexus) {
        super(bot, {
            name: 'SetupEventHandlers'
        });
        this.callback = async function () {
            Util.log("SETUPEVENTHANDLERS", `applying handlers to ${ClientEvents.length} events...`);
            await ClientEvents.map((event, i) => {
                bot.eventHandlers.set(
                    event,
                    new EventHandler(this.bot, event)
                );

                defaultEventFunctions.map(fn => {
                    let handler = bot.eventHandlers.get(fn.event)
                    handler ? handler.addHandler(new SubHandler(handler, 'auto', fn.function)) : Error('No event for default event function found!');
                });

                Util.log(`SETUPEVENTHANDLERS`, `${`[${i + 1}/${ClientEvents.length}]`.yellow}  ✅   applied handler for ${event.green}`);
            });
            Util.log("SETUPEVENTHANDLERS", "done.");
        }
    }
}

export default SetupEventHandlers;