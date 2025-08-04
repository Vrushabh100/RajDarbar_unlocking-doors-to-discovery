const user=require("../models/user")
module.exports.signupone=(req,res)=>{
 res.render("users/signup.ejs"); }
module.exports.signuptwo=async(req,res)=>{
    try{ //extract user from req.body i.e form 
   let{username,email,password} = req.body;
   //store user into nayauser
   const nayauser=new user({email,username});
  const registeruser=await user.register(nayauser,password);
  console.log(registeruser);
  req.login(registeruser,(err)=>{
  if(err){
    return next(err);}  
  req.flash("success","Welcome Back to Wanderlust");  
   res.redirect("/listings");
    });}catch(e){
        req.flash("error",e.msg);
        res.redirect("/signup");
    } 
}

module.exports.login=async(req,res)=>{
        req.flash("success","Welcome Back to Wanderlust");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{//hm iske andar err denge taki logout krte waqt kuch error aaye to user ko err dikhe 
    // ye directly session end krke info delete kr deta hai inbult hota hai req.logout in passport methods
        if(err){ //if error found next(err) jo ki err server pe jayega app.js mein last
          return next(err);
        }//if err not found flash msg user logged out
        req.flash("success","you are logged out!"); //and redirect /listings
        res.redirect("/listings");
    }) 
}    