**Your Favorite Weather CLI**

- A simple CLI tool that will return current weather information and a brief forecast.
  

![Screenshot](screenshot2.png)

**Quick Overview**

- Once set up, typing ```node app {location_of_your_choice}``` will return the information you requested.
    - Sample command: ```node app berlin```
    - Sample console display: ``` Current Weather for Berlin, Temperature: 82 F/27.8 C, Humidity: 74%```
    - **Nota bene:** If there are multiple locations with similar names, type either the zip code or your location in quotes to get more exact weather data (ie. ```node app 'paris tennessee'``` to avoid confusion with Paris, France.)

![Screenshot](screenshot3.png)

**Set Up Instructions**
- Install the latest version of Node JS.
- Download the project code to your local machine by using the command 
  ```git clone https://github.com/cassiel257/Weather-CLI.git``` (or clicking the green "Code" button on Github and downloading a zip file).
- Navigate to the project folder using the command line.
- Type in the command ```npm install``` to install any additional dependencies.
- You will need to sign up with the free Mapbox API to receive an API key: (https://account.mapbox.com/). This is usually sent to your email shortly after signing up.
- Save the mapbox key in an .env file using the variable name ```MAPBOX_API_KEY```. Remember not to push your .env file back to your Github account. Make sure that it is listed in the .gitignore folder.
- You should now be able to type in a command like ```node app milan``` and see the weather information printed out for you in the console.

**Questions/Comments**
- Please reach out with any questions, concerns, or suggestions.

***Sunrise/Sunset information courtesy of https://api.sunrise-sunset.org***
***Weather data courtesy of Open-Meteo: https://open-meteo.com/***
