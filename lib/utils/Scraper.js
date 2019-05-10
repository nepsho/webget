"use strict";
const request = require("request");
const Constants = require("../helper/Constants");
const Regax = require("../helper/Regax");
const Validation = require("../helper/Validation");

var data;

var optionMaker = (_url) => {
    return {
        url: _url,
        headers: {
            'User-Agent': Constants.apiConstants['User-Agent']
        }
    };
}

exports.getHtml = (_url,_options)=>{
    console.log(Validation.ValidUrl(_url));
    return new Promise(function(resolve, reject) {
        if(!(_url && (typeof _url ==='string') && Validation.ValidUrl(_url))){
            reject({
                status:false,
                error:"INVALID_URL",
                detail:"Url is invalid"
            });
        }
        if(!Regax.urlScheme.test(_url)){
            reject({
                status:false,
                error:"INVALID_URL",
                detail:"Url is invalid"
            });
        }
        request.get(optionMaker(_url), function(err, resp, body) {
            if (err) {
                var ec = err && err["code"] ? err["code"] : "Undefined Error";
                data = {
                    status: false,
                    error: ec,
                    detail: err
                }
                reject(data);
            } else {
                body = body ? body : "";
                data = {
                    status: true,
                    html:body
                }
                resolve(data);
            }
        })
    })
}