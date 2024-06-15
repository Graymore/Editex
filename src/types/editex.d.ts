export type Class = { new(...args: any[]): any }

export interface EditexConfig {
    defaultComponent: Class | null
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