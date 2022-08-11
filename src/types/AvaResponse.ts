import { ColorResolvable } from "discord.js";

export type AvaResponseData = {
    type: AvaResponseType;
    title: string;
    message: string;
    color: ColorResolvable;
}

export type AvaResponseType = 'success' | 'warning' | 'error' | 'info';