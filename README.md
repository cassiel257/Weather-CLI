# Chingu Voyage Pre-Work Solo Project (Tier 2): *Weather CLI*

## Overview

This project is a great way to practice using JavaScript outside of the browser, utlizing the Node.js runtime.
You will create a package that will take in a argument through the commnad line, and return a summary of the weather
for the region defined in the argument.

*Example*
```
$ node app.js bucharest
Current temperature in București, Bucureşti, Romania is 0.23C / 32.41F.
Conditions are currently: Mostly Cloudy.
What you should expect: Partly cloudy throughout the day.
$
```

You'll get comfortable with importing and exporting functions, using npm modules, initiating and consuming APIs on
the server side, and hopefuly even more as you explore Node.js. If you already have a lot of experience with Node.js, this will be a great opportunity to show it off and to bring your project to an even higher level by tackling the optional features, or by moving on to
the Tier 3 project and its options.

## Instructions & Considerations

This project was designed with Node.js in mind. That being said, if you would like to use a different server-side tool,
please feel free to do so (python, php, etc.). There are **many** ways to complete this project. Here's what to take into
consideration as you plan:

- [ ] You need to make two different api calls. Take a look at the [https module](https://nodejs.org/dist/latest-v12.x/docs/api/https.html) that is built into node. Another great resource is the [request npm package](https://www.npmjs.com/package/request).
- [ ] Great apis to use are [Dark Sky](https://darksky.net/dev) for actual weather information, and the [geocoding section of
the Mapbox api](https://docs.mapbox.com/api/search/#forward-geocoding) for obtaining coordinates. You will need to obtain a *free* API Key for each service.
- [ ] Remember, API keys are private. Keep them private. Place them in an `.env` file and use them via `process.env`. Here is a 
[*great* article by John Papa](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786) if you need help!
- [ ] You need to parse your argument out of the command line. Here's some information about [process.argv](https://nodejs.org/docs/latest/api/process.html#process_process_argv) to help. There are parsing packages you can download (and you can write your own to use
in Tier 3), but you do NOT need to go through all of that for this project.

**Requirements**

The following are required to finish the project.

- [ ] A user should be able to type in `node app.js bucharest` and have the current weather printed to the console.
- [ ] Weather needs to include location, the temperature (F and C), current conditions, and future conditions.
- [ ] Make sure that you handle errors! Account for an API not responding, etc.
- [ ] Your API Keys should NOT be on GitHub, put them in an `.env` file. 
- [ ] Your project files should all be in a GitHub repository with clear instructions on how to set up a local environment.
- [ ] Make sure that your `.env` and `node_modules` are in your `.gitignore` instead of on GitHub.
- [ ] You must have a robust README.md file. 
- [ ] You must submit an image of your command line with the command and the resulting console.log

**Extras**

The following are optional ways to expand on the project should you desire to do so.

- [ ] Print the summary to a file, then list the file location on the console.
- [ ] Use some color in the console.log to help make it more visually appealing.
- [ ] Accept a second argument that determines if the user revieces the temperature in C or F.

**Referrence**

Please reach out on Discord if you have ANY questions at all. We are more than happy to help. In addition,
general instructions for all Pre-Work Projects can also be found in the Chingu Voyage Handbook 
(URL posted in the #read-me-first channel on Discord).