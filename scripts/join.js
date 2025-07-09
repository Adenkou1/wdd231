// Form Validation
const joinForm = document.getElementById('join-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const businessName = document.getElementById('business-name');
const businessPosition = document.getElementById('business-position');
const membershipLevels = document.querySelectorAll('input[name="membership"]');

joinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Save form data to localStorage
        const formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            businessName: businessName.value,
            businessPosition: businessPosition.value,
            membershipLevel: document.querySelector('input[name="membership"]:checked').value,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('joinFormData', JSON.stringify(formData));
        
        // Redirect to thank you page or show success message
        window.location.href = 'thankyou.html';
    }
});

function validateForm() {
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
    // Validate First Name
    if (!firstName.value.trim()) {
        document.getElementById('first-name-error').textContent = 'First name is required';
        isValid = false;
    }
    
    // Validate Last Name
    if (!lastName.value.trim()) {
        document.getElementById('last-name-error').textContent = 'Last name is required';
        isValid = false;
    }
    
    // Validate Email
    if (!email.value.trim()) {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Validate Phone
    if (!phone.value.trim()) {
        document.getElementById('phone-error').textContent = 'Phone number is required';
        isValid = false;
    } else if (!/^\d{10}$/.test(phone.value.replace(/\D/g, ''))) {
        document.getElementById('phone-error').textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }
    
    // Validate Business Name
    if (!businessName.value.trim()) {
        document.getElementById('business-name-error').textContent = 'Business name is required';
        isValid = false;
    }
    
    // Validate Membership Level
    let membershipSelected = false;
    membershipLevels.forEach(level => {
        if (level.checked) membershipSelected = true;
    });
    
    if (!membershipSelected) {
        document.getElementById('membership-error').textContent = 'Please select a membership level';
        isValid = false;
    }
    
    return isValid;
}

// Phone number formatting
phone.addEventListener('input', function(e) {
    const numbers = this.value.replace(/\D/g, '');
    const char = {0:'(',3:') ',6:' - '};
    this.value = '';
    
    for (let i = 0; i < numbers.length && i < 10; i++) {
        this.value += (char[i] || '') + numbers[i];
    }
});