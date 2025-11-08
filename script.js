function smoothScroll() {
    const links = document.querySelectorAll('.site-nav a[href^="#"]');
    const navHeight = document.querySelector('.site-nav')?.offsetHeight || 0;

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, '', targetId);
        });
    });
}

function highlightSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    const navHeight = document.querySelector('.site-nav')?.offsetHeight || 0;

    const update = () => {
        const scrollPos = window.scrollY + navHeight + 10;
        let current = null;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
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

function setYear() {
    const span = document.querySelector('.current-year');
    if (span) span.textContent = new Date().getFullYear();
}

window.addEventListener('DOMContentLoaded', () => {
    smoothScroll();
    highlightSection();
    setYear();
});
