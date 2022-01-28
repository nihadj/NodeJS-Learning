var http=require('http');
var url=require('url');
var server=http.createServer(function(req,res){
    var parsedUrl=url.parse(req.url,true);
    var path=parsedUrl.pathname;
    var method=req.method.toLowerCase();
    var queryStringObject=parsedUrl.query;
    var headers=req.headers;
    res.end("Hello World\n");
    console.log(path+" "+method+" ",queryStringObject);
    console.log(headers);
})

server.listen(3000,function(req,res){
    console.log("Yes");
})

