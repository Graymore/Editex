import History from "./history";
import Text from "../components/Text";
import { BuilderType } from "../types/builder";
import { useEnter } from "./shortcut";

export default class Builder {
    protected components: object[]
    protected componentNames: string[]
    protected history: History
    protected rootElement: Element | null
    constructor(config: BuilderType) {
        this.components = config.components
        this.componentNames = []
        // @ts-ignore
        this.history = config.history
        this.rootElement = config.element

        this.build()
    }

    build() {
        this.components.forEach(component => {
            // @ts-ignore
            this.componentNames.push(new component().name)
        })
    }

    protected getBlock() {
        const block = document.createElement('div')
        block.classList.add('editor__block')
        return block
    }

    createDefault(component?: object) {
        const root = document.createElement('div')
        root.classList.add('editor')
        this.rootElement?.replaceWith(root)
        this.rootElement = root
        component !== undefined ? this.create(component) : this.create(Text)
    }

    create(componentClass: object) {
        // @ts-ignore
        const component = new componentClass()

        const date = new Date()

        const target = component.render()
        target.addEventListener('keydown', (e: Event) => {
            let keyboard = <KeyboardEvent> e
            if (keyboard.key === 'Enter' && !keyboard.shiftKey) {
                e.preventDefault()
            }
        })
        const name = component.name
        const created_at = date.toDateString()
        const updated_at = date.toDateString()

        const block = this.getBlock()
        block.appendChild(target)

        this.history.set({ name, target, created_at, updated_at })

        this.rootElement?.appendChild(block)
    }
}