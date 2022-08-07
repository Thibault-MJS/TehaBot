import { readdirSync } from 'fs';
import { sep } from 'path';
import Event from './Event';
import TehaClient from './TehaClient';

export default class EventHandler {
    public eventDir: string;
    public bot: TehaClient;
    
    constructor(eventDir: string, bot: TehaClient) {
        this.eventDir = eventDir;
        this.bot = bot;
    }

    async useMultifolder() {
        readdirSync(this.eventDir).map(async (category: string) => {
            const events = readdirSync(`${this.eventDir}${sep}${category}${sep}`).filter((files: string) => files.endsWith('.ts'));
            for (const file of events) {
                const event: Event = new (await import(`${this.eventDir}/${category}/${file}`)).default;
                this.launchEvent(event);
            }
        });
    }

    private launchEvent(event: any) {
        console.log(event);
        if (event.options?.once) {
            this.bot.once(event.name, event.run.bind(null, this.bot));
        } else {
            this.bot.on(event.name, event.run.bind(null, this.bot))
        }
    }

    async useSingleFolder() {
        const events = readdirSync(this.eventDir).filter((files: string) => files.endsWith('.ts'));
        for (const file of events) {
            const event: Event = new (await import(`${this.eventDir}/${file}`)).default;
            this.launchEvent(event);
        }
    }
}