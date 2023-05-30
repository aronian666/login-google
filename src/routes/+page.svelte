<script>
    export let data;
    console.log(data);
</script>

{#if data.session}
    <h1>Hay un usuario</h1>
{/if}
{#if data.session}
    <form action="/signOut" method="post">
        <button>Cerrar sesion</button>
    </form>
{:else}
    <form method="post">
        <button>Entrar con google</button>
    </form>
{/if}
