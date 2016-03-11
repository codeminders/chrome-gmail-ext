function loadSavedOptions() {
    if (window.localStorage == null) {
        alert("LocalStorage must be enabled for managing options.");
        return;
    }
    var emailAddresses = localStorage["emailAddresses"];
    if (emailAddresses) {
        document.getElementById('addresses').value = emailAddresses;
    }
    var subjectPrefix = localStorage["subjectPrefix"];
    if (subjectPrefix) {
        document.getElementById('subject_prefix').value = subjectPrefix;
    }
}

function saveOptions() {
    var aVal = document.getElementById('addresses').value; 
    console.log("Addresses - " + aVal);
    
    if(aVal.indexOf(',') == -1)
    {
        console.log("Addresses - list not specified, will use default");
        window.localStorage["emailAddresses"] = "";
    } else
    {
        var aList = aVal.split(",").map(function(s) { return s.trim()});
        console.log("Addresses " + aList.length + " found");
        var lok = true;
        aList.forEach(function(s) {
            if((s != "") && (s.indexOf('@') == -1))
            {
                alert("Does not look like a valid addesses - " +
                      s + "\nPlease re-enter");
                lok = false;
            }
        });
        
        if(lok)
            window.localStorage["emailAddresses"] = aVal;
    }

    var subjectPrefix = document.getElementById('subject_prefix').value;
    window.localStorage["subjectPrefix"] = subjectPrefix;
    console.log("Saving Subject Prefix - " + subjectPrefix);
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('click', saveOptions);

    loadSavedOptions();
});
