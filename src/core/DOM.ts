import {DOMConfig} from "../types/dom"
import classes from "../utils/classes";

export default class DOM {
    public element: Element | null
    public wrapper: Element | null
    public popup: HTMLElement | null

    constructor(config: DOMConfig) {
        this.element = config.element
        this.wrapper = null
        this.popup = null
    }

    render() {
        const editor = document.createElement('div')
        editor.classList.add(classes.editor)

        const wrapper = document.createElement('div')
        wrapper.classList.add(classes.wrapper)

        this.wrapper = wrapper

        editor.appendChild(wrapper)
        this.element?.replaceWith(editor)

        const popup = document.createElement('div')
        popup.classList.add(classes.popup)
        this.popup = popup

        const popupWrapper = document.createElement('div')
        popupWrapper.classList.add(classes.popupWrapper)

        popup.appendChild(popupWrapper)
        document.body.appendChild(popup)
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

    showPopup(x: number, y: number) {
        if (this.popup !== null) {
            this.popup.style.left = x + 'px'
            this.popup.style.top = y + 10 + 'px'
            this.popup.classList.add(classes.popup_active)
        }
    }

    hidePopup() {
        this.popup?.classList.remove(classes.popup_active)
    }

    togglePopup() {
        this.popup?.classList.toggle(classes.popup_active)
    }
}