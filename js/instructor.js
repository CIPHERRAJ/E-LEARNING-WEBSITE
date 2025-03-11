/**
 * EduLearn - Instructor Dashboard JavaScript
 * This file contains all the functionality specific to the instructor dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize instructor dashboard components
    initInstructorAuth();
    initSidebarNavigation();
    initUserDropdown();
    initActionButtons();
    initViewAllButtons();
    initQuickActionButtons();
    initChartFilters();
});

/**
 * Check if user is authenticated as instructor
 */
function initInstructorAuth() {
    const user = JSON.parse(localStorage.getItem('edulearn_user') || '{}');
    if (!user.id || user.role !== 'instructor') {
        // Redirect to login page if not instructor
        window.location.href = '../login.html';
    } else {
        // Update user info in the UI
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        document.querySelector('.user-avatar').textContent = user.name.charAt(0);
    }
}

/**
 * Initialize sidebar navigation
 */
function initSidebarNavigation() {
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Skip for logout button (handled in main.js)
            if (this.classList.contains('logout-btn')) return;
            
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Get the menu item text
            const menuText = this.querySelector('span').textContent.trim();
            
            // Handle navigation based on menu item
            handleNavigation(menuText);
        });
    });
}

/**
 * Handle navigation based on menu item
 */
function handleNavigation(menuItem) {
    // Update page title
    document.querySelector('.content-header h1').textContent = menuItem;
    
    // Show appropriate content based on menu item
    // In a real application, this would load different content sections or make API calls
    
    // For this prototype, we'll just show a notification
    showNotification(`Navigated to ${menuItem}`, 'info');
    
    // Simulate loading content
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show loading spinner
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'text-center my-5';
    loadingSpinner.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading ${menuItem}...</p>
    `;
    mainContent.appendChild(loadingSpinner);
    
    // Simulate content loading after 1 second
    setTimeout(() => {
        // Remove loading spinner
        loadingSpinner.remove();
        
        // Show content sections again
        contentSections.forEach(section => {
            section.style.display = '';
        });
        
        // If Dashboard, show everything
        if (menuItem === 'Dashboard') {
            return;
        }
        
        // Special handling for Create Course
        if (menuItem === 'Create Course') {
            showCreateCourseForm();
            return;
        }
        
        // Special handling for My Courses
        if (menuItem === 'My Courses') {
            showMyCourses();
            return;
        }
        
        // Special handling for Course Content
        if (menuItem === 'Course Content') {
            showCourseContent();
            return;
        }
        
        // Special handling for Assignments
        if (menuItem === 'Assignments') {
            showAssignments();
            return;
        }
        
        // Special handling for Quizzes
        if (menuItem === 'Quizzes') {
            showQuizzes();
            return;
        }
        
        // Special handling for My Students
        if (menuItem === 'My Students') {
            showMyStudents();
            return;
        }
        
        // Special handling for Student Progress
        if (menuItem === 'Student Progress') {
            showStudentProgress();
            return;
        }
        
        // Special handling for Discussions
        if (menuItem === 'Discussions') {
            showDiscussions();
            return;
        }
        
        // Special handling for Earnings
        if (menuItem === 'Earnings') {
            showEarnings();
            return;
        }
        
        // Special handling for Statements
        if (menuItem === 'Statements') {
            showStatements();
            return;
        }
        
        // Special handling for Profile
        if (menuItem === 'Profile') {
            showProfile();
            return;
        }
        
        // Special handling for Notifications
        if (menuItem === 'Notifications') {
            showNotifications();
            return;
        }
        
        // For other sections, show placeholder content
        const placeholderContent = document.createElement('div');
        placeholderContent.className = 'dashboard-card';
        placeholderContent.innerHTML = `
            <h5 class="card-title mb-4">${menuItem}</h5>
            <p>This is a placeholder for the ${menuItem} section. In a real application, this would display ${menuItem.toLowerCase()}-specific content.</p>
            <div class="alert alert-info">
                <i class="fas fa-info-circle me-2"></i>
                This is a prototype. In a production environment, this section would contain real data and functionality.
            </div>
            <button class="btn btn-primary" id="backToDashboard">Back to Dashboard</button>
        `;
        
        mainContent.appendChild(placeholderContent);
        
        // Add event listener to back button
        document.getElementById('backToDashboard').addEventListener('click', function() {
            // Remove placeholder content
            placeholderContent.remove();
            
            // Show all content sections
            contentSections.forEach(section => {
                section.style.display = '';
            });
            
            // Update page title
            document.querySelector('.content-header h1').textContent = 'Instructor Dashboard';
            
            // Update active menu item
            const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
            menuItems.forEach(mi => mi.classList.remove('active'));
            menuItems[0].classList.add('active');
        });
    }, 1000);
}

/**
 * Show Create Course Form
 */
function showCreateCourseForm() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create course form
    const createCourseForm = document.createElement('div');
    createCourseForm.className = 'dashboard-card';
    createCourseForm.innerHTML = `
        <h5 class="card-title mb-4">Create New Course</h5>
        <form id="createCourseForm">
            <div class="row mb-3">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="courseTitle" class="form-label">Course Title</label>
                        <input type="text" class="form-control" id="courseTitle" placeholder="Enter course title" required>
                    </div>
                    <div class="mb-3">
                        <label for="courseCategory" class="form-label">Category</label>
                        <select class="form-select" id="courseCategory" required>
                            <option value="" selected disabled>Select category</option>
                            <option value="web-development">Web Development</option>
                            <option value="data-science">Data Science</option>
                            <option value="business">Business</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="courseDescription" class="form-label">Description</label>
                        <textarea class="form-control" id="courseDescription" rows="3" placeholder="Enter course description" required></textarea>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="courseImage" class="form-label">Course Image</label>
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-image fa-5x text-muted mb-3"></i>
                                <input type="file" class="form-control" id="courseImage">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="coursePrice" class="form-label">Price ($)</label>
                        <input type="number" class="form-control" id="coursePrice" placeholder="0.00" min="0" step="0.01" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="courseDuration" class="form-label">Duration (weeks)</label>
                        <input type="number" class="form-control" id="courseDuration" placeholder="1" min="1" required>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="courseLearningObjectives" class="form-label">Learning Objectives</label>
                <textarea class="form-control" id="courseLearningObjectives" rows="3" placeholder="What will students learn from this course?"></textarea>
                <small class="text-muted">Enter each objective on a new line</small>
            </div>
            
            <div class="mb-3">
                <label for="courseRequirements" class="form-label">Requirements</label>
                <textarea class="form-control" id="courseRequirements" rows="3" placeholder="What prerequisites should students have?"></textarea>
                <small class="text-muted">Enter each requirement on a new line</small>
            </div>
            
            <div class="mb-3">
                <label for="courseStatus" class="form-label">Status</label>
                <select class="form-select" id="courseStatus" required>
                    <option value="draft" selected>Draft</option>
                    <option value="pending">Pending Review</option>
                    <option value="active">Active</option>
                </select>
            </div>
            
            <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" id="cancelCourseBtn">Cancel</button>
                <button type="submit" class="btn btn-primary">Create Course</button>
            </div>
        </form>
    `;
    
    mainContent.appendChild(createCourseForm);
    
    // Add event listener to cancel button
    document.getElementById('cancelCourseBtn').addEventListener('click', function() {
        // Remove form
        createCourseForm.remove();
        
        // Show all content sections
        contentSections.forEach(section => {
            section.style.display = '';
        });
        
        // Update page title
        document.querySelector('.content-header h1').textContent = 'Instructor Dashboard';
        
        // Update active menu item
        const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
        menuItems.forEach(mi => mi.classList.remove('active'));
        menuItems[0].classList.add('active');
    });
    
    // Add event listener to form submission
    document.getElementById('createCourseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, this would save the form data to the server
        // For this prototype, we'll just show a success message
        showNotification('Course created successfully!', 'success');
        
        // Redirect to My Courses
        setTimeout(() => {
            // Remove form
            createCourseForm.remove();
            
            // Show all content sections
            contentSections.forEach(section => {
                section.style.display = '';
            });
            
            // Update page title
            document.querySelector('.content-header h1').textContent = 'My Courses';
            
            // Update active menu item
            const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
            menuItems.forEach(mi => mi.classList.remove('active'));
            // Find "My Courses" menu item and activate it
            menuItems.forEach(mi => {
                if (mi.querySelector('span').textContent.trim() === 'My Courses') {
                    mi.classList.add('active');
                }
            });
            
            // Show My Courses content
            showMyCourses();
        }, 1000);
    });
}

/**
 * Show My Courses
 */
function showMyCourses() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create My Courses content
    const myCoursesContent = document.createElement('div');
    myCoursesContent.className = 'dashboard-card';
    myCoursesContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">My Courses</h5>
            <div>
                <button class="btn btn-primary" id="createNewCourseBtn">
                    <i class="fas fa-plus-circle me-2"></i>Create New Course
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Category</th>
                        <th>Students</th>
                        <th>Rating</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="course-info">
                                <img src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg" alt="Course" class="course-image">
                                <div>
                                    <div class="fw-bold">Complete Web Development Bootcamp</div>
                                    <div class="text-muted small">Last updated: 2 days ago</div>
                                </div>
                            </div>
                        </td>
                        <td>Web Development</td>
                        <td>1,245</td>
                        <td>
                            <div>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star-half-alt text-warning"></i>
                                <span class="ms-1">4.8</span>
                            </div>
                        </td>
                        <td>$89.99</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="course-info">
                                <img src="https://img.freepik.com/free-photo/javascript-programming-code-abstract-technology-background_272306-155.jpg" alt="Course" class="course-image">
                                <div>
                                    <div class="fw-bold">Advanced JavaScript Concepts</div>
                                    <div class="text-muted small">Last updated: 1 week ago</div>
                                </div>
                            </div>
                        </td>
                        <td>JavaScript</td>
                        <td>876</td>
                        <td>
                            <div>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <span class="ms-1">4.9</span>
                            </div>
                        </td>
                        <td>$79.99</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="course-info">
                                <img src="https://img.freepik.com/free-photo/html-system-website-concept_23-2150376770.jpg" alt="Course" class="course-image">
                                <div>
                                    <div class="fw-bold">HTML & CSS Masterclass</div>
                                    <div class="text-muted small">Last updated: 2 weeks ago</div>
                                </div>
                            </div>
                        </td>
                        <td>Web Development</td>
                        <td>543</td>
                        <td>
                            <div>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="far fa-star text-warning"></i>
                                <span class="ms-1">4.0</span>
                            </div>
                        </td>
                        <td>$59.99</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="course-info">
                                <img src="https://img.freepik.com/free-photo/react-native-mobile-application-concept_23-2148473997.jpg" alt="Course" class="course-image">
                                <div>
                                    <div class="fw-bold">React.js for Beginners</div>
                                    <div class="text-muted small">Last updated: 3 weeks ago</div>
                                </div>
                            </div>
                        </td>
                        <td>React</td>
                        <td>321</td>
                        <td>
                            <div>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star-half-alt text-warning"></i>
                                <span class="ms-1">4.5</span>
                            </div>
                        </td>
                        <td>$69.99</td>
                        <td><span class="badge-status badge-draft">Draft</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    mainContent.appendChild(myCoursesContent);
    
    // Add event listener to Create New Course button
    document.getElementById('createNewCourseBtn').addEventListener('click', function() {
        // Remove My Courses content
        myCoursesContent.remove();
        
        // Show Create Course form
        showCreateCourseForm();
        
        // Update page title
        document.querySelector('.content-header h1').textContent = 'Create Course';
        
        // Update active menu item
        const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
        menuItems.forEach(mi => mi.classList.remove('active'));
        // Find "Create Course" menu item and activate it
        menuItems.forEach(mi => {
            if (mi.querySelector('span').textContent.trim() === 'Create Course') {
                mi.classList.add('active');
            }
        });
    });
    
    // Initialize action buttons
    initActionButtons();
}

/**
 * Show Course Content
 */
function showCourseContent() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Course Content
    const courseContentSection = document.createElement('div');
    courseContentSection.className = 'dashboard-card';
    courseContentSection.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Course Content</h5>
            <div>
                <select class="form-select" id="courseSelector">
                    <option value="1" selected>Complete Web Development Bootcamp</option>
                    <option value="2">Advanced JavaScript Concepts</option>
                    <option value="3">HTML & CSS Masterclass</option>
                    <option value="4">React.js for Beginners</option>
                </select>
            </div>
        </div>
        
        <div class="mb-4">
            <button class="btn btn-primary" id="addSectionBtn">
                <i class="fas fa-plus-circle me-2"></i>Add Section
            </button>
            <button class="btn btn-success ms-2" id="addLessonBtn">
                <i class="fas fa-plus-circle me-2"></i>Add Lesson
            </button>
        </div>
        
        <div class="accordion" id="courseContentAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="section1Header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#section1Collapse" aria-expanded="true" aria-controls="section1Collapse">
                        Section 1: Introduction to Web Development
                    </button>
                </h2>
                <div id="section1Collapse" class="accordion-collapse collapse show" aria-labelledby="section1Header">
                    <div class="accordion-body">
                        <div class="list-group">
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-video me-2 text-primary"></i>
                                    <span>1.1 Welcome to the Course</span>
                                    <span class="badge bg-secondary ms-2">5:30</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-file-alt me-2 text-info"></i>
                                    <span>1.2 Course Overview</span>
                                    <span class="badge bg-secondary ms-2">10:15</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-file-code me-2 text-success"></i>
                                    <span>1.3 Setting Up Your Development Environment</span>
                                    <span class="badge bg-secondary ms-2">15:45</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header" id="section2Header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#section2Collapse" aria-expanded="false" aria-controls="section2Collapse">
                        Section 2: HTML Fundamentals
                    </button>
                </h2>
                <div id="section2Collapse" class="accordion-collapse collapse" aria-labelledby="section2Header">
                    <div class="accordion-body">
                        <div class="list-group">
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-video me-2 text-primary"></i>
                                    <span>2.1 Introduction to HTML</span>
                                    <span class="badge bg-secondary ms-2">12:20</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-file-code me-2 text-success"></i>
                                    <span>2.2 HTML Tags and Elements</span>
                                    <span class="badge bg-secondary ms-2">18:45</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-tasks me-2 text-warning"></i>
                                    <span>2.3 HTML Exercise</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header" id="section3Header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#section3Collapse" aria-expanded="false" aria-controls="section3Collapse">
                        Section 3: CSS Styling
                    </button>
                </h2>
                <div id="section3Collapse" class="accordion-collapse collapse" aria-labelledby="section3Header">
                    <div class="accordion-body">
                        <div class="list-group">
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-video me-2 text-primary"></i>
                                    <span>3.1 Introduction to CSS</span>
                                    <span class="badge bg-secondary ms-2">14:30</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-file-code me-2 text-success"></i>
                                    <span>3.2 CSS Selectors</span>
                                    <span class="badge bg-secondary ms-2">16:15</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-file-code me-2 text-success"></i>
                                    <span>3.3 CSS Box Model</span>
                                    <span class="badge bg-secondary ms-2">13:50</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-tasks me-2 text-warning"></i>
                                    <span>3.4 CSS Exercise</span>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(courseContentSection);
    
    // Add event listeners to buttons
    document.getElementById('addSectionBtn').addEventListener('click', function() {
        showAddSectionModal();
    });
    
    document.getElementById('addLessonBtn').addEventListener('click', function() {
        showAddLessonModal();
    });
    
    // Add event listeners to edit and delete buttons
    const editButtons = document.querySelectorAll('.btn-outline-primary');
    const deleteButtons = document.querySelectorAll('.btn-outline-danger');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lessonName = this.closest('.list-group-item').querySelector('span:nth-child(2)').textContent;
            showEditLessonModal(lessonName);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lessonName = this.closest('.list-group-item').querySelector('span:nth-child(2)').textContent;
            if (confirm(`Are you sure you want to delete the lesson: ${lessonName}?`)) {
                this.closest('.list-group-item').remove();
                showNotification('Lesson deleted successfully', 'success');
            }
        });
    });
}

/**
 * Show Add Section Modal
 */
function showAddSectionModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'addSectionModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'addSectionModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addSectionModalLabel">Add New Section</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addSectionForm">
                        <div class="mb-3">
                            <label for="sectionTitle" class="form-label">Section Title</label>
                            <input type="text" class="form-control" id="sectionTitle" placeholder="Enter section title" required>
                        </div>
                        <div class="mb-3">
                            <label for="sectionDescription" class="form-label">Description (Optional)</label>
                            <textarea class="form-control" id="sectionDescription" rows="3" placeholder="Enter section description"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveSectionBtn">Add Section</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to save button
    document.getElementById('saveSectionBtn').addEventListener('click', function() {
        const sectionTitle = document.getElementById('sectionTitle').value.trim();
        
        if (sectionTitle) {
            // In a real app, this would save the section to the server
            // For this prototype, we'll just show a success message
            modalInstance.hide();
            showNotification('Section added successfully', 'success');
            
            // Add the new section to the accordion
            const accordion = document.getElementById('courseContentAccordion');
            const newSectionId = `section${accordion.children.length + 1}`;
            
            const newSection = document.createElement('div');
            newSection.className = 'accordion-item';
            newSection.innerHTML = `
                <h2 class="accordion-header" id="${newSectionId}Header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${newSectionId}Collapse" aria-expanded="false" aria-controls="${newSectionId}Collapse">
                        Section ${accordion.children.length + 1}: ${sectionTitle}
                    </button>
                </h2>
                <div id="${newSectionId}Collapse" class="accordion-collapse collapse" aria-labelledby="${newSectionId}Header">
                    <div class="accordion-body">
                        <div class="list-group">
                            <div class="text-center text-muted py-3">
                                <i class="fas fa-info-circle me-2"></i>
                                No lessons in this section yet. Click "Add Lesson" to add content.
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            accordion.appendChild(newSection);
        } else {
            alert('Please enter a section title');
        }
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Add Lesson Modal
 */
function showAddLessonModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'addLessonModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'addLessonModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    // Get sections for dropdown
    const sections = [];
    document.querySelectorAll('.accordion-button').forEach((button, index) => {
        sections.push({
            id: index + 1,
            title: button.textContent.trim()
        });
    });
    
    const sectionOptions = sections.map(section => 
        `<option value="${section.id}">${section.title}</option>`
    ).join('');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addLessonModalLabel">Add New Lesson</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addLessonForm">
                        <div class="mb-3">
                            <label for="lessonSection" class="form-label">Section</label>
                            <select class="form-select" id="lessonSection" required>
                                ${sectionOptions}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="lessonTitle" class="form-label">Lesson Title</label>
                            <input type="text" class="form-control" id="lessonTitle" placeholder="Enter lesson title" required>
                        </div>
                        <div class="mb-3">
                            <label for="lessonType" class="form-label">Lesson Type</label>
                            <select class="form-select" id="lessonType" required>
                                <option value="video">Video</option>
                                <option value="text">Text/Article</option>
                                <option value="code">Code Example</option>
                                <option value="quiz">Quiz</option>
                                <option value="assignment">Assignment</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="lessonContent" class="form-label">Content</label>
                            <textarea class="form-control" id="lessonContent" rows="5" placeholder="Enter lesson content or description"></textarea>
                        </div>
                        <div class="mb-3" id="videoUploadContainer">
                            <label for="lessonVideo" class="form-label">Video Upload</label>
                            <input type="file" class="form-control" id="lessonVideo" accept="video/*">
                        </div>
                        <div class="mb-3">
                            <label for="lessonDuration" class="form-label">Duration (minutes)</label>
                            <input type="number" class="form-control" id="lessonDuration" min="1" placeholder="Enter duration in minutes">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveLessonBtn">Add Lesson</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Show/hide video upload based on lesson type
    document.getElementById('lessonType').addEventListener('change', function() {
        const videoUploadContainer = document.getElementById('videoUploadContainer');
        if (this.value === 'video') {
            videoUploadContainer.style.display = 'block';
        } else {
            videoUploadContainer.style.display = 'none';
        }
    });
    
    // Add event listener to save button
    document.getElementById('saveLessonBtn').addEventListener('click', function() {
        const lessonTitle = document.getElementById('lessonTitle').value.trim();
        const lessonSection = document.getElementById('lessonSection').value;
        const lessonType = document.getElementById('lessonType').value;
        const lessonDuration = document.getElementById('lessonDuration').value || '0';
        
        if (lessonTitle && lessonSection) {
            // In a real app, this would save the lesson to the server
            // For this prototype, we'll just show a success message
            modalInstance.hide();
            showNotification('Lesson added successfully', 'success');
            
            // Add the new lesson to the appropriate section
            const sectionCollapse = document.getElementById(`section${lessonSection}Collapse`);
            const lessonList = sectionCollapse.querySelector('.list-group');
            
            // Remove "no lessons" message if it exists
            const noLessonsMessage = lessonList.querySelector('.text-muted');
            if (noLessonsMessage) {
                noLessonsMessage.remove();
            }
            
            // Determine icon based on lesson type
            let icon;
            switch (lessonType) {
                case 'video':
                    icon = '<i class="fas fa-video me-2 text-primary"></i>';
                    break;
                case 'text':
                    icon = '<i class="fas fa-file-alt me-2 text-info"></i>';
                    break;
                case 'code':
                    icon = '<i class="fas fa-file-code me-2 text-success"></i>';
                    break;
                case 'quiz':
                    icon = '<i class="fas fa-question-circle me-2 text-warning"></i>';
                    break;
                case 'assignment':
                    icon = '<i class="fas fa-tasks me-2 text-warning"></i>';
                    break;
                default:
                    icon = '<i class="fas fa-file me-2"></i>';
            }
            
            const newLesson = document.createElement('div');
            newLesson.className = 'list-group-item d-flex justify-content-between align-items-center';
            newLesson.innerHTML = `
                <div>
                    ${icon}
                    <span>${lessonTitle}</span>
                    ${lessonDuration > 0 ? `<span class="badge bg-secondary ms-2">${lessonDuration}:00</span>` : ''}
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            `;
            
            lessonList.appendChild(newLesson);
            
            // Add event listeners to the new buttons
            newLesson.querySelector('.btn-outline-primary').addEventListener('click', function() {
                showEditLessonModal(lessonTitle);
            });
            
            newLesson.querySelector('.btn-outline-danger').addEventListener('click', function() {
                if (confirm(`Are you sure you want to delete the lesson: ${lessonTitle}?`)) {
                    newLesson.remove();
                    showNotification('Lesson deleted successfully', 'success');
                }
            });
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Edit Lesson Modal
 */
function showEditLessonModal(lessonName) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'editLessonModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'editLessonModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    // Get sections for dropdown
    const sections = [];
    document.querySelectorAll('.accordion-button').forEach((button, index) => {
        sections.push({
            id: index + 1,
            title: button.textContent.trim()
        });
    });
    
    const sectionOptions = sections.map(section => 
        `<option value="${section.id}">${section.title}</option>`
    ).join('');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editLessonModalLabel">Edit Lesson: ${lessonName}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editLessonForm">
                        <div class="mb-3">
                            <label for="editLessonSection" class="form-label">Section</label>
                            <select class="form-select" id="editLessonSection" required>
                                ${sectionOptions}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editLessonTitle" class="form-label">Lesson Title</label>
                            <input type="text" class="form-control" id="editLessonTitle" value="${lessonName}" required>
                        </div>
                        <div class="mb-3">
                            <label for="editLessonType" class="form-label">Lesson Type</label>
                            <select class="form-select" id="editLessonType" required>
                                <option value="video" selected>Video</option>
                                <option value="text">Text/Article</option>
                                <option value="code">Code Example</option>
                                <option value="quiz">Quiz</option>
                                <option value="assignment">Assignment</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editLessonContent" class="form-label">Content</label>
                            <textarea class="form-control" id="editLessonContent" rows="5" placeholder="Enter lesson content or description">This is a sample lesson content for ${lessonName}.</textarea>
                        </div>
                        <div class="mb-3" id="editVideoUploadContainer">
                            <label for="editLessonVideo" class="form-label">Video Upload</label>
                            <div class="d-flex align-items-center">
                                <div class="me-3">
                                    <span class="text-muted">Current video: lesson-video.mp4</span>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-sm btn-outline-primary">Replace</button>
                                </div>
                            </div>
                            <input type="file" class="form-control mt-2 d-none" id="editLessonVideo" accept="video/*">
                        </div>
                        <div class="mb-3">
                            <label for="editLessonDuration" class="form-label">Duration (minutes)</label>
                            <input type="number" class="form-control" id="editLessonDuration" min="1" value="15">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="updateLessonBtn">Update Lesson</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Show/hide video upload based on lesson type
    document.getElementById('editLessonType').addEventListener('change', function() {
        const videoUploadContainer = document.getElementById('editVideoUploadContainer');
        if (this.value === 'video') {
            videoUploadContainer.style.display = 'block';
        } else {
            videoUploadContainer.style.display = 'none';
        }
    });
    
    // Add event listener to replace button
    modal.querySelector('.btn-outline-primary').addEventListener('click', function() {
        document.getElementById('editLessonVideo').classList.remove('d-none');
        this.closest('.d-flex').classList.add('d-none');
    });
    
    // Add event listener to update button
    document.getElementById('updateLessonBtn').addEventListener('click', function() {
        // In a real app, this would update the lesson on the server
        // For this prototype, we'll just show a success message
        modalInstance.hide();
        showNotification('Lesson updated successfully', 'success');
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Assignments
 */
function showAssignments() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Assignments content
    const assignmentsContent = document.createElement('div');
    assignmentsContent.className = 'dashboard-card';
    assignmentsContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Assignments</h5>
            <div>
                <button class="btn btn-primary" id="createAssignmentBtn">
                    <i class="fas fa-plus-circle me-2"></i>Create Assignment
                </button>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Course</th>
                        <th>Due Date</th>
                        <th>Submissions</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="fw-bold">Build a Responsive Website</div>
                            <div class="text-muted small">Created: May 10, 2023</div>
                        </td>
                        <td>Complete Web Development Bootcamp</td>
                        <td>May 25, 2023</td>
                        <td>245/1,245</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="fw-bold">JavaScript DOM Manipulation Project</div>
                            <div class="text-muted small">Created: May 12, 2023</div>
                        </td>
                        <td>Advanced JavaScript Concepts</td>
                        <td>May 28, 2023</td>
                        <td>156/876</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="fw-bold">CSS Layout Challenge</div>
                            <div class="text-muted small">Created: May 5, 2023</div>
                        </td>
                        <td>HTML & CSS Masterclass</td>
                        <td>May 20, 2023</td>
                        <td>412/543</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="fw-bold">React Component Library</div>
                            <div class="text-muted small">Created: May 15, 2023</div>
                        </td>
                        <td>React.js for Beginners</td>
                        <td>May 30, 2023</td>
                        <td>0/321</td>
                        <td><span class="badge-status badge-draft">Draft</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    mainContent.appendChild(assignmentsContent);
    
    // Add event listener to Create Assignment button
    document.getElementById('createAssignmentBtn').addEventListener('click', function() {
        showCreateAssignmentModal();
    });
    
    // Initialize action buttons
    initActionButtons();
}

/**
 * Show Create Assignment Modal
 */
function showCreateAssignmentModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'createAssignmentModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'createAssignmentModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createAssignmentModalLabel">Create New Assignment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="createAssignmentForm">
                        <div class="mb-3">
                            <label for="assignmentTitle" class="form-label">Assignment Title</label>
                            <input type="text" class="form-control" id="assignmentTitle" placeholder="Enter assignment title" required>
                        </div>
                        <div class="mb-3">
                            <label for="assignmentCourse" class="form-label">Course</label>
                            <select class="form-select" id="assignmentCourse" required>
                                <option value="" selected disabled>Select course</option>
                                <option value="1">Complete Web Development Bootcamp</option>
                                <option value="2">Advanced JavaScript Concepts</option>
                                <option value="3">HTML & CSS Masterclass</option>
                                <option value="4">React.js for Beginners</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="assignmentDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="assignmentDescription" rows="5" placeholder="Enter assignment description" required></textarea>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="assignmentDueDate" class="form-label">Due Date</label>
                                <input type="date" class="form-control" id="assignmentDueDate" required>
                            </div>
                            <div class="col-md-6">
                                <label for="assignmentPoints" class="form-label">Points</label>
                                <input type="number" class="form-control" id="assignmentPoints" placeholder="100" min="1" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="assignmentInstructions" class="form-label">Instructions</label>
                            <textarea class="form-control" id="assignmentInstructions" rows="5" placeholder="Enter detailed instructions for students" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="assignmentAttachments" class="form-label">Attachments (Optional)</label>
                            <input type="file" class="form-control" id="assignmentAttachments" multiple>
                        </div>
                        <div class="mb-3">
                            <label for="assignmentStatus" class="form-label">Status</label>
                            <select class="form-select" id="assignmentStatus" required>
                                <option value="draft" selected>Draft</option>
                                <option value="active">Active</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveAssignmentBtn">Create Assignment</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to save button
    document.getElementById('saveAssignmentBtn').addEventListener('click', function() {
        const assignmentTitle = document.getElementById('assignmentTitle').value.trim();
        const assignmentCourse = document.getElementById('assignmentCourse').value;
        
        if (assignmentTitle && assignmentCourse) {
            // In a real app, this would save the assignment to the server
            // For this prototype, we'll just show a success message
            modalInstance.hide();
            showNotification('Assignment created successfully', 'success');
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Quizzes
 */
function showQuizzes() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Quizzes content
    const quizzesContent = document.createElement('div');
    quizzesContent.className = 'dashboard-card';
    quizzesContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Quizzes</h5>
            <div>
                <button class="btn btn-primary" id="createQuizBtn">
                    <i class="fas fa-plus-circle me-2"></i>Create Quiz
                </button>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Course</th>
                        <th>Questions</th>
                        <th>Time Limit</th>
                        <th>Attempts</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="fw-bold">HTML Basics Quiz</div>
                            <div class="text-muted small">Created: May 8, 2023</div>
                        </td>
                        <td>HTML & CSS Masterclass</td>
                        <td>15</td>
                        <td>20 min</td>
                        <td>432/543</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="fw-bold">JavaScript Fundamentals Quiz</div>
                            <div class="text-muted small">Created: May 10, 2023</div>
                        </td>
                        <td>Advanced JavaScript Concepts</td>
                        <td>20</td>
                        <td>30 min</td>
                        <td>654/876</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="fw-bold">CSS Layout Quiz</div>
                            <div class="text-muted small">Created: May 12, 2023</div>
                        </td>
                        <td>HTML & CSS Masterclass</td>
                        <td>10</td>
                        <td>15 min</td>
                        <td>321/543</td>
                        <td><span class="badge-status badge-active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="fw-bold">React Hooks Quiz</div>
                            <div class="text-muted small">Created: May 15, 2023</div>
                        </td>
                        <td>React.js for Beginners</td>
                        <td>12</td>
                        <td>20 min</td>
                        <td>0/321</td>
                        <td><span class="badge-status badge-draft">Draft</span></td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="action-button edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <div class="action-button delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    mainContent.appendChild(quizzesContent);
    
    // Add event listener to Create Quiz button
    document.getElementById('createQuizBtn').addEventListener('click', function() {
        showCreateQuizModal();
    });
    
    // Initialize action buttons
    initActionButtons();
}

/**
 * Show Create Quiz Modal
 */
function showCreateQuizModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'createQuizModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'createQuizModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createQuizModalLabel">Create New Quiz</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="createQuizForm">
                        <div class="mb-3">
                            <label for="quizTitle" class="form-label">Quiz Title</label>
                            <input type="text" class="form-control" id="quizTitle" placeholder="Enter quiz title" required>
                        </div>
                        <div class="mb-3">
                            <label for="quizCourse" class="form-label">Course</label>
                            <select class="form-select" id="quizCourse" required>
                                <option value="" selected disabled>Select course</option>
                                <option value="1">Complete Web Development Bootcamp</option>
                                <option value="2">Advanced JavaScript Concepts</option>
                                <option value="3">HTML & CSS Masterclass</option>
                                <option value="4">React.js for Beginners</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="quizDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="quizDescription" rows="3" placeholder="Enter quiz description" required></textarea>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="quizTimeLimit" class="form-label">Time Limit (minutes)</label>
                                <input type="number" class="form-control" id="quizTimeLimit" placeholder="15" min="1" required>
                            </div>
                            <div class="col-md-4">
                                <label for="quizPassingScore" class="form-label">Passing Score (%)</label>
                                <input type="number" class="form-control" id="quizPassingScore" placeholder="70" min="1" max="100" required>
                            </div>
                            <div class="col-md-4">
                                <label for="quizAttempts" class="form-label">Max Attempts</label>
                                <input type="number" class="form-control" id="quizAttempts" placeholder="3" min="1" required>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Questions</label>
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <label for="question1" class="form-label">Question 1</label>
                                        <input type="text" class="form-control" id="question1" placeholder="Enter question" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Answer Type</label>
                                        <select class="form-select answer-type" required>
                                            <option value="multiple-choice" selected>Multiple Choice</option>
                                            <option value="true-false">True/False</option>
                                            <option value="short-answer">Short Answer</option>
                                        </select>
                                    </div>
                                    <div class="answer-options">
                                        <div class="mb-2">
                                            <div class="input-group">
                                                <div class="input-group-text">
                                                    <input type="radio" name="correctAnswer1" checked>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Option 1" required>
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <div class="input-group">
                                                <div class="input-group-text">
                                                    <input type="radio" name="correctAnswer1">
                                                </div>
                                                <input type="text" class="form-control" placeholder="Option 2" required>
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <div class="input-group">
                                                <div class="input-group-text">
                                                    <input type="radio" name="correctAnswer1">
                                                </div>
                                                <input type="text" class="form-control" placeholder="Option 3" required>
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <div class="input-group">
                                                <div class="input-group-text">
                                                    <input type="radio" name="correctAnswer1">
                                                </div>
                                                <input type="text" class="form-control" placeholder="Option 4" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button type="button" class="btn btn-outline-primary" id="addQuestionBtn">
                                <i class="fas fa-plus-circle me-2"></i>Add Question
                            </button>
                        </div>
                        
                        <div class="mb-3">
                            <label for="quizStatus" class="form-label">Status</label>
                            <select class="form-select" id="quizStatus" required>
                                <option value="draft" selected>Draft</option>
                                <option value="active">Active</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveQuizBtn">Create Quiz</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to save button
    document.getElementById('saveQuizBtn').addEventListener('click', function() {
        const quizTitle = document.getElementById('quizTitle').value.trim();
        const quizCourse = document.getElementById('quizCourse').value;
        
        if (quizTitle && quizCourse) {
            // In a real app, this would save the quiz to the server
            // For this prototype, we'll just show a success message
            modalInstance.hide();
            showNotification('Quiz created successfully', 'success');
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show My Students
 */
function showMyStudents() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create My Students content
    const myStudentsContent = document.createElement('div');
    myStudentsContent.className = 'dashboard-card';
    myStudentsContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">My Students</h5>
            <div>
                <input type="text" class="form-control" placeholder="Search students..." id="studentSearchInput">
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Enrolled Courses</th>
                        <th>Enrollment Date</th>
                        <th>Progress</th>
                        <th>Last Activity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Jennifer Wilson</div>
                                    <div class="text-muted small">jennifer.w@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>3</td>
                        <td>May 12, 2023</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">75% Complete</div>
                        </td>
                        <td>2 hours ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Profile">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Robert Johnson</div>
                                    <div class="text-muted small">robert.j@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>2</td>
                        <td>May 15, 2023</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">45% Complete</div>
                        </td>
                        <td>1 day ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Profile">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Amanda Lee</div>
                                    <div class="text-muted small">amanda.l@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>1</td>
                        <td>May 18, 2023</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">90% Complete</div>
                        </td>
                        <td>3 hours ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Profile">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Michael Chen</div>
                                    <div class="text-muted small">michael.c@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>4</td>
                        <td>May 10, 2023</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 60%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">60% Complete</div>
                        </td>
                        <td>5 hours ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Profile">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    mainContent.appendChild(myStudentsContent);
    
    // Add event listener to search input
    document.getElementById('studentSearchInput').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.dashboard-table tbody tr');
        
        rows.forEach(row => {
            const studentName = row.querySelector('.student-info .fw-bold').textContent.toLowerCase();
            const studentEmail = row.querySelector('.student-info .text-muted').textContent.toLowerCase();
            
            if (studentName.includes(searchTerm) || studentEmail.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Initialize action buttons
    initActionButtons();
}

/**
 * Show Student Progress
 */
function showStudentProgress() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Student Progress content
    const studentProgressContent = document.createElement('div');
    studentProgressContent.className = 'dashboard-card';
    studentProgressContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Student Progress</h5>
            <div class="d-flex">
                <select class="form-select me-2" id="courseFilter">
                    <option value="all" selected>All Courses</option>
                    <option value="1">Complete Web Development Bootcamp</option>
                    <option value="2">Advanced JavaScript Concepts</option>
                    <option value="3">HTML & CSS Masterclass</option>
                    <option value="4">React.js for Beginners</option>
                </select>
                <button class="btn btn-primary" id="exportProgressBtn">
                    <i class="fas fa-download me-2"></i>Export
                </button>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Progress</th>
                        <th>Assignments</th>
                        <th>Quizzes</th>
                        <th>Last Activity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Jennifer Wilson</div>
                                    <div class="text-muted small">jennifer.w@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>Complete Web Development Bootcamp</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">75% Complete</div>
                        </td>
                        <td>8/10</td>
                        <td>12/15</td>
                        <td>2 hours ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Details">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Robert Johnson</div>
                                    <div class="text-muted small">robert.j@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>Advanced JavaScript Concepts</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">45% Complete</div>
                        </td>
                        <td>5/10</td>
                        <td>8/20</td>
                        <td>1 day ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Details">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Amanda Lee</div>
                                    <div class="text-muted small">amanda.l@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>HTML & CSS Masterclass</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">90% Complete</div>
                        </td>
                        <td>9/10</td>
                        <td>14/15</td>
                        <td>3 hours ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Details">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="student-info">
                                <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Student" class="student-avatar">
                                <div>
                                    <div class="fw-bold">Michael Chen</div>
                                    <div class="text-muted small">michael.c@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td>React.js for Beginners</td>
                        <td>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 60%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="text-muted small mt-1">60% Complete</div>
                        </td>
                        <td>6/10</td>
                        <td>7/12</td>
                        <td>5 hours ago</td>
                        <td>
                            <div class="action-buttons">
                                <div class="action-button view" title="View Details">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="action-button edit" title="Message">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    mainContent.appendChild(studentProgressContent);
    
    // Add event listener to course filter
    document.getElementById('courseFilter').addEventListener('change', function() {
        const selectedCourse = this.value;
        const rows = document.querySelectorAll('.dashboard-table tbody tr');
        
        if (selectedCourse === 'all') {
            rows.forEach(row => {
                row.style.display = '';
            });
        } else {
            rows.forEach(row => {
                const courseName = row.querySelector('td:nth-child(2)').textContent;
                
                if (
                    (selectedCourse === '1' && courseName === 'Complete Web Development Bootcamp') ||
                    (selectedCourse === '2' && courseName === 'Advanced JavaScript Concepts') ||
                    (selectedCourse === '3' && courseName === 'HTML & CSS Masterclass') ||
                    (selectedCourse === '4' && courseName === 'React.js for Beginners')
                ) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    });
    
    // Add event listener to export button
    document.getElementById('exportProgressBtn').addEventListener('click', function() {
        showNotification('Progress report exported successfully', 'success');
    });
    
    // Initialize action buttons
    initActionButtons();
}

/**
 * Show Discussions
 */
function showDiscussions() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Discussions content
    const discussionsContent = document.createElement('div');
    discussionsContent.className = 'dashboard-card';
    discussionsContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Discussions</h5>
            <div>
                <select class="form-select" id="discussionFilter">
                    <option value="all" selected>All Courses</option>
                    <option value="1">Complete Web Development Bootcamp</option>
                    <option value="2">Advanced JavaScript Concepts</option>
                    <option value="3">HTML & CSS Masterclass</option>
                    <option value="4">React.js for Beginners</option>
                </select>
            </div>
        </div>
        
        <div class="list-group mb-4">
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">How to center a div?</h5>
                    <small class="text-muted">3 days ago</small>
                </div>
                <p class="mb-1">I'm having trouble centering a div horizontally and vertically. I've tried using margin: auto but it only works horizontally.</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <span class="badge bg-primary me-1">HTML & CSS Masterclass</span>
                        <span>Posted by: Jennifer Wilson</span>
                    </small>
                    <div>
                        <span class="me-3"><i class="fas fa-comment me-1"></i> 12 replies</span>
                        <button class="btn btn-sm btn-outline-primary">View Discussion</button>
                    </div>
                </div>
            </div>
            
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Understanding JavaScript Promises</h5>
                    <small class="text-muted">2 days ago</small>
                </div>
                <p class="mb-1">Can someone explain the difference between Promises and async/await? I'm confused about when to use each one.</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <span class="badge bg-primary me-1">Advanced JavaScript Concepts</span>
                        <span>Posted by: Robert Johnson</span>
                    </small>
                    <div>
                        <span class="me-3"><i class="fas fa-comment me-1"></i> 8 replies</span>
                        <button class="btn btn-sm btn-outline-primary">View Discussion</button>
                    </div>
                </div>
            </div>
            
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">React Hooks vs Class Components</h5>
                    <small class="text-muted">1 day ago</small>
                </div>
                <p class="mb-1">What are the advantages of using React Hooks over class components? Should I refactor my existing class components to use hooks?</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <span class="badge bg-primary me-1">React.js for Beginners</span>
                        <span>Posted by: Michael Chen</span>
                    </small>
                    <div>
                        <span class="me-3"><i class="fas fa-comment me-1"></i> 5 replies</span>
                        <button class="btn btn-sm btn-outline-primary">View Discussion</button>
                    </div>
                </div>
            </div>
            
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Best practices for responsive design</h5>
                    <small class="text-muted">5 hours ago</small>
                </div>
                <p class="mb-1">What are some best practices for creating responsive websites? Should I use Bootstrap or create my own CSS grid system?</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <span class="badge bg-primary me-1">Complete Web Development Bootcamp</span>
                        <span>Posted by: Amanda Lee</span>
                    </small>
                    <div>
                        <span class="me-3"><i class="fas fa-comment me-1"></i> 3 replies</span>
                        <button class="btn btn-sm btn-outline-primary">View Discussion</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="d-flex justify-content-between">
            <button class="btn btn-primary" id="createDiscussionBtn">
                <i class="fas fa-plus-circle me-2"></i>Create Discussion
            </button>
            <nav aria-label="Discussion pagination">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    `;
    
    mainContent.appendChild(discussionsContent);
    
    // Add event listener to discussion filter
    document.getElementById('discussionFilter').addEventListener('change', function() {
        const selectedCourse = this.value;
        const discussions = document.querySelectorAll('.list-group-item');
        
        if (selectedCourse === 'all') {
            discussions.forEach(discussion => {
                discussion.style.display = '';
            });
        } else {
            discussions.forEach(discussion => {
                const courseBadge = discussion.querySelector('.badge').textContent;
                
                if (
                    (selectedCourse === '1' && courseBadge === 'Complete Web Development Bootcamp') ||
                    (selectedCourse === '2' && courseBadge === 'Advanced JavaScript Concepts') ||
                    (selectedCourse === '3' && courseBadge === 'HTML & CSS Masterclass') ||
                    (selectedCourse === '4' && courseBadge === 'React.js for Beginners')
                ) {
                    discussion.style.display = '';
                } else {
                    discussion.style.display = 'none';
                }
            });
        }
    });
    
    // Add event listener to create discussion button
    document.getElementById('createDiscussionBtn').addEventListener('click', function() {
        showCreateDiscussionModal();
    });
    
    // Add event listeners to view discussion buttons
    const viewButtons = document.querySelectorAll('.btn-outline-primary');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const discussionTitle = this.closest('.list-group-item').querySelector('h5').textContent;
            showDiscussionDetailsModal(discussionTitle);
        });
    });
}

/**
 * Show Create Discussion Modal
 */
function showCreateDiscussionModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'createDiscussionModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'createDiscussionModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createDiscussionModalLabel">Create New Discussion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="createDiscussionForm">
                        <div class="mb-3">
                            <label for="discussionTitle" class="form-label">Title</label>
                            <input type="text" class="form-control" id="discussionTitle" placeholder="Enter discussion title" required>
                        </div>
                        <div class="mb-3">
                            <label for="discussionCourse" class="form-label">Course</label>
                            <select class="form-select" id="discussionCourse" required>
                                <option value="" selected disabled>Select course</option>
                                <option value="1">Complete Web Development Bootcamp</option>
                                <option value="2">Advanced JavaScript Concepts</option>
                                <option value="3">HTML & CSS Masterclass</option>
                                <option value="4">React.js for Beginners</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="discussionContent" class="form-label">Content</label>
                            <textarea class="form-control" id="discussionContent" rows="5" placeholder="Enter discussion content" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="discussionTags" class="form-label">Tags (Optional)</label>
                            <input type="text" class="form-control" id="discussionTags" placeholder="Enter tags separated by commas">
                            <small class="text-muted">Example: html, css, responsive</small>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveDiscussionBtn">Create Discussion</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to save button
    document.getElementById('saveDiscussionBtn').addEventListener('click', function() {
        const discussionTitle = document.getElementById('discussionTitle').value.trim();
        const discussionCourse = document.getElementById('discussionCourse').value;
        const discussionContent = document.getElementById('discussionContent').value.trim();
        
        if (discussionTitle && discussionCourse && discussionContent) {
            // In a real app, this would save the discussion to the server
            // For this prototype, we'll just show a success message
            modalInstance.hide();
            showNotification('Discussion created successfully', 'success');
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Discussion Details Modal
 */
function showDiscussionDetailsModal(discussionTitle) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'discussionDetailsModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'discussionDetailsModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="discussionDetailsModalLabel">${discussionTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User" class="rounded-circle me-2" width="40">
                                <div>
                                    <div class="fw-bold">Jennifer Wilson</div>
                                    <div class="text-muted small">Posted 3 days ago</div>
                                </div>
                            </div>
                            <p>I'm having trouble centering a div horizontally and vertically. I've tried using margin: auto but it only works horizontally. Can someone help me understand how to center elements properly in CSS?</p>
                            <div>
                                <span class="badge bg-primary me-1">HTML & CSS Masterclass</span>
                                <span class="badge bg-secondary me-1">CSS</span>
                                <span class="badge bg-secondary">Layout</span>
                            </div>
                        </div>
                    </div>
                    
                    <h6 class="mb-3">Replies (12)</h6>
                    
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="User" class="rounded-circle me-2" width="32">
                                <div>
                                    <div class="fw-bold">Robert Johnson</div>
                                    <div class="text-muted small">Replied 3 days ago</div>
                                </div>
                            </div>
                            <p class="mb-0">To center a div both horizontally and vertically, you can use flexbox:</p>
                            <pre class="bg-light p-2 mt-2"><code>.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* or any height */
}</code></pre>
                        </div>
                    </div>
                    
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="User" class="rounded-circle me-2" width="32">
                                <div>
                                    <div class="fw-bold">Amanda Lee</div>
                                    <div class="text-muted small">Replied 2 days ago</div>
                                </div>
                            </div>
                            <p class="mb-0">You can also use CSS Grid:</p>
                            <pre class="bg-light p-2 mt-2"><code>.parent {
  display: grid;
  place-items: center;
  height: 100vh; /* or any height */
}</code></pre>
                        </div>
                    </div>
                    
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="User" class="rounded-circle me-2" width="32">
                                <div>
                                    <div class="fw-bold">Michael Chen</div>
                                    <div class="text-muted small">Replied 1 day ago</div>
                                </div>
                            </div>
                            <p class="mb-0">Another approach is to use absolute positioning with transform:</p>
                            <pre class="bg-light p-2 mt-2"><code>.parent {
  position: relative;
  height: 100vh; /* or any height */
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}</code></pre>
                        </div>
                    </div>
                    
                    <form id="replyForm">
                        <div class="mb-3">
                            <label for="replyContent" class="form-label">Your Reply</label>
                            <textarea class="form-control" id="replyContent" rows="3" placeholder="Enter your reply" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Post Reply</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to reply form
    document.getElementById('replyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const replyContent = document.getElementById('replyContent').value.trim();
        
        if (replyContent) {
            // In a real app, this would save the reply to the server
            // For this prototype, we'll just show a success message
            showNotification('Reply posted successfully', 'success');
            
            // Clear the form
            document.getElementById('replyContent').value = '';
        } else {
            alert('Please enter a reply');
        }
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Earnings
 */
function showEarnings() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Earnings content
    const earningsContent = document.createElement('div');
    earningsContent.className = 'dashboard-card';
    earningsContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Earnings</h5>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="earningsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Last 6 Months
                </button>
                <ul class="dropdown-menu" aria-labelledby="earningsDropdown">
                    <li><a class="dropdown-item" href="#">Last Month</a></li>
                    <li><a class="dropdown-item" href="#">Last 3 Months</a></li>
                    <li><a class="dropdown-item" href="#">Last 6 Months</a></li>
                    <li><a class="dropdown-item" href="#">Last Year</a></li>
                    <li><a class="dropdown-item" href="#">All Time</a></li>
                </ul>
            </div>
        </div>
        
        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body text-center">
                        <h6 class="card-title text-muted mb-2">Total Earnings</h6>
                        <h2 class="mb-0">$12,430</h2>
                        <p class="text-success mb-0"><i class="fas fa-arrow-up me-1"></i>15% from last period</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body text-center">
                        <h6 class="card-title text-muted mb-2">This Month</h6>
                        <h2 class="mb-0">$2,840</h2>
                        <p class="text-success mb-0"><i class="fas fa-arrow-up me-1"></i>8% from last month</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body text-center">
                        <h6 class="card-title text-muted mb-2">Pending Payout</h6>
                        <h2 class="mb-0">$1,250</h2>
                        <p class="text-muted mb-0">Next payout on June 1, 2023</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card mb-4">
            <div class="card-body">
                <h6 class="card-title mb-4">Earnings Over Time</h6>
                <div class="chart-container">
                    <canvas id="earningsChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="card mb-4">
            <div class="card-body">
                <h6 class="card-title mb-4">Earnings by Course</h6>
                <div class="chart-container">
                    <canvas id="courseEarningsChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-body">
                <h6 class="card-title mb-4">Recent Transactions</h6>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>May 15, 2023</td>
                                <td>Course Sales - Advanced JavaScript Concepts</td>
                                <td class="text-success">+$450.00</td>
                                <td><span class="badge bg-success">Completed</span></td>
                            </tr>
                            <tr>
                                <td>May 10, 2023</td>
                                <td>Course Sales - Complete Web Development Bootcamp</td>
                                <td class="text-success">+$680.00</td>
                                <td><span class="badge bg-success">Completed</span></td>
                            </tr>
                            <tr>
                                <td>May 5, 2023</td>
                                <td>Course Sales - HTML & CSS Masterclass</td>
                                <td class="text-success">+$320.00</td>
                                <td><span class="badge bg-success">Completed</span></td>
                            </tr>
                            <tr>
                                <td>May 1, 2023</td>
                                <td>Monthly Payout</td>
                                <td class="text-danger">-$1,200.00</td>
                                <td><span class="badge bg-success">Completed</span></td>
                            </tr>
                            <tr>
                                <td>April 28, 2023</td>
                                <td>Course Sales - React.js for Beginners</td>
                                <td class="text-success">+$240.00</td>
                                <td><span class="badge bg-success">Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-center mt-3">
                    <button class="btn btn-outline-primary">View All Transactions</button>
                </div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(earningsContent);
    
    // Initialize charts
    setTimeout(() => {
        // Earnings Over Time Chart
        const earningsCtx = document.getElementById('earningsChart').getContext('2d');
        new Chart(earningsCtx, {
            type: 'line',
            data: {
                labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Earnings ($)',
                    data: [1800, 2200, 1900, 2400, 2100, 2800],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        
        // Earnings by Course Chart
        const courseEarningsCtx = document.getElementById('courseEarningsChart').getContext('2d');
        new Chart(courseEarningsCtx, {
            type: 'bar',
            data: {
                labels: ['Web Development Bootcamp', 'Advanced JavaScript', 'HTML & CSS Masterclass', 'React.js for Beginners'],
                datasets: [{
                    label: 'Earnings ($)',
                    data: [5200, 3800, 2100, 1330],
                    backgroundColor: [
                        '#4361ee',
                        '#3f37c9',
                        '#f72585',
                        '#4cc9f0'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }, 100);
    
    // Add event listeners to dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update dropdown button text
            document.getElementById('earningsDropdown').textContent = this.textContent;
            
            // In a real app, this would update the chart data
            // For this prototype, we'll just show a notification
            showNotification(`Earnings data updated to show ${this.textContent.toLowerCase()}`, 'info');
        });
    });
}

/**
 * Show Statements
 */
function showStatements() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Statements content
    const statementsContent = document.createElement('div');
    statementsContent.className = 'dashboard-card';
    statementsContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Statements</h5>
            <div>
                <button class="btn btn-outline-primary me-2" id="exportStatementsBtn">
                    <i class="fas fa-download me-2"></i>Export
                </button>
                <button class="btn btn-outline-secondary" id="printStatementsBtn">
                    <i class="fas fa-print me-2"></i>Print
                </button>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Statement</th>
                        <th>Period</th>
                        <th>Earnings</th>
                        <th>Fees</th>
                        <th>Net Payout</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>May 2023</td>
                        <td>May 1 - May 31, 2023</td>
                        <td>$2,840.00</td>
                        <td>$284.00</td>
                        <td>$2,556.00</td>
                        <td><span class="badge bg-warning">Pending</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </td>
                    </tr>
                    <tr>
                        <td>April 2023</td>
                        <td>Apr 1 - Apr 30, 2023</td>
                        <td>$2,100.00</td>
                        <td>$210.00</td>
                        <td>$1,890.00</td>
                        <td><span class="badge bg-success">Paid</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </td>
                    </tr>
                    <tr>
                        <td>March 2023</td>
                        <td>Mar 1 - Mar 31, 2023</td>
                        <td>$2,400.00</td>
                        <td>$240.00</td>
                        <td>$2,160.00</td>
                        <td><span class="badge bg-success">Paid</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </td>
                    </tr>
                    <tr>
                        <td>February 2023</td>
                        <td>Feb 1 - Feb 28, 2023</td>
                        <td>$1,900.00</td>
                        <td>$190.00</td>
                        <td>$1,710.00</td>
                        <td><span class="badge bg-success">Paid</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </td>
                    </tr>
                    <tr>
                        <td>January 2023</td>
                        <td>Jan 1 - Jan 31, 2023</td>
                        <td>$2,200.00</td>
                        <td>$220.00</td>
                        <td>$1,980.00</td>
                        <td><span class="badge bg-success">Paid</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </td>
                    </tr>
                    <tr>
                        <td>December 2022</td>
                        <td>Dec 1 - Dec 31, 2022</td>
                        <td>$1,800.00</td>
                        <td>$180.00</td>
                        <td>$1,620.00</td>
                        <td><span class="badge bg-success">Paid</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <nav aria-label="Statement pagination">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    `;
    
    mainContent.appendChild(statementsContent);
    
    // Add event listeners to buttons
    document.getElementById('exportStatementsBtn').addEventListener('click', function() {
        showNotification('Statements exported successfully', 'success');
    });
    
    document.getElementById('printStatementsBtn').addEventListener('click', function() {
        showNotification('Preparing statements for printing...', 'info');
        setTimeout(() => {
            window.print();
        }, 1000);
    });
    
    // Add event listeners to view buttons
    const viewButtons = document.querySelectorAll('.btn-outline-primary');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const statementPeriod = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            showStatementDetailsModal(statementPeriod);
        });
    });
}

/**
 * Show Statement Details Modal
 */
function showStatementDetailsModal(statementPeriod) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'statementDetailsModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'statementDetailsModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="statementDetailsModalLabel">Statement Details: ${statementPeriod}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between mb-4">
                        <div>
                            <h6 class="mb-1">EduLearn Inc.</h6>
                            <p class="text-muted mb-0">123 Education St.</p>
                            <p class="text-muted mb-0">San Francisco, CA 94107</p>
                        </div>
                        <div class="text-end">
                            <h6 class="mb-1">Statement #EDU-2023-05</h6>
                            <p class="text-muted mb-0">Issue Date: June 1, 2023</p>
                            <p class="text-muted mb-0">Period: ${statementPeriod}</p>
                        </div>
                    </div>
                    
                    <div class="card mb-4">
                        <div class="card-body">
                            <h6 class="card-title mb-3">Summary</h6>
                            <div class="row">
                                <div class="col-md-3">
                                    <p class="text-muted mb-1">Total Earnings</p>
                                    <h5>$2,840.00</h5>
                                </div>
                                <div class="col-md-3">
                                    <p class="text-muted mb-1">Platform Fee (10%)</p>
                                    <h5>$284.00</h5>
                                </div>
                                <div class="col-md-3">
                                    <p class="text-muted mb-1">Tax Withheld</p>
                                    <h5>$0.00</h5>
                                </div>
                                <div class="col-md-3">
                                    <p class="text-muted mb-1">Net Payout</p>
                                    <h5>$2,556.00</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h6 class="mb-3">Earnings Breakdown</h6>
                    
                    <div class="table-responsive mb-4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Sales</th>
                                    <th>Enrollments</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Complete Web Development Bootcamp</td>
                                    <td>32</td>
                                    <td>32</td>
                                    <td>$1,280.00</td>
                                </tr>
                                <tr>
                                    <td>Advanced JavaScript Concepts</td>
                                    <td>25</td>
                                    <td>25</td>
                                    <td>$900.00</td>
                                </tr>
                                <tr>
                                    <td>HTML & CSS Masterclass</td>
                                    <td>18</td>
                                    <td>18</td>
                                    <td>$480.00</td>
                                </tr>
                                <tr>
                                    <td>React.js for Beginners</td>
                                    <td>6</td>
                                    <td>6</td>
                                    <td>$180.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colspan="3" class="text-end">Total</th>
                                    <th>$2,840.00</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <h6 class="mb-3">Payment Information</h6>
                    
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="text-muted mb-1">Payment Method</p>
                                    <h6>Direct Deposit</h6>
                                </div>
                                <div class="col-md-6">
                                    <p class="text-muted mb-1">Payment Status</p>
                                    <h6><span class="badge bg-warning">Pending</span></h6>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-6">
                                    <p class="text-muted mb-1">Bank Account</p>
                                    <h6>**** **** **** 1234</h6>
                                </div>
                                <div class="col-md-6">
                                    <p class="text-muted mb-1">Expected Payment Date</p>
                                    <h6>June 15, 2023</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="downloadStatementBtn">Download PDF</button>
                    <button type="button" class="btn btn-outline-secondary" id="printStatementBtn">Print</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listeners to buttons
    document.getElementById('downloadStatementBtn').addEventListener('click', function() {
        showNotification('Statement downloaded successfully', 'success');
    });
    
    document.getElementById('printStatementBtn').addEventListener('click', function() {
        showNotification('Preparing statement for printing...', 'info');
        setTimeout(() => {
            window.print();
        }, 1000);
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Profile
 */
function showProfile() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Profile content
    const profileContent = document.createElement('div');
    profileContent.className = 'dashboard-card';
    profileContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Profile</h5>
            <div>
                <button class="btn btn-primary" id="saveProfileBtn">Save Changes</button>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" class="rounded-circle img-thumbnail" width="150">
                        </div>
                        <h5 class="card-title mb-1" id="profileName">John Smith</h5>
                        <p class="text-muted" id="profileRole">Instructor</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary">
                                <i class="fas fa-camera me-2"></i>Change Photo
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-body">
                        <h6 class="card-title mb-3">Social Profiles</h6>
                        <div class="mb-3">
                            <label for="profileWebsite" class="form-label">Website</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-globe"></i></span>
                                <input type="url" class="form-control" id="profileWebsite" placeholder="https://yourwebsite.com" value="https://johnsmith.com">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="profileTwitter" class="form-label">Twitter</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fab fa-twitter"></i></span>
                                <input type="text" class="form-control" id="profileTwitter" placeholder="@username" value="@johnsmith">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="profileLinkedin" class="form-label">LinkedIn</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fab fa-linkedin"></i></span>
                                <input type="text" class="form-control" id="profileLinkedin" placeholder="LinkedIn profile URL" value="https://linkedin.com/in/johnsmith">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="profileGithub" class="form-label">GitHub</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fab fa-github"></i></span>
                                <input type="text" class="form-control" id="profileGithub" placeholder="GitHub username" value="johnsmith">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <h6 class="card-title mb-3">Personal Information</h6>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="profileFirstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="profileFirstName" value="John">
                            </div>
                            <div class="col-md-6">
                                <label for="profileLastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="profileLastName" value="Smith">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="profileEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="profileEmail" value="john.smith@example.com">
                            </div>
                            <div class="col-md-6">
                                <label for="profilePhone" class="form-label">Phone</label>
                                <input type="tel" class="form-control" id="profilePhone" value="+1 (555) 123-4567">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="profileBio" class="form-label">Bio</label>
                            <textarea class="form-control" id="profileBio" rows="4">John Smith is a senior web developer with over 10 years of experience in building web applications. He specializes in JavaScript, React, and Node.js. John has worked with various companies and has helped hundreds of students learn web development through his courses.</textarea>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="profileLocation" class="form-label">Location</label>
                                <input type="text" class="form-control" id="profileLocation" value="San Francisco, CA">
                            </div>
                            <div class="col-md-6">
                                <label for="profileLanguage" class="form-label">Language</label>
                                <select class="form-select" id="profileLanguage">
                                    <option value="en" selected>English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="zh">Chinese</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-body">
                        <h6 class="card-title mb-3">Expertise & Skills</h6>
                        <div class="mb-3">
                            <label for="profileTitle" class="form-label">Professional Title</label>
                            <input type="text" class="form-control" id="profileTitle" value="Senior Web Developer & Instructor">
                        </div>
                        <div class="mb-3">
                            <label for="profileSkills" class="form-label">Skills</label>
                            <input type="text" class="form-control" id="profileSkills" value="JavaScript, React, Node.js, HTML, CSS, MongoDB, Express">
                            <small class="text-muted">Separate skills with commas</small>
                        </div>
                        <div class="mb-3">
                            <label for="profileExperience" class="form-label">Years of Experience</label>
                            <input type="number" class="form-control" id="profileExperience" value="10">
                        </div>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-body">
                        <h6 class="card-title mb-3">Payment Information</h6>
                        <div class="mb-3">
                            <label for="profilePaymentMethod" class="form-label">Payment Method</label>
                            <select class="form-select" id="profilePaymentMethod">
                                <option value="bank" selected>Direct Deposit</option>
                                <option value="paypal">PayPal</option>
                                <option value="stripe">Stripe</option>
                            </select>
                        </div>
                        <div id="bankDetails">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="profileBankName" class="form-label">Bank Name</label>
                                    <input type="text" class="form-control" id="profileBankName" value="Bank of America">
                                </div>
                                <div class="col-md-6">
                                    <label for="profileAccountName" class="form-label">Account Holder Name</label>
                                    <input type="text" class="form-control" id="profileAccountName" value="John Smith">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="profileAccountNumber" class="form-label">Account Number</label>
                                    <input type="text" class="form-control" id="profileAccountNumber" value="**** **** **** 1234">
                                </div>
                                <div class="col-md-6">
                                    <label for="profileRoutingNumber" class="form-label">Routing Number</label>
                                    <input type="text" class="form-control" id="profileRoutingNumber" value="**** **** *">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">Password</h6>
                        <div class="mb-3">
                            <label for="profileCurrentPassword" class="form-label">Current Password</label>
                            <input type="password" class="form-control" id="profileCurrentPassword">
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="profileNewPassword" class="form-label">New Password</label>
                                <input type="password" class="form-control" id="profileNewPassword">
                            </div>
                            <div class="col-md-6">
                                <label for="profileConfirmPassword" class="form-label">Confirm New Password</label>
                                <input type="password" class="form-control" id="profileConfirmPassword">
                            </div>
                        </div>
                        <button class="btn btn-outline-primary">Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(profileContent);
    
    // Add event listener to save button
    document.getElementById('saveProfileBtn').addEventListener('click', function() {
        showNotification('Profile updated successfully', 'success');
    });
    
    // Add event listener to payment method select
    document.getElementById('profilePaymentMethod').addEventListener('change', function() {
        const bankDetails = document.getElementById('bankDetails');
        
        if (this.value === 'bank') {
            bankDetails.style.display = 'block';
        } else {
            bankDetails.style.display = 'none';
        }
    });
}

/**
 * Show Notifications
 */
function showNotifications() {
    const mainContent = document.querySelector('.main-content');
    const contentSections = mainContent.querySelectorAll('.dashboard-card, .row');
    
    // Hide all content sections except header
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Create Notifications content
    const notificationsContent = document.createElement('div');
    notificationsContent.className = 'dashboard-card';
    notificationsContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Notifications</h5>
            <div>
                <button class="btn btn-outline-primary me-2" id="markAllReadBtn">Mark All as Read</button>
                <button class="btn btn-outline-secondary" id="notificationSettingsBtn">Settings</button>
            </div>
        </div>
        
        <ul class="nav nav-tabs mb-4" id="notificationTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="true">All (12)</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="unread-tab" data-bs-toggle="tab" data-bs-target="#unread" type="button" role="tab" aria-controls="unread" aria-selected="false">Unread (5)</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="courses-tab" data-bs-toggle="tab" data-bs-target="#courses" type="button" role="tab" aria-controls="courses" aria-selected="false">Courses (4)</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="students-tab" data-bs-toggle="tab" data-bs-target="#students" type="button" role="tab" aria-controls="students" aria-selected="false">Students (6)</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="system-tab" data-bs-toggle="tab" data-bs-target="#system" type="button" role="tab" aria-controls="system" aria-selected="false">System (2)</button>
            </li>
        </ul>
        
        <div class="tab-content" id="notificationTabsContent">
            <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                <div class="list-group">
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New student enrolled in your course</h6>
                            <small class="text-muted">2 hours ago</small>
                        </div>
                        <p class="mb-1">Michael Chen has enrolled in "React.js for Beginners".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New review on your course</h6>
                            <small class="text-muted">5 hours ago</small>
                        </div>
                        <p class="mb-1">Amanda Lee has left a 5-star review on "HTML & CSS Masterclass".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New discussion in your course</h6>
                            <small class="text-muted">1 day ago</small>
                        </div>
                        <p class="mb-1">Robert Johnson has started a new discussion in "Advanced JavaScript Concepts".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New assignment submission</h6>
                            <small class="text-muted">1 day ago</small>
                        </div>
                        <p class="mb-1">Jennifer Wilson has submitted the assignment "Build a Responsive Website".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Payment processed</h6>
                            <small class="text-muted">2 days ago</small>
                        </div>
                        <p class="mb-1">Your payment of $1,890.00 for April 2023 has been processed.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">System</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Course completion</h6>
                            <small class="text-muted">3 days ago</small>
                        </div>
                        <p class="mb-1">Amanda Lee has completed your course "HTML & CSS Masterclass".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New quiz submission</h6>
                            <small class="text-muted">4 days ago</small>
                        </div>
                        <p class="mb-1">Robert Johnson has completed the quiz "JavaScript Fundamentals Quiz" with a score of 85%.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Course approved</h6>
                            <small class="text-muted">5 days ago</small>
                        </div>
                        <p class="mb-1">Your course "React.js for Beginners" has been approved and is now live.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New student enrolled in your course</h6>
                            <small class="text-muted">6 days ago</small>
                        </div>
                        <p class="mb-1">Jennifer Wilson has enrolled in "Advanced JavaScript Concepts".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">System maintenance</h6>
                            <small class="text-muted">1 week ago</small>
                        </div>
                        <p class="mb-1">The system will be undergoing maintenance on May 15, 2023, from 2:00 AM to 4:00 AM UTC.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">System</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade" id="unread" role="tabpanel" aria-labelledby="unread-tab">
                <!-- Unread notifications will be shown here -->
                <div class="list-group">
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New student enrolled in your course</h6>
                            <small class="text-muted">2 hours ago</small>
                        </div>
                        <p class="mb-1">Michael Chen has enrolled in "React.js for Beginners".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New review on your course</h6>
                            <small class="text-muted">5 hours ago</small>
                        </div>
                        <p class="mb-1">Amanda Lee has left a 5-star review on "HTML & CSS Masterclass".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New discussion in your course</h6>
                            <small class="text-muted">1 day ago</small>
                        </div>
                        <p class="mb-1">Robert Johnson has started a new discussion in "Advanced JavaScript Concepts".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New assignment submission</h6>
                            <small class="text-muted">1 day ago</small>
                        </div>
                        <p class="mb-1">Jennifer Wilson has submitted the assignment "Build a Responsive Website".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Payment processed</h6>
                            <small class="text-muted">2 days ago</small>
                        </div>
                        <p class="mb-1">Your payment of $1,890.00 for April 2023 has been processed.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">System</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade" id="courses" role="tabpanel" aria-labelledby="courses-tab">
                <!-- Course notifications will be shown here -->
                <div class="list-group">
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New review on your course</h6>
                            <small class="text-muted">5 hours ago</small>
                        </div>
                        <p class="mb-1">Amanda Lee has left a 5-star review on "HTML & CSS Masterclass".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New discussion in your course</h6>
                            <small class="text-muted">1 day ago</small>
                        </div>
                        <p class="mb-1">Robert Johnson has started a new discussion in "Advanced JavaScript Concepts".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Course approved</h6>
                            <small class="text-muted">5 days ago</small>
                        </div>
                        <p class="mb-1">Your course "React.js for Beginners" has been approved and is now live.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Courses</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade" id="students" role="tabpanel" aria-labelledby="students-tab">
                <!-- Student notifications will be shown here -->
                <div class="list-group">
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New student enrolled in your course</h6>
                            <small class="text-muted">2 hours ago</small>
                        </div>
                        <p class="mb-1">Michael Chen has enrolled in "React.js for Beginners".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New assignment submission</h6>
                            <small class="text-muted">1 day ago</small>
                        </div>
                        <p class="mb-1">Jennifer Wilson has submitted the assignment "Build a Responsive Website".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Course completion</h6>
                            <small class="text-muted">3 days ago</small>
                        </div>
                        <p class="mb-1">Amanda Lee has completed your course "HTML & CSS Masterclass".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New quiz submission</h6>
                            <small class="text-muted">4 days ago</small>
                        </div>
                        <p class="mb-1">Robert Johnson has completed the quiz "JavaScript Fundamentals Quiz" with a score of 85%.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New student enrolled in your course</h6>
                            <small class="text-muted">6 days ago</small>
                        </div>
                        <p class="mb-1">Jennifer Wilson has enrolled in "Advanced JavaScript Concepts".</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">Students</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade" id="system" role="tabpanel" aria-labelledby="system-tab">
                <!-- System notifications will be shown here -->
                <div class="list-group">
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Payment processed</h6>
                            <small class="text-muted">2 days ago</small>
                        </div>
                        <p class="mb-1">Your payment of $1,890.00 for April 2023 has been processed.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">System</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                    
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">System maintenance</h6>
                            <small class="text-muted">1 week ago</small>
                        </div>
                        <p class="mb-1">The system will be undergoing maintenance on May 15, 2023, from 2:00 AM to 4:00 AM UTC.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-primary">System</small>
                            <button class="btn btn-sm btn-outline-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(notificationsContent);
    
    // Add event listener to mark all read button
    document.getElementById('markAllReadBtn').addEventListener('click', function() {
        const unreadNotifications = document.querySelectorAll('.unread');
        
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        
        // Update tab counts
        document.getElementById('unread-tab').textContent = 'Unread (0)';
        
        showNotification('All notifications marked as read', 'success');
    });
    
    // Add event listener to notification settings button
    document.getElementById('notificationSettingsBtn').addEventListener('click', function() {
        showNotificationSettingsModal();
    });
    
    // Add event listeners to view buttons
    const viewButtons = document.querySelectorAll('.btn-outline-primary');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notificationTitle = this.closest('.list-group-item').querySelector('h6').textContent;
            showNotificationDetailsModal(notificationTitle);
        });
    });
    
    // Add CSS for unread notifications
    const style = document.createElement('style');
    style.textContent = `
        .unread {
            background-color: rgba(67, 97, 238, 0.05);
            border-left: 3px solid var(--primary-color);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Show Notification Settings Modal
 */
function showNotificationSettingsModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'notificationSettingsModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'notificationSettingsModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="notificationSettingsModalLabel">Notification Settings</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <h6 class="mb-3">Email Notifications</h6>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="emailNewStudent" checked>
                            <label class="form-check-label" for="emailNewStudent">New student enrollments</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="emailNewReview" checked>
                            <label class="form-check-label" for="emailNewReview">New course reviews</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="emailNewDiscussion" checked>
                            <label class="form-check-label" for="emailNewDiscussion">New discussions</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="emailAssignmentSubmission" checked>
                            <label class="form-check-label" for="emailAssignmentSubmission">Assignment submissions</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="emailPayment" checked>
                            <label class="form-check-label" for="emailPayment">Payment notifications</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="emailSystem" checked>
                            <label class="form-check-label" for="emailSystem">System notifications</label>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <h6 class="mb-3">Push Notifications</h6>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="pushNewStudent" checked>
                            <label class="form-check-label" for="pushNewStudent">New student enrollments</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="pushNewReview" checked>
                            <label class="form-check-label" for="pushNewReview">New course reviews</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="pushNewDiscussion" checked>
                            <label class="form-check-label" for="pushNewDiscussion">New discussions</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="pushAssignmentSubmission" checked>
                            <label class="form-check-label" for="pushAssignmentSubmission">Assignment submissions</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="pushPayment" checked>
                            <label class="form-check-label" for="pushPayment">Payment notifications</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="pushSystem" checked>
                            <label class="form-check-label" for="pushSystem">System notifications</label>
                        </div>
                    </div>
                    
                    <div>
                        <h6 class="mb-3">Notification Frequency</h6>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="notificationFrequency" id="frequencyRealTime" checked>
                            <label class="form-check-label" for="frequencyRealTime">
                                Real-time
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="notificationFrequency" id="frequencyDaily">
                            <label class="form-check-label" for="frequencyDaily">
                                Daily digest
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="notificationFrequency" id="frequencyWeekly">
                            <label class="form-check-label" for="frequencyWeekly">
                                Weekly digest
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveNotificationSettingsBtn">Save Settings</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to save button
    document.getElementById('saveNotificationSettingsBtn').addEventListener('click', function() {
        // In a real app, this would save the settings to the server
        // For this prototype, we'll just show a success message
        modalInstance.hide();
        showNotification('Notification settings saved successfully', 'success');
    });
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Show Notification Details Modal
 */
function showNotificationDetailsModal(notificationTitle) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'notificationDetailsModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'notificationDetailsModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="notificationDetailsModalLabel">${notificationTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>This is a detailed view of the notification: ${notificationTitle}.</p>
                    <p>In a real application, this would display more information about the notification and provide relevant actions.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Take Action</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Initialize user dropdown menu
 */
function initUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    
    userDropdown.addEventListener('click', function(e) {
        e.preventDefault();
        userDropdownMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userDropdown.contains(e.target)) {
            userDropdownMenu.classList.remove('show');
        }
    });
    
    // Add functionality to dropdown items
    const dropdownItems = userDropdownMenu.querySelectorAll('.user-dropdown-item:not(.logout-btn)');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the item text
            const itemText = this.querySelector('span').textContent.trim();
            
            // Handle dropdown item click
            if (itemText === 'Profile') {
                showProfile();
                
                // Update page title
                document.querySelector('.content-header h1').textContent = 'Profile';
                
                // Update active menu item
                const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
                menuItems.forEach(mi => mi.classList.remove('active'));
                // Find "Profile" menu item and activate it
                menuItems.forEach(mi => {
                    if (mi.querySelector('span').textContent.trim() === 'Profile') {
                        mi.classList.add('active');
                    }
                });
            } else if (itemText === 'Settings') {
                showNotification('Settings page is under development', 'info');
            }
            
            // Close dropdown
            userDropdownMenu.classList.remove('show');
        });
    });
}

/**
 * Initialize action buttons in tables
 */
function initActionButtons() {
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determine action type (view, edit, delete)
            const action = this.classList.contains('view') ? 'view' : 
                          this.classList.contains('edit') ? 'edit' : 'delete';
            
            // Determine item type (course or student)
            const table = this.closest('table');
            const itemType = table.querySelector('th').textContent.toLowerCase().includes('course') ? 'course' : 'student';
            
            // Get item name
            const row = this.closest('tr');
            const itemName = itemType === 'course' ? 
                            row.querySelector('.course-info .fw-bold').textContent :
                            row.querySelector('.student-info .fw-bold').textContent;
            
            // Handle action based on type
            handleAction(action, itemType, itemName, row);
        });
    });
}

/**
 * Handle action button click
 */
function handleAction(action, itemType, itemName, row) {
    switch(action) {
        case 'view':
            showItemDetails(itemType, itemName);
            break;
        case 'edit':
            showEditForm(itemType, itemName);
            break;
        case 'delete':
            confirmDelete(itemType, itemName, row);
            break;
    }
}

/**
 * Show item details
 */
function showItemDetails(itemType, itemName) {
    // Create modal for viewing item details
    const modalId = `view${itemType}Modal`;
    
    // Remove existing modal if any
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create new modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = modalId;
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', `${modalId}Label`);
    modal.setAttribute('aria-hidden', 'true');
    
    // Set modal content based on item type
    let modalContent = '';
    
    if (itemType === 'course') {
        modalContent = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">Course Details: ${itemName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-4">
                            <div class="col-md-4">
                                <img src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg" alt="Course" class="img-fluid rounded">
                            </div>
                            <div class="col-md-8">
                                <h4>${itemName}</h4>
                                <p class="text-muted">Web Development</p>
                                <div class="d-flex align-items-center mb-2">
                                    <span class="badge bg-success me-2">Active</span>
                                    <span class="text-muted">Last updated: 2 days ago</span>
                                </div>
                                <p>This comprehensive course covers all aspects of web development from front-end to back-end technologies.</p>
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Course Information</h5>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between">
                                                <span>Price:</span>
                                                <span class="fw-bold">$89.99</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                <span>Duration:</span>
                                                <span>12 weeks</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                <span>Lessons:</span>
                                                <span>48</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                <span>Students Enrolled:</span>
                                                <span>1,245</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                <span>Rating:</span>
                                                <span>4.8/5 (230 reviews)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Instructor</h5>
                                        <div class="d-flex align-items-center mb-3">
                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Instructor" class="rounded-circle me-3" width="60">
                                            <div>
                                                <h6 class="mb-0">John Smith</h6>
                                                <p class="text-muted mb-0">Web Development Expert</p>
                                            </div>
                                        </div>
                                        <p>John is a senior web developer with over 10 years of experience in building web applications.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Course Content</h5>
                                <div class="accordion" id="courseContentAccordion">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="section1Header">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#section1Collapse" aria-expanded="true" aria-controls="section1Collapse">
                                                Section 1: Introduction to Web Development
                                            </button>
                                        </h2>
                                        <div id="section1Collapse" class="accordion-collapse collapse show" aria-labelledby="section1Header" data-bs-parent="#courseContentAccordion">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">
                                                        <i class="fas fa-video me-2 text-primary"></i>
                                                        Welcome to the Course
                                                        <span class="badge bg-secondary float-end">5:30</span>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <i class="fas fa-file-alt me-2 text-info"></i>
                                                        Course Overview
                                                        <span class="badge bg-secondary float-end">10:15</span>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <i class="fas fa-file-code me-2 text-success"></i>
                                                        Setting Up Your Development Environment
                                                        <span class="badge bg-secondary float-end">15:45</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="section2Header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#section2Collapse" aria-expanded="false" aria-controls="section2Collapse">
                                                Section 2: HTML Fundamentals
                                            </button>
                                        </h2>
                                        <div id="section2Collapse" class="accordion-collapse collapse" aria-labelledby="section2Header" data-bs-parent="#courseContentAccordion">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">
                                                        <i class="fas fa-video me-2 text-primary"></i>
                                                        Introduction to HTML
                                                        <span class="badge bg-secondary float-end">12:20</span>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <i class="fas fa-file-code me-2 text-success"></i>
                                                        HTML Tags and Elements
                                                        <span class="badge bg-secondary float-end">18:45</span>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <i class="fas fa-tasks me-2 text-warning"></i>
                                                        HTML Exercise
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Student Reviews</h5>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="me-3">
                                        <h2 class="mb-0">4.8</h2>
                                        <div>
                                            <i class="fas fa-star text-warning"></i>
                                            <i class="fas fa-star text-warning"></i>
                                            <i class="fas fa-star text-warning"></i>
                                            <i class="fas fa-star text-warning"></i>
                                            <i class="fas fa-star-half-alt text-warning"></i>
                                        </div>
                                        <small class="text-muted">230 reviews</small>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="me-2">5 stars</div>
                                            <div class="progress flex-grow-1" style="height: 8px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div class="ms-2">75%</div>
                                        </div>
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="me-2">4 stars</div>
                                            <div class="progress flex-grow-1" style="height: 8px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div class="ms-2">20%</div>
                                        </div>
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="me-2">3 stars</div>
                                            <div class="progress flex-grow-1" style="height: 8px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 3%;" aria-valuenow="3" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div class="ms-2">3%</div>
                                        </div>
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="me-2">2 stars</div>
                                            <div class="progress flex-grow-1" style="height: 8px;">
                                                <div class="progress-bar bg-warning" role="progressbar" style="width: 1%;" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div class="ms-2">1%</div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="me-2">1 star</div>
                                            <div class="progress flex-grow-1" style="height: 8px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 1%;" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div class="ms-2">1%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Edit Course</button>
                    </div>
                </div>
            </div>
        `;
    } else {
        modalContent = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">Student Details: ${itemName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Student" class="rounded-circle mb-3" width="100">
                            <h4>${itemName}</h4>
                            <p class="text-muted">Student ID: STU-${Math.floor(10000 + Math.random() * 90000)}</p>
                        </div>
                        
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Personal Information</h5>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Email:</span>
                                        <span>${itemName.toLowerCase().replace(' ', '.')}@example.com</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Phone:</span>
                                        <span>+1 (555) 123-4567</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Location:</span>
                                        <span>New York, USA</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Joined:</span>
                                        <span>May 12, 2023</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Enrolled Courses</h5>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-0">Complete Web Development Bootcamp</h6>
                                                <small class="text-muted">Progress: 75%</small>
                                            </div>
                                            <div class="progress" style="width: 100px; height: 8px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-0">Advanced JavaScript Concepts</h6>
                                                <small class="text-muted">Progress: 45%</small>
                                            </div>
                                            <div class="progress" style="width: 100px; height: 8px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-0">HTML & CSS Masterclass</h6>
                                                <small class="text-muted">Progress: 90%</small>
                                            </div>
                                            <div class="progress" style="width: 100px; height: 8px;">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Activity</h5>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="d-flex">
                                            <div class="me-3">
                                                <div class="bg-primary rounded-circle p-2 text-white">
                                                    <i class="fas fa-book"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="mb-0">Completed lesson "HTML Tags and Elements"</p>
                                                <small class="text-muted">2 hours ago</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="d-flex">
                                            <div class="me-3">
                                                <div class="bg-success rounded-circle p-2 text-white">
                                                    <i class="fas fa-tasks"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="mb-0">Submitted assignment "Build a Responsive Website"</p>
                                                <small class="text-muted">1 day ago</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="d-flex">
                                            <div class="me-3">
                                                <div class="bg-info rounded-circle p-2 text-white">
                                                    <i class="fas fa-comment"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="mb-0">Posted in discussion "How to center a div?"</p>
                                                <small class="text-muted">3 days ago</small>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Message Student</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to edit button in modal
    modal.querySelector('.btn-primary').addEventListener('click', function() {
        modalInstance.hide();
        if (itemType === 'course') {
            showEditForm(itemType, itemName);
        } else {
            showMessageForm(itemName);
        }
    });
}

/**
 * Show edit form
 */
function showEditForm(itemType, itemName) {
    // Create modal for editing item
    const modalId = `edit${itemType}Modal`;
    
    // Remove existing modal if any
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create new modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = modalId;
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', `${modalId}Label`);
    modal.setAttribute('aria-hidden', 'true');
    
    // Set modal content based on item type
    let modalContent = '';
    
    if (itemType === 'course') {
        modalContent = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">Edit Course: ${itemName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editCourseForm">
                            <div class="row mb-3">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label for="courseTitle" class="form-label">Course Title</label>
                                        <input type="text" class="form-control" id="courseTitle" value="${itemName}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="courseCategory" class="form-label">Category</label>
                                        <select class="form-select" id="courseCategory" required>
                                            <option value="web-development" selected>Web Development</option>
                                            <option value="data-science">Data Science</option>
                                            <option value="business">Business</option>
                                            <option value="design">Design</option>
                                            <option value="marketing">Marketing</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="courseDescription" class="form-label">Description</label>
                                        <textarea class="form-control" id="courseDescription" rows="3" required>This comprehensive course covers all aspects of web development from front-end to back-end technologies.</textarea>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="courseImage" class="form-label">Course Image</label>
                                        <div class="card">
                                            <img src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg" class="card-img-top" alt="Course Image">
                                            <div class="card-body">
                                                <input type="file" class="form-control" id="courseImage">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="coursePrice" class="form-label">Price ($)</label>
                                        <input type="number" class="form-control" id="coursePrice" value="89.99" min="0" step="0.01" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="courseDuration" class="form-label">Duration (weeks)</label>
                                        <input type="number" class="form-control" id="courseDuration" value="12" min="1" required>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="courseStatus" class="form-label">Status</label>
                                <select class="form-select" id="courseStatus" required>
                                    <option value="active" selected>Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveCourseBtn">Save Changes</button>
                    </div>
                </div>
            </div>
        `;
    } else {
        modalContent = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">Message Student: ${itemName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="messageStudentForm">
                            <div class="mb-3">
                                <label for="messageSubject" class="form-label">Subject</label>
                                <input type="text" class="form-control" id="messageSubject" placeholder="Enter message subject" required>
                            </div>
                            <div class="mb-3">
                                <label for="messageContent" class="form-label">Message</label>
                                <textarea class="form-control" id="messageContent" rows="5" placeholder="Enter your message" required></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="sendMessageBtn">Send Message</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to save button
    const saveBtn = modal.querySelector('.btn-primary');
    saveBtn.addEventListener('click', function() {
        // In a real app, this would save the form data to the server
        // For this prototype, we'll just show a success message
        modalInstance.hide();
        if (itemType === 'course') {
            showNotification(`Course updated successfully`, 'success');
        } else {
            showNotification(`Message sent to ${itemName}`, 'success');
        }
    });
}

/**
 * Show message form
 */
function showMessageForm(studentName) {
    // Create modal for messaging student
    const modalId = 'messageStudentModal';
    
    // Remove existing modal if any
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create new modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = modalId;
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', `${modalId}Label`);
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${modalId}Label">Message Student: ${studentName}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="messageStudentForm">
                        <div class="mb-3">
                            <label for="messageSubject" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="messageSubject" placeholder="Enter message subject" required>
                        </div>
                        <div class="mb-3">
                            <label for="messageContent" class="form-label">Message</label>
                            <textarea class="form-control" id="messageContent" rows="5" placeholder="Enter your message" required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="sendMessageBtn">Send Message</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Add event listener to send button
    document.getElementById('sendMessageBtn').addEventListener('click', function() {
        const subject = document.getElementById('messageSubject').value.trim();
        const content = document.getElementById('messageContent').value.trim();
        
        if (subject && content) {
            // In a real app, this would send the message to the server
            // For this prototype, we'll just show a success message
            modalInstance.hide();
            showNotification(`Message sent to ${studentName}`, 'success');
        } else {
            alert('Please fill in all required fields');
        }
    });
}

/**
 * Confirm delete
 */
function confirmDelete(itemType, itemName, row) {
    if (confirm(`Are you sure you want to delete this ${itemType}: ${itemName}?`)) {
        // In a real app, this would call an API to delete the item
        // For this prototype, we'll just remove the row from the table
        row.remove();
        showNotification(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully`, 'success');
    }
}

/**
 * Initialize "View All" buttons
 */
function initViewAllButtons() {
    const viewAllButtons = document.querySelectorAll('.btn-primary:not(.btn-login)');
    
    viewAllButtons.forEach(button => {
        if (button.textContent.trim() === 'View All') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Determine what to view all of
                const cardTitle = this.closest('.dashboard-card').querySelector('.card-title').textContent.trim();
                
                // Handle view all based on title
                if (cardTitle === 'My Courses') {
                    // Navigate to My Courses page
                    const coursesMenuItem = document.querySelector('.menu-item:nth-child(3)');
                    coursesMenuItem.click();
                } else if (cardTitle === 'Recent Students') {
                    // Navigate to My Students page
                    const studentsMenuItem = document.querySelector('.menu-item:nth-child(8)');
                    studentsMenuItem.click();
                }
            });
        }
    });
}

/**
 * Initialize Quick Action buttons
 */
function initQuickActionButtons() {
    const quickActionButtons = document.querySelectorAll('.quick-actions .btn');
    
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get button text
            const buttonText = this.textContent.trim();
            
            // Handle button click based on text
            if (buttonText.includes('Create New Course')) {
                // Navigate to Create Course page
                const createCourseMenuItem = document.querySelector('.menu-item:nth-child(4)');
                createCourseMenuItem.click();
            } else if (buttonText.includes('Add Course Content')) {
                // Navigate to Course Content page
                const courseContentMenuItem = document.querySelector('.menu-item:nth-child(5)');
                courseContentMenuItem.click();
            } else if (buttonText.includes('Create Quiz')) {
                // Navigate to Quizzes page
                const quizzesMenuItem = document.querySelector('.menu-item:nth-child(7)');
                quizzesMenuItem.click();
            } else if (buttonText.includes('View Discussions')) {
                // Navigate to Discussions page
                const discussionsMenuItem = document.querySelector('.menu-item:nth-child(10)');
                discussionsMenuItem.click();
            }
        });
    });
}

/**
 * Initialize chart filters
 */
function initChartFilters() {
    const enrollmentDropdown = document.getElementById('enrollmentDropdown');
    
    if (enrollmentDropdown) {
        const dropdownItems = enrollmentDropdown.nextElementSibling.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update dropdown button text
                enrollmentDropdown.textContent = this.textContent;
                
                // In a real app, this would update the chart data
                // For this prototype, we'll just show a notification
                showNotification(`Enrollment chart updated to show data for ${this.textContent.toLowerCase()}`, 'info');
            });
        });
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Initialize and show toast
    const toastInstance = new bootstrap.Toast(toast, { autohide: true, delay: 3000 });
    toastInstance.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}