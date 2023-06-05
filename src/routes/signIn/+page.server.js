import { error, redirect } from "@sveltejs/kit"
import { supabase } from "../../lib/supabase"
import { formToJson } from "../../lib/utils"


export const actions = {
    default: async ({ request }) => {
        const { user } = formToJson(await request.formData())
        const { error: err } = await supabase.auth.signInWithPassword(user)
        if (err) throw error(err.status, err.message)
        throw redirect(303, "/")
    },
    async signWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
        console.log(data)
        if (data) throw redirect(303, data.url)
        if (error) console.error("Este es un error:", error)
    }
}