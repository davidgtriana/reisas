
const scrollThreshold = 50;  // px scrolled before shrinking

window.addEventListener("DOMContentLoaded", loadMainHeader);

async function loadMainHeader() {
    let mainHeaderElement = document.getElementById("main-header-container");

    if (!mainHeaderElement) {
        console.error("Main header element not found.");
        return;
    }
    
    try{
        const res = await fetch("component/main-header.html");
        if (!res.ok) {
            console.error("Failed to load header:", res.status, res.statusText);
            return;
        }
        const html = await res.text();
        mainHeaderElement.innerHTML = html;

         // ====== ADD INDEX CLASS IF ON index.html OR ROOT ======
        const header = mainHeaderElement.querySelector("#main-header")!;
        const path = window.location.pathname.toLowerCase();
        if (path === "/" || path.endsWith("index.html")) {
            header.classList.add("index");
        }
        header.classList.add("unscrolled");

    } catch (error) {
        console.error("Error loading main header:", error);
    }
};

window.addEventListener('scroll', () => {
    let mainHeaderElement = document.getElementById("main-header");
    if (!mainHeaderElement) return;
    if (window.scrollY > scrollThreshold) {
        mainHeaderElement.classList.remove('unscrolled');
    } else {
        mainHeaderElement.classList.add('unscrolled');
    }
});

