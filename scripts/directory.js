// Business Directory Data
const businesses = [
    {
        name: "Main Street Cafe",
        address: "N1 Main St, Freetown, ST 12345",
        phone: "(123) 456-7890",
        website: "https://mainstreetcafe.com",
        image: "images/phone_bussi.png",
        membership: "Gold",
        category: "Restaurant"
    },
    // I will be adding more businesses here ...
];

// DOM Elements
const directoryContainer = document.getElementById('directory');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');

// Display Businesses
function displayBusinesses(businessList) {
    directoryContainer.innerHTML = '';
    
    businessList.forEach(business => {
        const businessCard = document.createElement('div');
        businessCard.className = 'business-card';
        
        businessCard.innerHTML = `
            <img src="${business.image}" alt="${business.name}" loading="lazy">
            <h3>${business.name}</h3>
            <p>${business.address}</p>
            <p>${business.phone}</p>
            <a href="${business.website}" target="_blank">Visit Website</a>
            <div class="membership-badge ${business.membership.toLowerCase()}">${business.membership}</div>
            <p class="category">${business.category}</p>
        `;
        
        directoryContainer.appendChild(businessCard);
    });
}

// Filter Businesses
function filterBusinesses() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filtered = businesses.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchTerm) || 
                             business.category.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || 
                               business.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayBusinesses(filtered);
}

// Event Listeners
gridViewBtn.addEventListener('click', () => {
    directoryContainer.classList.remove('list-view');
    directoryContainer.classList.add('grid-view');
});

listViewBtn.addEventListener('click', () => {
    directoryContainer.classList.remove('grid-view');
    directoryContainer.classList.add('list-view');
});

searchInput.addEventListener('input', filterBusinesses);
categoryFilter.addEventListener('change', filterBusinesses);

// Initial Display
displayBusinesses(businesses);