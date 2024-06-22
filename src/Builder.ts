import { BuilderComponent, EditexCore, Class } from "./types"
import { Text } from './components'
import classes from "./utils/classes";

export default class Builder {

    protected core: EditexCore
    protected element: Element
    protected wrapper: Element | null

    constructor(element: Element, core: EditexCore) {
        this.core = core
        this.element = element
        this.wrapper = null
        this.renderEditor()
    }

    private renderEditor() {
        const editor = document.createElement('div')
        editor.classList.add(classes.editor)

        const wrapper = document.createElement('div')
        wrapper.classList.add(classes.wrapper)

        this.wrapper = wrapper

        editor.appendChild(wrapper)
        this.element?.replaceWith(editor)
    }

    private renderBlock() {
        const block = document.createElement('div')
        block.classList.add(classes.block)
        block.tabIndex = 0
        return block
    }

    private insertBlock(content: Element | null = null): HTMLDivElement {
        const block = this.renderBlock()
        if (content !== null) block.appendChild(content)
        this.wrapper?.appendChild(block)
        return block
    }

    private insertAfterBlock(afterBlock: HTMLElement | null, newContent: Element) {
        const block = this.renderBlock()
        block.appendChild(newContent)
        afterBlock?.insertAdjacentElement('afterend', block)

        return block
    }

    public renderComponent(componentClass: Class | null): void {
        // Если componentClass не доступен, рендер Text
        if (componentClass === null) return this.renderComponent(Text)

        // Инициализация хуков
        this.core.handler.hook().onRenderBeforeComponent()
        this.core.handler.hook().onRenderComponent()

        // Инициализия компонента
        const component = new componentClass()

        // Мутация экземпляра компонента
        const componentCopy: BuilderComponent = {
            uid: this.core.useEditor().genUID(),
            class: component,
            render: component.render(),
            block: document.createElement('div'),
            created: new Date().getDate().toString()
        }

        // Если компонент первый
        if (this.core.state.components.length === 0) {
            componentCopy.block = this.insertBlock(componentCopy.render)
            this.core.state.insertComponent(componentCopy)
        }

        // Если компонент не первый
        if (this.core.state.components.length > 0) {
            const activeComponent = this.core.state.getActiveComponent()
            if (activeComponent) {
                componentCopy.block = this.insertAfterBlock(activeComponent.block, componentCopy.render)
                this.core.state.insertAfterComponent(componentCopy)
            }
        }

        // Хук
        this.core.handler.hook().onRenderedComponent()

        componentCopy.block.focus()

        // Бинды
        componentCopy.block.addEventListener('focus', (e) => {
            this.core.state.activeComponentUid = componentCopy.uid
            componentCopy.block?.classList.add(classes.block_active)
            console.log('focus')
        })

        componentCopy.block.addEventListener('blur', (e) => {
            componentCopy.block?.classList.remove(classes.block_active)
            console.log('blur')
        })

        componentCopy.block.addEventListener('input', (e) => {
            this.core.handler.editor().call('input', e)
        })

        this.core.keyboard.enter(componentCopy.block, (e) => {
            e.preventDefault()
            this.renderComponent(Text)
        })

        this.core.keyboard.arrowUp(componentCopy.block, e => {
            const selection = this.core.useSelection().get()
            if (selection) {
                const currentIndex = this.core.state.components.findIndex(c => c.uid === component.uid)
                const currentComponent = this.core.state.components[currentIndex]
                const prev = currentIndex - 1
                const prevComponent = this.core.state.components[prev]
                const position = selection.start
                const element = prevComponent?.render
                const block = prevComponent?.block
                const child = component.render.firstChild

                if (element) {
                    if (e.shiftKey) {
                        block.focus()
                        e.preventDefault()
                        if (prevComponent.block?.classList.contains(classes.block_selection)) {
                            this.core.state.selectionComponentClear(currentComponent)
                            this.core.state.selectionComponentClear(prevComponent)
                        } else {
                            this.core.state.selectionComponent(currentComponent)
                            this.core.state.selectionComponent(prevComponent)
                        }
                        return
                    }

                    if (element && selection.node === child) {
                        this.core.useSelection().setRange(element.lastChild, position)
                        block.focus()
                        e.preventDefault()
                    }

                    if (child === null) {
                        this.core.useSelection().setRange(element.lastChild, element.lastChild?.textContent?.length || 0)
                        block.focus()
                        e.preventDefault()
                    }

                    if (currentIndex === 0 && selection.node === component.render.firstChild) e.preventDefault()
                }
            }
        })

        this.core.keyboard.arrowDown(componentCopy.block, e => {
            const selection = this.core.useSelection().get()
            if (selection) {
                const currentIndex = this.core.state.components.findIndex(c => c.uid === component.uid)
                const currentComponent = this.core.state.components[currentIndex]
                const next = currentIndex + 1
                const nextComponent = this.core.state.components[next]
                const position = selection.start
                const element = nextComponent?.render
                const block = nextComponent?.block
                const child = component.render.lastChild

                if (element) {
                    if (e.shiftKey) {
                        block.focus()
                        e.preventDefault()
                        if (nextComponent.block?.classList.contains(classes.block_selection)) {
                            this.core.state.selectionComponentClear(currentComponent)
                            this.core.state.selectionComponentClear(nextComponent)
                        } else {
                            this.core.state.selectionComponent(currentComponent)
                            this.core.state.selectionComponent(nextComponent)
                        }
                        return
                    }

                    if (element && next < this.core.state.components.length && selection.node === child) {
                        this.core.useSelection().setRange(element.firstChild, position)
                        block.focus()
                        e.preventDefault()
                    }

                    if (child === null) {
                        this.core.useSelection().setRange(element.firstChild, element.firstChild?.textContent?.length || 0)
                        block.focus()
                        e.preventDefault()
                    }

                    if (currentIndex === this.core.state.components.length - 1 && selection.node === component.render.lastChild) e.preventDefault()
                }
            }
        })
    }
}