"use strict";
const Regex = require("../helper/Regax");

var ValidImageURL = (url)=>{
  var regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if(!regex.test(url)) {
      if((url.trim()[0]=='/') && (url.trim()[1]=='/')){return true}
      return false;
    } else {
      return true;
    }
}

exports.getSiteHostName = (url)=>{
  var host;
  try{
    var urlPartsRegex = Regex.urlParts;
    host = url.match(urlPartsRegex);
    host = host ? host[4] : null;
  }catch(err){
    host = null;
  }
  return host;
}


exports.getImageOnWebsite = (hostname,html)=>{
  var image;
  try{
    image = html.match(Regex.imgUrl);
    image = image ? image[1] : null;
    if(image){
      if(!(Regex.base64.test(image.trim())))
      {
        image = (image.trim().length!=0 && image.trim()[0]==".") ? image.replace(/^([.][.])|([.])/,"") : image; 
        image = (!ValidImageURL(image)) ? ( 'http://'+hostname+'/'+(image.replace(/^\//, '')) ) : image;
      }
    }
  }catch(err){
    image = null;
  }
  return image;
}

exports.removeHtmlScripts = (html)=>{
  if(html && typeof html === "string"){
    return html.replace(Regex.scriptContent, "");
  }
  return "";
}

exports.removeHtmlBody = (html)=>{
  if(html && typeof html === "string"){
    return html.replace(Regex.bodyContent, "");
  }
  return "";
}

exports.removeHtmlCSS = (html)=>{
  if(html && typeof html === "string"){
    return html.replace(Regex.cssContent, "");
  }
  return "";
}