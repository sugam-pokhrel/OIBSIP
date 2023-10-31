const jwt = require('jsonwebtoken');

const generateToken = async (res, userId) => {
    try {
        const token = jwt.sign({ id: userId }, '$uperman', { expiresIn: '30d' });
        
        // Set the JWT token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        
        console.log(token.toString())

        return token; // Optionally, return the token for reference

    } catch (error) {
        console.error('Error generating token:', error);
        throw error; // You can choose to throw the error or handle it as needed
    }
}

module.exports = generateToken;
