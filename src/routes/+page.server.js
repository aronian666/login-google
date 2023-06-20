import { error, redirect } from "@sveltejs/kit"
import { formToJson } from "../lib/utils"



export const actions = {
    async signUp({ request, locals }) {
        const { user } = formToJson(await request.formData())
        const { error: err } = await locals.supabase.auth.signUp(user)
        if (err) throw error(err.status, err.message)
        throw redirect(303, "/")
    },
    async signWithGoogle({ locals }) {
        const { data, error } = await locals.supabase.auth.signInWithOAuth({ provider: 'google' })
        if (data) throw redirect(303, data.url)
        if (error) console.error("Este es un error:", error)
    },
    async signIn({ request, locals }) {
        const { user } = formToJson(await request.formData())
        const { error: err } = await locals.supabase.auth.signInWithPassword(user)
        if (err) throw error(err.status, err.message)
        throw redirect(303, "/")
    },
    async signOut({ locals }) {
        const { error: err } = await locals.supabase.auth.signOut()
        if (err) throw error(500, "Something went wrong logging you out.")
        throw redirect(303, "/")
    }
}