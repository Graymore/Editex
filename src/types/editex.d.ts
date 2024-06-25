import {Handler, Keyboard, State, Block} from "../core";

declare global {
    interface Window {
        editex: EditexGlobalObject
    }
}

export interface EditexHooks {
    onRenderBeforeComponent?: () => any
    onRenderComponent?: () => any
    onRenderedComponent?: () => any
}

export interface EditexEvents {}

export interface EditexGlobalObject extends EditexHooks, EditexEvents {}

export type Class = { new(...args: any[]): any }

export interface EditexConfig extends EditexHooks {
    defaultComponent?: Class | null
    popup?: Class | null
    components?: Class[]
}

export interface EditexSaveComponentData {
    name: string
    HTMLData: string | null
    state?: any
}

export interface EditexSaveData {
    components: EditexSaveComponentData[]
    HTMLData: string | null
    time: string
}

export interface EditexCore {
    handler: Handler,
    state: State
    keyboard: Keyboard
    block: Block
    useSelection: () => any
    useEditor: () => any
    useDOM: () => any
}

export type EditexComponentType = 'component' | 'tool'