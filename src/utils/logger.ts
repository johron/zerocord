export enum LoggerTypes {
    Info = 0,
    Warn = 1,
    Error = 2,
}

interface LoggerObject {
    content: string
    prefix?: string
    newline?: boolean
    punctuation?: boolean
    type?: LoggerTypes
}

export async function ZeroLogger (options: LoggerObject) {
    const { content, prefix, newline = true, punctuation = true, type = LoggerTypes.Info } = options

    let message = ''

    if (type == LoggerTypes.Info) {
        if (prefix) message = `${prefix} `
    } else {
        if (LoggerTypes.Error) message = `⛔ `
        if (LoggerTypes.Warn) message = `🛑 `
    }

    message += `${content}`

    if (punctuation) message += '.'
    if (newline) message += '\n'

    console.log(message)
}