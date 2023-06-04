import { ApplicationCommandOptionType, Client, PermissionFlagsBits } from 'discord.js'

export default {
    name: 'ping',
    description: 'Development and Testing command.',
    devOnly: true,
    testOnly: true,
    permissionsRequired: [PermissionFlagsBits.Administrator],
    callback: (client: Client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms.`)
    }
}