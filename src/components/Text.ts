export default class Text {
    public text: string
    public name: string

    constructor() {
        this.text = ''
        this.name = 'Text'
    }

    render() {
        const div = document.createElement('div')
        div.classList.add('text')
        div.contentEditable = 'true'
        div.addEventListener('input', () => this.text = div.innerHTML)

        return div
    }

    save() {
        return this.text
    }

    state() {
        return { text: this.text }
    }
}