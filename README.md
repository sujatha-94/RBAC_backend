This project demonstrates a simple implementation of Role-Based Access Control (RBAC) in an Express.js backend using Node.js. The application has user roles such as Admin, User, and Guest, and restricts access to certain routes based on the user's role.

Project Structure:

rbac-backend/
├── models/
│   ├── User.js           # User model with role and authentication details
│   └── Role.js           # Role model to define roles in the system
├── routes/
│   ├── auth.js           # Authentication routes (login, logout, etc.)
│   └── role.js           # Role management routes
├── middleware/
│   ├── authMiddleware.js # Middleware to authenticate users (JWT based)
│   └── roleMiddleware.js # Middleware to check user roles
├── server.js             # Main server file with all routes and middleware
└── .env                  # Environment variables (DB credentials, JWT secret, etc.)

Features:
Authentication: Implemented JWT-based authentication.
Role Management: Define roles like Admin, User, and Guest.
Permissions: Only Admin can create/edit users, others have limited access.
Protected Routes: Specific routes are protected by role-based access control.
Requirements
Node.js
MongoDB (for storing users and roles)
Installation
Clone the repository:
git clone https://github.com/your-username/rbac-backend.git
cd rbac-backend
Install dependencies:
npm install
Set up environment variables: Create a .env file in the root of the project and add the following variables:
env:
PORT=3001
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/rbacDB
Start the server:
npm start
The server will start on http://localhost:3001.

Routes
1. Authentication Routes (auth.js)
POST /auth/login: Login and get JWT token.

2. Role Routes (role.js)
GET /roles: Get all roles. Response:
json:
[
  { "id": 1, "name": "Admin" },
  { "id": 2, "name": "User" },
  { "id": 3, "name": "Guest" }
]
3. User Routes (user.js)
GET /users: Get all users (Admin-only access). Response:

json:
[
  { "id": 1, "name": "John Doe", "role": "Admin" },
  { "id": 2, "name": "Jane Smith", "role": "User" }
]
POST /users: Create a new user (Admin-only access).

Request Body:

json:
{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "User"
}
Response:

json:
{
  "message": "User created successfully.",
  "user": {
    "id": 3,
    "name": "New User",
    "email": "newuser@example.com",
    "role": "User"
  }
}
PUT /users/:id: Update user details (Admin-only access).

Request Body:

json:
{
  "name": "Updated User",
  "email": "updateduser@example.com"
}
Response:

json:
{
  "message": "User updated successfully.",
  "user": {
    "id": 2,
    "name": "Updated User",
    "email": "updateduser@example.com",
    "role": "User"
  }
}
Middleware
1. authMiddleware.js:
Middleware to authenticate users using JWT token.

Usage:
js:
const { authenticateToken } = require('../middleware/authMiddleware');
app.use(authenticateToken);
2. roleMiddleware.js:
Middleware to check if the user has the required role (e.g., Admin).

Usage:
js:
const { checkAdminRole } = require('../middleware/roleMiddleware');
app.use('/users', checkAdminRole);
Environment Variables
PORT: Port for the application (default 3001).
JWT_SECRET: Secret key for signing JWT tokens.
MONGO_URI: MongoDB connection URI.
Postman Collection
You can use Postman to test the API. Below is an example of how to set up a Postman collection for your API.

Create a Postman Collection named RBAC Backend.
Add the following requests to the collection:
Example Requests
1. Login (POST /auth/login)
URL: http://localhost:3001/auth/login

Method: POST
Request Body (JSON):

json:
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
Response:

json
Copy code
{
  "token": "jwt_token_here"
}
2. Create User (POST /users)
URL: http://localhost:3001/users

Method: POST
Headers:

Authorization: Bearer {JWT_TOKEN} (Use the token received from login)
Request Body (JSON):

json:
{
  "name": "New Admin",
  "email": "newadmin@example.com",
  "role": "Admin"
}
Response:

json:
{
  "message": "User created successfully.",
  "user": {
    "id": 3,
    "name": "New Admin",
    "email": "newadmin@example.com",
    "role": "Admin"
  }
}
3. Update User (PUT /users/:id)
URL: http://localhost:3001/users/2

Method: PUT

Headers:
Authorization: Bearer {JWT_TOKEN} (Use the token received from login)
Request Body (JSON):

json:
{
  "name": "Updated Jane Smith",
  "email": "updated.jane@example.com"
}
Response:

json:
{
  "message": "User updated successfully.",
  "user": {
    "id": 2,
    "name": "Updated Jane Smith",
    "email": "updated.jane@example.com",
    "role": "User"
  }
}
Conclusion
This backend system provides a simple way to implement role-based access control using JWT tokens and Express middleware. The system has endpoints for managing users and roles, and it ensures that only Admins can perform specific actions such as adding or updating users.

This README file will guide the user on setting up and testing the backend system with Postman. It also explains the folder structure and describes the core functionality of the RBAC system.











