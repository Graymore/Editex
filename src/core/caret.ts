export default class Caret {
    public element: Element | HTMLElement | null

    constructor(element: Element | HTMLElement | null) {
        this.element = element
    }

    getPosition() {
        //@ts-ignore
        let _range = document.getSelection().getRangeAt(0)
        let range = _range.cloneRange()
        //@ts-ignore
        range.selectNodeContents(this.element)
        range.setEnd(_range.endContainer, _range.endOffset)
        return range.toString().length
    }

    setPosition(position: number) {
        const range = document.createRange()
        const selection = window.getSelection()
    }

    setToStart() {
        // @ts-ignore
        document.getSelection().collapse(this.element, 0)
    }

    setToEnd() {
        // @ts-ignore
        document.getSelection().collapse(this.element, 1)
    }

    getCaretCoords() {
        const selection = window.getSelection()
        if (selection) {
            const range = selection.getRangeAt(0)
            return range.getClientRects()[0]
        }
    }

    update(caret: Element | null) {
        const coords = this.getCaretCoords()
        !window.getSelection().isCollapsed ? caret.style.display = 'none' : caret.style.display = 'block'
        if (coords !== undefined) {
            caret.style.left = coords.x + 'px'
            caret.style.top = coords.y + 'px'
            caret.style.height = coords.height + 'px'
        }
    }
}