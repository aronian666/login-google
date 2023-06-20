import ActiveRecord from "./ActiveRecord";

export default class Rate extends ActiveRecord {
    constructor(rate) {
        super(rate)
    }

    static table = "rates"
}