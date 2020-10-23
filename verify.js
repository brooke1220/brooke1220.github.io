document.title = '请立即停止您的行为';

var divElement = document.createElement('div');
document.body.appendChild(divElement);
divElement.style.fontSize = '16px';
divElement.style.position = 'fixed';
divElement.style.top = '10px';
divElement.style.left = '10px';
divElement.style.zIndex = '99999999';
divElement.style.color = '#fff';
divElement.style.background = '#000';
divElement.style.width = '200px';
divElement.style.lineHeight = '100px';
divElement.style.textAlign = 'center';
divElement.innerHTML = '请立即停止您的行为';