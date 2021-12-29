import { KnownBlock, PlainTextOption } from '@slack/types'

export const answerAction = "answer_action"
export const nextQuestionAction = "next_question_action"
export const textInputAction = "plain_text_input-action"

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

// export const freeQA: KnownBlock[] = [
//     {
//         "type": "input",
//         "element": {
//             "type": "static_select",
//             "placeholder": {
//                 "type": "plain_text",
//                 "text": "話題を選択",
//                 "emoji": true
//             },
//             "options": questions,
//             "action_id": "static_select-action"
//         },
//         "label": {
//             "type": "plain_text",
//             "text": "話題を選択してください",
//             "emoji": true
//         }
//     },
//     {
//         "type": "input",
//         "element": {
//             "type": "plain_text_input",
//             "multiline": true,
//             "action_id": textInputAction
//         },
//         "label": {
//             "type": "plain_text",
//             "text": "Label",
//             "emoji": true
//         }
//     }
// ]
