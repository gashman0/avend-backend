import userModel from "../../models/user-model.js";
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
    try {
        const { name, email, phone, country, username, password } = req.body;

        // Validate required fields
        if(!name, !email, !phone, !country, !username, !password) {
            return res.status(400).json({
                message: "please provide all required fields",
            })
        }

        // Check if the email already exists
        const userEmailExists = await userModel.findOne({ email });
        if(userEmailExists) return res.status(400).json({
            message: "A User with this email already exists"
        });

        // Check if the phone number already exists
        const userPhoneExists = await userModel.findOne({ phone });
        if(userPhoneExists) return res.status(400).json({
            message: "User with this email already exists"
        });

        // Check if username already exists;
        const userUsernameExists = await userModel.findOne({ username });
        if(userUsernameExists) {
            return res.status(409).json({
                message: "This username is already taken",
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await userModel.create({
            name: name.trim(), 
            email: email.trim().toLowerCase(), 
            phone: String(phone).trim(), 
            country, 
            username: username.trim(), 
            password: hashedPassword, 
        });

        res.status(201).json({
            message: "User signed up successfully!",
            user: {
                id: user._id, 
                name: user.name, 
                email: user.email, 
                phone: user.phone,
                username: user.username,
                country: user.country,
                createdAt: user.createdAt,
            },
        })


    } catch (error) {
        console.error("Signup error:", error);
        
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}