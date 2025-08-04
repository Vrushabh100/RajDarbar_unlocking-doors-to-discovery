const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
const app = express();
cloudinary.config({
       //jo .env mein likha uske KEY ko veriables mein store krlo
      cloud_name:process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET
})


const storage= new CloudinaryStorage({ 
       cloudinary:cloudinary,
       params:{
       folder:'wanderlust_dev',
       allowedFormats:["png","jpg","jpeg"],
    //    format:async(req,file)=>'png', //supports promises as well 
    //    public_id:(req,file)=>'computed-filename-using-request',
       },
});

module.exports={cloudinary,storage}