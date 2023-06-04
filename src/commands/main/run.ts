import { ApplicationCommandOptionType, Client, CommandInteraction, MessageInteraction } from 'discord.js'
import createChannel from '../../utils/createChannel'
import { LoggerTypes, ZeroLogger } from '../../utils/logger'

import { exec } from 'child_process'

function execute(command) {
    return new Promise(function(resolve, reject) {
        exec(command, function(error, stdout, stderr) {
            if (error) {
                reject(error)
            }

            if (stderr) {
                reject(stderr)
            }

            resolve(stdout)
        })
    })
}

export default {
    name: 'run',
    description: 'Run a zerocord linux command.',
    options: [
        {
            name: 'command',
            description: 'The command to execute/run.',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    callback: async (client: Client, interaction: CommandInteraction) => {
        const command = interaction.options.get('command').value.toString()

        try {
            const output = await execute(command)
            console.log(output)
            interaction.reply({
                content: `\`\`\`bash\n${output}\n\`\`\``,
                ephemeral: true
            })
        } catch (error) {
            interaction.reply({
                content: `\`\`\`bash\n${error}\n\`\`\``,
                ephemeral: true
            })
            ZeroLogger({
                content: `An error has occurred: ${error}`,
                type: LoggerTypes.Error
            })
        }
    }
}