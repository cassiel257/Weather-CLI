//OpenWeather API no longer free, either update API Key for limited use or add in openmeteo
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

codes={
    0:"Clear sky", 1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"depositing rime fog",
    51:"Light drizzle",53:"Moderate drizzle",55:"Dense drizzle",56:"Light freezing drizzle",57:"Dense freezing drizzle",
    61:"Slight rain",63:"Moderate rain",65:"Heavy rain",66:"Light freezing rain",67:"Heavy freezing rain",71:"Slight snowfall",
    73:"Moderate snowfall",75:"Heavy snowfall",77:"Snow grains",80:"Slight rain showers",81:"Moderate rain showers",82:"Violent rain showers",
    85:"Slight snow showers",86:"Heavy snow showers",95:"Slight to moderate thunderstorm",96:"Thunderstorm with slight hail",97:"Thunderstorm with heavy hail"
}

function get_temperatures(fahrenheit_temp){
    var celsius_temp=((fahrenheit_temp-32)/1.8);
    var combined_temps= (fahrenheit_temp).toFixed(2) +' °F'+' / ' + (celsius_temp).toFixed(2)+ ' °C';
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
            const timezone=(weatherData.timezone)
            
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
            const response3 = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&tzid=${timezone}`);

           
            if(response3.status >= 200 && response3.status < 400){
                const sunriseData=await response3.json();
                const firstLight=sunriseData.results.civil_twilight_begin
                const sunrise=sunriseData.results.sunrise
                const sunset=sunriseData.results.sunset
                const lastLight=sunriseData.results.civil_twilight_end
                
                console.log('Current Weather for'.magenta,place,">","Timezone".magenta,timezone);
                console.log('Temperature: '.magenta, conv_temps);
                console.log('Humidity:'.magenta, humidity+' %');
                console.log('Current conditions:'.magenta, conditions+',', description);
                console.log('The lowest temperature for today will be: '.cyan, conv_min);
                console.log('The highest temperature for today will be: '.red, conv_max);
                console.log("First Light: ".grey, firstLight);
                console.log("Sunrise: ".yellow, sunrise);
                console.log("Sunset: ".cyan, sunset);
                console.log("Last Light: ".grey, lastLight);
                console.log('Tomorrow you can expect:'.magenta,future);}
                else{
                    console.log('There was an error: ',response3.status,response3.statusText+"Sunrise data not found".grey);
                }
        } else {
            console.log('There was an error:',response2.status, response2.statusText+' There was a problem getting the weather for this location. Try putting your full location in quotes, ie \'paris france\''.blue);
        }
    } else {
        console.log('There was an error:',response1.status, response1.statusText+' There was a problem getting coordinates for this location. Try putting your full location in quotes, ie \'paris france\''.yellow);
    }

};

const data1 = get_coordinates(url).catch(error=>{console.log('There was an error:',error.message, 'Try putting your location in quotes, ie node \'paris france\'' .red)});
