import '../style.scss';
import {fetchWeatherData, queryLocation} from './fetchWeatherData';
import Request from './request';

async function main() {
    console.log(await fetchWeatherData('berlin'));
}

main();