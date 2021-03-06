"use strict";
const Regex = require("../helper/Regax");
const Validation = require("../helper/Validation");

/*
* Validate image url is valid or not as per url prop
*/
var ValidImageURL = function(url){
  var regex = Regex.validUrl;
    if(!regex.test(url)) {
      if((url.trim()[0]=='/') && (url.trim()[1]=='/')){return true}
      return false;
    } else {
      return true;
    }
}

/*
* site host return funtion helps in host regarding task
*/
exports.getSiteHostName = function(url){
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


/*
* It will return one image from site
*/
exports.getImageOnWebsite = function(hostname,html){
  var image;
  try{
    image = html.match(Regex.imgUrl);
    image = image ? image[1] : "";
    if(Validation.isString(image) && image.trim().length!=0){
      if(!(Regex.base64.test(image.trim())))
      {
        image = (image.trim().length!=0 && image.trim()[0]==".") ? image.replace(/^([.][.])|([.])/,"") : image; 
        image = (!ValidImageURL(image)) ? ( 'http://'+hostname+'/'+(image.replace(/^\//, '')) ) : image;
      }
    }
  }catch(err){
    image = "";
  }
  return image.trim();
}

/*
* It will remove script tag to optimize performance
*/
exports.removeHtmlScripts = function(html){
  if(Validation.isString(html)){
    return html.replace(Regex.scriptContent, "");
  }
  return "";
}

/*
* It will remove body tag to optimize performance
*/
exports.removeHtmlBody = function(html){
  if(Validation.isString(html)){
    return html.replace(Regex.bodyContent, "");
  }
  return "";
}

/*
* It will remove css tag to optimize performance
*/
exports.removeHtmlCSS = function(html){
  if(Validation.isString(html)){
    return html.replace(Regex.cssContent, "");
  }
  return "";
}

/*
* These title and logo old way is the simplest way called
* if meta is not found.
*/
function getTitleOldWay(html){
  var result = html.match(Regex.title);
  if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
    return result[1].trim();
  }
  return "";
}
function getLogoOldWay(html){
  var result = html.match(Regex.logo);
  if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
    return result[1].trim();
  }

  var result = html.match(Regex.logo_a);
  if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
    return result[1].trim();
  }

  var result = html.match(Regex.logo_b);
  if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
    return result[1].trim();
  }
  return "";
}

/*
* getMeta_basic is the main function to get basic
* meta tags and process using basic meta reg.
*/
function getMeta_basic(html,field){
  var Regs = Regex.metaRegGenrator_basic(field);
  if(!(Regs.a && Regs.b)){return ""}
  try{
    var result = html.match(Regs.a);
    if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
      return result[1].trim();
    }

    result = html.match(Regs.b);
    if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
      return result[1].trim();
    }
  }catch(err){
    return "";
  }
  return "";
}

/*
* getMeta_og is the main function to get OpenGraph
* meta tags and process using OpenGraph meta reg.
*/
function getMeta_og(html,field){
  var Regs = Regex.metaRegGenrator_og(field);
  if(!(Regs.a && Regs.b)){return ""}
  try{
    var result = html.match(Regs.a);
    if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
      return result[1].trim();
    }

    result = html.match(Regs.b);
    if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
      return result[1].trim();
    }
  }catch(err){
    return "";
  }
  return "";
}

/*
* getMeta_prop is the main function to get OpenGraph
* property meta tags and process using OpenGraph meta reg.
*/
function getMeta_prop(html,field){
  var Regs = Regex.metaRegGenrator_og_prop(field);
  if(!(Regs.a && Regs.b)){return ""}
  try{
    var result = html.match(Regs.a);
    if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
      return result[1].trim();
    }
    
    result = html.match(Regs.b);
    if(Validation.isArray(result) && Validation.isString(result[1]) && (result[1].trim().length!=0)){
      return result[1].trim();
    }
  }catch(err){
    return "";
  }
  return "";
}

/*
* Logic only for logo
*/
function getMetaForLogo(html,hostname){
  var result;

  result = getMeta_prop(html,"image");
  if(result.trim().length!=0){
    if(result){
      if(!(Regex.base64.test(result.trim())))
      {
        result = (result.trim().length!=0 && result.trim()[0]==".") ? result.replace(/^([.][.])|([.])/,"") : result;
        result = result.startsWith("//") ? "http:"+result : result;
        result = (!ValidImageURL(result)) ? ( 'http://'+hostname+'/'+(result.replace(/^\//, '')) ) : result;
      }
    }
    return result;
  }
  
  result = getLogoOldWay(html);
  if(result.trim().length!=0){
    if(result){
      if(!(Regex.base64.test(result.trim())))
      {
        result = (result.trim().length!=0 && result.trim()[0]==".") ? result.replace(/^([.][.])|([.])/,"") : result; 
        result = result.startsWith("//") ? "http:"+result : result;
        result = (!ValidImageURL(result)) ? ( 'http://'+hostname+'/'+(result.replace(/^\//, '')) ) : result;
      }
    }
    return result;
  }
  return "";
}

/*
* Logic only for Title
*/
function getMetaForTitle(html){
  var result;

  result = getMeta_og(html,"title");
  if(result.trim().length!=0){
    return result;
  }

  result = getTitleOldWay(html);
  if(result.trim().length!=0){
    return result;
  }

  result = getMeta_og(html,"site_name");
  if(result.trim().length!=0){
    return result;
  }
  return "";
}


/*
* getting site meta data master function
*/
exports.returnMetaData = function(html,fields,hostname){
  var metaResult = {};
  var _r;

  var needLogoIndex = fields.indexOf("logo");
  if(needLogoIndex > -1){
    _r = getMetaForLogo(html,hostname);
    metaResult["logo"] = _r;
    fields.splice(needLogoIndex, 1);
  }

  var needTitleIndex = fields.indexOf("title");
  if(needTitleIndex > -1){
    _r = getMetaForTitle(html);
    metaResult["title"] = _r;
    fields.splice(needTitleIndex, 1);
  }

  for(var i = 0 ; i < fields.length ; i++){
    _r = getMeta_basic(html,fields[i]);
    if(_r.length==0){
      _r = getMeta_og(html,fields[i]);
      if(_r.length==0){
        _r = getMeta_prop(html,fields[i]);
      }
    }
    metaResult[fields[i]] = _r;
  }
  return metaResult;
}