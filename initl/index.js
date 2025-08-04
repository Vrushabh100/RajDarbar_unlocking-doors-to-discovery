
const listing=require("../models/listing.js");
const initdata=require("./data.js");

const mongoose = require("mongoose");
const murl= "mongodb://127.0.0.1:27017/wanderlust"
main()
    .then(()=>{console.log("connection to Mongo Database successful!")})
    .catch(err=>console.log(err));
async function main() {await mongoose.connect(murl);}
