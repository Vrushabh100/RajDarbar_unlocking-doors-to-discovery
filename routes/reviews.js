const express= require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/expresserror.js");
const {reviewsschema} =require("../schema.js");
const listing=require("../models/listing.js");
const review=require("../models/reviews.js");
const {isloggedin,serverreviewvalidation,reviewaccopration}=require("./authmiddleware.js");
const controllerreview=require("../controllers/creviews.js")

//Route 5:Post review route
router.post("/",isloggedin,serverreviewvalidation,wrapAsync(controllerreview.createreview));

//Route 6: Delete Review Route
router.delete("/:reviewId",isloggedin,reviewaccopration,wrapAsync(controllerreview.destroyreview));
    
module.exports=router;