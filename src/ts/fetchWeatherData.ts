export async function fetchWeatherData(request: any, units: string = 'imperial') {
    try {
        const response = await (await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${request.cityName}&limit=1&appid=${request.key}`)).json();
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&units=${units}&appid=${request.key}`)).json();
        return new WeatherData(data.name, Number.parseFloat((data.main.temp).toFixed(1)), data.weather[0].description, Number.parseFloat((data.wind.speed).toFixed(1)), data.main.humidity, units);
    }
    catch(error) {
        console.log(error);
    }
}

class WeatherData {
        cityName: string;
        temperature: number;
        weatherDescription: string;
        windSpeed: number;
        humidity: number;
        units: string;
    constructor(
        cityName: string,
        temperature: number,
        weatherDescription: string,
        windSpeed: number,
        humidity: number,
        units: string,
    ) {
        this.cityName = cityName;
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