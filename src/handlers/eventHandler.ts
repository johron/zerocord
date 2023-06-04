import path from 'path'

import getAllFiles from "../utils/getAllFiles";
import { Client } from 'discord.js';

export default function (client: Client) {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)

    for (const eventFolder of eventFolders) {
        const eventFiles: string[] = getAllFiles(eventFolder)
        eventFiles.sort((a, b) => a.localeCompare(b));

        const eventName: string = eventFolder.replace(/\\/g, '/').split('/').pop()!
        
        client.on(eventName, async (argument) => {
            for (const eventFile of eventFiles) {
                const eventModule = await import(eventFile)
                const eventFunction = eventModule.default
                await eventFunction(client, argument)
            }
        })
    }
}