import { Client } from 'discord.js'
import createChannel from '../../utils/createChannel'
import { ZeroLogger } from '../../utils/logger'

export default {
    name: 'session',
    description: 'Sets up a new ZeroCord terminal session.',
    callback: (client: Client, interaction) => {
        ZeroLogger({
            content: 'session command ran and starting things'
        })
        
        createChannel({
            name: interaction.user.tag
        }, client, interaction)
    }
}