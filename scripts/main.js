// DOM Elements
const currentDateElement = document.getElementById('current-date');
const currentYearElement = document.getElementById('current-year');
const lastModifiedElement = document.getElementById('last-modified');
const hamburgerBtn = document.getElementById('hamburger-btn');
const primaryNav = document.getElementById('primary-nav');
const banner = document.getElementById('banner');
const closeBanner = document.getElementById('close-banner');

// Current Date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
currentDateElement.textContent = new Date().toLocaleDateString('en-US', options);

// Current Year
currentYearElement.textContent = new Date().getFullYear();

// Last Modified
lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

// Mobile Menu Toggle
hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('show');
    hamburgerBtn.textContent = primaryNav.classList.contains('show') ? '✕' : '☰';
});

// Banner Logic
const today = new Date().getDay();
if (today >= 1 && today <= 3) { // Monday, Tuesday, Wednesday
    banner.style.display = 'block';
}

closeBanner.addEventListener('click', () => {
    banner.style.display = 'none';
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Weather API (will be implemented in weather.js)