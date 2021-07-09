const ACCESS_TOKEN = setAccessToken();
const line_endpoint = 'https://api.line.me/v2/bot/message/reply';

const msg_for_delete_history = "履歴削除します。 \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n 削除完了しました。";

function doPost(e) {
  var json = JSON.parse(e.postData.contents);

  //返信Token
  var reply_token= json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  
  var message = json.events[0].message.text; //LINEに投稿されたメッセージはここ  
  var replyContent = makeMessage(message);
   
  if(replyContent == "") {
    return;
  }
  // メッセージを返信    
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

function makeMessage(message) {
  var sheetName = searchSheetName(message);
  
  //refs. https://qiita.com/rechiba3/items/6e999d1e360442f4f38a
    if (message.search("追加して") != -1) {

      //LINEメッセージを「改行」で分割
      var messageParameter = message.split(/\r\n|\n/);
      
      //対象のスプレッドシートを取得して更新する
      var targetSht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
      var lastRow = targetSht.getLastRow();
      
      //各セルに書き込み
      targetSht.getRange('A' + (lastRow + 1)).setValue(messageParameter[1]);
      
      return "追加しました";
      
    } else {

      return getQuestion(sheetName);
    }

}

function searchSheetName(message) {
  var sheetName;

  if (message.search("Open Deck") != -1) {
    sheetName = "Open Deck";
  } else if (message.search("Closed Deck") != -1) {
    sheetName = "Closed Deck";
  } else if (message.search("Black Deck") != -1) {
    sheetName = "Black Deck";
  } else if (message.search("Pink Deck") != -1) {
    sheetName = "Pink Deck";
  } else if (message.search("今日のランチ") != -1) {
    sheetName = "Today's Lunch";
  } else if (message.search("履歴削除") != -1) {
    sheetName = "delete_history";
  } else {
    sheetName = "null";
  }
    
  return sheetName;
}

function getQuestion(sheetName) {
  if (sheetName == "null") {
    return "すみません。よくわかりません。";
  } else if (sheetName == "delete_history") {
    return msg_for_delete_history;
  } else {
    var questionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    var questionListRange = questionSheet.getRange(1, 1, questionSheet.getLastRow() - 1, 1);
    var questionList = questionListRange.getValues();
    
    var index = Math.floor(Math.random() * questionList.length);
    var question = questionList[index][0];
  }
  
  return question;
}
