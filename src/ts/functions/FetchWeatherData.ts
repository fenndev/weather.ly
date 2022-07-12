import WeatherData from "../components/WeatherData";
const key: string = '53eb90610b23be70589bc3e845c27b5a';
export async function fetchWeatherData(cityName: string, units: string = 'metric') {
    try {
        const response = await (await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`)).json();
        let cityInfo = response[0];
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=${units}&appid=${key}`)).json();
        console.log(data);
        return new WeatherData(cityInfo.name.toLowerCase(), cityInfo.state.toLowerCase(), cityInfo.country.toLowerCase(), Number.parseFloat((data.main.temp).toFixed(1)), data.weather[0].main.toLowerCase(), data.weather[0].id, Number.parseFloat((data.wind.speed).toFixed(1)), data.main.humidity, units);
    }
    catch(error) {
        console.log(error);
    }
}