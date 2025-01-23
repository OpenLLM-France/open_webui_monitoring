<script>
    import AdminTimeline from "$lib/admin_cmpnts/AdminTimeline.svelte";
    import AdminChart from "$lib/admin_cmpnts/AdminChart.svelte";
    import { getMetrics } from "$lib/queue";
    import { onMount } from "svelte";

    let active = 0;
    let draft = 0;
    let waiting = 0;

    let test_data = {
        name: "Users",
        data: [1, 5, 3, 10],
        color: "#1C64F2",
    };

    function updateMetrics() {
        getMetrics().then((data) => {
            active = data.active_users;
            draft = data.draft_users;
            waiting = data.waiting_users;
            console.log(data)
        });
        console.log(active, draft, waiting);
    }

    onMount(() => {
        updateMetrics();
    });

    setInterval(() => {
        updateMetrics();
    }, 5000);

    
</script>

<div class="w-full p-4 h-screen overflow-y-auto">
    <AdminTimeline />
    <!-- TODO review the way the main value is fetched -->
    <div class="grid grid-cols-3 gap-4">
    <AdminChart
        main_value="{active}"
        unit="Users speaking to Lucie"
        height="200px"
        chart_data={test_data}
        show_graph={false}
    />
    <AdminChart
        main_value="{draft}"
        unit="Users in draft Queue"
        height="200px"
        chart_data={test_data}
        show_graph={false}
    />
    <AdminChart
        main_value="{waiting}"
        unit="Users waiting"
        height="200px"
        chart_data={test_data}
        show_graph={false}
    />
    </div>

    
</div>
