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

    var aList = window.localStorage["emailAddresses"].split(",").map(
        function(s) { return s.trim()}
    );
    console.log("Addresses: " + aList.length + " found");

    var c = document.getElementById("alist-container");
    
    aList.forEach(function(s) {
        var li = document.createElement("LI");
        var a = document.createElement("A");
        a.setAttribute('href', '#');
        a.setAttribute('id', s);
        a.appendChild(document.createTextNode(s));
        li.appendChild(a);
        c.appendChild(li);
        
        a.addEventListener('click', function(e) {
            makeGmailWin(e.target.id);
        });
    });
});

