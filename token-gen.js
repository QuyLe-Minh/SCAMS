import jwt from 'jsonwebtoken';

// Replace with your own secret (must match what's used in your Next.js API)
const SECRET_KEY = ''; // Example: process.env.JWT_SECRET

const payload = {
  id: 4, // typically user ID
  email: 'lecturer_user_1',
  role: 'Lecturer' // optional roles or permissions
};

const options = {
  expiresIn: '2h'
};

const token = jwt.sign(payload, SECRET_KEY, options);

console.log('Generated JWT Token:\n');
console.log(token);
