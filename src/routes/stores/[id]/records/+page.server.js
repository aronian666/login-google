import { Record } from "../../../../lib/tables"
import { formToJson } from "../../../../lib/utils";

export const load = async ({ params: { id }, url }) => {
    let filter = structuredClone(Record.filterParams)
    filter.matches = (filter.matches || []).concat({ key: "store_id", value: "eq." + id, hidden: true })
    filter.select = "*, type:type_id(*)"
    Object.assign(filter, formToJson(url.searchParams))
    const { data: records, error, count } = await Record.filter(filter)
    return { records, filter, count }
}