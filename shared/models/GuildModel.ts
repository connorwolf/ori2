import { Schema, model } from "mongoose";
// import { IGuild } from "../interfaces/Guild";

export var GuildSchema: Schema = new Schema({
    name: String,
    gid: String,
    options: {
        channels: {
            log: String,
            default: String,
            commands: String,
        },
        prefix: String
    },
    updatedAt: Date
});

export const Guild = model("Guild", GuildSchema);