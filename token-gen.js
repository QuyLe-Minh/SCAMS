const jwt = require('jsonwebtoken');

const secret = "666d1168d23d0a3e55ba0e9112cbf832c1fdf09114373599617b9a9a9cae5ed9";
const token = jwt.sign({ userId: 1 }, secret, { expiresIn: '1h' });

console.log("JWT Token:");
console.log(token);
