const Regax = require("./Regax");

exports.ValidUrl = (_url)=>{
    if(!_url){return false}
    _url = _url.trim();
    return Regax.validUrl.test(_url);
}