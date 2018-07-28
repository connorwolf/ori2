import { User } from 'discord.js';

export interface IApplication {
    user: User,
    createdTimestamp: Number,
    questions: Array<string>,
    answers: Array<string>
}