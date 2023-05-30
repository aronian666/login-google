<script>
    export let data;
    console.log(data);
</script>

{#if data.session}
    <h1>{data.session.user.email}</h1>
    <form action="/signOut" method="post">
        <button>Cerrar sesion</button>
    </form>
{:else}
    <form method="post">
        <button>Entrar con google</button>
    </form>
{/if}
