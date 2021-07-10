/* 参考
    * https://qiita.com/n_oshiumi/items/a1a02e03093825f41e01
*/
function recipeForDietSuggester() {
    const recipe = getRecipeForDiet();
    const recipeName = recipe[0];
    const recipeDescription = recipe[1];
    const recipeUrl = recipe[2];

    //https://qiita.com/naoki110529/items/66b010de0e6db8211b0f
    const message = recipeName + "\n\n"
        + recipeDescription + "\n\n"
        + recipeUrl;

    postToLINE(message);
}

function getRecipeForDiet() {
    const spreadSheet = SpreadsheetApp.openById("11X49AgLpuJgjj7Y0skaaYTlsn_dNny73rBMC2lu2mjU");
    const sheet = spreadSheet.getSheetByName("Recipe for Diet");
    const lastRow = sheet.getLastRow();
    const recipeList = sheet.getRange(2, 1, lastRow, 3).getValues();
    const recipe = recipeList[getRandomInt(0, lastRow - 2)];

    return recipe;
}

/* 参考
    * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function postToLINE(message) {
    const ACCESS_TOKEN = getAccessToken();
    const USER_ID = getUserId();
    const line_endpoint = "https://api.line.me/v2/bot/message/push";
   
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
        const res = UrlFetchApp.fetch(line_endpoint, options);
        Logger.log(res);
    } catch(e) {
        Logger.log("Error:");
        Logger.log(e);
    }
}