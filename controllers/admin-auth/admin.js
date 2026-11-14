import adminModel from "../../models/admin-model.js";

export const getAdmin = async(req, res) => {
    try {
        const admin = await adminModel.findById(req.admin.id).select("-password");
        res.json(admin);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}