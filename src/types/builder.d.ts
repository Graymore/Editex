import {Class} from "./editex";
export interface BuilderComponent {
    uid: string,
    class: Class,
    render: HTMLElement,
    block: HTMLElement,
    created: string
}