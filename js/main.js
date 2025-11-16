// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    const headerActions = document.querySelector('.header-actions');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            headerActions.classList.toggle('mobile-active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenuToggle && !mobileMenuToggle.contains(event.target) && 
            !nav.contains(event.target) && 
            !headerActions.contains(event.target)) {
            nav.classList.remove('mobile-active');
            headerActions.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Handle form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form type
        const formType = this.closest('.material-form') ? 'material' : 
                        this.closest('.contact-form') ? 'contact' : 
                        this.closest('.subscribe-form') ? 'subscribe' : 'other';
        
        // Basic validation
        const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#f5576c';
            } else {
                input.style.borderColor = '';
            }
            
            // Email validation
            if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                isValid = false;
                input.style.borderColor = '#f5576c';
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.style.cssText = 'background: #48bb78; color: white; padding: 1rem; border-radius: 6px; margin-top: 1rem; text-align: center;';
            
            if (formType === 'material') {
                successMessage.textContent = 'Спасибо! Материал отправлен на вашу почту.';
            } else if (formType === 'contact') {
                successMessage.textContent = 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.';
            } else if (formType === 'subscribe') {
                successMessage.textContent = 'Спасибо за подписку!';
            } else {
                successMessage.textContent = 'Форма успешно отправлена!';
            }
            
            this.appendChild(successMessage);
            this.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
});

