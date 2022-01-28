var http=require('http');
var url=require('url');
var config=require('./lib/config');
var fs=require('fs');
var https=require('https');
var _data=require('./lib/data');
var handlers=require('./lib/handlers');
var helpers=require('./lib/helpers');
var StringDecoder = require('string_decoder').StringDecoder;
var httpServer=http.createServer(function(req,res){
    unifiedServer(req,res);
});
/*_data.create('test','newFile',{'foo':'bar'},function(err){
    console.log(err);
})*/
_data.read('test','newFile',function(err,data){
    console.log("Error- ",err,'Data-',data);
});
httpServer.listen(config.httpPort, function(req,res){
    console.log("The server is listening on port "+config.httpPort);
});
var httpsServerOptions ={
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};
var httpsServer=https.createServer(httpsServerOptions,function(req,res){
    unifiedServer(req,res);
})
httpsServer.listen(config.httpsPort,function(){
    console.log("The server is listening on port "+config.httpsPort);
})
var unifiedServer=function(req,res){
    var parsedUrl=url.parse(req.url,true);
    var path=parsedUrl.pathname;
    var trimmedPath=path.replace(/^\/+|\/+$/g,'');
    var queryStringObject=parsedUrl.query;
    var method=req.method.toLowerCase();
    var headers=req.headers;
    var decoder=new StringDecoder('utf-8');
    var buffer='';
    req.on('data',function(data){
        buffer+=decoder.write(data);
    })
    req.on('end',function(){
        buffer+=decoder.end();
    })

    //Choose the handler the request must go to.
    var chosenHandler=typeof(router[trimmedPath])!=='undefined'?router[trimmedPath]:handlers.notFound;
    //construct the data object to send to the handler
    var data={
        'trimmedPath': trimmedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'headers': headers,
        'payload': helpers.parseJsonToObject(buffer)
    };

    //Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload){
        statusCode = typeof(statusCode)=='number'?statusCode:200;
        payload = typeof(payload)=='object'?payload:{};
        //Convert received object to string
        var payloadReceived=JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadReceived);
        console.log('Returning: ',statusCode,payloadReceived);
    }) 
}
// server.listen(config.port,function(){
//     console.log("Server is listening on port "+config.port+" in "+config.envName+" mode.");
// })


//Define a request router for
var router={
    'ping': handlers.ping,
    'users': handlers.users
}

