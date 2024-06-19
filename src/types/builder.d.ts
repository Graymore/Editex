import State from "../core/State";
import Popup from "../components/Popup";

export interface BuilderConfig {
    element: Element | null
    state: State
    popup: Popup
}

export interface BuilderComponent {
    uid: string,
    class: any,
    render: any,
    block: HTMLElement | null,
    created: string
}