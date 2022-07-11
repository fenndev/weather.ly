import '../style.scss';
import {fetchWeatherData} from './fetchWeatherData';

async function main() {
    console.log(await fetchWeatherData('berlin'));
}

main();