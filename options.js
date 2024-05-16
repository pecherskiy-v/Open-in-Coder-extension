document.addEventListener('DOMContentLoaded', function() {
    const coderUrlInput = document.getElementById('coder-url');
    const gitlabUrlInput = document.getElementById('gitlab-url');
    const saveBtn = document.getElementById('save-btn');

    // Загрузка сохраненных настроек
    chrome.storage.sync.get(['coderUrl', 'gitlabUrl'], function(data) {
        if (data.coderUrl) {
            coderUrlInput.value = data.coderUrl;
        }
        if (data.gitlabUrl) {
            gitlabUrlInput.value = data.gitlabUrl;
        }
    });

    // Сохранение настроек
    saveBtn.addEventListener('click', function() {
        const coderUrl = coderUrlInput.value;
        const gitlabUrl = gitlabUrlInput.value;

        chrome.storage.sync.set({ coderUrl, gitlabUrl }, function() {
            alert('Settings saved!');
        });
    });
});
