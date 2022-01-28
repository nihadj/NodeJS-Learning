var fs=require('fs');
var path=require('path');
var helpers=require('./helpers');
var lib={};
lib.dataDir=path.join(__dirname,'/../.data/');
lib.create=function(dir,file,data,callback){
    fs.open(lib.dataDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err &&fileDescriptor){
            var dataString=JSON.stringify(data);
            fs.writeFile(fileDescriptor,dataString,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback("Error closing file.");
                        }
                    })
                }else{
                    callback("Error writing to file.");
                }
            })
        }else{
            callback("Error opening/creating file.");
        }
    })
}

lib.read=function(dir,file,callback){
    fs.readFile(lib.dataDir+dir+'/'+file+'.json','utf8',function(err,data){
        if(!err&&data){
            var parsedData=helpers.parseJsonToObject(data);
            callback(false,parsedData);
        }else{
            callback(err,data);
        }
    })
}

module.exports=lib;