import sanitizeQuery from './SanitizeQuery';
import WeatherData from '../classes/WeatherData';

export default async function fetchWeather(
    query: string,
    units = 'imperial'
): Promise<WeatherData> {
    try {
        const sanitizedQuery: string = sanitizeQuery(query);
        if (!sanitizedQuery) throw new Error(`Query is undefined.`);
        const response = await fetch(
            `https://weatherlee.cyclic.app/?q=${query}&units=${units}`
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
            unitSystem
        );
    } catch (error) {
        throw new Error(error.message);
    }
}
