import {Message} from "discord.js";
import {CommandOptions} from "../types/CommandOptions";
import TehaClient from "./TehaClient";

export default abstract class Command {
    public name: string;
    public options: CommandOptions;

    constructor(name: string, options: CommandOptions) {
        this.name = name;
        this.options = options;
    }

    abstract run(bot: TehaClient, message: Message, args: string[]): void;
}