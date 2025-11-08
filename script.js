// Smooth scrolling for navigation links
function smoothScroll() {
    const links = document.querySelectorAll('.nav-menu a[href^="#"]');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (!target) return;

            const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, '', targetId);
        });
    });
}

// Highlight active section in navigation
function highlightSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;

    const update = () => {
        const scrollPos = window.scrollY + headerHeight + 100;
        let current = null;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            
            if (scrollPos >= top && scrollPos < bottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', update);
    update();
}

// Set current year in footer
function setYear() {
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialize all functions when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    smoothScroll();
    highlightSection();
    setYear();
});
