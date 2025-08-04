//agr ye code jis file ke folder mein hai to ek dot. and agr dusre kisi folder mein hai to double dot ..
const listing=require("../models/listing.js");
//so isse listing.js data wala listing.js ke file ka access hoga
const initdata=require("./data.js");



const mongoose = require("mongoose");
const murl= "mongodb://127.0.0.1:27017/wanderlust"
main()
    .then(()=>{console.log("connection to Mongo Database successful!")})
    .catch(err=>console.log(err));
async function main() {await mongoose.connect(murl);}
//ab app.js mein jo testing ke liye data dala tha usko comment kr de

const initDb=async ()=>{
    //ab jo database mein data  save hua hai usko clean krenge yani yaha db completely khali hoga
    await listing.deleteMany({});
    //initdata ek object hai jo hmne upar likha hai wo object apne saath data.js file se data leke aya hai
    // so hm us object ke sath hmare key data yani data.js se export hua key data pass hogausko  ko access kr lenge
    await listing.insertMany(initdata.data);
    //data print krenge wo ki data.ja se aya iss index.js file mein and yaha se DB meinstore hua
    console.log("data was initialise");


};
initDb();