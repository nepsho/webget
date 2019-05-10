"use strict";
const Validation = require("./helper/Validation");
const Scraper = require("./utils/Scraper");
const ProcessWebGet = require("./utils/ProcessWebGet");

exports.getmeta = (_url,_option,cb)=>{
    /*
    * Validate callback function if present
    */
    if(cb){
        if(typeof cb != "function"){
            return cb({
                status:false,
                error:"INVALID_CALLBACK",
                detail:"Callback should be function"
            });
        }
    }

    /*
    * To validate url before process
    */
    if(!(Validation.ValidUrl(_url))){
        if(cb){
            cb({
                status:false,
                error:"INVALID_URL",
                detail:"Url is invalid"
            });
            return;
        }
        return new Promise(function(resolve, reject) {
            reject(
                {
                    status:false,
                    error:"INVALID_URL",
                    detail:"Url is invalid"
                }
            )            
        });
    }

    /*
    * In case no url scheme found
    */
    if(!Validation.urlScheme(_url)){
        _url = "http://"+_url;
    }

    return Scraper.getHtml(_url).then(function(data) {
        if(cb){
            ProcessWebGet.getWebsiteDetails(_url,data.html,_option).then(function(data) {
                return cb(data);
            }).catch(function(data) {
                return cb(data);
            });
        }
        return ProcessWebGet.getWebsiteDetails(_url,data.html,_option);

    }).catch(function(data) {
        if(cb){
            return cb(data);
        }
        return new Promise(function(resolve, reject) {
            reject(data);     
        });
    });
}



exports.gethtml = (_url,cb)=>{
    /*
    * Validate callback function if present
    */
    if(cb){
        if(typeof cb != "function"){
            return cb({
                status:false,
                error:"INVALID_CALLBACK",
                detail:"Callback should be function"
            });
        }
    }

    /*
    * To validate url before process
    */
    if(!(Validation.ValidUrl(_url))){
        if(cb){
            return cb({
                status:false,
                error:"INVALID_URL",
                detail:"Url is invalid"
            });
        }
        return new Promise(function(resolve, reject) {
            reject(
                {
                    status:false,
                    error:"INVALID_URL",
                    detail:"Url is invalid"
                }
            )
        });
    }

    /*
    * In case no url scheme found
    */
    if(!Validation.urlScheme(_url)){
        _url = "http://"+_url;
    }

    if(cb){
        Scraper.getHtml(_url).then(function(data) {
            cb(data);
        }).catch(function(data) {
            cb(data);
        });
    }else{
        return Scraper.getHtml(_url);
    }
}
