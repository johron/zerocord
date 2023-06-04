import { Client, Interaction } from "discord.js";
import { developers, serverId } from '../../../config.json'
import getLocalCommands from "../../utils/getLocalCommands";
import { LoggerTypes, ZeroLogger } from "../../utils/logger";

export default async function (client: Client, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return

    const localCommand: any[] = await getLocalCommands()

    try {
        const commandObject = localCommand.find((command: any) => command.name === interaction.commandName)
        
        if (!commandObject) return

        if (commandObject.devOnly) {
            if (!developers.includes(interaction.user.id)) {
                interaction.reply({
                    content: 'Sorry, only developers can use this command.',
                    ephemeral: true
                })
                return
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === serverId)) {
                interaction.reply({
                    content: 'Sorry, this command is only for the test server.',
                    ephemeral: true
                })
                return
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.memberPermissions.has(permission)) {
                    interaction.reply({
                        content: 'Sorry, but you dont have the required permissions.',
                        ephemeral: true
                    })
                    break
                }
            }
        }

        if (commandObject.botPermissions?.length) {
           for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Sorry, but i don\'t have the required permissions for this command.',
                        ephemeral: true
                    })
                    break
                }
           }
        }

        await commandObject.callback(client, interaction)
    } catch (error) {
        console.log(error)
        if (!error.toString().includes('Command')) {
            ZeroLogger({
                content: `An error has occurred: ${error}`,
                type: LoggerTypes.Error
            })
        }
    }
}