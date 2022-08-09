import { Message } from "discord.js";
import Event from "../../structure/Event";
import AvaClient from "../../structure/AvaClient";

export default class MessageCreateEvent extends Event {
    constructor() {
        super('messageCreate', {
            category: "Messages"
        });
    }
    
    run(bot: AvaClient, message: Message) {
        // Constants for command checking
        const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();

        if (!message.content.startsWith(bot.prefix)) return;

        // Command launching
        let cmd;
        if (bot.commands.has(command as string)) cmd = bot.commands.get(command as string)
        else if (bot.aliases.has(command as string)) cmd = bot.commands.get(bot.aliases.get(command as string) as string);
    }
}