<script>
    import { Input } from "../../lib/components";
</script>

<main class="container panel grid gap">
    <h1>Iniciar sesion</h1>
    <form action="/" method="post">
        <Input
            placeholder="Nombre"
            aria-label="Nombre"
            name="user[options][data][name]"
            required
        />
        <Input
            placeholder="Correo eletronico"
            aria-label="Correo electronico"
            name="user[email]"
            required
        />
        <Input
            placeholder="Contrasena"
            name="user[password]"
            type="password"
            aria-label="Contrasena"
            required
        />
        <button type="submit">Crear cuenta</button>
    </form>
    <p>Ya tienes una cuenta? Inicia sesion <a href="/signIn">aqui</a></p>
</main>
