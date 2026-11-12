import userModel from "../../models/user-model.js";
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
    try {
        const { name, email, phone, country, username, password } = req.body;

        // Check if the email already exists
        const userEmailExists = await userModel.findOne({email});
        if(userEmailExists) return res.status(400).json({
            message: "User with this email already exists"
        });

        // Check if the phone number already exists
        const userPhoneExists = await userModel.findOne({phone});
        if(userPhoneExists) return res.status(400).json({
            message: "User with this email already exists"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name, email, phone, country, username, password: hashedPassword, 
        });

        res.status(201).json({
            message: "User signed up successfully!",
            user: {id: user._id, name: user.name, email: user.email, createdAt: user.createdAt,}
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error: error
        })
    }
}