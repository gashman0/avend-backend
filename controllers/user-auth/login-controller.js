import userModel from "../../models/user-model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { cookieOptions } from "../../config/cookie-config.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the account actually exists
        const user = await userModel.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        };

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Create an access token
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });

        // Create a refresh token
        const refreshToken = jwt.sign(
            {id: user._id},
            process.env.REFRESH_SECRET,
            {expiresIn: "1d"},
        );

        // Store tokens in Http-only cookies
        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 30,
        })

        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 60 * 24,
        });

        // Send response to user
        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                phone: user.phone,
                country: user.country,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};