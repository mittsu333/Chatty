import './utils/env'
import { App, LogLevel } from '@slack/bolt'
import { messageEvent } from './events/messageEvent'
import { pickupUsers } from './events/pickupEvent'

export const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    port: Number(process.env.PORT) || 3000,
    logLevel: LogLevel.DEBUG,
    customRoutes: [
        {
            path: '/slack/pickup',
            method: ['GET'],
            handler: (req, res) => {
                res.writeHead(200);
                res.end('call pickupUsers.');
                pickupUsers()
            },
        },
    ]
})

app.use(async ({ next }) => {
    await next!();
});

(async () => {
    await app.start()
    console.log('⚡️ Bolt app is running!')
})()

messageEvent()