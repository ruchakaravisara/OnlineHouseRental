import express from 'express';
import {User} from '../models/Users.js'
import mongoose from 'mongoose';
import bcryt from 'bcrypt';


const router = express.Router();

router.post('/register',async(req,res)=>{
    const{name,email,password} = req.body;
    const user =await User.findOne({ email})
    if(user){
        return res.json({message:"User already registered"})
    }
    const hashpassword = await bcryt.hash(password,10);
    const newUser = new User({
        name,
        email:hashpassword,
        password
    })
    await newUser.save();
    return res.json({message:"User registered"})
})

export {router as UserRouter}