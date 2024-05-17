const iconBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHQSURBVHgB7ZbxdYIwEMa/9nUANmhG6AZlg9IJpBOUDaQbuIE6gd0AO4HtBNAJsBPYnCRyHAkSn/7H773vGb1c7nIhh8DERBhKq9CqtQ5a5Qif3Mwl7bRmuBBlAh6YQhOwSqzxHuNJTBKcCuepHb+94wJW6O5cMduTViwkKZj/KamQCjyy8Q+6u49MQlaRw38t5h95wHi+tD61/rT2wlahfxzKzNsPrBmUQD5gi9F/Pgg6qjWukACVjB6cJ7TlW6GpSmXGN4MC23svRTvk93qhtTRKxDqp8B3F3BNYakxzSYRPhqaiTpQxcge6RrGx0SdvSrWZr+AnQr+RFTLoAu5yb8Q8u+AO7oos4U5GHmfBFy09i9Vo77ZtJqnxi+E/FlsVHkPaF77gOxNswxbJmD1lC+dmfol+RUq0tyYVtlMzyuBvsZzCk4BEobuh3JPAEWrFM+b8inEvmCEqrTf2/WVoMiVgS0wt8xvXYcvGEc4kYINeKzih2Pjsu4DKTlXY4rIALnI2thuLfAlUCD/3OZrX86/D9ozu/4EP9rtMKgi6s4dA5cZXod+oglHwNytXE8qMn2zBnat+hzAU/O9+S4Xmj4t9+GK0R7JF2LM2MXF7/gEORNF7OYghcwAAAABJRU5ErkJggg==";

function addCoderButton(coderUrl) {
    const targetSelector1 = '#fileHolder > div.js-file-title.file-title-flex-parent > div.gl-display-flex.gl-flex-wrap.file-actions';
    const targetElement1 = document.querySelector(targetSelector1);

    if (targetElement1 && !targetElement1.querySelector('.open-in-coder')) {
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'btn-group ml-2';
        buttonGroup.setAttribute('role', 'group');

        const button1 = document.createElement('button');
        button1.className = 'btn btn-default btn-md gl-button btn-icon open-in-coder';
        button1.setAttribute('type', 'button');
        button1.setAttribute('data-toggle', 'tooltip');
        button1.setAttribute('data-placement', 'bottom');
        button1.setAttribute('data-container', 'body');
        button1.setAttribute('data-class', 'btn btn-default btn-md gl-button btn-icon');
        button1.setAttribute('title', 'Open this file in Coder');
        button1.setAttribute('aria-label', 'Open this file in Coder');

        const img1 = document.createElement('img');
        img1.src = iconBase64;
        img1.alt = 'Open in Coder';
        img1.className = 'gl-icon s16';

        button1.appendChild(img1);
        buttonGroup.appendChild(button1);

        button1.onclick = () => {
            const filePath = window.location.pathname;
            const repoUrl = `${window.location.origin}${filePath}`;
            const coderLink = `${coderUrl}${encodeURIComponent(repoUrl)}`;
            window.open(coderLink, '_blank');
        };

        targetElement1.appendChild(buttonGroup);
    }

    const targetSelector2 = '#repository-details-container > ul';
    const targetElement2 = document.querySelector(targetSelector2);

    if (targetElement2 && !targetElement2.querySelector('.open-in-coder')) {
        // <li>
        //     <div className="float-left">
        //         <!-- '"` --><!-- </textarea></xmp> -->
        //         <form data-turbo="false" action="/pecherskiy-v/Open-in-Coder-extension/profile_pin" accept-charset="UTF-8" method="post"><input type="hidden"
        //                                                                                                                                         name="authenticity_token"
        //                                                                                                                                         value="h-rn6B88FJZsZFWiJgJnMrMq7GBXj1MTjHqSWR7NDtSVTe4vfomREb4yhw3nsTpkosPFi6v9QClXGub6nil_aQ"
        //                                                                                                                                         autoComplete="off">
        //             <button title="Pin this repository to your profile" type="submit" data-view-component="true" className="btn-sm btn">
        //                 <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
        //                      className="octicon octicon-pin mr-2">
        //                     <path
        //                         d="m11.294.984 3.722 3.722a1.75 1.75 0 0 1-.504 2.826l-1.327.613a3.089 3.089 0 0 0-1.707 2.084l-.584 2.454c-.317 1.332-1.972 1.8-2.94.832L5.75 11.311 1.78 15.28a.749.749 0 1 1-1.06-1.06l3.969-3.97-2.204-2.204c-.968-.968-.5-2.623.832-2.94l2.454-.584a3.08 3.08 0 0 0 2.084-1.707l.613-1.327a1.75 1.75 0 0 1 2.826-.504ZM6.283 9.723l2.732 2.731a.25.25 0 0 0 .42-.119l.584-2.454a4.586 4.586 0 0 1 2.537-3.098l1.328-.613a.25.25 0 0 0 .072-.404l-3.722-3.722a.25.25 0 0 0-.404.072l-.613 1.328a4.584 4.584 0 0 1-3.098 2.537l-2.454.584a.25.25 0 0 0-.119.42l2.731 2.732Z"></path>
        //                 </svg>
        //                 Pin
        //             </button></form>
        //     </div>
        // </li>
        const listItem = document.createElement('li');
        const itemGroup = document.createElement('div');
        itemGroup.className = 'float-left';

        const button2 = document.createElement('button');
        button2.className = 'Button--secondary Button--small Button ml-auto open-in-coder';
        button2.setAttribute('type', 'button');
        button2.setAttribute('title', 'Open this file in Coder');
        button2.setAttribute('aria-label', 'Open this file in Coder');

        const img2 = document.createElement('img');
        img2.src = iconBase64;
        img2.height = 16;
        img2.width = 16;
        img2.alt = 'Open in Coder';

        button2.appendChild(img2);
        itemGroup.appendChild(button2);

        button2.onclick = () => {
            const filePath = window.location.pathname;
            const repoUrl = `${window.location.origin}${filePath}`;
            const coderLink = `${coderUrl}${encodeURIComponent(repoUrl)}`;
            window.open(coderLink, '_blank');
        };

        listItem.appendChild(itemGroup)
        targetElement2.appendChild(listItem);
    }
}

function initialize() {
    chrome.storage.sync.get(['coderUrl'], function (data) {
        const coderUrl = data.coderUrl || '';
        addCoderButton(coderUrl);
    });

    // Наблюдаем за изменениями в DOM
    const observer = new MutationObserver(() => {
        observer.disconnect();
        initialize();
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

// Добавляем кнопку при первой загрузке страницы
initialize();
