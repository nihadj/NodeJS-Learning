var http=require('http');
var url=require('url');
var server=http.createServer(function(req,res){
    var parsedUrl=url.parse(req.url,true);
    var path=parsedUrl.pathname;
    res.end("Hello World!");
    console.log(path);

})


server.listen(3000,function(){
    console.log("yyy");
});