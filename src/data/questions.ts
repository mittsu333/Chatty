import { PlainTextOption } from '@slack/types'

export const questions: PlainTextOption[] = [
    {
        "text": {
            "type": "plain_text",
            "text": "最近気になっている話題は？",
            "emoji": true
        },
        "value": "q1"
    },
    {
        "text": {
            "type": "plain_text",
            "text": "最近のプロジェクト（仕事）であったことは？",
            "emoji": true
        },
        "value": "q2"
    },
    {
        "text": {
            "type": "plain_text",
            "text": "最近買って良かったものは？",
            "emoji": true
        },
        "value": "q3"
    },
]
