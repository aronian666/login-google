import { redirect } from "@sveltejs/kit"
import { supabase } from "../../lib/supabase"

export const actions = {
    default: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (data) {
            throw redirect(303, data.url)
        }
        if (error) console.error("Este es un error:", error)
    }
}