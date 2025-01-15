const box = document.querySelector('.sign-box')
const title = document.querySelector('title');

let getQueryParam = param => {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}
const page = getQueryParam('id');

const Script = (src) => {
    if(!document.querySelector(`script[src="${src}"]`)){
        const script = document.createElement('script');
        script.src = src;
        script.type = 'module'
        document.body.appendChild(script);
    }
}

const getPage = async () => {
    title.innerHTML = page.toUpperCase()
    const HTMLRes = await fetch(`./${page}/${page}.html`);
    const HTMLData = await HTMLRes.text()
    return HTMLData;
}

const displayData = async () => {
    const JS = `./${page}/${page}.js`;
    const HTML= await getPage();
    box.innerHTML = HTML;
    Script(JS);
}
displayData()

class Main{
    PasswordsToggle(){
        document.querySelectorAll('[id^="showBtn"]').forEach(button => {
            button.addEventListener('click', () => {
                const input = button.previousElementSibling;
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                button.innerHTML = type === 'text'
                    ? `<i class='bx bxs-lock-open-alt'></i>`
                    : `<i class='bx bxs-lock-alt'></i>`;
            });
        });
    };

    validateEmail(email){
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)
    };

    showError(element, errorMessage, originMessage='', area='input', element2=''){
        if(area === 'input'){
            element.placeholder = errorMessage;
            element.setAttribute('aria-invalid', true)
            element.onfocus = () => {
                element.placeholder = originMessage;
                element.setAttribute('aria-invalid', false);
            };
        } else {
            element.textContent = errorMessage;
            if(element2 != ''){
                element2.setAttribute('aria-invalid', true)
                element2.onfocus = () => {
                    element.textContent = '';
                    element2.setAttribute('aria-invalid', false);
                };
            }
        }
    };

}

export {Main}