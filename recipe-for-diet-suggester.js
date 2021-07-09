function recipeForDietSuggester() {
    const ACCESS_TOKEN = getAccessToken();
    const line_endpoint = 'https://api.line.me/v2/bot/message/reply';
    const replyContent = "沼";
   
    if(replyContent == "") {

        return;
    } else {

        UrlFetchApp.fetch(line_endpoint, {
            'headers': {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + ACCESS_TOKEN,
            },
            'method': 'post',
            'payload': JSON.stringify({
                'replyToken': reply_token,
                'messages': [{
                    'type': 'text',
                    'text': replyContent,
                }],
            }),
        });

        return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
    }
}