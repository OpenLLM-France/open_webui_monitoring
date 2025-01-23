<script lang="ts">
    import AdminChart from "$lib/admin_cmpnts/AdminChart.svelte";
    import AdminTable from "$lib/admin_cmpnts/AdminTable.svelte";
    import { getStatus, getTimers } from "$lib/queue";
    import { getUsers } from "$lib/queue";
    import type { QueueStatus, UserRequest } from "$lib/types";
    import { Button } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { joinQueue } from "$lib/queue";

    let test_data = {
        name: "test",
        data: [1, 5, 3, 10],
        color: "#1C64F2",
    };

    let columns = [
        {
            label: "ID",
            key: "user_id",
        },
        {
            label: "Status",
            key: "status",
        },
        {
            label: "Position",
            key: "position",
        },
        {
            label: "Remaining time",
            key: "remaining_time",
        }
    ];
    
    let users: {
        active_users: QueueStatus[];
        draft_users: QueueStatus[];
        waiting_users: QueueStatus[];
    } = {
        active_users: [],
        draft_users: [],
        waiting_users: [],
    };
    
    async function fetchCurQueueStatus() {
        try {
            const { active_users, draft_users, waiting_users } = await getUsers();

            const fetchStatuses = async (userRequests: UserRequest[]) => 
                await Promise.all(userRequests.map(getStatus));

            users = {
                active_users: await fetchStatuses(active_users.map(user_id => ({ user_id }))),
                draft_users: await fetchStatuses(draft_users.map(user_id => ({ user_id }))),
                waiting_users: await fetchStatuses(waiting_users.map(user_id => ({ user_id }))),
            };

            console.log(users);
        } catch (error) {
            console.error("Error fetching queue status:", error);
        }
    }

    // TODO Find a cleaner way to refresh the queue status
    setInterval(fetchCurQueueStatus, 2000);

    onMount(() => {
        fetchCurQueueStatus();
    });

    /**
     * Generates a random user to join the queue.
     *
     * @returns A UserRequest object with the generated user's random user_id.
     */
     function generateRandomUser() {
        let new_user_request: UserRequest = {
            user_id: Math.random().toString(36).substring(2, 9),
        };
        return new_user_request;
    }

    /**
     * Adds a randomly generated user to the queue.
     */
    function handleAddSimulatedUserToQueue() {
        let user = generateRandomUser();
        console.log("Adding user to queue");
        joinQueue(user)
            .then((data) => {
                console.log(data);
                fetchCurQueueStatus();
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

</script>

<div class="w-full p-4 h-screen overflow-y-auto">
    <div class="grid grid-cols-3 gap-4 mb-4">
        <Button color="alternative" on:click={handleAddSimulatedUserToQueue}
            >Add simulated user</Button
        >
    </div>

    <!-- Unused charts -->
    <!-- <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="w-full">
            <AdminChart
                main_value="2"
                unit="test"
                chart_data={test_data}
                height="200px"
                show_graph={true}
            />
        </div>
        <AdminChart
            main_value="2"
            unit="test"
            chart_data={test_data}
            height="200px"
            show_graph={true}
        />
    </div> -->
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2">
            <AdminTable
                {columns}
                data={users.active_users}
                refresh={fetchCurQueueStatus}
            />
        </div>
        <div class="col-span-2">
            <AdminTable
                {columns}
                data={users.draft_users}
                refresh={fetchCurQueueStatus}
            />
        </div>
        <div class="col-span-2">
            <AdminTable
                {columns}
                data={users.waiting_users}
                refresh={fetchCurQueueStatus}
            />
        </div>
    </div>
</div>
