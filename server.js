const express = require('express');
const cors = require('cors'); // Import CORS

const app = express();
app.use(cors()); // Use CORS middleware to allow cross-origin requests

app.use(express.json()); // This middleware ensures that we can handle JSON payloads

// Sample data for roles
const roles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'Guest' },
];

// Sample users data (You can replace this with a database for a real-world scenario)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

// Middleware to check user role before allowing access to edit operations
const checkAdminRole = (req, res, next) => {
  // Simulating user role check
  const { userRole } = req.body; // Simulated userRole for testing (replace with actual auth logic)

  if (userRole !== 'Admin') {
    return res.status(403).json({ message: 'Permission Denied: You must be an Admin to edit users.' });
  }
  next(); // Proceed if user is an Admin
};

// Route to fetch all roles
app.get('/roles', (req, res) => {
  res.json(roles); // Send roles data as JSON
});

// Route to fetch all users
app.get('/users', (req, res) => {
  res.json(users);  // Return the users as JSON
});

// Route to edit user (admin only)
app.put('/users/:id', checkAdminRole, (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Find the user to update
  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Update user details
  user.name = name || user.name;
  user.email = email || user.email;

  // Return the updated user as a JSON response
  res.json({ message: 'User updated successfully.', user });
});

// Route to add new users (admins only)
app.post('/users', checkAdminRole, (req, res) => {
  const { name, email, role } = req.body;

  // Add new user (Only if role is specified and valid)
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role,
  };

  users.push(newUser);
  
  // Return the newly created user as a JSON response
  res.status(201).json({ message: 'User added successfully.', user: newUser });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
