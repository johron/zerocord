import { Client, IntentsBitField } from 'discord.js'
import 'dotenv/config'

import './handlers/eventHandler'
import eventHandler from './handlers/eventHandler'
import { LoggerTypes, ZeroLogger } from './utils/logger'

ZeroLogger({
    content: 'Zerocord is booting up',
    newline: false,
    prefix: '🔌'
})

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

eventHandler(client)

ZeroLogger({
    content: 'Attempting zerocord login',
    prefix: '⏳'
})

client.login(process.env.TOKEN)