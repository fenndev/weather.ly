import '../sass/style.scss';
import WeatherData from './components/WeatherData';
import { conditions } from './components/Conditions';
import {fetchWeatherData} from './functions/FetchWeatherData';
import getFullCountryName from './functions/GetFullCountryName';

async function main() {
    let weatherData = await fetchWeatherData('berlin');
    console.log(weatherData);
    console.log(getFullCountryName(weatherData.countryName.toUpperCase()));
    console.log(weatherData.weatherType);
    console.log(conditions[weatherData.weatherType].codes[weatherData.weatherId]);
}

main();