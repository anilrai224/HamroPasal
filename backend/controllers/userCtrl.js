const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');

//Create a User
const createUser = async (req,res)=>{
    const {email} = req.body;
    const findUser = await User.findOne({email});
    if(!findUser){
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        res.json({
            msg:"User Already Exists",
        })
    }
}

//Login User
const loginUserCtrl = async (req,res)=>{
    const {email,password}=req.body;
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
        res.send({
            _id:findUser?._id,
            firstname:findUser?.firstname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            password:findUser?.password,
            token: generateToken(findUser?._id),
        });
    }else{
        res.json({msg:'Invalid Credentails'})
    }
}

//Get a single User
const getAUser = async(req,res)=>{
    try{
        const getUser = await User.findById(req.body.userId).select('-password -email');
        res.json({ success: true, data: getUser })
    }catch(err){
        res.send(err);
    }
}

//Deleta a user
const deleteAUser = async(req,res)=>{
    const {id} = req.params;
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
    }catch(err){
        res.send(err)
    }
}

//Update a User
const updateUser = async (req,res)=>{
    const {id} = req.params;
    try{
        const updatedUser = await User.findByIdAndUpdate(id,
            {
                firstname:req?.body?.firstname,
                lastname:req?.body?.lastname,
                email:req?.body?.email,
                mobile:req?.body?.mobile
            },{
                new:true,
            });
        res.json(updatedUser);
    }catch(err){    
        res.send(err);
    }
}
module.exports ={createUser,loginUserCtrl,getAUser,deleteAUser,updateUser}