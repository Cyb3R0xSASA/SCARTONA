import { hideContentShowLoader, showContentHideLoader } from '/components/loaderUtils.js';
const dealBtn = document.getElementById('dealBtn');
dealBtn.onclick = () => {
    window.location.href = '/pages/products'
};

const addPartnerLogos = async () => {
    const companyLogos = document.querySelector('.company-logo .container');
    const res = await fetch('/Data/partners.json')
    const data = await res.json();
    data.forEach(({title, href, 'image-src': imageSrc}) => {
        const link = document.createElement('a');
        link.href = href;
        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = title;
        link.appendChild(image);
        companyLogos.appendChild(link)
    })
};
addPartnerLogos()

const [firstLeftBtn, firstRightBtn, secondLeftBtn, secondRightBtn] = document.querySelectorAll('.arrowBtn');

const card = (id, image, title, price, status=``) => {
    status = status === ``? '': `<span>${status}</span>`;
    const card = `
            <div class="top">
                <img src="${image}" alt="${title}" id-data='${id}'>
                ${status}
                <button type='button' id-data='${id}'><i class="fa-regular fa-heart"><i class="fa-solid fa-heart"></i></i></button>
            </div>
            <div class="bottom fx-cb">
                <div class="content flex-start">
                    <p>${title}</p>
                    <p>$${price}</p>
                </div>
                <button type='button' id-data='${id}'><i class="fa-solid fa-cart-plus"></i></button>
            </div>
            `;
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = card;
    return cardElement;
}

// Fetch method
let getData = async () => {
    const res = await fetch('/Data/products.json');
    const data = await res.json();
    return data
}

const parent = document.createElement('div');
parent.setAttribute('class', 'loader-parent')
parent.innerHTML = `<div class="loader"></div>`; // Add loader HTML
document.body.appendChild(parent);


let displayProducts = async () => {
    hideContentShowLoader();
    try {
        const products = await getData();

        const featureProducts = document.querySelector('.featured-products .products');
        products.forEach(({id, image, title, price, featured}) => {
            if(featured) {
                const cardElement = card(id, image, title, price, 'New', featureProducts)
                featureProducts.appendChild(cardElement);
                const productImage = cardElement.querySelector('.top img');
                productImage.loading = 'lazy';
            }
        });

        const allProduct = document.getElementById('all-products');
        products.forEach(({id, image, title, price, featured}) => {
            featured = featured? 'New': '';
            const cardElement = card(id, image, title, price, featured, featureProducts)
            allProduct.appendChild(cardElement);
            const productImage = cardElement.querySelector('.top img');
            productImage.loading = 'lazy';
        })

        document.addEventListener('click', (event) => {
            if (event.target.matches('.card .top button') || event.target.matches('.top button i')) {
                event.target.closest('button')?.querySelector('i i')?.classList.toggle('fav');
                // Add to white list
            } else if (event.target.matches('.card .bottom button') || event.target.matches('.bottom button i')) {
                let id;
                if (event.target.matches('.card .bottom button')) {
                    id = event.target.getAttribute('id-data');
                } else {
                    id = event.target.parentElement.getAttribute('id-data');
                }
                window.location.href = `/pages/product/product.html?id=${id}`;
            }
        });

        const singleProduct = document.querySelectorAll('.card .top img')
        singleProduct.forEach(el => {
            el.addEventListener('click', id => {
                const proId = id.target.getAttribute('id-data');
                window.location.href = `/pages/product/product.html?id=${proId}`;
            })
        })
    } catch (error) {
        console.error('Error fetching data: ', error)
    } finally {
        showContentHideLoader()
    }
}
displayProducts();

// lazy loading product
// Tall of title then complete with triple dots
// Make fixed size to title area
// Add shadow to heart
// Add padding to top section