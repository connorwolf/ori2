import { Document, Schema, Model, model } from "mongoose";
import { User } from "discord.js";

export const ApplicationSchema = new Schema({
    user: User,
    name: String,
    createdTimestamp: Number,
    questions: Array
});

export const Application = model("Application", ApplicationSchema);