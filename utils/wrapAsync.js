module.exports=(fn)=>{
  return (req, res, next)=>{
    fn(req, res, next).catch(next);
  };
}
//module.exports directly upar se krne se error nhi ata as fn is not definem so jmne 
// function wrapasync((fn)=>{
//   return function((req,res,next){
//     fn(req,res,next).catch(next);
//   });
// })
// module.exports=wrapsync(); iski jagah upar waha likh dia


//******************************Validations and its types*******************************/
//validaton are of two types : 1.client side validation 2.server-side validation
//1.client side validation mtlab frontend mein jo hai jaise ki new.ejs,show.ejs hogya wo proper format main ho
//for ex.hmne apne project mein age newlist bnayi usme sifr price hi bhari to hme bs price hi dikhegi so is tarah ka kuch naho isliys hm client side validation krte hai
//2.server side validation yani server mein kuch address alag likh diya ya DB schema galat hogya ya DB mei data store ho nhi hua to us samay hm apne errors ko handle krenge

//1.client side validation : 
//form validation :when we enter data in the form ,the browser and/or the web server will check to see that the data is in correct format and within the constraints set by application.
//so isko implement krne ke liye hmko new.ejs mein jakr sabhi mb-3 wale class mein jo inputs hai unko required set kr do bs required likh kr but isme ek problem hai ki user 
//jb apni website alag -alag browser mein open krega to usko requied wale divs alag dikhenge  hm chahte hai ko wo alag n dikhe to bootstrap mei(already standarization set hai 
// goto bootstrap>forms>validation) ek property hoti hai usme validation bhi aajeyega also unko effects bhi aate hai so write novalidate class="need validation" and  required likho show.ejs mein
//  ad novalidation class="need validation likho" show.ejs ki styling mein like at mb-3 divs in the <form novalidate class="need validation"></form>
//bootsarap validations ke saath saath ek javacsript kacode bhi deta hai validations ke liye so create folder as js in public> folder cretate file script.js
//public>js>script.js > usme copy kia code paste kr do then ye js file link kr do boilerplate.ejs mein jakr <script src="/js/script.js"></script>
//istarike se jo standarize with css form ki jo validation hai wo ho gyi with effects


//success & failure message 
//like sb kuch form mein sahi likha to terms and conditions accept ho and submit ho 
//like agr validation fail ho jaye to msg dikhaye 
//isme agr hme terms and coudition ke liye valid krna hai ki jb uske check box pr click kre to hi form submit ho also kya chut gya hai wo bhi form btaye or agr hme valid pin code provide kro kehna hai 
//so uske liye hm valid-feedback wala clas lenge bootstrap se ye property msg display krati hai agr valid ho and invalid ho to like this
//like this in the div of title <div class="valid-feedback">title looks good</div> and  <div class="invalid-feedback">please enter a valid price</div>
//isme abhi bhi kuch vulnaribilities hai ki ki agr kisi ne patch aisi kuch request browser mein bheji to us case mein incorrect info hmare backend ke paas ja sakti
//  hai like frontend se form bina submit kiye backend mein ya kisi aur ke paas info chali jana
//so isiliye server isde pe hme alag se validations add krni hogi taki frontend se info leak hokr kisi aur ke paas na chali jaye 

//server side validation
//defining our custom error handler 
//agr kisi ne from mein "1200" aise price string mein likh kr bhej diya ya price ko @#$ aise sign lga diye to error ana chahiye and hm un error ko handle krenge
//create route mein /listings mein jakr sare code ko try{}block mein dali .catch(err){ next(err)} next se us error ko pass krdo apne error hnadler ke paas hm error handler define krenge at the last 
//defining error handler app.use((err,req,res,next)=>{res.send("something went wrong")}); ab jb hm price ke block mein eyfejn ye likhte to error ka ek alag se page show krta 
//for example agr error handler comment krke hmne price mein inpfdn ye likha to reference error: at /js aur sare paths dikhayi dete wo error hmara express handle krta aur wo hmare sare files ka path leak kr
//  deta lekin hmne apne error ko khudse handle kia jisse hm jo chahe dikha sakte hai reference error: /js paths ki jagah
//ab ye to hmne simple error handle kia uski jagah hm async error ko bhi handle kr sakte hai using functions callback as wrapsync functions
//ab iske liye hm alag se folder bnayenge named "utils" usme file bnayenge wrapasync.js uske andar hm apna wrapasync fuunction define krenge then usko exports krna as module.exports=functionname
//define wrapasync function in utils>wrapasync.js
// function wrapasync((fn)=>{
//   return function((req,res,next){
//     fn(req,res,next).catch(next);
//   });
// })
// module.exports=wrapsync();
//in app.js at top const wrapasync=require("./utils/wrapasync.js")
//test it if server dont crash then waha pr hmari error handling hui hai : tested server dont crash and after click create it shows yaha pr kuch error hai  worked
//ab hm iss function ko apne app.js mein kahi bhi use kr sakte hai even jaha hmne try catch ko use waha bhi hm isko use kr sakte hai

//********************creating custom express error  */
//ye sb kis liye : taki jb form wrong fill krke jb hme error aarha tha yaha koi error hai krke hm waha error ka status code with messege dikhana chahte hai
//hm file create krenge utils mein as expresserror.js i.e utils>expresserror.js
//then create class expresserror that extends Error then call constructor pass status and message that we want to display then in same constructor call super(); constructor then use this.status=status and this.message=message then module.exports it like this
//just like this class Expresserror extends Error { constructor(statuscode,message){ super(); this.statuscode=statuscode; this.message=message;}}module.exports=Expresserror; 
//then require it in app.js at the top as const expresserror=require(./public/utils/expresserror.js)
//go to error handler at last in app.js then remove that "yaha koi error hai" line insted of that define let{statuscode,messege} from err then send it to user as res.status(statuscode).send("this is not a valid information");

//ye hm agr galat path dalta hai tb aayega like localhost:9090/random pe Page Not Found ye aayega
//ab hm chahte hai ki jb user hmare defines routes ke alawa kisi aur route  pr chala jaye jo exist hi nhi krta uspr hme page not found ka msg dena hai
//to go to second last end of app.js define app.all then * insted of route jo ki define hoga ki agr hmare sare routes mein se nhi hai ti ispr req jayegi then iske ndar hm next likhenge uske andar hm new expresserror throw  krenge then uskme hm apna statuscode and message likhenge 
// app.all("*",(req,res,next)=>{ next(new expresserror(404,"page not found"));}) isme for all routes except define route ke liye hai then wo invalid route ki req lega then usko next se hokr expresserror ke function ko call krega us required file se then wo us function ke andar statuscoe
//  and message pass krege then next() mein hmara expresserror hai wo usko pass krega hmare error handler ke paas then error handler err ko handle krega 
 

//this works on when we fill form wrong then it will give us cliert side error frontend itself tells us to fill
//but when hacker fill from hopscotch havin put request he can fill wrong info from there so we want to ensure that server side will also have exact data as client side  frontend data 
//Error.ejs hm chahte hai ki ja bhi hm galat path type kre ya galat info type kare to client side pe jo aise errors Cannot GET /listings/686ebe6a897bdd2eb46f6483/jbfdv aate hai waise hme na dikhe
//hm views ke folder mein ek file bnayenge named error.ejs  uske andar hm use krenge bootstrap alerts ka  views>error.ejs
//goto bootstrap>alerts>cpy code and paste in the file and link to <% layout ("/layouts/boilerplate")%> boilerplate.ejs
//then in app.js error.ejs ki file render krenge thenusme pass krenge apna message then usko with print krwa denge go to app.js at error handler



//we have done three types of error handle
//1. agr http://localhost:9090/listings/ghnugwd72t32t2d glat id bheji to Cast to ObjectId failed for value "ghn" (type string) at path "_id" for model "listing"
//2. agr http://localhost:9090/listinrsaad galt path bheja to Page Not Found
//3 agr http://localhost:9090/listings/updatelist form se galat data bheja to //listing validation failed: price: Cast to Number failed for value "3523ad" (type string) at path "price"



//validation for schema
//we have done DB side schema validation but not done server side backend schema validation jisse DB mein jane se pehle server side pe bhi schema validate hoga 
//isme agr hmne put req bheji backend pr DB mein data save krwane ke liye jisme hmne description and title nhi likha to bhi wo save hoga isme frontend yani client side error bypass hokr sidhe backend server side se data bheja usse hmare db ke andar data store hua 
//so hm chahte hai ki server side se like hopscotch se agr koi data bheje wo directly DB mein store na ho uska bhi ek validation ho jisko hm DB shema ka validation krenge
//isko validate krne ke liye 2 tarike hai 
//1.app.js mein is route pr jao app.post("/listings/updatelist",wrapAsync(async(req,res)=>{ usme condition dalna if(!description //description exist nhi krta ){ throw new Error(303,"not exist")} and aisi condition hme sabhi like title,price,country ke liye likhni pdegi 
//but jb hmare pass jyada inputs honge tb sabhi inputs ke liye condition likhna possible nhi isliye hm ek seperate schema validate krenge server side backend 
//schema validation ke liye ek npm pakage ata hai named joi wo smjho ek api hai jo schema ke according agr data nhi mila to wo data backend  mein store nhi hone deta  
//go to joi.dev >api references 
//so joi ka hm ek schema define krenge and ye jo schema hai wo mongoose ke liye schema nhi hota ye server side validation schema hota hai 
//isse hmare paas server side schema and mongoose ka db side schema hoga usse two layers of security bn jayegi schema validation ki 
//create file in x as schema.js then reuire joi in it after that define schema as also require text from express as //const { text } = require("express");
//const listingschema= Joi.schema({ //isme hm joi se kuch exceptions bhi de sakte hai    //listing honi hi honi chahiye uske andar ek object hona then us object mein title hona wo title string form mein hi hona and wo required hi hona chahiye also for all 
// except image like image allow hoga agr null bhi rhi to then  object bhi required hona hi hona chahiye price: joi.number().required().min(0),    image: joi.string().allow("",null), }).required
//the  us schema ko export kr do then app.js mein us file ko require krke use ek naye const jo ki exports kiye wale se alag hoga use phir use krenge app.post mei  then hmara joi jo bhi data save krega and jo bhi error dega hm un error ko throw kr denge hmare error handler ke paas 

//ab hm inko server side schema validation ko ek moddleware mein jaise convert krenge 
//hm jo bhi part joi se related hai usko ek function mein dal denge like const serversidevalidation =(req,res,next)=>{//jo sara code app.post mein likha tha wo sara code yaha cpy paste kr denge bs jo hmne result nikala uski jagah hm usme se {error}aise error nikal lenge fir wo error throw krenge}
//passing servervalidation as a middleware in app.ja in app.post(/listing/updtelist) like this app.post("/listings/updatelist",servervalidation,wrapAsync joki hmne uska function bnaya hua hai to hm pass kr sakte hai
       //means is route pr jb req aayegi pehle servervalidation hoga uske function mein jakr then wrapsync then aage ki process hogi
//ab hm isko jaise wrapsync use kia tha kahi bhi same waise use kr sakte hai to hm app.put main bhi yahi use krenge paass krenge as a middleware AND APP.put mein bhi if wali condition ko hta sakte hai 
    //hm error joi se error ka message extract krenge error.details.map se then el se error ke message ko nikalenge us msg ko join krenge comma se then usko pass krenge
   //like this in middleware function let errmsg=error.details.map((el)=>el.message).join(",");




//**************************Handling Deletion Using Mongoose Middleware*************************/


//isme hme jb instagram ke post delete krte hai to user delete nhi hota bs post delete hote hai but jb hm user delete krte hai tb uske posts and reels bhi uske saath saath delete ho jati hai so in short jb hm kuch delete krte hai to delete dekhe ki uske saath related kya kya hai and usko bhi delete krde 
//it is casceding of deletion ki kaise deletion ek jageh se dusri jeghe tk cascade krega yani relation milta hai to wo bhi delete krega
//we are using  query middleware for this: query middleware are the special type of middleware that execute when the exec(),then().await() call on the query object in the query middleware function ,this refers to the query 
//we can perform operations: delete ,deletemany,deleteone,find,findone,findoneanddelete,remove,replaceone,update
//in simple case hmare paas ek customer hai jisne 2 orders diye hai lekin ab wo customer ghar nhi hai and usne orders bhi delete kr diye so hm jb bhi deletion krte hai to hm sirf uska order hi delete kr pate hai qki order ke hi andar customer ki id hoti hai jo ki customer ko point krti hai 
//but hme chahiye ki order ke sath sath customer bhi delete ho so to achieve this we will use two middlewares as
//pre & Post
//pre: run before the query is executed :agr hme kuch execute hone ke pehle kuch kaam like deletion  krna ho to pre middleware use krte hai
//post: run after the query is executed :agr hme kuch execute hone ke baad kuch kaam like deletion  krna ho to pre middleware use krte hai
//pre:pre middleware execute one after another when calls next()
//const schema=new schema({.....});
//schema.pre("save",function(next)){ do stuff  then next();});
//isko krne ek problem hai ki isme findbyidand delete nhi kr sakte lekin  hm isme findoneanddelete kr sakte hai isliye hm pehle findbyidanddelete krenge usse next() se call krke 2 middleware min jayenge jisme findoneand delete hoga and pehle middleware se id bhi aajayegi then usko hm exe() krenge.
//customerSchema.pre("findOneAndDelete",Async(customer)=>{console.log("premiddleware");})
//postmiddleware
////customerSchema.post("findOneAndDelete",Async(customer)=>{
// if(customer.order.length){
// Order.deleteMAny({ _id: { $in:customer.order}})})//customer ke andar jo bhi orders hai umki _id milegi then wo id's deletemany se Orders ke andar se delete ho jayegi


//*****************************creating new schema for reviews********************** */
//go to reviews.js in models add this 
// reviews:[ // {type: schema.Types.ObjectId,  ref:"review",//yaha sirf hmne reviews ka schema define kia actual review ke liye hm forms ko built krenge}]
//then we will create reviews form in two steps
//step1:setting up the reviews form
//we will create reviews in show.ejs so that when user click on particular list then after the list open he get the reviews wala page just after the edit delete buttons
//now go to show.ejs at the bottom
//we done step 1:we create frontend part in show.ejs
//now step2:submitting the form
//Post:/listing/:id/reviews
//go to app.post(/listing/:id/reviews)
//ab waha bs data ja rha hai and wo db mein reviews store ho rha hai

//**************************************validations for reviews******************************/

//client-side validation
//serverside validation

//client-side validation:-
//hmne jo jo validations lgaye the show.ejs ke ya form fill krne ke time mein same wahi validations yaha lgane hai 


//ye to hogya client side validation

//lekin isme ek loophole hai like hm hopscotch se ek post request bhej sakte hai jisse galat data bhi enter kia ja sakta hai and wo client side validation ko by pass kr sakta hai 
//ye loophole ko mitane ke liye hm server side validation krenge taki client jo details dale wo server side bhi confirm ho

//so serverside validation mein hmne joi schema ko create kia tha then uska ek functon create kia tha then us function ko as a middleware pass kia tha particulare route mein
//so hm x>schema.js mein jakr hmare hisab se ek new joi scjema design krenge then usko exports krnege like this const reviewsschema=joi.object({  reviews:joi.object({    rating:joi.number().required()
// ,comment:joi.string().required(),}).required()});module.exports=reviewsschema;
//then usko app.js mein like this const {listingSchema,reviewsschema} =require("./schema.js"); usi mein hi require kr sakte hai or alag se bhi const reviewsschema =require("./schema.js"); require kr sakte hai 
//then jaisa validatelistings ka function bnaya same waisa hi function validate reviews ka bnana hai like this const serverreviewvalidation=(req,res,next)=>{    let {error}= reviewsschema.validate(req.body);
//   let errmsgtwo=error.details.map((el)=>el.message).join(",");    if(error){        throw new ExpressError(308,errmsgtwo);    }else{ next();}}
//then us schema ko as a middleware pass krna hai app.post("/listings/:id/reviews",serverreviewvalidation,wrapAsync,(async(req,res)=>{
//sath hi sath wrapasync bhi lgayenge taki async finction ke error ko sambhala ja sake and server crash na ho

//**************rendering********************************/
//so rendering mein hm jo app.post se reviews ka data bheja tha wo hme show.ejs mein dikhana hai wo data entry in reviews section
//now go to show.ejs in that after reviews form then write h4 all reviews and create reviews section in that <p><=listingg.reviews</p> pass kro usse hme rating ki and comment 
// ki object id dikhegi show route mein qki hmne schema define krte time typeof lgaya tha jo ki object id deta hai insted of objects total data
//jaise jaise reviews add hote jayenge waise waise reviews ki id hme dikhti jayegi mgr hm chahte hai ki siff id na aaye uske saath uska data bhi aaye
//id ke sath uska data lane ke liye hm method use krte hai populate so hme show wale route mein jakr findby(Id).pupulate likhna hai then hmare paas id ke sath uska data bhi show krege



//ek problem aya tha ki ref mein and schema mein review and reviews tha farak tha 

//********************************styling the reviews**************** */
//go to show.ejs at all reviews section we need to add the card properties from bootstrap 
//so goto bootstrap then go to card then apply properties as namin the class and the divs according to the bootstrap
//hmare paas card class tha style.css mein usme border ko none krke important liya tha usse bootstrap kisi bhi card wale class ko styling nhi de sajta so hmne sare card wale calss mein listing-card class jod dia like in show.ejs and index.ejs then hmne style.scc mein bhi card ki jagah listing card likha 
//ab hmare card ko styling with borders lg sakti hai


//********************************DELETING REVIEWS*********************************/

//we use Mongo $pull operator to delete 
//$pull the $pull operator removes from an existing array all instances of the values that match a specific condition
//hm delete button create krenge show.ejs mein 
//so, pehle jb hm delete button create jrte the by old method idealy wo request jati thi /listings/:id ke paas 
//lekin ab hmari delete request jayegi /listings/:id/reviews/:reviewid iske paas iska mtal hr jo review hai wo khud to delete hona hi chahiye plus wo listing ke array se bhi delete hona chahiye 
//so show.ejs mein for loop ke baad mb-3 class ka form bnayenge then usme delete button denge form ke sath POST request se methodoverride hokr delete request jayegi /listings/:idlisting.id/reviews/:idrevirews.id
//aise    <form action="/listings/<%=listingg._id%>/reviews/<%=review._id%>?_method=DELETE">         <button class="btn btn-sm btn-dark">Delete</button>     </form></div>
//then go to app.js and create the new route app.delete("/listings/:id/reviews/:reviewId" the wrapasync then id and reviewId nikalo from url using req.params then await krke revies.findByid(iske andar reviewId pass krdo)
//ab ye review reviewid se to delete ho gya but uski id abhi bhi .listings ke array mein hai to hme usko us listing ke array ke andar jakr delete krna pdega
//lekin listing se delete krenge to listing bhi delete hogi to hm listing se reviewid ko delete krle update krenge using findbyidandupdate($pull) then iske andar hme reviewid ko delete krne ke liye hm $pull operator ka use krenge 
//taki bracket ke andar reviewid delte hojaye and findbyidandupdatese update bhi hojaye
//so hm bracket ke andar id ko pass krenge then uske baad  aise likhenge like ($pull:{reviews:reviewId})yani deletkaro ya $pull karo reviews array ke andar se reviewId ko 
//id>$pull>reviewsarray>reviewId 




//*************************************Affects on Reviews when we delete listing************************* */

//delet middleware for lisitng 
//so ab tk jb hm review delete kr rhe the to wo listing ke andar se bhi unki ids delete ho rhi thi
//lekin agr listing ke andar bohot sare reviews ho and is case mein hm listing ko ho delete krde to uske andar jo store reviews hai unke saath kya hoga
//ho rha hai ki jb listing delte krte hai to uske andar ke reviews delete nhi ho rhe mgr listing delete ho rhi 
//so iske liye jaha pr hmne listing schema create kia hai listing.js mein uske andar hi hm ek post mongoose create krenge wo findOneandDelete pr kaam krega uske andar listing aayegi then uspr hm operation perform krenge
//like review wale model ko deletemany se uske andR condition deke delete krwa denge conditon like this ({_id:{$in:listing.reviews}})yani listing ke andar jitne bhi reviews hai unko $in se ekatha krlo phir unme se _id ke 
// saath jo match kare unko deletemay se review wale model ke andar se deletekrdo
////adding mongoose middleware 
//listingschema.post("findOneAndDelete",async(listing)=>{
  //  if(listing){  //await review.deleteMany({_id:{$in:listing.reviews}})}})
 //review wale model ko require kro listing.js mein as 
//const review=require("./reviews"); then 

//******************************end of phase 2 part:a************************* */


//******************DAy :48************************** */

//**************************PHASE2: PART:B***************************/
//*******************restructuring app.js*******************/
//***********************restructuring listings from app.js */



/*

in this we are going to restructure listings
app.use("/listings",listings);
so we create a new folder in x as routes then in that we create file as listing.js
then in app.js we will copy all the routes and paste it in >listing.js also insted of app.use and app.method we write router.use and router.method
then >listing.js module.exports=router then in listing.js require the router object const router=express.Router(); jo ki inbuilt express ke ansdar hOTA hai
 then
 in app.js >write this app.use("/listings",listings);insted of that shifted routes place
 and jo bhi /listings wale routes the inko hmne bs / mein convert kia 
 //isse hmne jo bji /listings wale routes the unko router ke andar listing.js ke andar bhejkr router mein bhej dia isse jo bhi request / pr jayegi 
 // wo /listing mein convert hokr app.use kia jagah router.use se hogi
in>list.js>abhi bhi hm jo routes mein wrapAsync and validations use kre hai unka middleware base code app.js mein hai so hmne jo bhi 
un routes mein use kia unko hm listings.js mein require kr denge
and jo bhi require mein paths hai ./ mein unko ../ parent directory mein kro qki hmara router folder app.js wale folder se bahar hai
 hm routes ke saath sath servervalidation ko bhi cut krke paste kr denge 
 and app.js mein jo bhi hmne /* iske andar*8/ iske andar likha hai wo app.js ke routes hai jo ki hmne paste kie hai listings.js mein
 //router object ko export kia then app.js mein iski file ko require kia then app.use("/listings",listings);
 //ye line likhi isse sara access app.js mein ye file ka aagya

so hmne sara router wala part hta liya app.js se and unko listings.js me dal dia and uske function using ke related jo bhi

//************************************restructuring reviews from app.js **************************** */

//restructuring the reviews
//app.use("listings/:id/reviews",reviews);
//router=express.Router()({mergeParams:true});
//same krna jaisa listings ke liye kia 
//create file in routes  as reviews.js
//cut reviews wale 2 routes and paste it in routes.js
//place router.methods insted of app.mothods 
//module.exports=router;
//remove the common part from both routes as listings/:id/reviews from both  listings/:id/reviews from 1st route and 2nd route listings/:id/reviews/:reviewId
//now in app.js require reviews.js as const reviews=require("../models/reviews.js");
//then write app.use("listings/:id/reviews",reviews); in place where you remove reviews wale routes from app.js isme "listings/:id/reviews wala part common tha usko remove kra wo replace hogya reviews se 
//cut validatereview middleware from app.js and paste it in reviews.js

//ek problem ata hai ki reviews undefined ata hai so jb hm app.js se app.use("listings/:id/reviews",reviews); ye bhejte hai tb ismeka :id isi app.js mein reh jata hai baki sara reviews.js mein jata hai 
//so hme :id ko app.js se reviews.js mein bhejna hoga so uske liye hmare paas ek optional router hota hai merge params naam se //router=express.Router()({mergeParams:true});
//so ye allows krta hai :id ko uske parent ke sath yani /listings ke sath merge hokr bhejne ko
//so iske router=express.Router(andar)  ye likho >({mergeParams:true});


//**********************************Express Router And Cookies******************************/
//express router is a way to organize your Express Application Such That our Primary app.js file does not become bloated(badasa codebase ho jana ek hi file mein)
//const router =express.Router() :creates new router object
//ye use isliye kia hota hai ki jo hmne app.js mein ya kahi bhi itna complex code likha hai ki wo samajh ne me pareshani hoti hai 
//to usko takle krne ke liye hm expressrouter ka use krte hai taki wo chode chote tukdo mein bat jaye 
//generally isko use krna compulsary nhi hai but jb hmari website jyada lines ki hojaye and complex lge samajne ko to hm use krte hai




//**********************************************COOKIES*********************************************/


/*
Web cookies : HTTP cookies are small blocks of data created by a web server when a user are browing a website and placed on users computer and any other device by the users web browser
one of the type of cookies is session management isme jb hm website pr jake kuch cheeze cart mein add krte hai then usko band krke wapis chalu krte hai to hme cart ka data khali nhi dikhta 
usme wahi data rehta hai because jo hm data fillup krte hai wo data cookies ke form mein webserver mein store rehta hai phir wo tb use hota hai jb hm usi website ko revisit krte hai
cookies hmesha name-value pair mein store hoti hai jaise hmara key-value pair hai waise 
cookies yaad rakh pati hai ki app is website pe konse pages ya konse routes se yaha travel krke aaye ho 
cookies hmesha server send krta hai for more detailed goto express read docs on cookie



*********************************Sending cookies************************************

in express

app.get("/setcookies",(req,res)=>{
  res.cookie("greet","namaste");
  isme greet hmara cookie ka name hoga and namaste uski value hogi
  res.cookie("kaise","ho");
  res.send("we have sent you some cookies");
  })
  agr hm setcookies wale route pr jaye to network tab mein hmare paas server greet namaste wali cookie bhejta hai 



****************************************Cookie Parser**************************************

ye puri cookie wale concept ko hm tb implement krte hai jb hm authentication and authorization ke sath deal krte hai 


ab ek case hai hmne cookie to bhej dia lekin dusra page access kaise krega and usko read ya parse(read) kaise krega 

directly req se cookie ko read krna possible nhi hota bhalehi hm id ya form data parse read kr sakte hai lekin cookie nhi kr sakte hai 
so iske liye hm cookie parser ka use krte hai 
cookie parser is na npm pakage 
INSTALL : npm i cookie-parser
require cookie parser 
as const cookieParser= require("cookie-parser");
ans ise use krne ke liye hm sidhe likhte hai app.use then uske andar hm pass kr dete hai cookie parser 


cookie parser pakage
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/setcookies",(req,res)=>{
  console.dir(req.cookies);
  res.send("we have sent you some cookies");
});

app.get("/setcookies",(req,res)=>{
  let {name :"vrushabh"}=req.cookies;
  res.send(`cookie hi i am ${name}`);
});




********************************************************signed cookies******************************

cookies ke sath tampering kra ja sakta hai mtlab uske sath chedkhani ki ja sakti hai and cookies ko network tab mein jakr change bhi kia ja sakta hai 
so aise cookie ko tempering ya unintension se bachane ke liye hm cookie ko signed dete hai 
isse server se jo cookie bhaji uspr type of seal lg jata hai and route pe verify hote time sealed check krke us cookia ko accept kia jata hai 
jaise secreate code data jo bhejna hai > wo convert hota hai unreadable format mein by  using signed:true then jb wo cookie verify hoti hai then usko wapis readable format mein la dia jata hai 



send signed cookies
app.use(cookieParser("secretecode"));

app.get("/getssignedcookies",(req,res)=>{
  res.cookie("Red","color",{signed:true});
  res.send("done!");
  });


verify signed cookies
app.get("/verify",(req,res)=>{
  res.send(req.signedCookie);
  });  

so cookie ki value unreadable format mein rehti hai lekin phir bhi kisi tarah se koi iske sath ched khanhi krta hai ya change krta hai value ko to hmare pass jb verify hogi cookie to wo 
decode nhi kr payegi and empty string degi and signed:false dega iska mtlab beech mein cokie ke sath koi manipulation hua hai 






*/



//************************************Phase 2 :Part : C ******************************************************************************************/



/******************state********** */

/* 

Session : means jb bhi hmara client server ke sath ek baar interact krta hai use hm 1 session kehte hai 
Protocols: jis rule ya restrictions ke sath hmare req and res ja rhe hai unko hm protocols kehte hai 
Protocols has two types:
1.Stateful Protocols: Stateful protocol require server to save the session information ex.ftp


2.stateless protocol: it does not require the server to retain (retire) the server information or data ex.http
//http is a stateless protocol jiske andar koi information store nhi hoti

so jb bhi hm express ke through hmare server ko setup krte hai to wo http ke upar kam kr rha hai so isse jo bhi 
session ya information ki lenden chal rhi hai server to client uski koi bhi information store hi ho rhi server side pe


hm http ko stateless se stateful mein krwa sakte hai yani http se information alag alag tarike se store krwa sakte hai even though protocol stateless hai 


Express Session 
an attempt to make our session stateful using http
ab smajhi ki ek user ne ek transaction kiya to uski ek session id bni and user 2 ne dusra transaction kia to uaki ek session id automatically bni 
aur ye automatically session se related info store krta hai and us session ki id bnake dene wala kaam hmara express hme krke deta hai

ab man lo ki user 1 ne revisit kia usi transation wale page pe to hmara express use information nhi bhejega wo us session ki id bhejega and ye id directly nhi store hogi 
balki ye session id user ke device pe in the ofrm of a cookie store hogi
and ye jo cookies hai unlko hm database mein store nhi krwate unko hm temperary storage ke andar store krwate hai

hm cookies ke andar session id ki jgah uski info kyu store nhi krwa te qki cookies ki storage limit bohot km hoti hai and uski security bhi strong nhi hoti isiliye hm id store kewate hai taki kam storage and unreadable form mein sari cheeze store ho


not go to exprsesion.js
npm i express-session
require it and store it in session
require express app 
create server 

express-section is a middleware 

app.use(session({secret:"mera secret data"}));
create route
app.get("/",(req,res)=>{
  res.send("your secreates");
  })
now inspect that page >Application>storage>cookies>double tap
gb yaha ek session id browser ke andar store ho chuki hai cookie name mein and uski unfo bhi hme dikh jayegi cookie value mein 

*********************counting the no of visits on our websie using temperary storage
//hm chahte hai ki jaise hi route pe trigger ho search ya refresh se to wo hme count mein de ki ye route pe user kitne baar aya hai 
app.get("/visits",(req,res)=>{//ispr trigger hoga ki user ne kitni baar is pr visit kia hai
    if(req.session.count){//agr exist krti hai to count ++ kro 
        id= req.session.count++; //ye abhi to temp storage ko use kr rha hai but hme ek alag session storage ka use krte hai ex.cassandra store,cluster store,connect-arango etc..
    }else{  id= req.session.count=1; //nhi to ek hi return krdo }res.send(`you visited this site ${id} times!`);});


*****************storing and using session info
//we use sessionoptions it is used to add more session on same page or route
const sessionoptions={
    secret:"mera secret data",
    resave:false,//isse console mein deplecated warning nhi aati 
    saveUninitialized:true,//ye session initialize nhi bhi hua to bhi chalane ke liye hai
 };
 app.use(session(sessionoptions));


app.get("/register",(req,res)=>{
    //extracting name from url
    let {name="ananonomus"}=req.query;//if agr name exist nhi krta to default name aayega as anonomyus
    req.session.name=name;//http://localhost:7676/register?name=jaiiinvrushabh :jaiiinvrushabh
    res.send(name);
});
//isko browser mein is tarike se likhna tumhara res mein name aayega like this /routename?name=tumharanaam
//and isi session id ki value ko hm dusre callback or route ke andar bhi use kr sakte hai 
app.get("/hello",(req,res)=>{
    res.send(`hello your name is ${req.session.name} ! right last visited on register`);
})
//http://localhost:7676/register?name=jaiiinvrushabh :jaiiinvrushabh
//http://localhost:7676/hello :  hello your name is jaiiinvrushabh ! right last visited on register



**************************using connect flash
it is npm pakage jo messeges ko flash krwane mein hmari help krta hai
the flah is a special area of sessio used for storing messages.messages are writtened to the flash and cleared after being displayed to the user 
isse hm popup notificaTION bhi bhej sakte hai
jaise ki kuch add,update,ya delete hua to inke alert from mein mgs pop hoke aane chahiye
install npm
npm i connect-flash
flash messages are stored in the session.first setup session as usual by enabaling cookieParser and Session middleware.then ,use flash middleware provided by connect-flash
flash ko use krne ke liye sessions ko use krna jaruri hai
//require it

//npm i flash-session installed flash to show temperary notification popups to use flash the session is required
//require it flsah=require("connect-flash");
//then write app.use(flash()); just after session middleware
//then use falsh in middleware as req.flash(at this write key,message); key mtab aisi ek string jiske basis pr hm apne msg ko identify kr sake then message jo hm dikhana chahte hai
//lekin aise directly msg dikhayi nhi dega uske liye hme views ko use krna pdega copy and paste this  app.set("views",path.join(__dirname,"views"));app.use(express.static(path.join(__dirname,"/public")));
//create views folder in that create file mk.ejs then random html txt them in body hello <=name%>
// app.use(session(sessionoptions));  app.use(flash());
app.get("/loginn",(req,res)=>{
      let {name="ananonomus"}=req.query;
      req.session.name=name;
      req.flash("success","user login successfully");
      res.redirect("/info");});
     
app.get("/info",(req,res)=>{
     res.render("mk.ejs",{name: req.session.name,msg:req.flash("success")});//mk.ejs file mein
     //  name and msg ka access hai and msg se flash krwaya uske andar key success se msg ko acces krvaya
    //ye msg ek hi baar dikhega qki temperary storage mein ek hi baar display hota hai msg phir refresh krne pr delete hojayega
});



*************************using res.locals
res.local ek property hoti hai jo local verible bnane se hme  res.render("mk.ejs",{name: req.session.name,msg:req.flash("success")}); aise nhi likhna pdta 
//hm res.locals.message =req.flash("success")  then hm bs render krenge file ko and file mein message directly la sakte hai 
//for example hm error ke liye likhnege if condition se agar ananymoun rha to register nhi hua 
app.get("/loginn",(req,res)=>{
      let {name="ananonomus"}=req.query;
       req.session.name=name;
      if(name === ananomous){
      req.flash("error","user not register");
      }else{req.flash("success","user login successfully");}
       res.redirect("/info");});
     
app.get("/info",(req,res)=>{
     res.locals.success=req.flash("success");/siko directely .ejs mein use kr sakte hai alag se render mein passkrne ki jarurat nhi hai 
     res.locals.error=req.flash("error");
     res.render("mk.ejs",{name: req.session.name});//locals use krne pr alag se ye likhne ki jarurat nhi hai msg:req.flash("success")
});
//lekin locals ko use krne ka isse better tarika hai middleware form karo 
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  next(); })
***********end of practice session and start of Implementing in project********************************************************************************************************************
//now after locals and session we are implementing that in our project



//requiring express-session that use for cookies and storages
const session=require("express-session");


//we use sessionoptions it is used to add more session on same page or route
const sessionoptions={
    secret:"mera secret data",
    resave:false,//isse console mein deplecated warning nhi aati 
    saveUninitialized:true,//ye session initialize nhi bhi hua to bhi chalane ke liye hai
 };

app.use(session(sessionoptions)); 


cookie ka kam hota hai sessions ko track krna 
cookie ki koi expirydate nhi hoti 

so agr hm insta pe loin krte hai and tab band krte hai then kuch minutes baad wapis kholte hai to hme wo lohin nhi puchta wahi agr tab i week baad kholo to hme wo login ke liye puchega
so hm apne liye cookie ki expiry date set kr sakte hai
go to sessionoptions in app.js set cookie expires :Date.now()abhi cookie chalu ho then + 7days*24hours*60minutes*60seconds*1000miliseconds,itne milisesonds ke baad ye cookie expire hojaye

//npm i flash-session 
// installed flash to show temperary notification popups to use flash the session is required
//require it flsah=require("connect-flash");
//then write app.use(flash()); just after session middleware
//jase hi new listing create kre to msg flash ho new listing created


app.use(session(sessionoptions)); 
app.use(flash());//flash ko sare routes shuru hone se pehle use krna pdega
//route mein flash ke mgs and key amd condition likhenge
//go to routes>listings.js>updatelist wale create route mein 
//creating middleware for flash
 app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    next();//next ko call krna mt bhuna verna isi middleware ke upar hm stuck hokr reh jayenge and chakra ghumta rhega
 })
then index.ejs mein upar <=successMsg=> likhko

home page pe New Listing Created! ye msg add hua temperary then ye delete ho jayega
ye msg accha nhi lg rha so is msg ko hm styling dene wale hai and is msg ko hm index.ejs mein na likhte hue directly hm ise boilerpllate.ejs mein likhenge
layouts>boilerplate usme navbar ke baad container class mein body se just upar pehle naya include create krenge succesMsg ke liye  
goto includes>create flash.ejs file
<% if(successMsg && successMsg.length){ %>
    <!-- agr successMsg exist krega to ho print krwana aur successMsg ek array hai aur wo khali nhi hona chahiye uske liye success.length -->
<div class="alert alert-success alert-dismissible fade show cols-6 offset-3" role="alert">  <h1><%=successMsg %></h1> 
    <!-- button to dismiss the alert -->
     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div> <% } %>

thik aise hi hm deleted ke liye bhi msg flash krwa sakte hai 
sb jaha jaha pr update ,delete,create horhi waha waha pr ye likho success key hai ye to constant rhegi bs msg change hoga hr taraf
jayenge delete wale route mein res.redirect ke pehle ye likhenge
req.flash("successMsg","Listing Deleted!");
same sare routes ke liye even reviews.js mein bhi reviews wale routes ke liye

ab hm same chheez error ke liye krenge ki agr koi create,edit,delete krte time error aya to usko lal rang mein msg show kre error wala
goto app.js then app.use((req,res,next)=>{ res.locals.errorMsg=req.flash("error"); next();});
go to listings.js then in route /:id in show route  uske andar ek condition likho ki agr listing exist nhi krti to flash krdo msg ko 
as if(!listingg){//agr listing exist nhi krti to error se msg dikhao and redirect kro /listings pr
     req.flash("error","Listing you Requested for does not exist !"); res.redirect("/listings");}
same edit route ke liye bhi likho 

*/







//*************************************************Phase-2 (PART-D)****************************************************************************************************************************/







/*



***********************Authenticaion & Authorization*************************************

//iske concepts user side pe based honge and ye concepts dusri website bnane ke liye bhi use kie ja sakte hai

//Authenticaion : it is the process of who someone else is : fingure print by which aadhar card is validated or phone giving fingerprint it detects you are the owner na dit open
                    in simple terms user se login ,register,signup krwa lena

//Authorizaion : It is the process of Verifying what specific applications,files,data a user have access to 
                 login ke baad website ke kis kis part ka access hai user ke paas



********************How Are Password Stored****************

teen cheeze hoti hai jb hm website pe register krte waqt store krwate hai 
email,username,passwords: isme se email,username to hm directly store krte hai but hm passwords ko  directly website pr store nhi krte

for example databse leak hogya or detabase password gack ho gya to us case me passwords leak ho jate hai isiliye hm secured tarike se password ko store krte hai 


//We Never stored Password as it is .We stored their Hashed form 
password>vrubhahsach@1322>how ot stored>Hashing Function>"9876edfrwadfrv7gt89gb0refgv6er7g90esr9g8vsd7fg687sr0-g9v98678cd78s9vsg5"

jb use login krta hai th username to inputed and databse se match krke deta hai but password inputed ko wo hashing function mein convert krta hai then wo hashing database wale hashing se match hota hai 
//sisliye database mein hashing format mein data store rehta hai isliye hacker chahke bhi us hashing format ko decode nhi kr sakta us particular password mein

**********************What is Hashing function**********************************

//Hashing function javascript ke function jaise hi ek function hota hai


//For only input there is a fixed output

//They are one way function ,we can't get input from outputs ex:6%3=0,10%2=0 ab isme hm output to 0 bta sakte hai but 0 ke basis pe kabhi input nhi bta payenge 0 millions of no se bhi aa sakta hai 


//For different input ,there is a different output but of same length

//Small changes in input should bring the large changes in output
//for practical use go to SHA-256 hash generator.com 

//ye isliye use krte hai ki jb bhi bruit force attack ko avoid krne ke liye 
//bruitforce attack sare duniya ke commonly used passwords ke hashing string ko  match krata hai us ek userinput password ke hashing string se isse ek n ek commonly used passwords ke hashing string ko  match hokr account hack hota hai 

*******************Salting*************

Password salting is a technique to protect passwords stored in the Database by adding a more 32 string numbers in that then hashing them 
//salting means kich random string add kr dena like this>yfc$#@uy7^%$
//user input password>vrushabh232>salting>vrushabh23(%$%#FGYT@)2 >then hash form> tcvuy9#$%&^Fvg865e$E^%Rtr%E

//so is technique mein agr kisi common password ki hash form bhi mil jati hai tb bhi salting add krne se attacker ko uski bhi hash  form nikalna impossible ho jata hai attacker ke liye
//hasing and salting pr bohosari research baki hai usme research paper bohot se release hote hai kafi testing hoti hai iski 

******************************

express ke andar bohot sare tool aate hai ki jb user password enter kare then automatically uski salting and hashing ho jaye and store ho jate hai 

so authentication ke liye one of the most used tool hai passport


****************************Passport*************
//a package to transform password into salting and hashing automatically
//passport : it is a Express-compatible authentication middleware for Node.js

//npm i passport :ye sabhi ke liye work krega googleA0uthentication,JWt auth,facebook

//npm i passport-local :ye bs local passport ke liye use hota

//npm i passport-local-mongoose : mongoose

//go to passportjs.org 
//isme sare wellknown site jis technique ko use krti hai unki techniques use krsakte hai
//ex google0Authentication ,facebook,jwt authentication
//jaise hme website pe ligin ke niche option dete hai login with google,github,facebook aise

//hm chahe to ek sath teeni google,jwt,facebook ek sath bhi implement kr sakte hai 

//lekin isse pehle hm sabse basic stratergy ko use krenge that is passportlocal ye bhi ek unhi me se hi hai

//ab local stratergy lo implement krne se pehle hme user model create krna pdega ki user website ko access krne se pehle usko kya kya dikhega like usko login page dikhega wager wagera


*******************************Creating User Model**************************************

User: email,username,password user must have

goto npmjs.com/packages/passport-local-mongoose > read it schema defination 

create model in model folder as user.js
in that go to models>user.js 
reuire mongoose
require mongose schema also create schema which take email from user
require it const passportlocalmongoose=require("passport-local-mongoose");
//passport-local-mongoose khud hi add kr dega username uski salting,hashing  krke usko also hash password and solt value bhi khud hi add krwa dega 
//so uko as a pligin ki tarah pass krdenge 
 then pligin user.plugin(passportlocalmongoose);
 /as a plugin add kr dia jo ki khud password and username with hashed,salting krke add kr dega
//ye wo authenticate bhi khud hi krta hai ki user pehle se registered tha ya nhi tha usko kafi sare methods hai called static methods
export schema 
const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");
const userschema=new schema({ email:{type:String, required:true}
 //passport-local-mongoose khud hi add kr dega username uski salting,hashing  krke usko also hash password and solt value bhi khud hi add krwa dega 
//so uko as a pligin ki tarah pass krdenge });
userschema.plugin(passportlocalmongoose);
//as a plugin add kr dia jo ki khud password and username with hashed,salting krke add kr dega
//ye wo authenticate bhi khud hi krta hai ki user pehle se registered tha ya nhi tha usko kafi sare methods hai called static methods
//export schema
module.exports=("user",userschema);

************************Configuring Stratergy of passport-local
passport.initialize()  : A middleware that initilizes passport


passport session()
A web application needs the stratergy to identify user as they browse from page to page. this series of request and response ,each associated with the same user,is known as session

passport.use(newLocalStratergy(user.authenticate()))



require passport in app,js 
localstratergy implemant 
require possport-local
require usermodel by writing its file path 

hme use ko ek session ke andar hi login kryenge taki ek user jb bhi alag alag pages pr jaye to use login na kraya jaye
/use passport as a middleware just after the session(sessionoptions) wali line 

use passport.initialise : app.use(passport.initialize())

then as a middleware hm passport,session ko implement krte hai 
//go to npm then search passport read docs 
//so isko use krne ke liye hme apna session implemented hona chahiye then passport initialize hona chahiye then passport.session ko use krna chahiye 


//hm chahte hai ki use ek hi baar login ho use baar baar session back hone pr login n krna pade

then use passport.session : app.use(passport.session());

then passport.use kro uske andar new localstratery ko implement kro uske andar pass krdo user jo hmne model se export kisa tha then authencate()

then passport serialise krta hai use ko and desearilise krta hai user ko to hm ye do method add krenge unbuilt function hote hai use bs use krna hota hai 
passport.searilizeUser(user.searilizeUser()); //user ki info ko store krate hai use searilize user taki user ko bar bar login n krna pade and jbsession khatam ho the user desearilize ho 
passport.desearilizeUser(user.desearilizeUser()); //jb user page se bahar chala jaye to //user ki info ko remove krate hai use desearilize user

//so passport wale stratergy ne user ko sare authenticattion wala kam sambhal liye uske liye hme scratch se humdreds lines of code nhi likhna pda
//ab tk hmne express app ko bs btaya hai ki hm user ke liye searilize,desearilize,session,initialize,authentication krne wale hmne abhi bs bta ke rkha hai use nhi kia 

//ab finally hm demo user create krke dekhebge ki acctully userside se and user authentication work kaise krta hai

const passport=require("passport");
const localstratergy=require("passport-local"); 
const user=require("./models/user.js")

//using passport app.use
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstratergy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

************************************DEMO User**************************************************************************************

//creating Demo user

create route just after the session route
//creating route for demouser user authentication jo hme username and password dega ki kaisa milta hai password and username
app.get("/demouser",async(req,res)=>{
    let fakeuser=new user({email:"student12.com",
        username:"vrushabh@jain" //passport ne automatically username add kr liys jb ki hmne schema mein define bhi nhi kia
    });//to store user static methods mein method hai ki user ka register method use krenge uske andar user and password pass krenge
   let registereduser=await user.register(fakeuser,"vrusha@323");
   res.send(registereduser);})

**********************SignUp User************************************
GET /signup :isse signup wala form aayega usme user input dalega then ye form post hoga /signup wale post req pr
POST  /signup :iska kam hoga ki user ko register krana agr pehle exist nhi krta hai to 
//ab hm actual mein user signup create krenge

********************signup:GET /signup
//now go to routes folder create file newuser.js
require express use router 
//module.exports router
const express= require("express");
const router=express.Router();
router.get("/signup",(req,res)=>{res.send("from")}); //tested
module.exports=router;

define router 
const userRouter=require("./routes/newuser.js")
require it just after the listing.js and review.js in app.js use it
app.use("/",userRouter);

create signup.ejs in views folder
views>signup.ejs

cpy paste boilerplate layout
<% layout ("/layouts/boilerplate") %> to link this file to boilerplate.ejs
create form which action /signup method post then needsvalidation and novalidate then make the form or copy things from newlistings.ejs
create listing wala part from newlistings.ejs
<div class="mb-3"><label for="title" class="form-label">Username</label> 
<input name="username" id="username"  type="name" placeholder="Enter your title" class="form-control" required> 
<div class="valid-feedback">looks good!</div>   <div class="invalid-feedback">please enter valid Title </div> </div>


ab user details dal sakta hai and usko submit kr sakta hai 

********************signup:POST /signup

go to newuser.ejs 
router.post("/signup",async(req,res)=>{ extract details})
require user as const user=require("../models/user")
isko try and catch mein dal do qki hm chahte hai ki dusre page pe error aane ki jagah hm usi page pe rhe and error msg flash ho to hm err black meinerror msg flash krwa denge
router.post("/signup",async(req,res)=>{
    try{ //extract user from req.body i.e form 
   let{username,email,password} = req.body;
   //store user into nayauser
   const nayauser=new user({email,username});
  const registeruser=await user.register(nayauser,password);console.log(registeruser);
  req.flash("success","Welcome to wanderlust");
  res.redirect("/listings"); }catch(e){ req.flash("error",e.msg); res.redirect("/signup");} })
*******************************************************AUTHENTICATION********************************************************


*******************************************************User Login****************************************************************************

//agr user pehle se ho exist krta hai to use login kaise kraye 
GET /login :isme form aayega jisme hm details dalenge then wo details ki post req jayegi /login ke pass then wo check hogi data base mein 
POST /login : Database se check hokr aayega ki user already exist krta hai ki nhi


go to newuser.js
after signup 
create route of get : /login
create file ligon.ejs in users folder
render login.ejs

cpy paste code of signup.ejs remove email portion and make some changes according to 
then go to newuser.ejs
create post route 
ek middleware pass krengejo ki chack  krta hai ki username pehle se exist krta hai ki nhi
usme ek middleware pass krna as passport.authenticate() isme pass krenge apni stratergy as localstratergy then uske bhi andar pass krenge ki agr fail hua to user kis page pe redirect ho and again failureflash:true kr denge taki attacks on login roka ja sake
router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
}); 
//require passport
router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),async(req,res)=>{
        req.flash("success","Welcome Back to Wanderlust"); res.redirect("/listings");})


//ab isme ek sabse bda loop hole hai li /listings se hm website ka page access kr pa rhe hai without ligin or signup 


*/

/*

*************************************Phase -2 (PART - E ) ***********************************************************************************************************************


//connecting Login Route

//how to check if user is logged in?
req.isauthentocated() //passport method

//bina user ke logged in : listing create nhi kr sakta ,listings dekh nhi sakta 
go to routes>listings.js> new.ejs rendered route as new route
req.isAuthenticated() method ka use krenge : ye method btata hai ki ye user logged in hai ki nhi 
router.get("/new",(req,res)=>{
    //ye directly form dene se pehle check kro ki user logged in hai ki nhi
    //agr if true return krta hai to render krke form denge agr false deta hai to msg flash krenge
    if(!req.isAuthenticated()){
        return req.flash("error","you must be logged in!") res.redirect("/login")}
        res.render("./listings/newlisting.ejs");});

 lekin ab hme chahiye ki edit,delete,create tino krte waqt user logged in hona chahiye to hm har ek route mein jakr ye if(!req.isAuthenticated()){
return req.flash("error","you must be logged in!") res.redirect("/login")} likhe ya phir hm iska ek function hi bna dale 
 //creating a function for isAuthenticated or is user logged in 
create a new file in views as authmiddleware.js or create file authmiddleware in routes folder
go to routes>authmiddleware.js
//moduleexports.functionname= req,res=>{kya kam is function se krana chahte ho}
module.exports.isloggedin=(req,res,next)=>{
if(!req.isAuthenticated()){req.flash("error","you must be logged in!");return res.redirect("/login")}next();}
then require kr lo us function ko in  listings.js with {functionname}=its path
 const {isloggedin}=require("../routes/authmiddleware.js");//then us particulr route mein jakr is middleware ko pass krdo
then isko aise as a middleware pass krenge routes mein router.get("/:id/updateuser",isloggedin,async(req,res)=>{

**********************************User LoggedOut*********************
GET : /logout
passport ke andar req.logout naam ka method exist krta hai and ye method desearilize krta hai user ki info ko taki current session end ho and info delete ho current session ki 
go to user.js
create route  in newuser.js 
require islogged in functon then pass as middleware
//logout route  router.get("/logout",isloggedin,(req,res,next)=>{ req.logout((err)=>{//hm iske andar err denge taki logout krte waqt kuch error aaye to user ko err dikhe 
    // ye directly session end krke info delete kr deta hai inbult hota hai req.logout in passport methods
        if(err){ //if error found next(err) jo ki err server pe jayega app.js mein last
        //  return next(err);}//if err not found flash msg user logged out
        req.flash("success","you are logged out!"); //and redirect /listings
        res.redirect("/listings"); }) })    


***************************************ADDing Styling In login,logout,signup,etc.. ********************************************

jo hmne navbar.ejs create kia hai same 
uske hi elements ko cpy paste kro 
go to navbar.ejs
cpy and paster all buttons of alllisting,newlisting and rename it 

ab hm chahte hai ki agr user loggedin hai to usko sirf logout wala option dikhayi de
and agr user logged in nhi hai to use signup and login wala option dikhayi de 
and agr user ne abhi tk signup nhi kiya hai to usko teeno option dikhayi de
uske liye hm ek req.user ki property hoti hai agr user logged in nhi hai to undefine print krta hai 
agr user loggedin hai to data dikhata hai
so hm isko use krenge navbar.ejs main 
req.user isko hm directly navbar.ejs mein access nhi kr sakte but locals ko access kia ja sakta hai isliye hm local ka use krenge
hm app.js mein res.locals.curruser=req.user; req.user ko curruser mein store krwa lenge then usko condition mein pass krenge
<=if(curruser){=>
  signup buton
  login button
<=}=>
  <=if(curruser){=>
    logout button
<=}=>
  
ab hm sign-up krne le baad automatically login nhi ro re uske liye hme pehle sign-up krna then login bhi krna pd rha hai uske baad jake hm db mein store ho rhe 
so hme chahiye ki signup krte hi hm login bhi ho jaye and  db mein store bhi ho jaye
so iske liye newuser.js mei jao and /login route mein req.login(registereduser) ke bbad likho 
jaise apne paas req.logout hota hai jo session end krke info delete krta hai same waise hi apne pas req.login hota hai jisse user login hai ki nhi btata hai 
for more go to passportjs.org read docs of login and logout
req.login mein registeruser ko pass kr do and then uske baad agr err exists krta hai to err print kro nhi to next kro
req.login(registeruser,(err)=>{
  if(err){return next(err);}  req.flash("success","Welcome Back to Wanderlust");  res.redirect("/listings");
})








isme ek flou hai ki jb hm new listing>ask for ligin>login suuceefully>it redrect us to /listings but hme to from milna chahiye n as /listings/new pr ka
agr hm console.log(req) kre to req object ke andar bohot sari cheeze store hoti hai like paths,port no,cookies,sessionid aise bohot kuch
so hm req.path use krenge and uske andar hm req.origionalurl ka use krenge taki uska origional url pe hi hme bheja jaye even hmne /listings likha ho
and ye jo origionalurl hai isi or hm redirect krna chahte hai after we logged in 
ex console.log(req.path,"..",req.origionalUrl) : gives /listings .. /listings/new so origional url /listings/new hai pr jabardasti hme /listings pr bheja ja rha hai
now go to authiddleware.js if ke andar
session ke andar origionalUrl ko redirecturl mein store krayenge
edit>path>edit>failed not login>user login>redirect to path>edit
so ab hmne newusr.js mein /login mein jaha redirect /listings pe kia tha uski jagah hm res.redirect(req.session.redirectUrl); krenge
lekin isme bhi ek problem hai ki jaise hi login krte hai to passport session ko change kr deta hai new session mein to uske sath purana wala redirecturl or path bhi info delete ho jata hai 
so iske liye hm locals mein redirecturl ko save krwa lete hai 
ab uske hi niche wapis ek moduleexports create krenge 
module.exports.saveredirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){ res.locals.redirectUrl= req.session.redirectUrl }
}//agr userlogin hua to uska path save kr lenge redirecturl mein then usko locals ke andar store krwa lenge 
//require krenge redirecturlko newuser.js mein as 
ab isme bhi ek flou ata hai ki ab jb  hm login krte hai to error bhi show krega qki origionalurl ki value store hai to session end hi nhi hua and session end nhi hua to loggedin trigger hi nhi hua
so hm condition lgayenge newuser.js mein
agr redirectUrl ke andar locals se origionalurl store hai to redirect kra do redirectUrl pe nhi to /listings pe redirect kro 
like this module.exports.saveredirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){ res.locals.redirectUrl= req.session.redirectUrl;  }
}//agr userlogin hua to uska path save kr lenge redirecturl mein then usko locals ke andar store krwa lenge then saveredirecturl pass krna as a middleware in /login in newuser.js
then 
router.post("/login",saveredirectUrl,passport.authenticate("local",{
        failureRedirect:"/login", failureFlash:true, }),async(req,res)=>{req.flash("success","Welcome Back to Wanderlust");
    agr redirectUrl ke andar locals se origionalurl store hai to redirect kra do redirectUrl pe nhi to /listings pe redirect kro 
let redirectUrl=res.locals.redirectUrl || "/listings"; res.redirect(req.session.redirectUrl);})


******************************************************************AUTHORIZATION*****************************************************************************************************************************************

***************************Authorizaion :Listing Owner
ab hm sari listings ke sath ek owner ko associate krenge 
mtlab ek listing ko edit,delete agr krna hai to use wahi vyakti kr sakta hai jo us listing ka owner hai 
jisne us listing ko create kia hai wahi us listing ko delete ya edit  kr sakta hai 
and ye bhi
ki jis user ne us review ko create kia hai wahi us review ko delete kr sakta hai


so hm listings.js mein jakr uske schema mein reviews ke andar ek owner ke schema ko add krenge and wo owner models>user.js ko refer kr rha hoga
ab owner ka to schema initialise kr dia 
ab ek tarika hoga ki hm data.js mein jakr hr ek data mein uska owner add krte jaye 
ya phir hm index.js ke andar jayenge uske andar initData se data ko access krenge usme map function lagakr usme ek object bhejenge wo object me se sari object ki properties ko nikalenge  the un properties ke sath owner ki id jod denge 
 initData.data.map((obj)=>{...obj,owner:"83rpih3fu3f3y83ownerid"});
 //iski jagah hmne pura data delete krke phir wapis owner schema bnake     rreate route mein ye likhe    updatelist.owner = req.user._id; //ye owner bhi sath mein jod dega and use save krwa dega
//owner id bhi db mein save krva li

 or
then jaise hmne reviews ke liye populate kia waise hi owner ke liye bhi populate kro in routes>listing.js




ab isme bhi ek flaw hai 
ki koi bhi user kisi ki bhi listing ko edit ,delete kr pa rha hai uske paas ab listig ke delete edit reviews edit delete krne ka access hai
so hme user ko sab listing ke operAations krne se rokna hai 
ki user sirf wahi listing edit ya delete kr sakta hai jo usne create ki this
uske liye hme 
listing.owner ki info show.ejs mein already hai so hm usse owner ki id se owner ka username extract krke owner ki info locals ke andar store krate hai 
so hm check krenge ki curruser ki id and listing owner ki id agr same hai to permission denge nhi to deny krenge
so jo sow.ejs mein edit and delete button hai usko if condition lgayenge ki agr current user hai wo agr equals owner hai to permisstion do nhi to error flash kro 
.popular(owner) se owner ka schema and info listings ke andar aayi but hm use directly user nhi kr sakte hai uske liye locals ka use krna pdega
so ye  res.locals.curruser = req.user; ye locals ke andar store hua so hm ise boilerplate se linked sare mein use kr sakte hai 
so hmne condition mein uska use kia and curruse ki id equals owner ki id dali 

ab ye owner ka ho to gya lekin koi bhi hopscotch se in routes ko req bhej sakta hai and edit and delete kr sakta hai so in routes ko bhi protect krna imp hai 

***************************Authorizaion :Listings

so hm secure kr rhe hai edit and delete route pr in show.ejs
comparing owner and user to perform operation in database
so usme hm pehle listinfg creater ki id ko dhundenge and wo compare krenge listinguser ki id se agr wo match kra to hi us case mein database mein updation allowed hoga
show.ejs>update route > listing.findbyid se jo bhi listing aayegi usko listing mein store phie if condition listing.owner.id equals curruser.id nhi hai ! to then flash error msg that you dont have permission
to edit and res.redirect to show route as /listing/:id 
so hmne bs itna change kia hai ki database mein search and store krne se pehle hm validate kre ki listing.owner and listing.curruser same hai ki nhi
so hmne jo if condition lgayi thi show.ejs mein ab uski koi jarurat nhi qki hm nhi chahte ki buttons gayab ho hm chahte hai ki usko sirf flash msg dikhe
  listingh=await listing.findByIdAndUpdate(id); if(!listingh.owner._id.equals(res.locals.curruser._id)){ req.flash("error","you don't have permission to edit this!!");return res.redirect(`/listings/${id}`); }
  so hm itne part of code ko baar baar hr ek operation wali sari routes mein likhe wo optimize nhi hoga so hm ek function bna lenge ek file authmiddleware mein then usko export krke use krenge
  iska middleware create kia usme //so id ko access krne ke liye hme listing model ki jarurat hogi so isi me hm upar require kr lenge
  let {id}=req.params; wo particular routes mein pass kia same jaise isloggedin ,wrapAsync kia waise


  also 
  servervalidation wala jo part hai listings.js mein uako bhi hm as a middleware use krenge in cut paste it in authmiddleware.js then models>listing.js se listingSchema and expressError ko require kro then exports 
  it then require it in listings.js then usand pass it as a middleware
  isi tarike se hm validate reviews ko bhi middleware ke andar seperate kr sakte hai from reviews.js to shift of serverreviewvalidation as a middleware to in authmiddleware file \

***************************Authorizaion : for Reviews
//review ka ek author hona chahiye jisne us review ko create kia hai and usi ke paas permission honi chahiye ki wahi us review ko delete kr paye
//jaise hmne owner ke liye kia tha same waise hi hm author ke liye krenge
create author as new in reviews schema
and 
hm ye bhi kr rhe ki jo bhi user review create kr rha hai uske pehle check kre ki user loggedin ho lekin hm agr login nhi hai to hme for bhi nhi dikhai dena chahiye 
uske liye hm ek to ligon wale se hi username liya to wo frontend mein to dikhega but wo database mein nhi hoga so hm uske liye jaise review and owner ko populate kraya waise hi hm author ko bhi populate krayenge so hm traditional method ki jagah hm populate reviews ke andar path 
denge usme {hr ek individual ke liye path mein ek author aajaye} .findById(id).populate({path:"reviews",populate:{path:author,},}).populate("owner"); is cheez ko hm show.ejs mein jaha reviewer ka name hai waha review.author name do 
so iske liye hm us review wale form mein jakr if condition lgakr check krenge ki !curruser nhi exist krta mtlab login nhi hai to use review submission wala form bhi n dikhayi de and jb curruser not equals owner ho tb edit,delete,buttons bhi n dikhayi de\
backend protection ke liye hm isloggedin wala middleware dalenge reviews wale routes mein
so todo this go to show.ejs in that bottom leave a review wala section 

//ab hme review ke liye aythor ko lana hai 
review  ko req.body.reviews se nikal kr reviewauthor ke andar store kya
then usseauthor ki id nikal li then usko print kia let reviewauthor=new review(req.body.reviews);reviewauthor.author=req.user._id;console.log(reviewauthor);  


ab hm review delettion ke liye krenge 
so check krenge jo review delete kr rha wo review ko create krne wala authod hai to permission denge and delete button dikhayenge like jo review post krega usko delete button dikhega agr post nhi kiya to delete button nhi dikhega


middleware mein aate hai 
isme jaise hmne accessoperation ki implement kia tha waise hi hm reviewaccopration ko implement krenge \
so us middleware mein simple id nhi aarhi usme reviewid aarhi 
  let {reviewId}=req.params; let  {id,reviewd}= await listing.findByIdAndUpdate(reviewId);console.log(reviewd); let rev=reviewd.author._id;if(!rev.equals(res.locals.curruser._id)){console.log("permission denied");
  then is middleware ko export krke review.js mein upar require krke as a middleware pass krdo reviewaccopration


*/


//*******************************************************************************************************************************************************************************************************************/


//*********************************Day 52********************************/

//************************Phase - 3 ***************** ((Part-A))**************/


//THIS WILL BE CONTINUE IN EXPRESS.ERROR FILE 










































