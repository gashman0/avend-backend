import { cookieOptions } from "../../config/cookie-config.js";

export const adminLogout = (req, res) => {
    res.clearCookie("adminAccessToken", cookieOptions);
    res.clearCookie("adminRefreshToken", cookieOptions);

    res.status(200).json({
        message: "Admin Logged Out",
    });
};