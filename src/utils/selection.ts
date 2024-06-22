export function useSelection() {

    function get() {
        const selection = document.getSelection()

        if (selection) {
            const rangeSel = selection.getRangeAt(0)
            const start = selection.anchorOffset
            const end = selection.focusOffset
            const range = Math.abs(start - end)
            const rect = rangeSel.getBoundingClientRect()
            const node = selection.anchorNode
            const parentNode = selection.anchorNode?.parentNode
            const length = selection.anchorNode?.textContent?.length
            const contents = rangeSel.cloneContents()
            const contentsText = rangeSel.cloneContents().textContent

            return { start, end, range, node, length, contents, contentsText, rect, parentNode }
        }
    }

    function setRange(element: Element, position: number) {
        if (element) {
            const selection = document.getSelection()
            const range = document.createRange()
            const length = element.textContent?.length || 0
            if (position > length) position = length

            if (selection) {
                range.setStart(element, position)
                range.collapse(true)
                selection.removeAllRanges()
                selection.addRange(range)
            }
        }
    }

    function setToStart() {

    }

    function setToEnd() {

    }

    return { get, setRange, setToStart, setToEnd }
}