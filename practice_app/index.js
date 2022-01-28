var http=require('http');
var url=require('url');
var config=require('./config');
var _data=require('./lib/data');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers=require('./lib/handlers');
var helpers=require('./lib/helpers');



//delete the following-
// _data.delete('test','newFile',function(err,data){
//     console.log(err,data);
// })
var server=http.createServer(function(req,res){
    var parsedUrl=url.parse(req.url,true);
    var path=parsedUrl.pathname;
    var trimmedPath=path.replace(/^\/+|\/+$/g,'');
    var queryStringObject=parsedUrl.query;
    var method=req.method.toLowerCase();
    var headers=req.headers;
    var decoder=new StringDecoder('utf-8');
    var buffer = ''
  
    req.on('data',chunk=>{
      buffer=(decoder.write(chunk));
    })
    req.on('end',function(){
        console.log("data read success");
        console.log(buffer);
        var data={
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer),
        };
        console.log(data);
        var chosenHandler=typeof(router[trimmedPath])!='undefined'?router[trimmedPath]:handlers.notFound;
        chosenHandler(data,function(statusCode,payload){
            statusCode = typeof(statusCode)=='number'?statusCode : 200;
            payload = typeof(payload)=='object'?payload:{};
            var receivedPayload=JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(receivedPayload);
            console.log('Returning: ',statusCode,receivedPayload);
        })
    })
  
    
    
});
server.listen(config.port, function(){
    console.log("Listening to port "+config.port+" in "+config.envName+" environment");
});


var router={
    'nihad': handlers.nihad,
    'users': handlers.users
}