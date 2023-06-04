import { Client } from "discord.js";
import { ZeroLogger } from "../../utils/logger";

export default function (client: Client) {
    ZeroLogger({
        content: `Signed in as ${client.user!.tag}`,
        prefix: '👋'
    })
}