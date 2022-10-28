import { render } from 'preact'

const serverURL = `https://weatherly-backend.onrender.com`
async function queryWeather(data: string) {
    const requestURL = `${serverURL}/${data}`
    const response = await fetch((requestURL), {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain',
        },
    })
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
}

queryWeather('tacoma,washington')

render(
    <>
        <h1>Hello, world!</h1>
    </>, document.getElementById('app') as HTMLElement)
