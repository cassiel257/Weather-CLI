//Add async geolocation code for openmeteo, as Mapbox does not handle zip/postal codes reliably, either/or. Maybe ternary variable assignment
var colors = require('colors');
const http = require('http');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config()

let entry = process.argv[2];
no_entry=false

if (!entry){
    no_entry=true
    //console.log("You didn't give a location.For a weather forecast,please enter a postal code or location name with quotes,like node 90210 or node app \'paris tennessee\'.")
    
}
const mapbox_key = process.env.MAPBOX_API_KEY;

let zip_status=false

const zip_url=`https://geocoding-api.open-meteo.com/v1/search?name=${entry}&count=10&language=en&format=json`
const mapbox_url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${entry}.json?access_token=${mapbox_key}`;



if (isNaN(Number(entry)) == false){
    zip_status=true
    
}

const url= zip_status?zip_url:mapbox_url



var greeting = "Welcome to Your Weather CLI!";

console.log("\n ");


var latitude='';
var longitude='';
var place='';

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




async function get_coordinates(link1){
    if (!entry){
        return("You didn't type a location.For a weather forecast,please enter <node app> (without brackets) and a postal code or location name with quotes.\nExamples: node app 90210, node app \'paris tennessee\'.\n")
        
    }
    const response1 = await fetch(link1);
    if (response1.status >= 200 && response1.status < 400){
        const coordinateData = await response1.json();
        const lat = zip_status?JSON.stringify(coordinateData['results'][0]['latitude']):JSON.stringify(coordinateData['features'][0].center[1]);

        const lon = zip_status?JSON.stringify(coordinateData['results'][0]['longitude']):JSON.stringify(coordinateData['features'][0].center[0]);


        const place = zip_status?JSON.stringify(coordinateData['results'][0]['name']):JSON.stringify(coordinateData['features'][0].place_name);

        const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`);
        
        
        if (response2.status >= 200 && response2.status < 400){
            
            const weatherData = await response2.json();
            const timezone=(weatherData.timezone)
            const temperature = weatherData['current']['temperature_2m'];
            
            const conv_temps = get_temperatures(temperature);
           
            const low=(weatherData.daily.temperature_2m_min[0]);
            const conv_min= get_temperatures(low);
           
            const high=(weatherData.daily.temperature_2m_max[0]);
            const conv_max= get_temperatures(high);
            

            const humidity = JSON.stringify(weatherData.current.relative_humidity_2m);
            
        
            const description = JSON.stringify(codes[(weatherData['current']['weather_code'])]);
            

            const future_low = weatherData.daily.temperature_2m_min[1];
            const conv_future_low = get_temperatures(future_low);
            const future_high = weatherData.daily.temperature_2m_max[1];
            const conv_future_high = get_temperatures(future_high);

            const future_weather = JSON.stringify(codes[weatherData.daily.weather_code[1]]);
        
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
                console.log('Current conditions:'.magenta+ description);
                console.log('The lowest temperature for today will be: '.cyan, conv_min);
                console.log('The highest temperature for today will be: '.red, conv_max);
                console.log("First Light: ".grey, firstLight);
                console.log("Sunrise: ".yellow, sunrise);
                console.log("Sunset: ".cyan, sunset);
                console.log("Last Light: ".grey, lastLight);
                console.log('Tomorrow you can expect:'.magenta,future,"\n");}
                else{
                    console.log('There was an error: ',response3.status,response3.statusText+"Sunrise data not found".grey);
                }
        } else {
            console.log('There was an error:',response2.status, response2.statusText+' There was a problem getting the weather for this location. Try entering the zip code or putting your full location in quotes, ie \'paris france\''.blue);
        }
    } else {
        console.log('There was an error:',response1.status, response1.statusText+' There was a problem getting coordinates for this location. Try entering the zip code or putting your full location in quotes, ie \'paris france\''.yellow);
    }

};

const data1 = get_coordinates(url).catch(error=>{console.log('There was an error:',error.message, 'Try entering the zip code or putting your location in quotes, ie node \'paris france\'' .red)});

if (!entry){
    console.log("You didn't give a location.For a weather forecast,please enter a postal code or location name with quotes,like node 90210 or node app \'paris tennessee\'.")
    
}