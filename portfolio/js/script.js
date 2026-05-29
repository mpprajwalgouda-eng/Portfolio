// ==========================================
// PORTFOLIO JAVASCRIPT - VANILLA JS ONLY
// ==========================================

/* ================= CERTIFICATE MODAL ================= */
function openCertModal(imgSrc, title) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
});

document.addEventListener('DOMContentLoaded', () => {

    /* ================= LOADING SCREEN ================= */
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500); // Fakes a loading time of 1.5s to show animation

    // Custom cursor removed for cleaner 3D aesthetic

    /* ================= MOBILE MENU TOGGLE ================= */
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Toggle icon
            const icon = navToggle.querySelector('i');
            if(navMenu.classList.contains('show-menu')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ================= STICKY HEADER ================= */
    const header = document.querySelector('.header');
    
    const scrollHeader = () => {
        if(window.scrollY >= 50) header.classList.add('scroll-header');
        else header.classList.remove('scroll-header');
    }
    window.addEventListener('scroll', scrollHeader);

    /* ================= TYPING ANIMATION ================= */
    const typingText = document.querySelector('.typing');
    const words = ["Software Engineer", "Data Science Enthusiast", "QA Tester", "AI & ML Learner"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect
    if(typingText) setTimeout(typeEffect, 1500);

    /* ================= SCROLL REVEAL (INTERSECTION OBSERVER) ================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains a counter, animate it
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if(current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    
                    // Prevent re-animation
                    counter.classList.remove('counter'); 
                });

                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    /* ================= SCROLL SECTIONS ACTIVE LINK ================= */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // adjust for sticky header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if(navLink) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    /* ================= SHOW SCROLL UP ================= */
    const scrollUp = document.getElementById('scroll-up');
    
    const showScrollUp = () => {
        if(window.scrollY >= 350) scrollUp.classList.add('show-scroll');
        else scrollUp.classList.remove('show-scroll');
    }
    window.addEventListener('scroll', showScrollUp);

    /* ================= SET CURRENT YEAR ================= */
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ================= FORM VALIDATION & TOAST ================= */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const closeToastBtn = document.querySelector('.toast .close');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission

            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const msg = document.getElementById('message').value;

            if(name && email && msg) {
                // Show toast
                toast.classList.add('active');
                
                // Clear form
                contactForm.reset();

                // Hide toast after 5s
                setTimeout(() => {
                    toast.classList.remove('active');
                }, 5000);
            }
        });
    }

    if(closeToastBtn) {
        closeToastBtn.addEventListener('click', () => {
            toast.classList.remove('active');
        });
    }

    /* ================= PROJECT FILTERING (Basic implementation) ================= */
    const filterItems = document.querySelectorAll('.filter-item');
    const projectCards = document.querySelectorAll('.project-card');

    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all
            filterItems.forEach(fi => fi.classList.remove('active'));
            // Add to clicked
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if(filterValue === 'all' || card.classList.contains(filterValue.replace('.', ''))) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // match transition time
                }
            });
        });
    });

    /* ================= VANTA 3D BACKGROUND ================= */
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00d2ff, // Cyan nodes
            backgroundColor: 0x050505, // Deep dark background
            points: 15.00,
            maxDistance: 25.00,
            spacing: 20.00
        });
    }

});
