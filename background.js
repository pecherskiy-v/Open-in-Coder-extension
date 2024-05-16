chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ coderUrl: 'https://you.domain/open?repo=' });
    console.log('Default Coder URL set.');
});
