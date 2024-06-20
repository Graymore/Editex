import { EditexComponentType } from '../types'

export default class Component {
    public type: EditexComponentType
    public title: string
    public icon: string
    public author: string
    public version: string
    public description: string

    constructor() {
        this.type = 'component'
        this.title = 'Component'
        this.icon = ''
        this.author = 'Editex'
        this.version = '1.0'
        this.description = 'Editex New Component'
    }

    render() {
        const div = document.createElement('div')
        div.innerHTML = 'New Component'
        return div
    }

    save() {
        return 'New Component'
    }
}