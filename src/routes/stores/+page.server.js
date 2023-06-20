import { Store, StoreUser } from "../../lib/tables"

export const load = async ({ parent, depends }) => {
    depends("stores")
    const { current_user } = await parent()
    const { data: stores } = await StoreUser.all().match({ user_id: current_user.id })
    return { stores }
}