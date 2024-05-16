document.addEventListener('DOMContentLoaded', function() {
    const coderUrlInput = document.getElementById('coder-url');
    const saveBtn = document.getElementById('save-btn');

    // Загрузка сохраненных настроек
    chrome.storage.sync.get(['coderUrl'], function(data) {
        if (data.coderUrl) {
            coderUrlInput.value = data.coderUrl;
        }
    });

    // Сохранение настроек
    saveBtn.addEventListener('click', function() {
        const coderUrl = coderUrlInput.value;

        chrome.storage.sync.set({ coderUrl }, function() {
            alert('Settings saved!');
        });
    });
});
