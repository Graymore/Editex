import { EditexConfig, EditexSaveComponentData, EditexCore } from './types'
import { Builder, Handler, State, Keyboard } from './core'
import { Image, Popup, Text } from './components'
import { useCaret, useSelection } from "./utils";

export default class Editex {

    /**
     * Core modules
     */
    protected Builder: Builder | null = null
    protected State: State
    protected Keyboard: Keyboard
    protected Handler: Handler

    /**
     * Main Components
     */
    protected Popup: Popup
    protected Text: Text

    constructor(element: Element | string, config?: EditexConfig) {

        const editexGlobalObject = 'editex' in window ? window.editex : (window as any).editex = {}
        const editexElement = this.getEditor(element)
        const editexDefineComponents = config?.components || [Text, Image]

        // Init Core
        this.Handler = new Handler({
            onRenderComponent: config?.onRenderComponent || (() => {}),
            onRenderBeforeComponent: config?.onRenderBeforeComponent || (() => {}),
            onRenderedComponent: config?.onRenderedComponent || (() => {}),
        },
            editexGlobalObject
        )

        this.State = new State(editexDefineComponents)
        this.Keyboard = new Keyboard()

        const core: EditexCore = {
            handler: this.Handler,
            state: this.State,
            keyboard: this.Keyboard,
            useCaret: useCaret,
            useSelection: useSelection,
        }

        this.Popup = new Popup(core)
        this.Text = new Text()

        if (editexElement !== null && editexElement !== undefined) {
            this.Builder = new Builder({
                element: editexElement,
                State: this.State,
                Text: this.Text,
                Handler: this.Handler,
                Popup: this.Popup
            }, core)
            this.Builder.render(config?.defaultComponent || null)
        } else {
            this.Handler.warnings().elementIsNotFound()
        }
    }

    private getEditor(element: Element | string) {
        switch (typeof element) {
            case "string": {
                return document.querySelector(element)
            }
            case "object": {
                return element
            }
        }
    }

    useBuilder() {
        return this.Builder
    }

    useState() {
        return this.State
    }

   async save() {
        const components = this.State.get().components
        let html = ''
        let componentsOutput: EditexSaveComponentData[] = []

        await components.forEach((component, index) => {
            const output = component.class.save().replace(/\&nbsp;/g, '')
            html = html + output
            if (index !== components.length && output.trim() !== '') html = html + `<br><br>`

            componentsOutput.push({
                name: component.class.name,
                HTMLData: output.trim() === '' ? null : output,
                state: component.class.state()
            })
        })

        let date = new Date();
        let datetime = date.getDate() + "/"
            + (date.getMonth()+1)  + "/"
            + date.getFullYear() + " @ "
            + date.getHours() + ":"
            + date.getMinutes() + ":"
            + date.getSeconds();

        html = html.replace(/\&nbsp;/g, '').slice(0, -8)

        return {
            components: componentsOutput,
            HTMLData: html.trim() === '' ? null : html,
            time: datetime,
        }
    }
}