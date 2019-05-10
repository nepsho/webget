"use strict";
const constants = require("./helper/Constants");
const Scraper = require("./utils/Scraper");
const ProcessWebGet = require("./utils/ProcessWebGet");

var delay = ms => new Promise((r, j)=>setTimeout(r, ms));


exports.getmeta = (_url,_option,cb)=>{
    if(cb){
        if(typeof cb === "function"){
            Scraper.getHtml(_url).then(function(data) {
                ProcessWebGet.getWebsiteDetails(_url,data.html,(finalDate)=>{
                    cb(finalDate);
                })
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
        return "coming soon";
    }
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
