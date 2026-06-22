const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Немає токена, авторизацію відхилено' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key_12345');
        req.userId = decoded.userId;
        next(); 
    } catch (error) {
        res.status(403).json({ message: 'Недійсний токен' });
    }
};