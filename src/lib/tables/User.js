import ActiveRecord from "./ActiveRecord";

export default class User extends ActiveRecord {
    constructor(user) {
        super()
        if (user.id) this.id = user.id
        if (user.user_metadata) {
            this.email = user.user_metadata.email
            this.name = user.user_metadata.name
            this.picture = user.user_metadata.picture
        } else {
            this.email = user.email
            this.picture = user.picture
            this.name = user.name
        }
    }
    static table = "users"
}