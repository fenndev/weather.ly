<script lang="ts">
    import { date, time } from '../../classes/Store';
    import { weather } from '../../classes/Store';
</script>

<header>
    <section>
        <p>{$date}</p>
        <p>{$time}</p>
    </section>
    <section>
        <p>{$weather.cityName}</p>
        <p>{$weather.countryName}</p>
    </section>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
