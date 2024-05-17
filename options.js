document.addEventListener('DOMContentLoaded', function () {
    const coderUrlInput = document.getElementById('coder-url');
    const cloneTypeCheckbox = document.getElementById('clone-type');
    const saveBtn = document.getElementById('save-btn');

    // Проверяем, что элементы существуют перед использованием
    if (coderUrlInput && cloneTypeCheckbox && saveBtn) {
        // Загрузка сохраненных настроек
        chrome.storage.sync.get(['coderUrl', 'cloneType'], function (data) {
            if (data.coderUrl) {
                coderUrlInput.value = data.coderUrl;
            }
            if (data.cloneType === 'ssh') {
                cloneTypeCheckbox.checked = true;
            } else {
                cloneTypeCheckbox.checked = false;
            }
        });

        // Сохранение настроек
        saveBtn.addEventListener('click', function () {
            const coderUrl = coderUrlInput.value;
            const cloneType = cloneTypeCheckbox.checked ? 'ssh' : 'https';
            chrome.storage.sync.set({ coderUrl, cloneType }, function () {
                alert('Settings saved!');
            });
        });
    } else {
        console.error('One or more elements not found in the DOM.');
    }
});
