document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.bottom-nav .nav-item');
    const pages = document.querySelectorAll('.page');
    const pageTransition = document.querySelector('.page-transition');
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const appContainer = document.querySelector('.app-container');
    
    // Initialize animations
    initAnimations();
    
    // Initialize skill bars animation when skills section is visible
    initSkillBars();
    
    // Project filtering functionality
    initProjectFilters();
    
    // Theme toggle (dark/light mode)
    themeToggle.addEventListener('click', function() {
        appContainer.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', appContainer.classList.contains('dark-mode'));
    });
    
    // Check for saved dark mode preference
    if(localStorage.getItem('darkMode') === 'true') {
        appContainer.classList.add('dark-mode');
    }
    
    // Navigation handling with transition effect
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const currentActive = document.querySelector('.page.active');
            const targetPage = document.querySelector(targetId);
            
            // Don't do anything if clicking the current active page
            if(currentActive === targetPage) return;
            
            // Animate transition
            pageTransition.classList.add('active');
            
            // Update active nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // After a short delay, switch pages and hide transition
            setTimeout(() => {
                // Hide all pages
                pages.forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show the target page
                targetPage.classList.add('active');
                
                // Initialize animations for newly visible page
                initPageAnimations(targetId);
                
                // Hide transition after content has switched
                setTimeout(() => {
                    pageTransition.classList.remove('active');
                    
                    // Scroll to top when changing pages
                    document.querySelector('.app-content').scrollTo(0, 0);
                }, 300);
            }, 300);
        });
    });
    
    // Form submission with animation
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if(!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showFormMessage('Message sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Initialize page animations on first load
    initPageAnimations('#' + document.querySelector('.page.active').id);
    
    // Function to show form submission message
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if(existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Insert before the form
        contactForm.parentNode.insertBefore(messageEl, contactForm);
        
        // Animate message
        messageEl.style.animation = 'fadeIn 0.3s ease forwards';
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            messageEl.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => messageEl.remove(), 300);
        }, 4000);
    }
    
    // Function to initialize page-specific animations
    function initPageAnimations(pageId) {
        // Reset all animations first
        document.querySelectorAll('.fadeIn, .slideIn, .pulse').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });
        
        // Add specific animations based on current page
        if(pageId === '#skills') {
            animateSkillBars();
        }
        
        if(pageId === '#projects') {
            animateProjects();
        }
    }
    
    // Initialize all animations on page load
    function initAnimations() {
        // Add animation classes to elements
        document.querySelector('.greeting-card').classList.add('fadeIn');
        
        document.querySelectorAll('.section-card').forEach((card, index) => {
            card.classList.add('fadeIn');
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });
        
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.classList.add('fadeIn');
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });
        
        document.querySelectorAll('.contact-item').forEach((item, index) => {
            item.classList.add('slideIn');
            item.style.animationDelay = `${0.1 * (index + 1)}s`;
        });
    }
    
    // Initialize skill bars animation
    function initSkillBars() {
        document.querySelectorAll('.skill-item').forEach(item => {
            const percentage = item.getAttribute('data-percentage');
            // Initially set to 0, will be animated when visible
            item.querySelector('.percentage').textContent = '0%';
        });
    }
    
    // Animate skill bars when skills section is visible
    function animateSkillBars() {
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            const percentage = item.getAttribute('data-percentage');
            const percentageEl = item.querySelector('.percentage');
            const skillLevel = item.querySelector('.skill-level');
            
            // Reset to 0 before animating
            percentageEl.textContent = '0%';
            skillLevel.style.width = '0%';
            
            // Delay each skill animation slightly
            setTimeout(() => {
                // Animate the width
                skillLevel.style.width = percentage + '%';
                
                // Animate the percentage text
                let currentValue = 0;
                const duration = 1500; // ms
                const increment = percentage / (duration / 16); // For 60fps
                
                const updateCounter = () => {
                    currentValue += increment;
                    if(currentValue > percentage) {
                        currentValue = percentage;
                        clearInterval(counterInterval);
                    }
                    percentageEl.textContent = Math.round(currentValue) + '%';
                };
                
                const counterInterval = setInterval(updateCounter, 16);
            }, 100 * index);
        });
    }
    
    // Project filtering functionality
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if(filter === 'all' || filter === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Animate projects when projects section is visible
    function animateProjects() {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
});
