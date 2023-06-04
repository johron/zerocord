import { ChannelType, Client, CommandInteraction } from "discord.js"

import { serverId, categoryId } from '../../config.json'
import { LoggerTypes, ZeroLogger } from "./logger"

interface ChannelOptions {
    name: string
}

export default async function (options: ChannelOptions, bot: Client, interaction: CommandInteraction): Promise<string> {
    const { name } = options

    const guild = await bot.guilds.fetch(serverId)
    const everyoneRole = (await (await bot.guilds.fetch(serverId)).roles.fetch(serverId)).id

    let channel = (await guild.channels.fetch(categoryId)).guild.channels.cache.find(channel => channel.name === name.replace('#', '').toLowerCase())
    if (channel) channel.delete()

    interaction.reply({
        content: 'Creating a new session for you.',
        ephemeral: true
    })

    await guild.channels.create({
        name: name,
        type: ChannelType.GuildText
    }).then(r => {
        r.permissionOverwrites.create(bot.user.id, { ViewChannel: true })
        r.permissionOverwrites.create(interaction.user.id, { ViewChannel: true })
        r.permissionOverwrites.create(everyoneRole, {ViewChannel: false})
        r.setParent(categoryId)
    }).catch(error => {
        ZeroLogger({
            content: `An error has occurred: ${error}`,
            type: LoggerTypes.Error
        })
    })

    let terminalId = await ((await guild.channels.fetch(categoryId)).guild.channels.cache.find(channel => channel.name === name.replace('#', '').toLowerCase())).id

    return terminalId
}