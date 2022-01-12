# Chatty

Slackのチャンネルに入っているユーザーにランダムで質問していくBotアプリ  
[colla](https://colla.jp/)を参考に作りました。

## 動作環境

* node v16.0.0

## Slack Appの登録から使用するまでの流れ

**一部操作がMacのクライアントアプリ(バージョン4.23.0)をもとにしているので、今後のSlackのバージョンアップや環境によっては表現や手続きに違いが出てくると思います**

文章化したので長くなりましたが10分から15分程度で終わる想定です。

* 最初にプロジェクトをクローンしてコード内の`.env.sample`から`.env`をコピーで生成する
* [Slack App](https://api.slack.com/apps)でアプリ作成(`Create New App`)する
    * 作成時に `From an app manifest (BETA)` を選択しておくとyml貼るだけで権限登録の手続き減るのでおすすめです
* SLACK_BOT_TOKEN(`xoxb`で始まるトークン)を取得
    * サイドメニュー -> `OAuth & Permissions` -> `OAuth Tokens for Your Workspace` -> `Install to Workspace`で作成できます
    * 取得できたら`.env`のSLACK_BOT_TOKENの値にします
* Botのスコープや各種設定を加える
    * サイドメニューから`Basic Information` -> `Edit Manifest` を選択して[このyml](https://github.com/mittsu333/Chatty#Slack-App-Manifest)（アプリ名は変更してください）を貼り付けます
    * ymlにはBot Scopeの付与とSubscriptionのEvent追加、Socketモードが有効になるように記述されています
* SLACK_SIGNING_SECRETを取得
    * `Basic Information` -> `App Credentials` -> `Signing Secret`から取得できます
    * 取得できたら`.env`のSLACK_SIGNING_SECRETの値にします
* SLACK_APP_TOKENを取得
    * `Basic Information` -> `App-Level Tokens` -> `Generate an app-level token` でTokenを取得します
    * トークン名はなんでも大丈夫ですが、Scopeは`connections:write`を選択してください
    * 取得できたら`.env`のSLACK_APP_TOKENの値にします
* チャンネルにアプリを追加
    * 3の手続きでワークスペースには追加されていると思うのでチャンネルにアプリを追加していきます
    * チャンネルのメニューの`Open channel details`から詳細を開きます
    * `Integrations` -> `Apps` -> `Add apps`からアプリを追加します
* POST_CHANNEL_IDを取得
    * アプリを追加したワークスペースを開き、Botを追加するチャンネル選択します
    * チャンネルのメニューの`copy link`からチャンネルのリンクを取得します
    * 末尾の`C0`から始まる文字列がチャンネルIDになります
    * 取得できたら`.env`のPOST_CHANNEL_IDの値にします
* BOT_IDを取得
    * Slack上のAppsから追加したアプリを選択し、メニューの`Open channel details`から詳細を開きます
    * 詳細に記載されている`Member ID`がBOT_IDになります
    * 取得できたら`.env`のBOT_IDの値にします
* ローカル環境でプロジェクトの動作確認
    * `npm install` でnode_modulesを追加
    * `npm start` で起動
    * **`curl localhost:3000/slack/pickup`** をリクエストするとチャンネル参加者にランダムで質問（DM）が飛んできます
        * ポートが3000なのはBoltは内部でExpress使っているからです

## Slack App Manifest

Botの権限とかはymlで分かるので参考までに貼っておきます。
name, display_nameは各々の環境で変更してください。

**重要なポイントはScopeとSubscriptionのEvent、Socketモードが有効になっているところです**

```
_metadata:
  major_version: 1
  minor_version: 1
display_information:
  name: {ここは作成したアプリ名}
features:
  bot_user:
    display_name: {ここは作成したアプリ名}
    always_online: false
oauth_config:
  scopes:
    bot:
      - chat:write
      - im:history
      - im:read
      - im:write
      - mpim:read
      - mpim:write
      - channels:history
      - channels:read
      - groups:history
      - groups:read
      - groups:write
settings:
  event_subscriptions:
    bot_events:
      - message.channels
      - message.groups
      - message.im
  interactivity:
    is_enabled: true
  org_deploy_enabled: false
  socket_mode_enabled: true
  token_rotation_enabled: false
```

## 質問一覧

[questions.ts](https://github.com/mittsu333/Chatty/blob/main/src/data/questions.ts#L15)に集約しています。  
これはテスト用に個人で思いつく範囲で書き出したものなので微妙な質問も入ってます。


