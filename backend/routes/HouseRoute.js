import express from "express";
import { House } from "../models/HouseModule.js";
import { User } from "../models/Users.js";
const router = express.Router();

//post
router.post('/house',async (req,res)=>{
    try{

        if(!req.body.topic || !req.body.price || !req.body.bedrooms || !req.body.address || !req.body.bathrooms || !req.body.description || !req.body.contactno || !req.body.Image ||!req.body.userOwner){
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
            Image:req.body.Image,
            userOwner:req.body.userOwner
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
        if(!req.body.topic || !req.body.price || !req.body.bedrooms || !req.body.address || !req.body.bathrooms || !req.body.description || !req.body.contactno || !req.body.Image || !req.body.userOwner){
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
// Save a house
router.put("/save",async(req,res)=>{
    try {
        const house = await House.findById(req.body.houseId)
        const user = await User.findById(req.body.userId)
        user.savedHouse.push(house);
        await user.save();
        res.json({savedHouse:user.savedHouse})
    } catch (error) {
        res.json(error)
    }
})
// Get id of saved house
router.get("/savedHouse/ids/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.status(201).json({ savedHouse: user?.savedHouse });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Get saved house
  router.get("/savedHouse/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const savedHouse = await House.find({
        _id: { $in: user.savedHouse },
      });
  
      console.log(savedHouse);
      res.status(201).json({ savedHouse });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

export { router as HouseRouter };
