"use strict";
const Regex = require("../helper/Regax");

var base64reg = /^data:image.*$/;
function ValidURL(str) {
    var regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if(!regex .test(str)) {
      if((str.trim()[0]=='/') && (str.trim()[1]=='/')){return true}
      return false;
    } else {
      return true;
    }
}

function getSiteHostName(url) {
    urlPartsRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    host = url.match(urlPartsRegex)[4];
    return host;
}

function getImageOnWebsite(hostname,htmlText){
  var image;
  try{
      try{
        image = htmlText.match(/<img[^>]*?src="([^<]*?)"[^>]*?>/)[1] || null;
        image = (!image) ? (htmlText.match(/<img[^>]*?src='([^<]*?)'[^>]*?>/)[1]) : image;
      }catch(err){
        image = null;
      }
  }catch(err){
    image = null
  }
  if(image)
  {
    if(!(base64reg.test(image.trim())))
    {
      image = (!ValidURL(image)) ? ( 'http://'+hostname+'/'+(image.replace(/^\//, '')) ) : image;
    }
  }
  return image;
}

function getSiteDescription(htmlText) {
     var desc;
     try{
       try{
         desc = htmlText.match(/<meta[^>]*?name=[^>]*?description[^>]*?content="([^<]*?)"[^>]*?>/)[1];
         desc = (!desc) ? (htmlText.match(/<meta[^>]*?name=[^>]*?description[^>]*?content='([^<]*?)'[^>]*?>/)[1]) : desc;
       }catch(err){
         desc = null;
       }
     }catch(err){
       desc = null;
     }
     return desc;
}

function getSiteTitle(url,htmlText) {
     var title;
      try{
          try{
            title = htmlText.match(/<meta[^>]*?property=[^>]*?og:title[^>]*?content="([^<]*?)"[^>]*?>/)[1] || null;
            title = (!title) ? (htmlText.match(/<meta[^>]*?property=[^>]*?og:title[^>]*?content='([^<]*?)'[^>]*?>/)[1]) : title;
          }catch(err){ title = null; }
      }catch(err){ title = null; }
      if(!title)
      {
        try{ title = htmlText.match(/<title[^>]*?>([^<]+)<\/title>/)[1] || null;}
        catch(err){ title = null;}
      }
      return title;
}

function getSiteLogo(hostname,htmlText)
{
  var logo;
  try{
    try{
      logo = htmlText.match(/<meta[^>]*?property=[^>]*?og:image[^>]*?content="([^<]*?)"[^>]*?>/)[1] || null;
      logo = (!logo) ? (htmlText.match(/<meta[^>]*?property=[^>]*?og:image[^>]*?content='([^<]*?)'[^>]*?>/)[1]) : logo;
    }catch(err){ logo = null; }
  }catch(err){ logo = null; }
  if(!logo)
  {
    try{
      try{
        logo = htmlText.match(/<link[^>]*?rel=[^>]*?icon[^>]*?href="([^<]*?)"[^>]*?>/)[1] || null;
        logo = (!logo) ? (htmlText.match(/<link[^>]*?rel=[^>]*?icon[^>]*?href='([^<]*?)'[^>]*?>/)[1]) : logo;
      }catch(err){ logo = null; }
    }catch(err){ logo = null; }
  }
  logo = logo ? ( (!ValidURL(logo)) ? ('http://'+hostname+'/'+(logo.replace(/^\//, ''))) : logo ) : logo;
  return logo;
}

var getWebsiteDetails = function (url,html,callback) {
      var sr = {};
      hostname = getSiteHostName(url);
      imgOnWeb = getImageOnWebsite(hostname,html);
      regexScriptRemove = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      regexCSSRemove = /<style\b[^<]*(?:(?!<\/>)<[^<]*)*<\/style>/gi;
      regexBodyRemove = /<body\b[^<]*(?:(?!<\/>)<[^<]*)*<\/body>/gi;
      html = html.replace(regexScriptRemove, "");
      //html = html.replace(regexCSSRemove, "");
      html = html.replace(regexBodyRemove, "");
      description = getSiteDescription(html);
      title = getSiteTitle(url,html) || hostname;
      logo = getSiteLogo(hostname,html) || imgOnWeb;
      sr.title = title;
      sr.description = description;
      sr.logo = logo;
      if(logo || title){
        callback(null,sr);
        return;
      }else{
        var err = new Error('Site data not found');
        callback(err)
        return;
      }
}

module.exports = {
  'getWebsiteDetails'          : getWebsiteDetails,
}
