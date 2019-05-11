"use strict";
const axios = require("axios");
const Constants = require("../helper/Constants");
const Validation = require("../helper/Validation");

var data;

var optionMaker = (type) => {
    if(type=="html" || !type){
        return {headers:Constants.requestHeader};
    }
    if(type=="image"){
        return {headers:Constants.requestHeader_image};
    }   
    return {headers:Constants.requestHeader}; 
}

exports.getHtml = (_url,_options)=>{
    return new Promise(function(resolve, reject) {

        axios.get(_url,optionMaker("html"))
        .then(function (response) {
                var status = response.status;
                data = {
                    status: status,
                    success: true,
                    html: response.data
                }
                resolve(data);
        })
        .catch(function (error) {
            var ec = error && Validation.isObject(error) 
                    && (Validation.isString(error.code)) 
                    && error["code"] ?
                     error["code"].trim() : "Undefined Error";
            data = {
                success: false,
                error: ec,
                detail: Constants.errorMessage[ec]
            }
            reject(data);
        })
        
    })
}

exports.isImageExist = (_url,cb)=>{
    axios.get(_url,optionMaker("image"))
    .then(function (response) {
            if(response){
                return cb(true);
            }
            return cb(false);
    })
    .catch(function (error) {
        return cb(false);
    });
}