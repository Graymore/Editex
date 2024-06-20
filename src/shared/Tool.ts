import { EditexComponentType } from '../types'

export default class Tool {
    public type: EditexComponentType
    public title: string
    public icon: string
    public author: string
    public version: string
    public description: string

    constructor() {
        this.type = 'tool'
        this.title = 'Tool'
        this.icon = ''
        this.author = 'Editex'
        this.version = '1.0'
        this.description = 'Editex New Tool'
    }
}