import express from "express";
import { House } from "../models/HouseModule.js";
const router = express.Router();

//post
router.post('/house',async (req,res)=>{
    try{

        if(!req.body.topic || !req.body.price || !req.body.bedrooms || !req.body.address || !req.body.bathrooms || !req.body.description || !req.body.contactno || !req.body.Image){
            return res.status(400).send({message: "Please enter all information"});
        }

        const newHouse = {
            topic:req.body.topic,
            price:req.body.price,
            bedrooms:req.body.bedrooms,
            address:req.body.address,
            bathrooms:req.body.bathrooms,
            description:req.body.description,
            contactno:req.body.contactno,
            Image:req.body.Image
        }
        const house  =await House.create(newHouse)
       return res.status(200).send(house)

    }catch(err){
        console.log(err)
        res.status(500).send({message:err})
    }
})
//getall

//getbyid

//update

//delete

export { router as HouseRouter };
