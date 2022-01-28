var http=require('http');
var url=require('url');
var server=http.createServer(function(req,res){
    var parsedUrl=url.parse(req.url,true);
    var path=parsedUrl.pathname;
    var method=req.method.toLowerCase();
    var queryStringObject=parsedUrl.query;
    res.end("Hello World!\n");
    console.log(path+" "+method+" ",queryStringObject);
})

server.listen(3000,function(){
    console.log("Yes!");
})