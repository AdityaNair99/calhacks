// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo != undefined && changeInfo.status != undefined) {
//     if (changeInfo.status == "complete" && tab.url.includes("google.com/search")) {
 //    }
 //  }
 // }
// );

async function parse(site, result, i){
  var request1 = new XMLHttpRequest();
  const url = 'https://cors-anywhere.herokuapp.com/' + site;
  // await request1.open("GET", url, true);
  // await request1.send();
  // var content = await request1.responseText;
  //console.log(content);
  // console.log(regex2);
  // console.log(request1.responseText.match(regex2));
  var content = await makeRequest("GET", url);
  var copy = content;
  while (copy.lastIndexOf("<script") != -1){
    var x = content.indexOf("<script");
    var y = content.indexOf("</script>", x);
    var stuff = content.slice(x, y + "</script>".length);
    content = content.replace(stuff, "");
    copy = copy.slice(y + "</script>".length);
  }
  while (copy.lastIndexOf("<style") != -1){
    var x = content.indexOf("<style");
    var y = content.indexOf("</style>", x);
    var stuff = content.slice(x, y + "</style>".length);
    content = content.replace(stuff, "");
    copy = copy.slice(y + "</style>".length);
  }
  while (copy.lastIndexOf("<img") != -1){
    var x = content.indexOf("<img");
    var y = content.indexOf("</img>", x);
    var stuff = content.slice(x, y + "</img>".length);
    content = content.replace(stuff, "");
    copy = copy.slice(y + "</img>".length);
  }
  var stuff = content;
  var ind = stuff.indexOf("conversations(");
  if (ind == -1) {
    ind = stuff.indexOf("comments(");
  }
  if (ind != -1) {
    stuff = stuff.slice(0, ind);
  }
  var tmp = document.createElement("DIV");
  tmp.innerHTML = stuff;
  stuff = tmp.textContent || tmp.innerText || "";
  //console.log(stuff);
  //var request = new XMLHttpRequest();
  var tmp = document.createElement("DIV");
  tmp.innerHTML = stuff;
  stuff = tmp.textContent || tmp.innerText || "";
  stuff = stuff.replace(/\s+/g, " ");
  var sentiment = await makePost(stuff);
  var sentiment_val = await JSON.parse(sentiment)['documentSentiment']['score'];
  // request.open("POST", "https://language.googleapis.com/v1/documents:analyzeEntities?key=AIzaSyAOxdXAtdGTHAtA_Tf_r9dPyK9DxKAGNcg", false);
  // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // request.send(JSON.stringify({
  // 'document':{
  // 'type':'PLAIN_TEXT',
  // 'content': stuff
  // }
  // }))
  // var b = JSON.parse(request.responseText);
  //console.log(a['entities'].sort(function(x, y){return y.salience - x.salience}));
  //
  // return [classify, entities, length]
  //
  var color;
  if (sentiment_val > 0) {
    color = "hsl(120, 61%, " + (65 + 15 * (1 - sentiment_val)) + "%)";
  } else if (sentiment_val == 0) {
    color = "hsl(0, 0%, 100%)";
  } else {
    color = "hsl(0, 100%," + (70 + 20 * (1 + sentiment_val)) + "%)";
  }
  console.log((i + 1) + " out of " + result.length);
  // result[i].innerHTML += "<span style='color:black; font-size:10pt'>         " + stuff.match(/\w+/g).length/200 + " minute read</span>";
  // result[i].innerHTML += "<span style='color:black; font-size:10pt'>     sentiment: " + sentiment_val + "</span>";
  var el = result[i].parentElement;
  while(el.className != 'rc'){
      el = el.parentElement;
  }
  //el is now your parent
  //el.parentElement.parentElement.style.width = '800px';
  box = document.createElement("div");
  box.innerHTML = Math.round((stuff.match(/\w+/g).length/200) % 30) + " minute read\nsentiment: " + sentiment_val;
  box.style.width = "120px";
  box.style.height = "20px";
  box.style.display = "inline-block";
  box.style.position = "absolute";
  box.style.top = "0";
  box.style.left = "-140px";
  box.style.fontWeight = "bold";
  box.style.padding = "30px 5px 40px";
  // box.style.border = "thin gray solid";
  // el.style.border = "thin gray solid";
  el.appendChild(box);
  box.style.backgroundColor= color
  let rcs = document.getElementsByClassName("rc")
  // for (let i = 0; i < rcs.length; i++) {
  //     rcs[i].style.width = "625px";
  //     if (i % 2 == 0) {
  //         color = "#ffc6c6";
  //     } else {
  //         color = "#cbffc6";
  //     }
  //     rcs[i].onmouseover=".backgroundColor='" + color + "';"
  //     rcs[i].onmouseout=".backgroundColor='white';";
  // }

}

function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function makePost(info) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyAOxdXAtdGTHAtA_Tf_r9dPyK9DxKAGNcg", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(JSON.stringify({
        'document':{
        'type':'PLAIN_TEXT',
        'content': info
        }
        }))
    });
}

let result = document.getElementsByClassName("LC20lb");
console.log(result);
for (let i = 0; i < result.length; i++) {
  let ret = parse(result[i].parentElement.href, result, i);
  //console.log(ret[0]);
  //console.log(ret[1]['entities'].slice(0, 5));
}
