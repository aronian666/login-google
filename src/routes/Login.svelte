<script>
    import { Input } from "../lib/components";

    export let signUp = false;
    const inputs = [
        {
            name: "user[options][data][name]",
            title: "Nombres",
            "aria-label": "Nombres",
            placeholder: "Nombres",
            type: "text",
            required: true,
        },
        {
            name: "user[email]",
            title: "Correo electrónico",
            "aria-label": "Correo electrónico",
            placeholder: "Correo electrónico",
            type: "email",
            required: true,
        },
        {
            name: "user[password]",
            title: "Contraseña",
            "aria-label": "Contraseña",
            placeholder: "Contraseña",
            type: "password",
            required: true,
            minlength: "6",
        },
    ];
    $: formInputs = signUp ? inputs : inputs.slice(1, 3);
</script>

<h2 class="text-center">{signUp ? "Registrarse" : "Iniciar sesion"}</h2>

{#key signUp}
    <form method="post">
        {#each formInputs as input}
            <Input {...input} />
        {/each}
        <button formaction={signUp ? "?/signUp" : "?/signIn"} type="submit"
            >{signUp ? "Crear cuenta" : "Iniciar sesion"}</button
        >
    </form>
{/key}
<div class="divider" />
<form action="?/signWithGoogle" method="post">
    <button type="submit" class="holed" style="--color: var(--dark)">
        <iconify-icon icon="devicon:google" width="1.4rem" />
        Continuar con google
    </button>
</form>
