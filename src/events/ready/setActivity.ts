import { Client, ActivityType } from "discord.js";

let activities: object[] = [
    {
        name: 'commands',
        type: ActivityType.Listening
    },
    {
        name: 'terminal',
        type: ActivityType.Watching
    },
    {
        name: 'repository',
        type: ActivityType.Watching,
        url: 'https://github.com/johainworks/zerocord'
    }
]

export default function (client: Client) {
    setInterval(() => {
        let random: number = Math.floor(Math.random() * activities.length)
        client.user.setActivity(activities[random])
    }, 15000)
}