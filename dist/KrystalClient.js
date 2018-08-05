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
const Discord = require("discord.js");
const Mongoose = require("mongoose");
const Winston = require("winston");
const PluginManager_1 = require("./plugins/PluginManager");
class KrystalClient {
    constructor(config) {
        this.config = config;
        this.logger = Winston.createLogger(require("./config/winston"));
        this.client = new Discord.Client();
        this.cache = new Discord.Collection();
        this.startedOn = Date.now();
        this.PluginManager = new PluginManager_1.PluginManager(this);
        this.logger.debug("KrystalClient initialised.");
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Krystal starting...");
            yield this.setupDb();
            yield this.setupClient();
            this.logger.info("Krystal ready.");
            this.PluginManager.startConfiguredPlugins();
        });
    }
    setupDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Mongoose.connect(this.config.db.url, { useNewUrlParser: true })
                .catch((error) => {
                this.logger.error(error);
                process.exit(1);
            });
        });
    }
    setupClient() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.login(this.config.bot.token)
                .catch((error) => {
                this.logger.error(error);
                process.exit(1);
            });
        });
    }
}
exports.KrystalClient = KrystalClient;
//# sourceMappingURL=KrystalClient.js.map