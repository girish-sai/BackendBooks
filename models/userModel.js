const mongoose=require('mongoose');
const bcrypt=require('bcrypt');  // Added missing import

const userSchema=new mongoose.Schema({
    name:{
        type:String,            
        required:[true,'Name is required'],
        trim:true,
        minlength:[3,'Name must be at least 3 characters long'],        
        maxlength:[50,'Name cannot exceed 50 characters']

    },
    email:{
        type:String,    
        required:[true,'Email is required'],
        trim:true,
        lowercase:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']
    },
    password:{    
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password must be at least 6 characters long'] 
    },
});

// Static signup Function
userSchema.statics.signup=async function(username,email,password){  // Changed to regular function
    const exists=await this.findOne({email});  // Use 'this' instead of 'User'
    if(exists){
        throw Error("Email already exists!");
    }
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    const user=await this.create({name:username,email,password:hash});  // Fixed: name instead of username
    return user;
}
//Static login Function

userSchema.statics.login=async function(email,password){  // Changed to regular function
    const user=await this.findOne({email});  // Use 'this' instead of 'User'
    if(!user){
        throw Error("User does not exists")
    }

    const match=await bcrypt.compare(password,user.password);
    if(!match){
        throw Error("Incorrect Password")
    }
    return user;
}


const User=mongoose.model('User',userSchema);

module.exports=User;