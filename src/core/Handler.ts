import { EditexHooks, EditexGlobalObject, HandlerEvent } from "../types";

export default class Handler {
    protected prefix: string = 'Editex: '
    protected events: HandlerEvent[] = []

    constructor(hooks: EditexHooks, editexGlobalObject: EditexGlobalObject) {
        editexGlobalObject.onRenderBeforeComponent = hooks.onRenderBeforeComponent
        editexGlobalObject.onRenderComponent = hooks.onRenderComponent
        editexGlobalObject.onRenderedComponent = hooks.onRenderedComponent
    }

    public hook() {
        return {
            onRenderBeforeComponent() {
                const callback = window.editex?.onRenderBeforeComponent
                if (callback) return callback()
            },
            onRenderComponent() {
                const callback = window.editex.onRenderComponent
                if (callback) return callback()
            },
            onRenderedComponent() {
                const callback = window.editex.onRenderedComponent
                if (callback) return callback()
            },
        }
    }

    public warnings() {
        return {
            elementIsNotFound: () => console.warn(this.prefix + 'Object "Element" is not found.')
        }
    }

    private invoke(functionName: string, args?: any) {
        if (this.events.length > 0) {
            this.events.forEach(event => {
                if (event.name === functionName) event.f(args)
            })
        }
    }

    public editor() {
        return {
            call: (eventType: string, args?: any) => this.invoke(eventType, args),
            on: (eventType: string, callback: (event: any) => any) => this.events.push({ name: eventType, f: callback }),
        }
    }
}