var bg = chrome.extension.getBackgroundPage();

function makeGmailWin(user) {
  // Ensure this is the active window
  var body = '';
  var subject = "";
  if (localStorage["subjectPrefix"]) {
    subject += localStorage["subjectPrefix"] + " - ";
  }
  subject += bg.title;
  if (bg.selectedText == '') {
    body = bg.url;
  } else {
    body = bg.selectedText + "\n" + bg.url;
  }
  var gmailURL = bg.makeGmailDomainUrl() +
                 "&su=" + encodeURIComponent(subject) +
                 "&body=" + encodeURIComponent(body) +
                 "&authuser=" + user;
  console.log(gmailURL);
  window.location = gmailURL;
}

document.addEventListener('DOMContentLoaded', function() {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) { 
        links[i].addEventListener('click', function(e) {
            console.log(e.target.id);
            makeGmailWin(e.target.id);
        });
    }
});

