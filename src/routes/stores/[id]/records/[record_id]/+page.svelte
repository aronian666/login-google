<script>
    import { onMount } from "svelte";
    import { Record } from "../../../../../lib/tables";
    export let data;
    let record = new Record(data.record);
    const getInput = (record) => {
        if (record.type === "Yape") {
            return [];
        }
        if (record.type_id === 1) {
            return [
                [
                    { name: "A", value: record.code },
                    { name: "Nombre", value: record.client },
                ],
                [
                    { name: "Importe", value: record.value.toFixed(2) },
                    {
                        name: "Total",
                        value: record.value.toFixed(2),
                    },
                ],
            ];
        }

        if (record.type_id === 2) {
            return [
                [
                    { name: "A", value: record.code },
                    { name: "Nombre", value: record.client },
                ],
                [
                    { name: "Importe", value: record.value.toFixed(2) },
                    {
                        name: "Comision",
                        value: record.commission.toFixed(2),
                    },
                    {
                        name: "Total",
                        value: (record.value + record.commission).toFixed(2),
                    },
                ],
            ];
        }
        return [
            [
                { name: "Empresa", value: record.business },
                { name: "Codigo", value: record.code },
                { name: "Nombre", value: record.client },
                { name: "Servicio", value: record.service },
            ],
            [
                {
                    name: "Importe Pago",
                    value: record.value.toFixed(2),
                },
                { name: "Cargo fijo", value: record.fixed.toFixed(2) },
                { name: "Mora", value: record.blackberry.toFixed(2) },
                {
                    name: "Total deuda",
                    value: (record.value + record.fixed).toFixed(2),
                },
                {
                    name: "Comision",
                    value: record.commission.toFixed(2),
                },
                {
                    name: "Total a pagar",
                    value: (
                        record.value +
                        record.fixed +
                        record.commission
                    ).toFixed(2),
                },
            ],
        ];
    };
    const inputs = getInput(record);
    onMount(() => {
        window.print();
        record.print = true;
        record.save();
    });
</script>

{#if record.type !== "Yape"}
    <div id="print">
        <h1 class="text-center">{record.store.name}</h1>
        <div class="grid" style="gap: 1rem">
            <div>
                <p>
                    Fecha {record.date.toLocaleDateString()} Hora {record.date.toLocaleTimeString()}
                </p>
                <p>NO. OPE {record.operation}</p>
            </div>
            <p class="text-center">{record.type}</p>

            <section>
                {#each inputs[0] as { name, value }}
                    <span> {name} </span>
                    <span>{value}</span>
                {/each}
            </section>
            <section class="grid">
                {#each inputs[1] as { name, value }}
                    <span>{name}</span>
                    <span class="flex content" style="--c: space-between"
                        ><span>S/</span>{value}</span
                    >
                {/each}
            </section>
        </div>
    </div>

    <button
        on:click={(e) => {
            record.update({ print: true });
            window.print();
        }}>Imprimir</button
    >
{:else}
    Este es un baucher yape, no se hacen impresiones
{/if}

<style>
    #print * {
        font-family: "Roboto Mono";
    }
    div {
        width: 300px;
        background-color: white;
    }
    section:first-of-type {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
    section:last-child {
        grid-template-columns: 1fr 1fr;
    }
</style>
