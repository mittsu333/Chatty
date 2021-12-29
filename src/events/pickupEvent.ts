import './../utils/env'
import { app } from '../app'
import { shuffle } from '../utils/arrayUtils'
import { singleQuestion } from '../constants/messageConst'

// ユーザー選択割合
const SELECT_RATE = 2
// ユーザー選択上限数
const SELECT_LIMIT_COUNT = 5

export default async function pickupUsers() {
    const channelId = process.env.POST_CHANNEL_ID
    const botId = process.env.BOT_ID
    if (!channelId || !botId) {
        return
    }

    const res = await app.client.conversations.members({
        channel: channelId
    })
    if (res.ok) {
        const botFilterMembers = res.members?.filter(id => id != botId) ?? []
        const shuffleMembers = shuffle(botFilterMembers) ?? []
        if (shuffleMembers.length) {
            const selectCount = Math.min(Math.ceil(shuffleMembers.length / SELECT_RATE), SELECT_LIMIT_COUNT)
            const pickupMembers = shuffleMembers.slice(0, selectCount)

            await Promise.all(pickupMembers.map(channelId =>
                new Promise((resolve, reject) => {
                    app.client.chat.postMessage({
                        channel: channelId,
                        blocks: singleQuestion()
                    })
                })
            ))
        }
    } else {
        console.log(`conversations.members error|${res.error ?? "empty"}`)
    }
}
