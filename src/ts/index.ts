import '../sass/style.scss';
import WeatherData from './WeatherData';
import {fetchWeatherData} from './FetchWeatherData';
import getFullCountryName from './GetFullCountryName';

async function main() {
    let weatherData = await fetchWeatherData('berlin');
    console.log(getFullCountryName(weatherData.countryName.toUpperCase()));
}

main();