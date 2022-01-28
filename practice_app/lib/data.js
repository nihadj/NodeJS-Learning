var fs=require('fs');
var path=require('path');
var helpers=require('./helpers');

var lib={};

lib.dirStore=path.join(__dirname,'/../.data/');
lib.create=function(dir,file,data,callback){
    fs.open(lib.dirStore+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err&&fileDescriptor){
            var stringData=JSON.stringify(data);
            fs.writeFile(fileDescriptor,stringData,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(err){
                            callback("Error closing file.");
                        }else{
                            callback(false);
                        }
                    })
                }else{
                    callback("Error writing to file.");
                }
            })
        }else{
            callback("Error opening file, maybe because it already exists.");
        }
    })
}

lib.read=function(dir,file,callback){
    fs.readFile(lib.dirStore+dir+'/'+file+'.json','utf8',function(err,data){
        callback(err,data);
    })
}


lib.update=function(dir,file,data,callback){
    fs.open(lib.dirStore+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err&&fileDescriptor){
            var stringData=JSON.stringify(data);
            fs.truncate(fileDescriptor,function(err){
                if(!err){

                    fs.writeFile(fileDescriptor,stringData,function(err){
                        if(!err){
                            fs.close(fileDescriptor,function(err){
                                if(!err){
                                    callback(false);
                                }else{
                                    callback("Error closing file");
                                }
                            })

                        }else{
                            callback("Error writing to file.");
                        }
                    })
                }else{
                    callback("Error truncating file.");
                }
            })
        }else{
            callback("Error opening file. Maybe it doesn't exist yet.");
        }
    })
}
lib.delete=function(dir,file,callback){
    fs.open(lib.dirStore+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err&&fileDescriptor){
            fs.truncate(fileDescriptor,function(err){
                if(!err){
                    callback(false);
                }else{
                    callback('Error deleting.');
                }
            })

        }else{
            callback("Error opening file.")
        }
    })
}


module.exports=lib;