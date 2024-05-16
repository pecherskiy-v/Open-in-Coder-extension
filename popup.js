document.getElementById('openCoder').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        var repoUrl = activeTab.url;

        // Загрузка сохраненных настроек
        chrome.storage.sync.get(['coderUrl'], function(data) {
            var coderUrl = data.coderUrl || 'https://your-coder-url.com/open?repo=';
            var fullUrl = coderUrl + encodeURIComponent(repoUrl);
            chrome.tabs.create({ url: fullUrl });
        });
    });
});
