# weather.ly

A weather application built with HTML, CSS, and Javascript.

## Project

### Fetch Weather Data

In order to properly fetch the weather data, we need to make use two separate APIs from OpenWeatherMap: **Current Weather Data** and **Geolocation**.

#### Current Weather Data

The API call for the Current Weather Data looks like:
`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`.

The API used to have a reverse geolocation functionality, where you could instead search by a city name, but this has been depreciated and ported to a separate Geolocation API. Thus, in order to properly allow a user to query a location name and receive the appropriate response back, we need to make use of two separate APIs.

The Current Weather Data API response follows this format:

```{
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  }
```

For the purposes of this application, we are interested in the following information:

-   `response.weather.description`, which offers a brief description of the weather conditions
-   `response.main.temp`, which gives us the current temperature (by default in Kelvin)
-   `response.main.pressure`, which returns the atmospheric pressure in hPa
-   `response.wind.speed`, giving us the wind speed by default in meters/sec.
-   `response.wind.deg`, the direction the wind is blowing
-   `response.dt`, the time of data calculation (Unix UTC)
-   `response.sys.country`, the country code
-   `response.timezone`, the timezone of the country
-   `response.name`, the name of the country

#### Geocoding API

We are going to be making use of the Geocoding API's 'direction geocoding' functionality. The API call looks like:
`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`.

`q` is required, and at minimum must contain a string with the name of the city. Optionally, a state code or country code can also be supplied. The limit parameter is optional, and without supplying it, will only return the top result.

An example of the API response:

```
[
  {
    "name": "London",
    "local_names": {
      "af": "Londen",
      "ar": "لندن",
      "ascii": "London",
      "az": "London",
      "bg": "Лондон",
      "ca": "Londres",
      "da": "London",
      "de": "London",
      "el": "Λονδίνο",
      "en": "London",
      "eu": "Londres",
      "fa": "لندن",
      "feature_name": "London",
      "fi": "Lontoo",
      "fr": "Londres",
      "gl": "Londres",
      "he": "לונדון",
      "hi": "लंदन",
      "hr": "London",
      "hu": "London",
      "id": "London",
      "it": "Londra",
      "ja": "ロンドン",
      "la": "Londinium",
      "lt": "Londonas",
      "mk": "Лондон",
      "nl": "Londen",
      "no": "London",
      "pl": "Londyn",
      "pt": "Londres",
      "ro": "Londra",
      "ru": "Лондон",
      "sk": "Londýn",
      "sl": "London",
      "sr": "Лондон",
      "th": "ลอนดอน",
      "tr": "Londra",
      "vi": "Luân Đôn",
      "zu": "ILondon"
    },
    "lat": 51.5085,
    "lon": -0.1257,
    "country": "GB"
  }
]
```

For the most simple functionality possible, the only pieces of information we would be interested in are the following:

-   `response.lat`, latitude of the city
-   `response.lon`, longitude of the city

Both of these values would then be passed into a separate API call to fetch the weather data.

### Plan

In order for this to be a well-designed application, we need to make use of the following:

-   A `fetch` request to query the Geocoding API using the name of the city provided by the user
-   A `fetch` request to query the Current Weather Data API using the latitude and longitude provided by the Geocoding API
-   A class to store the weather data
-   Functions to render the weather data to the screen

### Future Plans

The following are 'nice-to-haves' that would improve the overall aesthetic and functionality of the application, but aren't strictly necessary:

-   Add a button to capture the current location of the user
-   Auto-suggest the user with a list of cities based on their input as they type
-   Allow data persistence between sessions
-   Multiple city support
