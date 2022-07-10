import '../style.scss';
import {fetchWeatherData, queryLocation} from './fetchWeatherData';
import Request from './request';

async function main() {
    queryLocation('berlin');
}

main();