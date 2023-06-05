import { error, redirect } from "@sveltejs/kit"
import { formToJson } from "../../lib/utils"
import { supabase } from "../../lib/supabase"

export const actions = {
    default: async ({ request }) => {
        const { user } = formToJson(await request.formData())
        const { error: err } = await supabase.auth.signUp(user)
        if (err) throw error(err.status, err.message)
        throw redirect(303, "/")
    },
    async signWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
        if (data) throw redirect(303, data.url)
        if (error) console.error("Este es un error:", error)
    }
}