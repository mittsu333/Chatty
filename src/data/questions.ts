import { MrkdwnOption } from '@slack/types'

export const questions = (): MrkdwnOption[] => {
    return markdownTextList.map((text: string, index: number): MrkdwnOption => {
        return {
            "text": {
                "type": "mrkdwn",
                "text": text
            },
            "value": `q${index}`
        }
    })
}

const markdownTextList: string[] = [
    // 雑談
    "気になっている話題はありますか？",
    "最近、食べた食べ物を教えてください。",
    "最近、飲んだ飲み物を教えてください。",
    "最近、よく聴いているBGMを教えてください。",
    "最近、買ったものを教えてください。",
    "気分転換に何をしていますか？",
    "読んで良かった本はありますか？",
    "気に入ってる映画はありますか？",
    "気に入ってるアニメはありますか？",
    "気に入っているゲームはありますか？",
    "気に入ってる場所はありますか？",
    "ちょっと変わったこだわりを教えてください。",
    "今の季節を楽しむ方法を教えてください。",
    "今、何考えてた事を教えてください。",
    // 仕事寄りの話題
    "最近のプロジェクトの出来事を教えてください。",
    "他の開発チームにもおすすめしたい事はありますか？",
    "最近、仕事で覚えたことはありますか？",
    "今、気になっている技術情報は？",
    "これから勉強したいことは何ですか？",
    "最近ハマっているプログラムの書き方は？",
    "<https://qiita.com/Qiita/items/b5c1550c969776b65b9b|Qiita 週間トレンド記事一覧>の中で面白かった記事はありますか？",
    "<https://zenn.dev/|Zenn.dev trending>の中で面白かった情報はありますか？",
    "<https://github.com/trending?since=weekly|Github weekly trending>の中で気になるリポジトリはありますか？"
]

