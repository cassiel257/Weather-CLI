//Once the parsing is correct, 1)replace the OpenWeather API call and parsing with this one from OpenMeteo. 
//2)Make sure the timezone works with the Sunrise API.

const http = require('http');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
var latitude='';
var longitude='';
var place='';
dotenv.config();
const entry="New York City"

codes={
    0:"Clear sky", 1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"depositing rime fog",
    51:"Light drizzle",53:"Moderate drizzle",55:"Dense drizzle",56:"Light freezing drizzle",57:"Dense freezing drizzle",
    61:"Slight rain",63:"Moderate rain",65:"Heavy rain",66:"Light freezing rain",67:"Heavy freezing rain",71:"Slight snowfall",
    73:"Moderate snowfall",75:"Heavy snowfall",77:"Snow grains",80:"Slight rain showers",81:"Moderate rain showers",82:"Violent rain showers",
    85:"Slight snow showers",86:"Heavy snow showers",95:"Slight to moderate thunderstorm",96:"Thunderstorm with slight hail",97:"Thunderstorm with heavy hail"
}

function get_temperatures(celsius_temp){
    var fahrenheit_temp=((celsius_temp *1.8)+32);
    var combined_temps= (fahrenheit_temp).toFixed(2) +' °F'+' / ' + (celsius_temp).toFixed(2)+ ' °C';
    return combined_temps;
};


const mapbox_key = process.env.MAPBOX_API_KEY;
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${entry}.json?access_token=${mapbox_key}`;

async function get_coordinates(link1){
    const response1 = await fetch(link1);
    if (response1.status >= 200 && response1.status < 400){
        const coordinateData = await response1.json();
        const lat = JSON.stringify(coordinateData['features'][0].center[1]);

        const lon = JSON.stringify(coordinateData['features'][0].center[0]);


        const place = JSON.stringify(coordinateData['features'][0].place_name);

        const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`);
        
        
        if (response2.status >= 200 && response2.status < 400){
            
            const weatherData = await response2.json();)
            const timezone=(weatherData.timezone)
            console.log("Timezone",timezone)
            
            const temperature = weatherData['current']['temperature_2m'];
            
            const conv_temps = get_temperatures(temperature);
            console.log("Temp",conv_temps)
            // const low=(weatherData.daily[0].temp['min']);
            // const conv_min= get_temperatures(low);
            // const high=(weatherData.daily[0].temp['max']);
            // const conv_max= get_temperatures(high);

            // const humidity = JSON.stringify(weatherData.current.humidity);
            // const conditions = JSON.stringify(weatherData.current.weather[0].main);
            const description = JSON.stringify(codes[(weatherData['current']['weather_code'])]);
            console.log("Weather code description",description)

            // const future_low = weatherData.daily[1].temp['min'];
            // const conv_future_low = get_temperatures(future_low);
            // const future_high = weatherData.daily[1].temp['max'];
            // const conv_future_high = get_temperatures(future_high);

            // const future_weather = JSON.stringify(weatherData.daily[1].weather[0].main);
        
            // const future = future_weather+', Low:'+conv_future_low+', High: '+conv_future_high;
            }
        }
    }

    const data1 = get_coordinates(url).catch(error=>{console.log('There was an error:',error.message, 'Try putting your location in quotes, ie node \'paris france\'' .red)});