document.addEventListener('DOMContentLoaded', function() {
    const coderUrlInput = document.getElementById('coder-url');
    const repoUrlInput = document.getElementById('repo-url');
    const addRepoBtn = document.getElementById('add-repo-btn');
    const saveBtn = document.getElementById('save-btn');
    const repoList = document.getElementById('repo-list');

    // Загрузка сохраненных настроек
    chrome.storage.sync.get(['coderUrl', 'repoUrls'], function(data) {
        if (data.coderUrl) {
            coderUrlInput.value = data.coderUrl;
        }
        if (data.repoUrls) {
            data.repoUrls.forEach(url => addRepoToList(url));
        }
    });

    // Сохранение настроек
    saveBtn.addEventListener('click', function() {
        const coderUrl = coderUrlInput.value;
        const repoUrls = Array.from(repoList.querySelectorAll('li')).map(li => li.textContent.trim());

        chrome.storage.sync.set({ coderUrl, repoUrls }, function() {
            alert('Settings saved!');
        });
    });

    // Добавление репозитория в список
    addRepoBtn.addEventListener('click', function() {
        const repoUrl = repoUrlInput.value;
        if (repoUrl) {
            addRepoToList(repoUrl);
            repoUrlInput.value = '';
        }
    });

    function addRepoToList(url) {
        const li = document.createElement('li');
        li.textContent = url;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            li.remove();
        });
        li.appendChild(removeBtn);
        repoList.appendChild(li);
    }
});
