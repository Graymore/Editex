import { BuilderConfig, BuilderComponent } from "../types/builder"
import { Class } from "../types/editex"

import { UID } from "../utils/uid"

import State from "./State"
import Caret from "./Caret"

import Text from '../components/Text'
import {c} from "vite/dist/node/types.d-aGj9QkWt";

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

    render(componentClass: Class | null) {
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
            caret: new Caret(componentElement),
            // @ts-ignore
            render: componentElement,
            block: block,
            created: new Date().getDate().toString()
        }
        componentElement.focus()
        this.state.createComponent(component)
        this.binds(component)
    }

    binds(component: BuilderComponent) {

        component.caret.bind()


        component.block.onkeydown = e => {
            if (!e.shiftKey && e.key === 'Enter') {
                this.render(Text)
                e.preventDefault()
            }
            if (e.key === 'ArrowUp') {
                const current = this.state.components.findIndex(c => c.uid === component.uid)
                const prev = current - 1
                const selection = component.caret.getSelection()

                if (selection.lastChild) {
                    e.preventDefault()
                    if (prev > -1) this.state.components[prev].caret.setSelection(selection.position)
                }
            }
            if (e.key === 'ArrowDown') {
                const current = this.state.components.findIndex(c => c.uid === component.uid)
                const next = current + 1
                const selection = component.caret.getSelection()

                if (selection.lastChild) {
                    e.preventDefault()
                    if (next < this.state.components.length) {
                        this.state.components[next].caret.setSelection(selection.position)
                    }
                }
            }
        }
    }
}