// Tabbed content functionality
function setupTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');

    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tabs-nav button');
        const tabContents = container.querySelectorAll('.tab-content');

        // Set first tab as active by default
        if (tabButtons.length > 0 && tabContents.length > 0) {
            tabButtons[0].classList.add('active');
            tabContents[0].classList.add('active');
        }

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset for the sticky navigation
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNavigation() {
        const scrollPosition = window.scrollY;
        const navHeight = document.querySelector('nav').offsetHeight;

        // First, remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Find the current section and add active class to corresponding link
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 20; // 20px offset for better UX
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const sectionId = currentSection.getAttribute('id');
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                console.log('Active section:', sectionId);
            }
        }
    }

    // Active class is now styled in CSS

    // Call highlightNavigation on scroll
    window.addEventListener('scroll', highlightNavigation);

    // Initial call to highlightNavigation
    highlightNavigation();

    // Generic filter reset function
    function resetFilter(formId, inputId, listClass) {
        const items = document.querySelectorAll('.' + listClass + ' li');
        const searchInput = document.getElementById(inputId);

        if (searchInput) {
            searchInput.value = '';
        }

        items.forEach(item => {
            item.style.display = '';
        });
    }

    // Publication filter functionality - update to handle multiple filters
    const filterForms = document.querySelectorAll('.search-form');
    if (filterForms.length > 0) {
        filterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formId = this.id;
                const searchInput = this.querySelector('input[type="text"]');
                const searchTerm = searchInput.value.toLowerCase();
                const listClass = formId.replace('-filter', '-list');
                const items = document.querySelectorAll('.' + listClass + ' li');

                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Project filter functionality
    const projectFilterSelect = document.getElementById('project-filter');
    if (projectFilterSelect) {
        projectFilterSelect.addEventListener('change', function() {
            const filterValue = this.value;
            const projectItems = document.querySelectorAll('.project-item');

            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = '';
                } else {
                    const projectType = item.getAttribute('data-type');
                    if (projectType === filterValue) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    }

    // Add year to copyright in footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Add mobile navigation toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('nav .container').prepend(navToggle);

    navToggle.addEventListener('click', function() {
        const navUl = document.querySelector('nav ul');
        navUl.classList.toggle('show');
        this.classList.toggle('active');
    });

    // Add mobile navigation styles
    const mobileNavStyle = document.createElement('style');
    mobileNavStyle.textContent = `
        @media (max-width: 768px) {
            nav ul {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            nav ul.show {
                display: flex;
            }

            .nav-toggle {
                display: block;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                position: relative;
                height: 40px;
                width: 40px;
            }

            .nav-toggle span {
                display: block;
                position: absolute;
                height: 3px;
                width: 100%;
                background: white;
                border-radius: 3px;
                opacity: 1;
                left: 0;
                transform: rotate(0deg);
                transition: .25s ease-in-out;
            }

            .nav-toggle span:nth-child(1) {
                top: 10px;
            }

            .nav-toggle span:nth-child(2) {
                top: 20px;
            }

            .nav-toggle span:nth-child(3) {
                top: 30px;
            }

            .nav-toggle.active span:nth-child(1) {
                top: 20px;
                transform: rotate(135deg);
            }

            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
                left: -60px;
            }

            .nav-toggle.active span:nth-child(3) {
                top: 20px;
                transform: rotate(-135deg);
            }
        }

        @media (min-width: 769px) {
            .nav-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(mobileNavStyle);

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Enhance lazy loading with fade-in effect
    const lazyImages = document.querySelectorAll('.lazy-image[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            img.removeAttribute('data-src');
        });
    }

    // Setup tabs
    setupTabs();
});
