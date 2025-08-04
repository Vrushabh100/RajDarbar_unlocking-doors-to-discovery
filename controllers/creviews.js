const review=require("../models/reviews");
const listing=require("../models/listing")

module.exports.createreview=async(req,res)=>{
        let listingg=await listing.findById(req.params.id);
         //author id 
        let reviewlist=new review(req.body.reviews);
        
         reviewlist.author=req.user._id;
         console.log(reviewlist); 
      
       
        listingg.reviews.push(reviewlist);
        // await reviewauthor.save();
        await reviewlist.save();
        await listingg.save();
        req.flash("success","New Review Posted!");
        await  res.redirect(`/listings/${listingg._id}`); 
    }


module.exports.destroyreview=async(req,res)=>{
          let {id,reviewId}=req.params;
          await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});     
          await review.findById(reviewId);
          req.flash("success","New Review deleted!");
          res.redirect(`/listings/${id}`);
    }    


