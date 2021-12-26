import { KnownBlock, PlainTextOption } from '@slack/types';

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
]

export const singleQuestion = (questionValue: string = ""): KnownBlock[] => {
    const qList = questions.filter(q => q.value != questionValue)
    const qIndex = Math.floor(Math.random() * qList.length)
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
                    "value": qList[qIndex].value || "",
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
