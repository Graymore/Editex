import { historyItemType } from "../types/history";
export default class History {
    public list: historyItemType[]
    constructor() {
        this.list = []
    }

    get() {
        return this.list
    }

    set(item: historyItemType) {
        this.list.push(item)
    }

    delete(index: number) {
        this.deleteByIndex(index)
    }

    deleteByIndex(index: number) {
        this.list.splice(index, 1)
    }

    deleteByName(name: string) {
        this.list.splice(this.list.findIndex(item => item.name === name), 1)
    }
}