export default async function fetchWeatherData(request: any) {
    try {
        const response = await (await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${request.cityName}&limit=1&appid=${request.key}`)).json();
        return await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${request.key}`)).json();
    }
    catch(error) {
        console.log(error);
    }
}