var _data=require('./data');
var helpers=require('./helpers');
var handlers={};

handlers.nihad=function(data,callback){
    callback(200,{'name':'Nihad Jamadar'});
}

handlers.notFound=function(data,callback){
    callback(404);
}
handlers.users=function(data,callback)
{
    var acceptableMethods=['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method)>-1){
        handlers._users[data.method](data,callback);
    }else{
        callback(405);
    }
}
handlers._users={};
handlers._users.post=function(data,callback){
  
    var firstName=typeof(data.payload.firstName)=='string'&&data.payload.firstName.trim().length>0?data.payload.firstName.trim():false;
    var lastName=typeof(data.payload.lastName)=='string'&&data.payload.lastName.trim().length>0?data.payload.lastName.trim():false;
    var phone=typeof(data.payload.phone)=='string'&&data.payload.phone.trim().length==10?data.payload.phone.trim():false;
    var password=typeof(data.payload.password)=='string'&&data.payload.password.trim().length>0?data.payload.password.trim():false;
    var tosAgreement=typeof(data.payload.tosAgreement)=='boolean'&&data.payload.tosAgreement==true?true:false;
    if(firstName&&lastName&&phone&&password&&tosAgreement){
        _data.read('users',phone,function(err,data){
            if(err){
                var hashedPass=helpers.hashIt(password);
                if(hashedPass){
                    var readStuff={
                        'firstName':firstName,
                        'lastName':lastName,
                        'phone':phone,
                        'password':hashedPass,
                        'tosAgreement':tosAgreement
                    }
                    _data.create('users',phone,readStuff,function(err){
                        if(!err){
                            callback(200);
                        }else{
                            console.log(err);
                            callback(500,{'Error':'Maybe the file already exists.'});
                        }
                    })
                }else{
                    callback("Error hashing password");
                }
            }else{
                callback(404,{'Error': 'File already exists'});
            }
        })
    }else{
        callback(404,{"Error":"First step didn't happen"});
    }

}
module.exports=handlers;