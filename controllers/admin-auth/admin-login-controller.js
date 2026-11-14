import adminModel from "../../models/admin-model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { cookieOptions } from "../../config/cookie-config.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Please provide your email and password",
            });
        }

        // Find account using either email
        const admin = await adminModel.findOne({email})

        if(!admin) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Create access token
        const adminAccessToken = jwt.sign(
            {id: admin._id},
            process.env.JWT_SECRET,
            {expiresIn: "30m"}
        );

        // Create refresh token
        const adminRefreshToken = jwt.sign(
            {id: admin._id},
            process.env.REFRESH_SECRET,
            {expiresIn: "1d"}
        )

        // Set HttpOnly cookies
        res.cookie("adminAccessToken", adminAccessToken, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 30,
        });

        res.cookie("adminRefreshToken", adminRefreshToken, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({
            message: "Admin Login successful",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });

    } catch (error) {
        console.error("Admin login error:", error)

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}