import ActiveRecord from "./ActiveRecord";
import StoreUser from "./StoreUser";

export default class Store extends ActiveRecord {
    constructor(store) {
        super(store, { stores_users: StoreUser })
    }
    static table = "stores"
}