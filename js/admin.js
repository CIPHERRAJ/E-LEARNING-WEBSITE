/**
 * EduLearn - Admin Dashboard JavaScript
 * This file contains all the functionality specific to the admin dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin dashboard components
    initAdminAuth();
    initSidebarNavigation();
    initUserDropdown();
    initActionButtons();
    initViewAllButtons();
    initChartFilters();
    initRegisteredUsersSection();
});
/**
 * Initialize the Registered Users section
 */
function initRegisteredUsersSection() {
    // Add event listener for the Refresh List button
    const refreshUsersBtn = document.getElementById('refreshUsersBtn');
    if (refreshUsersBtn) {
        refreshUsersBtn.addEventListener('click', function() {
            loadRegisteredUsers();
        });
    }
    
    // Initial load of registered users
    loadRegisteredUsers();
    
    // Add event delegation for promote buttons
    const registeredUsersTable = document.getElementById('registeredUsersTable');
    if (registeredUsersTable) {
        registeredUsersTable.addEventListener('click', function(e) {
            // Check if the clicked element is a promote button or its child
            const promoteBtn = e.target.closest('.promote-btn');
            if (promoteBtn) {
                const userId = promoteBtn.getAttribute('data-user-id');
                const userName = promoteBtn.getAttribute('data-user-name');
                const userEmail = promoteBtn.getAttribute('data-user-email');
                
                promoteUserToInstructor(userId, userName, userEmail, promoteBtn);
            }
        });
    }
}

/**
 * Load registered users from localStorage or mock data
 */
function loadRegisteredUsers() {
    // In a real app, this would fetch users from an API
    // For this prototype, we'll use mock data and any users in localStorage
    
    // Get the table body
    const tableBody = document.querySelector('#registeredUsersTable tbody');
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add mock users
    const mockUsers = [
        {
            id: 'user1',
            name: 'Michael Brown',
            email: 'michael.b@example.com',
            role: 'student',
            joinedDate: 'May 5, 2023',
            status: 'active',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
            id: 'user2',
            name: 'Sophia Garcia',
            email: 'sophia.g@example.com',
            role: 'student',
            joinedDate: 'May 8, 2023',
            status: 'active',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
        },
        {
            id: 'user3',
            name: 'David Wilson',
            email: 'david.w@example.com',
            role: 'instructor',
            joinedDate: 'April 15, 2023',
            status: 'active',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    ];
    
    // Check localStorage for any registered users
    const storedUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('edulearn_registered_user_')) {
            try {
                const user = JSON.parse(localStorage.getItem(key));
                storedUsers.push(user);
            } catch (e) {
                console.error('Error parsing stored user:', e);
            }
        }
    }
    
    // Combine mock users and stored users, avoiding duplicates
    const allUsers = [...mockUsers];
    storedUsers.forEach(storedUser => {
        if (!allUsers.some(user => user.email === storedUser.email)) {
            allUsers.push(storedUser);
        }
    });
    
    // Add rows for each user
    allUsers.forEach(user => {
        const row = document.createElement('tr');
        
        // Role badge class
        let roleBadgeClass = 'bg-info';
        if (user.role === 'instructor') {
            roleBadgeClass = 'bg-warning text-dark';
        } else if (user.role === 'admin') {
            roleBadgeClass = 'bg-danger';
        }
        
        // Status badge class
        let statusBadgeClass = 'bg-success';
        if (user.status === 'inactive') {
            statusBadgeClass = 'bg-secondary';
        } else if (user.status === 'suspended') {
            statusBadgeClass = 'bg-danger';
        }
        
        // Action buttons
        let actionButtons = `
            <div class="action-buttons">
                <div class="action-button view" title="View">
                    <i class="fas fa-eye"></i>
                </div>
        `;
        
        if (user.role === 'student') {
            actionButtons += `
                <button class="btn btn-sm btn-outline-primary promote-btn" 
                        data-user-id="${user.id}" 
                        data-user-name="${user.name}" 
                        data-user-email="${user.email}">
                    Promote to Instructor
                </button>
            `;
        } else {
            actionButtons += `
                <span class="text-muted">Already an ${user.role}</span>
            `;
        }
        
        actionButtons += `</div>`;
        
        row.innerHTML = `
            <td>
                <div class="instructor-info">
                    <img src="${user.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'}" alt="User" class="instructor-avatar">
                    <div>${user.name}</div>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="badge ${roleBadgeClass}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
            <td>${user.joinedDate}</td>
            <td><span class="badge ${statusBadgeClass}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td>${actionButtons}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Show notification
    showNotification('User list refreshed', 'info');
}

/**
 * Promote a user to instructor role
 */
function promoteUserToInstructor(userId, userName, userEmail, buttonElement) {
    // Confirm promotion
    if (confirm(`Are you sure you want to promote ${userName} to instructor?`)) {
        // In a real app, this would call an API to update the user's role
        // For this prototype, we'll update the UI and store the change in localStorage
        
        // Update the UI
        const row = buttonElement.closest('tr');
        const roleCell = row.querySelector('td:nth-child(3)');
        roleCell.innerHTML = '<span class="badge bg-warning text-dark">Instructor</span>';
        
        // Replace the promote button with "Already an instructor" text
        const actionCell = row.querySelector('td:last-child');
        actionCell.innerHTML = `
            <div class="action-buttons">
                <div class="action-button view" title="View">
                    <i class="fas fa-eye"></i>
                </div>
                <span class="text-muted">Already an instructor</span>
            </div>
        `;
        
        // Store the updated user in localStorage
        const user = {
            id: userId,
            name: userName,
            email: userEmail,
            role: 'instructor',
            joinedDate: row.querySelector('td:nth-child(4)').textContent,
            status: 'active',
            avatar: row.querySelector('.instructor-avatar').src
        };
        
        localStorage.setItem(`edulearn_registered_user_${userId}`, JSON.stringify(user));
        
        // Show success notification
        showNotification(`${userName} has been promoted to instructor`, 'success');
    }
}
/**
 * Check if user is authenticated as admin
 */
function initAdminAuth() {
    const user = JSON.parse(localStorage.getItem('edulearn_user') || '{}');
    if (!user.id || user.role !== 'admin') {
        // Redirect to login page if not admin
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
    
    // For this prototype, we'll just show an alert
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
            document.querySelector('.content-header h1').textContent = 'Admin Dashboard';
            
            // Update active menu item
            const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
            menuItems.forEach(mi => mi.classList.remove('active'));
            menuItems[0].classList.add('active');
        });
    }, 1000);
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
                showNotification('Profile page is under development', 'info');
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
                            row.querySelector('.instructor-info div').textContent;
            
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
                        
                        <div class="card">
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
                                                <h6 class="mb-0">Data Science and Machine Learning</h6>
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
                                                <h6 class="mb-0">Business Management and Leadership</h6>
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Edit Student</button>
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
        showEditForm(itemType, itemName);
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
                                <label for="courseInstructor" class="form-label">Instructor</label>
                                <select class="form-select" id="courseInstructor" required>
                                    <option value="1" selected>John Smith</option>
                                    <option value="2">Sarah Johnson</option>
                                    <option value="3">Michael Chen</option>
                                    <option value="4">Emily Rodriguez</option>
                                </select>
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
                        <h5 class="modal-title" id="${modalId}Label">Edit Student: ${itemName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editStudentForm">
                            <div class="text-center mb-4">
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Student" class="rounded-circle mb-3" width="100">
                                <div>
                                    <label for="studentAvatar" class="btn btn-sm btn-outline-primary">Change Photo</label>
                                    <input type="file" id="studentAvatar" class="d-none">
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="studentName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="studentName" value="${itemName}" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="studentEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="studentEmail" value="${itemName.toLowerCase().replace(' ', '.')}@example.com" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="studentPhone" class="form-label">Phone</label>
                                <input type="tel" class="form-control" id="studentPhone" value="+1 (555) 123-4567">
                            </div>
                            
                            <div class="mb-3">
                                <label for="studentLocation" class="form-label">Location</label>
                                <input type="text" class="form-control" id="studentLocation" value="New York, USA">
                            </div>
                            
                            <div class="mb-3">
                                <label for="studentStatus" class="form-label">Status</label>
                                <select class="form-select" id="studentStatus" required>
                                    <option value="active" selected>Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveStudentBtn">Save Changes</button>
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
        showNotification(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} updated successfully`, 'success');
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
                if (cardTitle === 'Recent Courses') {
                    // Navigate to Courses page
                    const coursesMenuItem = document.querySelector('.menu-item:nth-child(3)');
                    coursesMenuItem.click();
                } else if (cardTitle === 'Recent Students') {
                    // Navigate to Students page
                    const studentsMenuItem = document.querySelector('.menu-item:nth-child(5)');
                    studentsMenuItem.click();
                }
            });
        }
    });
}

/**
 * Initialize chart filters
 */
function initChartFilters() {
    const revenueDropdown = document.getElementById('revenueDropdown');
    
    if (revenueDropdown) {
        const dropdownItems = revenueDropdown.nextElementSibling.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update dropdown button text
                revenueDropdown.textContent = this.textContent;
                
                // In a real app, this would update the chart data
                // For this prototype, we'll just show a notification
                showNotification(`Revenue chart updated to show data for ${this.textContent.toLowerCase()}`, 'info');
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