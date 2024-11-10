import jwt from 'jsonwebtoken';

// Designer authentication middleware
const authDesigner = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        
        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(dtoken, process.env.JWT_SECRET);
        
        // Set designer ID on the request object
        req.designerId = decodedToken.id;
        
        next();
    } catch (error) {
        console.log("Authorization error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default authDesigner;
