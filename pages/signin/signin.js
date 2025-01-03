const form = document.getElementById('signForm');
const email = form.email;
const password = form.password;
const togglePasswordBtn = document.getElementById('showBtn');

// Autofill Email on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        email.value = savedEmail;
        remember.checked = true;
    }
});

// Password toggling logic
togglePasswordBtn.addEventListener('click', () => {
    const type = password.type === 'password' ? 'text': 'password';
    password.type = type;
    togglePasswordBtn.innerHTML = type === 'text'
        ? `<i class='bx bxs-lock-open-alt'></i>`
        : `<i class='bx bxs-lock-alt'></i>`;
});

// Utility function to display error
const showError = (element, errorMessage, originMessage='', area='input', element2) => {
    if(area === 'input'){
        element.placeholder = errorMessage;
        element.setAttribute('aria-invalid', true)
        element.onfocus = () => {
            element.placeholder = originMessage;
            element.setAttribute('aria-invalid', false);
        };
    } else {
        element.innerHTML = errorMessage;
        element2.setAttribute('aria-invalid', true)
        element2.onfocus = () => {
            element.innerHTML = '';
            element2.setAttribute('aria-invalid', false);
        };
    }
};

// Validation functions
const validateEmail = email => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);

password.addEventListener('keyup', (e) => {
    if (password.value.length < 8 && password.value.length > 0) {
        showError(password.parentElement.nextElementSibling, `Password must be longer than 8 characters`, '', 'output', password)
    } else {
        password.parentElement.nextElementSibling.innerText = '';
        password.setAttribute('aria-invalid', false);
    }
});

// Form Submission Validation
form.addEventListener('submit', (ev) => {
    let isValid = true;
    
    if (!password.value ||password.value.length < 8) {
        showError(password.parentElement.nextElementSibling, `Password must be longer than 8 characters`, '', 'output', password)
        isValid = false;
    }

    if (!email.value.trim() || !validateEmail(email.value.trim())) {
        email.value = ''
        showError(email, `Please enter a valid email`, `Email`)
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

const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const remember = form.remember;
const forgetPassword = document.getElementById('forgetPassword');

// Popup Close Logic
overlay.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

forgetPassword.onclick = (ev) => {
    popup.innerHTML = `
    <form method='post' id='form'>
        <input type="text" name="email" placeholder="Email" id="forgetMail">
        <button class="confirm-btn" type='submit'>Reset password</button>
    </form>`;
    const form = document.getElementById('form');
    const email = form.email;

    const savedEmail = localStorage.getItem('userEmail');
    if(savedEmail){
        email.value = savedEmail;
    }

    popup.style.display = 'block';
    overlay.style.display = 'block';
    form.addEventListener('submit', (ev) => {
        if (!validateEmail(email.value.trim())) {
            email.value = ``;
            showError(email, `Please enter a valid email`, `Email`)
            ev.preventDefault();
        }
        else {
            // backend code
        }
    });
};