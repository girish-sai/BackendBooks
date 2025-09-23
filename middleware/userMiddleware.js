const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

// Debug what we imported

const authUser=async (req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({
            error:"Auth Token Required"
        })
    }
    const token=authorization.split(" ")[1];
    try {
        const {_id}=jwt.verify(token, process.env.SECRET_KEY);
        
        // More debugging right before the error line
        console.log('About to call User.findOne, User is:', typeof User);
        console.log('_id to search:', _id);
        
        req.user=await User.findOne({_id}).select("_id");
        next();
    } catch (error) {
        console.log('Error in auth middleware:', error.message);
        console.log('Error stack:', error.stack);
        res.status(401).json({
            error:"Request is Not Authorized"
        })
    }

}

module.exports=authUser