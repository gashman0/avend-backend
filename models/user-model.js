import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {type: String, unique: true},
        country: String,
        phone: Number,
        password: String,
        username: String,
    }, {timestamps: true}
);

export default mongoose.model("User", userSchema);