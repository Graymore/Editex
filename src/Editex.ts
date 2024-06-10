import Text from "./core/components/Text"
import { Class } from "./types/core";
import History from "./core/history";
import Builder from "./core/builder";

type EditexElementType = Element | null | string
type EditexConfigType = {
    components?: Class[],
    autofocus?: boolean,
    defaultComponent?: Class,

    /*
    * Hooks
    */
    onBuilded?: () => any,
    onRendered?: () => any,
}

export default class Editex {
    protected autofocus: boolean
    protected history: History
    protected builder: Builder

    private readonly onBuilded: (() => any) | undefined
    private readonly onRendered: (() => any) | undefined

    constructor(element: EditexElementType, config?: EditexConfigType) {
        this.onBuilded = config?.onBuilded || undefined
        this.onRendered = config?.onRendered || undefined
        this.autofocus = config?.autofocus || false
        this.history = new History()
        this.builder = new Builder({
            element: this.computedElement(element),
            components: config?.components || [],
            defaultComponent: config?.defaultComponent || Text
        })
    }

    private computedElement(element: EditexElementType) {
        switch (typeof element) {
            case "string": {
                return document.querySelector(element)
            }
            case "object": {
                return element
            }
        }
    }

    useHistory() {
        return this.history
    }

    useBuilder() {
        return this.builder
    }
}