import { Caret } from './core'
export default class Editex {
    protected element: Element | null
    protected Caret: Caret | null

    constructor(element: Element, config?: object) {
        this.element = this.getEditor(element)
        this.Caret = null
        this.render()
    }

    private render() {
        document.addEventListener('DOMContentLoaded', () => {
            const editor = document.createElement('div')
            editor.classList.add('editor')

            const wrapper = document.createElement('div')
            wrapper.classList.add('wrapper')

            const block = document.createElement('div')
            block.classList.add('block')
            block.contentEditable = 'true'

            wrapper.appendChild(block)
            editor.appendChild(wrapper)

            this.element?.replaceWith(editor)

            block.focus()

            this.Caret = new Caret()

            this.Caret.render(wrapper).then(() => {
                wrapper.addEventListener('input', () => {
                    this.Caret?.update()
                })
                block.addEventListener('focus', () => {
                    this.Caret?.show()
                })
                block.addEventListener('blur', () => {
                    this.Caret?.hide()
                })
            })
        })
    }

    private getEditor(element: Element) {
        switch (typeof element) {
            case "string": {
                return document.querySelector(element)
            }
            case "object": {
                return element
            }
        }
    }
}