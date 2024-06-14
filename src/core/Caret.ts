export default class Caret {
    protected caret: HTMLDivElement | null

    constructor() {
        this.caret = null
    }

    async render(element: Element | null) {
        const caret = document.createElement('div')
        caret.classList.add('caret')
        this.caret = caret
        element?.appendChild(caret)
        this.update()
    }

    update() {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        if (range.collapsed && range.startOffset === 0) {
            this.hide()
        } else {
            this.show()
        }

        if (this.caret) {
            this.caret.style.left = '10px'
            this.caret.style.left = `${rect.x}px`
            this.caret.style.top = `${rect.y}px`
            this.caret.style.height = `${rect.height}px`
        }
    }

    show() {
        this.caret.style.display = 'block'
    }

    hide() {
        this.caret.style.display = 'none'
    }

    binds() {

    }
}