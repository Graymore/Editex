import { EditexCore } from "../types";
import classes from "../utils/classes";

export default class Popup {
    public popup: HTMLDivElement | null = null
    public popupWrapper: HTMLDivElement | null = null
    public core: EditexCore

    constructor(core: EditexCore) {

        core.keyboard.arrowUp(() => console.log('arrowUp'))
        core.keyboard.arrowDown(() => console.log('arrowDown'))

        core.keyboard.shiftArrowUp(() => console.log('shiftArrowUp'))
        core.keyboard.shiftArrowDown(() => console.log('shiftArrowDown'))
        core.keyboard.ctrlArrowUp(() => console.log('ctrlArrowUp'))
        core.keyboard.ctrlArrowDown(() => console.log('ctrlArrowDown'))

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

        editor.on('input', event => {
            this.parse(event.target.textContent)
        })
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

    private parse(str: string) {
        const command = '/'
        const index = str.lastIndexOf(command)

        if (index > -1) {
            const prevSymbol = str[index - 1]
            const nextSymbol = str[index + 1]
            const line = str.slice(index, str.length)

            !prevSymbol || prevSymbol.trim() === '' ? this.show() : this.hide()
            if (nextSymbol && nextSymbol.trim() === '') this.hide()
            if (line.indexOf(' ') !== -1 || line[line.length - 1].trim() === '') this.hide()

            return true
        }

        return this.hide()
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