<script>
    import { Input } from "../../lib/components";
    import NavHome from "../NavHome.svelte";
</script>

<svelte:head>
    <title>Iniciar session</title>
</svelte:head>

<NavHome />
<main class="container grid content">
    <div class="panel grid gap">
        <h1 class="text-center">Iniciar sesion</h1>
        <form action="/?signWithGoogle" method="post">
            <button type="submit" class="holed">
                <iconify-icon icon="devicon:google" width="1.4rem" />
                Continuar con google
            </button>
        </form>
        <div class="divider" />
        <form action="/" method="post">
            <Input
                placeholder="Correo eletronico"
                aria-label="Correo electronico"
                name="user[email]"
                required
            />
            <Input
                placeholder="Correo eletronico"
                name="user[password]"
                type="password"
                aria-label="Contrasena"
                required
            />
            <button type="submit">Iniciar sesion</button>
        </form>
    </div>
</main>

<style>
    main {
        height: 100svh;
    }
    form {
        min-width: 250px;
    }
</style>
