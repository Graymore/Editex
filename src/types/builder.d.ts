import { State, Handler } from '../core'
import { Popup, Text } from '../components'

export interface BuilderConfig {
    element: Element
    State: State
    Handler: Handler
    Popup: Popup
    Text: Text
}

export interface BuilderComponent {
    uid: string,
    class: any,
    render: any,
    block: HTMLElement,
    created: string
}