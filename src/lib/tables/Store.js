import ActiveRecord from "./ActiveRecord";
import StoreUser from "./StoreUser";
import Record from "./Record";
import Rate from "./Rate";


export default class Store extends ActiveRecord {
    constructor(store) {
        super(store, { stores_users: StoreUser, records: Record, rates: Rate })
    }
    static table = "stores"
    async getNewRecord(number = 1, extra) {
        let records = await fetch(this.script + "?threads=" + number).then(r => r.json())
        console.log(records)
        records = records.map(record => {
            for (const rate of this.rates) {
                if (rate.type_id === record.type_id && record.value >= rate.min && record.value < rate.max) {
                    record.commission = rate.commission
                    record = { ...record, ...extra }
                    return record
                }
            }
        })
        const { error } = await Record.upsert(...records)
    }
}