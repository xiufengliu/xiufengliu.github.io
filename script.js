document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
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
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 20; // 20px offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add active class style to CSS
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            background-color: var(--secondary-color);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Call highlightNavigation on scroll
    window.addEventListener('scroll', highlightNavigation);
    
    // Initial call to highlightNavigation
    highlightNavigation();
    
    // Publication filter functionality
    const publicationFilterForm = document.getElementById('publication-filter');
    if (publicationFilterForm) {
        publicationFilterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('search-term').value.toLowerCase();
            const publicationItems = document.querySelectorAll('.publication-list li');
            
            publicationItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
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
});