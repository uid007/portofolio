// Initialize Lucide Icons
lucide.createIcons();

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Project Gallery Logic
const projectCards = document.querySelectorAll('.project-card.clickable');
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('gallery-img');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');
const counter = document.getElementById('gallery-counter');

let currentProject = '';
let currentImgIndex = 1;
let totalImages = 1;

if (projectCards.length > 0) {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            currentProject = card.dataset.project;
            totalImages = parseInt(card.dataset.count);
            currentImgIndex = 1;
            updateGallery();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
}

const updateGallery = () => {
    if (!modalImg) return;
    const imgPath = `assets/projects/${currentProject}/screenshot_${currentImgIndex}.png`;
    modalImg.src = imgPath;
    counter.textContent = `${currentImgIndex} / ${totalImages}`;
    
    // Hide nav if only one image
    if (totalImages <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
};

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImgIndex = currentImgIndex > 1 ? currentImgIndex - 1 : totalImages;
        updateGallery();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImgIndex = currentImgIndex < totalImages ? currentImgIndex + 1 : 1;
        updateGallery();
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(55, 59, 62, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.textAlign = 'center';
            navLinks.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Contact Form Simulation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.background = '#4BB543';
            btn.style.color = 'white';
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}
