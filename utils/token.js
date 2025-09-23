require('dotenv').config();

const jwt=require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET_KEY;

const createToken=()=>{
    return jwt.sign({},SECRET_KEY,{expiresIn:'3d'});
}
module.exports=createToken;