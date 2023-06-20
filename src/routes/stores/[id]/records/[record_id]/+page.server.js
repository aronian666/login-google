import { Record } from "../../../../../lib/tables"

export const load = async ({ params: { record_id } }) => {
    const { data: [record] } = await Record.find({ id: record_id }, "*, store:store_id(*), type:type_id(*)")
    return { record }
}