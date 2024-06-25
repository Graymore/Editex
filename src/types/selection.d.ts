export interface SelectionContext {
    start: number
    end: number
    range: number
    rect: DOMRect
    node: Node | null
    parentNode: ParentNode | null
    parentNodeFirstChild: ChildNode | null
    parentNodeLastChild: ChildNode | null
    length: number
    contents: DocumentFragment
    contentsText: string | null
}

export interface Selection {
    get: () => SelectionContext | null
    setRange: (element: Element, position: number) => void
    setToStart: () => void
    setToEnd: () => void
}