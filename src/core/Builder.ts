import { BuilderConfig, BuilderComponent, EditexCore } from "../types"
import { Class } from "../types"

import { UID, bindOfBlock, useCaret } from "../utils"

import DOM from "./DOM"

import { Text, Popup } from '../components'

import { State, Handler } from '.'

import classes from "../utils/classes";

export default class Builder {
    protected DOM: DOM
    protected Popup: Popup
    protected State: State
    protected Handler: Handler
    protected core: EditexCore

    constructor(config: BuilderConfig, core: EditexCore) {
        this.State = config.State
        this.Popup = config.Popup
        this.Handler = config.Handler
        this.core = core

        this.DOM = new DOM({ element: config.element })
        this.DOM.render()
    }

    renderComponent(componentClass: Class | null): void {
        // Если componentClass не доступен, рендер Text
        if (componentClass === null) return this.renderComponent(Text)

        // Инициализация хуков
        this.Handler.hook().onRenderBeforeComponent()
        this.Handler.hook().onRenderComponent()

        // Инициализия компонента
        const component = new componentClass()

        // Мутация экземпляра компонента
        const componentCopy: BuilderComponent = {
            uid: UID(),
            class: component,
            render: component.render(),
            block: document.createElement('div'),
            created: new Date().getDate().toString()
        }

        // Если компонент первый
        if (this.State.components.length === 0) {
            componentCopy.block = this.DOM.insertBlock(componentCopy.render)
            this.State.insertComponent(componentCopy)
        }

        // Если компонент не первый
        if (this.State.components.length > 0) {
            const activeComponent = this.State.getActiveComponent()
            if (activeComponent) {
                componentCopy.block = this.DOM.insertAfterBlock(activeComponent.block, componentCopy.render)
                this.State.insertAfterComponent(componentCopy)
            }
        }

        // Бинды
        componentCopy.block.onfocus = () => {
            this.State.activeComponentUid = componentCopy.uid
            componentCopy.block?.classList.add(classes.block_active)
        }
        componentCopy.block.onblur = () => {
            componentCopy.block?.classList.remove(classes.block_active)
        }
        componentCopy.block.oninput = e => {
            this.Handler.editor().call('input', e)
        }

        // Хук
        this.Handler.hook().onRenderedComponent()

        const editable = componentCopy.render.querySelector('div[contenteditable]')
        editable !== null ? editable.focus() : componentCopy.block.focus()
    }

    binds(component: BuilderComponent) {
        const bind = bindOfBlock(component.block)
        const caret = useCaret()

        bind.enter(e => {
            this.render(Text)
            this.Handler.editor().call('enter', e)
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
                const element = prevComponent?.render
                const block = prevComponent?.block
                const child = component.render.firstChild

                if (element) {
                    if (e.shiftKey) {
                        block.focus()
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
                        block.focus()
                        e.preventDefault()
                    }

                    if (child === null) {
                        caret.setRange(element.lastChild, element.lastChild?.textContent?.length || 0)
                        block.focus()
                        e.preventDefault()
                    }

                    if (currentIndex === 0 && selection.node === component.render.firstChild) e.preventDefault()
                }
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
                const element = nextComponent?.render
                const block = nextComponent?.block
                const child = component.render.lastChild

                if (element) {
                    if (e.shiftKey) {
                        block.focus()
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
                        block.focus()
                        e.preventDefault()
                    }

                    if (child === null) {
                        caret.setRange(element.firstChild, element.firstChild?.textContent?.length || 0)
                        block.focus()
                        e.preventDefault()
                    }

                    if (currentIndex === this.State.components.length - 1 && selection.node === component.render.lastChild) e.preventDefault()
                }
            }
        })

        bind.selectionAll(e => {
            e.preventDefault()
            this.State.selectionAllComponents()
        })
    }
}