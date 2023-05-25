<script lang="ts">
    import { weather } from './classes/Store.js';
    import Header from './svelte/Header.svelte';
    import Card from './svelte/Card.svelte';
    import Footer from './svelte/Footer.svelte';
    import '../global.css';
</script>

<div style="min-height: 100svh;" class="grid grid-cols-12">
    <Header />
    {#if $weather}
        <Card />
    {/if}
    <Footer />
</div>
