var crypto=require('crypto');
var config=require('./../config');
var helpers={};


helpers.hashIt=function(str){
    if(typeof(str)=='string'&&str.length>0){
        var hashedPass=crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
        return hashedPass;
    }else{
        return false;
    }
}


helpers.parseJsonToObject=function(str){
    try{
        var obj=JSON.parse(str);
        return obj;
    }catch(e){
        return {};
    }
    
}



module.exports=helpers;