const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({success: false, message: "Unauthorized - no token provided"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(400).json({success: false, message: "Unauthorized - no token provided"});
        }

        req.userId = decoded.user.userId;
        next();

    }catch(err){
        console.log("Error in verifyToken", err);

        return res.status(500).json({success:false, message: err.message});
    }
}

module.exports = {
    verifyToken,
}