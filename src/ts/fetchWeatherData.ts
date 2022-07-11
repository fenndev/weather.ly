    const key: string = '53eb90610b23be70589bc3e845c27b5a';
    
    export async function fetchWeatherData(cityName: string, units: string = 'metric') {
    try {
        const response = await (await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`)).json();
        let cityInfo = response[0];
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=${units}&appid=${key}`)).json();
        return new WeatherData(cityInfo.name.toLowerCase(), cityInfo.state.toLowerCase(), cityInfo.country.toLowerCase(), Number.parseFloat((data.main.temp).toFixed(1)), data.weather[0].description, Number.parseFloat((data.wind.speed).toFixed(1)), data.main.humidity, units);
    }
    catch(error) {
        console.log(error);
    }
}

class City {
    cityName: string;
    stateName: string;
    countryName: string;
    lat: number;
    lon: number;

    constructor(cityName: string, stateName: string, countryName: string, lat: number, lon: number) {
        this.cityName = cityName;
        this.stateName = stateName;
        this.countryName = countryName;
        this.lat = lat;
        this.lon = lon;
    }
}

class WeatherData {
        cityName: string;
        stateName: string;
        countryName: string;
        temperature: number;
        weatherDescription: string;
        windSpeed: number;
        humidity: number;
        units: string;
    constructor(
        cityName: string,
        stateName: string,
        countryName: string,
        temperature: number,
        weatherDescription: string,
        windSpeed: number,
        humidity: number,
        units: string,
    ) {
        this.cityName = cityName;
        if(stateName != cityName)
            this.stateName = stateName;
        this.countryName = countryName;
        this.temperature = temperature;
        this.weatherDescription = weatherDescription;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.units = units;
    }

    public convertUnits() {
        if (this.units === 'imperial') {
            this.temperature = Number.parseFloat(((this.temperature - 32) * (5 / 9)).toFixed(1));
            this.windSpeed = Number.parseFloat((this.windSpeed * 1.609).toFixed(1));
            this.units = 'metric';
        }
        else {
            this.temperature = Number.parseFloat((this.temperature * (9 / 5) + 32).toFixed(1));
            this.windSpeed = Number.parseFloat((this.windSpeed / 1.609).toFixed(1));
            this.units = 'imperial';
        }
    }

};