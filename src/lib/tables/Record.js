import ActiveRecord from "./ActiveRecord";
import Store from "./Store";

export default class Record extends ActiveRecord {
    constructor(record) {
        super(record, { store: Store, date: Date })
    }
    static table = "records"
    static searchProperties = ["operation", "id"]
    static getDown(records) {
        return records.filter(r => !r.type.add).reduce((a, record) => a + record.value, 0)
    }
    static getUp(records) {
        return records.filter(r => r.type.add).reduce((a, b) => a + b.value, 0)
    }
    static getWin(records) {
        return records.reduce((a, b) => a + b.commission, 0)
    }
    static permit = ["created_at", "date"]
}