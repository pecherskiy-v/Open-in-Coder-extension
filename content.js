function addCoderButton(coderUrl, repoUrls) {
  const isSupportedRepo = repoUrls.some(repoUrl => window.location.hostname.includes(new URL(repoUrl).hostname));

  if (isSupportedRepo) {
    document.querySelectorAll('.file-actions').forEach(actionBar => {
      if (!actionBar.querySelector('.open-in-coder')) {
        const button = document.createElement('button');
        button.className = 'btn btn-sm tooltipped tooltipped-n open-in-coder';
        button.innerHTML = `
          <img src="${chrome.runtime.getURL('icon.png')}" alt="Open in Coder" />
          Open in Coder
        `;
        button.onclick = () => {
          const filePath = window.location.pathname;
          const repoUrl = `${window.location.origin}${filePath}`;
          const coderLink = `${coderUrl}${encodeURIComponent(repoUrl)}`;
          window.open(coderLink, '_blank');
        };
        actionBar.appendChild(button);
      }
    });
  }
}

function initialize() {
  chrome.storage.sync.get(['coderUrl', 'repoUrls'], function(data) {
    const coderUrl = data.coderUrl || '';
    const repoUrls = data.repoUrls || [];
    addCoderButton(coderUrl, repoUrls);
  });

  // Наблюдаем за изменениями в DOM
  const observer = new MutationObserver(() => {
    observer.disconnect();
    initialize();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Добавляем кнопку при первой загрузке страницы
initialize();
