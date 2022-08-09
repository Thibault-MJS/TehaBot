import Event from "../../structure/Event";
import AvaClient from "../../structure/AvaClient";

export default class ReadyEvent extends Event {
    constructor() {
        super('ready', { category: "Général", once: true });
    }

    run(bot: AvaClient) {
        // Fetch guilds
        let users = 0;
        bot.guilds.cache.map(guild => users += guild.memberCount);
        bot.user?.setPresence({
            status: "idle",
            activities: [{
                name: `${users} utilisateur(s)`,
                type: 'WATCHING'
            }]
        });
        bot.user?.setUsername("AvaBot");
        console.log("Ava successfuly connected");
    }
}