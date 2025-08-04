const express= require("express");
const router=express.Router();
const user=require("../models/user");
const passport = require("passport");
const {isloggedin}=require("../routes/authmiddleware.js");
const {saveredirectUrl}=require("../routes/authmiddleware.js")
const controllerusers=require("../controllers/users.js")

//************************signup user route */

//we used router.route and MVC here as controller
router.route("/signup")
.get(controllerusers.signupone)
.post(controllerusers.signuptwo);

//************login user route */

router.route("/login")
.get((req,res)=>{res.render("users/login.ejs")})
//require passport
.post(saveredirectUrl,passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),controllerusers.login);

//***********************************LogOut User*********************************/
//logout route
router.get("/logout",isloggedin,controllerusers.logout)    

module.exports=router;