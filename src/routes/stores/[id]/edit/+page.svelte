<script>
    import { Input, Form } from "../../../../lib/components";
    import { Record } from "../../../../lib/tables";
    export let data;
</script>

<Form onSubmit={(e) => Record.upsert(data.store)} class="panel border5">
    <h1>Detalles de la tienda</h1>
    <Input title="Nombre de la tienda" bind:value={data.store.name} required />
    <Input title="Logo de la tienda" bind:value={data.store.logo} />
    <Input title="Script del correo" required bind:value={data.store.script} />
    <button type="submit">Guardar</button>
</Form>
