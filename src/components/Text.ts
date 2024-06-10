export default class Text {
    public name: string = 'Text'
    render() {
        const div = document.createElement('div')
        div.contentEditable = 'true'
        div.classList.add('editor__text')
        return div
    }
}