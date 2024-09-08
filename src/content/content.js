// 创建二维码图标
function createQRIcon() {
  const icon = document.createElement('div');
  icon.id = 'qr-code-icon';
  icon.innerHTML = 'create QR Code';
  icon.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 20px;
    background-color: #007bff;
    color: white;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 9999;
  `;
  document.body.appendChild(icon);
  return icon;
}

// 创建二维码面板
function createQRPanel() {
  const panel = document.createElement('iframe');
  panel.id = 'qr-code-panel';
  panel.src = chrome.runtime.getURL('src/qr/qr.html');
  panel.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 300px;
    height: 400px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    z-index: 9998;
    display: none;
  `;
  document.body.appendChild(panel);
  return panel;
}

// 主函数
function init() {
  const icon = createQRIcon();
  const panel = createQRPanel();
  
  icon.addEventListener('click', () => {
    if (panel.style.display === 'none') {
      panel.style.display = 'block';
      panel.contentWindow.postMessage({
        type: 'UPDATE_QR',
        url: window.location.href,
        title: document.title,
        favicon: getFavicon()
      }, '*');
    } else {
      panel.style.display = 'none';
    }
  });
}

// 获取网站favicon
function getFavicon() {
  const linkEl = document.querySelector("link[rel*='icon']");
  return linkEl ? linkEl.href : '';
}

// 初始化
init();