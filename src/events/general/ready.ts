import Event from "../../structure/Event";
import TehaClient from "../../structure/TehaClient";

export default class ReadyEvent extends Event {
    constructor() {
        super('ready', { category: "Général", once: true });
    }

    run(bot: TehaClient) {
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
        console.log("Teha's Bot successfuly connected");
    }
}