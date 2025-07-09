// Discover Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Visit tracking
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const daysSinceVisit = document.getElementById('days-since-visit');
    const totalVisits = document.getElementById('total-visits');
    
    if (lastVisit) {
        const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        daysSinceVisit.textContent = days;
        
        // Update total visits
        const visits = parseInt(localStorage.getItem('totalVisits')) || 0;
        localStorage.setItem('totalVisits', visits + 1);
        totalVisits.textContent = visits + 1;
    } else {
        daysSinceVisit.textContent = 0;
        totalVisits.textContent = 1;
        localStorage.setItem('totalVisits', 1);
    }
    
    localStorage.setItem('lastVisit', now);
    
    // Lazy loading for images
    const images = document.querySelectorAll('.image-grid img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            observer.observe(img);
        });
    }
    
    // Image click handler for larger view
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                    <p>${this.nextElementSibling.textContent}</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.close').addEventListener('click', function() {
                modal.remove();
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
});