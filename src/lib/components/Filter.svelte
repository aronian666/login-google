<script>
    import Input from "./Input.svelte";
    import { page } from "$app/stores";
    import { formToJson } from "../../lib/utils";
    let filter = {
        search: "",
        page: 0,
        order: "id",
        ascending: false,
        perPage: 10,
    };
    const params = formToJson($page.url.searchParams);
    Object.assign(filter, params);
    filter = filter;
</script>

<section>
    <form>
        <Input
            name="search"
            title="Buscar"
            placeholder="Buscar..."
            value={filter.search}
        />
    </form>
</section>
