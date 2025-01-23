<script lang="ts">
    import {
        Chart,
        Card,
        A,
        Button,
        Dropdown,
        DropdownItem,
    } from "flowbite-svelte"; 

    export let main_value;
    export let unit;
    export let chart_data = undefined;
    export let height = "200px";
    export let show_graph;

    if (chart_data === undefined) {
        show_graph = false;
    }

    let options = {
        chart: {
            height: height,
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 6,
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: 0,
            },
        },
        series: [chart_data],
        xaxis: {
            
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
    };

    if (!show_graph) {
        options.chart.height = "0px";
    }
</script>

<!-- TODO Could end up throwing an error if chart_data is undefined -->
{#if (chart_data !== undefined && chart_data !== null) || main_value !== undefined}
<div class="test">
    <Card class="max-w-none">
        <div class="flex justify-between">
            <div>
                <h5
                    class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2"
                >
                    {main_value}
                </h5>
                <p
                    class="text-base font-normal text-gray-500 dark:text-gray-400"
                >
                    {unit}
                </p>
            </div>
        </div>
        <Chart {options} />
    </Card>
</div>
{/if}
