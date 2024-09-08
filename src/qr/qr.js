let qrcode;

window.addEventListener('message', (event) => {
  if (event.data.type === 'UPDATE_QR') {
    updateQRCode(event.data.url, event.data.title, event.data.favicon);
  }
});

function updateQRCode(url, title, favicon) {
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';
  
  qrcode = new QRCode(qrContainer, {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  
  // 添加favicon作为logo
  if (favicon) {
    addLogo(favicon);
  }
  
  // 更新标题和域名
  document.getElementById('title').textContent = title;
  document.getElementById('domain').textContent = new URL(url).hostname;
}

function addLogo(favicon) {
  const logo = document.createElement('img');
  logo.src = favicon;
  logo.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    padding: 5px;
  `;
  document.getElementById('qrcode').appendChild(logo);
}

document.getElementById('download').addEventListener('click', () => {
  const canvas = document.querySelector('#qrcode canvas');
  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = canvas.toDataURL();
  link.click();
});