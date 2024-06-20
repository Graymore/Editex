import { EditexCore } from "../types";
import { useMenu } from "../utils";
import classes from "../utils/classes";

export default class Popup {
    public popup: HTMLDivElement | null = null
    public popupWrapper: HTMLDivElement | null = null
    public core: EditexCore

    constructor(core: EditexCore) {
        this.core = core
        const editor = core.handler.editor()
        const components = core.state.importedComponents

        const popup = document.createElement('div')
        popup.classList.add(classes.popup)
        this.popup = popup

        const popupWrapper = document.createElement('div')
        popupWrapper.classList.add(classes.popupWrapper)
        this.popupWrapper = popupWrapper

        popup.appendChild(popupWrapper)
        document.body.appendChild(popup)

        editor.on('input', event => useMenu().findCommand(event.target.textContent) ? this.show() : this.hide())
        editor.on('enter', () => this.hide())

        components.forEach(component => {
            const componentClass = new component()
            const componentTitle = componentClass.title
            const componentIcon = componentClass.icon

            const item = document.createElement('div')
            item.classList.add(classes.popupItem)

            const title = document.createElement('div')
            title.classList.add(classes.popupItemTitle)
            title.innerHTML = componentTitle

            const icon = document.createElement('div')
            icon.classList.add(classes.popupItemIcon)
            icon.innerHTML = componentIcon

            item.appendChild(icon)
            item.appendChild(title)

            this.popupWrapper?.appendChild(item)
        })
    }

    show() {
        if (this.popup !== null) {
            const selection = this.core.useCaret().selection()
            const caretRect = selection.rect

            const activeComponent = this.core.state.components.find(c => c.uid === this.core.state.activeComponentUid)
            if (activeComponent) activeComponent.block?.classList.add(classes.block_popup)

            this.popup.style.left = caretRect.left + 'px'
            this.popup.style.top = caretRect.top + 20 + 'px'
            this.popup.classList.add(classes.popup_active)
        }
    }

    hide() {
        if (this.popup !== null) {
            const activeComponent = this.core.state.components.find(c => c.uid === this.core.state.activeComponentUid)
            if (activeComponent) activeComponent.block?.classList.remove(classes.block_popup)

            this.popup.classList.remove(classes.popup_active)
        }
    }
}