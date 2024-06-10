import { Block, Tool, Caret, UI } from './'
import { Class, Element } from "../types/core";
import {useEnter, useArrowUp, useArrowDown, useArrowLeft, useArrowRight} from "./shortcut.ts";
interface BuilderConfig {
    element: Element,
    components: Class[],
    defaultComponent: Class
}

export default class Builder {
    protected components: Class[]
    protected defaultComponent: Class
    protected rootElement: Element
    protected rootWrapper: Element
    protected rootCaret: Element

    protected blocks: Block[]
    protected tools: Tool[]

    constructor(config: BuilderConfig) {
        this.components = config.components
        this.defaultComponent = config.defaultComponent
        this.rootElement = config.element
        this.rootWrapper = null
        this.rootCaret = null
        this.blocks = []
        this.tools = []

        this.build()
    }

    private build() {
        const { caret, root, wrapper }: any = new UI(this.rootElement).render()
        this.rootElement = root
        this.rootWrapper = wrapper
        this.rootCaret = caret
        this.create(this.defaultComponent)
    }

    create(component: Class) {
        // @ts-ignore
        const c = new component()
        if (c.type() === 'block') return this.createBlock(c)
        if (c.type() === 'tool') return this.createTool(c)
        return console.warn('Editex: Cant create new component -> Type block or tool is not defined.')
    }

    private createBlock(component: Block) {
        const date = new Date()
        const render = component.render()
        const name = component.name
        const description = component.description
        const version = component.version
        const author = component.author
        const type = component.type()
        const created_at = date.toDateString()
        const updated_at = date.toDateString()

        component.element = render


        /*
            Bind shortcuts
        */

        // Create new defaultComponent (Text or other) if press Enter button
        useEnter(component.element, () => this.create(this.defaultComponent))


        useArrowUp(component.element, () => {
            const index = this.blocks.findIndex(block => block._uid === component._uid)
            if (index > 0) this.blocks[index - 1].element.focus()
            component._caret?.update(this.rootCaret)
        })
        useArrowDown(component.element, () => {
            const index = this.blocks.findIndex(block => block._uid === component._uid)
            if (index < this.blocks.length - 1) this.blocks[index + 1].element.focus()
            component._caret?.update(this.rootCaret)
        })
        useArrowLeft(component.element, () => {
            console.log(component._caret?.getCaretCoords())
            component._caret?.update(this.rootCaret)
        })
        useArrowRight(component.element, () => {
            console.log(component._caret?.getCaretCoords())
            component._caret?.update(this.rootCaret)
        })

        component.element.addEventListener('input', () => {
            component._caret?.update(this.rootCaret)
        })
        component.element.addEventListener('click', () => {
            component._caret?.update(this.rootCaret)
        })
        component.element.addEventListener('mousedown', () => {
            component._caret?.update(this.rootCaret)
        })

        component.element.addEventListener('select', () => {
            console.log('SELECT')
        })

        const block = new Block().render()
        block.appendChild(render)

        this.rootWrapper?.appendChild(block)

        this.blocks.push(component)
        this.blocks[this.blocks.length - 1].element.focus()

        return render
    }

    private createTool(component: Tool) {
        console.log('tess')
    }

    private binds(component: Block) {

    }
}