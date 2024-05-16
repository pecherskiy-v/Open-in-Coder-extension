function addCoderButton(coderUrl, gitlabUrl) {
  const isGitHub = window.location.hostname.includes('github.com');
  const isGitLab = window.location.hostname.includes('gitlab.com') || (gitlabUrl && window.location.hostname.includes(new URL(gitlabUrl).hostname));

  if (isGitHub) {
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
          const repoUrl = `https://github.com${filePath}`;
          window.open(`${coderUrl}${encodeURIComponent(repoUrl)}`, '_blank');
        };
        actionBar.appendChild(button);
      }
    });
  } else if (isGitLab) {
    document.querySelectorAll('.file-actions').forEach(actionBar => {
      if (!actionBar.querySelector('.open-in-coder')) {
        const button = document.createElement('button');
        button.className = 'btn btn-default btn-md gl-button btn-icon open-in-coder';
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'tooltip');
        button.setAttribute('data-placement', 'bottom');
        button.setAttribute('aria-label', 'Open this file in Coder');
        button.setAttribute('title', 'Open this file in Coder');
        button.innerHTML = `
          <img src="${chrome.runtime.getURL('icon.png')}" alt="Open in Coder" />
        `;
        button.onclick = () => {
          const filePath = window.location.pathname;
          const repoUrl = `${window.location.origin}${filePath}`;
          window.open(`${coderUrl}${encodeURIComponent(repoUrl)}`, '_blank');
        };
        actionBar.appendChild(button);
      }
    });
  }
}

function initialize() {
  chrome.storage.sync.get(['coderUrl', 'gitlabUrl'], function(data) {
    const coderUrl = data.coderUrl || 'https://you.domain/open?repo=';
    const gitlabUrl = data.gitlabUrl || '';
    addCoderButton(coderUrl, gitlabUrl);
  });

  // Наблюдаем за изменениями в DOM
  const observer = new MutationObserver(() => {
    initialize();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Добавляем кнопку при первой загрузке страницы
initialize();
