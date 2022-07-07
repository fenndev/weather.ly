import '../style.scss';
import fetchWeatherData from './fetchWeatherData';
import Request from './request';

// Instantiate a new Request object

async function main() {
    const request = new Request('53eb90610b23be70589bc3e845c27b5a', true, 'London');
    const weatherData = await fetchWeatherData(request);
    console.log(weatherData);
}

main();