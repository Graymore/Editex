export default class Caret {
    public element: Element

    constructor(element: Element) {
        this.element = element
    }

    selection() {
        let selection = document.getSelection()
        let range = new Range

        // if (selection !== null && selection.anchorNode) {
        //
        //     range.setStart(selection.anchorNode, 0)
        //     range.setEnd(selection.anchorNode, selection.anchorOffset)
        //
        //     return {
        //         start: range.toString().length,
        //         end: range.toString().length,
        //         lastChild: selection.anchorNode === this.element.lastChild
        //     }
        // }
    }

    setSelection(pos: number) {
        const selection = document.getSelection()
        const range = document.createRange()

        range.setStart(this.element.lastChild, pos)
        range.collapse(true)

        if (selection !== null) {
            selection.removeAllRanges()
            selection.addRange(range)
        }

        this.element.focus()
    }
}