import { Rate, Record } from "../../../../lib/tables"
import { groupBy } from "../../../../lib/utils"

export const load = async ({ params: { id }, depends }) => {
    depends("rates")
    const { data: rates } = await Rate.all("*, type:type_id(*)").match({ store_id: id })
    const operations = groupBy(rates, "type_id")
    return { operations, store: { id } }
}