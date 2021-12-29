# Chatty

Slackのチャンネルに入っているユーザーにランダムで質問していくSlackアプリ
collaみたいなものだけど、質問を自作したかったのと回答から投稿までの時差を無くしたかったので作成した

### 初期設定

1. Slack Appを作成する
2. WIP Slack Appの管理画面で権限や設定を追加し、チャンネルに追加
3. コード内の`.env`にトークンなどを追加
4. `npm install` でnode_modulesを追加

### 実行

* アプリ起動

```
npm start
```


* 参加チャンネルからユーザーを抽出してDMに質問を投稿させる

ローカルでアプリ実行している場合（Boltは内部でExpress使っているのでデフォルト3000のはず）
ブラウザでlocalhost:3000/slack/pickupを読み込んでもok

ちゃんと運用する場合はcronなどで実行させる

```
curl localhost:3000/slack/pickup
```

