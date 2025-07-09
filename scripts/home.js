// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Business Spotlights Rotation
    const spotlights = [
        {
            name: "Main Street Cafe",
            description: "Family-owned restaurant serving the community since 1985",
            image: "images/spotlight1.webp",
            phone: "(123) 456-7890"
        },
        // Add more spotlights...
    ];
    
    let currentSpotlight = 0;
    const spotlightContainer = document.querySelector('.spotlight-cards');
    
    function rotateSpotlights() {
        currentSpotlight = (currentSpotlight + 1) % spotlights.length;
        updateSpotlight();
    }
    
    function updateSpotlight() {
        const spotlight = spotlights[currentSpotlight];
        spotlightContainer.innerHTML = `
            <div class="spotlight-card card">
                <h3>Business of the Month</h3>
                <img src="${spotlight.image}" alt="${spotlight.name}" loading="lazy">
                <p>"${spotlight.description}"</p>
                <p class="business-name">${spotlight.name}</p>
                <a href="tel:${spotlight.phone}" class="btn btn-secondary">Call Now</a>
            </div>
        `;
    }
    
    // Rotate every 5 seconds
    updateSpotlight();
    setInterval(rotateSpotlights, 5000);
    
    // Event RSVP handling
    const rsvpButtons = document.querySelectorAll('.event .btn');
    rsvpButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventTitle = this.closest('.event').querySelector('h3').textContent;
            alert(`Thank you for your interest in "${eventTitle}". We'll contact you with more details.`);
        });
    });
});