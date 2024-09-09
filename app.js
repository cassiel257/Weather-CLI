//TODO: Add Sunrise/sunset times and moonrise moonset for current day
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

function get_temperatures(fahrenheit_temp){
    var celsius_temp=((fahrenheit_temp-32)/1.8);
    var combined_temps= (fahrenheit_temp) +' °F'+' / ' + (celsius_temp).toFixed(2)+ ' °C';
    return combined_temps;
};


const mapbox_key = process.env.MAPBOX_API_KEY;
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${entry}.json?access_token=${mapbox_key}`;

const weather_key = process.env.WEATHER_API_KEY;
const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=${weather_key}&units=imperial`;

async function get_coordinates(link1){
    const response1 = await fetch(link1);
    if (response1.status >= 200 && response1.status < 400){
        const coordinateData = await response1.json();
        const lat = JSON.stringify(coordinateData['features'][0].center[1]);

        const lon = JSON.stringify(coordinateData['features'][0].center[0]);


        const place = JSON.stringify(coordinateData['features'][0].place_name);

        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${weather_key}&units=imperial`);
        if (response2.status >= 200 && response2.status < 400){
            const weatherData = await response2.json();

            const temperature = (weatherData.current['temp']);
            const conv_temps = get_temperatures(temperature);
            const low=(weatherData.daily[0].temp['min']);
            const conv_min= get_temperatures(low);
            const high=(weatherData.daily[0].temp['max']);
            const conv_max= get_temperatures(high);

            const humidity = JSON.stringify(weatherData.current.humidity);
            const conditions = JSON.stringify(weatherData.current.weather[0].main);
            const description = JSON.stringify(weatherData.current.weather[0].description);

            const future_low = weatherData.daily[1].temp['min'];
            const conv_future_low = get_temperatures(future_low);
            const future_high = weatherData.daily[1].temp['max'];
            const conv_future_high = get_temperatures(future_high);

            const future_weather = JSON.stringify(weatherData.daily[1].weather[0].main);
        
            const future = future_weather+', Low:'+conv_future_low+', High: '+conv_future_high;

            console.log('Current Weather for'.magenta,place);
            console.log('Temperature: '.magenta, conv_temps);
            console.log('Humidity:'.magenta, humidity+' %');
            console.log('Current conditions:'.magenta, conditions+',', description);
            console.log('The lowest temperature for today will be: '.blue, conv_min);
            console.log('The highest temperature for today will be: '.red, conv_max);
            console.log('Want to know the future? Tomorrow you can expect:'.magenta,future);
        } else {
            console.log('There was an error:',response2.status, response2.statusText+' Try putting your full location in quotes, ie \'paris france\''.blue);
        }
    } else {
        console.log('There was an error:',response1.status, response1.statusText+' Try putting your full location in quotes, ie \'paris france\''.red);
    }

};

const data1 = get_coordinates(url).catch(error=>{console.log('There was an error:',error.message, 'Try putting your location in quotes, ie node \'paris france\'' .red)});
