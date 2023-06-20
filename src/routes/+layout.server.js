import { User } from "../lib/tables"

export const load = async ({ locals: { getSession } }) => {
    const session = await getSession()
    const current_user = session && new User(session.user)
    return {
        session,
        current_user: structuredClone(current_user)
    }
}