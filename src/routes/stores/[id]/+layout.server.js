import { StoreUser } from "../../../lib/tables"

export const load = async ({ params: { id }, locals: { current_user } }) => {
    const { data: [storeUser] } = await StoreUser.find({ store_id: id, user_id: current_user.id })
    return { storeUser }
}