import TehaClient from "./structure/TehaClient";

const bot = new TehaClient(process.env.TOKEN as string, '?');
bot.initialize();