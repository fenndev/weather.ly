# weather.ly

## Introduction

weather.ly is a web application with a simple, responsive UI, designed for fetching and displaying real-time weather information, providing users with data on the current temperature, weather conditions, humidity, wind speed, and atmospheric pressure of a given location.

This is the front-end of the website, built using Svelte, Vite, Typescript, and TailwindCSS and making use of the OpenWeatherMaps API. weather.ly heavily depends on a custom [backend](https://github.com/fenndev/weather.ly-backend) written in Typescript with Express.

## Local Development 

To host the website on your local machine:

1. Clone the repository to your local machine.

2. Navigate into the cloned repository:

```
cd weather.ly
```

3. Install the project dependencies with NPM:

```
npm install
```

4. Run the local development server:

```
npm run dev
```

## Building for Production

Building a production version of the website is as simple as running the build command:

```
npm run build
```

After running the build command, you will have a `dist` folder in your project root which you can deploy to any static file hosting service.

**Please Note:** weather.ly depends on a custom [backend](https://github.com/fenndev/weather.ly-backend) and the URL for the API call is hard-coded into the `fetchWeather.ts` file. If you intend to locally run or host this project, you will need to either clone and host your own version of the backend or provide an alternative that matches the following expected data format:

```
cityName: string;
stateName: string | undefined;
countryName: string;
temperature: number;
weatherType: string;
weatherID: number;
windSpeed: number;
humidity: number;
pressure: number;
unitSystem: string;
temperatureUnits: string;
windSpeedUnits: string;
```


## Limitations

While this repo handles the basics of fetching real-time weather information, there are a few limitations to be aware of:

- You cannot search for weather by zip code, only by city name.

- The website currently does not support forecasts or historical weather data, and only displays current conditions.

- The time displayed on the website may be slightly out of sync due to the method used for time fetching and display.


## License

This repository, as well as the custom [backend](https://github.com/fenndev/weather.ly-backend), are licensed under the GNU General Public License v3.0.