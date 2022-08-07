import Event from "../../structure/Event";
import TehaClient from "../../structure/TehaClient";

export default class ReadyEvent extends Event {
    constructor() {
        super('ready', { category: "Général", once: true });
    }

    run(bot: TehaClient) {
        console.log("Client logged");
    }
}