<script>
    import { Table } from "../../../lib/components";

    export let data;
</script>

<Table
    array={data.store.reports}
    header={["Fecha", "Operaciones", "Ganancia", "Usuario"]}
    let:item
>
    <tr>
        <td>{new Date(item.created_at).toLocaleDateString()}</td>
        <td>{item.operations}</td>
        <td>{item.commission}</td>
        <td>{item.user.name}</td>
    </tr>
</Table>
