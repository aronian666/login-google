<script>
    import { Table } from "../../../../lib/components/index.js";

    export let data;
</script>

<section class="panel border5 grid">
    <Table
        header={["Nombre", "Correo Electronico", "Admin"]}
        array={data.storeUsers}
        let:item
    >
        <tr>
            <td>{item.user.name}</td>
            <td>{item.user.email}</td>
            <td>{item.role}</td>
        </tr>
    </Table>
</section>
