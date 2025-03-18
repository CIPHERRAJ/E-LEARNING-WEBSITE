# EduLearn - E-Learning Website

EduLearn is a responsive e-learning platform that provides a seamless experience for students, instructors, and administrators. This project is built using **HTML, CSS (Bootstrap), JavaScript**, and incorporates backend functionality with **Node.js, Express, and MongoDB**.

## Live Demo
[EduLearn Live Website](https://cipherraj.github.io/E-LEARNING-WEBSITE/)

## Features
- **User Authentication:** JWT-based authentication for secure login and registration.
- **Role-Based Access:** Supports students, instructors, and admin roles.
- **Dashboard:** Customized dashboards for different users.
- **Modern UI:** Designed using Bootstrap and Font Awesome for a visually appealing interface.
- **Fully Responsive:** Adapts to different screen sizes for an optimal experience.
- **Interactive Learning:** Future enhancements include quizzes, assignments, and course progress tracking.

## Project Structure
```
EduLearn/
│── index.html         # Home Page
│── login.html         # Login Page
│── register.html      # Registration Page
│── dashboard.html     # User Dashboard
│
├── assets/
│   ├── css/
│   │   ├── style.css  # Custom styles
│   ├── js/
│   │   ├── main.js    # Common JS functions
│   │   ├── auth.js    # JWT Authentication logic
│   │   ├── admin.js   # Admin-specific functions
│   │   ├── instructor.js  # Instructor-specific functions
│   │   ├── student.js  # Student-specific functions
│
├── backend/
│   ├── server.js      # Express.js server
│   ├── models/
│   │   ├── User.js    # User schema and model
│   ├── routes/
│   │   ├── authController.js  # Authentication routes
│   ├── middleware/
│   │   ├── auth.js    # JWT authentication middleware
│
└── README.md
```

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB installed & running

### Steps to Run the Project Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/CipherRaj/E-LEARNING-WEBSITE.git
   ```
2. Navigate to the project directory:
   ```sh
   cd E-LEARNING-WEBSITE
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the backend server:
   ```sh
   node backend/server.js
   ```
5. Open `index.html` in a browser or use `Live Server` in VS Code.

## Future Improvements
- Course management system
- Interactive quizzes & assignments
- Payment integration for premium courses

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
