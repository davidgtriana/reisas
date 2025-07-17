
const scrollThreshold = 50;  // px scrolled before shrinking

window.addEventListener("DOMContentLoaded", loadMainHeader);


function getRelativeRoot() {
  const segments = window.location.pathname.split('/').filter(Boolean); 
  const depth = Math.max(0, segments.length - 1);
  return "../".repeat(depth);
}

async function loadMainHeader() {
    let mainHeaderContainer = document.getElementById("main-header-container");
    if (!mainHeaderContainer) {
        console.error("Main header element not found.");
        return;
    }

    try{
        const res = await fetch(getRelativeRoot() + "component/main-header.html");
        if (!res.ok) {
            console.error("Failed to load header:", res.status, res.statusText);
            return;
        }
        mainHeaderContainer.innerHTML = await res.text();
        const header = mainHeaderContainer.querySelector("#main-header");
        const logoLink = header!.querySelector("a.logo")! as HTMLAnchorElement;
        logoLink.href = getRelativeRoot() + "index.html";
        if(getRelativeRoot() === "") {
            header!.classList.add("index");
        }
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

