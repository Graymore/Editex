export interface Component {
    name: string,
    description: string,
    version: string,
    author: string
    element: HTMLElement | Element | null
}

export default class component implements Component {
    public name: string
    public description: string
    public version: string
    public author: string
    public element: any

    constructor() {
        this.name = ''
        this.description = 'Description Component'
        this.version = 'v1.0'
        this.author = 'Editex Core'
        this.element = null
    }
}