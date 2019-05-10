"use strict";
exports.base64 = /^data:image.*$/;
exports.validUrl = /^(((http|https|ftp):\/+){0,1})(((((([0-1]([0-9]{0,1})([0-9]{0,1})[.])|([2][0-5][0-5][.])|([3-9][0-9][.]))(([0-1]([0-9]{0,1})([0-9]{0,1})[.])|([2][0-5][0-5][.])|([3-9][0-9][.]))(([0-1]([0-9]{0,1})([0-9]{0,1})[.])|([2][0-5][0-5][.])|([3-9][0-9][.]))(([0-1]([0-9]{0,1})([0-9]{0,1}))|([2][0-5][0-5])|([3-9][0-9])))|localhost):((([1][0][2][4-9])|([1][0][3-9][0-9])|([1][1-9][0-9][0-9])|([2-9][0-9][0-9][0-9])|([1-5][0-9][0-9][0-9][0-9])|([6][1-4][0-9][0-9][0-9])|([6][5][0-4][0-9][0-9])|([6][5][5][0-2][0-9])|([6][5][5][3][0-5]))$))|((([a-zA-Z0-9][a-zA-Z0-9_-]*[.])+[a-zA-Z]+))+([/]?[a-zA-Z0-9_?=.]+)*)$/;
exports.urlParts = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
exports.imgUrl = /<img[^>]*?src=["']([^<]*?)["'][^>]*?>/;

exports.scriptContent = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
exports.cssContent = /<style\b[^<]*(?:(?!<\/>)<[^<]*)*<\/style>/gi;
exports.bodyContent = /<body\b[^<]*(?:(?!<\/>)<[^<]*)*<\/body>/gi;

exports.title = /<title[^>]*?>([^<]+)<\/title>/;
exports.logo = /<link[^>]*?rel=[^>]*?icon[^>]*?href="([^<]*?)"[^>]*?>/;

exports.metaRegGenrator_basic = (meta)=>{
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?name=[^>]*?'+meta+'[^>]*?content="([^<]*?)"[^>]*?>');
        var RegB = new RegExp('<meta[^>]*?content="([^<]*?)"[^>]*?name=[^>]*?'+meta+'[^>]*?>');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

exports.metaRegGenrator_og = (meta)=>{
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?name=[^>]*?og:'+meta+'[^>]*?content="([^<]*?)"[^>]*?>');
        var RegB = new RegExp('<meta[^>]*?content="([^<]*?)"[^>]*?name=[^>]*?og:'+meta+'[^>]*?>');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

exports.metaRegGenrator_og_prop = (meta)=>{
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?property=[^>]*?og:'+meta+'[^>]*?content="([^<]*?)"[^>]*?>');
        var RegB = new RegExp('<meta[^>]*?content="([^<]*?)"[^>]*?property=[^>]*?og:'+meta+'[^>]*?>');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

