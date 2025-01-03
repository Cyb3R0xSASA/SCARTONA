const title = document.getElementById('productTitle')
const currentImage = document.getElementById('current-image');
const price = document.getElementById('productPrice');
const description = document.getElementById('productDescription')
const images = document.querySelectorAll('.image-collection img');
const size = document.getElementById('size').size;
const sizes = document.querySelectorAll('#size label');
const color = document.getElementById('color').color;
const colors = document.querySelectorAll('#color p')
const quantity = document.getElementById('count');
const add = document.getElementById('add');
const buy = document.getElementById('buy');
const inputSize = document.querySelectorAll('#size input');
const inputColor = document.querySelectorAll('#color input');
const rateStars = document.querySelectorAll('.rate button > i i');

// Rating method
const rateCalc = rate => {
    const stars = parseInt(rate);
    const last = +(rate % 1).toFixed(2) * 100;

    const validStars = Math.min(Math.max(stars, 0), 5); // Ensure no rating exceeds 5 or goes below 0

    rateStars.forEach((star, index) => {
        if (index < validStars) {
            star.style.width = '100%';
        } else {
            star.style.width = '0%'
        }
    });

    // If there's a fractional part, fill the last star partially
    if (validStars < 5) {
        rateStars[stars].style.width = `${last}%`
    }
}

// Get id
let getQueryParam = param => {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}
const productId = getQueryParam('id');

let getData = async () => {
    const res = await fetch('/Data/products.json');
    const data = await res.json();
    const product = data.find((p) => p.id === parseInt(productId));
    return product;
}

let displayProduct = async () => {
    try {
        const product = await getData();
        title.innerText = product['title'];
        currentImage.src = product['image'];
        rateCalc(product['rating']['rate']);
        price.innerText = product['price'];
        description.innerText = product['description'];
    } catch (error) {
        console.log(error);
    }
}
displayProduct()

// Notification method
let clickCount = 0;
let timeout;
const notification = (message, messageColor = '#F0F2F3', messageBackground = '#272343', messageBorderColor = '#D1D1D6', stopReq = 5000) => {
    if (clickCount === 1) return;

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
};

// Clear values
let clear = () => {
    inputSize.forEach((input) => input.checked = false)
    inputColor.forEach((input) => input.checked = false)
    sizes.forEach(el => el.classList.remove('active'));
    colors.forEach(el => el.classList.remove('active'));
    quantity.value = '';
};
window.onload = clear;

// Change photo method
images.forEach(image => {
    image.addEventListener('click', (ev) => {
        currentImage.src = ev.target.src;
    })
});

// Add event listener to each lists
const toggle = (list) => {
    list.forEach(option => {
        option.addEventListener('click', opt => {
            list.forEach(option => option.classList.remove('active'))
            opt.currentTarget.classList.toggle('active')
        })
    });
};
toggle(sizes);
toggle(colors)

// Check Values
const checkValue =  (message='') => {
    const data = {
        size: size.value,
        color: color.value,
        quantity: quantity.value,
    };
    let ensure = []
    let status;
    // delay function
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const processData = async (data, ensure) => {
        let counter = 0;
        for(const el of Object.keys(data)) {
            if (data[el] === '') {
                notification(`Please select a ${el.toUpperCase()}`)
                await delay(3000);
            } else if (el in ensure) { }
            else {
                counter++;
            }
        }
        if (counter === Object.keys(data).length) {
            if(message !== ''){
                notification(message);
            }
            status = true;
        }
    }
    processData(data, ensure)
    return [status, data];

}

[add, buy].forEach(el => {
    el.addEventListener('click', () => {
        let status, data;
        if(el === add){
            [status, data] = checkValue("Successful Adding");
        } else {
            [status, data] = checkValue();
        };
        if(status) {
            console.log(data, productId);
            clear()
        };
    });
})