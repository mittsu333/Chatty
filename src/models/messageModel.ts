import { KnownBlock } from '@slack/types'
import { questions } from '../data/questions'

export const answerAction = "answer_action"
export const nextQuestionAction = "next_question_action"
export const textInputAction = "plain_text_input-action"

export const singleQuestion = (questionValues: string[] = []): KnownBlock[] => {
    var qList = questions.filter(q => !questionValues.includes(q.value ?? ''))
    if (!qList.length) {
        qList = questions
        questionValues = []
    }
    const qIndex = Math.floor(Math.random() * qList.length)
    const filterValues = questionValues.concat([qList[qIndex].value ?? ''])
    return [
        {
            "type": "input",
            "element": {
                "type": "plain_text_input",
                "multiline": true,
                "action_id": textInputAction
            },
            "label": {
                "type": "plain_text",
                "text": qList[qIndex].text.text,
                "emoji": true
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "他の質問にする",
                        "emoji": true
                    },
                    "value": filterValues.join(),
                    "action_id": nextQuestionAction
                },
                {
                    "type": "button",
                    "style": "primary",
                    "text": {
                        "type": "plain_text",
                        "text": "投稿する",
                        "emoji": true
                    },
                    "value": "post_action",
                    "action_id": answerAction
                }
            ]
        }
    ]
}
