var greeting = "Welcome to the Weather API!";

console.log(greeting);

const http = require('http');

const server = http.createServer(function(req, res){
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.writeHead(200);

    let dataObject = {"id":7, "city":"Paris","weather":"rainy","breakfast":"crepes", "forecast":"stylishly gloomy"};
    let data = JSON.stringify(dataObject);
    res.end(data);
});

server.listen(3000, function(){
    console.log('Server started successfully on port 3000!');
});