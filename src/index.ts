import AvaClient from "./structure/AvaClient";

const bot = new AvaClient(process.env.TOKEN as string, 'a!');
bot.initialize();