import { KrystalClient } from "../../KrystalClient";
import { BasePlugin, IPluginOptions } from "../BasePlugin";
export declare const TestPluginOptions: {
    name: string;
    path: string;
};
export declare class TestPlugin extends BasePlugin {
    constructor(bot: KrystalClient, options: IPluginOptions);
}
