const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/expresserror.js");
//const {listingSchema,reviewsschema} =require("../schema.js");//ye hta sakte hai qki hmne inka middleware kia isko phir authmiddleware mein shirt kia
const listing=require("../models/listing.js");

const {isloggedin}=require("../routes/authmiddleware.js");//then us particulr route mein jakr is middleware ko pass krdo
const {accesseopration,servervalidation}=require("../routes/authmiddleware.js");//import of middlewares from authmiddleware.js
const { authorize } = require("passport");

const controllerlistings=require("../controllers/clistings.js")

// In routes/listings.js geo map ko fetch kia
const fetch = require('node-fetch');


const multer=require("multer");

const {storage}= require("../cloudconfig.js");
const upload=multer({storage:storage});


//index route
router.get("/",wrapAsync(controllerlistings.index));
//new-form route
router.get("/new",isloggedin,controllerlistings.rendernewform);


//show route
router.get("/:id",wrapAsync(controllerlistings.showlistings));


//create route-re
router.post("/updatelist",isloggedin,upload.single("listing[image]"),servervalidation,wrapAsync(controllerlistings.createnewlisting));       

//edit route
router.get("/:id/updateuser",isloggedin,controllerlistings.editlisting)
//update route
router.put("/:id/edited",isloggedin,upload.single("listing[image]"),accesseopration,servervalidation,wrapAsync(controllerlistings.editedlisting));               

//delete route
router.delete("/:id/deleteuser",isloggedin,accesseopration,wrapAsync(controllerlistings.deletelisting));


module.exports=router;
