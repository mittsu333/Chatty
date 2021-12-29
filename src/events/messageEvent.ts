import './../utils/env';
import { app } from '../app';
import {
    answerAction,
    nextQuestionAction,
    textInputAction,
    singleQuestion
} from '../constants/messageConst';

export default function () {

    app.action(nextQuestionAction, async ({ body, ack }) => {
        try {
            const jsonStr = JSON.stringify(body)
            const jsonObj = JSON.parse(jsonStr)
            const [userId, currentQuestionValues] = [
                jsonObj.user.id,
                jsonObj.actions[0].value.split(','),
            ]
            await ack();
            await app.client.chat.postMessage({
                channel: userId,
                blocks: singleQuestion(currentQuestionValues)
            });

        } catch (e) {
            console.log(`json parse error:${e}`)
        }
    })

    app.action(answerAction, async ({ body, ack }) => {
        const channelId = process.env.POST_CHANNEL_ID
        if (!channelId) {
            return
        }

        try {
            const jsonStr = JSON.stringify(body)
            const jsonObj = JSON.parse(jsonStr)
            const [userName, question, answer] = [
                jsonObj.user.name,
                jsonObj.message.blocks[0].label.text,
                jsonObj.state.values[jsonObj.message.blocks[0].block_id][textInputAction].value,
            ]
            await ack();
            await app.client.chat.postMessage({
                channel: channelId,
                type: 'mrkdwn',
                text: `${userName}さんに聞きました。\n> ${question}\n\n${answer}\n`
            });

        } catch (e) {
            console.log(`json parse error:${e}`)
        }
    })
}
