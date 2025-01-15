// loaderUtils.js

export const hideContentShowLoader = (parentSelector = '.loader-parent') => {
    // Hide all elements except the loader
    const parent = document.querySelector(parentSelector);
    if (!parent) {
        console.error('Loader parent element not found!');
        return;
    }
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(child => {
        if (!child.classList.contains('loader-parent')) {
            child.style.display = 'none';
        }
    });
    parent.style.display = 'flex'; // Ensure the loader is visible
};

export const showContentHideLoader = (parentSelector = '.loader-parent') => {
    // Show all elements and hide the loader
    const parent = document.querySelector(parentSelector);
    if (!parent) {
        console.error('Loader parent element not found!');
        return;
    }
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(child => {
        if (!child.classList.contains('loader-parent')) {
            child.style.display = ''; // Reset to default
        }
    });
    parent.style.display = 'none'; // Hide the loader
};
