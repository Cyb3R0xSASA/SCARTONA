
let clickCount = 0;
let timeout;
const notification = (message, messageColor='#F0F2F3', messageBackground='#272343', messageBorderColor='#D1D1D6', stopReq=4000) => {
    if (clickCount >= 3) return;

    clickCount++;
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `background: ${messageBackground};border-color: ${messageBorderColor};`
    notification.innerHTML = `<p class="message" style='color:${messageColor}'>${message}</p>`;
    document.body.appendChild(notification);

    notification.addEventListener('animationend', () => {
        notification.remove();
        clickCount--;
    });

    clearTimeout(timeout);
    timeout = setTimeout(() => (clickCount = 0), stopReq);
}