document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.bottom-nav .nav-item, .app-nav a');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the target page
            document.querySelector(targetId).classList.add('active');
            
            // Update active nav links
            navLinks.forEach(navLink => {
                if(navLink.getAttribute('href') === targetId) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
            
            // Scroll to top when changing pages
            window.scrollTo(0, 0);
        });
    });
    
    // Form submission (prevent default action)
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if(!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Message sent successfully!');
                
                // Reset form
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
            }, 1500);
        });
    }
    
    // Update time in status bar
    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // Format time to always show two digits
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        document.querySelector('.status-bar .time').textContent = `${hours}:${minutes}`;
    }
    
    // Update time immediately and then every minute
    updateTime();
    setInterval(updateTime, 60000);
    
    // Add mobile app-like touch effects to buttons
    const buttons = document.querySelectorAll('.app-button, .nav-item, .social-link, .view-project');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
});
