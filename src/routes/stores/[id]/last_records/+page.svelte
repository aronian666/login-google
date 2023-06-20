<script>
    import { Table, Modal } from "../../../../lib/components";
    import { goto, invalidateAll } from "$app/navigation";
    import { Record, Store, Report } from "../../../../lib/tables";
    import { loading } from "$lib/stores";
    import AddRecord from "./AddRecord.svelte";
    export let data;
    const store = new Store(data.store);
    const summary = [
        {
            title: "Total gastado",
            value: Record.getDown(data.records).toFixed(2),
            icon: "fluent-mdl2:down",
            color: "tomato",
            pre: "S/",
        },
        {
            title: "Total recargado",
            value: Record.getUp(data.records).toFixed(2),
            icon: "fluent-mdl2:up",
            color: "green",
            pre: "S/",
        },
        {
            title: "Total ganado",
            value: Record.getWin(data.records).toFixed(2),
            icon: "fluent-mdl2:money",
            color: "orange",
            pre: "S/",
        },
        {
            title: "Operaciones",
            value: data.records.length,
            icon: "game-icons:papers",
        },
    ];
    let record;
</script>

<section class="grid gap5">
    <div class="grid auto-fill gap5">
        {#each summary as { title, value, icon, color, pre }}
            <div class="panel border5 flex items gap" style="color: {color}">
                <iconify-icon {icon} width="2.5rem" />
                <div class="grid">
                    <p style="color: var(--dark)">{title}</p>
                    <h2>
                        {#if pre}
                            <span>{pre}</span>
                        {/if}
                        {value}
                    </h2>
                </div>
            </div>
        {/each}
    </div>
    <div class="panel border5 grid gap">
        <div class="flex gap5 content" style="--c: end">
            <button
                on:click={async (e) => {
                    $loading = true;
                    await store.getNewRecord(3, {
                        store_id: data.store.id,
                        user_id: data.current_user.id,
                    });
                    await invalidateAll();
                    $loading = false;
                }}
            >
                <iconify-icon icon="lucide:download-cloud" width="1.5rem" />
                Actualizar
            </button>
            <button
                class="alpha"
                on:click={(e) => {
                    record = new Record({
                        type_id: 5,
                        value: 0,
                        user_id: data.current_user.id,
                        store_id: data.store.id,
                        operation: Date.now(),
                        date: new Date(),
                        id: Date.now(),
                        print: true,
                    });
                }}
            >
                <iconify-icon icon="lucide:file-text" width="1.5rem" />
                Agregar ingresos
            </button>
            <button
                class="holed"
                on:click={async (e) => {
                    const report = new Report({
                        user_id: data.current_user.id,
                        store_id: data.store.id,
                        commission: summary[2].value,
                        up: summary[0].value,
                        down: summary[1].value,
                        operations: data.records.length,
                    });
                    await report.create(false);
                    //goto(`/stores/${store.id}`);
                }}
            >
                <iconify-icon icon="lucide:clipboard-x" width="1.5rem" />
                Cerrar dia
            </button>
        </div>
        <Table
            array={data.records}
            header={[
                "Operacion",
                "Monto",
                "Comision",
                "Fecha y hora",
                "Usuario",
            ]}
            let:item
        >
            <tr
                on:click={(e) => {
                    if ([4, 5].includes(item.type_id)) return;
                    goto(`/stores/${data.store.id}/records/${item.id}`);
                }}
                style="cursor: pointer; font-weight: {item.print
                    ? '400'
                    : '600'}"
            >
                <td>{item.type.name}</td>
                <td style={item.type.add ? "color: green" : "color: tomato"}>
                    S/ {item.value.toFixed(2)}
                </td>
                <td>S/ {item.commission.toFixed(2)} </td>
                <td>{new Date(item.date).toLocaleTimeString()}</td>
                <td>{item.user?.name}</td>
            </tr>
        </Table>
    </div>
</section>

{#if record}
    <Modal onClose={(e) => (record = null)} class="panel border5 grid gap ">
        <AddRecord {record} rates={data.store.rates} />
    </Modal>
{/if}

<style>
    td {
        font-weight: inherit;
    }
</style>
