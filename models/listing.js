const mongoose= require("mongoose");
const schema= mongoose.Schema;

const listingschema=new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        filename:String,
        url:String,
        // type:String,
        //hm image ke 2 logic set krenge 1.image hi undefined hai exist hi nhi krti ys hai hi nhi
        //2 login image to hai pr uska link empty hai
        //agr image mein koi dikkat aayi jisse save na hui ho to default value set kr sakte hai
       // default:"https://static.vecteezy.com/system/resources/thumbnails/014/028/718/small/majestic-closeup-view-of-calm-sea-water-waves-with-orange-sunrise-sunset-sunlight-tropical-island-beach-landscape-exotic-shore-coast-summer-vacation-holiday-amazing-nature-scenic-relax-paradise-photo.jpg",
        //agr image kisi ne upload nhi kia to ye
        //ternary operator second form of writing if else
        //as set krdo agr v==="" v ki value empty string hai ? link as link : nhi to v print krdo
        //set:(v)=>v===""?link(image link):v
          //set:(v)=>v===""? "https://media.bom.gov.au/social/blog/2121/curious-kids-is-sea-water-blue-or-is-it-just-reflecting-off-the-sky/":v
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
})
//ye hmara listingSchema hogya then isi listingschema ko use krke hm apna model create krne wale hai
//now we create model 
const listing=mongoose.model("listing",listingschema);
//we export this model 
module.exports=listing;
//we export model in our app.js  
//uske liye app.js mein require kr do is file ko
//const listing=require("./models/listing.js");
//so isse app.js mein schema wala listing ke file ka access hoga