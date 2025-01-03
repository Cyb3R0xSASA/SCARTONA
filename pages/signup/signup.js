const form = document.querySelector('form');
const fname = form.fname;
const lname = form.lname;
const email = form.email;
const password1 = form.password1;
const password2 = form.password2;
const remember = form.remember;
const href = 'signup';

// Password toggling logic
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

// Utility function to display error
const showError = (element, errorMessage, originMessage='', area='input', element2='') => {
    if(area === 'input'){
        element.placeholder = errorMessage;
        element.setAttribute('aria-invalid', true)
        element.onfocus = () => {
            element.placeholder = originMessage;
            element.setAttribute('aria-invalid', false);
        };
    } else {
        element.innerHTML = errorMessage;
        if(element2 != ''){
            element2.setAttribute('aria-invalid', true)
            element2.onfocus = () => {
                element.innerHTML = '';
                element2.setAttribute('aria-invalid', false);
            };
        }
        
    }
};

// Validation functions
const validateEmail = email => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);

const validatePassword = password => /^(?=(.*[A-Z]){2})(?=(.*[0-9]))(?=(.*[a-z]){3})(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password);

const passwordsMatch = () => password1.value.trim() === password2.value.trim();

password2.onkeyup = () => {
    if(!passwordsMatch()){
        showError(password2.parentElement.nextElementSibling, `Passwords do not match`, '', 'output');
        password2.setAttribute('aria-invalid', true)
    } else if (password2.value.trim() === '') {
        password2.parentElement.nextElementSibling.innerHTML = '';
        password2.setAttribute('aria-invalid', false)
    }
};

// Form submission
form.addEventListener('submit', (ev) => {
    let isValid = true;

    // Validate first name
    if(fname.value === ''){
        showError(fname, `First name is required`, `First Name`);
        isValid = false;
    }

    // Validate last name
    if (lname.value === '') {
        showError(lname, `Last name is required`, `Last Name`);
        isValid = false;
    }

    // Validate email
    if(!validateEmail(email.value)){
        email.value = '';
        showError(email, `Enter a valid email`, `Email`)
        isValid = false;
    }

    // Validate Password 
    if(!validatePassword(password1.value.trim())){
        showError(password1.parentElement.nextElementSibling, `Password must be at least 8 characters long, include at least 2 uppercase letters, 3 lowercase letters, 1 number, and 1 special character.`, '', 'output', password1)
        isValid = false;
    }

    // Check Passwords Match
    if(!passwordsMatch()){
        showError(password2.parentElement.nextElementSibling, `Passwords do not match`, '', 'output', password2);
        isValid = false;
    }

    // Handle "Remember Me"
    if (isValid && remember.checked) {
        localStorage.setItem('userEmail', email.value);
    } else {
        localStorage.removeItem('userEmail');
    }
    
    // Test 
    if(isValid){
        const user = {
            id: 1,
            fname: fname.value.trim(),
            lname: lname.value.trim(),
            email: email.value.trim(),
            password: password1.value.trim()
        }
        localStorage.setItem('userData', JSON.stringify(user))
    }

    if(!isValid) ev.preventDefault();
})