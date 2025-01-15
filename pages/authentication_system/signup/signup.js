import  { Main } from "../main.js";
const form = document.getElementById('signbox');
const fname = form.fname;
const lname = form.lname;
const email = form.email;
const password1 = form.password1;
const password2 = form.password2;
const remember = form.remember;
const mainInstance = new Main();


mainInstance.PasswordsToggle();
const validatePassword = password => {
    const regex = /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){3})(?=(?:.*\d){1})(?=(?:.*[!@#$%^&*(),.?":{}|<>]){1}).{8,}$/;
    return regex.test(password);
};

const passwordsMatch = () => password1.value.trim() === password2.value.trim();

password2.onkeyup = () => {
    if (password2.value.trim() === '' || passwordsMatch()) {
        password2.parentElement.nextElementSibling.innerHTML = '';
        password2.setAttribute('aria-invalid', false)
    } else if(!passwordsMatch()){
        mainInstance.showError(password2.parentElement.nextElementSibling, `Passwords do not match`, '', 'output');
        password2.setAttribute('aria-invalid', true)
    }
};

// Form submission
form.addEventListener('submit', (ev) => {
    let isValid = true;

    // Validate first name
    if(fname.value === ''){
        mainInstance.showError(fname, `First name is required`, `First Name`);
        isValid = false;
    }

    // Validate last name
    if (lname.value === '') {
        mainInstance.showError(lname, `Last name is required`, `Last Name`);
        isValid = false;
    }

    // Validate email
    if(!Main.validateEmail(email.value)){
        email.value = '';
        mainInstance.showError(email, `Enter a valid email`, `Email`)
        isValid = false;
    }

    // Validate Password 
    if(!validatePassword(password1.value.trim())){
        console.log(validatePassword(password1.value.trim()));
        mainInstance.showError(password1.parentElement.nextElementSibling, `Password must be at least 8 characters long, include at least 2 uppercase letters, 3 lowercase letters, 1 number, and 1 special character.`, '', 'output', password1)
        isValid = false;
    }

    // Check Passwords Match
    if(!passwordsMatch()){
        mainInstance.showError(password2.parentElement.nextElementSibling, `Passwords do not match`, '', 'output', password2);
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