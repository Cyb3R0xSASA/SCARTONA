let components = {
    header: {
        htmlPath: "/components/header/header.html",
        style: "/components/header/header.css",
        js: "/components/header/header.js",
        id: "header",
    },
    footer: {
        htmlPath: "/components/footer/footer.html",
        style: "/components/footer/footer.css",
        js: "/components/footer/footer.js",
        id: "footer",
    },
    breadcrumb: {
        htmlPath: "/components/breadcrumb/breadcrumb.html",
        style: "/components/breadcrumb/breadcrumb.css",
        js: "/components/breadcrumb/breadcrumb.js",
        id: "breadcrumb",
    }
}

const addStylesheet = (style) => {
    if (!document.querySelector(`link[href="${style}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = style;
        document.head.appendChild(link);
    }
};

const addScript = (src) => {
    if(!document.querySelector(`script[src="${src}"]`)){
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    }
}

let displayComponent = async (htmlPath, style, id, src) => {
    const res = await fetch(htmlPath);
    const code = await res.text();
    document.getElementById(id).innerHTML = code;
    addStylesheet(style);
    addScript(src)
};

Object.keys(components).forEach(comp => {
    const {htmlPath, style, id, js} = components[comp]
    if(document.getElementById(id)){
        displayComponent(htmlPath, style, id, js);
    }
})

