import { Component } from 'preact';
import queryWeather from '../scripts/query-weather';

class Weather extends Component<{}, { dateTime: string, city: string, state: string | null, country: string, category: string, description: string, temperature: string, windSpeed: string, windDirection: string, humidity: string, pressure: string, sunrise: string, sunset: string, units: string }> {
    constructor() {
        super();

        this.state = {
            dateTime: '',
            city: '',
            state: null,
            country: '',
            category: '',
            description: '',
            temperature: '',
            humidity: '',
            pressure: '',
            windSpeed: '',
            windDirection: '',
            sunrise: '',
            sunset: '',
            units: ''
        };
    };

    componentDidMount() {
        queryWeather('tacoma,washington').then((weatherData: any) => {
            this.setState({
                dateTime: weatherData.dateTime,
                city: weatherData.city,
                state: weatherData.state,
                country: weatherData.country,
                category: weatherData.category,
                description: weatherData.description,
                temperature: weatherData.temperature,
                humidity: weatherData.humidity,
                pressure: weatherData.pressure,
                windSpeed: weatherData.windSpeed,
                windDirection: weatherData.windDirection,
                sunrise: weatherData.sunrise,
                sunset: weatherData.sunset,
                units: weatherData.units
            });
        }).catch((error: any) => {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="flex flex-col items-center justify-center">
                <p>{this.state.dateTime}</p>
                <p>{this.state.city}</p>
                <p>{this.state.state}</p>
                <p>{this.state.country}</p>
                <p>{this.state.category}</p>
                <p>{this.state.description}</p>
                <p>{this.state.temperature}</p>
                <p>{this.state.humidity}</p>
                <p>{this.state.pressure}</p>
                <p>{this.state.windSpeed}</p>
                <p>{this.state.windDirection}</p>
                <p>{this.state.sunrise}</p>
                <p>{this.state.sunset}</p>
                <p>{this.state.units}</p>
            </div>
        );
    }
}

export default Weather;