import { BuilderComponent, EditexCore, Class } from "./types"
import { Text } from './components'
import classes from "./utils/classes";
import {useSelection} from "./utils";

export default class Builder {

    protected core: EditexCore
    protected element: Element
    protected wrapper: Element

    constructor(element: Element, core: EditexCore) {
        this.core = core
        this.element = element
        this.wrapper = this.renderEditor()
    }

    private renderEditor() {
        const editor = document.createElement('div')
        editor.classList.add(classes.editor)

        const wrapper = document.createElement('div')
        wrapper.classList.add(classes.wrapper)

        this.wrapper = wrapper

        editor.appendChild(wrapper)
        this.element?.replaceWith(editor)

        return wrapper
    }

    public renderComponent(componentClass: Class | null, direction: string = 'after'): void {
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
            block: this.core.block.render(),
            created: new Date().getDate().toString()
        }

        this.core.useDOM().insertElementToStart(componentCopy.block, componentCopy.render)

        // Бинды
        componentCopy.block.addEventListener('focus', () => {
            this.core.state.setFocusComponent(componentCopy)
            componentCopy.block?.classList.add(classes.block_active)
        }, true)

        componentCopy.block.addEventListener('blur', () => {
            componentCopy.block?.classList.remove(classes.block_active)
        }, true)

        componentCopy.block.addEventListener('input', (e) => {
            this.core.handler.editor().call('input', e)
        }, true)

        // Если компонент первый
        if (this.core.state.getComponents().length === 0) {
            this.core.useDOM().insertElementToStart(this.wrapper, componentCopy.block)
            this.core.state.setComponent(componentCopy)
            componentCopy.render.focus()
        } else {
            // Если компонент не первый
            const activeComponent = this.core.state.getFocusComponent()
            if (activeComponent) {
                if (direction === 'before') {
                    this.core.useDOM().insertElementBefore(activeComponent.block, componentCopy.block)
                    this.core.state.setComponentBefore(componentCopy)
                }
                if (direction === 'after') {
                    this.core.useDOM().insertElementAfter(activeComponent.block, componentCopy.block)
                    this.core.state.setComponentAfter(componentCopy)
                    componentCopy.render.focus()
                }
            }
        }

        // Хук
        this.core.handler.hook().onRenderedComponent()

        this.core.keyboard.enter(componentCopy.block, (e) => {
            e.preventDefault()
            const caret = useSelection().get()

            caret && caret.end === 0 && caret.node?.textContent?.trim() !== '' ?
                this.renderComponent(Text, 'before') : this.renderComponent(Text, 'after')
        })

        this.core.keyboard.arrowUp(componentCopy.block, e => {
            const selection = useSelection()
            const caret = useSelection().get()

            if (caret && caret.parentNodeFirstChild === caret.node) {
                e.preventDefault()
                const focusPrev = this.core.state.getFocusComponentIndex() - 1

                if (focusPrev > -1) {
                    const block = this.core.state.getComponents()[focusPrev].block
                    const editable = this.core.useEditor().getEditableElement(block)
                    if (editable !== null) {
                        selection.setRange(editable.lastChild, caret.start)
                        return editable.focus()
                    }
                    return block.focus()
                }
            }
        })

        this.core.keyboard.arrowDown(componentCopy.block, e => {
            const selection = useSelection()
            const caret = useSelection().get()

            if (caret && caret.parentNodeLastChild === caret.node) {
                e.preventDefault()
                const focusNext = this.core.state.getFocusComponentIndex() + 1

                if (focusNext <= this.core.state.getComponents().length - 1) {
                    const block = this.core.state.getComponents()[focusNext].block
                    const editable = this.core.useEditor().getEditableElement(block)
                    if (editable !== null) {
                        selection.setRange(editable.firstChild, caret.start)
                        return editable.focus()
                    }
                    return block.focus()
                }
            }
        })
    }
}