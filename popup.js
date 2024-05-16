document.getElementById('openCoder').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      var repoUrl = activeTab.url;
  
      var coderUrl = 'https://you.domain/open?repo=' + encodeURIComponent(repoUrl);
      chrome.tabs.create({ url: coderUrl });
    });
  });
  