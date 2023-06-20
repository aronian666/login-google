import ActiveRecord from "./ActiveRecord";
import User from "./User";
import Store from "./Store";
export default class StoreUser extends ActiveRecord {
    constructor(storeUser) {
        super(storeUser, { user: User, store: Store })
    }
    static roles = ["Administrador", "Usuario"]
    static select = "*, store:store_id(*), user:user_id(*)"
    static table = "stores_users"
}