import { BuilderConfig, BuilderComponent } from "../types/builder"
import { Class } from "../types/editex"

import { UID, bindOfBlock, useCaret } from "../utils"

import State from "./State"
import DOM from "./DOM"

import Text from '../components/Text'

export default class Builder {
    protected state: State
    protected dom: DOM

    constructor(config: BuilderConfig) {
        this.dom = new DOM({
            element: config.element
        })
        this.dom.render()
        this.state = config.state
    }

    render(componentClass: Class | null): void {
        if (componentClass === null) return this.render(Text)
        const component = new componentClass()
        const mutateComponent: BuilderComponent = {
            uid: UID(),
            class: component,
            render: component.render(),
            block: null,
            created: new Date().getDate().toString()
        }

        if (this.state.components.length === 0) {
            mutateComponent.block = this.dom.insertBlock(mutateComponent.render)
            this.state.insertComponent(mutateComponent)
        } else {
            const activeComponent = this.state.getActiveComponent()
            if (activeComponent) {
                mutateComponent.block = this.dom.insertAfterBlock(activeComponent.block, mutateComponent.render)
                this.state.insertAfterComponent(mutateComponent)
            }
        }

        this.binds(mutateComponent)
        mutateComponent.render.focus()
        mutateComponent.render.addEventListener('focus', () => this.state.activeComponentUid = mutateComponent.uid)
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

        bind.keyup(e => {
            if (e.key === '/') {
                const sel = caret.selection()
                if (sel) this.dom.showPopup(sel.rect.x, sel.rect.y)
            } else {
                this.dom.hidePopup()
            }
        })
    }
}