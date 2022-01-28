var http=require('http');
var url=require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var server=http.createServer(function(req,res){
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
        'payload': buffer
    };
    console.log("Buffer- ",buffer);
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



})

server.listen(3000,function(){
    console.log("Yes");
})

//Define handlers 
var handlers={};

//Sample handlers
handlers.sample=function(data,callback){
    callback(406,{'name':'sample handler'});
}
handlers.notFound=function(data,callback){
    callback(404);
}
//Define a request router for
var router={
    'sample': handlers.sample
}

