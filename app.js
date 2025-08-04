const express= require("express");
const app=express(); 

const mongoose = require("mongoose");
const murl= "mongodb://127.0.0.1:27017/wanderlust"
main()
    .then(()=>{console.log("connection to Mongo Database successful!")})
    .catch(err=>console.log(err));
async function main() {await mongoose.connect(murl);}

//uske liye app.js mein require kr do is file ko
const listing=require("./models/listing.js");
//so isse app.js mein schema wala listing ke file ka access hoga

const path=require("path");

//isse ejsmate se sare css effects lg jate hai on all routes so that hme sab routes mein jakr ek ek mein css effects ya changes nhi lagane pdte 
//same jaise kisi website ke koi bhi page pr chale jaye to uska logo and theme change nhii hoti 
const ejsmate= require("ejs-mate"); //ab niche iski ejs engine start krenge
app.engine("ejs",ejsmate);
//ab views ke andar ek folder bnayenge layouts then uske andar boilerplate naam se file bnayenge
//ab public>style.css mein jayenge effects lagayenge css code likhenge usko apply krne ke liye 
// boilerpalte ka code likhenge in views>boilerplate.ejs ye wala <percentagelayout- who(jiske/jispr hm effects dalna chahte hai )percentage> aur jis route .ejs file mein ye boilserplate ke effects chahiye unme in place of head tag <percentage layout("/layouts/boilerplate")percentage>
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


app.set("views",path.join(__dirname,"views"));
//isse public folder nominate ho jata hai ki usme sirf css ke hi files rhenge .css wale
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));






//ab hm test krenge ki listing wala file yaha access hua ki nhi 
//hm ek sample list data tayaar krenge usme schema ke according data fill krenge
//then save krke test krenge and test krenge ki data schema se hokr database mein store horha ya nhi
// app.get("/listing",async (req,res)=>{
//     let samplelist=new listing({
//         title:"mera naam",
//         description:"mahan ho",
//         price:1300,
//         location:"banglore",
//         country:"india",
//     })
//     await samplelist.save().then((res)=>{
//         console.log("tested");
//         res.send("saved");
        
//     }).catch((err)=>{
//         console.log(err);
//     })
    
// });


//so yaha hm listings route create krenge jisme hmare sare listings yani sare places ki list dikh jayegi
app.get("/listings",async (req,res)=>{
    //jo pehle hmne data app.js mein require kia tha listings.ja se wo sara
    // sara data app.js se browser mein also console mein show krega, curly bracket in find means jo curlt braces mein data hai wo
   let alllisting= await listing.find({})
    // .then((res)=>{
    //     console.log(res);//data printed so code is working
    // })
    //.ejs file views folder mein listing wale folder mein hai isliye path wo dala
    res.render("./listings/index.ejs",{alllisting});
    //ab ye index.ejs ke andar bhi hm listings ka ek alag folder bneyenge jo ki sirf users ka data usme hoga 
})

//Move the /listings/new route above the /listings/:id route in your code.
//error is CastError: Cast to ObjectId failed for value "new" (type string) at path "_id" for model "listing"
//Express matches routes in order, so the more specific /listings/new should come first.

//3.Route :A.route new & B.route Create route 
//so get: /listings/new isse hme ek form milega us from se post request jayegi to post:listings pr jisse hme ek nyi listing create hogi
//in simple term ek nayi list tyar krenge click button>get form fill details>send to database>appear on listings
//3.Route :A.route new
app.get("/listings/new",(req,res)=>{
    // res.send("working");//tested
    // console.log("working");
   res.render("./listings/newlisting.ejs");

});

//3.Route : B.route Create route 
app.post("/listings/updatelist",async(req,res)=>{

    const updatelist = new listing(req.body.listing);
    await updatelist.save();
     res.redirect("/listings");
    //we have two options either we can do it in this type ^ or in this following type but this ^^ type is easy and optimized
   // [ if go this we need .ejs file code in this type  <input name="title" type="name" placeholder="Enter your title">
   //     let {title,textarea,image,number,location,country} = req.body;
    //     let updatelist= new listing({
    //         title:title,
    //         description:textarea,
    //         image:image,
    //         number:number,
    //         location:location,
    //         country:country,
    //     });

    //    updatelist.save()
    //               .then((res)=>{console.log("data updated")})
    //               .catch((err)=>{console.log("data was not updated!")})
    //     //   const insert =await listing.insertMany({});
    //     //   console.log(updatelist);tested
    //       res.redirect("/listings");)
             //]
})
//2.Route : show route iska kaam hoga ki hmari listing ka pura ka pura data update ya delete krana
app.get("/listings/:id",async (req,res)=>{
    //ab jo bhi /listings/:id se id aayegi wo hm extract kr lenge
    let {id} =req.params; //upr app.use url encoded ka likho qki bowser link se hm id extract kr rhe
    //find by id se database se data yaha layenge and usko listing mein store kr lenge
    let listingg = await listing.findById(id);
    //show.ejs file create kro views folder ke andar uske andar hm id se mila listing mein store hua sara data print krwayenge\
    // console.log(listing);//tested
    res.render("./listings/show.ejs",{listingg});//go to show.ejs

})
//Move the /listings/new route above the /listings/:id route in your code.
//error is CastError: Cast to ObjectId failed for value "new" (type string) at path "_id" for model "listing"
//Express matches routes in order, so the more specific /listings/new should come first.
//Route 4:A.updateuser & B.Delete user
//Route 4:A.updateuser 
app.get("/listings/:id/updateuser",async(req,res)=>{
    const {id} = req.params;
    
    const listingg= await listing.findById(id);
   
    res.render("./listings/updateuser.ejs",{listingg});
})
app.put("/listings/:id/edited",async(req,res)=>{
        let {id} = req.params;
      // 2. Find the document by that ID and update it with the form data from req.body
        // The '...' spreads the properties from your form into the update command.
        // { runValidators: true } ensures your schema rules are applied during the update.
        await listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
         //res.redirect nhi likhna bcoz hm res jo aya uske leke redirect nhi kr rhe hm sirf redirect ke rhe yani redirect("/listings")
        // res.redirect("/listings"); //iski jagah hm user id mein hi reh sakte hai by this res.redirect(`/listings/${id}`);
        res.redirect(`/listings/${id}`);

    // console.log("kaam done boss");//tested
    // [ this approach will work but we dont know how and we dont want by this approach bcoz it is not optimize
    // let {id} = req.params;
    // listing.findByIdAndUpdate(id)
    //  let {title,textarea,image,number,location,country} = req.body.id;
    //     let updatelist2= new listing({
    //         title:title,
    //         description:textarea,
    //         image:image,
    //         number:number,
    //         location:location,
    //         country:country,
    //     });

    //    updatelist2.save()
    //               .then((res)=>{console.log("data updated hai user ka")})
    //               .catch((err)=>{console.log("user ka data was not updated!")});
    //    console.log(res);
    //             // res.redirect("/listings");]
})




//Route 4:B.Delete user
//pehle delete button bna lo show.ejs mein jakr and methodoverride krke delete method lga lo like this 
//<br><form action="/listings/<%=listingg._id%>/deleteuser_?Method=Delete"><button>Delete</button></form>
//then delete route create kro
app.delete("/listings/:id/deleteuser",async(req,res)=>{
    //extract id
    let {id} = req.params;
    let deletinguserlist=await listing.findByIdAndDelete(id);
    console.log(deletinguserlist);
    console.log("user deeted");
    res.redirect("/listings");
})

app.get("/",(req,res)=>{
    res.send("working");
});




app.listen("9090",(req,res)=>{
    console.log("server connected");
});

