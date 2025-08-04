if(process.env.NODE_ENV !="production"){

require('dotenv').config();
console.log(process.env.SECRET);
}


const express= require("express");
const app=express(); 


const mongoose = require("mongoose");

const db_url=process.env.ATLAS_URL;
//process.env.ATLAS_URL;
console.log(db_url);
main()
    .then(()=>{console.log("connection to Mongo Database successful!")})
    .catch(err=>console.log(err));
async function main() {await mongoose.connect(db_url);}

const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/expresserror.js");
const {listingSchema,reviewsschema} =require("./schema.js"); 

const listing=require("./models/listing.js");
const reviews=require("./models/reviews.js");

//routers paths 
const listings=require("./routes/listings.js")
const reviewss=require("./routes/reviews.js")
const userRouter=require("./routes/newuser.js")


const passport=require("passport");
const localstratergy=require("passport-local");
const User=require("./models/user.js")

const path=require("path");

//requiring express-session that use for cookies and storages
const session=require("express-session");
//reuire to host the sessipn data as cookies hosting
 const mongoStore= require("connect-mongo");

flash=require("connect-flash");

const ejsmate= require("ejs-mate"); 
app.engine("ejs",ejsmate);

const methodOverride = require("method-override");
const Expresserror = require("./utils/expresserror.js");
const { error } = require("console");
app.use(methodOverride("_method"));


app.set("views",path.join(__dirname,"views"));
//isse public folder nominate ho jata hai ki usme sirf css ke hi files rhenge .css wale
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));


 const store = mongoStore.create({
    //in this pass database url which is in dburl
    mongoUrl: db_url, 
     crypto:{
    secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
})
//error handler
store.on("error",()=>{ console.log("ERROR IN MONGOSESSION STORE",err)});


const sessionoptions={
   store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
 
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
       
        httpOnly:true,      
    }};

app.use(session(sessionoptions)); 
app.use(flash());//flash ko sare routes shuru hone se pehle use krna pdega


//using passport app.use
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creating middleware for flash
 app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser = req.user; 
    next();
  
 });

app.use("/listings",listings);



app.use("/listings/:id/reviews",reviewss);


app.use("/",userRouter);


app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
   //works for this http://localhost:9090/lRank :  Page Not Found   
});


app.use((err,req,res,next)=>{
    let{statusCode=500,message="Error!"} = err;     

    res.status(statusCode).render("users/error.ejs",{err,message}); 
})


app.listen("9090",(req,res)=>{
    console.log("server connected");
});




