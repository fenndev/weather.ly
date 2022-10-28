import { render } from 'preact';
import queryWeather from './scripts/query-weather';

queryWeather('tacoma,washington')

render(
    <>
        <h1>Hello, world!</h1>
    </>, document.getElementById('app') as HTMLElement)
