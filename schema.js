const { text } = require("express");
const joi=require("joi");
const reviews = require("./models/reviews");

module.exports.listingSchema=joi.object({
         //listing ho jo required hi ho 
         listing : joi.object({
             title: joi.string().required(),
             description: joi.string().required(),
            //  image ke liye .allow exception hai ki wo khali string or null bhi raha to chalega
             image: joi.string().allow("",null),
             //category
            
            category: joi.string().required().valid(
            "Rooms", 
            "Amazing Views", 
            "Iconic cities", 
            "Surfing", 
            "Amazing Pools", 
            "Beach", 
            "Cabins",
            "Lake front",
            "Pool" ),
             //price mein bhi minimum price 0 rehni chahiye and required hi chahiye
             price: joi.number().required().min(0),
             //location mein no bhi aa sakta text bhi and string bhi aana allowed hai 
             location: joi.string().required().allow(joi.number,joi.string,text),
             country: joi.string().required(),
         }).required() 
});
 
module.exports.reviewsschema=joi.object({
    reviews:joi.object({
        rating:joi.number().required().min(0).max(5),
        comment:joi.string().required(),

    }).required()
});
