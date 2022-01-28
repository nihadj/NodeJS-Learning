var http=require('http');
var url=require('url');

var server=http.createServer(function(req,res){
    var parsedUrl=url.parse(req.url,true);
    var path=parsedUrl.pathname;
    var method=req.method.toLowerCase();
    var trimmedPath=path.replace(/^\/+|\/+$/g, '');
    res.end("Hello World\n");
    console.log(trimmedPath+" "+method);
})

server.listen(3000,function(){
    console.log("yes");
})