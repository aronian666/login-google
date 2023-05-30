import { redirect } from "@sveltejs/kit"


export const actions = {
    default: async ({ locals }) => {
        const { data, error } = await locals.supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (data) {
            throw redirect(303, data.url)
        }
        if (error) console.error("Este es un error:", error)
    }
}