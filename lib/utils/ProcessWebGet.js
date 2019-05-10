"use strict";
const MetaExtractor = require("./MetaExtractor");


exports.getWebsiteDetails = (_url,_html,_option,cb)=>{
    var hostname = MetaExtractor.getSiteHostName(_url);
    var imgOnWeb = MetaExtractor.getImageOnWebsite(hostname,html);
    html = MetaExtractor.removeHtmlScripts(html);
    html = MetaExtractor.removeHtmlBody(html);
    console.log(html);
    cb("123","456")
    /*html = MetaExtractor.removeHtmlCSS(html);*/    
}

