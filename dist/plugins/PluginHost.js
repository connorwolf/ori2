"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class PluginHost {
    constructor(bot, plugin) {
        this.bot = bot;
        this.plugin = plugin;
        this.watch();
    }
    watch() {
        fs.watchFile(this.plugin.options.path, () => {
            this.bot.logger.info(`Changes to plugin "${this.plugin.options.name}", reloading...`);
            this.plugin.stop();
            this.plugin.unload();
            this.plugin = new (require(`./${this.plugin.options.path}`))(this.bot);
            this.plugin.start();
        });
    }
}
exports.PluginHost = PluginHost;
//# sourceMappingURL=PluginHost.js.map