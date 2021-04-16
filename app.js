var greeting = "Welcome to Your Favorite Weather API!";

console.log(greeting);

const http = require('http');
const fetch = require('node-fetch');

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/paris.json?access_token=pk.eyJ1IjoiaW5maW5pdGV1c2VybmFtZSIsImEiOiJja25qbjY3b2YwMDJvMnVxdmtqcmE5MHM2In0.Ke1ijexIWlsMVAF4LeVIzg';

fetch(url).then((response)=>{
    return (response.json());
}).then((data=>{
    console.log(JSON.stringify(data));
}));

const url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=852e338b96d2abd5afdb4e3bf6f207d5';

fetch(url2).then((response)=>{
    return (response.json());
}).then((data=>{
    console.log(JSON.stringify(data));
}));

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