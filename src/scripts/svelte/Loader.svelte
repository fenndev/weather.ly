<script>
    import { isLoading } from '../classes/Store';
</script>

{#if $isLoading == true}
    <div class="loader">
        <svg width="50" height="50" viewBox="0 0 50 50">
            <square cx="25" cy="25" r="20" fill="none" stroke-width="4" />
        </svg>
    </div>
{/if}

<style>
    .loader {
        position: fixed;
        left: 0;
        top: 0;
        height: 100svh;
        width: 100svw;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loader svg {
        animation: rotate 2s linear infinite;
        border: 4px solid rebeccapurple;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
