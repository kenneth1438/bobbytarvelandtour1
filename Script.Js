// Bobby Travel and Tour - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change menu icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            // Reset menu icon
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Active Navigation Link Highlighting
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            // Check if current page matches link
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'bobby-travel-tour/' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Call on page load
    setActiveNavLink();
    
    // Contact Modal Functionality
    const bookNowBtn = document.getElementById('bookNowBtn');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (bookNowBtn && contactModal) {
        // Open modal when "Book Now" button is clicked
        bookNowBtn.addEventListener('click', function() {
            contactModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        // Close modal when X is clicked
        closeModal.addEventListener('click', function() {
            contactModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside of it
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                contactModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.style.display === 'flex') {
                contactModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form Submission Handling
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    
    // Handle booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const destination = document.getElementById('destination').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you, ${name}! Your booking request has been received. We will contact you at ${email} or ${phone} within 24 hours to discuss your trip to ${destination}.`);
            
            // Reset form
            bookingForm.reset();
            
            // Close modal
            if (contactModal) {
                contactModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for your message, ${name}! We have received your inquiry regarding "${subject}" and will respond to you at ${email} within 48 hours.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only apply smooth scrolling for same-page anchor links
            if (targetId !== '#' && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add fade-in animation to elements when they come into view
    function checkFadeIn() {
        const fadeElements = document.querySelectorAll('.fade-in:not(.animated)');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check and add scroll listener
    checkFadeIn();
    window.addEventListener('scroll', checkFadeIn);
    
    // Add current year to footer (if needed)
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});