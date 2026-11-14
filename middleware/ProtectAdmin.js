import jwt from 'jsonwebtoken'

export const protectAdmin = (req, res, next) => {
    const token = req.cookies.adminAccessToken;

    if(!token) {
        return res.status(401).json({
            message: "Not authorized admin"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded;
        next();
    } catch (error) {
        console.log("Jwt verify error:", error);
        res.status(401).json({message: "Token expired"});
    }
}