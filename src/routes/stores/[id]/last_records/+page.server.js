import { Record, Store } from "../../../../lib/tables"

export const load = async ({ params: { id } }) => {

    const { data: records, count } = await Record.all("*, user:user_id(*), type:type_id(*)").order("date", { ascending: false }).or(Record.matchSign({ day_id: "is.null", store_id: "eq." + id }))
    const { data: [store] } = await Store.find({ id }, "*, rates(*)")
    return { records, store }
}