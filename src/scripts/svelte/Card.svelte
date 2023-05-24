<script lang="ts">
    import { date, time } from '../classes/Store';
    import { weather } from '../classes/Store';
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
            <p>{$weather.temperature}{$weather.temperatureUnits}</p>
            <p>{$weather.weatherType}</p>
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
            <!-- Not Implemented Yet -->
            <div class="conditions__box">
                <p>Pressure</p>
                <p>{$weather.pressure}hPa</p>
            </div>
        </div>
        <div class="conditions__buttons">
            <button>Imperial</button>
            <button>Metric</button>
        </div>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        flex: 1 1 auto;
        padding: 5rem;
    }

    .info {
        display: flex;
        justify-content: space-between;
    }

    .conditions {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        flex: 1 0 auto;
    }

    .conditions__secondary {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 50%;
        text-align: center;
    }

    .conditions__buttons {
        display: flex;
        width: 50%;
        justify-content: space-evenly;
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
            justify-content: space-between;
            gap: 2rem;
        }
    }
</style>
