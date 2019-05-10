"use strict";
const request = require("request");
const constants = require("../helper/Constants");
var data;

var optionMaker = (_url) => {
    return {
        url: _url,
        headers: {
            'User-Agent': constants.apiConstants['User-Agent']
        }
    };
}


exports.getHtml = (_url,_options)=>{
    return new Promise(function(resolve, reject) {
        if(!_url || (_url && _url.trim().length==0)){
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