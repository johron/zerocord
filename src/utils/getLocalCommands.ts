import path from 'path'

import getAllFiles from '../utils/getAllFiles'

export default async function (exceptions: string[] = []) {
    let localCommands: string[] = []

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    )

    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory)
        
        for (const commandFile of commandFiles) {
            const commandObject = await require(commandFile).default
            if (exceptions.includes(commandObject.name)) {
                continue
            }

            localCommands.push(commandObject)
        }
    }

    return localCommands
}