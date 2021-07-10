/* 参考
    * https://qiita.com/n_oshiumi/items/a1a02e03093825f41e01
*/
function recipeForDietSuggester() {
    const ACCESS_TOKEN = getAccessToken();
    const USER_ID = getUserId();
    const line_endpoint = "https://api.line.me/v2/bot/message/reply";
    const url = "https://api.line.me/v2/bot/message/push";

    const message = "沼";
   
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + ACCESS_TOKEN,
    };

    const postData = {
        "to" : USER_ID,
        "messages" : [
        {
            "type": "text",
            "text": message
        }
        ]
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "muteHttpExceptions" : true,
        "payload" : JSON.stringify(postData)
    };

    //https://qiita.com/kunihiros/items/255070ba950a7ba95ae4
    try {
        const res = UrlFetchApp.fetch(url, options);
        Logger.log(res);
    } catch(e) {
        Logger.log("Error:");
        Logger.log(e);
  }
}