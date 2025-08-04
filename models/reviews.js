const mongoose=require("mongoose");
const schema=mongoose.Schema;

//we are making the schema for the review section

//1:comment:string
//2.rating(1 to 5);
//3.created_At:date and time

const reviewschema= new schema({
    comment:String,
    rating:{
        type:Number,
        //jo 1 se 5 tk number honge wo aayenge phir unko hm star mein convert krenge
        min:1,
        max:5
    }, //kb create kia user ne review
    created_at:{
        type:Date,
        //agr date nhi diya to default se current date aa jayegi
        default:Date.now(),
    },
    author:{
            type: schema.Types.ObjectId,
            ref:"user"
        }
});
module.exports=mongoose.model("reviews",reviewschema);

