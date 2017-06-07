function enableExtension() {
    chrome.browserAction.setIcon({
        path : {
            19 : "img/icon19.png",
            38 : "img/icon38.png",
        }
    });
    chrome.tabs.onUpdated.addListener(sendMessage);
    chrome.webRequest.onBeforeRequest.addListener(
        processRequest,
        {urls: ["<all_urls>"]},
        ["blocking"]
    );
}

function disableExtension() {
    chrome.browserAction.setIcon({
        path : {
            19 : "img/disabled_icon19.png",
            38 : "img/disabled_icon38.png",
        }
    });
    chrome.tabs.onUpdated.removeListener(sendMessage);
    chrome.webRequest.onBeforeRequest.removeListener(processRequest);
    tabIds.clear();

}

function saveSettings(disabled) {
    chrome.storage.local.set({'bright_youtube_disabled': disabled});
}

chrome.browserAction.onClicked.addListener(function() {
    chrome.storage.local.get('bright_youtube_disabled', function(values) {
        var disabled = values.bright_youtube_disabled;

        if (disabled) {
            enableExtension();
        } else {
            disableExtension();
        }

        disabled = !disabled;
        saveSettings(disabled);
    });
});

chrome.storage.local.get('bright_youtube_disabled', function(values) {
    var disabled = values.bright_youtube_disabled;
    if (typeof disabled === "undefined") {
        disabled = false;
        saveSettings(disabled);
    }

    if (disabled) {
        disableExtension();
    } else {
        enableExtension();
    }
});