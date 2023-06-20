import { StoreUser, User } from "../../../../lib/tables"

export const load = async ({ params: { id } }) => {
    const { data, count } = await StoreUser.all().match({ store_id: id })
    return { storeUsers: data }
}