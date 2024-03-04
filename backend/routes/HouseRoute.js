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
router.get('/house',async(req,res)=>{
    try {
        const house = await House.find({})
        return res.status(200).json(
           { count: house.length,
            data: house}
        );
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error})
    }
})
//getbyid
router.get('/house/:id',async(req,res)=>{
    try {
        const {id} =req.params
        const house = await House.findById(id)
        return res.status(200).json(house);
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error})
    }
})
//update
router.put('/house/:id',async(req,res)=>{
    try {
        if(!req.body.topic || !req.body.price || !req.body.bedrooms || !req.body.address || !req.body.bathrooms || !req.body.description || !req.body.contactno || !req.body.Image){
            return res.status(400).send({message: "Please enter all information"});
        }
        const {id} =req.params
        const result = await House.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).json({message: "House not found"})
        }
        return res.status(200).send({message:"house updated"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error})
    }
})
//delete
router.delete('/house/:id',async(req,res)=>{
    try {
        const {id} =req.params
        const result = await House.findByIdAndDelete(id)
        if(!result){
            return res.status(404).json({message: "House not found"})
        }
        return res.status(200).send({message:"house deleted"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error})
    }
})

export { router as HouseRouter };
