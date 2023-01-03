import WeatherInstance from "../components/WeatherInstance";

const key: string = '53eb90610b23be70589bc3e845c27b5a';

export async function fetchWeatherData(cityName: string, units: string = 'metric'): Promise<WeatherInstance> {
    try {
        const coordinatesResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`);
        const coordinates: any[] = await coordinatesResponse.json();
        const city: any = coordinates[0];
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=${units}&appid=${key}`);
        const weather = await weatherResponse.json();
        return new WeatherInstance(
            city.name.toLowerCase(),
            city.state.toLowerCase(),
            city.country.toLowerCase(),
            Number.parseFloat((weather.main.temp).toFixed(1)),
            weather.weather[0].main.toLowerCase(),
            weather.weather[0].id,
            Number.parseFloat((weather.wind.speed).toFixed(1)),
            weather.main.humidity,
            units);
    }
    catch(error) {
        console.log(error);
    }
}