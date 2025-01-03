// Element Selectors
const header = document.querySelector('header');
const sideBar = header.querySelector('header .side-bar');
const sideBarClose = document.getElementById('closeSide');
const [cartBtn, whiteListBtn, profilesBtn, sideBarOpen] = header.querySelectorAll('header .user-links button');
const [, , whiteListURL, cartURL, ordersURL] = header.querySelectorAll('.side-bar .navigation a');
const [profilesURL, logOut] = header.querySelectorAll('.side-bar .foot a');
const categories = document.getElementById('categories');
const categoriesBtn = document.getElementById('categoriesBtn');
const search = header.querySelector('.search-bar');
const ROUTES = {
    signUp: '/pages/signup/signup.html',
    cart: '/pages/cart/cart.html',
    whiteList: '/pages/whitelist/whitelist.html',
    orders: '/pages/order/orders.html',
    profile: '/pages/profile/profile.html',
};

if (window.scrollY > 50) {
    header.classList.add('scrolled');
};

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

search.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const searchTerm = search.search.value.trim();
    if (searchTerm) {
        window.location.href = `/pages/products?search=${encodeURIComponent(searchTerm)}`;
    }
});

const userSign = false;

const changePage = (userSign, routeIfSignedIn, routeIfNotSignedIn) => {
    const href = userSign ? routeIfSignedIn : routeIfNotSignedIn;
    if (window.location.href !== href) {
        window.location.assign(href);
    }
};

const buttonActions = [
    { element: cartBtn, signedInRoute: ROUTES.cart, notSignedInRoute: ROUTES.signUp },
    { element: whiteListBtn, signedInRoute: ROUTES.whiteList, notSignedInRoute: ROUTES.signUp },
    { element: profilesBtn, signedInRoute: ROUTES.profile, notSignedInRoute: ROUTES.signUp },
];

buttonActions.forEach(({ element, signedInRoute, notSignedInRoute }) => {
    element?.addEventListener('click', () => changePage(userSign, signedInRoute, notSignedInRoute));
});

sideBarOpen?.addEventListener('click', () => sideBar.classList.toggle('open'));
sideBarClose?.addEventListener('click', () => sideBar.classList.toggle('open'));

const linkActions = [
    { element: cartURL, signedInRoute: ROUTES.cart, notSignedInRoute: ROUTES.signUp },
    { element: whiteListURL, signedInRoute: ROUTES.whiteList, notSignedInRoute: ROUTES.signUp },
    { element: ordersURL, signedInRoute: ROUTES.orders, notSignedInRoute: ROUTES.signUp },
];

linkActions.forEach(({ element, signedInRoute, notSignedInRoute }) => {
    element?.addEventListener('click', () => changePage(userSign, signedInRoute, notSignedInRoute));
});

const getCategories = async () => {
    try {
        const res = await fetch('/Data/products.json');
        const data = await res.json();
        const allCategories = data.map(value => value['category']);
        const uniqueCategories = [...new Set(allCategories)];

        const categoriesList = document.querySelector('#categories ul');
        categoriesList.innerHTML = ''; // Clear existing categories if any

        uniqueCategories.forEach(cat => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.setAttribute('id-data', cat.replace(/\s+/g, '-'));
            link.textContent = cat.toUpperCase();
            link.href = `/pages/products?category=${encodeURIComponent(cat)}`;
            listItem.appendChild(link);
            categoriesList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        if (categories) {
            categories.innerHTML = '<p>Failed to load categories. Please try again later.</p>';
        }
    }
};
getCategories()

categoriesBtn?.addEventListener('click', () => categories.classList.toggle('block'));

categories.nextElementSibling.querySelectorAll('ul a').forEach(page => {
    if(window.location.pathname === page.pathname){
        page.classList.add('active');
    }
})

logOut?.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = '/pages/login';
});