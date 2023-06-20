import { supabase } from "../supabase";
export default class ActiveRecord {
    constructor({ created_at, id, ...object } = {}, assign = {}) {
        if (id) this.id = id
        if (created_at) this.created_at = new Date(created_at)
        Object.entries(object).forEach(([key, value]) => {
            if (value === null) return
            if (Array.isArray(value) && assign[key]) return this[key] = value.map(item => new assign[key](item))
            this[key] = assign[key] ? new assign[key](value) : value
        })
    }
    async handleSelect(query, model) {
        if (model === undefined) return query
        const { data, error } = await query.select(this.constructor.select)
        if (error) console.error(error, "Error en lab base de datos")
        if (model) return new this.constructor(data[0])
        return data[0]
    }
    // proptype methods
    get reference() { return supabase.from(this.constructor.table) }
    // Write
    create(model) {
        const query = this.reference.insert([this.constructor.clean(structuredClone(this))])
        return this.handleSelect(query, model)
    }
    save(model) {
        const query = this.reference.upsert([this.constructor.clean(structuredClone(this))])
        return this.handleSelect(query, model)
    }
    update(properties, model) {
        const query = this.reference.update(properties).eq("id", this.id)
        return this.handleSelect(query, model)
    }
    delete() {
        return this.reference.delete().eq("id", this.id)
    }
    // static methods
    static get reference() { return supabase.from(this.table) }
    // Read
    static all(select) {
        return this.reference.select(select || this.select, { count: "exact" })
    }
    static search(search) {
        if (!search) return search
        return this.searchProperties.map(name => `${name}.ilike.%${search}%`).join(',')
    }
    static matchSign(filter) {
        if (!filter) return filter
        let or = ""
        if (Array.isArray(filter)) or = filter.filter(({ value }) => value).map(({ key, sign, value }) => [key, sign, value].filter(Boolean).join(".")).join(",")
        else or = Object.entries(filter).map(([key, value]) => key + "." + value).join(",")
        return `and(${or})`
    }
    static find(match, select) {
        return this.reference.select(select || this.select).match(match).limit(1)

    }
    static filter({ search, matches, page, perPage, ascending, order, select }) {
        search = this.search(search)
        matches = this.matchSign(matches)
        const query = this.all(select)
        if (search) query.or(search)
        if (matches) query.or(matches)
        page = Number(page)
        query.order(order, { ascending }).range(page * perPage, (page + 1) * perPage - 1)
        return query
    }
    // Write
    static create(...records) { return this.reference.insert(records) }
    static update(match, properties) { return this.reference.update(properties).match(match) }
    static upsert(...records) { return this.reference.upsert(records.map(record => this.clean(record))) }
    static delete(match) { return this.reference.delete().match(match) }
    static clean(record) {
        record = structuredClone(record)
        for (let [key, value] of Object.entries(record)) {
            if (!this.permit.includes(key) && typeof value === "object") delete record[key]
        }
        return record
    }
    static searchProperties = []
    static select = "*"
    static permit = ["created_at"]
    static filterParams = {
        page: 0,
        perPage: 10,
        order: "id",
        ascending: true
    }
    static toArray(array = []) {
        return array.map(item => new this(item))
    }
}
