<script>
    import { Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    export let show;
    export let handleClick;
</script>

<style>
    .toast-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

{#if show}
    <div class="fixed bottom-4 left-0 w-full toast-container">
        <div in:fly={{ y: 100, duration: 500 }} out:fly={{ y: 100, duration: 500 }}>
            <Button color="green" on:click={handleClick}>Save Changes?</Button>
        </div>
    </div>
{/if}
