const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")
const User=require("../models/userModel")
const jwt=require("jsonwebtoken")


//@desc Register a user
//@route POST /api/users/register
//@access public
 const registerUser=asyncHandler(async(req,res)=>{
     const{username,email,password}=req.body;
    if(!username|| !email|| !password){
        res.status(400)
        throw new Error("All fields are compulsory")
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered" )

    }
    const hashPassword=await bcrypt.hash(password,10)
    console.log("Hashed password:",hashPassword)
    const user=await User.create(
        {
            username,
            email,
            password:hashPassword,
        }
    )
    console.log(`user created ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})

       
    }
    else{
        res.status(400)
        throw new Error("user data is not valid")
    }

   

    res.json({message:"Register the user"})
})


//@desc Login  a user
//@route POST /api/users/login
//@access public
 const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password ){
        res.status(400);
        throw new Error("All fileds are compulsory")
    }

    const user=await User.findOne({email});
    //commapre password with hashpassword
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id

            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"7m"})
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("email or password not valid ")
    }

})

//@desc current  user info
//@route POST /api/users/current
//@access private
 const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
})
module.exports={registerUser,loginUser,currentUser}