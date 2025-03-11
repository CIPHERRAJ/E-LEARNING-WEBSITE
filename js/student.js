/**
 * EduLearn - Professional E-Learning Platform
 * Student Dashboard JavaScript File
 */

// Student Dashboard Controller
const studentDashboard = {
    // Initialize dashboard
    init: function() {
        this.loadStudentData();
        this.setupEventListeners();
        this.loadEnrolledCourses();
        this.loadAssignments();
        this.loadCertificates();
        this.loadAchievements();
    },
    
    // Load student data from localStorage or API
    loadStudentData: function() {
        // In a real application, this would fetch data from an API
        // For this prototype, we'll use localStorage and mock data
        
        // Get current user
        const user = auth.getCurrentUser();
        if (!user) return;
        
        // Update UI with user data
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('welcomeName').textContent = user.name.split(' ')[0];
        document.querySelector('.user-avatar').textContent = user.name.charAt(0);
        
        // Load mock statistics
        this.loadStatistics();
    },
    
    // Set up event listeners for dashboard interactions
    setupEventListeners: function() {
        // Course continue buttons
        const continueButtons = document.querySelectorAll('.course-card .btn-primary');
        continueButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const courseTitle = this.closest('.course-card').querySelector('.course-card-title').textContent;
                studentDashboard.continueCourse(courseTitle);
            });
        });
        
        // Assignment buttons
        const assignmentButtons = document.querySelectorAll('table .btn-primary, table .btn-outline-primary');
        assignmentButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const assignmentTitle = this.closest('tr').querySelector('.fw-bold').textContent;
                const isStarting = this.textContent.trim() === 'Start';
                studentDashboard.handleAssignment(assignmentTitle, isStarting);
            });
        });
        
        // Certificate action buttons
        const certificateButtons = document.querySelectorAll('.action-button');
        certificateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const certificateTitle = this.closest('tr').querySelector('.fw-bold').textContent;
                const action = this.classList.contains('view') ? 'view' : 'download';
                studentDashboard.handleCertificate(certificateTitle, action);
            });
        });

        // Sidebar menu items
        const menuItems = document.querySelectorAll('.sidebar-menu .menu-item:not(.logout-btn)');
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const menuText = this.querySelector('span').textContent;
                studentDashboard.handleMenuNavigation(menuText, this);
            });
        });

        // Resume Learning button in welcome message
        const resumeLearningBtn = document.querySelector('.dashboard-card .btn-primary');
        if (resumeLearningBtn) {
            resumeLearningBtn.addEventListener('click', function(e) {
                e.preventDefault();
                studentDashboard.resumeLearning();
            });
        }

        // View All buttons
        const viewAllButtons = document.querySelectorAll('.dashboard-card .btn-sm.btn-primary');
        viewAllButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Get the section title from the card title
                const cardTitle = this.closest('.dashboard-card').querySelector('.card-title')?.textContent || 
                                  this.closest('.d-flex').querySelector('.card-title')?.textContent;
                studentDashboard.viewAllItems(cardTitle);
            });
        });

        // User dropdown menu items
        const userDropdownItems = document.querySelectorAll('.user-dropdown-item:not(.logout-btn)');
        userDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const itemText = this.querySelector('span').textContent;
                studentDashboard.handleUserMenuAction(itemText);
            });
        });
    },
    
    // Load mock statistics for the dashboard
    loadStatistics: function() {
        // In a real application, these would be fetched from an API
        const stats = {
            enrolledCourses: 5,
            overallProgress: 68,
            pendingAssignments: 3,
            certificatesEarned: 2
        };
        
        // Update statistics in the UI
        const statElements = document.querySelectorAll('.stat-info h3');
        if (statElements.length >= 4) {
            statElements[0].textContent = stats.enrolledCourses;
            statElements[1].textContent = stats.overallProgress + '%';
            statElements[2].textContent = stats.pendingAssignments;
            statElements[3].textContent = stats.certificatesEarned;
        }
    },
    
    // Load enrolled courses
    loadEnrolledCourses: function() {
        // In a real application, this would fetch courses from an API
        // For this prototype, we'll use mock data
        
        // Mock courses are already in the HTML
        // This function would normally populate the course cards dynamically
        
        console.log('Enrolled courses loaded');
    },
    
    // Load assignments
    loadAssignments: function() {
        // In a real application, this would fetch assignments from an API
        // For this prototype, we'll use mock data
        
        // Mock assignments are already in the HTML
        // This function would normally populate the assignments table dynamically
        
        console.log('Assignments loaded');
    },
    
    // Load certificates
    loadCertificates: function() {
        // In a real application, this would fetch certificates from an API
        // For this prototype, we'll use mock data
        
        // Mock certificates are already in the HTML
        // This function would normally populate the certificates table dynamically
        
        console.log('Certificates loaded');
    },
    
    // Load achievements
    loadAchievements: function() {
        // In a real application, this would fetch achievements from an API
        // For this prototype, we'll use mock data
        
        // Mock achievements are already in the HTML
        // This function would normally populate the achievements section dynamically
        
        console.log('Achievements loaded');
    },
    
    // Handle continuing a course
    continueCourse: function(courseTitle) {
        console.log(`Continuing course: ${courseTitle}`);
        
        // Create a modal to show course content
        const modalId = 'courseModal';
        let modal = document.getElementById(modalId);
        
        // If modal doesn't exist, create it
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal fade';
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', 'courseModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            
            modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="courseModalLabel">${courseTitle}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="course-content">
                                <div class="mb-4">
                                    <h6>Course Progress</h6>
                                    <div class="progress mb-2">
                                        <div class="progress-bar bg-primary" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <span class="small">75% Complete</span>
                                        <span class="small">Estimated time left: 5h 30m</span>
                                    </div>
                                </div>
                                
                                <div class="mb-4">
                                    <h6>Continue from where you left off</h6>
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">Module 5: Advanced Concepts</h5>
                                            <p class="card-text">Learn about advanced concepts and techniques in this comprehensive module.</p>
                                            <a href="#" class="btn btn-primary">Continue Learning</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h6>Course Modules</h6>
                                    <div class="list-group">
                                        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            Module 1: Introduction
                                            <span class="badge bg-success rounded-pill">Completed</span>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            Module 2: Fundamentals
                                            <span class="badge bg-success rounded-pill">Completed</span>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            Module 3: Intermediate Concepts
                                            <span class="badge bg-success rounded-pill">Completed</span>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            Module 4: Advanced Topics
                                            <span class="badge bg-warning rounded-pill">In Progress</span>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            Module 5: Advanced Concepts
                                            <span class="badge bg-secondary rounded-pill">Not Started</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Continue Learning</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        } else {
            // Update modal title if it already exists
            modal.querySelector('.modal-title').textContent = courseTitle;
        }
        
        // Show the modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    },
    
    // Handle assignment actions
    handleAssignment: function(assignmentTitle, isStarting) {
        const action = isStarting ? 'Starting' : 'Continuing';
        console.log(`${action} assignment: ${assignmentTitle}`);
        
        // Create a modal to show assignment details
        const modalId = 'assignmentModal';
        let modal = document.getElementById(modalId);
        
        // If modal doesn't exist, create it
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal fade';
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', 'assignmentModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            
            modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="assignmentModalLabel">${assignmentTitle}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="assignment-content">
                                <div class="mb-4">
                                    <div class="d-flex justify-content-between mb-3">
                                        <span class="badge ${isStarting ? 'bg-secondary' : 'bg-warning'} p-2">
                                            ${isStarting ? 'Not Started' : 'In Progress'}
                                        </span>
                                        <span class="text-danger fw-bold">Due: ${isStarting ? 'May 25, 2023' : 'Tomorrow, 11:59 PM'}</span>
                                    </div>
                                    
                                    <h6>Assignment Description</h6>
                                    <p>
                                        ${isStarting ? 
                                            'Create a fully responsive website that adapts to different screen sizes. The website should include a navigation menu, hero section, features section, and contact form.' : 
                                            'Build a complete web application using JavaScript. The application should include user authentication, data storage, and at least three interactive features.'}
                                    </p>
                                </div>
                                
                                <div class="mb-4">
                                    <h6>Requirements</h6>
                                    <ul>
                                        <li>Requirement 1: ${isStarting ? 'Use HTML5 semantic elements' : 'Implement user authentication'}</li>
                                        <li>Requirement 2: ${isStarting ? 'Implement responsive design using media queries' : 'Use local storage for data persistence'}</li>
                                        <li>Requirement 3: ${isStarting ? 'Include a responsive navigation menu' : 'Create at least three interactive features'}</li>
                                        <li>Requirement 4: ${isStarting ? 'Optimize for mobile, tablet, and desktop' : 'Implement form validation'}</li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h6>Submission</h6>
                                    <p>Submit your completed assignment by uploading your files or providing a link to your repository.</p>
                                    <div class="mb-3">
                                        <label for="assignmentFile" class="form-label">Upload Files</label>
                                        <input class="form-control" type="file" id="assignmentFile" multiple>
                                    </div>
                                    <div class="mb-3">
                                        <label for="repositoryLink" class="form-label">Repository Link</label>
                                        <input type="text" class="form-control" id="repositoryLink" placeholder="https://github.com/yourusername/yourrepository">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">${isStarting ? 'Start Assignment' : 'Continue Assignment'}</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        } else {
            // Update modal title and content if it already exists
            modal.querySelector('.modal-title').textContent = assignmentTitle;
            modal.querySelector('.badge').className = `badge ${isStarting ? 'bg-secondary' : 'bg-warning'} p-2`;
            modal.querySelector('.badge').textContent = isStarting ? 'Not Started' : 'In Progress';
            modal.querySelector('.btn-primary').textContent = isStarting ? 'Start Assignment' : 'Continue Assignment';
        }
        
        // Show the modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    },
    
    // Handle certificate actions
    handleCertificate: function(certificateTitle, action) {
        console.log(`${action} certificate: ${certificateTitle}`);
        
        if (action === 'view') {
            // Create a modal to view the certificate
            const modalId = 'certificateModal';
            let modal = document.getElementById(modalId);
            
            // If modal doesn't exist, create it
            if (!modal) {
                modal = document.createElement('div');
                modal.id = modalId;
                modal.className = 'modal fade';
                modal.setAttribute('tabindex', '-1');
                modal.setAttribute('aria-labelledby', 'certificateModalLabel');
                modal.setAttribute('aria-hidden', 'true');
                
                modal.innerHTML = `
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="certificateModalLabel">${certificateTitle}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <div class="certificate-content p-4" style="border: 10px solid #f8f9fa; position: relative;">
                                    <div style="border: 2px solid #4361ee; padding: 40px;">
                                        <div style="position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; border: 2px solid #4361ee; pointer-events: none;"></div>
                                        <h1 style="font-family: 'Times New Roman', serif; color: #4361ee; font-size: 36px; margin-bottom: 20px;">Certificate of Completion</h1>
                                        <p style="font-size: 18px; margin-bottom: 30px;">This is to certify that</p>
                                        <h2 style="font-family: 'Brush Script MT', cursive; font-size: 40px; margin-bottom: 30px;">Student User</h2>
                                        <p style="font-size: 18px; margin-bottom: 30px;">has successfully completed the course</p>
                                        <h3 style="font-size: 24px; margin-bottom: 30px;">${certificateTitle}</h3>
                                        <p style="font-size: 18px; margin-bottom: 40px;">with a grade of <strong>A</strong></p>
                                        <div class="row">
                                            <div class="col-6 text-center">
                                                <p style="border-top: 1px solid #000; display: inline-block; padding-top: 10px; font-size: 16px;">Instructor Signature</p>
                                            </div>
                                            <div class="col-6 text-center">
                                                <p style="border-top: 1px solid #000; display: inline-block; padding-top: 10px; font-size: 16px;">Date Issued</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="studentDashboard.handleCertificate('${certificateTitle}', 'download')">Download</button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
            } else {
                // Update modal title if it already exists
                modal.querySelector('.modal-title').textContent = certificateTitle;
                modal.querySelector('.certificate-content h3').textContent = certificateTitle;
                modal.querySelector('.btn-primary').setAttribute('onclick', `studentDashboard.handleCertificate('${certificateTitle}', 'download')`);
            }
            
            // Show the modal
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        } else {
            // Create and trigger a download
            const certificateContent = `
                <html>
                <head>
                    <title>${certificateTitle} Certificate</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            padding: 40px;
                        }
                        .certificate {
                            border: 10px solid #f8f9fa;
                            padding: 20px;
                            position: relative;
                        }
                        .certificate-inner {
                            border: 2px solid #4361ee;
                            padding: 40px;
                        }
                        .certificate-border {
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            right: 10px;
                            bottom: 10px;
                            border: 2px solid #4361ee;
                            pointer-events: none;
                        }
                        h1 {
                            font-family: 'Times New Roman', serif;
                            color: #4361ee;
                            font-size: 36px;
                            margin-bottom: 20px;
                        }
                        h2 {
                            font-family: cursive;
                            font-size: 40px;
                            margin-bottom: 30px;
                        }
                        h3 {
                            font-size: 24px;
                            margin-bottom: 30px;
                        }
                        p {
                            font-size: 18px;
                            margin-bottom: 30px;
                        }
                        .signatures {
                            display: flex;
                            justify-content: space-around;
                            margin-top: 40px;
                        }
                        .signature {
                            border-top: 1px solid #000;
                            display: inline-block;
                            padding-top: 10px;
                            font-size: 16px;
                        }
                    </style>
                </head>
                <body>
                    <div class="certificate">
                        <div class="certificate-inner">
                            <div class="certificate-border"></div>
                            <h1>Certificate of Completion</h1>
                            <p>This is to certify that</p>
                            <h2>Student User</h2>
                            <p>has successfully completed the course</p>
                            <h3>${certificateTitle}</h3>
                            <p>with a grade of <strong>A</strong></p>
                            <div class="signatures">
                                <div>
                                    <p class="signature">Instructor Signature</p>
                                </div>
                                <div>
                                    <p class="signature">Date Issued</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            // Create a Blob with the certificate content
            const blob = new Blob([certificateContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            // Create a temporary link and trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = `${certificateTitle.replace(/\s+/g, '_')}_Certificate.html`;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
            
            // Show a success message
            this.showNotification(`Certificate "${certificateTitle}" downloaded successfully!`, 'success');
        }
    },
    
    // Handle sidebar menu navigation
    handleMenuNavigation: function(menuText, menuItem) {
        console.log(`Navigating to: ${menuText}`);
        
        // Remove active class from all menu items
        document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked menu item
        menuItem.classList.add('active');
        
        // Handle different menu items
        switch(menuText) {
            case 'Dashboard':
                // Already on dashboard, just show notification
                this.showNotification('You are already on the Dashboard', 'info');
                break;
            case 'My Courses':
                this.viewAllItems('Continue Learning');
                break;
            case 'Browse Courses':
                this.showCoursesBrowser();
                break;
            case 'Wishlist':
                this.showWishlist();
                break;
            case 'Certificates':
                this.viewAllItems('Your Certificates');
                break;
            case 'Homework':
            case 'Quizzes':
                this.viewAllItems('Upcoming Assignments');
                break;
            case 'My Progress':
                this.showProgressDetails();
                break;
            case 'Discussions':
            case 'Study Groups':
            case 'Messages':
                this.showCommunitySection(menuText);
                break;
            case 'Profile':
            case 'Notifications':
                this.handleUserMenuAction(menuText);
                break;
            default:
                this.showNotification(`Navigating to ${menuText} section`, 'info');
        }
    },
    
    // Resume learning from the last course
    resumeLearning: function() {
        console.log('Resuming learning');
        
        // Get the first course title from the continue learning section
        const firstCourseCard = document.querySelector('.course-card');
        if (firstCourseCard) {
            const courseTitle = firstCourseCard.querySelector('.course-card-title').textContent;
            this.continueCourse(courseTitle);
        } else {
            this.showNotification('No courses available to resume', 'warning');
        }
    },
    
    // View all items for a specific section
    viewAllItems: function(sectionTitle) {
        console.log(`Viewing all items for: ${sectionTitle}`);
        
        let modalTitle = '';
        let modalContent = '';
        
        // Determine content based on section title
        switch(sectionTitle.trim()) {
            case 'Continue Learning':
                modalTitle = 'All Enrolled Courses';
                modalContent = this.generateCoursesListHTML();
                break;
            case 'Upcoming Assignments':
                modalTitle = 'All Assignments';
                modalContent = this.generateAssignmentsListHTML();
                break;
            case 'Your Achievements':
                modalTitle = 'All Achievements';
                modalContent = this.generateAchievementsListHTML();
                break;
            case 'Your Certificates':
                modalTitle = 'All Certificates';
                modalContent = this.generateCertificatesListHTML();
                break;
            default:
                modalTitle = `All ${sectionTitle}`;
                modalContent = `<p>This would display all ${sectionTitle.toLowerCase()} in a real application.</p>`;
        }
        
        // Create and show modal
        this.showContentModal(modalTitle, modalContent);
    },
    
    // Handle user menu actions (Profile, Settings)
    handleUserMenuAction: function(actionText) {
        console.log(`Handling user menu action: ${actionText}`);
        
        // Close dropdown menu if open
        const userDropdownMenu = document.getElementById('userDropdownMenu');
        if (userDropdownMenu && userDropdownMenu.classList.contains('show')) {
            userDropdownMenu.classList.remove('show');
        }
        
        // Handle different actions
        switch(actionText) {
            case 'Profile':
                this.showUserProfile();
                break;
            case 'Settings':
                this.showUserSettings();
                break;
            case 'Notifications':
                this.showUserNotifications();
                break;
            default:
                this.showNotification(`Handling ${actionText} action`, 'info');
        }
    },
    
    // Show course browser
    showCoursesBrowser: function() {
        const modalContent = `
            <div class="mb-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search courses...">
                    <button class="btn btn-primary" type="button">Search</button>
                </div>
            </div>
            
            <div class="mb-4">
                <h6>Popular Categories</h6>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    <button class="btn btn-sm btn-outline-primary">Web Development</button>
                    <button class="btn btn-sm btn-outline-primary">Data Science</button>
                    <button class="btn btn-sm btn-outline-primary">Mobile Development</button>
                    <button class="btn btn-sm btn-outline-primary">UI/UX Design</button>
                    <button class="btn btn-sm btn-outline-primary">Machine Learning</button>
                </div>
            </div>
            
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card h-100">
                        <img src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg" class="card-img-top" alt="Course">
                        <div class="card-body">
                            <h5 class="card-title">Python for Data Science</h5>
                            <p class="card-text">Learn Python programming for data analysis and visualization.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-primary fw-bold">$49.99</span>
                                <button class="btn btn-sm btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100">
                        <img src="https://img.freepik.com/free-photo/html-system-website-concept_23-2150376770.jpg" class="card-img-top" alt="Course">
                        <div class="card-body">
                            <h5 class="card-title">React.js Masterclass</h5>
                            <p class="card-text">Build modern web applications with React.js and Redux.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-primary fw-bold">$59.99</span>
                                <button class="btn btn-sm btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showContentModal('Browse Courses', modalContent);
    },
    
    // Show wishlist
    showWishlist: function() {
        const modalContent = `
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg" alt="Course" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                                    <div>
                                        <div class="fw-bold">Python for Data Science</div>
                                        <div class="text-muted small">Learn Python programming for data analysis</div>
                                    </div>
                                </div>
                            </td>
                            <td>John Smith</td>
                            <td>$49.99</td>
                            <td>
                                <button class="btn btn-sm btn-primary">Enroll Now</button>
                                <button class="btn btn-sm btn-outline-danger">Remove</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="https://img.freepik.com/free-photo/html-system-website-concept_23-2150376770.jpg" alt="Course" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                                    <div>
                                        <div class="fw-bold">React.js Masterclass</div>
                                        <div class="text-muted small">Build modern web applications with React.js</div>
                                    </div>
                                </div>
                            </td>
                            <td>Sarah Johnson</td>
                            <td>$59.99</td>
                            <td>
                                <button class="btn btn-sm btn-primary">Enroll Now</button>
                                <button class="btn btn-sm btn-outline-danger">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        
        this.showContentModal('Your Wishlist', modalContent);
    },
    
    // Show progress details
    showProgressDetails: function() {
        const modalContent = `
            <div class="mb-4">
                <h6>Overall Progress</h6>
                <div class="progress mb-2">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: 68%;" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="small">68% Complete</span>
                    <span class="small">32% Remaining</span>
                </div>
            </div>
            
            <div class="mb-4">
                <h6>Learning Activity</h6>
                <canvas id="learningActivityChart" height="200"></canvas>
            </div>
            
            <div class="mb-4">
                <h6>Course Progress</h6>
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between mb-2">
                            <h6 class="mb-0">Complete Web Development Bootcamp</h6>
                            <span class="badge bg-primary">75%</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-primary" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between mb-2">
                            <h6 class="mb-0">Advanced JavaScript Concepts</h6>
                            <span class="badge bg-primary">45%</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-primary" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between mb-2">
                            <h6 class="mb-0">HTML & CSS Masterclass</h6>
                            <span class="badge bg-primary">90%</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-primary" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showContentModal('Learning Progress', modalContent);
        
        // Initialize chart if canvas exists
        setTimeout(() => {
            const canvas = document.getElementById('learningActivityChart');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Hours Studied',
                            data: [2.5, 1.8, 3.2, 0.5, 1.2, 4.5, 3.8],
                            backgroundColor: '#4361ee'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Hours'
                                }
                            }
                        }
                    }
                });
            }
        }, 500);
    },
    
    // Show community section
    showCommunitySection: function(sectionType) {
        let modalContent = '';
        
        switch(sectionType) {
            case 'Discussions':
                modalContent = `
                    <div class="mb-4">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search discussions...">
                            <button class="btn btn-primary" type="button">Search</button>
                        </div>
                    </div>
                    
                    <div class="list-group mb-4">
                        <a href="#" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1">How to optimize React performance?</h6>
                                <small class="text-muted">3 days ago</small>
                            </div>
                            <p class="mb-1">I'm working on a large React application and experiencing performance issues...</p>
                            <small class="text-muted">12 replies • Web Development</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1">Best practices for responsive design in 2023</h6>
                                <small class="text-muted">1 week ago</small>
                            </div>
                            <p class="mb-1">What are the current best practices for creating responsive websites?</p>
                            <small class="text-muted">8 replies • HTML & CSS</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1">JavaScript async/await vs Promises</h6>
                                <small class="text-muted">2 weeks ago</small>
                            </div>
                            <p class="mb-1">When should I use async/await and when should I stick with Promises?</p>
                            <small class="text-muted">15 replies • JavaScript</small>
                        </a>
                    </div>
                    
                    <button class="btn btn-primary">Start New Discussion</button>
                `;
                break;
            case 'Study Groups':
                modalContent = `
                    <div class="mb-4">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search study groups...">
                            <button class="btn btn-primary" type="button">Search</button>
                        </div>
                    </div>
                    
                    <div class="row g-4 mb-4">
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">JavaScript Study Group</h5>
                                    <p class="card-text">Weekly meetings to discuss JavaScript concepts and work on projects together.</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="badge bg-primary">10 members</span>
                                        <button class="btn btn-sm btn-primary">Join Group</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Web Development Projects</h5>
                                    <p class="card-text">Collaborate on real-world web development projects with other students.</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="badge bg-primary">8 members</span>
                                        <button class="btn btn-sm btn-primary">Join Group</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary">Create New Study Group</button>
                `;
                break;
            case 'Messages':
                modalContent = `
                    <div class="row g-0">
                        <div class="col-md-4 border-end">
                            <div class="list-group list-group-flush">
                                <a href="#" class="list-group-item list-group-item-action active">
                                    <div class="d-flex align-items-center">
                                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">
                                        <div>
                                            <div class="fw-bold">John Smith</div>
                                            <div class="small text-truncate" style="max-width: 150px;">Hey, do you have time to discuss the project?</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex align-items-center">
                                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">
                                        <div>
                                            <div class="fw-bold">Sarah Johnson</div>
                                            <div class="small text-truncate" style="max-width: 150px;">Thanks for your help with the assignment!</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="p-3 border-bottom">
                                <div class="d-flex align-items-center">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">
                                    <div class="fw-bold">John Smith</div>
                                </div>
                            </div>
                            <div class="p-3" style="height: 300px; overflow-y: auto;">
                                <div class="d-flex mb-3">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="rounded-circle align-self-start" style="width: 30px; height: 30px; margin-right: 10px;">
                                    <div class="bg-light p-2 rounded">
                                        <div class="mb-1">Hey, do you have time to discuss the project?</div>
                                        <div class="small text-muted">10:30 AM</div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row-reverse mb-3">
                                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" class="rounded-circle align-self-start" style="width: 30px; height: 30px; margin-left: 10px;">
                                    <div class="bg-primary text-white p-2 rounded">
                                        <div class="mb-1">Sure, what do you want to discuss?</div>
                                        <div class="small text-white-50">10:32 AM</div>
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="rounded-circle align-self-start" style="width: 30px; height: 30px; margin-right: 10px;">
                                    <div class="bg-light p-2 rounded">
                                        <div class="mb-1">I'm having trouble with the API integration part. Can you help me understand how to implement it?</div>
                                        <div class="small text-muted">10:35 AM</div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-3 border-top">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Type a message...">
                                    <button class="btn btn-primary" type="button">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            default:
                modalContent = `<p>This would display the ${sectionType} section in a real application.</p>`;
        }
        
        this.showContentModal(sectionType, modalContent);
    },
    
    // Show user profile
    showUserProfile: function() {
        const user = auth.getCurrentUser();
        
        const modalContent = `
            <div class="row">
                <div class="col-md-4 text-center mb-4 mb-md-0">
                    <div class="mb-3">
                        <div class="user-avatar mx-auto" style="width: 100px; height: 100px; font-size: 2.5rem;">${user.name.charAt(0)}</div>
                    </div>
                    <h5>${user.name}</h5>
                    <p class="text-muted">${user.email}</p>
                    <button class="btn btn-sm btn-primary">Change Avatar</button>
                </div>
                <div class="col-md-8">
                    <form>
                        <div class="mb-3">
                            <label for="profileName" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="profileName" value="${user.name}">
                        </div>
                        <div class="mb-3">
                            <label for="profileEmail" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="profileEmail" value="${user.email}">
                        </div>
                        <div class="mb-3">
                            <label for="profileBio" class="form-label">Bio</label>
                            <textarea class="form-control" id="profileBio" rows="3">Student passionate about web development and programming.</textarea>
                        </div>
                        <div class="mb-3">
                            <label for="profileInterests" class="form-label">Interests</label>
                            <input type="text" class="form-control" id="profileInterests" value="Web Development, JavaScript, React, UI/UX Design">
                        </div>
                        <button type="button" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        `;
        
        this.showContentModal('Your Profile', modalContent);
    },
    
    // Show user settings
    showUserSettings: function() {
        const modalContent = `
            <div class="mb-4">
                <h6>Account Settings</h6>
                <div class="list-group mb-3">
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Email Notifications</h6>
                                <p class="text-muted mb-0 small">Receive email notifications for course updates, assignments, and messages</p>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="emailNotifications" checked>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Two-Factor Authentication</h6>
                                <p class="text-muted mb-0 small">Add an extra layer of security to your account</p>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="twoFactorAuth">
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Dark Mode</h6>
                                <p class="text-muted mb-0 small">Switch between light and dark theme</p>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="darkMode">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-4">
                <h6>Privacy Settings</h6>
                <div class="list-group mb-3">
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Profile Visibility</h6>
                                <p class="text-muted mb-0 small">Control who can see your profile information</p>
                            </div>
                            <select class="form-select" style="width: auto;">
                                <option>Everyone</option>
                                <option selected>Course Members</option>
                                <option>Only Me</option>
                            </select>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Learning Activity</h6>
                                <p class="text-muted mb-0 small">Share your learning progress with others</p>
                            </div>
                            <select class="form-select" style="width: auto;">
                                <option>Everyone</option>
                                <option selected>Course Members</option>
                                <option>Only Me</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h6>Security</h6>
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">Change Password</h6>
                            <p class="text-muted mb-0 small">Update your password regularly for better security</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">Connected Accounts</h6>
                            <p class="text-muted mb-0 small">Manage your connected social accounts and services</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-danger">
                        <div>
                            <h6 class="mb-0 text-danger">Delete Account</h6>
                            <p class="text-muted mb-0 small">Permanently delete your account and all data</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        `;
        
        this.showContentModal('Settings', modalContent);
    },
    
    // Show user notifications
    showUserNotifications: function() {
        const modalContent = `
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="mb-0">Recent Notifications</h6>
                    <button class="btn btn-sm btn-outline-primary">Mark All as Read</button>
                </div>
                <div class="list-group">
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New assignment added: JavaScript Final Project</h6>
                            <small class="text-primary">New</small>
                        </div>
                        <p class="mb-1">A new assignment has been added to your Advanced JavaScript Concepts course.</p>
                        <small class="text-muted">2 hours ago</small>
                    </div>
                    <div class="list-group-item list-group-item-action unread">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Your assignment has been graded</h6>
                            <small class="text-primary">New</small>
                        </div>
                        <p class="mb-1">Your HTML & CSS Assignment has been graded. You received an A.</p>
                        <small class="text-muted">Yesterday</small>
                    </div>
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">New course material available</h6>
                            <small></small>
                        </div>
                        <p class="mb-1">New lectures have been added to the Complete Web Development Bootcamp.</p>
                        <small class="text-muted">3 days ago</small>
                    </div>
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">Discussion reply: How to optimize React performance?</h6>
                            <small></small>
                        </div>
                        <p class="mb-1">John Smith replied to your discussion post.</p>
                        <small class="text-muted">1 week ago</small>
                    </div>
                </div>
            </div>
            
            <div>
                <h6>Notification Settings</h6>
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Course Updates</h6>
                                <p class="text-muted mb-0 small">Notifications for new course materials and announcements</p>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="courseUpdates" checked>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Assignment Reminders</h6>
                                <p class="text-muted mb-0 small">Notifications for upcoming assignment deadlines</p>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="assignmentReminders" checked>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Discussion Replies</h6>
                                <p class="text-muted mb-0 small">Notifications when someone replies to your discussions</p>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="discussionReplies" checked>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">Messages</h6>
                                <p class="text-muted mb-0 small">Notifications for new messages</p>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="messages" checked>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showContentModal('Notifications', modalContent);
    },
    
    // Generate HTML for courses list
    generateCoursesListHTML: function() {
        return `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="course-card">
                        <img src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg" alt="Course" class="img-fluid course-card-img w-100">
                        <div class="course-card-body">
                            <h5 class="course-card-title">Complete Web Development Bootcamp</h5>
                            <div class="course-card-instructor">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Instructor" class="instructor-avatar">
                                <span class="text-muted">John Smith</span>
                            </div>
                            <div class="course-card-progress">
                                <div class="d-flex justify-content-between mb-1">
                                    <span class="small">Progress</span>
                                    <span class="small text-primary fw-bold">75%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="course-card-footer">
                                <div class="course-card-rating">
                                    <i class="fas fa-star"></i>
                                    <span>4.8</span>
                                </div>
                                <a href="#" class="btn btn-sm btn-primary">Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="course-card">
                        <img src="https://img.freepik.com/free-photo/javascript-programming-code-abstract-technology-background_272306-155.jpg" alt="Course" class="img-fluid course-card-img w-100">
                        <div class="course-card-body">
                            <h5 class="course-card-title">Advanced JavaScript Concepts</h5>
                            <div class="course-card-instructor">
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Instructor" class="instructor-avatar">
                                <span class="text-muted">Sarah Johnson</span>
                            </div>
                            <div class="course-card-progress">
                                <div class="d-flex justify-content-between mb-1">
                                    <span class="small">Progress</span>
                                    <span class="small text-primary fw-bold">45%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="course-card-footer">
                                <div class="course-card-rating">
                                    <i class="fas fa-star"></i>
                                    <span>4.9</span>
                                </div>
                                <a href="#" class="btn btn-sm btn-primary">Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="course-card">
                        <img src="https://img.freepik.com/free-photo/html-system-website-concept_23-2150376770.jpg" alt="Course" class="img-fluid course-card-img w-100">
                        <div class="course-card-body">
                            <h5 class="course-card-title">HTML & CSS Masterclass</h5>
                            <div class="course-card-instructor">
                                <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Instructor" class="instructor-avatar">
                                <span class="text-muted">Michael Brown</span>
                            </div>
                            <div class="course-card-progress">
                                <div class="d-flex justify-content-between mb-1">
                                    <span class="small">Progress</span>
                                    <span class="small text-primary fw-bold">90%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="course-card-footer">
                                <div class="course-card-rating">
                                    <i class="fas fa-star"></i>
                                    <span>4.7</span>
                                </div>
                                <a href="#" class="btn btn-sm btn-primary">Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="course-card">
                        <img src="https://img.freepik.com/free-photo/programming-background-collage_23-2150812858.jpg" alt="Course" class="img-fluid course-card-img w-100">
                        <div class="course-card-body">
                            <h5 class="course-card-title">React Native Mobile Development</h5>
                            <div class="course-card-instructor">
                                <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="Instructor" class="instructor-avatar">
                                <span class="text-muted">Emily Davis</span>
                            </div>
                            <div class="course-card-progress">
                                <div class="d-flex justify-content-between mb-1">
                                    <span class="small">Progress</span>
                                    <span class="small text-primary fw-bold">15%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 15%;" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="course-card-footer">
                                <div class="course-card-rating">
                                    <i class="fas fa-star"></i>
                                    <span>4.6</span>
                                </div>
                                <a href="#" class="btn btn-sm btn-primary">Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Generate HTML for assignments list
    generateAssignmentsListHTML: function() {
        return `
            <div class="table-responsive">
                <table class="dashboard-table">
                    <thead>
                        <tr>
                            <th>Assignment</th>
                            <th>Course</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="fw-bold">JavaScript Final Project</div>
                                <div class="text-muted small">Build a complete web application</div>
                            </td>
                            <td>Advanced JavaScript Concepts</td>
                            <td>
                                <div class="text-danger fw-bold">Tomorrow, 11:59 PM</div>
                            </td>
                            <td><span class="badge-status badge-in-progress">In Progress</span></td>
                            <td>
                                <a href="#" class="btn btn-sm btn-primary">Continue</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="fw-bold">Responsive Design Challenge</div>
                                <div class="text-muted small">Create a responsive website</div>
                            </td>
                            <td>HTML & CSS Masterclass</td>
                            <td>
                                <div>May 25, 2023</div>
                            </td>
                            <td><span class="badge-status badge-not-started">Not Started</span></td>
                            <td>
                                <a href="#" class="btn btn-sm btn-outline-primary">Start</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="fw-bold">API Integration Quiz</div>
                                <div class="text-muted small">Test your knowledge of RESTful APIs</div>
                            </td>
                            <td>Complete Web Development Bootcamp</td>
                            <td>
                                <div>May 30, 2023</div>
                            </td>
                            <td><span class="badge-status badge-not-started">Not Started</span></td>
                            <td>
                                <a href="#" class="btn btn-sm btn-outline-primary">Start</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="fw-bold">Mobile App UI Design</div>
                                <div class="text-muted small">Design a mobile app interface</div>
                            </td>
                            <td>React Native Mobile Development</td>
                            <td>
                                <div>June 5, 2023</div>
                            </td>
                            <td><span class="badge-status badge-not-started">Not Started</span></td>
                            <td>
                                <a href="#" class="btn btn-sm btn-outline-primary">Start</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="fw-bold">Database Design Project</div>
                                <div class="text-muted small">Design a database schema for an e-commerce platform</div>
                            </td>
                            <td>Complete Web Development Bootcamp</td>
                            <td>
                                <div>June 10, 2023</div>
                            </td>
                            <td><span class="badge-status badge-not-started">Not Started</span></td>
                            <td>
                                <a href="#" class="btn btn-sm btn-outline-primary">Start</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },
    
    // Generate HTML for achievements list
    generateAchievementsListHTML: function() {
        return `
            <div class="row g-4">
                <div class="col-md-6 col-lg-4">
                    <div class="achievement-badge">
                        <div class="badge-icon">
                            <i class="fas fa-award"></i>
                        </div>
                        <h5 class="badge-title">Fast Learner</h5>
                        <p class="badge-description">Completed 5 courses in record time</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="achievement-badge">
                        <div class="badge-icon">
                            <i class="fas fa-fire"></i>
                        </div>
                        <h5 class="badge-title">7-Day Streak</h5>
                        <p class="badge-description">Studied for 7 consecutive days</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="achievement-badge">
                        <div class="badge-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <h5 class="badge-title">Perfect Score</h5>
                        <p class="badge-description">Scored 100% on a quiz</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="achievement-badge">
                        <div class="badge-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <h5 class="badge-title">Active Participant</h5>
                        <p class="badge-description">Posted 10+ comments in discussions</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="achievement-badge">
                        <div class="badge-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <h5 class="badge-title">Bookworm</h5>
                        <p class="badge-description">Read all course materials</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="achievement-badge">
                        <div class="badge-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h5 class="badge-title">Team Player</h5>
                        <p class="badge-description">Participated in 3 study groups</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Generate HTML for certificates list
    generateCertificatesListHTML: function() {
        return `
            <div class="table-responsive">
                <table class="dashboard-table">
                    <thead>
                        <tr>
                            <th>Certificate</th>
                            <th>Course</th>
                            <th>Issued Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="fw-bold">Web Development Fundamentals</div>
                                <div class="text-muted small">Certificate of Completion</div>
                            </td>
                            <td>Complete Web Development Bootcamp</td>
                            <td>April 15, 2023</td>
                            <td>
                                <div class="action-buttons">
                                    <div class="action-button view" title="View">
                                        <i class="fas fa-eye"></i>
                                    </div>
                                    <div class="action-button download" title="Download">
                                        <i class="fas fa-download"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="fw-bold">HTML & CSS Mastery</div>
                                <div class="text-muted small">Certificate of Completion</div>
                            </td>
                            <td>HTML & CSS Masterclass</td>
                            <td>March 22, 2023</td>
                            <td>
                                <div class="action-buttons">
                                    <div class="action-button view" title="View">
                                        <i class="fas fa-eye"></i>
                                    </div>
                                    <div class="action-button download" title="Download">
                                        <i class="fas fa-download"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="fw-bold">JavaScript Essentials</div>
                                <div class="text-muted small">Certificate of Completion</div>
                            </td>
                            <td>Advanced JavaScript Concepts</td>
                            <td>February 10, 2023</td>
                            <td>
                                <div class="action-buttons">
                                    <div class="action-button view" title="View">
                                        <i class="fas fa-eye"></i>
                                    </div>
                                    <div class="action-button download" title="Download">
                                        <i class="fas fa-download"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },
    
    // Show content in a modal
    showContentModal: function(title, content) {
        const modalId = 'contentModal';
        let modal = document.getElementById(modalId);
        
        // If modal doesn't exist, create it
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal fade';
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', 'contentModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            
            modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="contentModalLabel">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${content}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        } else {
            // Update modal title and content if it already exists
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-body').innerHTML = content;
        }
        
        // Show the modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    },
    
    // Show notification
    showNotification: function(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `toast align-items-center text-white bg-${type} border-0`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        notification.setAttribute('aria-atomic', 'true');
        
        notification.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        // Add to the DOM
        const toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            const container = document.createElement('div');
            container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            container.style.zIndex = '1050';
            document.body.appendChild(container);
            container.appendChild(notification);
        } else {
            toastContainer.appendChild(notification);
        }
        
        // Show the notification
        const toast = new bootstrap.Toast(notification);
        toast.show();
        
        // Remove after it's hidden
        notification.addEventListener('hidden.bs.toast', function() {
            notification.remove();
        });
    }
};

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and is a student
    const checkAuth = () => {
        const user = auth.getCurrentUser();
        
        // For development: Create a mock user if not logged in
        if (!user) {
            const mockUser = {
                id: 'mock123',
                name: 'Student User',
                email: 'student@example.com',
                role: 'student'
            };
            localStorage.setItem('edulearn_user', JSON.stringify(mockUser));
            localStorage.setItem('edulearn_token', 'mock-token');
            // Initialize the dashboard with mock user
            studentDashboard.init();
            return;
        }
        
        if (user.role !== 'student') {
            // Redirect to login page if not a student
            window.location.href = '../login.html';
        } else {
            // Initialize the dashboard
            studentDashboard.init();
        }
    };
    
    // Call auth check
    checkAuth();
});