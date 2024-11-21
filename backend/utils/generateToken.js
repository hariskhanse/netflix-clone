import jwt from "jsonwebtoken";
import { ENV_VARs } from "../config/envVar.js";
export const generateTokenAndSetCookies = (res, userId) => {
    const token = jwt.sign({ userId }, ENV_VARs.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt-netflix", token, {
        httpOnly: true,
        secure: ENV_VARs.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return token;
};