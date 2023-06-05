import ActiveRecord from "./ActiveRecord";
import StoreUser from "./StoreUser";

export default class User extends ActiveRecord {
    constructor(user) {
        super(user, { stores_users: StoreUser })
    }
    static table = "users"
}