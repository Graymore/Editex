import History from "../core/history";
export interface BuilderType {
    history: History,
    element: Element | null,
    components: object[]
}