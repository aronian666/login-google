import ActiveRecord from "./ActiveRecord";
import Store from "./Store";
import User from "./User";

export default class Report extends ActiveRecord {
    constructor(report) {
        super(report, { user: User, store: Store })
    }
    static table = "reports"
}