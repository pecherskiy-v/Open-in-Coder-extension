document.addEventListener('DOMContentLoaded', function () {
    const cloneTypeCheckbox = document.getElementById('clone-type');
    const openCoderButton = document.getElementById('openCoder');

    // Загрузка сохраненных настроек
    chrome.storage.sync.get(['cloneType'], function (data) {
        if (data.cloneType === 'ssh') {
            cloneTypeCheckbox.checked = true;
        } else {
            cloneTypeCheckbox.checked = false;
        }
    });

    // Автоматическое сохранение типа клонирования при изменении состояния чекбокса
    cloneTypeCheckbox.addEventListener('change', function () {
        const cloneType = cloneTypeCheckbox.checked ? 'ssh' : 'https';
        chrome.storage.sync.set({ cloneType }, function () {
            console.log('Clone type saved:', cloneType);
        });
    });

    // Открытие в Coder при нажатии кнопки "Open in Coder"
    openCoderButton.addEventListener('click', function () {
        chrome.storage.sync.get(['coderUrl'], function (data) {
            const coderUrl = data.coderUrl || '';
            const repoUrl = window.location.href;
            const coderLink = `${coderUrl}${encodeURIComponent(repoUrl)}`;
            window.open(coderLink, '_blank');
        });
    });
});
