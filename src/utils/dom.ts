export function useDom() {

    function insertElementToStart(insertWrapper: Element, element: Element) {
        insertWrapper.prepend(element)
    }

    function insertElementToEnd(insertWrapper: Element, element: Element) {
        insertWrapper.append(element)
    }

    function insertElementAfter(afterElement: Element, element: Element) {
        afterElement.after(element)
    }

    function insertElementBefore(beforeElement: Element, element: Element) {
        beforeElement.before(element)
    }

    return {
        insertElementToStart,
        insertElementToEnd,
        insertElementAfter,
        insertElementBefore,
    }
}