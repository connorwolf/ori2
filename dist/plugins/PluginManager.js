"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const PluginHost_1 = require("./PluginHost");
class PluginManager {
    constructor(bot) {
        this.bot = bot;
        this.pluginHosts = new discord_js_1.Collection();
    }
    spawn(plugin) {
        this.bot.logger.info(`Spawning plugin host for plugin "${plugin.options.name}"...`);
        this.pluginHosts.set(plugin.options.name, new PluginHost_1.PluginHost(this.bot, plugin));
    }
    load(plugin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.logger.info(`Loading plugin "${plugin.options.name}"...`);
            yield plugin.start();
        });
    }
    startConfiguredPlugins() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.logger.info("Spawning configured plugins...");
            this.bot.config.bot.plugins.map((path) => {
                const pluginFile = require(`./${path}`);
                try {
                    console.log(new pluginFile.Plugin(this.bot));
                }
                catch (err) {
                    this.bot.logger.error(err);
                }
            });
        });
    }
}
exports.PluginManager = PluginManager;
//# sourceMappingURL=PluginManager.js.map