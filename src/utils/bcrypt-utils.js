const bcrypt = require('bcrypt');

// Async function to hash password using bcrypt
async function hashPassword(password) {
    const saltRounds = 10; // Adjust the number of rounds based on your security requirements
    return bcrypt.hash(password, saltRounds);
}

async function comparePasswords(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePasswords
};
