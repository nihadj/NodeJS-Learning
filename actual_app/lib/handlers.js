var _data=require('./data')
var helpers=require('./helpers');
//Define handlers 
var handlers={};

//Sample handlers
handlers.ping=function(data,callback){
    callback(200);
}
handlers.users=function(data,callback){
    var acceptableMethods=['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method)>-1){
        handlers._users[data.method](data,callback);
    }else{
        callback(404);
    }

};
handlers._users={};
handlers._users.post=function(data,callback)
{
    var firstName=typeof(data.payload.firstName)=='string'&&data.payload.firstName.trim().length>0?data.payload.firstName.trim():false;
    var lastName=typeof(data.payload.lastName)=='string'&&data.payload.lastName.trim().length>0?data.payload.lastName.trim():false;
    var phone=typeof(data.payload.phone)=='string'&&data.payload.phone.trim().length>0?data.payload.phone.trim():false;
    var password=typeof(data.payload.password)=='string'&&data.payload.password.trim().length>0?data.payload.password.trim():false;
    var tosAgreement=typeof(data.payload.tosAgreement)=='boolean'&&data.payload.tosAgreement==true?true:false;
    if(firstName&&lastName&&phone&&password&&tosAgreement){
        _data.read('users',phone,function(err,data){
            if(err){
                var hashedPassword=helpers.hash(password);
                if(hashedPassword){
                    var userObject={
                        'firstName':firstName,
                        'lastName':lastName,
                        'phone':phone,
                        'hashedPassword':hashedPassword,
                        'tosAgreement':true
                    };
                }
                
                _data.create('users',phone,userObject,function(err){
                    if(!err){
                        callback(200);
                        
                    }else{
                        console.log(err);
                        callback(500,{"Error":"Could not create the new user"});
                    }
                })
            }else{
                callback(400,{"Error":"Already exists"});
            }
        })

        
    }else{
        callback(400,{"Error":"Missing required fields."});
    }
}

handlers.notFound=function(data,callback){
    callback(404);
}


module.exports=handlers;