const Regax = require("./Regax");

exports.ValidUrl = (_url)=>{
    if(!(_url && (typeof _url ==='string'))){
        return false;
    }
    _url = _url.trim();
    return Regax.validUrl.test(_url);
}

exports.urlScheme = (_url)=>{
    if(!(_url && (typeof _url ==='string'))){
        return false;
    }
    _url = _url.trim();
    return Regax.urlScheme.test(_url);
}