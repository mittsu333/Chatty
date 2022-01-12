import "./../utils/env"
import { app } from "../app"
import { shuffle } from "../utils/arrayUtils"
import { singleQuestion } from "../models/messageModel"

// ユーザー選択割合
const SELECT_RATE = 3
// ユーザー選択上限数
const SELECT_LIMIT_COUNT = 5

export async function pickupUsers() {
    var pickupList: string[] = []
    const channelId = process.env.POST_CHANNEL_ID
    const botId = process.env.BOT_ID
    if (!channelId || !botId) {
        return pickupList
    }

    const res = await app.client.conversations.members({
        channel: channelId,
    })
    if (res.ok) {
        const botFilterMembers = res.members?.filter((id) => id != botId) ?? []
        const shuffleMembers = shuffle(botFilterMembers) ?? []
        if (shuffleMembers.length) {
            const selectCount = Math.min(
                Math.ceil(shuffleMembers.length / SELECT_RATE),
                SELECT_LIMIT_COUNT
            )
            pickupList = shuffleMembers.slice(0, selectCount)

            await Promise.all(
                pickupList.map(
                    async (channelId) =>
                        await app.client.chat.postMessage({
                            channel: channelId,
                            blocks: singleQuestion(),
                        })
                )
            )
        }
    } else {
        console.log(`conversations.members error|${res.error ?? "null"}`)
    }
    return pickupList
}
