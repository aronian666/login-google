import { Store } from "../../../../lib/tables"

export const load = async ({ params: { id } }) => {
    const { data: [store] } = await Store.find({ id })
    return { store }
}