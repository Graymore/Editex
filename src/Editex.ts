import { Class, EditexConfig, EditexSaveComponentData, EditexSaveData } from './types/editex'
import Builder from "./core/Builder";
import State from "./core/State";
import Popup from "./components/Popup";

import Text from "./components/Text";

export default class Editex {
    protected builder: Builder
    protected state: State
    protected popup: Popup

    constructor(element: Element | string, config?: EditexConfig) {

        window.editex = {
            onRenderComponent: config?.onRenderComponent || (() => {}),
            onRenderBeforeComponent: config?.onRenderBeforeComponent || (() => {}),
            onRenderedComponent: config?.onRenderedComponent || (() => {}),
        }

        let el = this.getEditor(element)
        this.state = new State()
        this.popup = new Popup()
        this.builder = new Builder({
            element: el,
            state: this.state,
            popup: this.popup
        })
        this.builder.render(config?.defaultComponent || null)
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
        return this.builder
    }

    useState() {
        return this.state
    }

   async save() {
        const components = this.state.get().components
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