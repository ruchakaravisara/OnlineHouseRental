import mongoose  from "mongoose";

const HouseSchema = new mongoose.Schema({
    
        topic: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        contactno:{
            type: String,
            required: true,
        },      
          Image:{
            type: String,
            required: true,
          }
          
      
}) 
const HouseModel  = mongoose.model('house',HouseSchema)
export {HouseModel as House}