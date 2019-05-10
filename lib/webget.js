"use strict";
const request = require("request");
const constants = require("./helper/Constants");
const Scraper = require("./utils/Scraper");


var delay = ms => new Promise((r, j)=>setTimeout(r, ms));


exports.getmeta = (url,option,cb)=>{
    cb(null,"Coming soon");
}

exports.gethtml = (_url,cb)=>{
    if(cb){ 
        if(typeof cb === "function"){
            Scraper.getHtml(_url).then(function(data) {
                cb(data);
            }).catch(function(data) {
                cb(data);
            });
        } else {
            cb({
                status:false,
                error:"INVALID_CALLBACK",
                detail:"Callback should be function"
            });
        }
    }else{
        return Scraper.getHtml(_url);
    }
}
