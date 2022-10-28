const serverURL = `https://weatherly-backend.onrender.com`;
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
    return jsonResponse;
}

export default queryWeather;