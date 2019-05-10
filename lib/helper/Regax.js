"use strict";
exports.base64 = /^data:image.*$/;
exports.urlScheme = /^(?:(?:https?|ftp):\/\/)/;
exports.validUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
exports.urlParts = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
exports.imgUrl = /<img[^>]*?src=["']([^<]*?)["'][^>]*?>/;

exports.scriptContent = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
exports.cssContent = /<style\b[^<]*(?:(?!<\/>)<[^<]*)*<\/style>/gi;
exports.bodyContent = /<body\b[^<]*(?:(?!<\/>)<[^<]*)*<\/body>/gi;

exports.title = /<title[^>]*?>([^<]+)<\/title>/;
exports.logo = /<link[^>]*?rel=[^>]*?icon[^>]*?href=["']([^<]*?)["'][^>]*?>/;

exports.metaRegGenrator_basic = (meta)=>{
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?name=[^>]*?'+meta+'[^>]*?content=["\']([^<]*?)["\'][^>]*?>');
        var RegB = new RegExp('<meta[^>]*?content=["\']([^<]*?)["\'][^>]*?name=[^>]*?'+meta+'[^>]*?>');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

exports.metaRegGenrator_og = (meta)=>{
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?name=[^>]*?og:'+meta+'[^>]*?content=["\']([^<]*?)["\'][^>]*?>');
        var RegB = new RegExp('<meta[^>]*?content=["\']([^<]*?)["\'][^>]*?name=[^>]*?og:'+meta+'[^>]*?>');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

exports.metaRegGenrator_og_prop = (meta)=>{
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?property=[^>]*?og:'+meta+'[^>]*?content=["\']([^<]*?)["\'][^>]*?>');
        var RegB = new RegExp('<meta[^>]*?content=["\']([^<]*?)["\'][^>]*?property=[^>]*?og:'+meta+'[^>]*?>');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

