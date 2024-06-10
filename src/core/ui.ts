import { styles } from ".";

export default class UI {
    public replaceElement: Element | null

    constructor(replaceElement: Element | null) {
        this.replaceElement = replaceElement
    }

    render() {
        if (this.replaceElement) {
            const root = document.createElement('div')
            root.classList.add(styles.editor)

            const wrapper = document.createElement('div')
            wrapper.classList.add(styles.wrapper)

            const caret = document.createElement('span')
            caret.classList.add(styles.caret)

            wrapper.appendChild(caret)
            root.appendChild(wrapper)

            this.replaceElement.replaceWith(root)

            return { root, wrapper, caret }
        }
    }
}