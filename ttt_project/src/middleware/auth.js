import jwt from 'jsonwebtoken'
import User from '../server/models/User';

/**
 * Verify User before they login to their account
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'testToken');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token });
        
        if(!user) {
            throw new Error
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error: "Authentication required"})
    }
}

export default auth;