import { BuilderConfig, BuilderComponent } from "../types/builder"
import { Class } from "../types/editex"

import { UID, bindOfBlock, useCaret } from "../utils"

import State from "./State"

import Text from '../components/Text'

export default class Builder {
    protected element: Element | null

    protected wrapperElement: Element | null

    protected state: State

    constructor(config: BuilderConfig) {
        this.element = config.element

        const editor = document.createElement('div')
        editor.classList.add('editor')

        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')

        this.wrapperElement = wrapper

        editor.appendChild(wrapper)
        this.element?.replaceWith(editor)

        this.state = config.state
    }

    render(componentClass: Class | null): void {
        if (componentClass === null) return this.render(Text)

        const block = document.createElement('div')
        block.classList.add('block')

        if (this.wrapperElement !== null) this.wrapperElement.appendChild(block)

        let component = new componentClass()
        let componentElement = component.render()
        block.appendChild(componentElement)
        component = {
            uid: UID(),
            class: component,
            // @ts-ignore
            render: componentElement,
            block: block,
            created: new Date().getDate().toString()
        }
        componentElement.focus()
        this.state.createComponent(component)
        this.state.selectedComponentUid = component.uid
        this.binds(component)
    }

    binds(component: BuilderComponent) {
        const bind = bindOfBlock(component.block)
        const caret = useCaret()

        bind.enter(e => {
            this.render(Text)
            e.preventDefault()
        })

        bind.arrowUp(e => {
            const selection = caret.selection()
            if (selection) {
                const current = this.state.components.findIndex(c => c.uid === component.uid)
                const prev = current - 1
                const position = selection.start
                const element = this.state.components[prev]?.render
                const child = component.render.firstChild

                if (element && selection.node === child) {
                    caret.setRange(element.lastChild, position)
                    element.focus()
                    e.preventDefault()
                }

                if (child === null) {
                    caret.setRange(element.lastChild, element.lastChild?.textContent?.length || 0)
                    element.focus()
                    e.preventDefault()
                }

                if (current === 0 && selection.node === component.render.firstChild) e.preventDefault()
            }
        })

        bind.arrowDown(e => {
            const selection = caret.selection()
            if (selection) {
                const current = this.state.components.findIndex(c => c.uid === component.uid)
                const next = current + 1
                const position = selection.start
                const element = this.state.components[next]?.render
                const child = component.render.lastChild

                if (element && next < this.state.components.length && selection.node === child) {
                    caret.setRange(element.firstChild, position)
                    element.focus()
                    e.preventDefault()
                }

                if (child === null) {
                    caret.setRange(element.firstChild, element.firstChild?.textContent?.length || 0)
                    element.focus()
                    e.preventDefault()
                }

                if (current === this.state.components.length - 1 && selection.node === component.render.lastChild) e.preventDefault()
            }
        })

        bind.arrowRight(e => {

        })
    }
}