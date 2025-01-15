import { Main } from "../main.js";
const form = document.getElementById('signForm');
const email = form.email;
const password = form.password;
const mainInstance = new Main();

// Autofill Email on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        email.value = savedEmail;
        remember.checked = true;
    }
});

mainInstance.PasswordsToggle()

password.addEventListener('keyup', (e) => {
    if (password.value.length < 8 && password.value.length > 0) {
        mainInstance.showError(password.parentElement.nextElementSibling, `Password must be longer than 8 characters`, '', 'output', password)
    } else {
        password.parentElement.nextElementSibling.innerText = '';
        password.setAttribute('aria-invalid', false);
    }
});

// Form Submission Validation
form.addEventListener('submit', (ev) => {
    let isValid = true;
    
    if (!password.value ||password.value.length < 8) {
        mainInstance.showError(password.parentElement.nextElementSibling, `Password must be longer than 8 characters`, '', 'output', password)
        isValid = false;
    }

    if (!email.value.trim() || !mainInstance.validateEmail(email.value.trim())) {
        email.value = ''
        mainInstance.showError(email, `Please enter a valid email`, `Email`)
        isValid = false;
    }

    // Handle "Remember Me"
    if (isValid && remember.checked) {
        localStorage.setItem('userEmail', email.value.trim());
    } else {
        localStorage.removeItem('userEmail');
    }

    // Test
    if (isValid){
        ev.preventDefault()
        // backend
    }

    if (!isValid) ev.preventDefault();
});
