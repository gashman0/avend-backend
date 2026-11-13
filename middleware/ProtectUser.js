import jwt from 'jsonwebtoken'

export const protectUser = (req, res, next) => {
    const token = req.cookies.accessToken;

    if(!token) {
        return res.status(401).json({
            message: "Not authorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT verify error:", error);
        res.status(401).json({message: "Token expired"});
    }
}