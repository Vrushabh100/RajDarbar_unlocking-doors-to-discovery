class Expresserror extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode=statusCode;//always use statusCode because it is a default in Error not use statuscode bcoz if If an error is thrown that does not have a statuscode property, 
        this.message=message;
    }
};


module.exports=Expresserror;
//then require it in app.js at the top as const expresserror=require(./public/utils/expresserror.js)


//part parts and phases are in wrapAsync.js file

//*********************************Day 52********************************/

//************************Phase - 3 ***************** ((Part-A))**************/


//P-3 (Part-a)--------------

/*
so ab tk hmne is project mein apne core functionalities ko built kr diya  hai means aage jake same functionalities ko hm dusre projects mein implement kr sakte hai mtlab hmne backend ka sara kam and fronted ka kuch kam kr liya


phase 3 mein hm kuch nayi functionality ko add krenge

MVC : Model,View,Coontroler

ye tb use krte hai jb hmre paas koi existing project ho 
so ek fullstack jo project hota hai usko hm 3 types mein devide krte hai as Model,View,Controler
Model:ye datamodels i.e schemas ko store krate hai
View: isme hm render krne wali frontend files ko store krate hai
Controller :isme hm backend ki jo core functionality hai usko store krate hai

***********MVC: for listings

so jaise hm listings.js mein jate hai routes mein usme wrapAsync ke baad sare jo asynchronous callbacks hai unko hm cut krke ek alag file mei store krate hai

make a foler in x called controllers ke andar file krenge as clistings.js iske andar module exports krenge 

module.exports.index kro and usme async se pura route ka code dal do so index function hao jo async function ko export kr rha hai 
then us function mein listing wala schema use hua hai so usko upar require kr lenge
ab listings.js mein us export kie hue ko require kr lenge like uska path ko controllerlistings mein 
then listings.js mein jo wrapAsync bcha hai usme apna index function pass kr denge as controllerlistings.index

so hm isse controllers mein sari core functionalities ko dal rhe hai and routes khali kr rhe hai qki routes hota hai ki cheeze kis pages se kis pages pr move kr rhi hai also jb bohot sare routes ho jate hai to unko samajna mushkil ho jata hai route hai and uska logical functionality hai 


**********MVC: for reviews

implementing design pattern for reviews and users
same jaisa listings ke liye kia 
create creviews.js 
module.exports.functionname=async ke baad ka sara code and cpy from reviews.js and paste into controllers>creviews.js also require as we used schema review as all then in review.js require its path as controllerrevews=require("path of it");
then write in route as after next to the middlewares or functions as controllerreviews.exported function name from creviews


**********MVC: for users
same jaisa listings and reviews ke liye kia 
create cusers.js 
module.exports.functionname=async ke baad ka sara code and cpy from users.js and paste into controllers>cusers.js also require as we used schema review as all then in reviews.js require its path as controllerusers=require("path of it");
then write in route as after next to the middlewares or functions as controllerusers.exported function name from cusers



*******************Router.route
this is use when we have multiple similar routes so 
router.route :used to avoid duplicate route,naming and thus typing errors
ab listings.js mein jao and dekho to sare routes different hai but agr koi bhi routes ke path same ho us case mein hm router.route ka use kr sakte hai 
for ex 
routes>newusers mein jao and usme dekho ki /signup ka route path do baar hai waise hi /login ka bhi 2 baar hai so is case mein hm router.route(routepath)mein router ka path likh denge ek common path define kia then uske aage hm un bina route path ke directly dot .get se get ,post request likh denge 
like this //we used router.route here and 
router.route("/signup").get(controllerusers.signupone) .post(controllerusers.signuptwo);
 






***********************Rating : Re-styling (stars form)
hm rating ke liye us palne strip ki jagah stars lana chahte hai 
uske liye hm ek library use krenge as starability also called rating library from git-hub : github.com/LunalLogic/starability
so inhone bohotsare star rating wale with effects ke css files bna rkhe hai jo hm apne project mein implement krsakte hai 
so we go to this profile and we select the .css file one of that and we copy that code and we create another rating.css file in public>css>rating.css then paste into that 

then boilerplate mein jake head tag ke andar include kro as link:/css/rating.css stylesheet ab apan ne rating.css ko boilerplate mein link kia
ab show.eja mein jakr jaha review wali straight line hai uske just niche cpy paste krna hai jo github mein html wala code hai wo 

ab fromtend mein to hm dekh pa rhe hai star rating but hm ackend mein yani rating pe click kro to utni rating dikhe waise hme create krna hai 


not completed yet 







*********************************************Image Upload**********************************************
so jb hm listing create krte hai tb hme uska link add krna pd rha hai so uaki kagah hm directly image upload krne ka option denge
lekin hm ise scratch se built nhi krenge balki hm iska premade model lenge usko implement krenge 
ab jo current hmare pass form hai wo backend mein sirf raw data form ka bhej sakta hai isme hm files like photos,pdf,png backend mein nhi bhej sakte hai
and agr hmne bhej bhi diya files to jo database hai usme particular files ko store krne ki limit hoti hai usse jyada li file hm store nhi kra sakte hai 

so hm isme to cheeze krenge
1.give the power to send files directly into backend
2.us file ko db mongo mein nhi store krayenge usko liye hm third-party service ka use krenge jo allow krti hai files ko cloud mein store krana like aws,google cloud,azure

for ex. hm ek file upload krenge google drive pe then google drive wo file ki link degi then us link ko hm mongodb mein store krwa lenge



****************manupulating form 
enctype="multipart"/form-data
filhal hmara jo form hai wo url endoced data backend ke paas bhej rha hai 
ab agr hm form se files ko send krna hai to us case mein hm ek filed add krte hai form mein as multipart/form-data
jis form se file bhejni hai to uska encoding type change krna pdta hai to multipart/form-data ye hmare form ko capable bnata hai ki files ko bhej sake

go to new.ejs uske form mein add kro enctype="multipart"/form-data and image wale mein type:link ki jagah type:file kr do 
also listing.js mein wahi route pr ek aur post req bhejenge as req.body
so abhi jo form ki parsing ho rhi hai wo url encoded format mein ho rhi hai lekin hme form ki parsing miltipart as file backend mein dene ke liye hm use krenge new npm pakage called multer
use use multer to parse tha multipart data not urlencoded by the form in backend
multer is a node.js middleware for handling multipart/form-data which is primarily use for uploading files
npm i multer
in listings.js
require multer const multer=require("multer");
define task for multer : const upload=multer({dest:'\uploads'}); multer automatically uploads naam ka folder create krega and un file ko waha save krvayega
iske baad hm routes mein ye middleware add krenge jo upload krega and usme naam file ka add kr denge then automatically hmare paas ek local storage ke liye uploads ka folder create ho gya jisme hmari image hai 

ab hme is image ko cloud oe bhejna hai na ki hmari local storage mein dalna hai

************************setting up : cloud
cloudinary & .env file

console.claudinary.com
so ex hme automatically insta pe post bhejna hai bina human interversion ke to hm ye platform ka use krte hai isme file bnti hai jisko hme pura passwords,emai,data ka access dena hota hai jisko hm creadencials kehte hai 
and in credentials ko hm kabhi github ya kisi bhi jagah nhi dalte ya company ko bhi code ke sath nhi dete
so hm credentials ko store krne ke liye .env file ko create krenge 
ab .env mein credentials ko save krane ka format KEY=value hota hai
lekin .env ke data ko hm ap.js mein directly require nhi kr pate so iske liye hm ek aur third-party npm pakage use krenge as dotenv
npm i dotenv 
then require krenge sabse top pe in app.js
like this require('dotenv').config(); phir hm console.log(process.env.keynamelikho) krnege isse access kr sakte hai .env file ko backend mein 
also isko ek condition mein likho ki jb bhi project ko deploy krenge th ye .env file upload na ho 
if(process.env.NODE_ENV !="production"){
        require('dotenv').config();
}console.log(process.env);


ab ye website pr jake register krke dashboard mein product environment credentials isme se 3 cheeze lo and .env mein KEY=value mein dalo 

//ab hm claudinary ke upar apni images ko upload krayenge
as it is likho claudinary se value ki jagah cpy paste sign in as ajitkumar*h27@gmail.com
.env mein 
CLAUD_NAME=daw6zeClaudName
CLAUD_API_KEY=53756798API Key
CLAUD_API_SECRET=ApisecrpNfzcIneGFaUfKMuvxnKlUkmxmkete
ab siko jayada chedna nhi hai 

*********************************Store FIles IN Cloud******************************************

multer store claudinary
so hm multer plus cloudinary ko sath me use krenge taki file cloud mein store ho 
npm i cloudinary and npm i multer-storage-cloudinary 
so inko require krenge alag file mein and usme btayenge ko claudinary code ko kaise access kre
create file cloudconfig.js
const cloudinary=require('cloudinary').v2;
const {cloudinarystorage} = require('multer-storage-cloudinary');
then file access krne ka code likhenge
config : means kisi bhi cheez ko jodna
cloudinary.config({  //jo .env mein likha uske KEY ko veriables mein store krlocloud_name:process.env.CLOUD_NAME, api_key: process.env.CLOUD_API_KEY, api_secrete: process.env.CLOUD_API_SECRET,})
//isse hmne account to bna liye 
//ab hme ye btana hai ki cloudinary mein kis folder main kaisi file store krni hai
const storage=new cloudinarystorage({ cloudinary:cloudinary, params:{ folder:'wanderlust_dev', allowFormats:["png","jpg","jpeg"],
    //    format:async(req,file)=>'png', //supports promises as well 
    //    public_id:(req,file)=>'computed-filename-using-request', },});
then exports it two things at same line as  module.exports={cloudinary,storage}
then in app.js 
const {storage}= require("../cloudconfig.js");
router.get("/",wrapAsync(controllerlistings.index));
router.post("/",upload.single("listing[image]"),(req,res)=>{  res.send(req.file);});
and jo hmne multer mein uploads naam ka folder bnaya tha waha storage likhenge
ab yaha kya ho rha hai
ab hm image upload kr rhe then route pe jake post ho rha then usme se image parse hokr backend se cloud mein ja rhi hai then req.file mein us image ki link aa rhi hai 


***************************************************save link in  Mongodb datanase
ab hm models>listings mein listing ke schema jo modify krne wale hai
hm file ka link and file ka path save krwayenge jo ki req.body ke andar hai
listingschema> mein image{   } usee sari cheeze remove krke uske andar url:String dalenge filename:String 
then listings ke andar jo hmne routes ka kia tha usme wapis se pehle jaise cheeze layenge and iski jagah router.post("/",upload.single("listing[image]")
,upload.single("listing[image]") as a middleware pass krenge on route /updatelist" i.e create route ab us route ka main logic createnewlisting mein hai so hm 
controllers>listing.js mein jakr hmare pass req.file ka access hoga 
ab url and filename mein store krayenge as url=req.file.path and let filename=req.file.filename ise hm print bhi krwa sakte hai as console.log(url,"..",filename);
validation error aayega as listing is required so hm validation middleware ke pehle .upload.single ko pass krenge then logic mein let url=req.file.path;
let filename=req.file.filename; add krenge us route main ab hm link and file name ko save krenge as newlisting.owner ke baad let newlisting.image={url,filename}; then listing ko save krenge //let url=req.file.path; 
//let filename=req.file.filename;//console.log(url,"..",filename); tested// updatelist.image=({url,filename});
also you can check in mongodb write in console mongosh > use wanderlust >  db.listings.find({title:"hedau"}) it will show 

*************************************************Display Image

uske liye hme listing>index.ejs mein <=listing.image=> ki jagah <=listing.image.url=> krna hai same change hm show.ejs mein bhi krenge

 */
//******************************************************************************************************************************************************

//*******************************DAY:53 (Phase-3) (PART-b) */

//***************************************************************************

/*
<div class="mb-3"><img src="<%=listingg.image.url%>" alt="image">image</div><!-- lekin hme yaha high quality image ki jarurat nhi hme bs image ka preview yani low quality and blur little bhi chalti hai isse images loading ka time km hota hai -->
 <!-- so hm aise high quality image ko na display krte hue uski quality low kr denge and uske liye cloudinary hme kuch parameter deta hai jisse image ki quality low hoti hai
so hme cloudinary jo link de rha hai usme images.203/bdnf/upload ke baad pixels down krne pdenge like px.300*200 aisa lkhne se pixels down ho jate hai  so hme updateuser.ejs ke 
controller  file mein jana pdega  then usme render krane se pehle listing.image.url ko orgimg mein lelo then usko orgimg.replace se replace oldpath /uploads to new path /uploads/h_300,w_250 se then isko 
 ek origionalimg mein store kro then usko file rendering mein hi pass krdo
 like this in controller>egitlisting>    let orgimg=listing.image.url; origionalimage= orgimg.replace("/upload","/upload/h_300,w_250"); res.render("./listings/updateuser.ejs",{listingg,origionalimage}); -->


*/
//NOW WE ARE BUILDING THE MOST INTRESTING FEATURE OF OUR WEBSITE as Maps

//we are integrating the maps api as maobox and iska hm free version use krne wale hai 
//mapbox  mein jakr account bnana hai userame ajitmh27 pass:@Mh2*ajitkumar then waha se default access token copy krke .env file mein paste kr dena hai ACCESS_TOKEN=pastehere


/*


Of course. Here is the detailed, end-to-end process for integrating a completely free map into your Wanderlust project using OpenCage for geocoding and Leaflet.js with OpenStreetMap for the map display.

Phase 1: Backend Setup
This phase focuses on getting location coordinates and storing them in your database.

Step 1: Update Your Listing Schema
First, ensure your listing model can store geographic coordinates. Modify your models/listing.js file to include a geometry field in the GeoJSON format.

JavaScript

// In models/listing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    description: String,
    // ... other fields like image, price, country
    location: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // Add this geometry field for coordinates
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
Step 2: Get Your OpenCage API Key
Since you need to turn a location address into coordinates (a process called geocoding), you'll need an API key from a service that doesn't require a credit card.

Go to the OpenCage Geocoder website and register for the "Free Trial" plan.

On your account dashboard, copy your API Key.

Add this key to your .env file.

Code snippet

OPENCAGE_API_KEY=your_new_opencage_api_key_here
Step 3: Geocode the Location When Creating a Listing
Now, update the route that handles creating a new listing (POST /listings) to use your OpenCage API key.

If you haven't already, install node-fetch: npm install node-fetch@2.

Modify the logic in routes/listings.js.

JavaScript

// In routes/listings.js
const fetch = require('node-fetch');
// ... other requires

// This route handles the form submission for a new listing
router.post("/", isLoggedIn, upload.single('listing[image]'), async (req, res) => {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const location = req.body.listing.location;
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    const response = await fetch(geocodingUrl);
    const data = await response.json();

    const newListing = new Listing(req.body.listing);

    if (data.results && data.results.length > 0) {
        const { lng, lat } = data.results[0].geometry;
        newListing.geometry = { type: 'Point', coordinates: [lng, lat] };
    } else {
        req.flash('error', 'Location could not be found. Please enter a valid address.');
        return res.redirect('/listings/new');
    }

    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, filename: req.file.filename };
    
    await newListing.save();
    
    req.flash("success", "New listing created!");
    res.redirect("/listings");
});
Phase 2: Frontend Display
This phase focuses on using the saved coordinates to show a map on your show.ejs page.

Step 4: Add Leaflet.js to Your View
In your views/listings/show.ejs file (or your main layout/boilerplate file), add the Leaflet CSS and JavaScript CDN links inside the <head> tag.

HTML

<head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
Step 5: Create the Map Container and Script
In the same show.ejs file, add a <div> for the map and the script to initialize it.

HTML

<hr>
<h3>Where you'll be</h3>
<div id="map"></div> // The map will appear here.

<style>
    #map {
        height: 400px;
        width: 100%;
    }
</style>

<script>
    // Safely pass the entire listing object to your script
    const listing = <%- JSON.stringify(listing) %>;
    const coordinates = listing.geometry.coordinates;

    // Initialize the map, centered on the listing's coordinates.
    // NOTE: GeoJSON stores coordinates as [longitude, latitude], but Leaflet's
    // setView and marker functions expect [latitude, longitude]. We reverse them.
    const map = L.map('map').setView(coordinates.slice().reverse(), 12);

    // Add the visual map layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker at the exact location
    L.marker(coordinates.slice().reverse())
        .addTo(map)
        .bindPopup(`<b>${listing.title}</b><br>${listing.location}`)
        .openPopup();
</script>
This completes the entire integration. Now, every listing you create will have its location converted to coordinates and will display a unique map showing its precise location.


also change according to as you passed listingg so change listingg in this also insted of newListing change it to updatelist
then hmne sare icons add krliye also css uske effects lga liye then ab un icons mein jaan dalna baki hai 
icons clickble bnana hai
so hm kya kr rhe hai : jb user us particular icon pe click krege then usko us category mein aane wali sari listing dikh jayegi 
ex. i click on mouintains then jo jo listing mouintains ji category mein aati hai unki listing user ko mil jayegi 
so uske liye hm listing schema mein categories wala section add krenge and then categories{category:["mouintains","bedroom"] like this uame dikhenge then hm frontend part mein jb listing create krte hai owner tb usme category wala ek dropdown box denge 


ye built hua ki hme ek switch lgana hai bootstrap se 
search switch on bootstrap then cpy and paste it in jaha hmne icons add kie the mouintains wale uske niche ek new div create krke
class mein form check reverse add krdo usse text badme or pehle aata hai switch ke ab hm is check box ke uapr ek event listner add krte hai event listner se hm on click kuch bhi kam krwa sakte hai 
so hm index.ejs mein jakr ek script tag likhenge sabse last mein uske andar hm js ka logic likhenge jo ki click krne pr kuch kam krege 



apne ko search wala option k=bnana hai ki search krne pr user ko result mile
and
mouintains wale options ko valid bnana hai 


results on search 
navbar mein form mein method post and route /listings


Of course. Let's go through that code line by line. Think of this code as a set of instructions for a librarian who needs to find books for you.

JavaScript

const searchQuery = req.query.q;
This line looks at the URL for anything after a ?. If the URL is /listings?q=Goa, this line grabs the word "Goa" and stores it in a variable called searchQuery. This is how the server knows what you searched for.

JavaScript

let allListings;
This just creates an empty box called allListings. We will put the final list of listings into this box later, whether they are searched for or not.

JavaScript

if (searchQuery && searchQuery.trim() !== "") {
This is a check to see if the user actually searched for something. It asks two questions:

if (searchQuery): "Did the user search for anything at all?"

searchQuery.trim() !== "": "Did the user search for something other than just empty spaces?"

If the answer to both is yes, the code inside this if block will run.

JavaScript

const matchedListings = await listing.find({
    $or: [
        { title:    { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
        { country:  { $regex: searchQuery, $options: "i" } }
    ]
});
This is the main database search. It tells MongoDB: "Find all listings where the searchQuery appears in either ($or) the title, the location, or the country."

$regex: This allows for partial matches. So, searching for "Goa" will find "North Goa".

$options: "i": This makes the search case-insensitive, so "goa" will find "Goa".

The results are stored in a new array called matchedListings.

JavaScript

const matchedIds = matchedListings.map(l => l._id);
This line goes through the matchedListings array and creates a new, simpler list containing only the unique IDs of the listings that were found. This is like making a quick checklist of the books you found.

JavaScript

const otherListings = await listing.find({ _id: { $nin: matchedIds } });
This is the second database search. It tells MongoDB: "Find all the listings whose _id is not in ($nin) our checklist of matchedIds." This efficiently finds all the other listings that didn't match the search.

JavaScript

allListings = [...matchedListings, ...otherListings];
This is the final step. It takes the two lists we created (matchedListings and otherListings) and combines them into one big list, with the matched listings at the very top. This combined list is then put into our allListings box.

JavaScript

} else {
    allListings = await listing.find({});
}
This else block only runs if the user did not search for anything. In that case, it simply fetches all the listings from the database and puts them in the allListings box.

JavaScript

res.render("./listings/index.ejs", { alllisting: allListings });
Finally, this line sends the final allListings array to your index.ejs page. It makes the data available inside the EJS file under the variable name alllisting.






*/


/*

***************************************************************PROJECT COMPLETED******************************************************************************

****************************Project Deplyoment *******************************************************************
*************Deploy Database****************

Mongo:Atlas : cloud database service 

Database.Deploy a multicloud database

pass&username is on ajitkumar@gmail.com and its password on mail of vru20@gamil.com


ab filhal hm local machine laptop ki ip use kr rhe lekin jb deploy krenge tb cloud ki ip dalni pdegi change krke


ab kaise hmare database ko online project jo abhi create kia uspr host kre
connect>cluster 1> application>node.js>then npm install mongodb agr install nhi hai to then ek link milega connection link usko hme vs code mein jake 
apne project mein  the us link mein jaha <password> likha isko htake waha hme hmaraa bhi create kia hua ajit wala password dalna hai

then go to app.js usme mongodb ka url yani jaha hm mongodb ko db ke sath connect kr rhe the usko hta lo 
then go to .env file usme ek MongoDb_Atlus_URl:paste that link here 
ab jo link hmne hatayi usi ki jagah create a const db_url=process.env.MongoDb_Atlus_URl
means jo hmne link ,env meindali thi wo process. se .env se lekr aao then usko db_url mein store kro 
then jaha hm mongoose.connect(localhost ) database connect krwa rhe the waha db_url pass krdo 
to check goto atlus>data services>database>collections>

ab hmne database to host kr liya lekin ab hme uska session bhi host krna pdega bcoz agr kisi user ne just abhi data input kra to uske liye alag se load nhi hoga db 
**********************storing session of mongodb****************
ab hmne express ko use kiya the and usme cookies ko use kr rhe the to usme hmare paas apni local machine mein session related info store ho rhi thi 
so ,db  mein data to uploading to ho rha bcoz of mongodb host on internet but session related info hmare pass hi reh rhi hai local machine mein 
so hme us session related info ko bhi online host krna pdega 

so uske liye hm use krenge
 connect-mongo : MongoDB based session store

 npm i connect-mongo
then 
isko require uske express-session ko jaha require kia tha uske  baad krna 
require this : const mongoStore:require("connect-mongo");

in app.js 
before the sessionoptions function we create store then error handler then pass that store in session  options
then we pass this code before passing that function in app.use(session ) and before function sessionoptions decleration

we write this code 
get it into store = MongoStore.create{
    //in this pass database url which is in dburl
    mongourl:dburl,
    //some advance options pass your secrete that used in sessionoptions
    //then pass touchAfter: so agr login krke tab close kia then phir open kia to hmari session related info store rhegi so hme baar baar login nhi krn pdega 
    //it bypasses the login every time we open and close the tab for specific min duration
    //touch after :agr session ke andar koi change nhi hua tb hm info ko itne time sesonds baad update kre

    crypto:{
    secret: "mysupersecretecode"
    },
    touchAfter: 24*3600,
}
    then pass this store into sessionoptions function 
    agr ye sb process mein error aata hai to usko handle krenge write this before sessionoptions function 
    store.on("error",()=>{
        console.log("ERROR IN MONGOSESSION STORE",err)})

 then iske baad aayega session options wala function usme store as a middleware pass kr dena

now the check this :  goto atlus>data services>database>collections> isme collections mein ek naya sessions naam ka collection add hua hoga


 */


/*

***********************************************Daployment*********************************************

1.Render
2.netify
3.cyclic etc

 we use render for deployment
 signup on it 
 then goto package.json
 at first 
 usme engine likhke node ka version specify krenge
 node version:node -v
 { "engines":{
    "node":"your node.js version"
   },    
  "name": "x",
  "version": "1.0.0",
  "main": "index.js",
jo bhi hmne ab tak use kia wo ajit wala account tha 
sign in render with github account and authorize github with render
render and github  mein vrushabh20 wala acc use krenge




**********************if we want to add new features*************
hme localsystem ke andar chahges krne hai krenge then directly github mein push krenge then render ko bolenge ki naye jo features hai unki nayi copy github se lekr aajao then deployment process ke andar use deploy kr do 
and render directly github se us code ko access krega 




********************CONNECT Render to GITHUB account

jo hmne secrete likh tha session options and store mein unm ki jagah hm .env file mein SECRETE= kuch bhi random likhna like this hbkdvsbvbiosdbv then usko process.env.SECRETE se secrete mein la dena

github pe jb push krenge tb .env file and node_modules ko push nhi krenge

so in cheezo ko hme push na krane ke liye ek file create krenge as .gitignore
create touch .gitignore isme hm wo file name likhenge jinko hme push nhi krana means ignore krana hai 
git status cmd se verify kr sakte hai .gitignore add hoga and .env and nodemodules nhi dikhegi


********************comminting project

commands:

git add .
git status
git commit -m "Add Project files"




ab git to push kr di sari files 

ab GitHub ke upar push krna paki hai 

**************push on GitHub

go to render connect with GitHub then select allrepositiry if you want to host future project also other wise select only reposiratory then select our project then save 


*********connecting repo to Render

after install or save it will automatically redirect you to render go to web service  in my workspace 
then connect then fill details as projectname,main branch ,runtime:node,remove $yarn and write npm install as built command ,then start command : node app.js then free tier then in advance options 
auto deploy : no

deployment fail hoga bcoz hmne app.js mein process.env use kia lekin hmne .env file ko git pe push kia hi nhi 
so ab un env variables ko create krna pdega render ke upad use deploymeny successful ho jayega


************create new service
Environment variables
configures Atlas :ip change krani hai local se  render ki 

uske liye 
//sorting environment variables
goto render>dashboard>environment isme jo jo key and uski value likhi thi .env mein wo wo isme likhni hai environments on render mein 

//sorting configures Atlas
go to render>dashboard>logs>connect>it will show new ip addresses copy it 
then go to atlas mongodb >network access>data service>add ip addresses
copy one then conform 
copy 2nd ip then conform 
like this 

then go to render dashboard >project name will see> at right> manual deploy>clear built cache & deploy

now this is our deployed link 
: https://wonderlust-3kf9.onrender.com
*/

