<script lang="ts">
    import { date, time } from '../classes/Store';
    import { weather } from '../classes/Store';
    import cloud from '../../assets/cloud.svg';
    import rain from '../../assets/rain.svg';
    import snow from '../../assets/snow.svg';
    import storm from '../../assets/storm.svg';
    import sun from '../../assets/sun.svg';
</script>

<main>
    <header class="info">
        <section class="info__datetime">
            <p>{$date}</p>
            <p>{$time}</p>
        </section>
        <section class="info__location">
            <p>{$weather.cityName}</p>
            <p>{$weather.countryName}</p>
        </section>
    </header>
    <section class="conditions">
        <div class="conditions__main">
            {#if $weather.weatherType === 'drizzle' || $weather.weatherType === 'rain'}
                <img src={rain} alt="Rain" />
            {:else if $weather.weatherType === 'clear'}
                <img src={sun} alt="Sun" />
            {:else if $weather.weatherType === 'clouds'}
                <img src={cloud} alt="Cloud" />
            {:else if $weather.weatherType === 'snow'}
                <img src={snow} alt="Snow" />
            {:else if $weather.weatherType === 'thunderstorm'}
                <img src={storm} alt="Storm" />
            {:else}
                <p>No SVG available for the current weather condition.</p>
            {/if}
            <div class="conditions__desc">
                <p>{$weather.temperature}{$weather.temperatureUnits}</p>
                <p>{$weather.weatherType}</p>
            </div>
        </div>
        <div class="conditions__secondary">
            <div class="conditions__box">
                <p>Humidity</p>
                <p>{$weather.humidity}%</p>
            </div>
            <div class="conditions__box">
                <p>Wind Speed</p>
                <p>{$weather.windSpeed}{$weather.windSpeedUnits}</p>
            </div>
            <div class="conditions__box">
                <p>Pressure</p>
                <p>{$weather.pressure}hPa</p>
            </div>
        </div>
    </section>
    <footer class="conditions__buttons">
        <button>Imperial</button>
        <button>Metric</button>
    </footer>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1 1 auto;
        padding: 5rem;
        border: 1px solid black;
        border-radius: 5rem;
    }

    .info {
        display: flex;
        justify-content: space-between;
        flex: 1 1 auto;
    }

    .info__location {
        text-align: end;
    }

    .conditions {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        flex: 1 1 auto;
    }

    .conditions__main {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }

    .conditions__secondary {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        gap: 10rem;
        flex-wrap: wrap;
    }

    .conditions__buttons {
        display: flex;
        justify-content: space-evenly;
        align-items: end;
        flex: 1 1 auto;
    }

    .conditions__buttons button {
        width: 10rem;
        height: 3rem;
        border: 1px solid black;
        outline: none;
        background-color: white;
        border-radius: 15rem;
        cursor: pointer;
    }

    @media only screen and (max-width: 1024px) {
        .conditions__buttons {
            flex-direction: column;
            align-items: center;
        }

        .conditions__main {
            flex-wrap: wrap;
        }
    }
</style>
