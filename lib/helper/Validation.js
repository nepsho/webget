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

exports.isString = (variable)=>{
    if(!variable) return false;
    if(typeof variable === 'string') return true;
}

exports.isArray = (variable)=>{
    if(!variable) return false;
    if(variable instanceof Array) return true;
}

exports.isObject = (variable)=>{
    if(!variable) return false;
    if(variable instanceof Object && !(variable instanceof Array)) return true;
}

exports.isFunction = (variable)=>{
    if(!variable) return false;
    if(typeof variable === 'function') return true;
}

