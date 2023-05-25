import sanitizeQuery from './SanitizeQuery';
import WeatherData from '../classes/WeatherData';

export default async function fetchWeather(
    query: string,
    units = 'imperial'
): Promise<WeatherData> {
    try {
        const sanitizedQuery: string = sanitizeQuery(query);
        console.log(`Sanitized Query: ${sanitizedQuery}`);
        if (!sanitizedQuery) throw new Error(`Query is undefined.`);
        const response = await fetch(
            `https://weatherlee.cyclic.app/?q=${sanitizedQuery}&units=${units}`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'text/html',
                },
            }
        );
        if (response.status != 200) {
            const responseInfo: string = await response.text();
            throw new Error(responseInfo);
        }
        const parsedResponse = await response.json();
        const {
            cityName,
            stateName,
            countryName,
            temperature,
            weatherType,
            weatherID,
            windSpeed,
            humidity,
            pressure,
            unitSystem,
        } = parsedResponse;
        return new WeatherData(
            cityName,
            stateName,
            countryName,
            temperature,
            weatherType,
            weatherID,
            windSpeed,
            humidity,
            pressure,
            unitSystem
        );
    } catch (error) {
        console.log(`FetchWeather Script Error: ${error.message}`);
        throw new Error(error.message);
    }
}
