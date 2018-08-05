import * as Discord from "discord.js";
import * as Winston from "winston";
import { PluginManager } from "./plugins/PluginManager";
export interface IKrystalClientOptions {
    defaults: {
        prefix: string;
    };
    bot: {
        token: string;
        plugins: string[];
    };
    db: {
        url: string;
    };
}
export declare class KrystalClient {
    logger: Winston.Logger;
    client: Discord.Client;
    cache: Discord.Collection<string, any>;
    startedOn: number;
    PluginManager: PluginManager;
    config: IKrystalClientOptions;
    constructor(config: IKrystalClientOptions);
    start(): Promise<void>;
    private setupDb;
    private setupClient;
}
