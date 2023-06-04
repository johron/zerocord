import { Client } from "discord.js";

import { serverId } from '../../../config.json'
import getLocalCommands from "../../utils/getLocalCommands";
import getApplicationCommands from "../../utils/getApplicationCommands";
import areCommandDifferent from "../../utils/areCommandDifferent";
import { LoggerTypes, ZeroLogger } from "../../utils/logger";

export default async function (client: Client) {
    ZeroLogger({
        content: 'Starting command registrar',
        prefix: '⚡'
    })

    try {
        const localCommands: any = await getLocalCommands()
        const applicationCommands = await getApplicationCommands(client, serverId)

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand
            const existingCommand = await applicationCommands.cache.find(
                (command) => command.name === name
            )

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id)

                    ZeroLogger({
                        content: `Deleted command '${name}'`,
                        newline: false,
                        prefix: '🗑️'
                    })

                    continue 
                }

                if (areCommandDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    })

                    ZeroLogger({
                        content: `Edited command '${name}'`,
                        newline: false,
                        prefix: '🔁'
                    })
                }
            } else {
                if (localCommand.deleted) {
                    ZeroLogger({
                        content: `Skipping registering of command '${name}', as it's been set to be deleted`,
                        newline: false,
                        prefix: '↪️'
                    })

                    continue
                }

                await applicationCommands.create({
                    name,
                    description,
                    options
                })

                ZeroLogger({
                    content: `Registered command '${name}'`,
                    newline: false,
                    prefix: '✍️'
                })
            }
        }

        ZeroLogger({
            content: '',
            punctuation: false,
            newline: false
        })
    } catch (error) {
        ZeroLogger({
            content: `An error has occurred: ${error}`,
            type: LoggerTypes.Error
        })
    }
}