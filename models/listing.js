const { urlencoded } = require("express");
const mongoose= require("mongoose");
const schema= mongoose.Schema;
const review=require("./reviews");
const owner= require("./user");


const listingschema=new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    category:{
            type:String,
            enum: [
            "Rooms", 
            "Amazing Views", 
            "Iconic cities", 
            "Surfing", 
            "Amazing Pools", 
            "Beach", 
            "Cabins",
            "Lake front",
            "Pool"
        ],
        required: true
    },

    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
       {type: schema.Types.ObjectId,
        ref:"reviews",//yaha sirf hmne reviews ka schema define kia actual review ke liye hm forms ko built krenge
       } 
    ],
    owner:{
        type: schema.Types.ObjectId,
        ref:"user"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        }
    }
})
//ye hmara listingSchema hogya then isi listingschema ko use krke hm apna model create krne wale hai

//deleting reviews ids from listing when listing is deleted 
//adding mongoose middleware 
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}})
    }
})
//now we create model 
const listing=mongoose.model("listing",listingschema);
//we export this model 
module.exports=listing;



