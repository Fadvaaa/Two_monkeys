const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const HandleError = require('../utils/HandleError')

module.exports.Authentication = async (req,res,next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded.userId);
            if (!user) {
                return { message: 'Unauthorized' };
            }
            req.user = user;
            req.body.user_id = decoded.userId;
            next()
 
        } catch (error) {
            return HandleError(error);
        }
    }
    return { message: 'Token not provided', code: 404 };
};
