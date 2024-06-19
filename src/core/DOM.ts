import {DOMConfig} from "../types/dom"
import classes from "../utils/classes";

export default class DOM {
    public element: Element | null
    public wrapper: Element | null

    constructor(config: DOMConfig) {
        this.element = config.element
        this.wrapper = null
    }

    render() {
        const editor = document.createElement('div')
        editor.classList.add(classes.editor)

        const wrapper = document.createElement('div')
        wrapper.classList.add(classes.wrapper)

        this.wrapper = wrapper

        editor.appendChild(wrapper)
        this.element?.replaceWith(editor)
    }

    renderBlock() {
        const block = document.createElement('div')
        block.classList.add(classes.block)
        return block
    }

    insertBlock(content: Element | null = null): HTMLDivElement {
        const block = this.renderBlock()
        if (content !== null) block.appendChild(content)
        this.wrapper?.appendChild(block)
        return block
    }

    insertAfterBlock(afterBlock: HTMLElement | null, newContent: Element) {
        const block = this.renderBlock()
        block.appendChild(newContent)

        afterBlock?.insertAdjacentElement('afterend', block)

        return block
    }
}