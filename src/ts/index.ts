import '../sass/style.scss';
import WeatherData from './components/WeatherData';
import { conditions } from './components/Conditions';
import {fetchWeatherData} from './functions/FetchWeatherData';
import getFullCountryName from './functions/GetFullCountryName';
import UIManager from './classes/UIManager';

async function main() {
    const uiManager = new UIManager();
    // uiManager.initializeSplash();
    // let weatherData = await fetchWeatherData('berlin');
    // console.log(weatherData);
    // console.log(getFullCountryName(weatherData.countryName.toUpperCase()));
    // console.log(weatherData.weatherType);
    // console.log(conditions[weatherData.weatherType].codes[weatherData.weatherId]);
}

main();