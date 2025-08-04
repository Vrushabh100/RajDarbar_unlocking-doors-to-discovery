//for accessoperation
const listing=require("../models/listing");
//for servervalidation & serverreviewvalidation
const ExpressError=require("../utils/expresserror.js");
const {listingSchema,reviewsschema} =require("../schema.js");
//for review
const reviews=require("../models/reviews.js");

module.exports.servervalidation=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
         let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{ next();       
}}

module.exports.serverreviewvalidation=(req,res,next)=>{
        let {error}= reviewsschema.validate(req.body);
        if(error){
           let errmsgtwo=error.details.map((el)=>el.message).join(",");
           throw new ExpressError(400,errmsgtwo);
        }else{ next();}}
//moduleexports.functionname= req,res=>{kya kam is function se krana chahte ho}
module.exports.isloggedin=(req,res,next)=>{
  // console.log(req.user);
    if(!req.isAuthenticated()){ 
        req.session.redirectUrl = req.originalUrl; 
          req.flash("error","you must be logged in!");
      return res.redirect("/login")
    }next();
}
module.exports.saveredirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl= req.session.redirectUrl;
  }next();
};//agr userlogin hua to uska path save kr lenge redirecturl mein then usko locals ke andar store krwa lenge 
module.exports.accesseopration=async(req,res,next)=>{
  //so id ko access krne ke liye hme listing model ki jarurat hogi so isi me hm upar require kr lenge
  let {id}=req.params;
        listingh= await listing.findByIdAndUpdate(id);
        console.log(listingh);
        if(!listingh.owner._id.equals(res.locals.curruser._id)){
            console.log("permission denied lala");
            req.flash("error","you don't have permission!!"); 
           return res.redirect(`/listings/${id}`);
        } next();
      };



module.exports.reviewaccopration=async(req,res,next)=>{
  //so id ko access krne ke liye hme listing model ki jarurat hogi so isi me hm upar require kr lenge
            let {id,reviewId}=req.params;
            let reviewd= await reviews.findById(reviewId);
            let rev=reviewd.author._id;
        if(!rev.equals(res.locals.curruser._id)){
            console.log("permission denied not author of review");
            req.flash("error","you are not the author of this review!"); 
           return res.redirect(`/listings/${id}`);
               } next();
        };