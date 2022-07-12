import '../sass/style.scss';
import {fetchWeatherData, WeatherData} from './fetchWeatherData';
import getFullCountryName from './getFullCountryName';

async function main() {
    let weatherData = await fetchWeatherData('berlin');
    console.log(getFullCountryName(weatherData.countryName.toUpperCase()));
}

main();