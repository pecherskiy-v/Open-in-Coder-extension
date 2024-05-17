const iconBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHQSURBVHgB7ZbxdYIwEMa/9nUANmhG6AZlg9IJpBOUDaQbuIE6gd0AO4HtBNAJsBPYnCRyHAkSn/7H773vGb1c7nIhh8DERBhKq9CqtQ5a5Qif3Mwl7bRmuBBlAh6YQhOwSqzxHuNJTBKcCuepHb+94wJW6O5cMduTViwkKZj/KamQCjyy8Q+6u49MQlaRw38t5h95wHi+tD61/rT2wlahfxzKzNsPrBmUQD5gi9F/Pgg6qjWukACVjB6cJ7TlW6GpSmXGN4MC23svRTvk93qhtTRKxDqp8B3F3BNYakxzSYRPhqaiTpQxcge6RrGx0SdvSrWZr+AnQr+RFTLoAu5yb8Q8u+AO7oos4U5GHmfBFy09i9Vo77ZtJqnxi+E/FlsVHkPaF77gOxNswxbJmD1lC+dmfol+RUq0tyYVtlMzyuBvsZzCk4BEobuh3JPAEWrFM+b8inEvmCEqrTf2/WVoMiVgS0wt8xvXYcvGEc4kYINeKzih2Pjsu4DKTlXY4rIALnI2thuLfAlUCD/3OZrX86/D9ozu/4EP9rtMKgi6s4dA5cZXod+oglHwNytXE8qMn2zBnat+hzAU/O9+S4Xmj4t9+GK0R7JF2LM2MXF7/gEORNF7OYghcwAAAABJRU5ErkJggg==";

function createCoderButton(coderUrl) {
    const button = document.createElement('button');
    button.className = 'btn btn-default btn-md gl-button btn-icon open-in-coder';
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'tooltip');
    button.setAttribute('data-placement', 'bottom');
    button.setAttribute('data-container', 'body');
    button.setAttribute('data-class', 'btn btn-default btn-md gl-button btn-icon');
    button.setAttribute('title', 'Open this file in Coder');
    button.setAttribute('aria-label', 'Open this file in Coder');

    const img = document.createElement('img');
    img.src = iconBase64;
    img.alt = 'Open in Coder';
    img.className = 'gl-icon s16';

    button.appendChild(img);

    button.onclick = () => {
        chrome.storage.sync.get(['cloneType', 'coderUrl'], function (data) {
            const filePath = window.location.pathname;
            let repoUrl;
            if (data.cloneType === 'ssh') {
                repoUrl = document.querySelector('#ssh_project_clone').getAttribute('value');
            } else {
                repoUrl = document.querySelector('#http_project_clone').getAttribute('value');
            }
            const coderLink = `${data.coderUrl}${encodeURIComponent(repoUrl)}`;
            window.open(coderLink, '_blank');
        });
    };

    return button;
}

function addCoderButtonToFileActions(coderUrl) {
    const targetSelector = '#fileHolder > div.js-file-title.file-title-flex-parent > div.gl-display-flex.gl-flex-wrap.file-actions';
    const targetElement = document.querySelector(targetSelector);

    if (targetElement && !targetElement.querySelector('.open-in-coder')) {
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'btn-group ml-2';
        buttonGroup.setAttribute('role', 'group');

        const button = createCoderButton(coderUrl);
        buttonGroup.appendChild(button);

        targetElement.appendChild(buttonGroup);
    }
}

function addCoderButtonToMainFileActions(coderUrl) {
    const targetSelector = '#tree-holder > div.nav-block.gl-display-flex.gl-xs-flex-direction-column.gl-align-items-stretch > div.tree-controls > div.d-block.d-sm-flex.flex-wrap.align-items-start.gl-children-ml-sm-3.gl-first-child-ml-sm-0';
    const targetElement = document.querySelector(targetSelector);

    if (targetElement && !targetElement.querySelector('.open-in-coder')) {
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'btn-group ml-2';
        buttonGroup.setAttribute('role', 'group');

        const button = createCoderButton(coderUrl);
        buttonGroup.appendChild(button);

        targetElement.appendChild(buttonGroup);
    }
}

function addCoderButtonToRepoDetails(coderUrl) {
    const targetSelector = '#repository-details-container > ul';
    const targetElement = document.querySelector(targetSelector);

    if (targetElement && !targetElement.querySelector('.open-in-coder')) {
        const listItem = document.createElement('li');
        const itemGroup = document.createElement('div');
        itemGroup.className = 'float-left';

        const button = document.createElement('button');
        button.className = 'Button--secondary Button--small Button ml-auto open-in-coder';
        button.setAttribute('type', 'button');
        button.setAttribute('title', 'Open this file in Coder');
        button.setAttribute('aria-label', 'Open this file in Coder');

        const img = document.createElement('img');
        img.src = iconBase64;
        img.height = 16;
        img.width = 16;
        img.alt = 'Open in Coder';

        button.appendChild(img);
        itemGroup.appendChild(button);

        button.onclick = () => {
            chrome.storage.sync.get(['cloneType', 'coderUrl'], function (data) {
                const filePath = window.location.pathname;
                let repoUrl;
                if (data.cloneType === 'ssh') {
                    repoUrl = document.querySelector('#ssh_project_clone').getAttribute('value');
                } else {
                    repoUrl = document.querySelector('#http_project_clone').getAttribute('value');
                }
                const coderLink = `${data.coderUrl}${encodeURIComponent(repoUrl)}`;
                window.open(coderLink, '_blank');
            });
        };

        listItem.appendChild(itemGroup);
        targetElement.appendChild(listItem);
    }
}

function initialize() {
    chrome.storage.sync.get(['coderUrl'], function (data) {
        const coderUrl = data.coderUrl || '';
        addCoderButton(coderUrl);

        // Наблюдаем за изменениями в DOM
        const observer = new MutationObserver(() => {
            addCoderButton(coderUrl);
        });
        observer.observe(document.body, {childList: true, subtree: true});
    });
}

function addCoderButton(coderUrl) {
    addCoderButtonToMainFileActions(coderUrl);
    addCoderButtonToFileActions(coderUrl);
    addCoderButtonToRepoDetails(coderUrl);
}

// Добавляем кнопку при первой загрузке страницы
initialize();
