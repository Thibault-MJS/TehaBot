import {Message} from "discord.js";
import {CommandOptions} from "../types/CommandOptions";
import AvaClient from "./AvaClient";

export default abstract class Command {
    public name: string;
    public options: CommandOptions;

    constructor(name: string, options: CommandOptions) {
        this.name = name;
        this.options = options;
    }

    abstract run(bot: AvaClient, message: Message, args: string[]): void;
}