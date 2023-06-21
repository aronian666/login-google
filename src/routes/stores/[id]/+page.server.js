import { Store, StoreUser } from "../../../lib/tables"

export const load = async ({ params: { id }, locals: { current_user } }) => {
    const { data: storeUser } = await StoreUser.find({ user_id: current_user.id, store_id: id })
    const { data: store } = await Store.find({ id }, "*, days(*)")
    return { storeUser, store }
}