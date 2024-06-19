import { BuilderConfig, BuilderComponent } from "../types/builder"
import { Class } from "../types/editex"

import { UID, bindOfBlock, useCaret } from "../utils"

import DOM from "./DOM"

import Text from '../components/Text'
import Popup from '../components/Popup'
import classes from "../utils/classes";

import Core from "./Core";

export default class Builder extends Core {
    protected dom: DOM
    protected popup: Popup

    constructor(config: BuilderConfig) {
        super()
        this.dom = new DOM({
            element: config.element
        })
        this.dom.render()
        this.State = config.state
        this.popup = config.popup
        this.popup.render()
    }

    render(componentClass: Class | null): void {
        if (componentClass === null) return this.render(Text)

        this.Handler.hook().onRenderBeforeComponent()
        this.Handler.hook().onRenderComponent()

        this.Handler.editor().input(() => {
            console.log('test')
        })

        const component = new componentClass()
        const mutateComponent: BuilderComponent = {
            uid: UID(),
            class: component,
            render: component.render(),
            block: null,
            created: new Date().getDate().toString()
        }
        if (this.State.components.length === 0) {
            mutateComponent.block = this.dom.insertBlock(mutateComponent.render)
            this.State.insertComponent(mutateComponent)
        } else {
            const activeComponent = this.State.getActiveComponent()
            if (activeComponent) {
                mutateComponent.block = this.dom.insertAfterBlock(activeComponent.block, mutateComponent.render)
                this.State.insertAfterComponent(mutateComponent)
            }
        }

        this.binds(mutateComponent)
        mutateComponent.render.focus()
        mutateComponent.render.addEventListener('focus', () => this.State.activeComponentUid = mutateComponent.uid)
        this.Handler.hook().onRenderedComponent()
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
                const currentIndex = this.State.components.findIndex(c => c.uid === component.uid)
                const currentComponent = this.State.components[currentIndex]
                const prev = currentIndex - 1
                const prevComponent = this.State.components[prev]
                const position = selection.start
                const element = prevComponent.render
                const child = component.render.firstChild

                if (e.shiftKey) {
                    element.focus()
                    e.preventDefault()
                    if (prevComponent.block?.classList.contains(classes.block_selection)) {
                        this.State.selectionComponentClear(currentComponent)
                        this.State.selectionComponentClear(prevComponent)
                    } else {
                        this.State.selectionComponent(currentComponent)
                        this.State.selectionComponent(prevComponent)
                    }
                    return
                }

                if (element && selection.node === child) {
                    caret.setRange(element.lastChild, position)
                    element.focus()
                    e.preventDefault()
                }

                if (child === null) {
                    caret.setRange(element.lastChild, element.lastChild?.textContent?.length || 0)
                    e.preventDefault()
                }



                if (currentIndex === 0 && selection.node === component.render.firstChild) e.preventDefault()
            }
        })

        bind.arrowDown(e => {
            const selection = caret.selection()
            if (selection) {
                const currentIndex = this.State.components.findIndex(c => c.uid === component.uid)
                const currentComponent = this.State.components[currentIndex]
                const next = currentIndex + 1
                const nextComponent = this.State.components[next]
                const position = selection.start
                const element = this.State.components[next]?.render
                const child = component.render.lastChild

                if (e.shiftKey) {
                    element.focus()
                    e.preventDefault()
                    if (nextComponent.block?.classList.contains(classes.block_selection)) {
                        this.State.selectionComponentClear(currentComponent)
                        this.State.selectionComponentClear(nextComponent)
                    } else {
                        this.State.selectionComponent(currentComponent)
                        this.State.selectionComponent(nextComponent)
                    }
                    return
                }

                if (element && next < this.State.components.length && selection.node === child) {
                    caret.setRange(element.firstChild, position)
                    element.focus()
                    e.preventDefault()
                }

                if (child === null) {
                    caret.setRange(element.firstChild, element.firstChild?.textContent?.length || 0)
                    element.focus()
                    e.preventDefault()
                }

                if (currentIndex === this.State.components.length - 1 && selection.node === component.render.lastChild) e.preventDefault()
            }
        })

        bind.selectionAll(e => {
            e.preventDefault()
            this.State.selectionAllComponents()
        })

        bind.removeSelection(e => {
            if (this.State.selectionComponents.length > 0) this.State.selectionComponentClearAll()
        })
    }
}