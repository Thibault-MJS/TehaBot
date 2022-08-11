import { Message } from "discord.js";
import Event from "../../structure/Event";
import AvaClient from "../../structure/AvaClient";
import Command from "../../structure/Command";
import ResponseBuilder from "../../utils/ResponseBuilder";

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

        let cmd: Command|undefined;

        if (bot.commands.has(command as string)) cmd = bot.commands.get(command as string);
        else if (bot.aliases.has(command as string)) cmd = bot.commands.get(bot.aliases.get(command as string) as string);

        if (cmd) {
            if (!cmd.options.cooldown) return cmd.run(bot, message, args);
            const cd = bot.cooldowns.find(cd => cd.name === cmd?.name && cd.author === message.author.id);
            if (cd) {
                // Verify if Date.now is less than time when we can use command
                const CooldownError = new ResponseBuilder(message.author)
                    .setTitle("Une erreur est survenue")
                    .setColor("RED")
                    .setMessage(`Vous ne pouvez pas utiliser la commande \`${cmd.name}\` maintenant. Vous pourrez l'utiliser dans \`${(((cd.last_used+cmd.options.cooldown)-Date.now())/1000).toFixed(2)}s\`.`)
                    .setType('error')
                    .build();
                if (Date.now() < (cd.last_used + cmd.options.cooldown)) return message.channel.send({ embeds: [CooldownError] });
                bot.cooldowns.splice(bot.cooldowns.indexOf(cd), 1);
            }
            cmd.run(bot, message, args);
            bot.cooldowns.push({
                name: cmd.name,
                last_used: Date.now(),
                author: message.author.id
            });
        };
    }
}