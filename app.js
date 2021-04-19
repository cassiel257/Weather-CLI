
//Redo colors without a module?

//const entry = process.argv.forEach((val)=>{
//    return val;
//});

var colors = require('colors');

const entry = process.argv[2];
var greeting = "Welcome to Your Favorite Weather API!";

console.log(greeting.bgMagenta);

const http = require('http');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const mapbox_key = process.env.MAPBOX_API_KEY;
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${entry}.json?access_token=${mapbox_key}`;

fetch(url).then((response)=>{
    if (response.ok){
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(data=>{
    console.log('.......This is the Mapbox API data......'.magenta, JSON.stringify(data['features'][1]));
}).catch(function (err){
    console.warn("An error occurred", err);
});

const weather_key = process.env.WEATHER_API_KEY;

const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=${weather_key}`;

fetch(url2).then((response)=>{
    if (response.ok){
        return response.json();
    }
    else{
        return Promise.reject(response);
    }
}).then(data=>{
    console.log('......Here is the Weather API data......'.magenta,JSON.stringify(data['current'].weather));
}).catch(function(err){
    console.warn("An error occurred", err);
});

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