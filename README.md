# Recipe for Diet Suggester
## 概要
ゆるく減量するためのレシピを毎日提案してくれるLINE Bot。

## レシピ一覧
[Recipe for Diet Suggester](<https://docs.google.com/spreadsheets/d/11X49AgLpuJgjj7Y0skaaYTlsn_dNny73rBMC2lu2mjU/edit#gid=0>)

### トリガー
- GAS のトリガーで毎日19-20時に実行

## LINE Bot
https://developers.line.biz/console/channel/1655754416

<img src="./img/857tqvob.png" width=10%>

### 備考
以下の追記が必要。  

#### ※注意※
- **git の管理対象からは必ず除外してください。**
- **第三者に知られると勝手に操作される可能性があります。**

```js
function getRecipeForDietSuggesterAccessToken(){
    return "$Your Channel access token";
}

function getRecipeForDietSuggesterUserId() {
    return "$Your LINE User ID";
}
```

## 参考
1. [GASとLINE Messaging APIでpushメッセージのLINEbotを作る！](<https://qiita.com/n_oshiumi/items/a1a02e03093825f41e01>)
1. [Math.random()](<https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random>)
1. [LINE Messaging APIの改行について](<https://qiita.com/naoki110529/items/66b010de0e6db8211b0f>)
1. [【GAS】リクエストに失敗しました。応答の全文を見るには muteHttpExceptions オプションを使用してください。](<https://qiita.com/kunihiros/items/255070ba950a7ba95ae4>)
