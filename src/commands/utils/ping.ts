import { Message } from "discord.js";
import AvaClient from "../../structure/AvaClient";
import Command from "../../structure/Command";
import ResponseBuilder from "../../utils/ResponseBuilder";

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            category: "Utilitaire",
            cooldown: 3000,
            description: "Envoie une requête afin de connaître la latence de AvaBot"
        });
    }

    async run(bot: AvaClient, message: Message, args: string[]) {
        const APIPing = bot.ws.ping;

        // Send response
        let PingInfo = new ResponseBuilder(message.author)
            .setTitle(`Latence de ${bot.user?.username}`)
            .setMessage(`La latence actuelle de ${bot.user?.username} est de \`${APIPing} ms\``)
            .setColor("BLURPLE")
            .setType('info')
            .build();
        return message.channel.send({ embeds: [PingInfo] });
    }
}