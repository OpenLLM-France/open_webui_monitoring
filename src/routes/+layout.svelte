<script lang="ts">
	import '../app.css';
    import AdminNotification from '$lib/admin_cmpnts/AdminNotification.svelte';
    import { notificationStore } from '../stores/notificationStore';

	let { children } = $props();
</script>

<main>
    <AdminNotification message={$notificationStore.message} type={$notificationStore.type} show={$notificationStore.show}/>
</main>

{@render children()}
