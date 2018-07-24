import { Nexus } from "../NexusBot";
import { CorePlugin } from "../plugins/CorePlugin";
import { BasePlugin } from "../plugins/BasePlugin";

class PluginManager {
    bot: Nexus;
    plugins: Map<string, BasePlugin>
    constructor(bot: Nexus) {
        this.bot = bot;
        this.plugins = new Map();
    }
    
    loadPlugin(plugin: BasePlugin) {
        plugin.start();
    }

    async loadCore() {
        let core = new CorePlugin(this.bot);
        this.plugins.set('core', core);  
        core.start();
    }
}

export default PluginManager;