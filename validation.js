document.addEventListener('DOMContentLoaded', function() {
    // Safely get form elements with null checks
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('Contact form not found!');
        return;
    }

    // Get input elements with null checks
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Get error message elements with null checks
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Verify all elements exist before proceeding
    if (!nameInput || !phoneInput || !emailInput || !messageInput || 
        !nameError || !phoneError || !emailError || !messageError) {
        console.error('One or more form elements are missing!');
        return;
    }

    // Function to show error message and highlight field
    function showError(inputElement, errorElement, message) {
        if (!inputElement || !errorElement) return;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.style.borderColor = '#ff9f1c';
        inputElement.style.boxShadow = '0 0 5px #9b59b6';
        inputElement.focus();
    }
    
    // Function to clear error message
    function clearError(inputElement, errorElement) {
        if (!inputElement || !errorElement) return;
        errorElement.style.display = 'none';
        inputElement.style.borderColor = '#6a0dad';
        inputElement.style.boxShadow = 'none';
    }
    
    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            showError(nameInput, nameError, 'Please enter your name');
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    }
    
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^\d{10}$/;
        
        if (phoneValue === '') {
            showError(phoneInput, phoneError, 'Please enter your phone number');
            return false;
        }
        
        if (!phoneRegex.test(phoneValue)) {
            showError(phoneInput, phoneError, 'Please enter a valid 10-digit number (no spaces or dashes)');
            return false;
        }
        
        clearError(phoneInput, phoneError);
        return true;
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailInput, emailError, 'Please enter your email address');
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }
        
        clearError(emailInput, emailError);
        return true;
    }
    
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            showError(messageInput, messageError, 'Please enter your message');
            return false;
        }
        clearError(messageInput, messageError);
        return true;
    }
    
    // Event listeners with null checks
    if (nameInput) nameInput.addEventListener('blur', validateName);
    if (phoneInput) phoneInput.addEventListener('blur', validatePhone);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (messageInput) messageInput.addEventListener('blur', validateMessage);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
            alert('Thank you for your message! This is a simulation for the WEBD-1008 project.');
            form.reset();
        }
    });
    
    // Reset button with null check
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            clearError(nameInput, nameError);
            clearError(phoneInput, phoneError);
            clearError(emailInput, emailError);
            clearError(messageInput, messageError);
        });
    }
    
    // Focus styling
    const allInputs = [nameInput, phoneInput, emailInput, messageInput].filter(Boolean);
    allInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.backgroundColor = 'rgba(106, 13, 173, 0.1)';
            this.style.boxShadow = '0 0 10px #9b59b6';
        });
        
        input.addEventListener('blur', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            if (!this.style.borderColor.includes('ff9f1c')) {
                this.style.boxShadow = 'none';
            }
        });
    });
});