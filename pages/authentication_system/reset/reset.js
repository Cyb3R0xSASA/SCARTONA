import  { Main } from "../main.js";
const form = document.getElementById('signbox');
const mainInstance = new Main()


form.addEventListener('submit', (ev) => {
    const emailValue = form.email.value.trim();
    
    if(!mainInstance.validateEmail(emailValue) || emailValue === ''){
        form.email.value = '';
        mainInstance.showError(form.email, 'Please enter a valid email', 'Email', 'input')
        ev.preventDefault();
    }
})