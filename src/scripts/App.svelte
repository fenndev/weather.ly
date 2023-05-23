<script lang="ts">
    import { weather } from './classes/Store.js';
    import Header from './svelte/Header.svelte';
    import Card from './svelte/Card.svelte';
    import '../global.css';
</script>

<Header />
{#if $weather}
    <Card />
{/if}
