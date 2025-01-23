<script lang="ts">
    import { page } from "$app/state";
    import { DarkMode } from "flowbite-svelte";
    import { TeddyBearSolid } from "flowbite-svelte-icons";
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 gap-20">
    <div class="text-start gap-4">
        <h1 class="text-4xl font-bold">{page.status}</h1>
        <p class="text-lg">{page.error?.message}</p>
    </div>
    <div>
        <TeddyBearSolid class="w-24 h-24 text-gray-500 dark:text-gray-400" />
    </div>
</div>