import jwt from 'jsonwebtoken';
import { ENV_VARs } from '../config/envVar.js';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        if (!token) {
            return res.status(401).json({ success: false, message: "User is not authorized" });
        }

        const decode = jwt.verify(token, ENV_VARs.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ success: false, message: "User is not authorized" });
        }

        const user = await User.findById(decode.userId).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: "User is not authorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "User is not authorized" });
    }
} 
