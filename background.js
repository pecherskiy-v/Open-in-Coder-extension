chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ coderUrl: '', repoUrls: [] });
    console.log('Default settings set.');
});
