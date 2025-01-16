<script lang="ts">
    import { Card } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    export let show = false;
    export let message;
    export let type = "info";

    let notif_color: "blue" | "green" | "yellow" | "red" = "blue";

    $: {
        if (type == "info") {
            notif_color = "blue" as const;
        } else if (type == "success") {
            notif_color = "green" as const;
        } else if (type == "warning") {
            notif_color = "yellow" as const;
        } else if (type == "error") {
            notif_color = "red" as const;
        }
    }

    if (!message) {
        show = false;
    }
</script>

<style>
    .toast-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

{#if show}
    <div class="fixed bottom-4 right-4 toast-container z-50">
        <div in:fly={{ y: 100, duration: 500 }} out:fly={{ y: 100, duration: 500 }}>
            <Card class="w-max-none" color={notif_color}>{message}</Card>
        </div>
    </div>
{/if}
