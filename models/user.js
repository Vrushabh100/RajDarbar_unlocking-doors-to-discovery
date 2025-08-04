
const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");

const userschema=new schema({
    email:{
        type:String,
        required:true
    },
    //passport-local-mongoose khud hi add kr dega username uski salting,hashing  krke usko also hash password and solt value bhi khud hi add krwa dega 
    //so uko as a pligin ki tarah pass krdenge 
});

userschema.plugin(passportlocalmongoose);
//as a plugin add kr dia jo ki khud password and username with hashed,salting krke add kr dega
//ye wo authenticate bhi khud hi krta hai ki user pehle se registered tha ya nhi tha usko kafi sare methods hai called static methods


//export schema
module.exports=mongoose.model("user",userschema);



