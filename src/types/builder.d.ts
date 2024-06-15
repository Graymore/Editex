import { Class } from "./editex";
import State from "../core/State";
import Caret from "../core/Caret";

export interface BuilderConfig {
    element: Element | null,
    state: State
}

export interface BuilderComponent {
    uid: string,
    class: any,
    caret: Caret,
    render: any,
    block: HTMLDivElement,
    created: string
}