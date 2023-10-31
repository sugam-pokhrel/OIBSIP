const jwt = require('jsonwebtoken');
const User = require('../db/schemas/User');

const protect =async (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized. Token missing." });
        }

        const decoded = jwt.verify(token, '$uperman'); // Use '$uperman' as the secret key
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ error: "Unauthorized. User not found." });
        }
        if(user.verified==false){
            return res.status(401).json({ error: "Unauthorized. User not verified." });
        }
        if(user.role!==1){
            return res.status(401).json({ error: "Unauthorized. User not an admin." });
        }


        req.user = user;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }
}

module.exports = protect;
