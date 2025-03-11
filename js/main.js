/**
 * EduLearn - Professional E-Learning Platform
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScroll();
    initCounterAnimation();
    initFormValidation();
    initNavbarScroll();
    initCoursesToggle();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            // Skip if it's just "#" (like in dropdown toggles)
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    }
}

/**
 * Counter animation for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    const animateCounters = () => {
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                const target = parseInt(counter.innerText.replace(/,/g, '').replace(/\+/g, ''));
                let count = 0;
                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count).toLocaleString() + (counter.innerText.includes('+') ? '+' : '');
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString() + (counter.innerText.includes('+') ? '+' : '');
                    }
                };
                updateCount();
            }
        });
    };
    
    // Run on scroll and on load
    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', animateCounters);
}

/**
 * Form validation for newsletter subscription
 */
function initFormValidation() {
    const newsletterForm = document.querySelector('footer form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                // Show error
                showFormError(emailInput, 'Please enter a valid email address');
            } else {
                // Success - would normally submit to server
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-2';
                successMessage.textContent = 'Thank you for subscribing!';
                
                // Remove any existing alerts
                const existingAlerts = newsletterForm.querySelectorAll('.alert');
                existingAlerts.forEach(alert => alert.remove());
                
                newsletterForm.appendChild(successMessage);
                
                // Reset form
                emailInput.value = '';
                setTimeout(() => {
                    emailInput.classList.remove('is-valid');
                    successMessage.remove();
                }, 3000);
            }
        });
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/**
 * Show form error message
 */
function showFormError(inputElement, message) {
    inputElement.classList.add('is-invalid');
    
    // Create or update error message
    let errorDiv = inputElement.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    }
    
    errorDiv.textContent = message;
}

/**
 * Change navbar background on scroll
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

/**
 * Toggle visibility of additional courses
 */
function initCoursesToggle() {
    const viewAllBtn = document.getElementById('view-all-courses-btn');
    const hiddenCourses = document.querySelectorAll('.hidden-courses');
    
    if (viewAllBtn && hiddenCourses.length > 0) {
        viewAllBtn.addEventListener('click', function() {
            // Check if courses are currently hidden
            const areCoursesHidden = hiddenCourses[0].classList.contains('hidden-courses');
            
            // Toggle visibility of all hidden courses
            hiddenCourses.forEach(course => {
                if (areCoursesHidden) {
                    // Show course
                    course.classList.remove('hidden-courses');
                } else {
                    // Hide course
                    course.classList.add('hidden-courses');
                }
            });
            
            // Update button text
            if (areCoursesHidden) {
                viewAllBtn.textContent = 'Show Less';
            } else {
                viewAllBtn.textContent = 'View All Courses';
                
                // Scroll to courses section
                const coursesSection = document.getElementById('courses');
                if (coursesSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = coursesSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

/**
 * Course search functionality (placeholder for future implementation)
 */
function searchCourses(query) {
    console.log('Searching for:', query);
    // This would typically involve an API call or filtering local data
    // For now, it's just a placeholder
}

/**
 * User authentication functions
 */
const auth = {
    // Check if user is logged in
    isLoggedIn: function() {
        return localStorage.getItem('edulearn_token') !== null;
    },
    
    // Get current user
    getCurrentUser: function() {
        const userStr = localStorage.getItem('edulearn_user');
        return userStr ? JSON.parse(userStr) : null;
    },
    
    // Logout user
    logout: function() {
        localStorage.removeItem('edulearn_token');
        localStorage.removeItem('edulearn_user');
        // Determine the correct path to login.html based on current location
        const path = window.location.pathname.includes('/admin/') || 
                     window.location.pathname.includes('/instructor/') ? 
                     '../login.html' : 'login.html';
        window.location.href = path;
    },
    
    // Register a new user
    register: async function(firstName, lastName, email, password, role) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    role
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            
            // Store token and user data
            localStorage.setItem('edulearn_token', data.token);
            localStorage.setItem('edulearn_user', JSON.stringify(data.user));
            
            // Return the user object
            return data.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
    
    // Login user
    login: async function(email, password) {
        // Special case for admin login
        if (email === 'admin@edulearn.com' && password === 'admin123') {
            // Create a mock admin user
            const adminUser = {
                id: 'admin123',
                name: 'Admin User',
                email: 'admin@edulearn.com',
                role: 'admin'
            };
            
            // Create a mock token
            const mockToken = 'admin-mock-token-' + Date.now();
            
            // Store token and user data
            localStorage.setItem('edulearn_token', mockToken);
            localStorage.setItem('edulearn_user', JSON.stringify(adminUser));
            
            // Return the admin user object
            return adminUser;
        }
        
        // Special case for instructor login
        if (email === 'instructor@edulearn.com' && password === 'instructor123') {
            // Create a mock instructor user
            const instructorUser = {
                id: 'instructor123',
                name: 'Instructor User',
                email: 'instructor@edulearn.com',
                role: 'instructor'
            };
            
            // Create a mock token
            const mockToken = 'instructor-mock-token-' + Date.now();
            
            // Store token and user data
            localStorage.setItem('edulearn_token', mockToken);
            localStorage.setItem('edulearn_user', JSON.stringify(instructorUser));
            
            // Return the instructor user object
            return instructorUser;
        }
        
        // Regular login process for other users
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            // Store token and user data
            localStorage.setItem('edulearn_token', data.token);
            localStorage.setItem('edulearn_user', JSON.stringify(data.user));
            
            // Return the user object
            return data.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    
    // Validate email format
    isValidEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
};

// Add logout functionality to any logout buttons
document.addEventListener('DOMContentLoaded', function() {
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            auth.logout();
        });
    });
});