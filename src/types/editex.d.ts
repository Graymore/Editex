export interface EditexHooks {
    onRenderBeforeComponent?: () => any
    onRenderComponent?: () => any
    onRenderedComponent?: () => any
}

export interface EditexEvents {}

export interface EditexGlobalObject extends EditexHooks, EditexEvents {}

declare global {
    interface Window {
        editex: EditexGlobalObject
    }
}

export type Class = { new(...args: any[]): any }

export interface EditexConfig extends EditexHooks {
    defaultComponent?: Class | null
    popup?: Class | null
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