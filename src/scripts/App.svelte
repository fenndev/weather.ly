<script lang="ts">
    import { weather } from './classes/Store.js';
    import Header from './svelte/Header.svelte';
    import Card from './svelte/Card.svelte';
    import Footer from './svelte/Footer.svelte';
    import '../global.css';
</script>

<div class="container">
    <Header />
    {#if $weather}
        <Card />
    {/if}
    <Footer />
</div>

<style>
    .container {
        height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2vh 20%;
        gap: 10svh;
    }
</style>
