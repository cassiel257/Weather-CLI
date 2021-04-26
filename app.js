
var colors = require('colors');

const entry = process.argv[2];
var greeting = "Welcome to Your Favorite Weather API!";

console.log(greeting.bgMagenta);

const http = require('http');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
var latitude='';
var longitude='';
var place='';
dotenv.config();

const mapbox_key = process.env.MAPBOX_API_KEY;
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${entry}.json?access_token=${mapbox_key}`;

const weather_key = process.env.WEATHER_API_KEY;
const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=${weather_key}`;

async function get_coordinates(link1){
    const response1 = await fetch(link1);
    const coordinateData = await response1.json();
    const lat = JSON.stringify(coordinateData['features'][1].center[0]);
    const lon = JSON.stringify(coordinateData['features'][1].center[1]);
    const place = JSON.stringify(coordinateData['features'][1].place_name);
    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${weather_key}`);
    const weatherData = await response2.json();
    const temp = JSON.stringify(weatherData.current['temp']);
    const celsius = (temp-273.15).toFixed(2);
    const farenheit = ((temp-273.15)*(9/5)+32).toFixed(2);
    const humidity = JSON.stringify(weatherData.current.humidity);
    const conditions = JSON.stringify(weatherData.current.weather[0].main);
    const description = JSON.stringify(weatherData.current.weather[0].description);
    console.log('Current Weather for'.magenta,place);
    console.log('Temperature: '.magenta + farenheit +' °F'+' / ' + celsius+' °C');
    console.log('Humidity:'.magenta, humidity+' %');
    console.log('Current conditions:'.magenta, conditions+',', description);

    //web server starter code
    // const server = http.createServer(function(req, res){
    //     res.setHeader('Content-type', 'application/json');
    //     res.setHeader('Access-Control-Allow-Origin',"*");
    //     res.writeHead(200);
    
    //     let dataObject = weatherData.current;
    //     let data = JSON.stringify(dataObject);
    //     res.end(data);
    // });
    
    // server.listen(3000, function(){
    //     console.log('Running on port 3000');
    // });

};

const data1 = get_coordinates(url);
