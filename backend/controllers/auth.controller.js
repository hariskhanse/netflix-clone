import { ConstantError, ControllerError } from "../common/ConstantError.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookies } from './../utils/generateToken.js';

export async function signup(req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(ConstantError.BAD_REQUEST).json
                ({
                    success: false,
                    message: ConstantError.FIELD_REQUIRED
                });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(ConstantError.BAD_REQUEST).json
                ({
                    success: false,
                    message: ConstantError.INVALID_EMAIL
                });
        }

        if (password.length < 6) {
            return res.status(ConstantError.BAD_REQUEST).json
                ({
                    success: false,
                    message: ConstantError.PASSWORD_SHORT
                });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(ConstantError.CONFLICT).json
                ({
                    success: false,
                    message: ConstantError.ALREADY_EXITS
                });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(ConstantError.CONFLICT).json
                ({
                    success: false,
                    message: ConstantError.ALREADY_EXITS
                });
        }

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]

        const randomIndex = Math.floor(Math.random() * PROFILE_PICS.length);
        const image = PROFILE_PICS[randomIndex];

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image
        });

        generateTokenAndSetCookies(res, newUser._id);


        return res.status(ConstantError.CREATED).json
            ({
                success: true,
                User: {
                    ...newUser._doc,
                    password: undefined
                }
            });

    } catch (error) {
        console.log(ControllerError.SIGNUP, error.message);
        return res.status(ConstantError.SERVER_ERROR).json
            ({
                success: false,
                message: ConstantError.INTERNAL_SERVER_ERROR
            });
    }
}

export async function login(req, res) {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(ConstantError.BAD_REQUEST).json
                ({
                    success: false,
                    message: ConstantError.FIELD_REQUIRED
                });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(ConstantError.BAD_REQUEST).json
                ({
                    success: false,
                    message: ConstantError.USER_NOT_FOUND
                });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(ConstantError.BAD_REQUEST).json
                ({
                    success: false,
                    message: ConstantError.WRONG_PASSWORD
                })
        }

        generateTokenAndSetCookies(res, user._id);

        return res.status(ConstantError.CREATED).json
            ({
                success: true,
                User: {
                    ...user._doc,
                    password: undefined
                }
            })
    } catch (error) {
        console.log(ControllerError.LOGIN, error.message);
        return res.status(ConstantError.SERVER_ERROR).json
            ({
                success: false,
                message: ConstantError.INTERNAL_SERVER_ERROR
            });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        return res.status(ConstantError.CREATED).json
            ({
                success: true
            })
    } catch (error) {
        console.log(ControllerError.LOGOUT, error);
        return res.status(ConstantError.SERVER_ERROR).json
            ({
                success: false,
                message: ConstantError.INTERNAL_SERVER_ERROR
            });
    }
}

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log(ControllerError.AUTH_CHECK, error.message);
        res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}