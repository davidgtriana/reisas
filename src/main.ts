let header = document.getElementById("main-header") as HTMLElement;
const scrollThreshold = 50;  // px scrolled before shrinking

window.addEventListener('scroll', () => {
    if (!header) return; // Ensure header exists
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});