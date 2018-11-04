// 
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   stuff = "literally nothing"
//       var request = new XMLHttpRequest();
//         // request.open("POST", "https://vision.googleapis.com/v1/images:annotate?key=" + key, false);
//         request.open("POST", "https://language.googleapis.com/v1/documents:analyzeEntities?key=" + key, false);
//         request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//       //   request.send(JSON.stringify({
//       //     'requests': [
//       //   {
//       //     'image': {
//       //       'source': {
//       //         'imageUri': 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/573c8d3037013b84828a35b5/1463586106534/is-han-solo-really-dead-harrison-ford-says-hes-just-resting?format=1500w'
//       //       }
//       //     },
//       //     'features': [
//       //       {
//       //         'type': 'LABEL_DETECTION'
//       //       }
//       //     ]
//       //   }
//       // ]
//       //   }));
//       request.send(JSON.stringify({
//   'document':{
//     'type':'PLAIN_TEXT',
//     'content': stuff
//   }
// }))
//       console.log(request.responseText);
// });
