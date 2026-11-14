import jwt from 'jsonwebtoken';
import { cookieOptions } from '../../config/cookie-config.js';

export const adminRefresh = (req, res) => {
    const adminRefreshToken = req.cookies.adminRefreshToken;

    if(!adminRefreshToken) {
        return res.status(401).json({
            message: "No admin refresh token",
        });
    }

    try {
        const decoded = jwt.verify(
            adminRefreshToken,
            process.env.REFRESH_SECRET
        );

        const newAdminAcessToken = jwt.sign(
            {id: decoded.id},
            process.env.JWT_SECRET,
            {expiresIn: "30m"}
        );

        res.cookie("adminAccessToken", newAdminAcessToken, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 30,
        });

        return res.status(200).json({
            message: "Admin token refreshed",
        })
    } catch (error) {
        console.error("Admin refresh token error:", error);

        return res.status(401).json({
            message: "Invalid admin refresh token",
        })
    }
}