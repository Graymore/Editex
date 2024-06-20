export type KeyboardEventType = 'keydown' | 'keyup'

export interface KeyboardEventItem {
    name: string
    event: KeyboardEventType
    f: (e?: any) => any
}